import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GridLoader from 'react-spinners/ClipLoader';
import '../styles/Main.css';
import leaderBoard from '../images/leaderBoard.png';

function Main() {
  const [loading, setLoading] = useState(true);
  const [imageOne, setImageOne] = useState(false);
  const [imageTwo, setImageTwo] = useState(false);
  const [imageThree, setImageThree] = useState(false);

  useEffect(() => {
    console.log('fire');
    if (imageOne === true && imageTwo === true && imageThree === true) {
      setLoading(false);
      console.log('fire');
    }
  }, [imageOne, imageTwo, imageThree]);

  return (
    <div className="Main">
      <div className="mainContainer">
        <div className="mainLoadingContainer">
          <div className={`loader ${loading ? 'showLoader' : 'hideLoader'}`}>
            <GridLoader
              color="red"
              loading={loading}
              size={150}
              speedMultiplier={1}
            />
          </div>
          <Link
            to="/GameOne"
            className={`linkContainer ${
              loading ? 'hideLinkContent' : 'showLinkContent'
            }`}
          >
            <p className="link easyMap">Easy</p>
            <img
              className="mainLoadingImage"
              src="https://firebasestorage.googleapis.com/v0/b/where-is-waldo-game.appspot.com/o/selectionOne.jpg?alt=media&token=18ba5ff6-5a7a-4640-8696-dfbd9dfc7a84"
              alt="map one"
              onLoad={() => {
                setImageOne(true);
                console.log('loaded');
              }}
            />
          </Link>
        </div>
        <div className="mainLoadingContainer">
          <div className={`loader ${loading ? 'showLoader' : 'hideLoader'}`}>
            <GridLoader
              color="red"
              loading={loading}
              size={150}
              speedMultiplier={1}
            />
          </div>
          <Link
            to="/GameTwo"
            className={`linkContainer ${
              loading ? 'hideLinkContent' : 'showLinkContent'
            }`}
          >
            <p className="link hardMap">Hard</p>
            <img
              className="mainLoadingImage"
              src="https://firebasestorage.googleapis.com/v0/b/where-is-waldo-game.appspot.com/o/selectionTwo.jpg?alt=media&token=733357aa-ff97-476b-a22b-cba20cb656e4"
              alt="map two"
              onLoad={() => setImageTwo(true)}
            />
          </Link>
        </div>
        <div className="mainLoadingContainer">
          <div className={`loader ${loading ? 'showLoader' : 'hideLoader'}`}>
            <GridLoader
              color="red"
              loading={loading}
              size={150}
              speedMultiplier={1}
            />
          </div>
          <Link
            to="/GameThree"
            className={`linkContainer ${
              loading ? 'hideLinkContent' : 'showLinkContent'
            }`}
          >
            <p className="link mediumMap">Medium</p>
            <img
              className="mainLoadingImage"
              src="https://firebasestorage.googleapis.com/v0/b/where-is-waldo-game.appspot.com/o/selectionThree.jpeg?alt=media&token=e40b259c-f388-44c2-8228-5bab63262c2a"
              alt="map three"
              onLoad={() => setImageThree(true)}
            />
          </Link>
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
