import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import WebcamFeed from './components/WebcamFeed';
// import { UploadFile } from './components/UploadFile';
import ConsentGenerator from './pages/ConsentGenerator';
import Home from './pages/Home';
import  SumAggr  from './pages/SumAggr';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header />
      <Hero />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Consent Generator Page */}
        <Route path="/generate" element={<ConsentGenerator />} />

        {/* Webcam Feed Page */}
        <Route path="/Summarize" element={<SumAggr />} />

        {/* Upload File Page */}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

