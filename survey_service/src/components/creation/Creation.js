import { useState } from "react";
import Axios from "axios";
import "./Creation.css";


function Creation(props) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [description, setDescription] = useState("");
    const [questionList, setQuestionList] = useState([{ question: "" }]);
    const [typeValueList, setTypeValueList] = useState([{ typeValue: "" }])
    
    const createSurvey = () => {
        Axios.post(`${props.host}:3002/create_survey`, {
            userid: props.userid,
            title: title,
            startDate: start,
            endDate: end,
            description: description,
            questionList: questionList,
            typeValueList: typeValueList
        }).then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    console.log(questionList);
    console.log(typeValueList);

    const handleQuestionChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...questionList];
      list[index][name] = value;
      setQuestionList(list);
    };

    const handleTypeValueChange = (e, index) => {
        const { name, value } = e.target;
        const list2 = [...typeValueList];
        list2[index][name] = value;
        setTypeValueList(list2);
    }
  
    const handleQuestionRemove = (index) => {
      const list = [...questionList];
      list.splice(index, 1);
      setQuestionList(list);
    };

    const handleTypeValueRemove = (index) => {
        const list2 = [...typeValueList];
        list2.splice(index, 1);
        setTypeValueList(list2);
    };
  
    const handleQuestionAdd = () => {
      setQuestionList([...questionList, { question: "" }]);
    };

    const handleTypeValueAdd = () => {
        setTypeValueList([...typeValueList, { typeValue: "" }]);
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
                    type="date" 
                    id="start" 
                    name="start"
                    onChange={(e) => setStart(e.target.value)}
                    required/>
                End: <input 
                    type="date" 
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
                    <label>
                        Select question type:
                        <select 
                            name="typeValue" 
                            id="typeValue"
                            onChange={(e) => handleTypeValueChange(e, index)}
                        > 
                            <option value = {""}>Free Response</option>
                            <option value = {true}>Rating</option>
                        </select>
                    </label>
                {questionList.length - 1 === index && (
                  <button
                    type="button"
                    onClick={() => {handleQuestionAdd(); handleTypeValueAdd();}}
                    className="add-btn"
                  >
                    <span>Add question</span>
                  </button>
                )}
              </div>
              <div className="second-division">
                {questionList.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => {handleQuestionRemove(index); handleTypeValueRemove(index);}}
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