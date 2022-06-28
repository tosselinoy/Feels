import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { addUser, getUserById } from './middleware/firebase/index'
const app = express();
const port = 80;
const apiToken = `5398297485:AAFFQdUUo1owIXYBFzwa-xsTOtHH05xjsjk`;
const url = `https://api.telegram.org/bot${apiToken}`;


// Configurations
app.use(bodyParser.json());
// Endpoints
app.post('/', (req, res) => {
     // console.log(req.body);
     const sentMessage = req.body.message.text;
     const user = {
          first_name:req.body.message.chat.first_name,
          last_name:req.body.message.chat.last_name,
          id: req.body.message.chat.id
     };
     // const user_name = req.body.message.chat.username;

     // Regex for Hi
     // if (sentMessage.match(/Hi/gi)) {
     if (sentMessage != '/start') {
          axios.post(`${url}/sendMessage`,
               {
                    chat_id: user.id,
                    text: `Hello back ${user.first_name} 👋 `
               })
               .then(async (response) => {
                    const userTest = await getUserById(user.id);
                    if(!userTest){
                         console.log(userTest);
                         addUser(user.first_name, user.last_name, user.id)
                    }
                    res.status(200).send(response);
               }).catch((error) => {
                    res.send(error);
               });
     } else {
          // if no Hi present, just respond with 200 
          res.status(200).send({});
     }
});
// Listening
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});

export default app;