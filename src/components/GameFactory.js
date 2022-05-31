/* eslint-disable no-empty */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import '../styles/GameBoard.css';
import GridLoader from 'react-spinners/ClipLoader';
import waldoIcon from '../images/waldoIcon.jpg';
import odlawIcon from '../images/odlawIcon.jpg';
import wizardIcon from '../images/wizardIcon.jpeg';
import home from '../images/home.png';
import leaderBoard from '../images/leaderBoard.png';
import PlayerDetailsForm from './PlayerDetailsForm';

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

function GameFactory(game, map, mapLB) {
  const imageRef = useRef();
  const [mapImage, setMapImage] = useState({});
  const [loading, setLoading] = useState(true);
  const [hideShow, setHideShow] = useState('hideMenu');
  const [clickStatus, setClickStatus] = useState('waiting');
  const [xMenu, setXMenu] = useState();
  const [yMenu, setYMenu] = useState();
  const [mapCoords, setMapCoords] = useState();
  const [selectedXCoord, setSelectedXCoord] = useState();
  const [selectedYCoord, setSelectedYCoord] = useState();
  const [waldoStatus, setWaldoStatus] = useState('');
  const [odlawStatus, setOdlawStatus] = useState('');
  const [wizardStatus, setWizardStatus] = useState('');
  const [displayForm, setDisplayForm] = useState('hideForm');
  const [timerStatus, setTimerStatus] = useState('running');
  const [count, setCount] = useState(1);

  const menuStyle = {
    top: `${yMenu}px`,
    left: `${xMenu}px`,
  };

  async function getMapDetails() {
    const colRef = collection(db, map);
    const mapDocs = await getDocs(colRef);
    const mapUrlAddress = await mapDocs.docs[1].data().URL;
    const coords = await mapDocs.docs[2].data();
    const url = `url("${mapUrlAddress}")`;

    setMapCoords(coords);
    setMapImage({
      backgroundImage: url,
    });
    setLoading(false);
  }

  function getCoords(e) {
    const rect = e.target.getBoundingClientRect();

    setXMenu(e.clientX);
    setYMenu(e.clientY);

    setSelectedXCoord(e.clientX - rect.left);
    setSelectedYCoord(e.clientY - rect.top);
  }

  function checkForWinner() {
    if (
      waldoStatus === 'hideCharacter' &&
      odlawStatus === 'hideCharacter' &&
      wizardStatus === 'hideCharacter'
    ) {
      setDisplayForm('displayForm');
      setTimerStatus('end');
      document.body.style.overflow = 'hidden';
    }
  }

  function checkCoords(name) {
    if (
      selectedXCoord > mapCoords[`Xmin${name}`] &&
      selectedXCoord < mapCoords[`Xmax${name}`] &&
      selectedYCoord > mapCoords[`Ymin${name}`] &&
      selectedYCoord < mapCoords[`Ymax${name}`]
    ) {
      handleCharacterStatus(name);
    } else {
    }
    setHideShow('hideMenu');
    setClickStatus('waiting');
  }

  function handleCharacterStatus(name) {
    if (name === 'Waldo') {
      setWaldoStatus('hideCharacter');
    } else if (name === 'Odlaw') {
      setOdlawStatus('hideCharacter');
    } else if (name === 'Wizard') {
      setWizardStatus('hideCharacter');
    }
  }

  function handleMapOnClick(e) {
    getCoords(e);

    // hide and show drop down menu
    if (clickStatus === 'waiting') {
      setHideShow('showMenu');
      setClickStatus('clicked');
    } else {
      setHideShow('hideMenu');
      setClickStatus('waiting');
    }
  }

  function timer() {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }

  useEffect(() => {
    checkForWinner();

    if (timerStatus === 'running') {
      timer();
    }
  });

  useEffect(() => {
    imageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });

    getMapDetails();
  }, []);

  return (
    <div ref={imageRef} className={map}>
      <div className="subHeader">
        <div className="upperSubHeader">
          <div className={`containerSubHeader ${waldoStatus}`}>
            <img src={waldoIcon} alt="waldo icon" className="characterIcons" />
            <p>Waldo</p>
          </div>
          <div className={`containerSubHeader ${odlawStatus}`}>
            <img src={odlawIcon} alt="odlaw icon" className="characterIcons" />
            <p>Odlaw</p>
          </div>
          <div className={`containerSubHeader ${wizardStatus}`}>
            <img
              src={wizardIcon}
              alt="wizard icon"
              className="characterIcons"
            />
            <p>Wizard</p>
          </div>
        </div>
        <div className="timer">
          <p>{count}s</p>
        </div>
        <div className="subHeaderLinks">
          <Link to="/LeaderBoard">
            <img src={leaderBoard} alt="leaderboard button" />
          </Link>
          <Link to="/">
            <img src={home} alt="home button" />
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="loader">
          <GridLoader
            color="red"
            loading={loading}
            size={150}
            speedMultiplier={1}
          />
        </div>
      ) : (
        <div>
          <div
            className={map}
            style={mapImage}
            onClick={(e) => handleMapOnClick(e)}
          />
          <div className={`dropDownMenu ${hideShow}`} style={menuStyle}>
            <div className="dropDownSub" onClick={() => checkCoords('Waldo')}>
              <img
                src={waldoIcon}
                alt="waldo icon"
                className="characterIcons"
              />
              <p>Waldo</p>
            </div>
            <div className="dropDownSub" onClick={() => checkCoords('Odlaw')}>
              <img
                src={odlawIcon}
                alt="odlaw icon"
                className="characterIcons"
              />
              <p>Odlaw</p>
            </div>
            <div
              className="dropDownSub noBorder"
              onClick={() => checkCoords('Wizard')}
            >
              <img
                src={wizardIcon}
                alt="wizard icon"
                className="characterIcons"
              />
              <p>Wizard</p>
            </div>
          </div>
        </div>
      )}
      <PlayerDetailsForm
        displayForm={displayForm}
        count={count}
        mapLB={mapLB}
        map={map}
      />
    </div>
  );
}

function GameOne() {
  return GameFactory('Game One', 'mapOne', 'mapOneLeaderBoard');
}

function GameTwo() {
  return GameFactory('Game Two', 'mapTwo', 'mapTwoLeaderBoard');
}

function GameThree() {
  return GameFactory('Game Three', 'mapThree', 'mapThreeLeaderBoard');
}

export { GameOne, GameTwo, GameThree };
