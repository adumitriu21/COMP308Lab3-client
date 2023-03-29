
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { GET_COURSES, GET_MY_COURSES } from '../graphql/queries';
import { ADD_COURSE, DROP_COURSE } from '../graphql/mutations'

//

const CourseList = ({ studentObjId }) => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);

  const { loading: coursesLoading, error: coursesError, data:courseData } = useQuery(GET_COURSES);
  const { loading: myCoursesLoading, error: myCoursesError, data: myCoursesData, refetch } = useQuery(GET_MY_COURSES, {
    variables: { studentId: studentObjId },
    onCompleted: (myCoursesData) => {
      setCourses(myCoursesData.myCourses);
    },
  });

  const [addCourseMutation] = useMutation(ADD_COURSE, {
    update(cache, { data: { addCourse } }) {
      cache.modify({
        fields: {
          courses(existingCourses = []) {
            const newCourseRef = cache.writeFragment({
              data: addCourse,
              fragment: gql`
                fragment NewCourse on Course {
                  id
                  code
                  title
                  description
                  semester
                  section
                }
              `
            });
            return [...existingCourses, newCourseRef];
          }
        }
      });
      setAvailableCourses(prevCourses => prevCourses.filter(course => course.id !== addCourse.id));
      setCourses(prevCourses => [...prevCourses, addCourse]);
    }
  });


  const [removeCourseMutation] = useMutation(DROP_COURSE, {

    update(cache, { data: { deleteCourse } }) {
      const deletedCourseId = deleteCourse;
      cache.modify({
        fields: {
          courses(existingCourses = []) {
            return existingCourses.filter(courseRef => courseRef.__ref !== `Course:${deletedCourseId}`);
          }
        }
      });
      const updatedCourses = courses.filter((course) => course.id !== deletedCourseId);
      setCourses(updatedCourses);
    },
    onCompleted(myCourseData) {
      // refetch the data after the mutation has completed
      refetch();
    }
  });

  useEffect(() => {
    if (courseData) {
      setAvailableCourses(courseData.courses);
      setLoading(false);
    }
  }, [courseData]);

  useEffect(() => {
    if (myCoursesData) {
      setCourses(myCoursesData.myCourses);
      setLoading(false);
    }
  }, [myCoursesData]);

  const removeStudentFromCourse = async (studentObjId, courseObjId) => {
    try {
      await removeCourseMutation({
        variables: {
          courseId: courseObjId,
          studentId: studentObjId
        }
      });
      setMessage(`Student ${studentObjId} removed from course ${courseObjId}`);

      const updatedCourses = courses.filter((course) => course.id !== courseObjId);
      setCourses(updatedCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedCourse(event.target.value);
  };
  const handleAddCourse = async () => {
    try {
      const { data } = await addCourseMutation({
        variables: {
          studentId: studentObjId,
          courseId: selectedCourse,
        },
      });
      setMessage(`Course ${data.addCourse.title} added!`);
      refetch();
    } catch (error) {
      console.error(error);
      setMessage("Already enrolled in this course!")
    }
  };

  const handleDropCourse = async (studentId, courseId) => {
    if (window.confirm("Are you sure you want to drop this course?")) {
      try {
        await removeStudentFromCourse(studentId, courseId);
        setMessage(`Student ${studentId} removed from course ${courseId}`);

      } catch (error) {
        console.error(error);
      }
    }
  };

  if (coursesLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (coursesError) {
    return <div>Error: {coursesError.message}</div>;
  }
  if (myCoursesLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (myCoursesError) {
    return <div>Error: {myCoursesError.message}</div>;
  }

  return (
    <div>
      <h2>My Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Description</th>
            <th>Semester</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.semester}</td>
              <td>{course.section}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDropCourse(studentObjId, course._id)}>Drop</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div>
        <select value={selectedCourse} onChange={handleSelectChange}>
          <option value="">Select Course</option>
          {availableCourses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.code} {course.title} Sec:{course.section}
            </option>
          ))}
  
        </select>
        <Button variant="primary" size="lg" style={{ marginLeft: "30px" }}
          onClick={handleAddCourse} disabled={!selectedCourse} >
          Add Course
        </Button>
      </div>


      {/* Display the message */}
      {message &&
        <h6 style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2em', marginTop: '20px' }}>
          {message}
        </h6>}
    </div>




  );
};

export default CourseList;