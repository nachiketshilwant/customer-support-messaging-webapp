import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NoteItem from "../components/noteItem.jsx";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Ticket = (props) => {
  const [ticket, setTicket] = useState();
  const [notes, setNotes] = useState([]); // Initialize notes as an empty array
  const { ticketId } = useParams();

  const getTicket = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tickets/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );

      if (response.data) {
        console.log("Ticket successfully fetched:", response.data);
        setTicket(response.data);
      } else {
        console.error("Failed to fetch ticket");
      }
    } catch (error) {
      console.error("Error fetching ticket", error.message);
    }
  };

  const getNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tickets/${ticketId}/notes/`,
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );

      if (response.data) {
        console.log("Notes successfully fetched:", response.data);
        setNotes(response.data);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes", error.message);
    }
  };

  useEffect(() => {
    getTicket();
    getNotes();
  }, [ticketId]); // Add ticketId as a dependency to fetch data when it changes

  const navigate = useNavigate();

  //Deleting the Ticket
  const handleClickDlt = async () => {
    const response = await axios.delete(
      `http://localhost:5000/api/tickets/${ticketId}`,
      {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      }
    );
    if(response.data.success){
      navigate("/tickets")
    }
  };

  //update the code by closing ticket
  const handleClick = async () => {
    const response = await axios.put(
      `http://localhost:5000/api/tickets/${ticketId}`,
      { status: "closed" },
      {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      }
    );
    if (response.data) {
      navigate("/tickets");
    }
  };

  return (
    <div className="ticket-page mx-24 ">
      <Link
        to="/tickets"
        className="btn flex items-center border-[0.1rem] w-40 justify-center m-10"
      >
        <FaArrowCircleLeft /> Back
      </Link>
      <header className="ticket-header mx-24">
        <h2 className=" font-medium text-xl my-4 ">
          Ticket ID: {ticket?._id}
          <span className="status bg-slate-200 rounded-full ml-4 px-2">
            {ticket?.status}
          </span>
        </h2>
        <h3 className=" text-lg my-4 ">
          Date Submitted: {new Date(ticket?.createdAt).toLocaleString("en-US")}
        </h3>
        <hr className="text-[#000] " />
        <div className="ticket-desc my-5 text-base bg-slate-200 p-4 rounded-md ">
          <h3 className="text-xl">Message about the issue : </h3>
          <p className="text-2xl">{ticket?.message}</p>
        </div>
        <h2 className="text-3xl">Notes</h2>
      </header>

      {notes ? (
        notes.map((note) => (
          <NoteItem key={note._id} note={note} user={props.user} />
        ))
      ) : (
        <></>
      )}

      <div className=" text-center ">
        <button
          onClick={handleClickDlt}
          className="btn bg-slate-950 rounded-full p-1 mx-4 text-white"
        >
          Delete Ticket
        </button>
        {ticket?.status !== "closed" && (
          <button
            onClick={handleClick}
            className="btn bg-red-600 rounded-full p-1 mx-4 text-white"
          >
            Close Ticket
          </button>
        )}
      </div>
    </div>
  );
};

export default Ticket;
