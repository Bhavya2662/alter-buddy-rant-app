import { FC } from "react";
import { useAuthSlice } from "../../../app/features";

interface IMessage {
  text: string;
  clientId: string;
  date: string;
}

type MessagesListProps = {
  messages: IMessage[];
  remainingTime: string;
  leaveChannel: (e: any) => void;
};

const MessagesList: FC<MessagesListProps> = ({
  messages,
  remainingTime,
  leaveChannel,
}) => {
  const { token } = useAuthSlice();

  const renderMessages = messages.map((message, index) => {
    if (message.clientId === token) {
      return (
        <div key={message.clientId + index} className="chat-message right-side">
          <div className="flex flex-col gap-y-2 items-end justify-end">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                  <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-primary-600 text-white ">
                    {message.text}
                  </span>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt="My profile"
                className="w-6 h-6 rounded-full order-2"
              />
            </div>
            <p className="text-xs text-gray-500 font-light">{message.date}</p>
          </div>
        </div>
      );
    }

    return (
      <div key={message.clientId + index} className="chat-message left-side">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                  {message.text}
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
          <p className="text-xs text-gray-500 font-light">{message.date}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <span className="text-lg text-gray-600">Rant chat</span>
          </div>
        </div>

        <div className="text-primary-500 flex items-center gap-2.5 font-bold focus:outline-none">
          <svg
            className="fill-current"
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 501.333 501.333"
          >
            <g>
              <g>
                <path
                  d="M250.667,0C112,0,0,112,0,250.667s112,250.667,250.667,250.667s250.667-112,250.667-250.667S389.333,0,250.667,0z
            M250.667,459.733c-115.2,0-209.067-93.867-209.067-209.067S135.467,41.6,250.667,41.6s209.067,93.867,209.067,209.067
			S365.867,459.733,250.667,459.733z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M310.4,229.333H272V124.8c0-11.733-9.6-21.333-21.333-21.333c-11.733,0-21.333,9.6-21.333,21.333v125.867
			c0,11.733,9.6,21.333,21.333,21.333h58.667c11.733,0,22.4-9.6,22.4-21.333S322.134,229.333,310.4,229.333z"
                />
              </g>
            </g>
          </svg>
          Remaning Time :&nbsp; {remainingTime}
        </div>

        <button
          type="button"
          onClick={leaveChannel}
          className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-gray-500 bg-white hover:text-primary-500 focus:outline-none"
        >
          <span className="flex items-center gap-2.5 font-bold">
            <svg
              className="fill-current"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              id="_24x24_On_Light_Session-Leave"
              data-name="24x24/On Light/Session-Leave"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect id="view-box" width="24" height="24" fill="none" />
              <path
                id="Shape"
                d="M2.95,17.5A2.853,2.853,0,0,1,0,14.75v-12A2.854,2.854,0,0,1,2.95,0h8.8a.75.75,0,0,1,0,1.5H2.95A1.362,1.362,0,0,0,1.5,2.75v12A1.363,1.363,0,0,0,2.95,16h8.8a.75.75,0,0,1,0,1.5Zm9.269-4.219a.751.751,0,0,1,0-1.061L14.939,9.5H5.75a.75.75,0,0,1,0-1.5h9.19L12.219,5.28A.75.75,0,1,1,13.28,4.22l4,4a.749.749,0,0,1,0,1.06l-4,4a.751.751,0,0,1-1.061,0Z"
                transform="translate(3.25 3.25)"
              />
            </svg>
            Leave chat
          </span>
        </button>
      </div>

      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {renderMessages}
      </div>
    </>
  );
};

export default MessagesList;
