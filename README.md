## Desafio Like Me
LikeMe App
LikeMe es una aplicación web que permite a los usuarios crear publicaciones y dar "likes" a las publicaciones de otros usuarios. La aplicación está diseñada para proporcionar una plataforma simple y atractiva donde los usuarios puedan compartir imágenes y recibir interacciones positivas de otros usuarios.
```
CREATE DATABASE likeme;
CREATE TABLE posts (id SERIAL, usuario VARCHAR(25), url VARCHAR(1000),
descripcion VARCHAR(255), likes INT DEFAULT 0);
```
instalar las dependencias
correr el servidor
```
npm install
node server.js
```

