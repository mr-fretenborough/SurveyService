import { useEffect, useState } from "react";
import Axios from 'axios';
//import {format} from 'date-fns'
import './Participation.css';

function Participation(props) {
    
    const [userid, setUserID] = useState("");
    const [surveyid, setSurveyID] = useState("");
    const [surveyList, setSurveys] = useState([]);
    const [questionsList, setQuestions] = useState([]);
    const [responsesList, setResponses] = useState([]);

    //displaySurveys;
    const displaySurveys = () => {
        Axios.post(`${props.host}:3002/get_surveys`, {
            
          }).then((response) => {
            setSurveys(response.data);
            console.log(response.data)
          });
    }

    //displayQuestions;
    useEffect(() => {
        Axios.post(`${props.host}:3002/search_questions`, {
            surveyid: surveyid
          }).then((response) => {
            setQuestions(response.data);
          });
    })

    const getSurveyID = (event) => {
        console.log(event.target.getAttribute('key')); 
    }

    return (
        <div>
            Participation Page
            <button onClick={() => displaySurveys()}>Refresh</button>
            <div></div>
            <table  className="table table-bordered text-white">
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
                        <td><button key={c.SurveyID} onClick={getSurveyID}>Select</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
                <div id="questions">
                    {
                    questionsList.map(c =>
                        <div key={c.id}>
                        <text>{c.Question}</text>
                        <input type="text" placeholder="Your Response..."></input>
                        </div>
                    )}
                </div>

        </div>
    )
}

export default Participation;