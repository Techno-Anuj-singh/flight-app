import React, { useState, useMemo } from 'react';
import {
  Plane,
  Calendar,
  Users,
  ArrowRightLeft,
  Search,
  ShieldCheck,
  TrendingDown,
  Headphones,
  Zap,
  Star,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  X,
  Bell,
  Compass,
  Tag,
  Clock,
  ArrowRight,
  QrCode,
  CheckCircle2,
  Menu,
  Sparkles,
  Luggage,
  Coffee,
  Wifi,
  Globe
} from 'lucide-react';

import logo from './logo.png';
import '@skyscanner/backpack-web/bpk-stylesheets';
import './App.scss';

import {
  AIRPORTS,
  FLIGHTS_DATA,
  PROMO_OFFERS,
  FEATURED_DESTINATIONS,
  TRUST_PILLARS,
  PASSENGER_REVIEWS,
  FAQS,
  CURRENCIES,
  formatPrice
} from './data/flightData';

function App() {
  // Navigation & Preferences
  const [activeNavTab, setActiveNavTab] = useState('flights');
  const [currency, setCurrency] = useState('INR');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search Engine State
  const [tripType, setTripType] = useState('oneway');
  const [fromAirport, setFromAirport] = useState(AIRPORTS[0]); // DEL
  const [toAirport, setToAirport] = useState(AIRPORTS[1]); // BOM
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [departureDate, setDepartureDate] = useState('2026-10-24');
  const [returnDate, setReturnDate] = useState('2026-10-28');

  // Passenger & Class State
  const [showPassengerPopover, setShowPassengerPopover] = useState(false);
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState('Economy');
  const [specialFare, setSpecialFare] = useState('regular');

  // Results, Filter & Sort State
  const [sortBy, setSortBy] = useState('cheapest');
  const [nonStopOnly, setNonStopOnly] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [maxPriceFilter, setMaxPriceFilter] = useState(30000);
  const [expandedFlightId, setExpandedFlightId] = useState(null);

  // Modals & Booking Flow
  const [bookingFlight, setBookingFlight] = useState(null);
  const [passengerForm, setPassengerForm] = useState({
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    idNumber: 'A1234567'
  });
  const [addons, setAddons] = useState({
    insurance: true,
    meal: false,
    extraBaggage: false
  });
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Web Check-in / Live Status Modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [pnrLookupInput, setPnrLookupInput] = useState('');
  const [pnrStatusResult, setPnrStatusResult] = useState(null);

  // My Bookings Simulation Modal
  const [showMyBookingsModal, setShowMyBookingsModal] = useState(false);
  const [myBookingsList, setMyBookingsList] = useState([]);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // FAQ Accordion State
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(0);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Toast helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Swap Airports with Animation
  const handleSwapAirports = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
    triggerToast(`Swapped: Flying from ${toAirport.city} to ${temp.city}`);
  };

  // Select destination from featured card
  const handleSelectDestination = (dest) => {
    const match = AIRPORTS.find((a) => a.code === dest.code) || AIRPORTS[1];
    setToAirport(match);
    triggerToast(`Route set to ${match.city}! Scrolling to search...`);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Copy Promo Code
  const handleCopyPromo = (code) => {
    navigator.clipboard?.writeText(code);
    triggerToast(`Promo code "${code}" copied to clipboard!`);
    setCouponCodeInput(code);
  };

  // Apply Coupon inside Booking
  const handleApplyCoupon = () => {
    const promo = PROMO_OFFERS.find((p) => p.code.toUpperCase() === couponCodeInput.trim().toUpperCase());
    if (promo) {
      setAppliedCoupon(promo);
      triggerToast(`🎉 Coupon ${promo.code} applied successfully!`);
    } else {
      triggerToast('❌ Invalid coupon code. Try FLYINDIA or SUMMER2026');
    }
  };

  // Filtered & Sorted Flights
  const filteredFlights = useMemo(() => {
    return FLIGHTS_DATA.filter((flight) => {
      // Airline filter
      if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) {
        return false;
      }
      // Non-stop filter
      if (nonStopOnly && flight.stops > 0) {
        return false;
      }
      // Max price filter
      if (flight.price > maxPriceFilter) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.price - b.price;
      if (sortBy === 'fastest') return a.durationMinutes - b.durationMinutes;
      if (sortBy === 'best') return b.rating - a.rating;
      if (sortBy === 'earliest') return a.depTime.localeCompare(b.depTime);
      return 0;
    });
  }, [selectedAirlines, nonStopOnly, maxPriceFilter, sortBy]);

  // Total Passenger Count
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  // Booking Calculations
  const calculatedFare = useMemo(() => {
    if (!bookingFlight) return { base: 0, taxes: 0, addonsTotal: 0, discount: 0, finalTotal: 0 };
    const base = bookingFlight.price * totalPassengers;
    const taxes = Math.round(base * 0.12);
    let addonsTotal = 0;
    if (addons.insurance) addonsTotal += 499 * totalPassengers;
    if (addons.meal) addonsTotal += 350 * totalPassengers;
    if (addons.extraBaggage) addonsTotal += 999 * totalPassengers;

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountAmount > 100) {
        discount = appliedCoupon.discountAmount;
      } else {
        discount = Math.round((base * appliedCoupon.discountAmount) / 100);
      }
    }

    const finalTotal = Math.max(base + taxes + addonsTotal - discount, 999);
    return { base, taxes, addonsTotal, discount, finalTotal };
  }, [bookingFlight, totalPassengers, addons, appliedCoupon]);

  // Confirm booking
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const newBooking = {
      pnr: 'SV' + Math.floor(100000 + Math.random() * 900000),
      flight: bookingFlight,
      passenger: passengerForm,
      fare: calculatedFare,
      seat: '14A (Window)',
      gate: 'Gate 4B',
      terminal: 'Terminal 3',
      date: departureDate,
      cabinClass: cabinClass
    };
    setConfirmedBooking(newBooking);
    setMyBookingsList((prev) => [newBooking, ...prev]);
    setBookingFlight(null);
    triggerToast('🎉 Booking Confirmed! Boarding pass is ready.');
  };

  // Status Lookup handler
  const handlePnrLookup = (e) => {
    e.preventDefault();
    if (!pnrLookupInput.trim()) {
      triggerToast('Please enter a valid 6-character PNR or Flight Number');
      return;
    }
    setPnrStatusResult({
      pnr: pnrLookupInput.toUpperCase(),
      flightNo: 'AI 804',
      status: 'ON TIME',
      gate: 'Gate 4B',
      terminal: 'T3',
      boardingTime: '05:25 AM',
      departure: '06:00 AM',
      carousel: 'Carousel 5',
      route: `${fromAirport.city} (${fromAirport.code}) → ${toAirport.city} (${toAirport.code})`
    });
  };

  // Newsletter subscribe
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      triggerToast(`✨ Subscribed! Fare drop alerts sent to ${newsletterEmail}`);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="app-wrapper">
      {/* Background Decor */}
      <div className="hero-backdrop-layer" />
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      {/* ====================================================================
          1. NAVIGATION BAR
          ==================================================================== */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logo} alt="SkyVoyage" className="nav-brand-logo" />
            <div className="nav-brand-text">
              SkyScanner <span className="nav-brand-badge">Premium</span>
            </div>
          </div>

          <div className="nav-menu">
            <button
              className={`nav-link ${activeNavTab === 'flights' ? 'active' : ''}`}
              onClick={() => setActiveNavTab('flights')}
            >
              <Plane size={16} /> Flights
            </button>
            <button
              className={`nav-link ${activeNavTab === 'hotels' ? 'active' : ''}`}
              onClick={() => {
                setActiveNavTab('hotels');
                triggerToast('🏨 Hotels search coming in next update! Showing top flight routes.');
              }}
            >
              <Globe size={16} /> Hotels
            </button>
            <button
              className={`nav-link ${activeNavTab === 'holidays' ? 'active' : ''}`}
              onClick={() => {
                setActiveNavTab('holidays');
                triggerToast('🏖️ Holiday Packages curated with up to 35% savings!');
              }}
            >
              <Compass size={16} /> Packages
            </button>
            <button
              className={`nav-link ${activeNavTab === 'deals' ? 'active' : ''}`}
              onClick={() => {
                const el = document.getElementById('offers-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Tag size={16} /> Offers
            </button>
          </div>

          <div className="nav-actions">
            <select
              className="currency-select"
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
                triggerToast(`Currency changed to ${e.target.value}`);
              }}
            >
              {Object.keys(CURRENCIES).map((cKey) => (
                <option key={cKey} value={cKey}>
                  {CURRENCIES[cKey].label}
                </option>
              ))}
            </select>

            <button
              className="btn-ghost"
              onClick={() => {
                setShowStatusModal(true);
                setPnrStatusResult(null);
              }}
            >
              <Clock size={15} /> Check-In / Status
            </button>

            <button
              className="btn-primary"
              onClick={() => setShowMyBookingsModal(true)}
            >
              <Luggage size={16} /> My Bookings {myBookingsList.length > 0 && `(${myBookingsList.length})`}
            </button>

            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <button
              className="btn-ghost"
              style={{ justifyContent: 'flex-start' }}
              onClick={() => {
                setShowStatusModal(true);
                setMobileMenuOpen(false);
              }}
            >
              <Clock size={16} /> Web Check-In & Flight Status
            </button>
            <button
              className="btn-ghost"
              style={{ justifyContent: 'flex-start' }}
              onClick={() => {
                setShowMyBookingsModal(true);
                setMobileMenuOpen(false);
              }}
            >
              <Luggage size={16} /> My Trips ({myBookingsList.length})
            </button>
            <select
              className="currency-select"
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
                setMobileMenuOpen(false);
              }}
            >
              {Object.keys(CURRENCIES).map((cKey) => (
                <option key={cKey} value={cKey}>
                  {CURRENCIES[cKey].label}
                </option>
              ))}
            </select>
          </div>
        )}
      </nav>

      {/* ====================================================================
          2. HERO SECTION & FLIGHT SEARCH ENGINE
          ==================================================================== */}
      <header className="hero-section">
        <div className="main-container">
          <div className="hero-pill">
            <Sparkles size={15} className="hero-pill-icon" />
            <span>Over 1,200+ Daily Domestic & Global Flights at Guaranteed Best Fares</span>
          </div>

          <h1 className="hero-title">
            Fly Smarter. Travel Freely.
          </h1>
          <p className="hero-subtitle">
            Experience ultra-smooth flight bookings with zero hidden charges, instant web check-in, and 24/7 dedicated concierge assistance.
          </p>

          {/* ADVANCED SEARCH ENGINE CARD */}
          <div className="search-engine-card">
            {/* Nav Tabs */}
            <div className="search-nav-tabs">
              <button className="search-tab-btn active">
                <Plane size={16} /> Flight Search
              </button>
              <button
                className="search-tab-btn"
                onClick={() => triggerToast('🏨 Hotel booking search available in next release!')}
              >
                <Globe size={16} /> Hotels & Stays
              </button>
              <button
                className="search-tab-btn"
                onClick={() => triggerToast('🏖️ Holiday Escapes curated for Goa & Kashmir!')}
              >
                <Compass size={16} /> Holiday Escapes
              </button>
            </div>

            {/* Sub Controls: Trip Type & Class */}
            <div className="search-sub-controls">
              <div className="trip-type-radios">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="triptype"
                    checked={tripType === 'oneway'}
                    onChange={() => setTripType('oneway')}
                  />
                  One Way
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="triptype"
                    checked={tripType === 'roundtrip'}
                    onChange={() => setTripType('roundtrip')}
                  />
                  Round Trip
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="triptype"
                    checked={tripType === 'multicity'}
                    onChange={() => setTripType('multicity')}
                  />
                  Multi-City
                </label>
              </div>

              {/* Passenger & Class Dropdown Trigger */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="passenger-class-badge-btn"
                  onClick={() => setShowPassengerPopover(!showPassengerPopover)}
                >
                  <Users size={14} />
                  <span>
                    {totalPassengers} Traveller{totalPassengers > 1 ? 's' : ''}, {cabinClass}
                  </span>
                  <ChevronDown size={14} />
                </button>

                {/* Popover */}
                {showPassengerPopover && (
                  <div className="passenger-popover">
                    <div className="popover-row">
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Adults</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>12+ years</div>
                      </div>
                      <div className="popover-stepper">
                        <button
                          type="button"
                          className="stepper-btn"
                          disabled={passengers.adults <= 1}
                          onClick={() => setPassengers({ ...passengers, adults: passengers.adults - 1 })}
                        >
                          -
                        </button>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'white', minWidth: 16, textAlign: 'center' }}>
                          {passengers.adults}
                        </span>
                        <button
                          type="button"
                          className="stepper-btn"
                          disabled={passengers.adults >= 9}
                          onClick={() => setPassengers({ ...passengers, adults: passengers.adults + 1 })}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="popover-row">
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Children</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>2-12 years</div>
                      </div>
                      <div className="popover-stepper">
                        <button
                          type="button"
                          className="stepper-btn"
                          disabled={passengers.children <= 0}
                          onClick={() => setPassengers({ ...passengers, children: passengers.children - 1 })}
                        >
                          -
                        </button>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'white', minWidth: 16, textAlign: 'center' }}>
                          {passengers.children}
                        </span>
                        <button
                          type="button"
                          className="stepper-btn"
                          disabled={passengers.children >= 6}
                          onClick={() => setPassengers({ ...passengers, children: passengers.children + 1 })}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>
                        CABIN CLASS
                      </div>
                      <div className="class-selector-grid">
                        {['Economy', 'Premium Economy', 'Business', 'First Class'].map((cls) => (
                          <div
                            key={cls}
                            className={`class-chip ${cabinClass === cls ? 'active' : ''}`}
                            onClick={() => setCabinClass(cls)}
                          >
                            {cls}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: 12, marginTop: 6 }}
                      onClick={() => setShowPassengerPopover(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="search-inputs-grid">
              {/* FROM */}
              <div
                className="search-input-box"
                onClick={() => {
                  setShowFromDropdown(true);
                  setShowToDropdown(false);
                }}
              >
                <div className="input-box-label">
                  <Plane size={13} style={{ transform: 'rotate(-45deg)' }} /> From
                </div>
                <div className="input-box-main">
                  <span className="airport-code-tag">{fromAirport.code}</span>
                  <div className="airport-city-input">{fromAirport.city} {fromAirport.flag}</div>
                </div>
                <div className="airport-name-sub">{fromAirport.name}</div>

                {/* Dropdown list */}
                {showFromDropdown && (
                  <div className="airport-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <div style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                      Select Departure Airport
                    </div>
                    {AIRPORTS.map((airport) => (
                      <div
                        key={airport.code}
                        className="airport-dropdown-item"
                        onClick={() => {
                          setFromAirport(airport);
                          setShowFromDropdown(false);
                        }}
                      >
                        <div className="airport-item-left">
                          <span className="airport-item-city">
                            {airport.flag} {airport.city}
                          </span>
                          <span className="airport-item-name">{airport.name}</span>
                        </div>
                        <span className="airport-item-code">{airport.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SWAP BUTTON */}
              <button
                type="button"
                className="city-swap-btn"
                title="Swap origin and destination"
                onClick={handleSwapAirports}
              >
                <ArrowRightLeft size={18} />
              </button>

              {/* TO */}
              <div
                className="search-input-box"
                onClick={() => {
                  setShowToDropdown(true);
                  setShowFromDropdown(false);
                }}
              >
                <div className="input-box-label">
                  <Plane size={13} style={{ transform: 'rotate(45deg)' }} /> To
                </div>
                <div className="input-box-main">
                  <span className="airport-code-tag">{toAirport.code}</span>
                  <div className="airport-city-input">{toAirport.city} {toAirport.flag}</div>
                </div>
                <div className="airport-name-sub">{toAirport.name}</div>

                {/* Dropdown list */}
                {showToDropdown && (
                  <div className="airport-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <div style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                      Select Arrival Airport
                    </div>
                    {AIRPORTS.map((airport) => (
                      <div
                        key={airport.code}
                        className="airport-dropdown-item"
                        onClick={() => {
                          setToAirport(airport);
                          setShowToDropdown(false);
                        }}
                      >
                        <div className="airport-item-left">
                          <span className="airport-item-city">
                            {airport.flag} {airport.city}
                          </span>
                          <span className="airport-item-name">{airport.name}</span>
                        </div>
                        <span className="airport-item-code">{airport.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DEPARTURE DATE */}
              <div className="search-input-box">
                <div className="input-box-label">
                  <Calendar size={13} /> Departure Date
                </div>
                <input
                  type="date"
                  className="date-input-field"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
                <div className="airport-name-sub">Flexible Dates ±3 Days</div>
              </div>

              {/* RETURN DATE */}
              <div className="search-input-box" style={{ opacity: tripType === 'oneway' ? 0.6 : 1 }}>
                <div className="input-box-label">
                  <Calendar size={13} /> Return Date
                </div>
                <input
                  type="date"
                  className="date-input-field"
                  disabled={tripType === 'oneway'}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <div className="airport-name-sub">
                  {tripType === 'oneway' ? 'Save more with round trip' : 'Instant 10% Return Saver'}
                </div>
              </div>
            </div>

            {/* Special Fares */}
            <div className="special-fares-row">
              <span className="special-fare-label">Special Fares:</span>
              {[
                { key: 'regular', label: 'Regular Fare' },
                { key: 'student', label: 'Student (+10kg Extra Baggage)' },
                { key: 'senior', label: 'Senior Citizen (Up to 15% Off)' },
                { key: 'defense', label: 'Armed Forces' },
                { key: 'medical', label: 'Doctors & Nurses' }
              ].map((f) => (
                <div
                  key={f.key}
                  className={`fare-chip ${specialFare === f.key ? 'active' : ''}`}
                  onClick={() => {
                    setSpecialFare(f.key);
                    triggerToast(`Selected: ${f.label}`);
                  }}
                >
                  {specialFare === f.key && <Check size={12} />}
                  {f.label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="search-cta-bar">
              <button
                type="button"
                className="search-submit-btn"
                onClick={() => {
                  triggerToast(`Searching flights for ${fromAirport.code} → ${toAirport.code}...`);
                  const el = document.getElementById('flights-results-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Search size={18} /> Search {fromAirport.code} to {toAirport.code} Flights
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          3. PROMOTIONAL OFFERS & COUPONS SECTION
          ==================================================================== */}
      <section className="section-padding" id="offers-section">
        <div className="main-container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag">Exclusive Perks</span>
              <h2 className="section-heading">Trending Flight Offers & Bank Deals</h2>
              <p className="section-desc">Apply verified promo codes at checkout to unlock instant discounts and zero convenience fee.</p>
            </div>
          </div>

          <div className="offers-grid">
            {PROMO_OFFERS.map((promo) => (
              <div key={promo.id} className="offer-card">
                <div>
                  <span className="offer-badge">{promo.tag}</span>
                  <div className="offer-discount">{promo.discount}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 6 }}>
                    {promo.title}
                  </div>
                  <p className="offer-desc">{promo.desc}</p>
                </div>

                <div className="offer-bottom-bar">
                  <span className="offer-code-text">{promo.code}</span>
                  <button
                    type="button"
                    className="copy-code-btn"
                    onClick={() => handleCopyPromo(promo.code)}
                  >
                    <Copy size={12} /> Copy Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. LIVE FLIGHT RESULTS & FILTERS SECTION
          ==================================================================== */}
      <section className="results-section" id="flights-results-section">
        <div className="main-container">
          {/* Results Top Header */}
          <div className="results-top-header">
            <div>
              <h2 className="route-summary-title">
                <span>{fromAirport.city} ({fromAirport.code})</span>
                <ArrowRight size={18} color="#38bdf8" />
                <span>{toAirport.city} ({toAirport.code})</span>
                <span className="results-count-badge">{filteredFlights.length} Flights Available</span>
              </h2>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
                Departure: {departureDate} | {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''} | {cabinClass}
              </div>
            </div>

            {/* Sorting Tabs */}
            <div className="sort-tabs-container">
              <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Sort:
              </span>
              <button
                className={`sort-btn ${sortBy === 'cheapest' ? 'active' : ''}`}
                onClick={() => setSortBy('cheapest')}
              >
                Cheapest
              </button>
              <button
                className={`sort-btn ${sortBy === 'fastest' ? 'active' : ''}`}
                onClick={() => setSortBy('fastest')}
              >
                Fastest
              </button>
              <button
                className={`sort-btn ${sortBy === 'best' ? 'active' : ''}`}
                onClick={() => setSortBy('best')}
              >
                Top Rated
              </button>
              <button
                className={`sort-btn ${sortBy === 'earliest' ? 'active' : ''}`}
                onClick={() => setSortBy('earliest')}
              >
                Earliest
              </button>
            </div>
          </div>

          {/* Results Layout Grid */}
          <div className="results-layout-grid">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div>
                <h3 className="filter-group-title">Stops</h3>
                <div className="filter-checkbox-list">
                  <label className="filter-check-label">
                    <span>
                      <input
                        type="checkbox"
                        checked={nonStopOnly}
                        onChange={(e) => setNonStopOnly(e.target.checked)}
                      />
                      Direct / Non-Stop Only
                    </span>
                    <span style={{ color: '#38bdf8', fontSize: 11 }}>Fast</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="filter-group-title">Airlines</h3>
                <div className="filter-checkbox-list">
                  {['Air India', 'IndiGo', 'Vistara', 'Akasa Air', 'SpiceJet', 'Emirates'].map((airline) => (
                    <label key={airline} className="filter-check-label">
                      <span>
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(airline)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAirlines([...selectedAirlines, airline]);
                            } else {
                              setSelectedAirlines(selectedAirlines.filter((a) => a !== airline));
                            }
                          }}
                        />
                        {airline}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="filter-group-title">Max Price ({currency})</h3>
                <input
                  type="range"
                  min="3000"
                  max="30000"
                  step="500"
                  className="price-range-slider"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                />
                <div className="price-slider-labels">
                  <span>{formatPrice(3000, currency)}</span>
                  <span style={{ fontWeight: 700, color: '#38bdf8' }}>
                    {formatPrice(maxPriceFilter, currency)}
                  </span>
                  <span>{formatPrice(30000, currency)}</span>
                </div>
              </div>

              <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: 12, borderRadius: 8, border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#38bdf8', fontSize: 12, fontWeight: 700 }}>
                  <ShieldCheck size={16} /> SkyShield Protection
                </div>
                <div style={{ fontSize: 11, color: '#cbd5e1', marginTop: 4 }}>
                  Zero cancellation fee & instant refunds on all bookings today.
                </div>
              </div>
            </aside>

            {/* Flight Cards Stack */}
            <main className="flight-cards-stack">
              {filteredFlights.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 50, background: 'rgba(15, 23, 42, 0.75)', borderRadius: 14 }}>
                  <Plane size={40} style={{ opacity: 0.4, margin: '0 auto 12px auto' }} />
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>No Flights Match Your Filter Criteria</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>
                    Try adjusting your price slider or resetting airline filters.
                  </p>
                  <button
                    className="btn-primary"
                    style={{ marginTop: 16 }}
                    onClick={() => {
                      setNonStopOnly(false);
                      setSelectedAirlines([]);
                      setMaxPriceFilter(30000);
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredFlights.map((flight) => (
                  <div key={flight.id} className="flight-card-pro">
                    {/* Top Strip */}
                    <div className="card-top-strip">
                      <div className="airline-info-block">
                        <div
                          className="airline-badge-logo"
                          style={{ background: flight.airlineColor }}
                        >
                          {flight.airlineCode}
                        </div>
                        <div className="airline-details-meta">
                          <span className="airline-name-text">{flight.airline}</span>
                          <span className="airline-aircraft-text">
                            {flight.flightNumber} • {flight.aircraft}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="flight-feature-badge">{flight.badge}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: '#f59e0b', fontWeight: 700 }}>
                          <Star size={13} fill="#f59e0b" /> {flight.rating}
                        </div>
                      </div>
                    </div>

                    {/* Middle Timeline */}
                    <div className="flight-timeline-row">
                      {/* Departure */}
                      <div className="time-city-col">
                        <span className="flight-time-big">{flight.depTime}</span>
                        <span className="flight-city-label">{fromAirport.city} ({fromAirport.code})</span>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Terminal 3</span>
                      </div>

                      {/* Path & Duration */}
                      <div className="flight-path-middle">
                        <span className="duration-tag">{flight.duration}</span>
                        <div className="flight-visual-line">
                          <Plane size={14} className="plane-mid-icon" />
                        </div>
                        <span className="stop-detail-text">{flight.stopDetails}</span>
                      </div>

                      {/* Arrival */}
                      <div className="time-city-col right-align">
                        <span className="flight-time-big">{flight.arrTime}</span>
                        <span className="flight-city-label">{toAirport.city} ({toAirport.code})</span>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Terminal 2</span>
                      </div>

                      {/* Price & Book */}
                      <div className="flight-pricing-action">
                        <span className="price-strike">{formatPrice(flight.originalPrice, currency)}</span>
                        <span className="flight-live-price">
                          {formatPrice(flight.price, currency)}
                        </span>
                        <span className="seats-warning-text">Only {flight.seatsLeft} seats left!</span>
                        <button
                          type="button"
                          className="btn-primary"
                          style={{ padding: '8px 24px', fontSize: 13 }}
                          onClick={() => {
                            setBookingFlight(flight);
                            setAppliedCoupon(null);
                          }}
                        >
                          Book Now <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Amenities Strip */}
                    <div className="card-bottom-strip">
                      <div className="amenities-badges-row">
                        <span className="amenity-chip">
                          <Luggage size={12} color="#38bdf8" /> {flight.baggage}
                        </span>
                        {flight.mealIncluded && (
                          <span className="amenity-chip">
                            <Coffee size={12} color="#10b981" /> Complimentary Meal
                          </span>
                        )}
                        {flight.wifi && (
                          <span className="amenity-chip">
                            <Wifi size={12} color="#a855f7" /> High-Speed Wi-Fi
                          </span>
                        )}
                        <span className="amenity-chip" style={{ color: '#10b981' }}>
                          <ShieldCheck size={12} /> {flight.cancellation}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="flight-details-toggle-btn"
                        onClick={() =>
                          setExpandedFlightId(expandedFlightId === flight.id ? null : flight.id)
                        }
                      >
                        {expandedFlightId === flight.id ? (
                          <>Hide Details <ChevronUp size={14} /></>
                        ) : (
                          <>Flight Details & Fare Rules <ChevronDown size={14} /></>
                        )}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {expandedFlightId === flight.id && (
                      <div className="flight-expanded-pane">
                        <div>
                          <div className="detail-pane-col-title">Baggage Allowance</div>
                          <div className="detail-pane-col-desc">
                            • Cabin: 1 piece up to 7 kg<br />
                            • Check-in: 15 kg (Extra 10kg with Student Fare)<br />
                            • Excess baggage payable at ₹500/kg
                          </div>
                        </div>
                        <div>
                          <div className="detail-pane-col-title">Aircraft & Amenities</div>
                          <div className="detail-pane-col-desc">
                            • Aircraft: {flight.aircraft}<br />
                            • Seat Pitch: 31-32 inches (Standard Legroom)<br />
                            • In-seat USB & Power outlets available
                          </div>
                        </div>
                        <div>
                          <div className="detail-pane-col-title">Cancellation & Refund Policy</div>
                          <div className="detail-pane-col-desc">
                            • Free cancellation up to 24 hours prior<br />
                            • ₹499 rescheduling fee applies within 12h<br />
                            • 100% instant refund with SkyShield protection
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </main>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. FEATURED POPULAR DESTINATIONS
          ==================================================================== */}
      <section className="section-padding">
        <div className="main-container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag">Curated Escapes</span>
              <h2 className="section-heading">Trending Getaways & Top Destinations</h2>
              <p className="section-desc">Hand-picked travel spots with unbeatable seasonal fares and guaranteed sunshine.</p>
            </div>
          </div>

          <div className="destinations-grid">
            {FEATURED_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="destination-card"
                onClick={() => handleSelectDestination(dest)}
              >
                <img src={dest.image} alt={dest.city} className="destination-img" />
                <div className="destination-overlay">
                  <div className="destination-top-tags">
                    <span className="weather-badge">{dest.weather}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(56, 189, 248, 0.25)', color: '#38bdf8', padding: '3px 8px', borderRadius: 20 }}>
                      {dest.tag}
                    </span>
                  </div>

                  <div className="destination-bottom-info">
                    <h3 className="destination-city-title">{dest.city}</h3>
                    <span className="destination-state-sub">{dest.state}</span>

                    <div className="destination-action-row">
                      <div>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Fares from </span>
                        <span className="destination-price-tag">
                          {formatPrice(dest.fromPrice, currency)}
                        </span>
                      </div>
                      <button type="button" className="dest-book-btn">
                        Find Flights <ArrowRight size={12} style={{ display: 'inline' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. TRUST PILLARS / WHY CHOOSE US
          ==================================================================== */}
      <section className="section-padding">
        <div className="main-container">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center' }}>
            <div className="section-title-wrap" style={{ textAlign: 'center' }}>
              <span className="section-tag">The SkyVoyage Advantage</span>
              <h2 className="section-heading">Why Millions of Travelers Fly With Us</h2>
              <p className="section-desc">We build every feature with simplicity, transparency, and top-tier reliability.</p>
            </div>
          </div>

          <div className="pillars-grid">
            {TRUST_PILLARS.map((tp) => (
              <div key={tp.id} className="pillar-card">
                <div className="pillar-icon-box">
                  {tp.icon === 'ShieldCheck' && <ShieldCheck size={26} />}
                  {tp.icon === 'TrendingDown' && <TrendingDown size={26} />}
                  {tp.icon === 'Headphones' && <Headphones size={26} />}
                  {tp.icon === 'Zap' && <Zap size={26} />}
                </div>
                <h3 className="pillar-title">{tp.title}</h3>
                <p className="pillar-desc">{tp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. PASSENGER REVIEWS & TESTIMONIALS
          ==================================================================== */}
      <section className="section-padding">
        <div className="main-container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-tag">Verified Experiences</span>
              <h2 className="section-heading">Real Stories From Happy Flyers</h2>
              <p className="section-desc">Rated 4.9/5 based on 45,000+ booked journeys across India and abroad.</p>
            </div>
          </div>

          <div className="reviews-grid">
            {PASSENGER_REVIEWS.map((rev) => (
              <div key={rev.id} className="review-card">
                <div>
                  <div className="review-stars-row">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" />
                    ))}
                  </div>
                  <p className="review-text">"{rev.comment}"</p>
                </div>

                <div className="review-author-row">
                  <img src={rev.avatar} alt={rev.name} className="review-avatar" />
                  <div>
                    <div className="review-author-name">{rev.name}</div>
                    <div className="review-author-route">{rev.route} • {rev.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ==================================================================== */}
      <section className="section-padding">
        <div className="main-container">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center' }}>
            <div className="section-title-wrap" style={{ textAlign: 'center' }}>
              <span className="section-tag">Got Questions?</span>
              <h2 className="section-heading">Frequently Asked Questions</h2>
              <p className="section-desc">Everything you need to know about booking, check-in, and flight policies.</p>
            </div>
          </div>

          <div className="faq-container">
            {FAQS.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  {expandedFaqIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedFaqIndex === index && (
                  <div className="faq-answer-box">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. NEWSLETTER & FARE DROP ALERTS
          ==================================================================== */}
      <section className="section-padding">
        <div className="main-container">
          <div className="newsletter-card">
            <div className="newsletter-text-col">
              <span className="section-tag" style={{ color: '#38bdf8' }}>Smart Fare Alerts</span>
              <h3 className="newsletter-title">Never Miss an Airfare Price Drop</h3>
              <p className="newsletter-desc">
                Subscribe to receive secret flash sales, airline glitch fares, and personalized discount codes directly in your inbox.
              </p>
            </div>

            <form className="newsletter-input-group" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email address..."
                className="newsletter-input"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }}>
                Get Alerts
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. GLOBAL FOOTER
          ==================================================================== */}
      <footer className="footer-wrap">
        <div className="main-container">
          <div className="footer-columns-grid">
            <div className="footer-brand-col">
              <div className="nav-brand" style={{ cursor: 'default' }}>
                <img src={logo} alt="SkyVoyage" className="nav-brand-logo" />
                <span className="nav-brand-text">SkyVoyage</span>
              </div>
              <p className="footer-tagline">
                India's next-generation travel platform delivering guaranteed best airfares, zero cancellation fee protection, and 24/7 dedicated support.
              </p>
              <div className="trust-badges-row">
                <span className="trust-badge-pill">🛡️ 256-Bit SSL Encrypted</span>
                <span className="trust-badge-pill">✈️ IATA Accredited Member</span>
              </div>
            </div>

            <div>
              <h4 className="footer-heading">Top Domestic Routes</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item" onClick={() => triggerToast('Route loaded: Delhi to Mumbai')}>Delhi to Mumbai Flights</li>
                <li className="footer-link-item" onClick={() => triggerToast('Route loaded: Bengaluru to Goa')}>Bengaluru to Goa Flights</li>
                <li className="footer-link-item" onClick={() => triggerToast('Route loaded: Mumbai to Dubai')}>Mumbai to Dubai Flights</li>
                <li className="footer-link-item" onClick={() => triggerToast('Route loaded: Delhi to Srinagar')}>Delhi to Srinagar Flights</li>
                <li className="footer-link-item" onClick={() => triggerToast('Route loaded: Chennai to Kolkata')}>Chennai to Kolkata Flights</li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Company & Help</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item" onClick={() => triggerToast('About SkyVoyage page')}>About Us</li>
                <li className="footer-link-item" onClick={() => triggerToast('SkyShield policy details')}>SkyShield Zero Cancellation</li>
                <li className="footer-link-item" onClick={() => triggerToast('24/7 Concierge Support')}>24/7 WhatsApp Concierge</li>
                <li className="footer-link-item" onClick={() => triggerToast('Partner airline guidelines')}>Airlines Baggage Guide</li>
                <li className="footer-link-item" onClick={() => triggerToast('Privacy and Security terms')}>Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">24/7 Priority Support</h4>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginBottom: 12 }}>
                Need urgent flight assistance or instant reschedule? Our human concierge team is always online.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#38bdf8', fontWeight: 600 }}>
                <span>📞 +91 1800-SKY-VOYAGE</span>
                <span>💬 WhatsApp: +91 99887 76655</span>
                <span>✉️ support@skyvoyage.com</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>© 2026 SkyVoyage Technologies Ltd. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 20 }}>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
              <span style={{ cursor: 'pointer' }}>Security</span>
              <span style={{ cursor: 'pointer' }}>Cookie Preferences</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          11. INTERACTIVE BOOKING MODAL
          ==================================================================== */}
      {bookingFlight && (
        <div className="modal-overlay" onClick={() => setBookingFlight(null)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setBookingFlight(null)}>
              <X size={18} />
            </button>

            <h3 className="modal-header-title">Complete Your Booking</h3>
            <p className="modal-header-desc">
              Review passenger details, customize travel perks, and generate your instant boarding pass.
            </p>

            {/* Flight Summary Strip */}
            <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 12, padding: 14, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 800, color: 'white', fontSize: 16 }}>
                    {bookingFlight.airline} ({bookingFlight.flightNumber})
                  </span>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                    {fromAirport.city} ({fromAirport.code}) → {toAirport.city} ({toAirport.code}) • {bookingFlight.depTime} - {bookingFlight.arrTime}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>Class</span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#38bdf8' }}>{cabinClass}</div>
                </div>
              </div>
            </div>

            {/* Passenger Information Form */}
            <form onSubmit={handleConfirmBooking}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 12 }}>
                Primary Passenger Details
              </div>

              <div className="booking-form-grid">
                <div className="form-field-group">
                  <label className="form-label">Full Name (as per Govt ID)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={passengerForm.fullName}
                    onChange={(e) => setPassengerForm({ ...passengerForm, fullName: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label className="form-label">Email Address (for Boarding Pass)</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={passengerForm.email}
                    onChange={(e) => setPassengerForm({ ...passengerForm, email: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label className="form-label">Phone Number (WhatsApp Updates)</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={passengerForm.phone}
                    onChange={(e) => setPassengerForm({ ...passengerForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label className="form-label">Govt ID / Passport Number</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={passengerForm.idNumber}
                    onChange={(e) => setPassengerForm({ ...passengerForm, idNumber: e.target.value })}
                  />
                </div>
              </div>

              {/* Add-ons Selector */}
              <div style={{ fontSize: 14, fontWeight: 700, color: 'white', margin: '18px 0 10px 0' }}>
                Enhance Your Trip
              </div>

              <div
                className={`addon-card-item ${addons.insurance ? 'selected' : ''}`}
                onClick={() => setAddons({ ...addons, insurance: !addons.insurance })}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>
                    🛡️ SkyShield Zero-Cancellation & Medical Cover
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>
                    Get 100% full refund if you cancel up to 2 hours before takeoff + ₹5,00,000 travel insurance.
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: 13 }}>
                  +{formatPrice(499, currency)}
                </div>
              </div>

              <div
                className={`addon-card-item ${addons.meal ? 'selected' : ''}`}
                onClick={() => setAddons({ ...addons, meal: !addons.meal })}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>
                    🍱 Chef-Curated Gourmet In-flight Meal & Beverage
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>
                    Hot meal box with dessert and complimentary beverage on board.
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: 13 }}>
                  +{formatPrice(350, currency)}
                </div>
              </div>

              {/* Promo Code Input */}
              <div style={{ margin: '18px 0' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 6 }}>
                  Have a Promo Code? (Try FLYINDIA)
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Enter coupon code..."
                    className="form-input"
                    style={{ textTransform: 'uppercase', flex: 1 }}
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div style={{ color: '#10b981', fontSize: 12, fontWeight: 700, marginTop: 4 }}>
                    ✓ Applied: {appliedCoupon.title}
                  </div>
                )}
              </div>

              {/* Fare Breakdown */}
              <div className="modal-fare-summary">
                <div className="fare-breakdown-row">
                  <span>Base Airfare ({totalPassengers} Traveller{totalPassengers > 1 ? 's' : ''})</span>
                  <span>{formatPrice(calculatedFare.base, currency)}</span>
                </div>
                <div className="fare-breakdown-row">
                  <span>Airport Taxes & Fuel Surcharges</span>
                  <span>{formatPrice(calculatedFare.taxes, currency)}</span>
                </div>
                {calculatedFare.addonsTotal > 0 && (
                  <div className="fare-breakdown-row">
                    <span>Trip Protection & Add-ons</span>
                    <span>+{formatPrice(calculatedFare.addonsTotal, currency)}</span>
                  </div>
                )}
                {calculatedFare.discount > 0 && (
                  <div className="fare-breakdown-row" style={{ color: '#10b981' }}>
                    <span>Promo Coupon Discount</span>
                    <span>-{formatPrice(calculatedFare.discount, currency)}</span>
                  </div>
                )}
                <div className="fare-breakdown-total">
                  <span>Total Payable:</span>
                  <span style={{ color: '#10b981' }}>{formatPrice(calculatedFare.finalTotal, currency)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: 16 }}
              >
                Pay {formatPrice(calculatedFare.finalTotal, currency)} & Generate Boarding Pass
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          12. CONFIRMED BOARDING PASS MODAL
          ==================================================================== */}
      {confirmedBooking && (
        <div className="modal-overlay" onClick={() => setConfirmedBooking(null)}>
          <div className="modal-content-card" style={{ maxWidth: 620 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setConfirmedBooking(null)}>
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <CheckCircle2 size={30} />
              </div>
              <h3 className="modal-header-title">Booking Confirmed!</h3>
              <p style={{ fontSize: 13, color: '#94a3b8' }}>
                Your digital boarding pass has been issued and sent to {confirmedBooking.passenger.email}.
              </p>
            </div>

            {/* REALISTIC BOARDING PASS */}
            <div className="boarding-pass-card">
              <div className="pass-header-strip">
                <div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', opacity: 0.8 }}>Boarding Pass</div>
                  <div className="pass-flight-number">{confirmedBooking.flight.airline} {confirmedBooking.flight.flightNumber}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>PNR CODE</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: 18, letterSpacing: 1 }}>
                    {confirmedBooking.pnr}
                  </div>
                </div>
              </div>

              <div className="pass-body-main">
                <div>
                  <div className="pass-field-group">
                    <span className="pass-field-label">Passenger Name</span>
                    <span className="pass-field-val">{confirmedBooking.passenger.fullName}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="pass-field-group">
                      <span className="pass-field-label">Origin</span>
                      <span className="pass-field-val">{fromAirport.city} ({fromAirport.code})</span>
                    </div>
                    <div className="pass-field-group">
                      <span className="pass-field-label">Destination</span>
                      <span className="pass-field-val">{toAirport.city} ({toAirport.code})</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                    <div className="pass-field-group">
                      <span className="pass-field-label">Gate</span>
                      <span className="pass-field-val" style={{ color: '#38bdf8' }}>{confirmedBooking.gate}</span>
                    </div>
                    <div className="pass-field-group">
                      <span className="pass-field-label">Seat</span>
                      <span className="pass-field-val" style={{ color: '#10b981' }}>{confirmedBooking.seat}</span>
                    </div>
                    <div className="pass-field-group">
                      <span className="pass-field-label">Class</span>
                      <span className="pass-field-val">{confirmedBooking.cabinClass}</span>
                    </div>
                  </div>

                  <div className="pass-field-group" style={{ marginBottom: 0 }}>
                    <span className="pass-field-label">Boarding Time & Date</span>
                    <span className="pass-field-val">{confirmedBooking.flight.depTime} • {confirmedBooking.date}</span>
                  </div>
                </div>

                <div className="pass-qr-box">
                  <QrCode size={110} color="#0f172a" />
                  <div style={{ fontSize: 9, color: '#475569', fontWeight: 700, marginTop: 4 }}>SCAN AT GATE</div>
                  <div className="mock-barcode" />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button
                type="button"
                className="btn-ghost"
                style={{ flex: 1 }}
                onClick={() => {
                  triggerToast('📥 Boarding Pass PDF downloaded successfully!');
                }}
              >
                Download PDF
              </button>
              <button
                type="button"
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={() => setConfirmedBooking(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          13. WEB CHECK-IN & FLIGHT STATUS LOOKUP MODAL
          ==================================================================== */}
      {showStatusModal && (
        <div className="modal-overlay" onClick={() => setShowStatusModal(false)}>
          <div className="modal-content-card" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowStatusModal(false)}>
              <X size={18} />
            </button>

            <h3 className="modal-header-title">Live Web Check-In & Flight Radar</h3>
            <p className="modal-header-desc">
              Check real-time gate announcements, live delay status, and download boarding passes with your PNR.
            </p>

            <form onSubmit={handlePnrLookup} style={{ marginBottom: 20 }}>
              <div className="form-field-group" style={{ marginBottom: 12 }}>
                <label className="form-label">Enter 6-digit PNR / Booking Reference or Flight Number</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="e.g. SV491028 or AI804"
                    required
                    className="form-input"
                    style={{ textTransform: 'uppercase', flex: 1 }}
                    value={pnrLookupInput}
                    onChange={(e) => setPnrLookupInput(e.target.value)}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '8px 20px' }}>
                    Track
                  </button>
                </div>
              </div>
            </form>

            {pnrStatusResult && (
              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 12, padding: 18, animation: 'fadeIn 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>Reference</span>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'white', fontFamily: 'monospace' }}>
                      {pnrStatusResult.pnr} ({pnrStatusResult.flightNo})
                    </div>
                  </div>
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 800 }}>
                    {pnrStatusResult.status}
                  </span>
                </div>

                <div style={{ fontSize: 13, color: 'white', fontWeight: 600, marginBottom: 12 }}>
                  {pnrStatusResult.route}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 8 }}>
                  <div>
                    <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Departure</span>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{pnrStatusResult.departure}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Gate / Term</span>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#38bdf8' }}>{pnrStatusResult.gate} ({pnrStatusResult.terminal})</div>
                  </div>
                  <div>
                    <span style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Baggage Belt</span>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>{pnrStatusResult.carousel}</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%', marginTop: 14, padding: 10, fontSize: 13 }}
                  onClick={() => {
                    triggerToast('✓ Instant Web Check-in completed! Boarding pass updated.');
                    setShowStatusModal(false);
                  }}
                >
                  Confirm Seat & Auto Check-In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          14. MY BOOKINGS MODAL
          ==================================================================== */}
      {showMyBookingsModal && (
        <div className="modal-overlay" onClick={() => setShowMyBookingsModal(false)}>
          <div className="modal-content-card" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowMyBookingsModal(false)}>
              <X size={18} />
            </button>

            <h3 className="modal-header-title">My Booked Trips</h3>
            <p className="modal-header-desc">
              View your active airline reservations, e-tickets, and live flight updates.
            </p>

            {myBookingsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
                <Plane size={36} style={{ opacity: 0.3, margin: '0 auto 8px auto' }} />
                <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>No Active Trips Found</div>
                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                  You haven't booked any flights in this session yet. Select a flight above to test instant booking!
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {myBookingsList.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', borderRadius: 12, padding: 16 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontWeight: 800, color: 'white' }}>
                        {item.flight.airline} ({item.flight.flightNumber})
                      </span>
                      <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 700, background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: 4 }}>
                        PNR: {item.pnr}
                      </span>
                    </div>

                    <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 8 }}>
                      {item.passenger.fullName} • Seat {item.seat} • {item.date}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>
                        Paid: {formatPrice(item.fare.finalTotal, currency)}
                      </span>
                      <button
                        type="button"
                        className="btn-ghost"
                        style={{ padding: '4px 12px', fontSize: 11 }}
                        onClick={() => {
                          setConfirmedBooking(item);
                          setShowMyBookingsModal(false);
                        }}
                      >
                        View Boarding Pass
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          15. FLOATING TOAST NOTIFICATION
          ==================================================================== */}
      {toastMessage && (
        <div className="toast-floating-pill">
          <Bell size={16} color="#38bdf8" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;