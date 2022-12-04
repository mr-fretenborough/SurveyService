const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.get('/testing_api', (req, res) => {
    console.log("here we are");
    db.query('insert into test (testing) values (?);', req.body.val, (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log(out);
    });
    res.send(req.body.val);
});

app.get('/create_user', (req, res) => {
    console.log("STATUS: Creating user {}");
    db.query("insert into test (testing) values (1);", (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log(out);
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})