const express = require('express');
const Task = require('../models/task')
const router = new express.Router();


//CREATING TASK
router.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then((result) => {
        res.status(201).send(result)     
    }).catch((err) => {
       res.status(400).send(err)
    });
 })



 //FETCHING TASK
 router.get('/tasks', async (req, res)=> {
    try {
        const tasks = await Task.find({});
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})


 //DELETING TASK
 router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

 //Updating user
 router.patch('/tasks/:id', async (req, res) => {
    //Fields allowed to be updated
    const updates = Object.keys(req.body); //Converting object to array so that we can loop through
    const allowedUpdates = ['description', 'completed']; //Properties we need to update
    
    //This determine if the individuals items are included in the array
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }
 
    try {
        
      //This makes sure middleware works for this route
      const task = await Task.findById(req.params.id);
      updates.forEach((update) => {
          return task[update] = req.body[update]
      })
        await task.save()

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

 
module.exports = router;