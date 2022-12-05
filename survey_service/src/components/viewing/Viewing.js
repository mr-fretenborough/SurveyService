import { useState } from 'react';
import Axios from 'axios';
import './Viewing.css'

function Viewing(props) {
  const [surveyid, setSurveyID] = useState(0);
  const [questionid, setQuestionID] = useState(0);
  const [surveys, setSurveys] = useState([]);
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);

  const getAllSurveys = () => {
    Axios.post(`${props.host}:3002/get_surveys_user`, {
      user_id: props.userid 
    }).then((response) => {
      console.log(`Response: ${response.data[0]}\nUserID: ${props.userid}`);
      if (!response.data.length) setSurveyID(-1);
      setSurveys(response.data);
    });
  } 

  const getResults = () => {
    Axios.post(`${props.host}:3002/get_results_survey`, {
      survey_id: surveyid
    }).then((response) => {
      // {QuestionID: n, Response: ""}
      console.log(`Response get_results_survey: ${Object.values(response.data)}`)
      setResults(response.data)
    })
  }

  const getQuestions = () => {
    Axios.post(`${props.host}:3002/get_questions`, {
      survey_id: surveyid
    }).then((response) => {
      console.log(`Response get_questions: ${Object.values(response.data)}`)
      setQuestions(response.data);
    })
  }

  const createSurveyTable = () => {
    if (!surveys.length) getAllSurveys(props.userid);
    if (surveyid === -1) return null;
    return (!surveys ? null : (
      <>
        <tr>
          <td>Selection</td>
          <td>Title</td>
          <td>Description</td>
          <td>Start Date</td>
          <td>End Date</td>
        </tr>
        {surveys.map(s => {
          return (
            <tr className='row'>
              <td className='cell'>
                <button onClick={() => {setSurveyID(s.SurveyID)}}>Select</button>
              </td>
              {Object.values(s).map(f => {
                return typeof f !== 'number' ? <td className='cell'>{f}</td> : null
              })}
            </tr>
          );
        })}
      </>
    ))
  }

  const showResults = () => {
    getQuestions();
    return (questions.length ? null : (
      <>
      <tr>
        <td>Selection</td>
        <td>Question Type</td>
        <td>Question</td>
      </tr>
      {questions.map(s => {
        return (
          <tr className='row'>
            <td className='cell'>
              <button onClick={() => {setQuestionID(s.QuestionID)}}>Select</button>
            </td>
            {Object.values(s).map(f => {
              return typeof f !== 'number' ? <td className='cell'>{f}</td> : null
            })}
          </tr>
        );
      })}
    </>
    ))
  }

  // getAllSurveys();
  return (
      <div className='viewing'>
        <table className='table' border="1">{createSurveyTable()}</table>
        <>{`surveyid ${surveyid}\nuserid ${props.userid}`}</>
        {surveyid != 0 && showResults()}
      </div>
  )
}

export default Viewing;