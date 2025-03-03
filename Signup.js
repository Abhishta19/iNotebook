import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const onChange = (e) => setCredentials({ ...credentials, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    let data = await response.json();
    console.log("Full Response Data:", data);
    if (data.success) {
      localStorage.setItem('token', data.authtoken);
      navigate("/");
      props.showAlert("Successfully create your Account","success")
    } else {

    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label htmlFor="name">Name</label><input type="text" className="form-control" id="name" placeholder="Enter name" value={credentials.name} onChange={onChange}  name="name" required /></div>
        <div className="form-group"><label htmlFor="email">Email</label><input type="email" className="form-control" id="email" placeholder="Enter email" value={credentials.email} onChange={onChange} email="email" required /></div>
        <div className="form-group"><label htmlFor="password">Password</label><input type="password" className="form-control" id="password" placeholder="Password" value={credentials.password} onChange={onChange} name="password" minLength={5} required /></div>
        <div className="form-group"><label htmlFor="cpassword">Confirm Password</label><input type="password" className="form-control" id="cpassword" placeholder="Confirm Password" value={credentials.cpassword} onChange={onChange} minLength={5} name="cpassword" required /></div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
