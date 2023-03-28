
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
