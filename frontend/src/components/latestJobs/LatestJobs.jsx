import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import "./latestJobs.css";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="job-openings-container">
      <h1 className="job-openings-title">
        <span className="featured-jobs-text">Latest & Top </span> Job Openings
      </h1>
      <div className="job-openings-grid">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
