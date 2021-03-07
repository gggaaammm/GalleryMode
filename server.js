// server is the central repository of the data of my app


const express = require('express');
const Datastore = require('nedb');
const fs = require('fs');
var io = require('socket.io');
const fileupload = require('express-fileupload');


const formidable = require('formidable');
const { response } = require('express');
const { domainToASCII } = require('url');
const { resolve } = require('path');
const { Socket } = require('dgram');


const GIFEncoder = require('gifencoder');

const pngFileStream = require('png-file-stream');


// apply the express
const app = express();





// Serve web pages
app.use(express.static('public'))
app.use(express.json({limit:'1mb'}));
app.listen(8051, ()=> console.log('listening at port 8051'))



// get on home.html
app.get('/', function(req,res){
    res.sendFile(__dirname+'/public/home.html');
});

app.get('/Gallery', function(req,res){
    res.sendFile(__dirname+'/public/templates/carousel.html')
});

app.get('/Upload', function(req,res){
    res.sendFile(__dirname+'/public/templates/uploaded.html')
});
app.get('/tt', function(req,res){
  res.sendFile(__dirname+'/public/templates/p5.html')
});



// load(or create) Database file
const database = new Datastore('GalleryDB.db');
database.loadDatabase();

const idbase = new Datastore('Sessionid.db');
idbase.loadDatabase();
//database.insert({name: 'Steven', pic:'jpg'});
//database.insert({name: 'Roger', pic:'png'});

// save to database
// authentication

// post op
app.post('/api', (request, response)=>{
    console.log("i got a request!");
    console.log(request.body);
    const data = request.body;
    const currentdate = new Date();
    var datetime = "Last Sync: " + currentdate.getFullYear() + "/" + currentdate.getMonth() 
    + "/" + currentdate.getDate() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    data.datetime = datetime;
    database.insert(data);
    response.json({
        status : "success",
        timestamp : data.datetime,
        latitude: data.lat,
        longitude: data.lon,
        imgsrc : "none",
        recent_id : data.user_id
    });
    response.end();
});



app.post('/upload_photos', (request, response) => {
    //here, we can check if data completed
    console.log("i got a request from upload photos!");
    const data = request.body;
    console.log(request.body);
    
    if(request.body.picture_name == '')
    {
      console.log("NULL!");
      response.redirect('/Upload');
    }
    //before insert, we need to give it a unique picture id sort by number
    database.count({},function(err,count){
      console.log("we alreday have",count, " photos");
      data.pic_id = count+1;
      console.log(data.pic_id);
      database.insert(data);
    });
    
    
    

    
  })

