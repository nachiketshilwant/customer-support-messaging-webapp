import { Link } from "react-router-dom";

const TicketItemAgent = (props) => {
  return (
    <div className="mx-24 my-2">
      <div className="ticket grid-cols-3 grid justify-between gap-5 p-5 text-center bg-slate-100">
        <div>{new Date(props.ticket.createdAt).toLocaleString("en-US")}</div>
        <div className={`status bg-white w-[20%] mx-36 rounded-full`}>{props.ticket.status}</div>
        <Link to={`/ticketAgent/${props.ticket._id}`} className="btn bg-white w-[60%] border-[0.1rem]">
          View
        </Link>
      </div>
    </div>
  );
};

export default TicketItemAgent;
