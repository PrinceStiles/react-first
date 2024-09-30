import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import "./navbar.css";
import { getCookie } from "@/lib";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      // Get the token from cookies
      const token = getCookie("token");
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="header">
      <div className="header-container">
        <div>
          <Link to={"/"}>
            <h1 className="logo-text">
              Job<span className="logo-highlight">Connect</span>
            </h1>
          </Link>
        </div>
        <div className="header-nav">
          {!user ? (
            <div className="login-signup-buttons">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="signup-button">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="user-avatar">
                  <AvatarImage
                    src={`${user?.profile?.profilePhoto}`}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="user-popover-content">
                <div className="">
                  <div className="user-details">
                    <Avatar className="user-avatar">
                      <AvatarImage
                        src={`${user?.profile?.profilePhoto}`}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="user-name">{user?.fullname}</h4>
                      <p className="user-bio">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="user-actions">
                    {user && user.role === "seeker" ? (
                      <>
                        <div className="user-actions-button">
                          <User2 />
                          <Button variant="link">
                            <Link to="/profile">View Profile</Link>
                          </Button>
                        </div>
                        <Button variant="link">
                          <Link to="/jobs">Jobs</Link>
                        </Button>
                        <Button variant="link">
                          <Link to="/browse">Browse</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="link">
                          <Link to="/admin/companies">Companies</Link>
                        </Button>
                        <Button variant="link">
                          <Link to="/admin/jobs">Jobs</Link>
                        </Button>
                      </>
                    )}

                    <div className="user-actions-button">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
