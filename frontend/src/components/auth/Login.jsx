import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import "./auth.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container_">
      <Navbar />
      <div className="auth-form-container">
        <form onSubmit={submitHandler} className="auth-form">
          <h1 className="auth-title">Login</h1>
          <div className="auth-field">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="email@gmail.com"
            />
          </div>

          <div className="auth-field">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="password"
            />
          </div>
          <div className="role-selection">
            <div className="role-options">
              <div className="role-option">
                <Input
                  type="radio"
                  name="role"
                  value="seeker"
                  checked={input.role === "seeker"}
                  onChange={changeEventHandler}
                  // className="cursor-pointer"
                />
                <Label htmlFor="r1">Seeker</Label>
              </div>
              <div className="role-option">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  // className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </div>
          </div>
          {loading ? (
            <Button className="auth-button">
              <Loader2 className="animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="auth-button">
              Login
            </Button>
          )}
          <span className="signup-link-text">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
