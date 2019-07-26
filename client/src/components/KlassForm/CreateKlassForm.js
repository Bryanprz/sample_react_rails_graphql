import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { useMutation } from 'react-apollo-hooks';
import { useQuery } from 'react-apollo-hooks';
import SelectField from './SelectField';

// Shards UI
import { Form, FormInput, FormGroup, Button } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

// Queries & Mutations
import fetchKlass from '../../queries/fetchKlass';
import fetchKlassesQuery from '../../queries/fetchKlasses';
import fetchTeachersStudents from '../../queries/fetchTeachersStudents';
import addKlassMutation from '../../mutations/createKlass';
import editKlassMutation from '../../mutations/editKlass';

const CreateKlassForm = ({ action, selectedKlassId, mutate}) => {
  const [successMessage, toggleSuccessMessage] = React.useState({showSuccessMessage: false});

  // Load klass
  // default to empty klass form until query returns
  var selectedKlass = { name: '', description: '', startTime: '', endTime: '' }; 
  var { data, error, loading } = useQuery(fetchKlass, { variables: { id: selectedKlassId }});

  // Remove 'typename' from GraphQL response for current students/teachers
  if (!loading && action === 'edit') {
    selectedKlass = data.klass;
    selectedKlass.students = selectedKlass.students.map(s => ({ id: s.id, name: s.name }));
    selectedKlass.teachers = selectedKlass.teachers.map(t => ({ id: t.id, name: t.name }));
  }

  // Load Teachers/Students
  // TODO remove hard-coded studio id
  var students = [];
  var teachers = [];
  var { data, error, loading } = useQuery(fetchTeachersStudents, { variables: { id: 1 }});

  // Remove 'typename' from GraphQL response for all student/teacher options
  if (!loading) { 
    students = data.studio.students.map(s => ({ id: s.id, name: s.name }));
    teachers = data.studio.teachers.map(t => ({ id: t.id, name: t.name }));
  };

  const [editKlass] = useMutation(editKlassMutation);
  const [values, setValues] = React.useState(action === 'create' ? {
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    teachers: [],
    students: []
  } : selectedKlass);

  function formatSelectOptions(records) {
    return records.map( el => ({ value: el.name, label: el.name, id: el.id }));
  }

  function renderSuccessMessage() {
    return <h3 className="success-message">Your class was updated successfully and added to the calendar!</h3>
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
          toggleSuccessMessage({ showSuccessMessage: true });
        });
        break;
      case 'create':
        // todo make this use React Apollo Hooks useQuery as editKlass mutation does
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
    if (event) {
      if (name === 'teachers' || name === 'students') {
        const newValues = event.map(t => ({id: t.id, name: t.value}))
        setValues({ ...values, [name]: newValues });
        return;
      }
      setValues({ ...values, [name]: event.target.value });
    }
  }

  function formatDateTime(dateTimeString) {
    if (dateTimeString === '') { return '' };
    return new Date(dateTimeString).toISOString().split('Z')[0];
  }

  function setBtnText() {
    switch (action) {
      case 'edit':
        return 'Update this class';
      case 'create': 
        return 'Create this class';
      default:
        return 'Submit';
    }
  };

  if (loading) { return <h3>Loading...</h3> };

  return (
    <Form onSubmit={submitForm}>
      { successMessage.showSuccessMessage ? renderSuccessMessage() : null }
      <FormGroup>
        <label htmlFor="#name">Name</label>
        <FormInput 
          id="#name" 
          value={values.name}
          onChange={handleChange('name')} 
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#description">Description</label>
        <FormInput 
          id="#description" 
          value={values.description} 
          onChange={handleChange('description')} 
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#startTime">Start Time</label>
        <FormInput 
          id="#startTime" 
          type="datetime-local"
          value={formatDateTime(values.startTime)} 
          onChange={handleChange('startTime')} 
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#endTime">End Time</label>
        <FormInput 
          id="#endTime" 
          type="datetime-local"
          value={formatDateTime(values.endTime)} 
          onChange={handleChange('endTime')} 
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#teachers">Teacher(s)</label>
        <SelectField 
          id="teachers"
          name="teachers"
          options={formatSelectOptions(teachers)} 
          value={formatSelectOptions(values.teachers)}
          onChange={handleChange('teachers')}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#students">Students</label>
        <SelectField 
          id="students"
          name="students"
          options={formatSelectOptions(students)} 
          value={formatSelectOptions(values.students)}
          onChange={handleChange('students')}
        />
      </FormGroup>
      <Button type="submit">{setBtnText()}</Button>
    </Form>
  )
}

const mapStateToProps = ({ selectedKlassId }) => { return { selectedKlassId } };
 
export default compose(
  connect(mapStateToProps),
  graphql(addKlassMutation),
  graphql(editKlassMutation)
)(CreateKlassForm);
