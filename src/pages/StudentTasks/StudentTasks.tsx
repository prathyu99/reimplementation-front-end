import React, { useState } from 'react';
import styles from './StudentTasks.module.css';

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
  // Initial tasks state
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
          assignment: 'Program 1',
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
              <td>{task.assignment}</td>
              <td>{task.course}</td>
              <td>{task.topic}</td>
              <td>{task.currentStage}</td>
              <td>{task.reviewGrade}</td>
              <td>{task.badges}</td>
              <td>{task.stageDeadline}</td>
              <td>
                <input type="checkbox" checked={task.publishingRights} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTasks;
