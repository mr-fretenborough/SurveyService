import { useEffect, useState } from "react";
import Axios from 'axios';
//import {format} from 'date-fns'
import './Participation.css';

function Participation(props) {
    
    const [sid,         setSID]         = useState(0);
    const [surveys,     setSurveys]     = useState([]);
    const [questions,   setQuestions]   = useState([]);
    const [responses,   setResponses]   = useState([]);
    const [qrm,         setQRM]         = useState([]);

    const getSurveys = () => {
        Axios.post(`${props.host}:3002/get_surveys`, {
        }).then((response) => {
            setSurveys(response.data);
        });
    }

    const showSurveys = () => {
        return (surveys.length ? <p>no surveys to show</p> : (
            <table>
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
                    {surveys.map(survey => {
                        return Object.values(survey).map(s => {
                            return <td>{s}</td>
                        })
                    })}
                </tbody>
            </table>
        ))
    }

    const getQuestions = () => {
        Axios.post(`${props.host}:3002/get_questions_by_surveyid`, {
            surveyid: sid
        }).then((response) => {
            setQuestions(response.data);
            // console.log(`getQuestions response: ${response.data}\nql ${questionsList.length}`);
        });
    }

    const showQuestions = (c, i) => {
        if (c.QuestionType === 0) {
            return (
                <tr key={c.QuestionID}>
                <td>{c.Question}</td>
                <td><select 
                        name="typeValue" 
                        id="typeValue"
                        onChange={(e) => {
                            let new_r = responses; 
                            new_r[i]=e.target.value;
                            setResponseList(new_r);
                        }}
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
        } else {
           return(
                <tr key={c.QuestionID}>
                <td>{c.Question}</td>
                <td><input type="text" placeholder="Text Response..." onChange={(e) => {let new_r = responsesList; new_r[i]=e.target.value;setResponseList(new_r);}}></input>
                </td>
                </tr>
            ) 
        }
    }

    const postResponses = () => {
        for (let i = 0; i<responsesList.length; i++){
            Axios.post(`${props.host}:3002/add_response`, {
                userid: props.userid,
                questionid: responsequestionsList[i],
                response: responsesList[i]
                }).then((response) => {
                setQuestions(response.data);
                console.log(response.data);
                 });
        }
        
    }

    const postResponsesKier = () => {
        console.log(`RtoQ:${responsequestionsList}\nResponses:${responsesList}\nQuestions:\n${questionsList.map(i => {return `qid:${i.QuestionID},q:${i.Question}\n`})}`);
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
    const initRes = () => {
        if (!responsesList.length) 
        for (let i = 0; i < questionsList.length; i++) {
            console.log(`q ${questionsList[0].QuestionID} r ${responsesList}`);
            setResponseList(responsesList + "");
            setResponseQuestionsList(responsequestionsList.push(questionsList[i].QuestionID));
        }
    }
    initRes();

    return (
        <div className="participation">
            {showSurveys()}
        </div>
    );
}

export default Participation;
