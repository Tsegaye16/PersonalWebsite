import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Typography } from "@mui/material";
import { Avatar, Button, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { jwtDecode } from "jwt-decode";

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

    if (token) {
      const decodedToken: any = jwtDecode(token);

      // If token is expired, log out the user
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    // Update the user state if the token is still valid
    const profile = localStorage.getItem("profile");
    setUser(profile ? JSON.parse(profile) : null);
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
    localStorage.removeItem("profile");
  };

  return (
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
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl || ""}
            >
              {user.result.name?.charAt(0) || ""}
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
