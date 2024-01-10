import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store/hooks";
import { socket } from "../../socket";
// const testData = [
//   {
//     username: "imranovazer",
//     text: "Salam",
//   },
//   {
//     username: "ehmed",
//     text: "Necesen",
//   },
// ];
const Messages = () => {
  const myUserdata = useAppSelector((state) => state.user.user);
  const [messages, setMessages] = useState([]);

  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const handleReceiveMessage = (val: any) => {
      // console.log("Received from socket", val);
      setMessages((prevState) => [...prevState, val]);
    };
    socket.on("messageResponse", handleReceiveMessage);
    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("messageResponse", handleReceiveMessage);
    };
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("sendMessage", {
      username: myUserdata.username,
      text: userInput,
    });

    setUserInput("");
  };

  return (
    <div className="container mx-auto flex h-full">
      <nav className="left flex flex-col border-1 w-full max-w-[300px] p-5 border-r">
        <div className="flex items-center gap-5 border border-slate-400  p-2">
          <img
            className="w-[50px] rounded-full"
            src={`${import.meta.env.VITE_USER_IMG + myUserdata.photo}`}
            alt="profile photo"
          />
          <p>{myUserdata.username}</p>
        </div>
      </nav>
      <div className="right h-full flex flex-col  justify-between p-5 w-full">
        <ul className="w-full flex flex-col gap-5 overflow-y-auto p-5">
          {messages &&
            messages.map((item) => (
              <li
                className={`w-fit  p-3 text-white max-w-[400px]  rounded-lg ${
                  item.username === myUserdata.username
                    ? "self-end bg-blue-500 "
                    : "bg-gray-500 "
                } `}
              >
                {item.text}
              </li>
            ))}
        </ul>

        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="resize-none	p-1 border rounded-lg w-full"
            name="userintput"
            // cols={30}
            placeholder="Start typing..."
          ></input>
          <button className="bg-blue-500  p-3 rounded-xl text-white">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
