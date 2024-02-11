'use strict';
const documentReady =   () => {

    let video = document.getElementById("videoPlayer");

    const formFile = document.getElementById('formFile');
    const btnUploadVideo = document.getElementById('btnUploadVideo');
    const btnPlayStop = document.getElementById('btnPlayStop');
    const brnRecargar = document.getElementById('brnRecargar');
    const btnMaximizar = document.getElementById('btnMaximizar');
    const btnMinimizar = document.getElementById('btnMinimizar');
    const btnNormal = document.getElementById('btnNormal');
    const sourceVideo=document.getElementById('souceVideo');

    const ruta = localStorage.getItem('ruta');
    console.log(ruta);
    if(ruta!=null)
    {
        sourceVideo.src=ruta;
        // Forzar la recarga del video
        videoPlayer.load();
    }

    

     const uploadVideo =  async  (event)=> {

        event.preventDefault();
        const fileInput = document.getElementById('videoFile');
        const file = fileInput.files[0];
        
        const formData = new FormData();
        formData.append('video', file);
    
        console.log(formData);
        console.log(file);

    
       await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
              throw new Error('La solicitud falló');
            }
            // Convertir la respuesta a JSON
            return response.json();
          })
          .then(data => {
            // Manejar los datos obtenidos
            console.log('Datos obtenidos:', data.nombreVideo);
             // Nueva ruta del video
            let nuevaRuta = '../BACKEND/uploads/'+data.nombreVideo;
            localStorage.setItem('ruta', nuevaRuta);

          })
          .catch(error => {
            // Manejar errores
            console.error('Error:', error);
          });
       
    }

    const playPause = () => { 

        if (video.paused) 
            video.play(); 
        else 
            video.pause(); 
    }

    const reload=() => { 
        video.load(); 
     }
     const makeLarge=()=> { 
         video.width = 1000; 
     }
     const makeSmall=()=> { 
         video.width = 250; 
     } 
     const makeNormal=()=> { 
         video.width = 500; 
     } 


     formFile.addEventListener('submit', uploadVideo);
     btnPlayStop.addEventListener('click', playPause);
     brnRecargar.addEventListener('click', reload);
     btnMaximizar.addEventListener('click', makeLarge);
     btnMinimizar.addEventListener('click', makeSmall);
     btnNormal.addEventListener('click', makeNormal);
    
}



document.addEventListener('DOMContentLoaded', documentReady);



