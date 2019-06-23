import React from 'react';
import './sidebar.scss';

// Material UI
import Link from '@material-ui/core/Link';
import {makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
        <Link href="javascript:;" className={classes.link}>Classes</Link>

        <Link href="javascript:;" className={classes.link}>Teachers</Link>

        <Link href="javascript:;" className={classes.link}>Calendar</Link>

        <Link href="javascript:;" className={classes.link}>Students</Link>
    </div>
  );
}

export default Sidebar;
