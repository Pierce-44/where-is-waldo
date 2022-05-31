/* eslint-disable react/no-unescaped-entities */
import waldo from '../images/waldo.png';
import '../styles/Header.css';

function Header() {
  return (
    <div className="Header">
      <div />
      <div className="headerText">
        <p className="whereText">WHERE'S</p>
        <p className="waldoText">WALDO?</p>
      </div>
      <img src={waldo} alt="waldo" className="headerImage" />
    </div>
  );
}

export default Header;
