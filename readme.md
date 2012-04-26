Node.js  + Ember.js + MongoDB
=============================

Proof of concept application.

### Dependencies:

* [http://nodejs.org](http://nodejs.org) 0.6.15
* [http://requirejs.org](http://requirejs.org) 1.0.x
* [http://jquery.com](http://jquery.com) 1.7.2
* [http://expressjs.com](http://expressjs.com) 3.0.x
* [http://mongoosejs.com](http://mongoosejs.com) 2.5.x
* [http://www.mongodb.org](http://www.mongodb.org) 2.0.4
* [http://emberjs.com](http://emberjs.com) 0.9.7.1
* [http://twitter.github.com/bootstrap](http://twitter.github.com/bootstrap) 2.0.3

### How to run in development environment

1. You have to start local MongoDB instance
2. Go to the project directory
   _$ cd nodejs-emberjs-mongodb_
3. Install required Node.js modules
   _$ npm install_
4. Start Node.js HTTP server
   _$ npm start_
5. Visit address http://localhost:3000
6. Enjoy!

### Build and run production package

1. You have to start local MongoDB instance
2. Go to the project directory
   _$ cd nodejs-emberjs-mongodb_
3. Install required Node.js modules
   _$ npm install_
4. Start Node.js HTTP server in production environment, client javascript and css files will be automatically optimized
   _$ NODE_ENV=production node app_
