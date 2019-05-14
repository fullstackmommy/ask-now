import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import auth from "./components/auth/auth-helper";

const logo = require("./images/logo.svg");

const styles = theme => ({
  appBar: {
    position: "relative",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    backgroundColor: "#0288D1"
  },
  inline: {
    display: "inline"
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  productLogo: {
    display: "inline-block",
    borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1.5em"
    }
  },
  grow: {
    flexGrow: 1
  },
  tagline: {
    display: "inline-block",
    marginLeft: 10,
    color: "#ffffff",
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    }
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  iconButton: {
    float: "right"
  },
  tabContainer: {
    alignSelf: "center",
    marginLeft: 32,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: "auto"
  }
});

class Topbar extends Component {
  state = {
    menuDrawer: false
  };

  handleLogin = () => {
    return <Redirect to="/login" />;
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = event => {
    this.setState({ menuDrawer: true });
  };

  mobileMenuClose = event => {
    this.setState({ menuDrawer: false });
  };

  componentDidMount() {
    //window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={24} alignItems="baseline">
            <Grid item xs={12} className={classes.flex}>
              <div className={classes.inline}>
                <Typography variant="h6" color="inherit" noWrap>
                  <Link to="/" className={classes.link}>
                    <img width={50} src={logo} alt="" />
                    <span className={classes.tagline}>AskNow</span>
                  </Link>
                </Typography>
              </div>
              {!this.props.noTabs && (
                <React.Fragment>
                  <div className={classes.productLogo}>
                    <Typography>
                      <span className={classes.tagline}>
                        ... or forever hold your peace
                      </span>
                    </Typography>
                  </div>
                  <div className={classes.grow}>&nbsp;</div>
                  <div className={classes.iconContainer}>
                    <IconButton
                      onClick={this.mobileMenuOpen}
                      className={classes.iconButton}
                      color="inherit"
                      aria-label="Menu"
                    >
                      <MenuIcon />
                    </IconButton>
                  </div>
                  <div className={classes.tabContainer}>
                    <SwipeableDrawer
                      anchor="right"
                      open={this.state.menuDrawer}
                      onClose={this.mobileMenuClose}
                      onOpen={this.mobileMenuOpen}
                    >
                      <AppBar title="Menu">
                        <div />
                      </AppBar>
                      <List>
                        {!auth.isAuthenticated() && (
                          <ListItem
                            onClick={() =>
                              auth.signout(() =>
                                this.props.history.push("/login")
                              )
                            }
                          >
                            Admin
                          </ListItem>
                        )}
                        {auth.isAuthenticated() && (
                          <div>
                            <ListItem
                              onClick={() =>
                                this.props.history.push("/dashboard")
                              }
                            >
                              Dashboard
                            </ListItem>
                            <ListItem
                              onClick={() =>
                                auth.signout(() => this.props.history.push("/"))
                              }
                            >
                              Logout
                            </ListItem>
                          </div>
                        )}
                      </List>
                    </SwipeableDrawer>
                    {!auth.isAuthenticated() && (
                      <Button
                        onClick={() =>
                          auth.signout(() => this.props.history.push("/login"))
                        }
                        classes={{
                          label: "tab_button"
                        }}
                      >
                        Admin
                      </Button>
                    )}
                    {auth.isAuthenticated() && (
                      <span>
                        <Button
                          onClick={() => this.props.history.push("/dashboard")}
                        >
                          Dashboard
                        </Button>
                        <Button
                          onClick={() =>
                            auth.signout(() => this.props.history.push("/"))
                          }
                        >
                          Logout
                        </Button>
                      </span>
                    )}
                  </div>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(Topbar));
