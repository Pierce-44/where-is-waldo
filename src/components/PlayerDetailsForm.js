/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';
import '../styles/PlayerDetailsForm.css';
import closeImg from '../images/close.svg';

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

function PlayerDetailsForm(props) {
  const [formValue, setFormValue] = useState('');
  const [formErrors, setFormErrors] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormValue(e.target.value);
  }

  const validate = (values) => {
    let errors = '';
    const regex = /^[A-Za-z]+$/;

    if (!values.length === 0) {
      errors = 'Username is required!';
    } else if (!regex.test(values)) {
      errors = 'Please use only letters (a-z)';
    } else if (values.length < 4) {
      errors = 'Username must be more than 4 characters';
    } else if (values.length > 10) {
      errors = 'Username cannot exceed more than 10 characters';
    }
    return errors;
  };

  async function submitToFireBase() {
    await setDoc(doc(db, props.mapLB, formValue), {
      time: props.count,
    });
  }

  function handleClose() {
    document.body.style.overflow = 'initial';
  }

  async function handleGuestSubmit() {
    const colRef = collection(db, props.map);
    const mapDocs = await getDocs(colRef);
    const guestCount = await mapDocs.docs[0].data().count;

    // push the guest time into the leader board
    await setDoc(doc(db, props.mapLB, `Guest${guestCount}`), {
      time: props.count,
    });

    // update the guest count
    await setDoc(doc(db, props.map, 'GuestCount'), {
      count: guestCount + 1,
    });

    document.body.style.overflow = 'initial';
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (formErrors === '' && isSubmit) {
      submitToFireBase();
      handleClose();
      navigate(-1);
    }
  });

  return (
    <div className={props.displayForm}>
      <div className="formContainer">
        <Link to="/">
          <img
            src={closeImg}
            alt="close"
            className="closeTag"
            onClick={() => handleClose()}
          />
        </Link>
        <p className="timeTitle">Your Time: {props.count} seconds</p>
        <p className="submitText">
          Enter a name to submit your time to the leaderboards
        </p>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="playerName" className="label">
            Username:
            <input
              type="text"
              required
              onChange={handleChange}
              value={formValue}
            />
          </label>
          <p className="formErrors">{formErrors}</p>
          <div className="submitButtons">
            <input type="submit" value="Submit Username" />
            <Link to="/">
              <button type="button" onClick={() => handleGuestSubmit()}>
                Submit as guest
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlayerDetailsForm;
