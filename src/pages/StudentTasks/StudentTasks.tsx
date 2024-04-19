import React, { useState } from 'react';
import styles from './StudentTasks.module.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

const StudentTasks: React.FC<Props> = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      assignment: 'Program 1',
      course: 'CSC/ECE 517, Spring 2024',
      topic: '-',
      currentStage: 'Finished',
      reviewGrade: 'N/A',
      badges: '',
      stageDeadline: '2024-01-31 00:00:00 -0500',
      publishingRights: false,
    },
    {
      id: 2,
      assignment: 'Program 2',
      course: 'CSC/ECE 517, Spring 2024',
      topic: '-',
      currentStage: 'Finished',
      reviewGrade: 'N/A',
      badges: '',
      stageDeadline: '2024-01-31 00:00:00 -0500',
      publishingRights: false,
    },
    // ... add additional tasks as needed
  ]);

  // Function to toggle publishing rights
  const togglePublishingRights = (id: number) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? {...task, publishingRights: !task.publishingRights} : task
    ));
  };

  // Render the list of tasks within a container
  return (
    <div className={styles.container}>
      <h1>Assignments</h1>
      <table>
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
              <td><Link to={`/student_task_detail/${task.assignment}`}>{task.assignment}</Link></td>
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
    </div>
  );
};

export default StudentTasks;
