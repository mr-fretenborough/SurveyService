import { useState } from 'react';
import Axios from 'axios';
import './Viewing.css'

function Viewing(props) {
  const [surveyid, setSurveyID] = useState(0);
  const [surveys, setSurveys] = useState([]);

  const getAllSurveys = () => {
    Axios.post(`${props.host}:3002/get_surveys`, {
      user_id: props.userid 
    }).then((response) => {
      console.log(`Response: ${response.data}\nUserID: ${props.userid}`);
      setSurveys(response.data);
    });
  } 

  const createSurveyTable = () => {
    if (!surveys.length) getAllSurveys(props.userid);
    return (!surveys ? null : (
      <>
        <tr>
          <td>Selection</td>
          <td>Survey ID</td>
          <td>User ID</td>
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
                return <td className='cell'>{f}</td>
              })}
            </tr>
          );
        })}
      </>
    ))
  }

  const showResults = () => {
    return 1
  }

  return (
      <div className='viewing'>
        <table className='table' border="1">{createSurveyTable()}</table>
        <hr></hr>
        <body>{surveyid}</body>
        {surveyid != 0 && showResults()}
      </div>
  )
}

export default Viewing;