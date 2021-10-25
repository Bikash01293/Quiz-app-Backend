const express = require('express')
const app = express()
const cors = require('cors')
// const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const {pageNotFound, apiNotFound} = require('./middleware/not-found')
// all routes
const apiRoutes = require('./routes/api')
const teacherRoutes = require('./routes/teacher')
const studentRoutes = require('./routes/student')
const adminRoutes = require('./routes/admin')
const errorHandler = require( './middleware/error' )

// some dependency
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())


const db = require('./database/db');
db()


// socket 
const server = require('http').Server(app);
const io = require('socket.io')(server,
    {
        cors:
        {
            origin: '*',
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
app.set('io', io);
io.on('connection', socket => {

    console.log("new  sockeet connection...");
    socket.emit("test event", "hey bikash");

});


// for testing purpose
app.get('/', (req, res) => {
    res.send("Hello Bikash from quiz Server")
})


// use all routes
app.use('/api', apiRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/teacher', teacherRoutes)

app.use( '/api', pageNotFound )
app.use( apiNotFound )
app.use( errorHandler )


// for debugging
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


