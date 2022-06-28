import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { getUserById } from './middleware/firebase/index'
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
     const first_name = req.body.message.chat.first_name;
     // const last_name = req.body.message.chat.last_name;
     // const user_name = req.body.message.chat.username;
     const id =  req.body.message.chat.id;
     // Regex for hello
     if (sentMessage.match(/Hi/gi)) {
          axios.post(`${url}/sendMessage`,
               {
                    chat_id: id,
                    text: `Hello back ${first_name} 👋 `
               })
               .then(async (response) => {
                    // console.log(response);
                    const user = await getUserById(id);
                    console.log(user, 'i am the user after it came back');
                    // addUser(first_name,last_name,id)
                    res.status(200).send(response);
               }).catch((error) => {
                    res.send(error);
               });
     } else {
          // if no hello present, just respond with 200 
          res.status(200).send({});
     }
});
// Listening
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});

export default app;