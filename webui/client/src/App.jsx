import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState([]);

  const fetchData = () => {
    return fetch("/api/admission/123")
          .then((response) => response.json())
          .then((data) => setMessage(data))
          .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
    <h1>Admission List</h1>
    <ul>
      {message && message.length > 0 && message.map((userObj) => (
          <li key={userObj.courseId}>{userObj.studentName}</li>
        ))}
    </ul>
    </div>
  );
}

export default App;