import gql from 'graphql-tag';

export default gql`
  mutation createTeacher($name: String!, $studioId: ID!) {
    createTeacher(name: $name, studioId: $studioId) {
      id
      name
    }
}
`;

