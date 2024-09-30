import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./jobs/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import "./browse.css";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="container_">
      <Navbar />
      <div className="job-search-results-container">
        <h1 className="job-search-results-title">
          Search Results ({allJobs.length})
        </h1>
        <div className="job-search-results-grid">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
