import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo-hooks';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

// My Components
import EditKlassForm from '../KlassForm/EditKlassForm';

// Queries & Mutations
import fetchKlass from '../../queries/fetchKlass';
import fetchKlassesQuery from '../../queries/fetchKlasses';
import deleteKlassMutation from '../../mutations/deleteKlass';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const KlassModal = props => {
  const [open, toggleOpen] = useState(true);
  const [showForm, toggleForm] = useState(false);
  const [showDeleteSuccess, toggleDeleteSuccess] = useState(false);
  const [showDeleteConfirmation, toggleDeleteConfirmation] = useState(false);
  const { data, loading, error } = useQuery(fetchKlass, {
    variables: {
      id: props.selectedKlassId
    }
  });

  if (loading || !data.klass) { return "Loading..." };

  const { klass } = data;
  //const klass = {name: '', startTime: '', endTime: '', description: '', teachers: [], students: []};
  var { teachers, students } = klass;
  //var teachers = []
  //var students = []

  const teachersEmpty = teachers.every(t => t.name === '');
  teachers = teachers.map(t => t.name).join(', ');

  const studentsEmpty = students.every(s => s.name === '');
  students = students.map(s => s.name).join(', ');

  function renderDeleteConfirmation() {
    return (
      <DialogActions>
        <Typography variant="subtitle1">Are you sure you want to delete this class?</Typography>
        <Button variant="contained" color="primary" onClick={this.deleteKlass.bind(this)}>
          Yes, delete this class
        </Button>
        <Button variant="contained" color="secondary">
          No, keep this class
        </Button>
      </DialogActions>
    )
  }

  function deleteKlass() {
    // TODO make studio ID variable not hard coded
    props.mutate({
      variables: { id: props.selectedKlassId },
      refetchQueries: [{ query: fetchKlassesQuery, variables: { id: 1 } }]
    }).then(() => {
      toggleDeleteSuccess(true);
      toggleDeleteConfirmation(false);
      }
    );
  }

  return (
    <div>
      <Dialog
        onClose={props.onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
          { klass.name}
        </DialogTitle>
        <DialogContent dividers>
          {showDeleteConfirmation ? renderDeleteConfirmation() : null}
          {showDeleteSuccess ? "This class has been deleted." : null}
          {showForm ? <EditKlassForm /> : null}
          <Typography gutterBottom>
            { klass.description }
          </Typography>
          <Typography gutterBottom>
            Start Time: { klass.startTime }<br />
            End Time: { klass.endTime }
          </Typography>
          <Typography gutterBottom>
            Teachers: { teachersEmpty ? "No teacher registered" : teachers }
          </Typography>
          <Typography gutterBottom>
            Students Registered: { studentsEmpty ? "No students registered" : students }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleForm(true)} color="primary">
            Edit this class
          </Button>
          <Button onClick={() => toggleDeleteConfirmation(true)} color="primary">
            Delete this class
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//class KlassModal extends React.Component {
  //state = {
    //open: true,
    //showForm: false,
    //showDeleteSuccess: false,
    //showDeleteConfirmation: false
  //};

  //renderDeleteConfirmation() {
    //return (
      //<DialogActions>
        //<Typography variant="subtitle1">Are you sure you want to delete this class?</Typography>
        //<Button variant="contained" color="primary" onClick={this.deleteKlass.bind(this)}>
          //Yes, delete this class
        //</Button>
        //<Button variant="contained" color="secondary">
          //No, keep this class
        //</Button>
      //</DialogActions>
    //)
  //}

  //deleteKlass() {
    //// TODO make studio ID variable not hard coded
    //this.props.mutate({
      //variables: { id: this.props.klassId },
      //refetchQueries: [{ query: fetchKlassesQuery, variables: { id: 1 } }]
    //}).then(() => this.setState({ showDeleteSuccess: true, showDeleteConfirmation: false }));
  //}

  //render() {
    //debugger;
    ////const { klass } = this.props.data;
    ////var { teachers, students } = klass;

    //const klass = {name: '', description: '', startTime: '', endTime: ''};
    //const teachers = [];
    //const students = [];
    //const teachersEmpty = false;
    //const studentsEmpty = false;
    ////const teachersEmpty = teachers.every(t => t.name === '');
    ////teachers = teachers.map(t => t.name).join(', ');

    ////const studentsEmpty = students.every(s => s.name === '');
    ////students = students.map(s => s.name).join(', ');

    //return (
      //<div>
        //<Dialog
          //onClose={this.props.onClose}
          //aria-labelledby="customized-dialog-title"
          //open={this.props.open}
          //fullWidth={true}
        //>
          //<DialogTitle id="customized-dialog-title" onClose={this.props.onClose}>
            //{ klass.name}
          //</DialogTitle>
          //<DialogContent dividers>
            //{this.state.showDeleteConfirmation ? this.renderDeleteConfirmation() : null}
            //{this.state.showDeleteSuccess ? "This class has been deleted." : null}
            //{this.state.showForm ? <EditKlassForm /> : null}
            //<Typography gutterBottom>
              //{ klass.description }
            //</Typography>
            //<Typography gutterBottom>
              //Start Time: { klass.startTime }<br />
              //End Time: { klass.endTime }
            //</Typography>
            //<Typography gutterBottom>
              //Teachers: { teachersEmpty ? "No teacher registered" : teachers }
            //</Typography>
            //<Typography gutterBottom>
              //Students Registered: { studentsEmpty ? "No students registered" : students }
            //</Typography>
          //</DialogContent>
          //<DialogActions>
            //<Button onClick={() => this.setState({showForm: true})} color="primary">
              //Edit this class
            //</Button>
            //<Button onClick={() => this.setState({showDeleteConfirmation: true})} color="primary">
              //Delete this class
            //</Button>
          //</DialogActions>
        //</Dialog>
      //</div>
    //);
  //}
//}

KlassModal.propTypes = {
}

const mapStateToProps = ({selectedKlassId}) => { return { selectedKlassId } };

export default compose(
  connect(mapStateToProps),
  graphql(deleteKlassMutation)
)(KlassModal);
