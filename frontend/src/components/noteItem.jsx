const NoteItem = (props) => {
  return (
    <div
      className="note relative mx-32 bg-slate-200 rounded-lg"
    >
      <h4 className=" text-xl m-2 ">
        Message from {props.note.agentName?<span className="bg-slate-100 rounded-full">{props.note.agentName}</span>: <span className="bg-slate-100 px-4 rounded-full">Staff</span>}
      </h4>
      <p className=" font-medium text-2xl m-2 ">{props.note.text}</p>
      <div className="note-date text-xl m-2">
        {new Date(props.note.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
};

export default NoteItem;
