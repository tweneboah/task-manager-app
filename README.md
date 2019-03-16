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
const databaseName ='task-manager-app'//Your database name. This is created automatically

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
   if(error) {
      return console.log('Unable to connect to the database')
   }
   console.log('Successfully connected!')
   //Creating a new collection under our database name call users
   const db = client.db(databaseName)//This accept database name
   db.collection('users').insertOne({
       name: 'Emmanuel',
       age: '30'
   })
})
```
7. After that refresh the Robo 3T and you will see your database been created
### Resources
1. [mongodb](https://www.mongodb.com/)
2. [Robo 3T](https://robomongo.org/download)
3.[Mongodb driver for node js](https://docs.mongodb.com/ecosystem/drivers/)


# USING MONGOOSE to manipulate mongodb
[Mongoose](https://mongoosejs.com/)
1. This is an npm library that makes our life easier
2. mongoose is an ODM = Object Document Mapper

# STEPS

### 1. Installing mongoose
npm i mongoose [npm mongoose](https://www.npmjs.com/package/mongoose)

### 2. requiring the module 
```javascript
const mongoose = require('mongoose')
```
### 3. Connect to the database

```javascript
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useCreateIndex: true,//help us to quickly access our database
    useFindAndModify: false
  });
```

### 4. Create a model
  1. This is the structure of our database
  2. This accept two arguement; the name of your model and the fields you want to create
  3. We can set type and validation of the field
  ```javascript
    const User = mongoose.model('User', {
   name: {
         type: String
   },
   age: {
        type: Number
   }
  })
  ```

### 5. Creating an instance of the model thus creating actual user
```javascript
  const me = new User ({
    name: 'Twenemboa',
    age: 29
  })
```

### 6. Saving the data to the database
```javascript
 me.save().then((me) => {
     console.log(me)
  }).catch((error) => {
    console.log('Error', error)
  })
```