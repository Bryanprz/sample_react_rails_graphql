import React, { useState } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';

// 3rd party libs
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './klass-dashboard.scss';

// ActionCreators
import { selectKlassId } from '../../actions';

// Queries & Mutations
import fetchKlass from '../../queries/fetchKlass';
import fetchKlassesQuery from '../../queries/fetchKlasses';

// My Components
import Sidebar from '../Sidebar';
import KlassForm from '../KlassForm/KlassForm';
import KlassModal from '../KlassModal';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
}));

//const KlassDashboard = ({data, selectKlassId, selectedKlassId}) => {
const KlassDashboard = props => {
  const {data, selectKlassId, selectedKlassId} = props;
  const classes = useStyles();
  const [showForm, toggleForm] = useState(false);
  const [showKlassModal, toggleModal] = useState(false);

  // Hack to force update after Redux action-creator gets invoked in submit func
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
 
  //const { klassData, klassError, klassLoading } = useQuery(fetchKlass, {
    //variables: {
      //id: selectedKlassId
    //}
  //});

  if (data.loading || !data.studio) { return <h3>Loading...</h3> };

  var klassEvents = [];

  data.studio.klasses.map(klass => createCalendarEvent(klass));

  // required format for FullCalendar. https://fullcalendar.io/docs/event-parsing
  function createCalendarEvent(klass) {
    let event = {
      id: klass.id,
      title: klass.name,
      description: klass.description,
      start: new Date(klass.startTime),
      end: new Date(klass.endTime),
      teachers: klass.teachers.map(t => ({ id: t.id, name: t.name })),
      students: klass.students.map(s => ({ id: s.id, name: s.name }))
    }
    klassEvents.push(event);
  }

  function klassClick({event}) {
    //const selectedKlass = klassEvents.find( el => el.id === event.id);
    selectKlassId(event.id); // set Redux state
    forceUpdate();

    //reFormatKlass(klass);

    toggleModal(true);
  }

  // Reformat from FullCalendar specs to DB specs for klass
  //function reFormatKlass(klass) {
    //klass.name = klass.title;
    //klass.startTime = klass.start.toString();
    //klass.endTime = klass.end.toString();

    //delete klass.title;
    //delete klass.start;
    //delete klass.end;

    //return klass;
  //}

  function closeModal() {
    toggleModal(false);
  }

  return (
    <Grid container className="klass-dashboard-container">
      <Grid container item sm={3}>
        <Sidebar />
      </Grid>

      <Grid item sm={9} className="klass-dashboard-content-container">
        <h3>Classes at WildFlowers Yoga Studio</h3>
        <p>Click on any class in the calendar to see details</p> 

        <Button 
          variant="contained" 
          className={classes.button} 
          color="primary" 
          onClick={() => toggleForm(!showForm)}
        >
          Add New Class
        </Button>

        {showForm ? <KlassForm action="create" /> : null}
        {showKlassModal ? 
          <KlassModal 
            onClose={closeModal} 
            open={showKlassModal}
          /> : null}

        <FullCalendar 
          plugins={[ dayGridPlugin ]} 
          events={klassEvents} 
          eventClick={klassClick}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({selectedKlassId}) => { return { selectedKlassId }};

export default compose(
  graphql(fetchKlassesQuery, { options: props => ({variables: { id: 1 }}) }),
  connect(mapStateToProps, { selectKlassId })
)(KlassDashboard);
