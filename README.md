# TASK MANAGER APP
This is an app to manage your daily routines

# PROCEDURES
# A
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
1. This accept connection to the database
2. It also create a new collection
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
  4. Model accept the name of your collection/table, objects thus the fields of the object
  5. Model also accept other options like middleware
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

# PROCEDURE 
# B

## CREATING EXPRESS SERVER
1. Create an index.js file that's the root of the application

2. Install nodemon and express
[Express](https://expressjs.com/)
[Nodemon](https://www.npmjs.com/package/nodemon)

### CODE DEMO
```javascript
const express = require('express');
const app = express() //This create express application
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is running on port', port)
})
```

# PROCEDURE 
# C
## CREATING ENDPOINTS/RESOURCES
1. The endpoints/resources are the url user's visit for information
## TYPES OF ENDPOITS
1. get => Fetching data
2. post => Creating data
3. delete => Delete data
4. patch => Update data

### CREATING A SEVER
```javascript
const express = require('express');
const app = express() //This create express application
const port = process.env.PORT || 3000

//app.use() is use to customise express
// app.use(express.json()) is use to convert incoming json to object so that we can access it on the res body
app.use(express.json())

//CREATING USER
app.post('/users', (req, res) => {
    console.log(req.body) //This contains all our data to the server
    res.send('Testing')
})

app.listen(port, () => {
    console.log('Server is running on port', port)
})
```
### CREATING ENDPOINTS 
1. The end points are what get back to users when the visit that url
2. Within the end point you can create any action example deleting, updating, reading data
3. 

## CREATING SEPARATE ROUTERS
1. Create a separate file for all your routes
2. require express module
3. Create instance of the route created
4. Load the router created inside the index.js
5. Register the router/Using the router in index.js
5. On the router file load all the modules required    by the router
6. Lastly export the router file

## CODE DEMO
### ON THE ROUTER FILE
```javascript
const express = require('express');
const User = require('../models/user')
const router = new express.Router();

//USERS

//CREATING A USER
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
 })
 
 //READING/fetching  ALL USERS
 router.get('/users', async (req, res)=> {
     try {
         const users = await User.find({});
         res.send(users)
     } catch (error) {
         res.status(500).send(error)
     }
 })
 
 //fetching individual user
  
 router.get('/users/:id',  async (req, res) => {
 
     const _id = req.params.id
     try {
         const user = await User.findById(_id);
         if(!user){
             return res.status(404).send()
         }
         res.send(user)
     } catch (error) {
         res.status(500).send()
     }   
 })
 
 
 //Updating user
 router.patch('/users/:id', async (req, res) => {
     //Fields allowed to be updated
     const updates = Object.keys(req.body);
     const allowedUpdates = ['name', 'email', 'password', 'age'];
     const isValidOperation = updates.every((update) => {
         return allowedUpdates.includes(update)
     })
 
     if(!isValidOperation){
         return res.status(400).send({error:'Invalid updates'})
     }
 
     try {
         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
         if(!user) {
             return res.status(404).send()
         }
         res.send(user)
     } catch (error) {
         res.status(500).send(error)
     }
 })
 
 //Deleteing User
 router.delete('/users/:id', async (req, res) => {
     try {
         const user = await User.findByIdAndDelete(req.params.id);
 
         if(!user){
             return res.status(404).send()
         }
         res.send(user)
     } catch (error) {
         res.status(500).send(error)
     }
 })
 
module.exports = router;
```
## REGISTERING/USING ON THE INDEX.JS FILE

```javascript
const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const UserRouter = require('./routers/user')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Registering the user Router
app.use(UserRouter)

//SERVER
app.listen(port, () => {
    console.log('Server is runing on port ' + port)
})
```

# PROCUDURE
# D - MIDDLEWARE

1. Middleware is the act of customising your model, adding more functionality to it
2. We pass all other functionality through the model
3. We can register a function to occure before or after an event occures
4. We can run a code before a user is validated
5. We register middleware inside model
6. Model accept mongodb collection type, objects and middleware
7. When we pass objects to a model, behind the scene mongoose create a schema
7. To use more advance features inside the model you need create a scema

## HOW TO PASS MIDDLEWARE TO A MODEL
1. Create an instance of a schema
```javascript
const userSchema = new mongose.Schema()
```
2. This schema accept the object we want to add more functionality to it
3. After that we pass that schema to the model 

# CODE DEMO
```javascript
//CREATING SCHEMA
const userSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true,
         trim: true
    },
    email: {
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value){
          if(value.toLowerCase().includes('password')) {
              throw new Error('Password cannot contain password')
          }
      }
    },
    age: {
         type: Number,
         default: 0,
         validate(value) {
             if(value < 0){
                 throw new Error('Age must be a positive number')
             }
         }
    }
  })
  
//USER MODEL
 const User = mongoose.model('User', userSchema )
```
4. Now we can take advantage of middleware
5. Middleware has two methos 1.pre-Before and 2. post-after
6. Middleware accept two arguements 1. the name of the event or our function to run and a callback function. 
NOTE: for the callback function we use normal function not arrow function because arrow functions don't bind this keyword

# CODE DEMO
```javacscript
userSchema('save', async function (next) {
    const user = this
     console.log('Just before saving)
    next()
})
```
7. The function accept an arguement called next
8. The goal is we want to run a function before calling the save method
9. We call next when we are done 

# SECURITY / PASSWORD ENCRYPTION

```javascript
//PASSWORD HASHING
const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = 'emmanuel$2018';
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('emmanuel$2018', hashedPassword);
    console.log(isMatch)
}
myFunction()
```

### Resources
1. [mongodb](https://www.mongodb.com/)
2. [Robo 3T](https://robomongo.org/download)
3. [Mongodb driver for node js](https://docs.mongodb.com/ecosystem/drivers/)
4. [Validator](https://www.npmjs.com/package/validator)
5. [Express](https://expressjs.com/)
6. [Nodemon](https://www.npmjs.com/package/nodemon)
7. [http status code](https://httpstatuses.com/)
8. [mongoose queries](https://mongoosejs.com/docs/queries.html)
9. [bcrypts for password](https://www.npmjs.com/package/bcryptjs)
10. [Middleware](https://mongoosejs.com/docs/middleware.html)