import gql from 'graphql-tag';

export default gql`
  mutation editKlass($klass: KlassInput!, $teachers: [TeacherInput!], $students: [StudentInput!]) {
    editKlass(klass: $klass, teachers: $teachers, students: $students) {
      id
      name
      description
      startTime
      endTime
      students {
        id
        name
      }
      teachers {
        id
        name
      }
    }
  }
`;
