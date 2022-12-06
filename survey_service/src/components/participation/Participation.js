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
            console.log(`getSurveys: ${response.data}`)
        });
    }

    const showSurveys = () => {
        // console.log(`surveys: ${surveys}`);
        if (!surveys.length) getSurveys();
        return (!surveys.length ? <p>no surveys to show</p> : (
            <table>
                <thead>
                    <tr>
                        <th>Selection</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                {surveys.map(s => {
                    return (
                    <tr>
                        <td>
                            <button onClick={() => {setSID(s.SurveyID); getQuestions()}}>Select</button>
                        </td>
                        <td>{s.Title}</td>
                        <td>{s.Description}</td>
                        <td>{s.StartDate}</td>
                        <td>{s.EndDate}</td>
                    </tr>
                    )
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

            let r = [];
            let q = [];
            for (let i = 0; i < response.data.length; i++) {
                r.push(response.data[i].QuestionType ? "1" : "Empty.");
                q.push(response.data[i].QuestionID);
            }
            setResponses(r);
            setQRM(q);
            
            // console.log(`r: ${r}`);
        });
    }

    const showQuestions = () => {
        if (!questions.length) getQuestions();
        return (!questions.length ? <p>no questions for this survey</p> : (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Response</th>
                        </tr>
                    </thead>
                    <tbody>
                    {questions.map((q, i) => {
                        return (q.QuestionType ? (
                            <tr>
                                <td>{q.Question}</td>
                                <td>
                                    <select 
                                        name="typeValue" 
                                        id="typeValue"
                                        onChange={(e) => {saveResponse(e.target.value, i)}}
                                    > 
                                        <option value = "1">1</option>
                                        <option value = "2">2</option>
                                        <option value = "3">3</option>
                                        <option value = "4">4</option>
                                        <option value = "5">5</option>
                                    </select>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td>{q.Question}</td>
                                <td>
                                    <input 
                                        type="text" 
                                        placeholder="Text Response..." 
                                        onChange={(e) => {saveResponse(e.target.value, i)}}
                                    />
                                </td>
                            </tr>
                        ))
                    })}
                    </tbody>
                </table>
                <button onClick={() => {postResponses()}}>Submit</button>
            </>
        ))
    }

    const saveResponse = (v, i) => {
        let r = responses;
        console.log(v);
        r[i] = v;
        setResponses(r); 
    }

    const postResponses = () => {
        Axios.post(`${props.host}:3002/add_response`, {
            userid: props.userid,
            rtoq: qrm,
            responses: responses
        }).then((response) => {
            console.log(`postResponses: ${response}`);
        });
    }

    return (
        <div className="participation">
            {showSurveys()}
            {sid !== 0 && showQuestions()}
        </div>
    );
}

export default Participation;
