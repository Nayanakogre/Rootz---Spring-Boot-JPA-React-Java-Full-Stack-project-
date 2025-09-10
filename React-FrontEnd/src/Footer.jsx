import React, { useEffect, useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="rootz-footer" className="footer">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        {/* Left: Contact Us */}
        <div className="contact-links d-flex gap-3 align-items-center">
  <span>Contact us:</span>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faInstagram} size="lg" />
  </a>
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon={faFacebook} size="lg" />
  </a>
  <a href="mailto:urbanrootz@example.com">
    <FontAwesomeIcon icon={faEnvelope} size="lg" />
  </a>
</div>

        <div className="text-center copyright-text">
  © 2025 Rootz. All rights reserved.
</div>

<div className="text-end time-text">
  {time}
</div>

      </div>
    </footer>
  );
}

export default Footer;