app.get('/app', (requset, response)=>{
    
    database.find({}, (err, data) =>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
    
    
});

app.get('/Demo',(request, response)=>{
  //demo for all feature functions
    response.sendFile(__dirname+'/public/templates/demo.html');
});

app.get('/Vote',(request, response)=>{
  response.sendFile(__dirname+'/public/templates/vote.html');
});

app.get('/Result',(request, response)=>{
  response.sendFile(__dirname+'/public/templates/index.html');
}
);

app.get('/Client-home',(request, response)=>{
  response.sendFile(__dirname+'/public/templates/client-home.html');
})

//file upload

app.use(fileupload());

app.get('/carousel', (req,res)=>{
    var data = [];
    database.find({}).sort({pic_id:1}).exec(function(err,docs){
      docs.forEach(function(d) {
          if(d.file_name != undefined){
          console.log('Found file:', d.file_name);
          data.push({
            file_name:d.file_name,
            picture_name: d.picture_name,
            picture_description: d.picture_description,
            vote : d.vote
          })
          }
        });
        //console.log("following:");
        //console.log(data);
        res.json(data);
      });  
    // res.json({id:"01"});
})

app.post('/up', function(req, res) {
  //check if req.row?
  console.log("File management!");
  console.log(req.body);

  //req/body should contain pagenum: means one/multipl
  const encoder = new GIFEncoder(1920, 1080);

  console.log("raww: "+ JSON.stringify(req.files.photo));

  if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect('/Upload');
    return;
    //return res.status(400).send('No file is uploaded.');
  }
  console.log("file size: ", req.files.photo.size);
  if(req.files.photo.size > 10000000) //restrict not more than 10MB
  {
    return res.status(400).send('File is to large, back to last page to try again!');
  }
  



  const file_num = req.body.pagenum;
  // if single file
  if(file_num == 'one')
  {
    console.log("single file");
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.photo;
    //Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname +'/public/upload_images/'+req.files.photo.name, function(err) {
      if (err)
        return res.status(500).send(err);
      res.redirect('/Vote');
    });
  }

  // if multiple file
  else if (file_num == 'multiple')
  {
    console.log("multiple files");
    console.log("it contains"+Object.keys(req.files.photo).length)
    var pic_cnt = Object.keys(req.files.photo).length;
    var png_path=[];
    
    for(var cnt=0; cnt<pic_cnt; cnt++) //write to local file
    {
      console.log("this file is"+req.files.photo[cnt].name);
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.photo[cnt];
      png_path.push(__dirname +'/public/frames/'+req.files.photo[cnt].name);
      //Use the mv() method to place the file somewhere on your server
      sampleFile.mv(__dirname +'/public/frames/'+req.files.photo[cnt].name, function(err) {
        // if (err)
        //   return res.status(500).send(err);
        //res.redirect('/Vote');
      });
    }


    //read from local file to generate gif
    const stream = pngFileStream(__dirname +'/public/frames/*.png')
    .pipe(encoder.createWriteStream({ repeat: 0, delay: 500, quality: 10 }))
    .pipe(fs.createWriteStream(__dirname +'/public/frames/myanimated.gif'));

    stream.on('finish', function () {
      // Process generated GIF
      console.log(png_path);
      for(var png_cnt=0; png_cnt < pic_cnt; png_cnt++)
      {
          // delete a file
          fs.unlink(png_path[png_cnt], (err) => {
            if (err) {
                throw err;
            }

            console.log("File is deleted.");
          });
      }
    });

   




    
    res.redirect('/Vote');
  }

});




app.post('/vote_result',function(req,res){
    console.log("i got a request from vote result!");
    console.log(req.body.userid);
    //console.log(Object.keys(req.body.resultid).length);

    for(step = 0; step <Object.keys(req.body.resultid).length;step++ )
    {
      if(req.body.resultid[step]=="Y")//vote!
      {
        console.log("someone vote id:", step);
        database.find({pic_id:step},function(err,docs){
          console.log("current id:",docs[0].pic_id,", votes:",docs[0].vote);
          database.update({pic_id:docs[0].pic_id},{$set: {vote:docs[0].vote+1}},{},function(){
            //console.log("changing....");
          });
          database.persistence.compactDatafile();//this will compact rows(same id) into one row(usally, last rows)
          database.find({pic_id:docs[0].pic_id}, function (err, docs) {
            // If no document is found, docs is equal to []
            //console.log(" db at the end: ",docs);
          });
        });
        
      }
      
    }
    
    //update the vote with specialize id

    // // 2  steps: update, compact
    // database.find({ file_name:'nyancat.gif'}, function (err, docs) {
    //   // If no document is found, docs is equal to []
    //   console.log(docs[0].vote);
    //   database.update({file_name:'nyancat.gif'},{$set: { vote:docs[0].vote+1}}, {},function(){
      
    //     console.log("changing...");
        
    //   });

    //   database.persistence.compactDatafile();//this will compact rows(same id) into one row(usally, last rows)

    //   database.find({ file_name:'nyancat.gif'}, function (err, docs) {
    //     // If no document is found, docs is equal to []
    //     console.log(" db at the end");
    //     console.log(docs);
    //   });
    // });

    

});

app.get('/get_result', function(req,res){
  var data = [];
  database.find({}).sort({vote:-1}).limit(5).exec(function(err,docs){
    //console.log(docs);

    docs.forEach(function(d) {
      if(d.file_name != undefined){
      console.log('Top 5:', d.file_name);
      data.push({
        file_name:d.file_name,
        picture_name: d.picture_name,
        vote : d.vote
      })
      }
    });
    res.json(data);
  });
})

