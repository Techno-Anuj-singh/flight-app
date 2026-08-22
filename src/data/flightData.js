export const AIRPORTS = [
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport', country: 'India', flag: '🇮🇳' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj Intl Airport', country: 'India', flag: '🇮🇳' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport', country: 'India', flag: '🇮🇳' },
  { code: 'GOI', city: 'Goa (Dabolim)', name: 'Dabolim International Airport', country: 'India', flag: '🇮🇳' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International Airport', country: 'India', flag: '🇮🇳' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose Intl Airport', country: 'India', flag: '🇮🇳' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport', country: 'India', flag: '🇮🇳' },
  { code: 'COK', city: 'Kochi', name: 'Cochin International Airport', country: 'India', flag: '🇮🇳' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'UAE', flag: '🇦🇪' },
  { code: 'SIN', city: 'Singapore', name: 'Singapore Changi Airport', country: 'Singapore', flag: '🇸🇬' },
  { code: 'LHR', city: 'London', name: 'London Heathrow Airport', country: 'United Kingdom', flag: '🇬🇧' },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi Airport', country: 'Thailand', flag: '🇹🇭' }
];

export const FLIGHTS_DATA = [
  {
    id: 'FL-601',
    airline: 'Air India',
    airlineCode: 'AI',
    airlineColor: '#ed1b24',
    flightNumber: 'AI 804',
    aircraft: 'Airbus A350-900',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    depTime: '06:00 AM',
    arrTime: '08:15 AM',
    duration: '2h 15m',
    durationMinutes: 135,
    stops: 0,
    stopDetails: 'Non-stop',
    price: 4899,
    originalPrice: 6200,
    seatsLeft: 4,
    rating: 4.8,
    mealIncluded: true,
    baggage: '7kg Cabin + 25kg Check-in',
    wifi: true,
    usb: true,
    cancellation: 'Free Rescheduling before 24h',
    badge: 'Fastest Flight'
  },
  {
    id: 'FL-602',
    airline: 'IndiGo',
    airlineCode: '6E',
    airlineColor: '#0052cc',
    flightNumber: '6E 2142',
    aircraft: 'Airbus A320neo',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    depTime: '07:30 AM',
    arrTime: '09:40 AM',
    duration: '2h 10m',
    durationMinutes: 130,
    stops: 0,
    stopDetails: 'Non-stop',
    price: 4299,
    originalPrice: 5499,
    seatsLeft: 9,
    rating: 4.6,
    mealIncluded: false,
    baggage: '7kg Cabin + 15kg Check-in',
    wifi: false,
    usb: true,
    cancellation: 'Flexible Cancellation at ₹499',
    badge: 'Best Value'
  },
  {
    id: 'FL-603',
    airline: 'Vistara',
    airlineCode: 'UK',
    airlineColor: '#531b4b',
    flightNumber: 'UK 995',
    aircraft: 'Boeing 787-9 Dreamliner',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    depTime: '10:15 AM',
    arrTime: '12:35 PM',
    duration: '2h 20m',
    durationMinutes: 140,
    stops: 0,
    stopDetails: 'Non-stop',
    price: 5499,
    originalPrice: 6999,
    seatsLeft: 3,
    rating: 4.9,
    mealIncluded: true,
    baggage: '7kg Cabin + 20kg Check-in',
    wifi: true,
    usb: true,
    cancellation: 'Zero Cancellation Fee Protection',
    badge: 'Premium Comfort'
  },
  {
    id: 'FL-604',
    airline: 'Akasa Air',
    airlineCode: 'QP',
    airlineColor: '#ff6200',
    flightNumber: 'QP 1354',
    aircraft: 'Boeing 737 MAX 8',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    depTime: '01:45 PM',
    arrTime: '04:00 PM',
    duration: '2h 15m',
    durationMinutes: 135,
    stops: 0,
    stopDetails: 'Non-stop',
    price: 3999,
    originalPrice: 5100,
    seatsLeft: 12,
    rating: 4.5,
    mealIncluded: false,
    baggage: '7kg Cabin + 15kg Check-in',
    wifi: false,
    usb: true,
    cancellation: 'Standard Policy',
    badge: 'Cheapest Deal'
  },
  {
    id: 'FL-605',
    airline: 'SpiceJet',
    airlineCode: 'SG',
    airlineColor: '#e60000',
    flightNumber: 'SG 8169',
    aircraft: 'Boeing 737-800',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    depTime: '04:30 PM',
    arrTime: '07:55 PM',
    duration: '3h 25m',
    durationMinutes: 205,
    stops: 1,
    stopDetails: '1 Stop via Jaipur (JAI - 45m layover)',
    price: 3650,
    originalPrice: 4799,
    seatsLeft: 6,
    rating: 4.2,
    mealIncluded: false,
    baggage: '7kg Cabin + 15kg Check-in',
    wifi: false,
    usb: false,
    cancellation: 'Refundable with fee',
    badge: 'Budget Saver'
  },
  {
    id: 'FL-606',
    airline: 'Air India',
    airlineCode: 'AI',
    airlineColor: '#ed1b24',
    flightNumber: 'AI 665',
    aircraft: 'Airbus A321neo',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BOM',
    toCity: 'Mumbai',
    depTime: '08:20 PM',
    arrTime: '10:35 PM',
    duration: '2h 15m',
    durationMinutes: 135,
    stops: 0,
    stopDetails: 'Non-stop',
    price: 5199,
    originalPrice: 6500,
    seatsLeft: 7,
    rating: 4.7,
    mealIncluded: true,
    baggage: '7kg Cabin + 25kg Check-in',
    wifi: true,
    usb: true,
    cancellation: 'Free Date Change',
    badge: 'Late Evening'
  },
  {
    id: 'FL-607',
    airline: 'IndiGo',
    airlineCode: '6E',
    airlineColor: '#0052cc',
    flightNumber: '6E 5032',
    aircraft: 'Airbus A321neo',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'BLR',
    toCity: 'Bengaluru',
    depTime: '06:45 AM',
    arrTime: '09:35 AM',
    duration: '2h 50m',
    durationMinutes: 170,
    stops: 0,
    stopDetails: 'Non-stop',
    price: 5899,
    originalPrice: 7200,
    seatsLeft: 5,
    rating: 4.7,
    mealIncluded: false,
    baggage: '7kg Cabin + 15kg Check-in',
    wifi: false,
    usb: true,
    cancellation: 'Free Rescheduling',
    badge: 'Early Bird'
  },
  {
    id: 'FL-608',
    airline: 'Vistara',
    airlineCode: 'UK',
    airlineColor: '#531b4b',
    flightNumber: 'UK 811',
    aircraft: 'Airbus A320neo',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'GOI',
    toCity: 'Goa (Dabolim)',
    depTime: '11:00 AM',
    arrTime: '01:35 PM',
    duration: '2h 35m',
    durationMinutes: 155,
    stops: 0,
    stopDetails: 'Non-stop',
    price: 6499,
    originalPrice: 8300,
    seatsLeft: 2,
    rating: 4.9,
    mealIncluded: true,
    baggage: '7kg Cabin + 20kg Check-in',
    wifi: true,
    usb: true,
    cancellation: 'Zero Fee Cancellation',
    badge: 'Popular Holiday'
  },
  {
    id: 'FL-609',
    airline: 'Emirates',
    airlineCode: 'EK',
    airlineColor: '#d71921',
    flightNumber: 'EK 513',
    aircraft: 'Boeing 777-300ER',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'DXB',
    toCity: 'Dubai',
    depTime: '04:15 AM',
    arrTime: '06:50 AM',
    duration: '4h 05m',
    durationMinutes: 245,
    stops: 0,
    stopDetails: 'Non-stop',
    price: 18999,
    originalPrice: 23500,
    seatsLeft: 8,
    rating: 4.9,
    mealIncluded: true,
    baggage: '7kg Cabin + 30kg Check-in',
    wifi: true,
    usb: true,
    cancellation: 'Free Date Change upto 72h',
    badge: 'International Luxury'
  },
  {
    id: 'FL-610',
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    airlineColor: '#00256c',
    flightNumber: 'SQ 403',
    aircraft: 'Airbus A380-800',
    from: 'DEL',
    fromCity: 'New Delhi',
    to: 'SIN',
    toCity: 'Singapore',
    depTime: '09:50 PM',
    arrTime: '06:05 AM',
    duration: '5h 45m',
    durationMinutes: 345,
    stops: 0,
    stopDetails: 'Non-stop',
    price: 24500,
    originalPrice: 29800,
    seatsLeft: 6,
    rating: 5.0,
    mealIncluded: true,
    baggage: '7kg Cabin + 30kg Check-in',
    wifi: true,
    usb: true,
    cancellation: 'Full Refund on Medical Ground',
    badge: 'World-Class'
  }
];

export const PROMO_OFFERS = [
  {
    id: 'promo-1',
    code: 'FLYINDIA',
    title: 'Flat 15% OFF on Domestic Flights',
    desc: 'Valid on all Indigo, Vistara, and Air India domestic routes over ₹3,000.',
    discount: '15% OFF',
    discountAmount: 15,
    expiry: 'Expires in 4 days',
    tag: 'Trending',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
  },
  {
    id: 'promo-2',
    code: 'SUMMER2026',
    title: 'Up to ₹2,500 Instant Cashback',
    desc: 'Special discount for summer vacation bookings to Goa, Kashmir & Kerala.',
    discount: '₹2,500 OFF',
    discountAmount: 2500,
    expiry: 'Expires in 6 days',
    tag: 'Holiday Special',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
  },
  {
    id: 'promo-3',
    code: 'FIRSTFLIGHT',
    title: 'Flat ₹1,000 OFF on First Booking',
    desc: 'New to SkyVoyage? Use this code and enjoy instant reduction on your airfare.',
    discount: '₹1,000 OFF',
    discountAmount: 1000,
    expiry: 'Valid all year',
    tag: 'New User',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
  },
  {
    id: 'promo-4',
    code: 'AXISBANK',
    title: 'Extra 12% Instant Bank Discount',
    desc: 'Pay with any Axis Bank Credit or Debit card and get zero convenience fees.',
    discount: '12% Extra',
    discountAmount: 12,
    expiry: 'Limited Slots',
    tag: 'Bank Deal',
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)'
  }
];

