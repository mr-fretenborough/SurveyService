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
                  <button onClick={() => {setSurveyID(s.SurveyID); getQuestions()}}>Select</button>
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
    ));
  }
  const showQuestions = () => {
    return (noquestions ? <h2>Survey has no questions to display.</h2> : (
      <table>
        <thead>
          <tr>
            <th>Selection</th>
            <th>QuestionType</th>
            <th>Question</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(q => {
            return (
              <tr>
                <td>
                  <button onClick={() => {setQuestionID(q.QuestionID); setQType(q.QuestionType); getResults()}}>Select</button>
                </td>
                <td>{q.QuestionType}</td>
                <td>{q.Question}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    ))
  }
  const showResults = () => {
    return (noresults ? <h1>Question has no responses to display.</h1> : (
      (qtype ? numResponse(selectR()) : worResponse(selectR()))
    ));
  }
  const numResponse = (r) => {
    let total = 0;
    let min = 11;
    let max = 0;
    for (let i = 0; i < r.length; i++) {
      total += parseInt(r[i].Response);
      if (parseInt(r[i].Response) > max) max = parseInt(r[i].Response);
      if (parseInt(r[i].Response) < min) min = parseInt(r[i].Response);
    }
    let mean = total / r.length;
    return (
      <>
        <p>{`Mean: ${mean}`}</p>
        <p>{`Range: [${min},${max}]`}</p>
      </>
    )
  }
  const worResponse = (r) => {
    return (
      <>
        {r.map(r => {
          return <p>r.Response</p>
        })}
      </>
    );
  }
  const selectR = () => {
    let r = [];
    for (let i = 0; i < results.length; i++) 
      if (results[i].QuestionID = questionid)
        r.push(results[i]);
    return r;
  }

  return (
      <div className='viewing'>
        <>{`surveyid:${surveyid}   questionid:${questionid}`}</>
        <hr className='line'/>
        {showSurveys()}
        <hr className='line'/>
        {surveyid !== 0 && showQuestions()}
        {questionid !== 0 && showResults()}
      </div>
  )
}

export default Viewing;