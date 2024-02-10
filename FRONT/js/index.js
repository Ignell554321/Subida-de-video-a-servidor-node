'use strict';
const documentReady = () => {

    let video = document.getElementById("videoPlayer");

    const btnUploadVideo = document.getElementById('btnUploadVideo');
    const btnPlayStop = document.getElementById('btnPlayStop');
    const brnRecargar = document.getElementById('brnRecargar');
    const btnMaximizar = document.getElementById('btnMaximizar');
    const btnMinimizar = document.getElementById('btnMinimizar');
    const btnNormal = document.getElementById('btnNormal');

    const uploadVideo = ()=> {
        const fileInput = document.getElementById('videoFile');
        const file = fileInput.files[0];
        
        const formData = new FormData();
        formData.append('video', file);
    
        console.log(formData);
        console.log(file);
    
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Video subido exitosamente');
            } else {
                alert('Error al subir el video');
            }
        })
        .catch(error => {
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


     btnUploadVideo.addEventListener('click', uploadVideo);
     btnPlayStop.addEventListener('click', playPause);
     brnRecargar.addEventListener('click', reload);
     btnMaximizar.addEventListener('click', makeLarge);
     btnMinimizar.addEventListener('click', makeSmall);
     btnNormal.addEventListener('click', makeNormal);

}



document.addEventListener('DOMContentLoaded', documentReady);



