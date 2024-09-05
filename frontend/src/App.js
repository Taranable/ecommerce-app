import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Component/layout/Header/Header.js";
import Footer from "./Component/layout/footer/Footer.js";
import WebFont from "webfontloader";
import React from "react";



function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  },[]);


  return (
    <Router>
      <Header/>
      <Footer/>
     
      










    </Router>
  );
}

export default App;
