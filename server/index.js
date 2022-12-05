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
/************************** Initialize User **************************/
app.post('/authenticate_user', (req, res) => {
    // format new user data & build query
    const email = req.body.email;
    const password = req.body.password;
    const get_user = `
        select * from Users where Email = "${email}" and Password = "${password}";
    `;
    const make_new = `
        insert into Users (Email, Password, Verified) values ("${email}", "${password}", default);
    `;
    // execute sql
    db.query(get_user, (err, out) => {
        if (err) {
            console.log(err);
        }
        if (out.length) {
            console.log("user found");
            res.send(out);
            return;
        } else {
            db.query(make_new, (err, out) => {
                if (err) {
                    console.log(err);
                }
            });
            console.log("user created");
            db.query(get_user, (err, out) => {
                if (err) {
                    console.log(err);
                }
                res.send(out);
            });
        }
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
/************************** Create Response **************************/
app.post('/add_response', (req, res) => {
    // format new response data & build query
    const userID = req.body.userid;
    const questionID = req.body.questionid;
    const response = req.body.response;
    const query = `
        insert into Responses (UserID, QuestionID, Response) values (${userID}, ${questionID}, ${response});
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
/************************** Search Questions **************************/
app.get('/search_questions', (req, res) => {
    // format new question & build query
    const surveyID = req.body.surveyid;
    const query = `
        select * from Questions where SurveyID = "${surveyID}";
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log(out);
        res.send(out);
    });
});
/************************** Port Listener **************************/
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});