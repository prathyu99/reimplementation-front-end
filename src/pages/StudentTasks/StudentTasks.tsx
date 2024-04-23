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
  reviewGrade: string | { comment: string };
  badges: string | boolean; // Assuming badges can be either a string or a boolean
  stageDeadline: string;
  publishingRights: boolean;
};


type Props = {};


const StudentTasks: React.FC = () => {
  const participantTasks = testData.participantTasks;

  const auth = useSelector((state: RootState) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const exampleDuties = testData.duties;
  const taskRevisions = testData.revisions;
  const studentsTeamedWith = testData.studentsTeamedWith;


  useEffect(() => {

    if (participantTasks) {
      const filteredParticipantTasks = participantTasks.filter(task => task.participant_id === 1);

      const mergedTasks = filteredParticipantTasks.map(task => {
        return {
          id: task.id,
          assignment: task.assignment,
          course: task.course,
          topic: task.topic || '-',
          currentStage: task.current_stage || 'Pending',
          reviewGrade: task.review_grade || 'N/A',
          badges: task.badges || '',
          stageDeadline: task.stage_deadline || 'No deadline',
          publishingRights: task.publishing_rights || false
        };
      });
      setTasks(mergedTasks);
    }
}, [participantTasks]);

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
                <td>{typeof task.reviewGrade === 'string' ? task.reviewGrade : task.reviewGrade.comment}</td>
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
    </div>

    {/* Footer Section Added */}
          <div className={styles.footer}>
            <Link to="https://wiki.expertiza.ncsu.edu/index.php/Expertiza_documentation" className={styles.footerLink}>Help</Link>
            <Link to="https://research.csc.ncsu.edu/efg/expertiza/papers" className={styles.footerLink}>Papers on Expertiza</Link>
          </div>
    </div>
  );
};

export default StudentTasks;