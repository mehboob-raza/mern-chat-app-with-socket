const express = require("express");
const { chats } = require("./data/data");
const cors = require('cors');


const app = express()
app.use(cors());



app.get('/', (req, res) => {
    res.send("Api is running")
})

app.get('/api/chat', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.send(chats);
});


app.get('/api/chat/:id', (req, res) => {
    const signleChat = chats.find((c) => c._id === req.params.id)
    res.send(signleChat)  
    // console.log(req.params.id);
})

const port = process.env.PORT || 5000
app.listen(port ,console.log("Server listening on port 5000"))

