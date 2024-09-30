import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import "./profile.css";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="container_">
      <Navbar />
      <div className="user-profile-container">
        <div className="user-profile-header">
          <div className="user-info">
            <Avatar className="user-avatar">
              <AvatarImage
                src={
                  `${user?.profile?.profilePhoto}` ??
                  "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                }
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="user-name">{user?.fullname}</h1>
              <p className="user-bio">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="user-profile-details">
          <div className="contact-info">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="contact-info">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="skills-section">
          <h1>Skills</h1>
          <div className="skills-list">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="skill-badge">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="no-skills">NA</span>
            )}
          </div>
        </div>
        <div className="resume-section">
          <Label className="resume-label">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={`${user?.profile?.resume}`}
              className="resume-link"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="applied-jobs">
        <h1 className="applied-jobs-heading">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
