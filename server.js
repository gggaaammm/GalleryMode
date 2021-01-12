// server is the central repository of the data of my app


const express = require('express');
const Datastore = require('nedb');
const fs = require('fs');
const fileupload = require('express-fileupload');

const formidable = require('formidable');
const { response } = require('express');
const { domainToASCII } = require('url');

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
  res.sendFile(__dirname+'/public/templates/upload.html')
});



// load(or create) Database file
const database = new Datastore('GalleryDB.db');
database.loadDatabase();
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
    console.log("i got a request!");
    console.log(request.body);
    const data = request.body;
    if(request.body.picture_name == '')
    {
      console.log("NULL!");
      response.redirect('/Upload');
    }
    database.insert(data);
    database.find({picture_name : 'eeee'}, function(err,docs){
    docs.forEach(function(d) {
        console.log('Found user:', d._id);
    });
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
    response.sendFile(__dirname+'/public/templates/all.html');
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
  database.find({picture_name : 'eeee'}, function(err,docs){
    docs.forEach(function(d) {
        console.log('Found user:', d._id);
      });
    });


    var data = [];
    database.find({}, function(err,docs){
      docs.forEach(function(d) {
          if(d.file_name != undefined){
          console.log('Found file:', d.file_name);
          data.push({
            file_name:d.file_name,
            picture_name: d.picture_name,
            picture_description: d.picture_description
          })
          }
        });
        console.log("following:");
        //console.log(data);
        res.json(data);
      });  
    
    // res.json({id:"01"});
})

app.post('/up', function(req, res) {
  //check if req.row?
  console.log("File management!");
  console.log(req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    res.redirect('/Upload');
    return;
    //return res.status(400).send('No file is uploaded.');
  }
  console.log(req.files.photo.size);
  if(req.files.photo.size > 1000000) //more than 1MB
  {
    return res.status(400).send('File is to large, back to last page to try again!');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.photo;
  
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname +'/public/upload_images/'+req.files.photo.name, function(err) {
    if (err)
      return res.status(500).send(err);
    res.redirect('/Client-home');
  });
});

