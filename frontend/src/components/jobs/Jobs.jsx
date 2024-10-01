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
    const filterJob = () => {
      // Helper function to parse the range query (e.g., "1 - 5")
      const parseRange = (searchedQuery) => {
        const [min, max] = searchedQuery.split("-").map((str) => str.trim()); // Split the query by '-'
        return {
          min: Number(min),
          max: Number(max),
        };
      };

      // Parse experience and salary queries
      const experienceRange = parseRange(searchedQuery);
      const salaryRange = parseRange(searchedQuery);

      // Filter jobs based on parsed ranges
      return allJobs.filter((job) => {
        const experienceLevel = Number(job.experienceLevel);
        const salary = Number(job.salary);

        // Check if experience and salary fall within the specified ranges
        const isExperienceInRange =
          experienceLevel >= experienceRange.min &&
          experienceLevel <= experienceRange.max;
        const isSalaryInRange =
          salary >= salaryRange.min && salary <= salaryRange.max;

        const gfilter =
          job?.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchedQuery.toLowerCase());

        return isExperienceInRange || isSalaryInRange || gfilter;
      });
    };

    if (searchedQuery) {
      setFilterJobs(filterJob());
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
