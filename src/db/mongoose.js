
  const mongoose = require('mongoose')
  //const validator = require('validator')
 
  mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useCreateIndex: true,//help us to quickly access our database
    useFindAndModify: false
  });
 
  //MODEL
  //This is the structure of our database
  //This accept two arguement; the name of your model and the fields you want to create
  //We can set type and validation of the field
 
  const User = mongoose.model('User', {
   name: {
         type: String
   },
   age: {
        type: Number
   }
  })
 
  //Creating an instance of the user thus creating a user
 
  const me = new User ({
    name: 'Twenemboa',
    age: 29
  })
 
  //Saving to Database
  //The save() returns a promise
  me.save().then((me) => {
     console.log(me)
  }).catch((error) => {
    console.log('Error', error)
  })
 