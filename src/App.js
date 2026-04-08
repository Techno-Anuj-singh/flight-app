import React, { useState } from 'react';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import BpkCard from '@skyscanner/backpack-web/bpk-component-card';
import logo from './logo.png';
import bg from './bg.png';
import '@skyscanner/backpack-web/bpk-stylesheets';
import './App.scss';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    
    <div className="container">

    <div className="navbar">

  <div className="nav-left">
    <img src={logo} alt="logo" className="logo" />
  </div>

 <div className={`nav-center ${menuOpen ? 'active' : ''}`}>
  <span>✈️ Flights</span>
  <span>🏨 Hotels</span>
  <span>🚗 Cars</span>
</div>

  <div className="nav-right">
  <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
    ☰
  </button>
</div>

</div>

    <div className="content">

    <div className="search-box">
  <input type="text" placeholder="From (City)" />
  <input type="text" placeholder="To (City)" />
</div>



    <BpkText tagName="h1" className="main-title">
      ✈️ Travel world!
    </BpkText>

    <BpkText tagName="p" className="sub-title">
      Select your travel date
    </BpkText>

    <div className="card">
      <BpkCard>
        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </BpkCard>
    </div>

    {selectedDate && (
      <p className="date-text">
        Selected Date: {selectedDate}
      </p>
    )}

    <div className="button">
      <BpkButton onClick={() => alert('Proceeding...')}>
        Continue
      </BpkButton>
    </div>

    <div className="flights">

  <BpkCard className="flight-card">
    <div className="flight-top">
      <span className="city">Delhi</span>
      <span className="arrow">→</span>
      <span className="city">Mumbai</span>
    </div>

    <div className="flight-middle">
      <span>06:00 AM</span>
      <span className="duration">2h 10m</span>
      <span>08:10 AM</span>
    </div>

    <div className="flight-bottom">
      <span className="price">₹4,999</span>
      <button className="book-btn">Book</button>
    </div>
  </BpkCard>

    <BpkCard className="flight-card">
    <div className="flight-top">
      <span>Delhi</span>
      <span className="arrow">→</span>
      <span>Bangalore</span>
    </div>

    <div className="flight-middle">
      <span>07:30 AM</span>
      <span className="duration">3h</span>
      <span>10:30 AM</span>
    </div>

    <div className="flight-bottom">
      <span className="price">₹6,200</span>
      <button className="book-btn">Book</button>
    </div>
  </BpkCard>

</div>
</div>

  </div>
  );
}

export default App;