import { useState } from 'react';
import Axios from 'axios';
import './Viewing.css'

function Viewing(props) {
  const [surveyid,    setSurveyID]    = useState(0);
  const [surveys,     setSurveys]     = useState([]);
  const [questionid,  setQuestionID]  = useState(0);
  const [questions,   setQuestions]   = useState([]);
  const [qtype,       setQType]       = useState(0);
  const [results,     setResults]     = useState([]);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(11);
  const [mean, setMean] = useState(0);
  const [total, setTotal] = useState(0);
  const [ans, setAns] = useState([]);

  const [res, setRes] = useState();


  const getSurveys = () => {
    Axios.post(`${props.host}:3002/get_surveys_user`, {
      user_id: props.userid 
    }).then((response) => {
      // console.log(`Response get_surveys_user: ${Object.values(response.data[0])}\nUserID: ${props.userid}`);
      setSurveys(response.data);
    });
  } 

  const showSurveys = () => {
    if (!surveys.length) getSurveys();
    return (!surveys.length && surveys[0] !== 1 ? <h2>{`You have no surveys to display. ${setSurveys([1])}`}</h2> : (
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
                  <button onClick={() => {setSurveyID(s.SurveyID); setQuestionID(0); getQuestions();}}>Select</button>
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

  const getQuestions = () => {
    Axios.post(`${props.host}:3002/get_questions`, {
      survey_id: surveyid
    }).then((response) => {
      // {QuestionID: *, QuestionType: *, Question: *}
      // console.log(`Response get_questions: ${Object.values(response.data[0])}`)
      setQuestions(response.data);
    })
  }

  const showQuestions = () => {
    return (!questions.length ? <h2>{`Survey have no questions to display.`}</h2> : (
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
                  <button onClick={() => {setQuestionID(q.QuestionID); setQType(q.QuestionType); getResults();}}>Select</button>
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

  const getResults = () => {
    Axios.post(`${props.host}:3002/get_results_survey`, {
      survey_id: surveyid
    }).then((response) => {
      // {QuestionID: *, Response: *}
      // console.log(`Response get_results_survey: ${Object.values(response.data[0])}`)
      setResults(response.data)
    })
  }

  const showResults = () => {
    return (!results.length ? <h1>Question has no responses to display.</h1> : (
      // (qtype ? numResponse(selectR()) : worResponse(selectR()))
      (qtype ? 
        <>
          {numResponse()}
        </> 
        : selectR().map((r, i) => {return (<p>{`Response ${i+1}: ${r}`}</p>)}))
    ));
  }

  const selectR = () => {
    // for (let i = 0; i < results.length; i++) console.log(`QuestionID: ${results[i].QuestionID} | Response: ${results[i].Response}`)
    let r = [];
    for (let i = 0; i < results.length; i++) {
      if (results[i].QuestionID === questionid) { 
        r.push(results[i].Response);
      }
    }
    return r;
  }

  const numResponse = (r) => {
    let total = 0;
    let num = 0;
    let max = 0;
    let min = 11;
  
    for (let i = 0; i < results.length; i++) {
      if (results[i].QuestionID == questionid) {
        total += parseInt(results[i].Response);
        num++;
        if (parseInt(results[i].Response) > max) max = parseInt(results[i].Response);
        if (parseInt(results[i].Response) < min) min = parseInt(results[i].Response);
      }
    }
    return (
      <>
        <p>{`Mean: ${total / num}`}</p>
        <p>{`Range: [${min},${max}]`}</p>
      </>
    )
    
  }

  return (
      <div className='viewing'>
        {/* <>{`surveyid:${surveyid} | questions:${questionid} | response:${results}`}</> */}
        <hr className='line'/>
        {showSurveys()}
        <hr className='line'/>
        {surveyid !== 0 && showQuestions()}
        <hr className='line'/>
        {questionid !== 0 && showResults()}
      </div>
  )
}

export default Viewing;