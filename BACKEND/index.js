const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para permitir solicitudes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Permitir los métodos GET, POST y OPTIONS
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permitir el encabezado Content-Type
    next();
  });

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Ruta para manejar la subida de archivos
app.post('/upload', upload.single('video'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No se ha seleccionado ningún archivo');
    }

    const rutaCarpeta = './uploads/';
    let nombreVideo='';
    // Lee el contenido de la carpeta
     fs.readdir(rutaCarpeta, (err, archivos) => {
        if (err) {
        console.error('Error al leer la carpeta:', err);
        return;
        }
    
        // Filtra solo los archivos con extensión .mp4
        const videos = archivos.filter(archivo => archivo.endsWith('.mp4'));
    
        // Imprime los nombres de los videos
        console.log('Nombres de los videos en la carpeta:');
        
        videos.forEach(video => {
           // console.log(video);
            nombreVideo=video;
        
        });

         //nombreVideo=videos[0];

         const data = {
            message: 'Video subido correctamente',
            nombreVideo: nombreVideo,
            status: 'ok'
          };

          res.json(data);
       // console.log(nombreVideo);
        
    });

    
    
    //res.send('Video subido correctamente');

  

});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
