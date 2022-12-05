import { useEffect, useState } from "react";
import Axios from 'axios';

function Participation() {
    
    const [userid, setUserID] = useState("");
    const [surveyid, setSurveyID] = useState("");
    const [surveyList, setSurveys] = useState([]);
    const [questionsList, setQuestions] = useState([]);
    const [responsesList, setResponses] = useState([]);

    //displaySurveys;
    useEffect(() => {
        Axios.get("http://18.207.227.234:3002/get_surveys", {
            
          }).then((response) => {
            setSurveys(response.data);
          });
    })

    //displayQuestions;
    useEffect(() => {
        Axios.get("http://18.207.227.234:3002/search_questions", {
            surveyid: surveyid
          }).then((response) => {
            setQuestions(response.data);
          });
    })

    return (
        <div>
            <div id="surveys">
                {
                surveyList.map(c =>
                    <div key={c.id}>
                    <text>{c.Title}</text>
                    <text>{c.Description}</text>
                    </div>
                )}
                
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
        </div>
    )
}

export default Participation;