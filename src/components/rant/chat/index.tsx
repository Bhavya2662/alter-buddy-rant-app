import { FC } from "react";

import MessagesList from "./messagesList";

interface IMessage {
  text: string;
  clientId: string;
  date: string;
}

type ChatProps = {
  messages: IMessage[];
  sendMessage: (e: any) => void;
  setMessage: (msg: string) => void;
  message: string;
  remainingTime: string;
  leaveChannel: (e: any) => void;
};

const Chat: FC<ChatProps> = ({
  messages,
  sendMessage,
  setMessage,
  message,
  remainingTime,
  leaveChannel,
}) => {
  return (
    <div className="flex-1 mt-[100px] p:2 sm:p-6 justify-between flex flex-col h-screen overflow-hidden animate__animated animate__fadeIn">
      <MessagesList
        messages={messages}
        remainingTime={remainingTime}
        leaveChannel={leaveChannel}
      />

      <form onSubmit={sendMessage}>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Write your message!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
              required
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-r-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-primary-500 hover:bg-primary-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
