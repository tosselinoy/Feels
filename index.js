import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { addMessage, addUser, getUserById } from './middleware/firebase/index'
import e from 'express';
const app = express();
const port = 80;
const apiToken = `5398297485:AAFFQdUUo1owIXYBFzwa-xsTOtHH05xjsjk`;
const url = `https://api.telegram.org/bot${apiToken}`;


// Configurations
app.use(bodyParser.json());
// Endpoints
app.post('/', (req, res) => {
     // General Variables
     const sentMessage = req.body.message.text;
     const user = {
          first_name:req.body.message.chat.first_name,
          last_name:req.body.message.chat.last_name,
          id: req.body.message.chat.id,
          // user_name: req.body.message.chat.username
     };

     const message = {
          date: new Date(),
          text: sentMessage
     }

     if(sentMessage === `/start`){
          axios.post(`${url}/sendMessage`,
          {
               chat_id: user.id,
               text: `Welcome ${user.first_name} 👋 
               How you feel today?`
          })
          .then(async (response) => {
               const userTest = await getUserById(user.id);
               if(!userTest){
                    addUser(user.first_name, user.last_name, user.id)
               }
               res.status(200).send(response);
          }).catch((error) => {
               res.send(error);
          }); 
     } else if ((sentMessage >= 0) && (sentMessage <=10) && (sentMessage != '/start')) {
          axios.post(`${url}/sendMessage`,
          {
               chat_id: user.id,
               text: `Thank you for your message 😜`
          })
          .then(async (response) => {
               addMessage(message.date,message.text,user.id)
               res.status(200).send(response);
          }).catch((error) => {
               res.send(error);
          });
     } else {
          axios.post(`${url}/sendMessage`,
          {
               chat_id: user.id,
               text: `How you feel today?`
          })
          .then(async (response) => {
               addMessage(message.date,message.text,user.id)
               res.status(200).send(response);
          }).catch((error) => {
               res.send(error);
          });
     }
     
});
// Listening
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});

export default app;