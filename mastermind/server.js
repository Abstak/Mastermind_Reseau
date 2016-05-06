'use strict';  
  
//J'importe la librairie express  
var express = require('express');  
var app = express();  
  
//J'appelle la bibliothèque http de node.js qui me permet de créer mon serveur  
//J'appelle la fonction createServer() et j'enregistre ce serveur dans la variable "server"  
var server = require('http').createServer(app);  
  
//Je rajoute des paramètres à app  
//Je choisis le port 5000  
app.set('port', 5000);  
  
//Il load les fichiers presents dans le dossier client de la ou s'execute le fichier server.js 
app.use('/tom', express.static(__dirname + "/client"));  
  
//Le serveur écoute sur le port défini dans mon application
//Si il y a une erreur, je la propage (throw)
//Console.log == print en python
server.listen(app.get('port'), (err) => {  
  if (err) throw err;  
  console.log('server listening on port:' + app.get('port'));  
});