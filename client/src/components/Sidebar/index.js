import React from 'react';
import './sidebar.scss';
import { Link } from 'react-router-dom';

// Material UI
import {makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    paddingBottom: theme.spacing(6)
  }
}))

const Sidebar = props => {
  const classes = useStyles();

  return (
    <div className="sidebar">
      <Link to="/dashboard" className={classes.link}>Dashboard</Link>

      <Link to="/admin/classes" className={classes.link}>Classes</Link>

      <Link to="/admin/teachers" className={classes.link}>Teachers</Link>

      <Link to="javascript:;" className={classes.link}>Calendar</Link>

      <Link to="javascript:;" className={classes.link}>Students</Link>
    </div>
  );
}

export default Sidebar;
