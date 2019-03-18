const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


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
    }
  })

//USER MODEL
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
//HAS THE PLAIN TEXT PASSWORD BEFORE SAVING
userSchema.pre('save', async function (next) {
    const user = this
     if(user.isModified('password')) {
         user.password = await bcrypt.hash(user.password, 8)
     }
    next()
})
 const User = mongoose.model('User', userSchema )

 module.exports = User;