import { FC } from "react";

import { Modal } from "../index";

export interface ITimeSlot {
  minutes: number;
  timeFor: string;
}

type RentProps = {
  timeSlot: ITimeSlot;
  setTimeSlotForChatOrAudio: (minutes: number, timeFor: string) => void;
  startChatOrAudio: (callback?: () => void) => void;
};

const Rent: FC<RentProps> = ({
  timeSlot,
  setTimeSlotForChatOrAudio,
  startChatOrAudio,
}) => {
  const minutes = [
    {
      minutes: 5,
      price: 30,
    },
    { minutes: 10, price: 70 },
    {
      minutes: 15,
      price: 100,
    },
    {
      minutes: 20,
      price: 170,
    },
  ];

  const renderMinutesButtons = (timeFor: string) =>
    minutes.map((minute) => {
      const active = timeSlot.minutes === minute.minutes;
      const buttonStyle = active
        ? "text-white bg-primary-600"
        : "text-gray-800 bg-white border border-gray-300 hover:text-primary-600 hover:border-primary-500 active:bg-primary-600 active:text-white";

      return (
        <button
          type="button"
          onClick={() => setTimeSlotForChatOrAudio(minute.minutes, timeFor)}
          className={`${buttonStyle} px-4 py-2.5 w-full rounded text-sm transition-all duration-300 cursor-pointer`}
        >
          {minute.minutes} minutes for Buddy Coins {minute.price}
        </button>
      );
    });

  const renderRantModal = (rantModalFor: string) => {
    const isRantChat = rantModalFor === "chat";
    const title = isRantChat
      ? "Choose time slot for chat"
      : "Choose time slot for audio call";
    const saveBtnTitle = isRantChat ? "Start chat" : "Start audio call";

    const renderModalBody = () => (
      <>
        <p className="flex items-start gap-x-2.5 text-sm text-sky-500 font-medium mb-3.5">
          <svg
            fill="#0ea5e9"
            width="44px"
            height="44px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 416.979 416.979"
          >
            <g>
              <path
                d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
                                c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
                                c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
                                c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
                                c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"
              />
            </g>
          </svg>
          <span className="mt-2.5">
            Select the duration for your {rantModalFor} session. Once the chosen
            time is reached, the session will automatically close. This helps
            manage your time efficiently and ensures sessions stay within your
            preferred timeframe.
          </span>
        </p>

        <div className="flex items-center justify-center w-full gap-x-8 px-6 py-4 flex-wrap gap-3">
          {renderMinutesButtons(rantModalFor)}
        </div>
      </>
    );

    return (
      <Modal
        timeSlot={timeSlot}
        title={title}
        saveBtnTitle={saveBtnTitle}
        onSave={startChatOrAudio}
        modalBody={renderModalBody()}
        showButtonStyle={`border ${
          isRantChat
            ? "bg-primary-500 border-primary-600 hover:bg-primary-500 hover:border-primary-700"
            : "bg-primary-600 border-primary-600 hover:bg-primary-700 hover:border-primary-700"
        } px-10 font-medium text-lg text-white p-2 light-shadow capitalize rounded-lg cursor-pointer transition-all duration-300 focus:outline-none active:outline-none`}
      >
        <div
          id={rantModalFor}
          className="flex items-center justify-center gap-x-2"
        >
          {isRantChat ? (
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10.5H16"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M8 14H13.5"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
                stroke="#FFFFFF"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          ) : (
            <svg
              fill="#FFFFFF"
              height="22px"
              width="22px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 477 477"
            >
              <g>
                <g>
                  <path
                    strokeWidth="1.5"
                    d="M391.3,203.4c0-0.8,0-1.6,0-2.4c-0.1-7.5-6.3-13.4-13.7-13.3c-7.5,0.1-13.4,6.3-13.3,13.7c0,0.7,0,1.3,0,2
			c0,69.3-56.4,125.8-125.8,125.8s-125.8-56.4-125.8-125.8c0-1,0-1.9,0-2.9c0.2-7.5-5.7-13.6-13.2-13.8c-7.4-0.1-13.6,5.7-13.8,13.2
			c0,1.2,0,2.3,0,3.5c0,79.7,61.3,145.3,139.3,152.2V450h-55.5c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h138
			c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5H252v-94.5C329.9,348.7,391.3,283.1,391.3,203.4z"
                  />
                  <path
                    strokeWidth="1.5"
                    d="M237,295c49.9,0,90.5-40.6,90.5-90.5v-114C327.5,40.6,286.9,0,237,0s-90.5,40.6-90.5,90.5v114
			C146.5,254.4,187.1,295,237,295z M173.5,90.5c0-35,28.5-63.5,63.5-63.5s63.5,28.5,63.5,63.5v114c0,35-28.5,63.5-63.5,63.5
			s-63.5-28.5-63.5-63.5V90.5z"
                  />
                </g>
              </g>
            </svg>
          )}
          {rantModalFor}
        </div>
      </Modal>
    );
  };

  return (
    <section className="flex items-center gap-x-6">
      <div className="rant-chat">{renderRantModal("chat")}</div>
      <div className="rant-audio">{renderRantModal("audio")}</div>
    </section>
  );
};

export default Rent;
