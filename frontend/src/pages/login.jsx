import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      userData
    );

    if (response.data) {
      //Setting to local Storage
      localStorage.setItem("user", JSON.stringify(response.data));
      props.setUser(response.data);
      if (response.data.isAgent == true) navigate("/ticketsall");
      else navigate("/");
    }
  };

  //   if (isLoading) {
  //     return <Spinner />;
  //   }

  return (
    <>
      <section className="heading flex flex-col items-center">
        <h1 className="flex flex-row text-5xl font-bold ">
          <FaSignInAlt /> Login
        </h1>
        <p className="text-2xl">Please login to get support</p>
      </section>

      <section className="form">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center m-10"
        >
          <div className="form-group m-4">
            <input
              type="email"
              className="form-control border-[0.1rem] p-1 w-96"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control border-[0.1rem] p-1 w-96"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn bg-[#000] text-white w-48 p-2 rounded-full">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
