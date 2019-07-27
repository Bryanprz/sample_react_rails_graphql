import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import Sidebar from '../../Sidebar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TeacherCard from './TeacherCard';
import TeacherForm from './TeacherForm';
import { Button } from "shards-react";
import Select from 'react-select' // TODO

import './teacher-card.scss';

// Queries
import fetchTeacherContracts from '../../../queries/fetchTeacherContracts';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 40
  }
}));

const TeacherDashboard = ({data}) => {
  const classes = useStyles();
  const [showTeacherForm, toggleTeacherForm] = React.useState(false);
  
  function renderTeacherCards() {
    if (!data.loading && data.studio) {
      const { teachingContracts } = data.studio;

      return teachingContracts.map(({startDate, teacher}) => (
        <div key={teacher.id} className="teacher-card-div">
          <TeacherCard 
            teacher={teacher} 
            startDate={startDate}
          />
        </div>
      ));
    }
  }

  // TODO implement search option with React Select
  //function teacherOptions() {
    //if (!data.loading && data.studio) {
      //return data.studio.teachingContracts.map(t => {
        //return { name: t.teacher.name, label: t.teacher.name }
      //})
      ////return data.studio.teachingContracts.map(t => (
        ////{ name: t.teacher.name, label: t.teacher.name }
      ////));
    //}
    //return [{ value: '', label: '' }];
  //}

  return (
    <Grid container className={classes.root}>
      <Grid container item sm={3}>
        <Sidebar />
      </Grid>
      <div>  
        <Button 
          onClick={() => toggleTeacherForm(!showTeacherForm)}
        >
          Add New Teacher
        </Button>
        { showTeacherForm ? <TeacherForm /> : null }
        { renderTeacherCards() }
      </div>  
    </Grid>
  );
}

TeacherDashboard.propTypes = {
  studioId: PropTypes.string
}

// TODO make this studio ID a var
export default graphql(fetchTeacherContracts, 
  { options: props => ({ variables: { id: '1' }}) }
)(TeacherDashboard);
