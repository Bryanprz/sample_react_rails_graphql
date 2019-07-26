import React from 'react';
import KlassModal from '../../KlassModal';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// ActionCreators
import { selectKlassId } from '../../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function KlassListItem({klass, selectKlassId, selectedKlassId}) {
  const classes = useStyles();
  const [showKlassModal, toggleKlassModal] = React.useState(false);

  function klassClick(klassId) {
    return function() {
      selectKlassId(klassId);
      toggleKlassModal(true);
    }
  }

  function closeModal() {
    toggleKlassModal(false);
  }

  return (
    <List component="nav" className={classes.root} aria-label="contacts">

      {showKlassModal ? 
        <KlassModal 
          onClose={closeModal} 
          open={showKlassModal}
        /> : null}

      <ListItem button>
        <ListItemText inset primary={klass.name} onClick={klassClick(klass.id)} />
      </ListItem>
    </List>
  );
}

const mapStateToProps = ({selectedKlassId}) => { return { selectedKlassId } };

export default connect(mapStateToProps, {selectKlassId})(KlassListItem);
