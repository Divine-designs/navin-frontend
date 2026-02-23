import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import LandingPage from "../../LandingPage/LandingPage";
import "./Home.css";

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <Navbar />
            <LandingPage />
        </div>
    );
};

export default Home;
