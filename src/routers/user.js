const express = require('express');
const User = require('../models/user')
const router = new express.Router();

//
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
         //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

         const user = await User.findById(req.params.id)
         updates.forEach((update => {
             user[update] = req.body[update]
         }))

         await user.save()
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

 //LOGIN USER
 router.post('/users/login', async (req, res) => {
    
     try {
         const user = await User.findByCredentials(req.body.email, req.body.password)
         res.send(user)
     } catch (error) {
         res.status(400).send(error)
     }
 })
 
module.exports = router;