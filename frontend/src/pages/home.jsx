import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <section className=" text-3xl text-center mb-5 ">
        <h1>What do you need help with?</h1>
        <p className=" text-slate-600 ">Please choose from an option below</p>
      </section>
      <div className="flex flex-col items-center">
        <Link to="/new-ticket">
          <p className="flex border-[0.1rem] w-[50rem] items-center justify-center my-6 p-4 border-slate-950 ">
            <FaQuestionCircle />
            Create New Ticket
          </p>
        </Link>
        <Link to="/tickets" className="btn btn-block">
          <p className="flex border-[0.1rem] w-[50rem] items-center justify-center my-6 p-4 border-slate-950 ">
            <FaTicketAlt />
            View My Tickets
          </p>
        </Link>
      </div>
    </>
  );
};

export default Home;
