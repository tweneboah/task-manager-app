const express = require('express');
//require('./db/mongoose') //This import our mongoose that connect to the database so that we can use it in this file

const User = require('./models/user')//This import our User model so that we can create a user

const app = express() //This create express application
const port = process.env.PORT || 3000

//app.use() is use to customise express
 app.use(express.json()) //is use to convert incoming json to object so that we can access it on the res body
 app.use(express.json())

// app.get('/users', (req, res) => {
//     res.send('sdsds')
// })



//SERVER
app.listen(port, () => {
    console.log('Server is runing on port ' + port)
})
