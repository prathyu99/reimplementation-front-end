import React from 'react';
import styles from './StudentTasksBox.module.css'; // Make sure the path to your CSS module is correct

// Define the types for each prop
 type Duty = {
    name: string;
    dueDate: string;
  };
  
  type Revision = {
    // Your Revision type properties
  };
  
  type StudentsTeamedWith = {
    [semester: string]: string[];
  };
  
  interface StudentTasksBoxProps {
    duties: Duty[];
    revisions: Revision[];
    studentsTeamedWith: StudentsTeamedWith;
  }
  
  const StudentTasksBox: React.FC<StudentTasksBoxProps> = ({ duties, revisions, studentsTeamedWith }) => {

    let totalStudents = 0;
    for (const semester in studentsTeamedWith) {
        totalStudents += studentsTeamedWith[semester].length;
    }

  // Function to calculate the number of days left until the due date
  const calculateDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  // Find the duties that have not started yet based on the due date
  const tasksNotStarted = duties.filter(duty => calculateDaysLeft(duty.dueDate) > 0);

  return (
    <div className={styles.taskbox}>
        <div className={styles.section}>
          <span className={styles.badge}>0</span>
        <strong>Tasks not yet started</strong>
        </div>

    {/* Revisions section (remains empty since revisions array is empty) */}
      <div className={styles.section}>
      <span className={styles.greyBadge}>{tasksNotStarted.length}</span>
        <strong>Revisions</strong>
        {tasksNotStarted.map((task, index) => {
                const daysLeft = calculateDaysLeft(task.dueDate);
                return (
                  <div key={index}>
                    &raquo; {task.name} ({daysLeft} day{daysLeft !== 1 ? 's' : ''} left)
                  </div>
                );
              })}
      </div>


      {/* Students who have teamed with you section */}
      <div className={styles.section}>
            <span className={styles.greyBadge}>{totalStudents}</span>
        <strong>Students who have teamed with you</strong>
      </div>
      {Object.entries(studentsTeamedWith).map(([semester, students], index) => (
        <div key={index}>
          <strong>{semester}</strong>
          <span className="badge">{students.length}</span>
          {students.map((student, studentIndex) => (
            <div key={studentIndex}>
              &raquo; {student}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StudentTasksBox;
