import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.experience.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.salary.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="container_">
      <Navbar />
      <div className="job-list-container">
        <div className="job-list-filters">
          <FilterCard />
        </div>
        <div className="job-list-results">
          {filterJobs.length === 0 ? (
            <span className="no-jobs-message">Job not found</span>
          ) : (
            <ul className="job-list">
              {filterJobs.map((job) => (
                <motion.li
                  key={job._id}
                  initial={{ opacity: 0, transform: "translateX(100px)" }}
                  animate={{ opacity: 1, transform: "translateX(0)" }}
                  exit={{ opacity: 0, transform: "translateX(-100px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Job job={job} />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