export const FEATURED_DESTINATIONS = [
  {
    id: 'dest-1',
    city: 'Goa',
    state: 'Coastal Paradise',
    fromPrice: 3499,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    tag: 'Beaches & Sunsets',
    weather: '28°C Sunny',
    code: 'GOI'
  },
  {
    id: 'dest-2',
    city: 'Srinagar, Kashmir',
    state: 'Heaven on Earth',
    fromPrice: 5200,
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    tag: 'Snow & Valleys',
    weather: '16°C Pleasant',
    code: 'DEL'
  },
  {
    id: 'dest-3',
    city: 'Munnar, Kerala',
    state: 'God\'s Own Country',
    fromPrice: 4199,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    tag: 'Backwaters & Tea Hills',
    weather: '22°C Misty',
    code: 'COK'
  },
  {
    id: 'dest-4',
    city: 'Jaipur, Rajasthan',
    state: 'The Pink City',
    fromPrice: 2899,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    tag: 'Heritage & Palaces',
    weather: '26°C Clear',
    code: 'DEL'
  },
  {
    id: 'dest-5',
    city: 'Dubai',
    state: 'United Arab Emirates',
    fromPrice: 16999,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    tag: 'Futuristic Luxury',
    weather: '31°C Sunny',
    code: 'DXB'
  },
  {
    id: 'dest-6',
    city: 'Singapore',
    state: 'Garden City',
    fromPrice: 21999,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    tag: 'Skyline & Wonder',
    weather: '29°C Tropical',
    code: 'SIN'
  }
];

