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