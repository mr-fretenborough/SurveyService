import { useState } from 'react';
import Axios from 'axios';
import './Viewing.css'

function Viewing(props) {
  const [surveyid,    setSurveyID]    = useState(0);
  const [surveys,     setSurveys]     = useState([]);
  const [nosurveys,   setNoSurveys]   = useState(0);
  const [questionid,  setQuestionID]  = useState(0);
  const [questions,   setQuestions]   = useState([]);
  const [noquestions, setNoQuestions] = useState(0);
  const [qtype,       setQType]       = useState(0);
  const [results,     setResults]     = useState([]);
  const [noresults,   setNoResults]   = useState(0);


  const getSurveys = () => {
    Axios.post(`${props.host}:3002/get_surveys_user`, {
      user_id: props.userid 
    }).then((response) => {
      // console.log(`Response get_surveys_user: ${Object.values(response.data[0])}\nUserID: ${props.userid}`);
      if (!response.data.length) setNoSurveys(1);
      setSurveys(response.data);
    });
  } 

  const getQuestions = () => {
    Axios.post(`${props.host}:3002/get_questions`, {
      survey_id: surveyid
    }).then((response) => {
      // {QuestionID: *, QuestionType: *, Question: *}
      // console.log(`Response get_questions: ${Object.values(response.data[0])}`)
      if (!response.data.length) setNoQuestions(1);
      setQuestions(response.data);
    })
  }

  const getResults = () => {
    Axios.post(`${props.host}:3002/get_results_survey`, {
      survey_id: surveyid
    }).then((response) => {
      // {QuestionID: *, Response: *}
      // console.log(`Response get_results_survey: ${Object.values(response.data[0])}`)
      if (!response.data.length) setNoResults(1);
      setResults(response.data)
    })
  }

  const showSurveys = () => {
    if (!nosurveys && !surveys.length) getSurveys();
    return (nosurveys ? <h2>You have no surveys to display.</h2> : (
      <table>
        <tr>
          <td>Selection</td>
          <td>Title</td>
          <td>Description</td>
          <td>Start Date</td>
          <td>End Date</td>
        </tr>
        {surveys.map(s => {
          return (
            <tr>
              <td>
                <button onClick={() => {setSurveyID(s.SurveyID)}}>Select</button>
              </td>
              <td>{s.Title}</td>
              <td>{s.Description}</td>
              <td>{s.StartDate}</td>
              <td>{s.EndDate}</td>
            </tr>
          )
        })}
      </table>
    ));
  }
  const showQuestions = () => {
    if (!noquestions && !questions.length) getQuestions();
    return (noquestions ? <h2>Survey has no questions to display.</h2> : (
      <table>
        <tr>
          <td>Selection</td>
          <td>QuestionType</td>
          <td>Question</td>
        </tr>
        {questions.map(q => {
          return (
            <tr>
              <td>
                <button onClick={() => {setQuestionID(q.QuestionID); setQType(q.QuestionType)}}>Select</button>
              </td>
              <td>{q.QuestionType}</td>
              <td>{q.Question}</td>
            </tr>
          )
        })}
      </table>
    ))
  }
  const showResults = () => {
    return qtype ? (
      1
    ) : (
      2
    );
  }
  const showSurveyssss = () => {
    return 1;
  }

  return (
      <div className='viewing'>
        <>{`surveyid:${surveyid}   questionid:${questionid}`}</>
        {showSurveys()}
        {surveyid && showQuestions()}
        {questionid && showResults()}
      </div>
  )
}

export default Viewing;