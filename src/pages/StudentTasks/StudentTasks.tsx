import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import useAPI from 'hooks/useAPI';
import styles from './StudentTasks.module.css';
import StudentTasksBox from './StudentTasksBox';
import testData from './testData.json';



// Define the types for a single task and the associated course
type Task = {
  id: number;
  assignment: string;
  course: string;
  topic: string;
  currentStage: string;
  reviewGrade: string;
  badges: string;
  stageDeadline: string;
  publishingRights: boolean;
};

type Props = {};


const StudentTasks: React.FC = () => {
  const { error, isLoading, data: assignmentResponse, sendRequest: fetchAssignments } = useAPI();
  const { data: coursesResponse, sendRequest: fetchCourses } = useAPI();
  const auth = useSelector((state: RootState) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const exampleDuties = testData.duties;
  const taskRevisions = testData.revisions;
  const studentsTeamedWith = testData.studentsTeamedWith;

  // Fetch assignments and courses data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchAssignments({ url: '/assignments' }),
          fetchCourses({ url: '/courses' })
        ]);
      } catch (error) {
        console.error("Error fetching tasks data:", error);
      }
    };
    fetchData();
  }, [fetchAssignments, fetchCourses]);

  // Merge assignments and courses data
  useEffect(() => {
    if (assignmentResponse && coursesResponse) {
      const mergedTasks = assignmentResponse.data.map((assignment: any) => {
        const course = coursesResponse.data.find((c: any) => c.id === assignment.course_id);
        return {
          id: assignment.id,
          assignment: assignment.name,
          course: course ? course.name : 'Unknown',
          topic: assignment.topic || '-',
          currentStage: assignment.currentStage || 'Pending',
          reviewGrade: assignment.reviewGrade || 'N/A',
          badges: assignment.badges || '',
          stageDeadline: assignment.stageDeadline || 'No deadline',
          publishingRights: assignment.publishingRights || false
        };
      });
      setTasks(mergedTasks);
    }
  }, [assignmentResponse, coursesResponse]);

  // Error handling for API requests
  useEffect(() => {
    if (error) {
      dispatch({ type: 'SHOW_ALERT', payload: { message: error, variant: 'danger' }});
    }
  }, [error, dispatch]);

  // Function to toggle publishing rights
  const togglePublishingRights = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? {...task, publishingRights: !task.publishingRights} : task
    ));
  }, []);

  // Render the list of tasks within a container
  return (
    <div className="assignments-page">

    <h1 className="assignments-title">Student Task List</h1>
    <div className={styles.pageLayout}>
 

    <aside className={styles.sidebar}>
        <StudentTasksBox  duties={exampleDuties}
            revisions={taskRevisions}
            studentsTeamedWith={studentsTeamedWith} 
        />
    </aside>
    <div className={styles.mainContent}>
  
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <table className={styles.tasksTable}>
        <thead>
            <tr>
              <th>Assignment</th>
              <th>Course</th>
              <th>Topic</th>
              <th>Current Stage</th>
              <th>Review Grade</th>
              <th>Badges</th>
              <th>Stage Deadline</th>
              <th>Publishing Rights</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td><Link to={`/student_task_detail/${task.id}`}>{task.assignment}</Link></td>
                <td>{task.course}</td>
                <td>{task.topic}</td>
                <td>{task.currentStage}</td>
                <td>{task.reviewGrade}</td>
                <td>{task.badges}</td>
                <td>{task.stageDeadline}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.publishingRights}
                    onChange={() => togglePublishingRights(task.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    </div>
  );
};

export default StudentTasks;