export const TRUST_PILLARS = [
  {
    id: 'tp-1',
    icon: 'ShieldCheck',
    title: 'Zero Cancellation Guarantee',
    desc: 'Get 100% instant refund with SkyShield protection on any domestic flight cancellation up to 2 hours before takeoff.'
  },
  {
    id: 'tp-2',
    icon: 'TrendingDown',
    title: 'Guaranteed Best Price Promise',
    desc: 'Found a cheaper airfare elsewhere within 24 hours? We will refund double the difference into your SkyWallet.'
  },
  {
    id: 'tp-3',
    icon: 'Headphones',
    title: '24/7 Dedicated Human Concierge',
    desc: 'Direct priority assistance via WhatsApp, phone, and live chat. Zero frustrating bots when you need real help.'
  },
  {
    id: 'tp-4',
    icon: 'Zap',
    title: 'Lightning Fast Digital Check-In',
    desc: 'Auto web check-in 48 hours prior, automated boarding pass delivery straight to Apple Wallet & WhatsApp.'
  }
];

export const PASSENGER_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Aarav Sharma',
    city: 'Mumbai, India',
    rating: 5,
    route: 'Delhi → Mumbai (Vistara UK 995)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    comment: 'SkyVoyage made my corporate travel effortless! Got an instant seat upgrade, free meal, and the boarding pass was downloaded with 1-click. Absolutely silky smooth experience.',
    date: '2 days ago'
  },
  {
    id: 'rev-2',
    name: 'Pooja Verma',
    city: 'Bengaluru, India',
    rating: 5,
    route: 'Delhi → Bengaluru (Air India)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    comment: 'I saved ₹1,200 using the FLYINDIA coupon code. The transparent fare breakdown with zero hidden charges is why I will never use other bloated booking sites again.',
    date: '5 days ago'
  },
  {
    id: 'rev-3',
    name: 'Rohan Deshmukh',
    city: 'Pune, India',
    rating: 5,
    route: 'Mumbai → Goa (IndiGo 6E)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Had to reschedule my flight due to an emergency. Their WhatsApp concierge resolved it in under 3 minutes with zero penalty. Top-notch service!',
    date: '1 week ago'
  }
];

