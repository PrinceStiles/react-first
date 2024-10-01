import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import "./jobs.css";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-header-left">
          <p className="job-posted-date">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
        </div>
        <Button className="bookmark-button" variant="outline" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="job-card-body">
        <div className="job-card-company">
          <Button className="company-logo-button" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={`${job?.company?.logo}`} />
            </Avatar>
          </Button>
          <div className="company-details">
            <h1 className="company-name">{job?.company?.name}</h1>
            <p className="company-location">{job?.location}</p>
          </div>
        </div>
        <h1 className="job-title">{job?.title}</h1>
        <p className="job-description">{job?.description.slice(0, 80)}</p>
        <div className="job-details">
          <Badge className="job-position-badge" variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className="job-type-badge" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="job-salary-badge" variant="ghost">
            GHS {job?.salary}
          </Badge>
        </div>
        <div className="job-actions">
          <Button
            className="view-details-button"
            onClick={() => navigate(`/description/${job?._id}`)}
            variant="outline"
          >
            Details
          </Button>
          {/* <Button className="save-for-later-button">Save For Later</Button> */}
        </div>
      </div>
    </div>
  );
};

export default Job;
