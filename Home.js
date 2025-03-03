import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import Notes from './Notes';
import Alert from './Alert';

export const Home = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login'); // ✅ Redirect to login if token is missing
    }
  }, []);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1500);
  };

  return (
    <div>
      {/* Display Alert */}
      <Alert alert={alert} />

      {/* Pass showAlert function to Notes */}
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
