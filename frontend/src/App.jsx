import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import PrivateRoute from "./components/privateRoute";
import Home from "./pages/home";
import Login from "./pages/login";
import { useState } from "react";
import NewTicket from "./pages/newTicket";
import Register from "./pages/register";
import Ticket from "./pages/ticket";
import Tickets from "./pages/tickets";
import TicketsAgent from "./pages/ticketsAgent";
import TicketAgent from "./pages/ticketAgent";

function App() {
  const [user,setUser]=useState();
  return (
    <>
      <Router>
        <div className=" min-w-full ">
          <Header user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/new-ticket" element={<PrivateRoute user={user} />}>
              <Route path="/new-ticket" element={<NewTicket user={user} />} />
            </Route>
            <Route path="/tickets" element={<PrivateRoute user={user} />}>
              <Route path="/tickets" element={<Tickets user={user} />} />
            </Route>
            <Route path="/ticket/:ticketId" element={<PrivateRoute user={user} />}>
              <Route path="/ticket/:ticketId" element={<Ticket user={user} />} />
            </Route>
            <Route path="/ticketsall" element={<PrivateRoute user={user} />}>
              <Route path="/ticketsall" element={<TicketsAgent user={user} />} />
            </Route>
            <Route path="/ticketagent/:ticketId" element={<PrivateRoute user={user} />}>
              <Route path="/ticketagent/:ticketId" element={<TicketAgent user={user} />} />
            </Route>
          </Routes>
        </div>
      </Router>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
