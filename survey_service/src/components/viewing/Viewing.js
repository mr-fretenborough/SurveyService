import { useState } from 'react';
import Axios from 'axios';
import './Viewing.css'

function Viewing(props) {
  const [surveyid,    setSurveyID]    = useState(0);
  const [surveys,     setSurveys]     = useState([]);
  const [nosurveys,   setNoSurveys]   = useState(0);
  const [questionid,  setQuestionID]  = useState(0);
  const [questions,   setQuestions]   = useState([]);
  const [noquestions, setNoQuestions]   = useState(0);
  const [results,     setResults]     = useState([]);
  const [noresults,   setNoResults]   = useState(0);


  const getSurveys = () => {
    Axios.post(`${props.host}:3002/get_surveys_user`, {
      user_id: props.userid 
    }).then((response) => {
      console.log(`Response get_surveys_user: ${Object.values(response.data[0])}\nUserID: ${props.userid}`);
      if (!response.data.length) setNoSurveys(1);
      setSurveys(response.data);
    });
  } 

  const getResults = () => {
    Axios.post(`${props.host}:3002/get_results_survey`, {
      survey_id: surveyid
    }).then((response) => {
      // {QuestionID: *, Response: *}
      console.log(`Response get_results_survey: ${Object.values(response.data[0])}`)
      setResults(response.data)
    })
  }

  const getQuestions = () => {
    Axios.post(`${props.host}:3002/get_questions`, {
      survey_id: surveyid
    }).then((response) => {
      // {QuestionID: *, QuestionType: *, Question: *}
      console.log(`Response get_questions: ${Object.values(response.data[0])}`)
      if (!response.data.length) setNoQuestions(1);
      setQuestions(response.data);
    })
  }

  const showSurveys = () => {
    if (!nosurveys && !surveys.length) getSurveys();
    return (!surveys.length ? <h2>testt</h2> : (
      <table>
        <td>
          <tr>
            test
          </tr>
        </td>
      </table>
    ))
    return 1;
  }
  const showQuestions = () => {
    return 1;
  }
  const showResults = (type) => {
    return 1;
  }
  const showSurveyssss = () => {
    return 1;
  }

  return (
      <div className='viewing'>
        {surveyid !== 0 && showSurveys()}
        {questionid !== 0 && showQuestions()}
      </div>
  )
}

export default Viewing;