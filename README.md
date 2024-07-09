# INNOVATUBE BACKEND

## Comenzando el proyecto

Crear las variables de entorno necesarias para iniciar el proyecto.
Crear el archivo ".env" sobre la raíz del proyecto y agregar las variables de la siguiente manera:

```
PORT=8080
MONGODB_CONNECT=mongodb+srv://{user}:{password}@miclustercafe.noxip.mongodb.net/{dbName}
SECRET_OR_PRIVATE_KEY=q1asdaspWsdRads%Oz
YOUTUBE_BASEURI=https://www.googleapis.com/youtube/v3
YOUTUBE_APIKEY=your-api-key

```

Una vez preparado todo se puede iniciar el proyecto con:

`npm start`

o bien utilizar nodemon:

`nodemon index.js`

## Documentación de paquetes NPM

- [axios](https://www.npmjs.com/package/axios)

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

- [cors](https://www.npmjs.com/package/cors)

- [dotenv](https://www.npmjs.com/package/dotenv)

- [express](https://www.npmjs.com/package/express)

- [express-validator](https://www.npmjs.com/package/express-validator)

- [mongoose](https://www.npmjs.com/package/mongoose)

- [password-validator](https://www.npmjs.com/package/password-validator)

- [axios](https://www.npmjs.com/package/axios)

## Documentación postman de los endpoints

[Backend endpoints](https://documenter.getpostman.com/view/13705109/2sA3e2gVgk)