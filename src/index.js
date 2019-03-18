const express = require('express');
require('./db/mongoose');
const Task = require('./models/task');
const UserRouter = require('./routers/user');
const TaskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Registering the user Router
app.use(UserRouter)

//Registering Task router
app.use(TaskRouter)

//SERVER
app.listen(port, () => {
    console.log('Server is runing on port ' + port)
})
