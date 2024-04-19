import React from 'react';
import { useParams } from 'react-router-dom';

const StudentTaskDetail: React.FC = () => {
  const { id } = useParams(); // This hook allows you to grab the ID from the URL

  return (
    <div>
      <h2>Assignment Title: {id}</h2>
      {/* Additional details about the assignment could be fetched and displayed here */}
    </div>
  );
};

export default StudentTaskDetail;