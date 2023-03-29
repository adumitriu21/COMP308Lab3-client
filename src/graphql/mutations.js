import { gql } from '@apollo/client';

export const{
    UPDATE_STUDENT,
} = {
    UPDATE_STUDENT: gql`
  mutation updateStudent($id: ID!, $firstName: String, $lastName: String, $email: String,
    $password: String, $studentId: Int, $address: String, $city: String, $phone: String,
    $program: Program, $semester: Int, $startDate: Date) {
    updateStudent(id: $id, firstName: $firstName, lastName: $lastName, email: $email,
      password: $password, studentId: $studentId, address: $address, city: $city, phone: $phone,
      program: $program, semester: $semester, startDate: $startDate) {
      id
      firstName
      lastName
      email
      password
      studentId
      address
      city
      phone
      program
      semester
      startDate
    }
  }
`
};

const COURSE_FIELDS = gql`
  fragment CourseFields on Course {
    _id
    code
    title
    description
    semester
    section
  }
`;

export const ADD_COURSE = gql`
  mutation AddCourse($studentId: ID!, $courseId: ID!) {
    addCourse(studentId: $studentId, courseId: $courseId) {
      ...CourseFields
    }
  }
  ${COURSE_FIELDS}
`;

export const DROP_COURSE = gql`
  mutation DropCourse($studentId: ID!, $courseId: ID!) {
    dropCourse(studentId: $studentId, courseId: $courseId) {
      _id
      code
      title
      description
      semester
      section
    }
  }
`;
