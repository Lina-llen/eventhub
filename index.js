import express from 'express';
import dotenv from 'dotenv';
import usersRoute from './Routes/users.route.js';
import eventsRoute from './Routes/events.route.js';
import participantsRoute from './Routes/participants.route.js';
import commentsRoute from './Routes/comments.route.js';
import authRoute from './Routes/auth.route.js';
import checkToken from './Middleware/auth.middleware.js';
import cors from 'cors';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoute);

app.get("/", (req,res) => {
    res.json({status : "OK"})
})

app.use(checkToken);

app.use('/users', usersRoute);
app.use('/events', eventsRoute);
app.use('/participants', participantsRoute);
app.use('/comments', commentsRoute);

app.listen(process.env.SERVER_PORT, function(){
    console.log(`http://127.0.0.1:${process.env.SERVER_PORT}/`);
    console.log(`http://localhost:${process.env.SERVER_PORT}/`);
})
