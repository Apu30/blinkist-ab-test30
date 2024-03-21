import React from 'react';
import { trackPageview, trackEvent } from './analytics-api';
import './styles.css';
import logo from './images/logb.png';

const App = () => {
  const handleSignUpClick = () => {
    // Increment global click count only if this is the first time this user has clicked
    if (!localStorage.getItem('userClicked')) {
      const globalClickCount = parseInt(localStorage.getItem('globalClickCount') || 0) + 1;
      localStorage.setItem('globalClickCount', globalClickCount);
      localStorage.setItem('userClicked', 'true'); // Mark this user as having clicked
    }

    // Increment and display page view on each click
    let views = parseInt(localStorage.getItem('pageCount') || 0) + 1;
    localStorage.setItem('pageCount', views);

    // Track the page view after click
    const pageviewInfo = `--> Tracking Pageview: URL: ${window.location.href}, AB-test: ${localStorage.getItem('abStorage')}, numberOfViews: ${views}`;
    console.log(pageviewInfo);
    localStorage.setItem('lastPageview', pageviewInfo);
    trackPageview({
      URL: window.location.href,
      ABTestVariant: localStorage.getItem('abStorage'),
      numberOfViews: views
    });

    // Track the click event
    const clickEventInfo = `analytics-api.js:16 --> Tracking Event: Event: "click", URL: ${window.location.href}, clicks: 1`;
    console.log(clickEventInfo);
    localStorage.setItem('lastEvent', clickEventInfo);
    trackEvent({
      Event: 'click',
      URL: window.location.href,
      clicks: 1
    });

    // Refresh the page after logging tracking information
    window.location.reload();
  };

  // Log previous tracking information after page reload
  React.useEffect(() => {
    const lastPageview = localStorage.getItem('lastPageview');
    const lastEvent = localStorage.getItem('lastEvent');
    if (lastPageview) {
      console.log(lastPageview);
    }
    if (lastEvent) {
      console.log(lastEvent);
    }
  }, []);

  return (
    <div className="app-container">
      <header className="header">
      <img src={logo} alt="Logo" className="logo" />

      <h1 className="section-title">Welcome to Blinkist</h1>
      </header>
      <main className="main-content">
        <section className="content-section">
         
          <p className="section-description">"Little blocks of unallocated time into precious and rewarding moments for learning and reflection"!</p>
          <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">© 2024 Your App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

