import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const NewTicket = (props) => {
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming that props.user contains the user information, you can pass it in the request payload
      const response = await axios.post(
        "http://localhost:5000/api/tickets/",
        {
          message,
          user: props.user,
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );

      if (response.data) {
        console.log("Ticket created successfully:", response.data);
        navigate("/");
      } else {
        console.error("Failed to create ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error.message);
    }
  };

  return (
    <>
      <Link
        to="/"
        className="btn flex items-center border-[0.1rem] w-40 justify-center m-10"
      >
        <FaArrowCircleLeft /> Back
      </Link>
      <section className="heading flex flex-col items-center">
        <h1 className="text-5xl font-bold">Create New Ticket</h1>
        <p className="text-2xl">Fill out the form below</p>
      </section>

      <section className="form">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center m-10"
        >
          <div className="form-group flex flex-col">
            <label htmlFor="message" className="text-2xl">
              Message of the issue
            </label>
            <textarea
              name="message"
              id="message"
              className="form-control border-[0.1rem] p-1 w-[50rem] h-[10rem]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn bg-[#000] px-7 py-2 rounded-full text-white m-3">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
