# Hangman - NodeJS

This is a hangman game using NodeJS, socket.io to show the list of best players in real time and MongoDB to store the information of the games.

At starting of the game, it gets a random Oscar winner movie from the server. In case you need to populate the database with the movies, you can use the script `data.js`. Everytime the player guess a movie, it stores the new winner in the database and the server notifies all its clients to update the winner table in real time in every client.

This project uses the following technologies:

### Frontend

The frontend packages are managed using bower. They were initializated with the command `bower init`. Every package was installed with the command `bower install package_name --save`

Technologies used:

- [Jquery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Handlebars](https://handlebarsjs.com/)

### Backend

The backend packages are managed using npm. They were initializated with the command `npm init`. Every package was installed with the command `npm install -s package_name`

Technologies used:

- [NodeJS](https://nodejs.org)
- [ExpressJS](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [Nodemon](https://nodemon.io/)

### Database
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

This example was written in [Visual Studio Code](https://code.visualstudio.com/).

## Execution steps

1. Install backend dependencies
```
npm install
```
2. Install frontend dependencies
```
bower install
```
3. Run the project
```
nodemon server.js
```