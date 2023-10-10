import { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import TicketItemAgent from "../components/TicketItemAgent";
import axios from "axios";

const TicketsAgent = (props) => {
    const [tickets,setTickets] = useState()
  const getdata = async () => {
    try {
      // Assuming that props.user contains the user information, you can pass it in the request payload
      const response = await axios.get("http://localhost:5000/api/tickets/all", {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });

      if (response.data) {
        console.log("Ticket created successfully:", response.data);
        response.data.reverse();
        setTickets(response.data)

      } else {
        console.error("Failed to create ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error.message);
    }
  };

  useEffect(()=>{
    getdata()
  },[])

  return (
    <>
      <Link
        to="/ticketsall"
        className="btn flex items-center border-[0.1rem] w-40 justify-center m-10"
      >
        refresh
      </Link>
      <h1 className=" text-center text-4xl font-bold mb-4">Tickets</h1>
      <div className="tickets flex flex-col">
        <div className="ticket-headings grid-cols-3 grid justify-between gap-5 p-5 text-center bg-slate-200 mx-24">
          <div className=" text-xl ">Date</div>
          <div className="text-xl">Status</div>
          <div></div>
        </div>
        {tickets ?tickets.map((ticket) => (<TicketItemAgent key={ticket._id} ticket={ticket} user={props.user} />)):<></>}
      </div>
    </>
  );
};

export default TicketsAgent;
