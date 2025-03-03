import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const Login = (props) => {  // Ensure showAlert is passed as props
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [notes, setNotes] = useState(null);
    const navigate = useNavigate(); // Use navigate instead of history

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        let data = await response.json();
        console.log("Full Response Data:", data); 
        if (data.success) {
            localStorage.setItem('token', data.authtoken);
            navigate("/"); // Use navigate instead of history.push
            props.showAlert("Logged in successfully", "success");  // Using props.showAlert
        } else {
            props.showAlert("Invalid details", "danger"); // Using props.showAlert
        }

        // Ensure the 'authtoken' is excluded before updating state
        const { authtoken, ...filteredData } = data; // Remove 'authtoken' from the data
        if (authtoken) {
            console.log("Auth Token:", authtoken); // Log token to console only
        }

        setNotes(filteredData); // Store only filtered response data
    };

    return (
        
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f4f4" }}>
           
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <h2 style={{ textAlign: "center" }}>Login</h2>
                {["email", "password"].map((field) => (
                    <input 
                        key={field} 
                        type={field} 
                        name={field} 
                        value={credentials[field]} 
                        onChange={(e) => setCredentials({ ...credentials, [field]: e.target.value })} 
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
                        required 
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} 
                    />
                ))}
                <button type="submit" style={{ padding: "10px", borderRadius: "5px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
                    Login
                </button>
                {notes && <pre style={{ fontSize: "12px", marginTop: "10px" }}>{JSON.stringify(notes, null, 2)}</pre>}
            </form>
        </div>
    );
};

export default Login;
