import { useState } from 'react';
import Axios from 'axios';
import './App.css';
import Login from '../login/Login';
import Creation from '../creation/Creation';
import Participation from '../participation/Participation';
import Viewing from '../viewing/Viewing';

function App() {
  const [view, setView] = useState(3);

  const createUser = () => {
    Axios.get("http://18.207.227.234:3002/testing_api", {
      val: view
    }).then(() => {
      alert("this is an alert, ew")
    });
  }

  return (
    <div className="App">
      {
        view != 0 &&
        <h1 className="header">
          <button className="button" onClick={createUser}>Survey Creation</button>
          <button className="button" onClick={() => setView(2)}>Survey Participation</button>
          <button className="button" onClick={() => setView(3)}>Survey Results</button>
        </h1>
      }
      {view === 0 && <Login/>}
      {view === 1 && <Creation/>}
      {view === 2 && <Participation/>}
      {view === 3 && <Viewing/>}
    </div>
  );
}

export default App;
