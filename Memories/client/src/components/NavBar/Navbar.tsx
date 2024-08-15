import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Typography } from "@mui/material";
import { Avatar, Button, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import memories from "../../images/memories.png";
import useStyles from "./styles";

const Navbar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(() => {
    const profile = localStorage.getItem("profile");
    return profile ? JSON.parse(profile) : null;
  });

  useEffect(() => {
    const token = user?.token;
    const profile = localStorage.getItem("profile");
    setUser(profile ? JSON.parse(profile) : null);
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  return (
    // <div>Nav bar</div>
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          variant="h2"
          align="center"
          className={classes.heading}
          component={Link}
          to="/"
        >
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height={60}
          className={classes.image}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
