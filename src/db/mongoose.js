
  const mongoose = require('mongoose')
  const validator = require('validator')
 
  mongoose.connect('mongodb://127.0.0.1:27017/task-manager-app', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
  });
 
  
  //USER MODEL
  const User = mongoose.model('User', {
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

  //TASK MODEL

  const Task = mongoose.model('task', {
    description: {
        type: String,
        trim: true,
        required:true
    },
    completed: {
        type: Boolean,
        default: false
    }
})
 

  //Creating an instance of the user thus creating a user
 
  const me = new User ({
    name: 'Emmanuel',
    age: 30
  })
 
  //Saving to Database
  //The save() returns a promise
  me.save().then((me) => {
     console.log(me)
  }).catch((error) => {
    console.log('Error', error)
  })


//CREATING TASK
const task = new Task ({
    description: 'Teaching',
    completed: false
})
 
//SAVING THE DATA
task.save().then((task) => {
    console.log(task)
}).catch((error) => {
    console.log('Error', error)
})