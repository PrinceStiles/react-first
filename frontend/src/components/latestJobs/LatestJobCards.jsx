import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import "./latestJobs.css";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="job-card"
    >
      <div>
        <h1 className="job-company-name">{job?.company?.name}</h1>
        <p className="job-location">India</p>
      </div>
      <div className="job-card-body">
        <h1 className="job-title">{job?.title}</h1>
        <p className="job-description">{job?.description}</p>
      </div>
      <div className="job-card-footer">
        <Badge className={"job-position-badge"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"job-type-badge"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"job-salary-badge"} variant="ghost">
          GHS {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
