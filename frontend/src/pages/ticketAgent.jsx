import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import NoteItem from "../components/noteItem.jsx";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const TicketAgent = (props) => {
  const [ticket, setTicket] = useState();
  const [notes, setNotes] = useState([]); // Initialize notes as an empty array
  const { ticketId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");


  const getTicket = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tickets/all/${ticketId}`,
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
  //close ticket
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
      navigate("/ticketsall");
    }
  };

  //For Note Submit
  const onNoteSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `http://localhost:5000/api/tickets/${ticketId}/notes`,
      { text: noteText },
      {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      }
    );
    console.log(response)
    if (response.data) {
      closeModal();
    }
  };

  //Open/Close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="ticket-page mx-24 ">
      <Link
        to="/ticketsall"
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
      {ticket?.status != "closed" && (
        <button className="btn flex items-center mx-32 mt-2 bg-sky-600 px-4 rounded-3xl " onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
      <div className="flex justify-between  ">
        <h2 className=" text-xl font-medium ">Add Note</h2>
        <button className="btn-close font-bold text-xl" onClick={closeModal}>
          X
        </button>
      </div>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control border-[0.1rem] w-[90%] h-48"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group text-center">
            <button className="btn bg-green-600 px-8 py-1 rounded-full" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <></>
      )}

      <div className=" text-center ">
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

export default TicketAgent;
