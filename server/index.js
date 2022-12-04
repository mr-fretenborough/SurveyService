const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');

const PORT = 3002;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

/************************** Testing **************************/
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
/************************** Authenticate User **************************/
app.post('/authenticate_user', (req, res) => {
    // format new user data & build query
    const email = req.body.email;
    const password = req.body.password;
    const exists = 0;
    const query = `
        select * from Users where Email = "${email}" and Password = "${password}";
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        }
        if (out) {
            res.send(out[0].UserID);
            exists = 1;
            console.log("user found");
            return;
        };
    });

    if (!exists) {
        const make_new = `
            insert into Users (Email, Password, Verified) values ("${email}", "${password}", default);
        `;
        db.query(make_new, (err, out) => {
            if (err) {
                console.log(err);
            }
        });
        db.query(query, (err, out) => {
            if (err) {
                console.log(err);
            }
            if (out) {
                res.send(out[0].UserID);
                exists = 1;
                console.log("user created");
                return;
            };
        });
    }
});
/************************** Create User **************************/
app.post('/create_user', (req, res) => {
    // format new user data & build query
    const email = req.body.email;
    const password = req.body.password;
    const query = `
        insert into Users (Email, Password, Verified) values ("${email}", "${password}", default);
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log("user created");
        res.send(out);
    });
});
/************************** Get User **************************/        
app.get('/get_user', (req, res) => {
    // format new user data & build query
    const email = req.body.user_id;
    const query = `
        select UserID from Users where UserID = ${user_id};
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log(out);
        res.send("inside");
    });
});
/************************** Create Survey **************************/
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
});
/************************** Port Listener **************************/
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});