import React from "react";
import background from "../assets/home-background.png";

const Home = () => {
  return (
    <div className="App">
      <img className="home-background" src={background}  alt={"home-background"}/>
      <div className="home-content">
      </div>
    </div>
  );
}



export default Home;



