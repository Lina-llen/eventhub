import express from 'express';
import dotenv from 'dotenv';
import usersRoute from './Routes/users.route.js';
import eventsRoute from './Routes/events.route.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/users', usersRoute);
app.use('/events', eventsRoute);


app.get("/", (req,res) => {
    res.json({status : "OK"})
})


app.listen(process.env.SERVER_PORT, function(){
    console.log(`http://127.0.0.1:${process.env.SERVER_PORT}/`);
    console.log(`http://localhost:${process.env.SERVER_PORT}/`);
})

