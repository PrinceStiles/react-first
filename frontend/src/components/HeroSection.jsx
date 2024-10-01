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
        <button className="start-hunting-btn">
          Kickstart Your Job Search Now!
        </button>
        <h1 className="dream-job-title">
          Search, Apply & Get <br />
          Your <span className="dream-job-text">Dream Tech Jobs</span> In Ghana.
        </h1>
        <p className="description">
          By bringing together talent and opportunity, JobConnect strives to be
          the go-to solution for career development and recruitment in today's
          competitive job market!
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
