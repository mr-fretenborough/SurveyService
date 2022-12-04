const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

app.post('/testing_api', (req, res) => {
    console.log("here we are");
    db.query("insert into test (testing) values 1;", (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log(out);
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})