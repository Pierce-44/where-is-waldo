import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import GridLoader from 'react-spinners/ClipLoader';
import '../styles/Main.css';
import leaderBoard from '../images/leaderBoard.png';

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

function Main() {
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();
  const [imageThree, setImageThree] = useState();
  const [loading, setLoading] = useState(true);

  async function getImages() {
    const colRef = collection(db, 'selectionImages');
    const mapDocs = await getDocs(colRef);

    const mapUrlAddressOne = await mapDocs.docs[0].data().URL;
    const mapUrlAddressTwo = await mapDocs.docs[1].data().URL;
    const mapUrlAddressThree = await mapDocs.docs[2].data().URL;

    const urlOne = `url("${mapUrlAddressOne}")`;
    const urlTwo = `url("${mapUrlAddressTwo}")`;
    const urlThree = `url("${mapUrlAddressThree}")`;

    setImageOne({
      backgroundImage: urlOne,
    });
    setImageTwo({
      backgroundImage: urlTwo,
    });
    setImageThree({
      backgroundImage: urlThree,
    });

    setLoading(false);
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="Main">
      <div className="mainContainer">
        <div className="mainLoadingContainer">
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
            <Link to="/GameOne" className="linkContainer">
              <p className="link easyMap">Easy</p>
              <div style={imageOne} className="mainLoadingImage" />
            </Link>
          )}
        </div>
        <div className="mainLoadingContainer">
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
            <Link to="/GameTwo" className="linkContainer">
              <p className="link hardMap">Hard</p>
              <div style={imageTwo} className="mainLoadingImage" />
            </Link>
          )}
        </div>
        <div className="mainLoadingContainer">
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
            <Link to="/GameThree" className="linkContainer">
              <p className="link mediumMap">Medium</p>
              <div style={imageThree} className="mainLoadingImage" />
            </Link>
          )}
        </div>
      </div>
      <Link to="/LeaderBoard" className="linkMain">
        <div className="footerContainer">
          <div className="footerText">
            <p className="footerTextBlue">Check our your personal scores!</p>
            <p className="footerTextRed">View the leaderboard</p>
          </div>
          <img src={leaderBoard} alt="leader board" className="footerImg" />
        </div>
      </Link>
    </div>
  );
}

export default Main;
