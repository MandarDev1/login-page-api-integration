import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    // Email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setMessage("Username cannot be empty");
      return;
    }

    if (!validateEmail(username)) {
      setMessage("Invalid email format");
      return;
    }

    if (!password || password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }

    setLoading(true); // Start loading spinner

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); // Stop loading spinner
        setMessage("Login successful!");
        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading spinner
        setMessage("Login failed!");
      });
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username (Email):</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="form-group remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMe}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          Login
        </button>

        {loading && <div className="spinner"></div>} {/* Moved spinner outside the button */}

        {message && <p className="message">{message}</p>}
        
      </form>
    </div>
  );
}

export default App;
