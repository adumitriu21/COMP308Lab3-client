
import { gql } from '@apollo/client';

export const{
    GET_STUDENT,
} = {
    GET_STUDENT: gql`
query GetStudent($id: ID!) {
  student(id: $id) {
    id
    firstName
    lastName
    address
    city
    phone
    email
    studentId
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

export const GET_COURSES = gql`
  query {
    courses {
      ...CourseFields
    }
  }
  ${COURSE_FIELDS}
`;

export const GET_MY_COURSES = gql`
  query MyCourses($studentId: ID!) {
    myCourses(studentId: $studentId) {
      _id
      code
      title
      description
      semester
      section
    }
  }
`;

export const STUDENTS_ENROLLED = gql`
  query StudentsEnrolled($courseId: ID!) {
    course(id: $courseId) {
      _id
      title
      description
      studentsEnrolled 
    }
  }
`;







