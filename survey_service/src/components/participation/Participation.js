import { useEffect, useState } from "react";
import Axios from 'axios';

function Participation() {
    
    const [surveyid, setSurveyID] = useState("");
    const [userid, setUserID] = useState("");
    const [questionsList, setQuestions] = useState([]);
    const [responsesList, setResponses] = useState([]);

    const displayQuestions = () => {
        Axios.get("http://18.207.227.234:3002/search_questions", {
            //questions: questionsList

          }).then((response) => {
            //questions = questionsList
          });
          //Console.log(questions);

          //setQuestions(questions);
    }

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