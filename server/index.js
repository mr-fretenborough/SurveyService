const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 443;
app.use(cors());
app.use(express.json())

app.get("/test", (req, res) => {
    res.json("sup jit");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})