//CRUD
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
   }, (error, results) => {
       if(error) {
           console.log('Unable to insert user')
       }
       console.log(results.ops) //The ops contains all the arrays of the object
   })
})