export const FAQS = [
  {
    question: 'How do I do Web Check-In and get my Boarding Pass?',
    answer: 'Once your flight is booked, click on "Web Check-In / Status" in the top navigation bar or your booking confirmation screen. Web check-in opens 48 hours prior to domestic departure and generates your mobile boarding pass instantly.'
  },
  {
    question: 'What is the SkyShield Zero Cancellation Protection policy?',
    answer: 'SkyShield allows you to cancel any domestic flight booking up to 2 hours before scheduled departure for any personal or medical reason and receive a 100% full refund directly to your original payment method within 24 hours.'
  },
  {
    question: 'How much baggage is allowed on domestic flights?',
    answer: 'Standard Economy allows 1 piece of 7 kg Cabin baggage plus 15 kg Check-in baggage per passenger. Premium airlines like Air India and Vistara offer up to 20kg - 25kg Check-in baggage. Student fares include an extra 10kg complimentary allowance.'
  },
  {
    question: 'Can I apply bank offers and promo codes together?',
    answer: 'Yes! SkyVoyage allows coupon codes (e.g. FLYINDIA) to be stacked alongside instant card discounts from partner banks like Axis Bank, HDFC, and ICICI during checkout.'
  },
  {
    question: 'How does the Live Flight Status tracker work?',
    answer: 'Enter your 6-character PNR or Flight Number into our Live Flight Tracker to get real-time gate announcements, terminal updates, baggage carousel numbers, and flight delay estimations.'
  }
];

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' }
};

export const formatPrice = (inrPrice, currencyKey = 'INR') => {
  const curr = CURRENCIES[currencyKey] || CURRENCIES.INR;
  const converted = Math.round(inrPrice * curr.rate);
  if (currencyKey === 'INR') {
    return `${curr.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${curr.symbol}${converted.toLocaleString('en-US')}`;
};
