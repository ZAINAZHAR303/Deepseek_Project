import React from "react";
import { Link} from "react-router-dom";
import Header from "./Header";
// import Navbar from "../Navbar/Navbar";

// import { Navbar } from "../Navbar/Navbar";

const Poster = () => {
  return (
    <div className="relative w-screen h-screen bg-slate-300 overflow-hidden">
       
     

  <video
    src="damo.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  ></video>
  {/* <Navbar /> */}
  <Header />
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      
  
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center  text-white px-4">
  {/* <Navbar /> */}
  <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
    Welcome to Deep Consent
  </h1>
  <p className="text-lg md:text-2xl mt-4 animate-slide-up">
  Agreements Made Simple – Generate, Summarize, Simplify  </p>
</div>

</div>

  );
};

export default Poster;
