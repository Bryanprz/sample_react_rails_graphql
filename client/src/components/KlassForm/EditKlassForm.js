import React from 'react';
import CreateKlassForm from './CreateKlassForm';

const EditKlassForm = ({selectedKlassId}) => {
  return (
    <div>  
      <CreateKlassForm action="edit" selectedKlassId={selectedKlassId} />
    </div>  
  );
}

export default EditKlassForm;























































//
//import React from 'react';
//import { graphql, compose } from 'react-apollo';
//import PropTypes from 'prop-types';

//// Queries & Mutations
//import fetchTeachersQuery from '../../queries/fetchTeachersStudents';
//import fetchKlassesQuery from '../../queries/fetchKlasses';
//import editKlassMutation from '../../mutations/editKlass';

//// Material UI
//import { makeStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
//import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
//import InputLabel from '@material-ui/core/InputLabel';
//import FormControl from '@material-ui/core/FormControl';

//const useStyles = makeStyles(theme => ({
  //button: {
    //margin: theme.spacing(1)
  //},
  //textField: {
    //marginLeft: theme.spacing(1),
    //marginRight: theme.spacing(1),
    //width: 400,
    //paddingBottom: 20
  //},
  //formControl: {
    //width: 400,
    //paddingBottom: 20,
    //marginLeft: 'auto',
    //marginRight: 'auto'
  //}
//}));

//const EditKlassForm = props => {
  //const classes = useStyles();
  //const [values, setValues] = React.useState({
    //name: '',
    //description: '',
    //startTime: '',
    //endTime: '',
    //teacher: { id: '', name: '' }
  //});
  //const [successMessage, toggleSuccessMessage] = React.useState({
    //showSuccessMessage: false
  //});

  //if (props.data.loading) { return <h3>Loading...</h3> };

  //function renderTeacherMenuItem(teacher) {
    //return <MenuItem name="teacher" value={teacher} key={teacher.id}>{ teacher.name }</MenuItem>
  //}

  //function renderSuccessMessage() {
    //return <h3 className="success-message">Nice work. Your changes are live.</h3>
  //}

  //let klassFields = { 'klass': {} };
  //function buildKlassFields(value, key, map) {
    //if (value !== '') {
      //klassFields['klass'][key] = value;
    //}
  //}

  //function submitForm(e) {
    //e.preventDefault();
    //const { name, description, startTime, endTime, teacher } = values;

    //let map = new Map();
    //map.set('name', name);
    //map.set('description', description);
    //map.set('startTime', startTime);
    //map.set('endTime', endTime);
    //map.forEach(buildKlassFields)

    //// TODO DRY up this conditional
    //if ( teacher.id !== '' ) {
      //props.mutate({
        //variables: {
          //klass: {
            //id: props.id,
            //name: klassFields['klass']['name'],
            //description: klassFields['klass']['description'],
            //startTime: klassFields['klass']['startTime'],
            //endTime: klassFields['klass']['endTime']
          //},
          //teacher: {
            //id: teacher.id,
            //name: teacher.name
          //}
        //},
        //refetchQueries: [
          //{ query: fetchKlassesQuery, variables: { id: 1 } }, 
          //{ query: fetchTeachersQuery, variables: { id: 1 } }
        //]
      //}).then(() => toggleSuccessMessage({ showSuccessMessage: true }));
    //} else {
      //props.mutate({
        //variables: {
          //klass: {
            //id: props.id,
            //name: klassFields['klass']['name'],
            //description: klassFields['klass']['description'],
            //startTime: klassFields['klass']['startTime'],
            //endTime: klassFields['klass']['endTime']
          //}
        //},
        //refetchQueries: [
          //{ query: fetchKlassesQuery, variables: { id: 1 } }, 
          //{ query: fetchTeachersQuery, variables: { id: 1 } }
        //]
      //}).then(() => toggleSuccessMessage({ showSuccessMessage: true }));
    //};
  //}

  //const handleChange = name => event => {
    //setValues({ ...values, [name]: event.target.value });
  //}

  //var teachers = props.data.studio.teachers;

  //// TODO finish mutating teacher correctly
  //return (
    //<form onSubmit={submitForm} className={classes.formControl}>
      //{ successMessage.showSuccessMessage ? renderSuccessMessage() : null }
      //<TextField 
        //name="name" 
        //label="Name" 
        //className={classes.textField} 
        //value={values.name} 
        //onChange={handleChange('name')}
      ///>

      //<TextField 
        //name="description" 
        //label="Description" 
        //className={classes.textField}
        //value={values.description}
        //onChange={handleChange('description')}
      ///>

      //<FormControl className={classes.formControl}>
        //<InputLabel>Teacher(s)</InputLabel>
        //<Select value={values.teacher} onChange={handleChange('teacher')}>
          //{teachers.map(teacher => renderTeacherMenuItem(teacher))}
        //</Select>
      //</FormControl>

      //<TextField 
        //label="Start Time" 
        //value={values.startTime} 
        //onChange={handleChange('startTime')}
        //className={classes.textField} 
        //type="datetime-local" 
        //InputLabelProps={{ shrink: true }} 
      ///>

      //<TextField 
        //label="End Time" 
        //value={values.endTime} 
        //onChange={handleChange('endTime')}
        //className={classes.textField} 
        //type="datetime-local" 
        //InputLabelProps={{ shrink: true }} 
      ///>
      //<Button variant="contained" className={classes.button} type="submit">
        //Update Class
      //</Button>
    //</form>
  //);
//}

//EditKlassForm.propTypes = {
  //id: PropTypes.string.isRequired
//}
 
//export default compose(
  //graphql(fetchTeachersQuery, { options: props => ({variables: { id: 1 }}) }),
  //graphql(editKlassMutation),
//)(EditKlassForm);
