getData();
    async function getData(){
        const response = await fetch('/app');
        const data = await response.json();
        console.log(data);
        for(item of data){
            const root = document.createElement('div');
            const user_id = document.createElement('div');
            const img = document.createElement('div');
            const date = document.createElement('div');
                
            user_id.textContent =`user id: ${item.user_id}`
            img.textContent =`about picture: ${item.picture_name}, ${item.picture_description}`
            date.textContent = `${item.datetime}`

            root.append(user_id, img, date);
            document.body.append(root);
        }
    }

const handleImageUpload = event => {
  const files = event.target.files
  const formData = new FormData()
  formData.append('myFile', files[0])

  fetch('/saveImage', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.path)
  })
  .catch(error => {
    console.error(error)
  })
}

document.querySelector('#imageform').addEventListener('submit', event => {
    
    handleImageUpload(event)
})

