import { useEffect, useState } from "react";
import Axios from 'axios';
//import {format} from 'date-fns'
import './Participation.css';

function Participation(props) {
    
    const [surveyid, setSurveyID] = useState(0);
    const [surveyList, setSurveys] = useState([]);
    const [nosurveys,   setNoSurveys]   = useState(0);
    const [questionsList, setQuestions] = useState([]);
    const [responsesList, setResponseList] = useState([]);
    const [responsequestionsList, setResponseQuestionList] = useState([]);

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
                if (!responseList.length) 
                    for (let i = 0; i < questionList.length; i++) {
                        setResponseList(responseList.push(""));
                        setResponseQuestionList(responsequestionsList.push(questionsList[i].QuestionID));
                    }
                console.log(response.data);
            });
    }

    const displayQuestion = (c, i) => {
        if(c.QuestionType==0){
            return(
                <tr key={c.QuestionID}>
                <td>{c.Question}</td>
                <td><select 
                        name="typeValue" 
                        id="typeValue"
                        onChange={(e) => {let new_r = responsesList; new_r[i]=e.target.val;setResponseList(new_r);}}
                    > 
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                        <option value = "4">4</option>
                        <option value = "5">5</option>
                    </select>
                </td>
                </tr>
                )
        }else{
           return(
                <tr key={c.QuestionID}>
                <td>{c.Question}</td>
                <td><input type="text" placeholder="Text Response..." onChange={(e) => {let new_r = responsesList; new_r[i]=e.target.val;setResponseList(new_r);}}></input>
                </td>
                </tr>
            ) 
        }
    }

    const postResponses = () => {
        for (let i = 0; i<responsesList.length; i++){
            Axios.post(`${props.host}:3002/add_response`, {
                userid: props.userid,
                questionid: responsesquestionList[i],
                response: responsesList[i]
                }).then((response) => {
                setQuestions(response.data);
                console.log(response.data);
                 });
        }
        
    }

    const postResponsesKier = () => {
        Axios.post(`${props.host}:3002/add_response`, {
            userid: props.userid,
            rtoq: responsequestionsList,
            responses: responsesList
        }).then((response) => {
            console.log(response);
        })
    }

    // get questions
    // initialize resonse list R
    // R -> Q list init
    // create elements
    // tezt box elem onchange(changeR())


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
                        <td><button onClick={() => {setSurveyID(c.SurveyID);setResponseList([]);setResponseQuestionList([]);getQuestions(c.SurveyID);}}>Select</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
                
            <>{`surveyid ${surveyid}\nuserid ${props.userid}`}</>
            
            <br></br>
            
            <table  className="table table-bordered text-white" >
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Response</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    questionsList.map((c, i) =>
                        displayQuestion(c, i)
                    )}
                </tbody>
            </table>

            <button onClick={() => {postResponsesKier();}}>Sumbit</button>   
                        
        </div>
    )
}

export default Participation;


//if (!responseList.length) for (let i = 0; i < questionList.length; i++) setResponseList(responseList.push(""));