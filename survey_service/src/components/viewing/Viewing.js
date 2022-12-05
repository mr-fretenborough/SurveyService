import { useState } from 'react';

function Viewing(props) {
  const [surveyid, setServeyID] = useState(0);
  const [surveys, setSurveys] = useState([]);

  const getAllSurveys = (uid) => {
    Axios.post(`${props.host}:3002/get_surveys`, {
      user_id: props.userid 
    }).then((response) => {
      setSurveys(response.data);
    });
  } 

  const createSurveyTable = () => {
    return 1;
  }

  return (
      <div>
        this is ker 
      </div>
  )
}

export default Viewing;