import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    studio(id: $id) {
      teachingContracts {
        startDate
        teacher {
          id
          name
          klasses {
            id
            name
          }
        }
      }
    }
  }
`;

