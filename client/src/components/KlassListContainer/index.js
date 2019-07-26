import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

// Queries & Mutations
import fetchKlasses from '../../queries/fetchKlasses';

// Components
import KlassCard from '../KlassCard';

// Material UI
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// Material UI Styles Overrides
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const KlassListContainer = props => {
  const classes = useStyles();

  if (props.data.loading) { return <div>Loading...</div> };

  const { klasses } = props.data.studio;

  return (
    <Grid container item className={classes.root} spacing={5}>
      <h2 className="class-list-header">Today's Classes</h2>
      {klasses.map(klass => (
        <Grid item key={klass.id}>
          <KlassCard klass={klass}/>
        </Grid>
      )
      )}
    </Grid>
  );
}

// TODO get ID from props
export default graphql(
  fetchKlasses, { options: props => ({ variables: { id: 1 } }) }
)(KlassListContainer);

// TODO add proptypes expect studio id required
