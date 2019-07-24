import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { useMutation } from 'react-apollo-hooks';
import { useQuery } from 'react-apollo-hooks';

// Queries & Mutations
import fetchKlass from '../../queries/fetchKlass';
import fetchKlassesQuery from '../../queries/fetchKlasses';
import fetchTeachersStudents from '../../queries/fetchTeachersStudents';
import addKlassMutation from '../../mutations/createKlass';
import editKlassMutation from '../../mutations/editKlass';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    paddingBottom: 20
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
    paddingBottom: 20,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  }
}));

// TODO make form mutate correctly based on action from prop
// TODO set options for all students/teachers from studio
const CreateKlassForm = ({ action, selectedKlassId, mutate}) => {
  const classes = useStyles();

  // Load klass
  var selectedKlass = { name: '', description: '', startTime: '', endTime: '' };  // default to empty klass form until query returns
  var { data, error, loading } = useQuery(fetchKlass, { variables: { id: selectedKlassId }});
  if (!loading) {
    selectedKlass = data.klass;
  }

  // Load Studio
  // TODO remove hard-coded studio id
  var studio;
  var allStudents = [];
  var allTeachers = [];
  var { data, error, loading } = useQuery(fetchTeachersStudents, { variables: { id: 1 }});
  if (!loading) { 
    studio = data.studio;
    allStudents = studio.students;
    allTeachers = studio.teachers;
  };

  // Reformat teacher/student records from FullCalendar API to DB API
  const { teachers, students } = selectedKlass;
  selectedKlass.students = students.map((s) => ({id: s.id, name: s.name}));
  selectedKlass.teachers = teachers.map((t) => ({id: t.id, name: t.name}));

  const [editKlass] = useMutation(editKlassMutation);
  const [values, setValues] = React.useState(action === 'create' ? {
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    teachers: [],
    students: []
  } : selectedKlass);

  const [successMessage, toggleSuccessMessage] = React.useState({
    showSuccessMessage: false
  });

  function renderTeacherMenuItem(teacher) {
    return <MenuItem name="teacher" value={teacher} key={teacher.id}>{ teacher.name }</MenuItem>
  }

  function renderStudentMenuItem(student) {
    return <MenuItem name="student" value={student} key={student.id}>{ student.name }</MenuItem>
  }

  function renderSuccessMessage() {
    return <h3 className="success-message">Your class was created successfully and added to the calendar!</h3>
  }

  // TODO Remove hardcoded IDs
  function submitForm(e) {
    e.preventDefault();
    var { id, name, description, startTime, endTime, teachers, students } = values;

    switch (action) {
      case 'edit':
        editKlass({
          variables: {
            klass: {
              id,
              name,
              description,
              startTime,
              endTime,
              studioId: '1'
            },
            teachers,
            students
          },
          refetchQueries: [
            { query: fetchKlass, variables: { id: selectedKlassId } }, 
            { query: fetchKlassesQuery, variables: { id: 1 } }
          ]
        }).then(() => {
          resetForm();
          toggleSuccessMessage({ showSuccessMessage: true });
        });
        break;
      case 'create':
        mutate({
          refetchQueries: [{ query: fetchKlassesQuery, variables: { id: 1 } }],
          variables: {
            klass: {
              name,
              description,
              startTime,
              endTime,
              studioId: '1'
            },
            teachers,
            students
          }
        }).then(() => {
          resetForm();
          toggleSuccessMessage({ showSuccessMessage: true });
        });
        break;
      default:
        throw new Error("Component missing required prop 'action'.");
    }
  }

  function resetForm() {
    setValues({
      name: '',
      description: '',
      startTime: '',
      endTime: '',
      teachers: [],
      students: []
    });
  }

  const handleChange = name => event => {
    // Reformat teacher/student entries to remove 'typename' (FullCalendar event obj remnant)
    if (name === 'teachers' || name === 'students') {
      const newValues = event.target.value.map(t => ({id: t.id, name: t.name}))
      setValues({ ...values, [name]: newValues });
      return;
    }
    setValues({ ...values, [name]: event.target.value });
  }

  // Set edit/create variables
  var formattedStartTime = '';
  var formattedEndTime = '';
  var btnText = '';

  function setBtnText() {
    switch (action) {
      case 'edit':
        if (values.startTime && values.endTime) {
          formattedStartTime = new Date(values.startTime).toISOString().split('Z')[0];
          formattedEndTime = new Date(values.endTime).toISOString().split('Z')[0];
        }
        btnText = 'Update this class';
        break;
      case 'create': 
        btnText = 'Create this class';
        break;
      default:
        btnText = 'Submit';
        break;
    }
  };

  setBtnText();

  if (loading) { return <h3>Loading...</h3> };

  return (
    <form id="create-class-form" onSubmit={submitForm} className={classes.root}>
      { successMessage.showSuccessMessage ? renderSuccessMessage() : null }
      <TextField 
        name="name" 
        label="Name" 
        className={classes.textField} 
        value={values.name} 
        onChange={handleChange('name')}
      />

      <TextField 
        name="description" 
        label="Description" 
        className={classes.textField}
        value={values.description}
        onChange={handleChange('description')}
      />

      <FormControl className={classes.formControl}>
        <InputLabel>Students</InputLabel>
        <Select
          multiple
          value={values.students}
          onChange={handleChange('students')}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(student => (
                <Chip key={student.id} label={student.name} className={classes.chip} />
              ))}
            </div>
          )}>
          {allStudents.map(student => renderStudentMenuItem(student))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Teacher(s)</InputLabel>
        <Select 
          multiple
          value={values.teachers} 
          onChange={handleChange('teachers')}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(teacher => (
                <Chip key={teacher.id} label={teacher.name} className={classes.chip} />
              ))}
            </div>
          )}>
            {allTeachers.map(teacher => renderTeacherMenuItem(teacher))}
        </Select>
      </FormControl>

      <TextField 
        label="Start Time" 
        value={formattedStartTime}
        onChange={handleChange('startTime')}
        className={classes.textField} 
        type="datetime-local" 
        InputLabelProps={{ shrink: true }} 
      />

      <TextField 
        label="End Time" 
        value={formattedEndTime}
        onChange={handleChange('endTime')}
        className={classes.textField} 
        type="datetime-local" 
        InputLabelProps={{ shrink: true }} 
      />
      <Button variant="contained" className={classes.button} type="submit">
        {btnText}
      </Button>
    </form>
  );
}

const mapStateToProps = ({ selectedKlassId }) => { return { selectedKlassId } };
 
// TODO change hard-coded studio id in query to var
export default compose(
  connect(mapStateToProps),
  graphql(addKlassMutation),
  graphql(editKlassMutation)
)(CreateKlassForm);
