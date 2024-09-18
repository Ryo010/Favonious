import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Navbar/Home";
import Book from "./Navbar/Book";
import Dictionary from "./Navbar/Dictionary";
import About from "./Navbar/About";

const App = () => {
 return (
   <Router>
     <Navbar />
     
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Book" element={<Book />} />
       <Route path="/Dictionary" element={<Dictionary />} />
       <Route path="/About-Us" element={<About />} />
      </Routes>
    
   </Router>
 );
};

export default App;
