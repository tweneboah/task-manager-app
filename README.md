# task-manager-app
This is an app to manage your daily routines

# PROCEDURES
## Creating of a Server using express


## Connecting to database
1. We use mongodb native drivers to connect our project to mongodb

## How to install mongodb
1. Download the setup [mongodb](https://www.mongodb.com/)
2. After that rename it into mongodb.
3. The bin folder contains all the executabale operations.
4. The mongod is use to start the mongodb server
5. Move the rename folder to your home directory
6. Next create a folder to store the databases. Note:
Always create the folder where you have the mongodb files. The name of the created folder is mongodb-data

# Starting the mongodb server
1. Locate your home directory where you have the mongodb and mongodb-data

2. Run this code /users/emmanuel/mongodb/bin/mongod --dbpath=/users/emmanuel/mongodb-data


### Next install mongodb GUI
1. [Robo 3T](https://robomongo.org/download)

# Connecting mongodb from Node js
1. We use mongodb driver from npm [Mongodb driver for node js](https://docs.mongodb.com/ecosystem/drivers/)
2. Download it from npm [mongodb node js driver](https://www.npmjs.com/package/mongodb)
3. After installation then we can use it

# CODE DEMO
```javascript
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient; //This gives the power to connect to the database

//STEPS
//1. We have to define the connection url to the database
const connectionURL ='mongodb://127.0.0.1:27017';
const databaseName ='task-manager-app'//Your database name

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
   if(error) {
      return console.log('Unable to connect to the database')
   }
   console.log('Successfully connected!')
})
```

### Resources
1. [mongodb](https://www.mongodb.com/)
2. [Robo 3T](https://robomongo.org/download)
3.[Mongodb driver for node js](https://docs.mongodb.com/ecosystem/drivers/)

