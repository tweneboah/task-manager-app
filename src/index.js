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


//TASK

//CREATING TASK

//CREATING A USER
app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then((result) => {
        res.status(201).send(result)
         
    }).catch((err) => {
       res.status(400).send(err)
    });
 })
//SERVER
app.listen(port, () => {
    console.log('Server is runing on port ' + port)
})
