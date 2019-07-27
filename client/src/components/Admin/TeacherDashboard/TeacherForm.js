import React from 'react';
import { Button, Form, FormInput, FormGroup } from "shards-react";
import { useMutation } from 'react-apollo-hooks';

// Queries && Mutations
import fetchTeacherContracts from '../../../queries/fetchTeacherContracts';
import createTeacherMutation from '../../../mutations/createTeacher';

const TeacherForm = props => {
  const [values, setValues] = React.useState({ name: '' })
  const [showSuccessMessage, toggleSuccessMessage] = React.useState(false)
  const [createTeacher] = useMutation(createTeacherMutation)

  // TODO remove hard-coded studioId under variables and refetchQueries
  function submitForm() {
    const { name } = values;
    createTeacher({
      variables: {
        name,
        studioId: '1'
      },
      refetchQueries: [
        { query: fetchTeacherContracts, variables: { id: '1' } }
      ]
    }).then(() => {
      toggleSuccessMessage({ showSuccessMessage: true });
    })
  }

  const renderSuccessMessage = () => {
    return <h3 className="success-message">{values.name} was added successfully!</h3>
  }

  const handleChange = name => event => {
    event.preventDefault();
    setValues({ ...values, [name]: event.target.value })
  }

  return (
    <Form>
      { showSuccessMessage ? renderSuccessMessage() : null }
      <FormGroup>
        <label htmlFor="#name">Name</label>
        <FormInput 
          id="#name" 
          value={values.name} 
          onChange={handleChange("name")} 
        />
      </FormGroup>
      <Button onClick={submitForm}>Create Teacher</Button>
    </Form>
  );
}

export default TeacherForm;
