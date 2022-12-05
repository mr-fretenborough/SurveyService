import { useState } from "react";
import Axios from "axios";
import "./Creation.css";


function Creation(props) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [description, setDescription] = useState("");
    const [questionList, setQuestionList] = useState([{ question: "", typeValue: 0 }]);

    console.log(questionList);

    const createSurvey = () => {
        Axios.post(`${props.host}:3002/create_survey`, {
                userid: props.userid,
                title: title,
                startDate: start,
                endDate: end,
                description: description,
                questionList: questionList
        }).then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    const handleQuestionChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...questionList];
      list[index][name] = value;
      setQuestionList(list);
    };
  
    const handleQuestionRemove = (index) => {
      const list = [...questionList];
      list.splice(index, 1);
      setQuestionList(list);
    };
  
    const handleQuestionAdd = () => {
      setQuestionList([...questionList, { question: "" }]);
    };
  
    return (
        <form className="App" autoComplete="off">
        <div>
            <label> 
                Title
                <input 
                    type="text"
                    id="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
        </div>
        <div>
            <label> 
                Description
                <input 
                    type="text"
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
        </div>
        <div>
            <label> 
                Start: <input 
                    type="text" 
                    id="start" 
                    name="start" 
                    onChange={(e) => setStart(e.target.value)}
                    required/>
                End: <input 
                    type="text" 
                    id="end" 
                    name="end" 
                    onChange={(e) => setEnd(e.target.value)} 
                    required/>
            </label>
        </div>
        <div className="form-field">
          <label htmlFor="question">Question(s)</label>
          {questionList.map((singleQuestion, index) => (
            <div key={index} className="questions">
              <div className="first-division">
                <input
                  name="question"
                  type="text"
                  id="question"
                  value={singleQuestion.question}
                  onChange={(e) => handleQuestionChange(e, index)}
                  required
                />
                {questionList.length - 1 === index && (
                  <button
                    type="button"
                    onClick={handleQuestionAdd}
                    className="add-btn"
                  >
                    <span>Add question</span>
                  </button>
                )}
              </div>
              <div>
                <label>
                    Select question type:
                    <select 
                        name="typeValue" 
                        id="typeValue"
                        onChange={(e) => setQuestionList.typeValue(e.target.value)}
                    > 
                        <option value = "type 1">Free Response</option>
                        <option value = "type 2">Rating</option>
                    </select>
                </label>
                </div>
              <div className="second-division">
                {questionList.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => handleQuestionRemove(index)}
                    className="remove-btn"
                  >
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => createSurvey()}> <span>Submit</span> </button>
      </form>
    );
}

export default Creation;