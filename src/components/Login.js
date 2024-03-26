import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import "../style/login.css"

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    console.log(input);
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div id="loginWrap">
      <form onSubmit={handleSubmitEvent}>
        <div className="form_control">
          <h2>Sign In</h2>
          <label htmlFor="user-email">Email:</label>
          <input
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        <div className="form_control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        <button className="btn-submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;