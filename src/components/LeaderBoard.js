/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, orderBy } from 'firebase/firestore';
import Header from './Header';
import '../styles/LeaderBoard.css';

const firebaseConfig = {
  apiKey: 'AIzaSyAM4WXJajjCg7dDSakwcNr5bi6hO9_Q6Ck',
  authDomain: 'where-is-waldo-game.firebaseapp.com',
  projectId: 'where-is-waldo-game',
  storageBucket: 'where-is-waldo-game.appspot.com',
  messagingSenderId: '214090924447',
  appId: '1:214090924447:web:5cb4b77a2da741f10cfdaa',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function LeaderBoard() {
  const [highLightOne, setHighlightOne] = useState('highlight');
  const [highLightTwo, setHighlightTwo] = useState('noHighlight');
  const [highLightThree, setHighlightThree] = useState('noHighlight');
  const [map, setMap] = useState('GameOne');
  const [showLeaderBoardOne, setShowLeaderBoardOne] = useState('showLB');
  const [showLeaderBoardTwo, setShowLeaderBoardTwo] = useState('hideLB');
  const [showLeaderBoardThree, setShowLeaderBoardThree] = useState('hideLB');

  function handleColorChange(e) {
    if (e.target.id === 'one') {
      setHighlightOne('highlight');
      setHighlightTwo('noHighlight');
      setHighlightThree('noHighlight');
      setMap('GameOne');
      setShowLeaderBoardOne('showLB');
      setShowLeaderBoardTwo('hideLB');
      setShowLeaderBoardThree('hideLB');
    } else if (e.target.id === 'two') {
      setHighlightTwo('highlight');
      setHighlightOne('noHighlight');
      setHighlightThree('noHighlight');
      setMap('GameTwo');
      setShowLeaderBoardOne('hideLB');
      setShowLeaderBoardTwo('showLB');
      setShowLeaderBoardThree('hideLB');
    } else if (e.target.id === 'three') {
      setHighlightThree('highlight');
      setHighlightTwo('noHighlight');
      setHighlightOne('noHighlight');
      setMap('GameThree');
      setShowLeaderBoardOne('hideLB');
      setShowLeaderBoardTwo('hideLB');
      setShowLeaderBoardThree('showLB');
    }
  }

  function GameOneTable() {
    return TableFactory('mapOneLeaderBoard', showLeaderBoardOne);
  }

  function GameTwoTable() {
    return TableFactory('mapTwoLeaderBoard', showLeaderBoardTwo);
  }

  function GameThreeTable() {
    return TableFactory('mapThreeLeaderBoard', showLeaderBoardThree);
  }

  return (
    <div>
      <Header />
      <div className="leaderBoardPageContainer">
        <p className="leaderBoardHeader">Leaderboard</p>
        <div className="buttonContainerLB">
          <Link to={`/${map}`}>
            <button type="button" className="leaderBoardButton">
              Play This Map
            </button>
          </Link>
          <Link to="/">
            <button type="button" className="leaderBoardButton">
              Back To Home
            </button>
          </Link>
        </div>
        <div className="upperContainerImagesLB">
          <div
            className={`subContainerImagesLB ${highLightOne}`}
            onClick={(e) => handleColorChange(e)}
            id="one"
          >
            <div className="imageMapOne" id="one" />
            <p className="easyMap subTextLB" id="one">
              Easy Map
            </p>
          </div>
          <div
            className={`subContainerImagesLB ${highLightTwo}`}
            onClick={(e) => handleColorChange(e)}
            id="two"
          >
            <div className="imageMapTwo" id="two" />
            <p className="hardMap subTextLB" id="two">
              Hard Map
            </p>
          </div>
          <div
            className={`subContainerImagesLB ${highLightThree}`}
            onClick={(e) => handleColorChange(e)}
            id="three"
          >
            <div className="imageMapThree" id="three" />
            <p className="mediumMap subTextLB" id="three">
              Medium Map
            </p>
          </div>
        </div>
      </div>
      <GameOneTable />
      <GameTwoTable />
      <GameThreeTable />
    </div>
  );
}

function TableFactory(mapLB, classHide) {
  const [userNames, setUserNames] = useState([]);
  const [userTimes, setUserTimes] = useState([]);

  async function getData() {
    const querySnapshot = await getDocs(
      collection(db, mapLB),
      orderBy('timestamp', 'desc')
    );

    querySnapshot.forEach((doc) => {
      setUserNames((oldArray) => [...oldArray, doc.id]);
      setUserTimes((oldArray) => [...oldArray, doc.data().time]);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`leaderBoardTable ${classHide}`}>
      <div className="nameColumn">
        <p className="tableHeader">Username</p>
        {userNames.map((names, index) => (
          <p key={index} className="columnText">
            {names}
          </p>
        ))}
      </div>
      <div className="timeColumn">
        <p className="tableHeader">Time (seconds)</p>
        {userTimes.map((scores, index) => (
          <p key={index} className="columnText">
            {scores}
          </p>
        ))}
      </div>
    </div>
  );
}

export default LeaderBoard;
