import { useState } from 'react';
import './App.css';
import Login from '../login/Login';
import Creation from '../creation/Creation';
import Participation from '../participation/Participation';
import Viewing from '../viewing/Viewing';

function App(props) {
  const [view, setView] = useState(0);
  const [userid, setUserID] = useState(0);

  const loggedIn = (uid) => {
    setUserID(uid);
    setView(5); // 5 is an arbitrary number
    console.log(`userid: ${userid}\n`);
  }

  return (
    <div className="App">
      {
        view != 0 &&
        <h1 className="header">
          <button className="button" onClick={() => setView(1)}>Survey Creation</button>
          <button className="button" onClick={() => setView(2)}>Survey Participation</button>
          <button className="button" onClick={() => setView(3)}>Survey Results</button>
        </h1>
      }
      {view === 0 && <Login host={props.host} loggedIn={loggedIn}/>}
      {view === 1 && <Creation/>}
      {view === 2 && <Participation/>}
      {view === 3 && <Viewing host={props.host} userid={userid}/>}
    </div>
  );
}

export default App;
