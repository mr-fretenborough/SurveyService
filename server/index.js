const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');

const PORT = 3002;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/testing_api', (req, res) => {
    const val = req.body.val;
    const query = `
        insert into test (testing) values (${val});
    `;
    console.log(req.body.val);
    console.log(val)
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log(out);
    });
    res.send(req);
});

app.post('/create_user', (req, res) => {
    // format new user data & build query
    const email = req.body.email;
    const password = req.body.password;
    const query = `
        insert into Users (Email, Password, Verified) values (${email}, ${password}, default);
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log(out);
        res.send("inside");
    });
    // return response to caller
    // res.send("outside");
});

app.post('/create_survey', (req, res) => {
    // format new user data & build query
    const email = req.body.email;
    const password = req.body.password;
    const query = `
        insert into Users (Email, Password, Verified) values (${email}, ${password}, default);
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log(out);
        res.send("inside");
    });
    // return response to caller
    // res.send("outside");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})