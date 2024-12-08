import { Cancel, Room } from "@mui/icons-material";  // Updated imports
import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("https://inn-travelpin-aryanbhoi.onrender.com/api/user/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>Inn TravelPin</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="Username" ref={usernameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="Password"
          ref={passwordRef}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {success && (
          <span className="success"><h2>Successful. You can login now!</h2></span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
