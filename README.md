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
userSchema.pre('save', async function (next) {
    const user = this
     console.log('Just before saving)
    next()
})
```
### NOTE: 
#### =>  The 'save' argument is a built in function for middleware that saves document

7. The function accept an arguement called next

8. The goal is we want to run a function before calling the save method

9. We call next when we are done 

10. If we don't call next, our app will hang up

11. So in this case we have to have has our passowrd before saving to database

12. Since this function is attached to the user model as middleware, anytime a user visit the user endpoint the middleware function will run before the router functions also runs

13. Inside the middleware function above, the

14. some mongose api by pass midleware example findByIdAndUpadte so unless we manually set it

```javascript
const user = this
```
represent the user object, so we can access all the properties of that  user object

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

# PROCUDURE
# E - LOGIN
## STEPS
1. Create a login route inside the user router
```javascript

 router.post('/users/login', async (req, res) => {
     try {
         const user = await User.findByCredentials(req.body.email, req.body.password)
         res.send(user)
     } catch (error) {
         res.status(400).send(error)
     }
 })
```
### CODE EXPLANATION
1. I created a function called "findByCredentials" inside the user model.

2. This function accept two arguements 1. email 2. password

3. After this then we use this function inside the user router.

4. Inside the user router is where we passed in the actual arguements.

5. req.body.email = The email inside the database

6. req.body.password = password inside the database

2. It is the responsible for this route to find a user by their password and email

3. We have to create a reusable function so we will create inside the user model

4. We have to create a schema for it

5. The main note you have to note is when creating a login system put restriction on the email by setting a unique property of the email inside the database,

```javascript
userSchema.statics.findByCredentials = async (email, password) => {
    //find by email
    const user = await User.findOne({email: email});

    if(!user) {
        throw new Error('Unable to login')
    }
  //Verify by password
  const isMatch = await bcrypt.compare(password, user.password)//password = plain password and user.password = hashed password
  if(!isMatch) {
      throw new Error('Unable to login')
  }
  return user
}
```
## JWT WEB TOKEN Generating authenticated tokens and validating them
1. This gives permission to users to perform other operations like, creating, deleting data

### Login authentication using jwt

1. jwt accepts 3 arguements

A. Object ({}). This contains data that is going to embed in your token. We are storing the token in id which is uniquely identify

B. String = This is a random number you can use. This is a secret number which is used to generate the token

C. The expiration of the token generated
```javascript
 const token =  jwt.sign({_id:'abcds43'}, 'thisismynewcourse', {expiresIn: '7 days'})
```
2. After this We have to verify it. This done by comparing the secret number used and the token generated

```javascript
const data = jwt.verify(token, 'thisismynewcourse')
  console.log(data) 
```
## CODE DEMO
```javascript
const jwt = require('jsonwebtoken')
const myFunction = async () => {
  
  const token =  jwt.sign({_id:'abcds43'}, 'thisismynewcourse', {expiresIn: '7 days'}) //This return a token
  const data = jwt.verify(token, 'thisismynewcourse')
  console.log(data) 
}
myFunction()
```
# APPLYING JWT
1. It's the responsibilty of the login and signup route to generate the tokens.

2. We can create the function inside the routes but to avoid duplication we have to create a function inside the user model as a schema/middleware

3. JWT don't need to generate token for the whole users but rather it need specific users so we need a function that generate specific user thus 
```javascript
 const user = await User.findByCredentials(req.body.email, req.body.password)
```
This function search for a user with specfic email

3. So in this case after the above function generate a user with a specific user the JWT can act on it to generate the token for that user

```javascript
const token = await user.generateAuthToken()
```
# CREATING AUTH TOKEN USING JWT
1. this is created inside the user model

2. We use userSchema.method on our schema. Methods are used when creating instance of an object
 and userSchema.stattics are the methods on the model or the whole user data

3. This function is created using the normsl function

4. NOTE userSchema.statics accessible on the model = model method

5. userSchema.methods accessible on the instances = instant methods

```javascript
userSchema.methods.generateAuthToken = async function() {
  const user = this; //This refers to object 
  const token = jwt.sign({_id:user._id.toString()}, 'thisismynewcourse')
  return token
}
```
## USING THE TOKEN
```javascript
router.post('/users/login', async (req, res) => {
    
     try {
         const user = await User.findByCredentials(req.body.email, req.body.password)
         const token = await user.generateAuthToken() //Generating token for specific data
         res.send({user, token})
     } catch (error) {
         res.status(400).send(error)
     }
 })
```
# SAVING THE TOKEN AS PART OF THE DOCUMENTS TO THE DATABASE
1. To get this done we have to add this property to the user model

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
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
  })
```
2. Since the field is an array and we want add this token to that field so what we can do is we will concatenate it to the token array

```javascript
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id:user._id.toString()}, 'thisismynewcourse')

  user.tokens = user.tokens.concat({token:token})

  //Saving token to the database
  await user.save()

  return token

   }
}
```
# MIDDLEWARE IMPLEMENTATION


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
11. [Postman](https://www.getpostman.com/)
12. [jwt token for login](https://www.npmjs.com/package/jsonwebtoken)







