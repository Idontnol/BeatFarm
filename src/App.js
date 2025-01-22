import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllBeats from './components/All Beats';

import SignUpLoginModal from './components/Authenticate';
import Contact from './components/Contact';
import Faq from './components/Faq';
import FreeBeats from './components/Free Beats';
import Hero from './components/hero';
import Navbar from './components/navbar';
import './App.css';
import PremiumBeats from './components/Premium Beats';
import ExtraSpace from './components/Extra Space';
import { useState } from 'react';
import { beatContext } from './context/beatContext';

function App() {
  const [showSignUpModal,setShowSignUpModal]=useState(false);
  const [activeBeat,setActiveBeat]=useState(null);
  
  return (
    <div className="App">
      {/* <BrowserRouter basename="/beat-farm"> */}
      <BrowserRouter>
      <beatContext.Provider value={{activeBeat,setActiveBeat}}>
        <Navbar setShowSignUpModal={setShowSignUpModal}  />
        {showSignUpModal && <SignUpLoginModal setShowSignUpModal={setShowSignUpModal} />}
        <ExtraSpace/>
          <Routes>
              <Route exact path="/" element={  <Hero/>} />
              <Route exact path="/all-beats" element={<AllBeats/>} />
              <Route exact path="/free-beats" element={<FreeBeats/>} />
              <Route exact path="/premium-beats" element={<PremiumBeats/>} />

          </Routes>
        </beatContext.Provider>
      </BrowserRouter>
      
      {/* <SignUpLoginModal /> */}
      {/* <Hero/> */}
      <Faq/>
      <Contact/>
    </div>
  );
}

export default App;
