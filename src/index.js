const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//USERS

//CREATING A USER
app.post('/users', async (req, res) => {
   const user = new User(req.body);
   try {
       await user.save();
       res.status(201).send(user)
   } catch (error) {
       res.status(400).send(error)
   }
})

//READING/fetching  ALL USERS
app.get('/users', async (req, res)=> {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

//fetching individual user
 
app.get('/users/:id',  async (req, res) => {

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
app.patch('/users/:id', async (req, res) => {
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
app.delete('/users/:id', async (req, res) => {
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
