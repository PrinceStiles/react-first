import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import "./heroSection.css";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="job-hunting-container">
      <div className="job-search-wrapper">
        <button className="start-hunting-btn">Start Job Hunting Now!</button>
        <h1 className="dream-job-title">
          Search, Apply & <br />
          Get Your <span className="dream-job-text">Dream Jobs</span>
        </h1>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          aspernatur temporibus nihil tempora dolor!
        </p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={searchJobHandler} className="search-button">
            <Search />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
