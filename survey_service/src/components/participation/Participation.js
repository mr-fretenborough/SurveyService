import { useEffect, useState } from "react";
import Axios from 'axios';
//import {format} from 'date-fns'
import './Participation.css';

function Participation(props) {
    
    const [surveyid, setSurveyID] = useState("");
    const [surveyList, setSurveys] = useState([]);
    const [nosurveys,   setNoSurveys]   = useState(0);
    const [questionsList, setQuestions] = useState([]);
    const [responsesList, setResponses] = useState([{questionid: 0,response:""}]);

    //firstLoadSurveys;
    const loadSurveys = () => {
        if (!nosurveys && !surveyList.length) refreshSurveys();
    }

    //displaySurveys;
    const refreshSurveys = () => {
        Axios.post(`${props.host}:3002/get_surveys`, {
          }).then((response) => {
            setSurveys(response.data);
            console.log(response.data);
          });
    }

    //displayQuestions;
    const getQuestions = (SurveyID) => {
        Axios.post(`${props.host}:3002/get_questions_by_surveyid`, {
            surveyid: SurveyID
            }).then((response) => {
            setQuestions(response.data);
            console.log(response.data);
            });
    }

    const displayQuestion = (c) => {
        if(c.QuestionType==0){
            return(
                <div key={c.QuestionID}>
                <text>{c.Question}</text>
                <select 
                        name="typeValue" 
                        id="typeValue"
                        onChange={(e) => "setResponseList.response(e.target.value); setResponseList.questionid(c.QuestionID)"}
                    > 
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                        <option value = "4">4</option>
                        <option value = "5">5</option>
                    </select>
                <br></br>
                </div>
                )
        }else{
           return(
                <div key={c.QuestionID}>
                <text>{c.Question}</text>
                <input type="text" placeholder="Text Response..." onChange={(e) => "setResponseList.response(e.target.value); setResponseList.questionid(c.QuestionID)"}></input>
                <br></br>
                </div>
            ) 
        }
    }

    //displayQuestions;
    const postResponses = (r) => {
        return(
            <div>
            {
            responsesList.map(r =>
            <div>{postResponses(r)}</div>
                
            )}
            </div>
        )
    }

    const postResponse = (r) => {
        Axios.post(`${props.host}:3002/add_response`, {
            userid: props.userid,
            questionid: r.questionid,
            response: r.response
            }).then((response) => {
            setQuestions(response.data);
            console.log(response.data);
            });
    }

    return (
        <div>
            Participation Page
            if{loadSurveys()}
            <button onClick={() => refreshSurveys()}>Refresh</button>
            <div></div>
            <table  className="table table-bordered text-white" >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    surveyList.map(c =>
                        <tr key={c.SurveyID}>
                        <td>{c.Title}</td>
                        <td>{c.Description}</td>
                        <td>{c.StartDate}</td>
                        <td>{c.EndDate}</td>
                        <td><button onClick={() => {setSurveyID(c.SurveyID);getQuestions(c.SurveyID);}}>Select</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
                
            <>{`surveyid ${surveyid}\nuserid ${props.userid}`}</>
            
            <div id="questions">
                {
                questionsList.map(c =>
                    displayQuestion(c)
                )}
            </div>
            <button onClick={() => {postResponses();}}>Sumbit</button>   
                        
        </div>
    )
}

export default Participation;