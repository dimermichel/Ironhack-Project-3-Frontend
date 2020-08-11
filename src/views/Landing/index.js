import React from 'react';
import { Link } from 'react-router-dom';

import travelPackingLogoIcon from '../../assets/svg/logo/travelpacking_logo.svg';
import travelPackingLogo from '../../assets/svg/logo/travelpacking_logo_horizontal.svg';
import heroIllustration from '../../assets/svg/illustration/travel_illustration.svg';

import './styles.css';

const Landing = () => {
  return (
    <>
      <div id="page-container">
        <div className="navbar">
          <img src={travelPackingLogoIcon} alt="logo" className="nav-logo" />
          <div className="nav-buttons-container">
            <Link to="/signup" className="button-signup">
              SIGN UP
            </Link>
            <Link to="/login" className="button-login">
              LOG IN
            </Link>
          </div>
        </div>
        <div id="page-landing" className="page-landing">
          <div id="page-landing-content" className="container">
            <div className="logo-container">
              <img src={travelPackingLogo} alt="Travel Packing logo" />
              <h2>The best way to pack your bags is here</h2>
            </div>

            <img
              src={heroIllustration}
              alt="Landing Illustration"
              className="hero-image"
            />

            <div className="buttons-container">
              <Link to="/signup" className="try-it">
                TRY IT NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
