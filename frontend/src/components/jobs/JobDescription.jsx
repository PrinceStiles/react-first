import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import "./jobs.css";
import Navbar from "../shared/Navbar";
import { getCookie } from "@/lib";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      // Get the token from cookies
      const token = getCookie("token");
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        // Get the token from cookies
        const token = getCookie("token");
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
        if (
          error?.status === 401 &&
          error?.response?.data?.message === "User not authenticated"
        ) {
          navigate("/login");
        }
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="container_">
      <Navbar />
      <div className="job-details-container">
        <div className="job-details-header">
          <div>
            <h1 className="job-title">{singleJob?.title}</h1>
            <div className="job-details-badges">
              <Badge className="job-position-badge" variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="job-type-badge" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="job-salary-badge" variant="ghost">
                GHS {singleJob?.salary}
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`apply-button ${isApplied ? "disabled" : "active"}`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <div className="job-details-body">
          <h1 className="job-description-header">Job Description</h1>
          <div className="job-description-content">
            <h1 className="job-role">
              Role: <span className="job-role-value">{singleJob?.title}</span>
            </h1>
            <h1 className="job-location">
              Location:{" "}
              <span className="job-location-value">{singleJob?.location}</span>
            </h1>
            <h1 className="job-description-text">
              Description:{" "}
              <span className="job-description-value">
                {singleJob?.description}
              </span>
            </h1>
            <h1 className="job-experience">
              Experience:{" "}
              <span className="job-experience-value">
                {singleJob?.experience} yrs
              </span>
            </h1>
            <h1 className="job-salary">
              Salary:{" "}
              <span className="job-salary-value">GHS {singleJob?.salary}</span>
            </h1>
            <h1 className="job-applicants">
              Total Applicants:{" "}
              <span className="job-applicants-value">
                {singleJob?.applications?.length}
              </span>
            </h1>
            <h1 className="job-posted-date">
              Posted Date:{" "}
              <span className="job-posted-date-value">
                {singleJob?.createdAt.split("T")[0]}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
