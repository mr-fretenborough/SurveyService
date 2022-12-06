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
    // get survey data
    const userid = req.body.userid;
    const title = req.body.title;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    // get question data
    const questions = req.body.questionList;
    const questionType = req.body.typeValueList;

    const survey_query = `
        insert into  Surveys (UserID, Title, Description, StartDate, EndDate) values (${userid}, "${title}", "${description}", "${startDate}", "${endDate}")
    `;
    
    // execute sql
    db.query(survey_query, (err, result) => {
        let sid = -1
        if (err) {
            console.log(err);
        } else {
            console.log("survey info posted");
            sid = result.insertId;
        }
        for (let i = 0; i < questions.length; i++) {
            let question_query = `insert into Questions (SurveyID, QuestionType, Question) values (${sid}, ${questionType[i].typeValue}, "${questions[i].question}")`;
            db.query(question_query, (err, result) => {
                if(err) {
                    console.log(err);
                }
                console.log(`inserting the ${i} question`);
            })
        }
        res.send(result);
    });
});
/************************** Get Surveys **************************/
app.post('/get_surveys', (req, res) => {
    // format new user data & build query
    const enddate = req.body.EndDate;
    //***Reminder*** Filter out by invalid full Surveys(10 Users) */
    const query = `
        select * from Surveys where enddate>=CURDATE();
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        }
        console.log("got surveys");
        res.send(out);
    });
});
/************************** Create Response **************************/
app.post('/add_response', (req, res) => {
    // format new response data & build query
    const userID = req.body.userid;
    const rtoq = req.body.rtoq;
    const response = req.body.responses;
    // const query = `
    //     insert into Responses (UserID, QuestionID, Response) values (${userID}, ${questionID}, "${response}");
    // `;
    // // execute sql
    // db.query(query, (err, out) => {
    //     if (err) {              
    //         console.log(err);
    //     }
    //     console.log("response inserted");
    //     res.send(out);
    // });

    for (let i = 0; i < response.length; i++) {
        console.log(rtoq);
        let query = `insert into Responses (UserID, QuestionID, Response) values (${userID}, ${rtoq[i]}, "${response[i]}");`;
        db.query(query, (err, out) => {
            if (err) {
                console.log(err);
            }
            console.log(`response ${i} inserted`);
            res.send(out);
        });
    }
});
/************************** Search Questions **************************/
app.post('/get_questions_by_surveyid', (req, res) => {
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

































/************************** Get Surveys User ************************* Please do not overwrite this section... */ 
app.post('/get_surveys_user', (req, res) => {
    // format new user data & build query
    const user_id = req.body.user_id;
    //***Reminder*** Filter out by invalid End Dates */
    const query = `
        select SurveyID
             , Title
             , Description
             , StartDate
             , EndDate
          from Surveys where UserID = ${user_id};
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        } else {
            console.log("found surveys");
        }
        res.send(out);
    });
});
/************************** Get Results Survey **************************/ 
app.post('/get_results_survey', (req, res) => {
    // format new user data & build query
    const survey_id = req.body.survey_id;
    //***Reminder*** Filter out by invalid End Dates */
    const query = `
        select q.QuestionID
             , r.Response
          from Questions q 
          join Responses r
            on q.QuestionID = r.QuestionID
         where q.SurveyID = ${survey_id}
         order by q.QuestionID
        ;
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        } else {
            console.log("found results");
        }
        res.send(out);
    });
});
/************************** Get Questions **************************/ 
app.post('/get_questions', (req, res) => {
    // format new user data & build query
    const survey_id = req.body.survey_id;
    //***Reminder*** Filter out by invalid End Dates */
    const query = `
        select * 
          from Questions q 
         where q.SurveyID = ${survey_id}
         order by q.QuestionID
        ;
    `;
    // execute sql
    db.query(query, (err, out) => {
        if (err) {
            console.log(err);
        } else {
            console.log("got questions");
        }
        res.send(out);
    });
});








/************************** Port Listener **************************/
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});