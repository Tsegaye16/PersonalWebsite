import { AppBar, Typography } from "@mui/material";
import React from "react";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { Avatar, Button, Toolbar } from "@material-ui/core";

const Navbar: React.FC = () => {
  const classes = useStyles();
  const user = null;
  return (
    <div>Nav bar</div>
    // <AppBar position="static" color="inherit" className={classes.appBar}>
    //   <div className={classes.brandContainer}>
    //     <Typography
    //       variant="h2"
    //       align="center"
    //       className={classes.heading}
    //       component={Link}
    //       to="/"
    //     >
    //       Memories
    //     </Typography>
    //     <img
    //       src={memories}
    //       alt="memories"
    //       height={60}
    //       className={classes.image}
    //     />
    //   </div>
    //   <Toolbar className={classes.toolbar}>
    //     {user ? (
    //       <div className={classes.profile}>
    //         <Avatar
    //           className={classes.purple}
    //           alt={user.result.name}
    //           src={user.result.imageUrl}
    //         >
    //           {user.result.name.charAt(0)}
    //         </Avatar>
    //         <Typography className={classes.userName} variant="h6">
    //           {user.result.name}
    //         </Typography>
    //         <Button
    //           className={classes.logout}
    //           variant="contained"
    //           color="secondary"
    //           onClick={() => {}}
    //         >
    //           Logout
    //         </Button>
    //       </div>
    //     ) : (
    //       <Button
    //         component={Link}
    //         to="/auth"
    //         variant="contained"
    //         color="primary"
    //       >
    //         Sign In
    //       </Button>
    //     )}
    //   </Toolbar>
    // </AppBar>
  );
};

export default Navbar;
