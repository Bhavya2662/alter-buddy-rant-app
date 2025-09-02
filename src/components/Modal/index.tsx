import React, { FC, useState, MouseEvent } from "react";
import Modal from "react-modal";
import { ITimeSlot } from "../rant";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  modalBody: React.ReactNode;
  modalWidth?: string;
  showButtonStyle?: string;
  saveBtnTitle?: string;
  closeBtnTitle?: string;
  onSave: (callback?: () => void) => void;
  timeSlot: ITimeSlot;
};

const CustomModal: FC<ModalProps> = ({
  title,
  children,
  modalBody,
  modalWidth,
  showButtonStyle,
  saveBtnTitle,
  closeBtnTitle,
  onSave,
  timeSlot,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const handleOnSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onSave(() => {
      setShow(false);
    });
  };

  const handleOnShow = () => {
    setShow(true);
  };

  const handdleOnClose = () => {
    setShow(false);
  };

  let modalStyle =
    "overflow-y-auto overflow-x-hidden z-50 flex flex-col items-center w-1/3 max-h-full h-[calc(100%-1rem)] inset-0 rounded-lg py-4 animate__animated animate__fadeInDown --animate-delay focus:outline-none ";

  if (modalWidth) {
    modalStyle = modalStyle.replace("w-1/3", modalWidth);
  }

  return (
    <>
      <button
        type="button"
        className={
          showButtonStyle ||
          "bg-primary-600 font-medium text-base text-white p-2 px-8 border border-primary-600 rounded-full hover:bg-primary-700 hover:border-primary-700 focus:ring transition-all duration-300 whitespace-nowrap"
        }
        onClick={handleOnShow}
      >
        {children}
      </button>

      <Modal
        isOpen={show}
        onRequestClose={handdleOnClose}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before",
        }}
        className={`${modalStyle} ${{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before",
        }}`}
      >
        <section className="bg-white rounded-lg w-full">
          <header className="flex items-center justify-between gap-x-3.5 w-full bg-white py-3.5 px-4 rounded-t-lg">
            <h1 className="text-lg font-medium text-gray-900">{title}</h1>
            <button
              onClick={handdleOnClose}
              className="flex items-center justify-center transition-colors bg-gray-100 hover:bg-primary-100 hover:text-primary-600 focus:ring focus-ring-primary-500 focus:outline-none active:outline-none w-8 h-8 rounded-full pl-0.5 pt-10.5 pr-0.5 duration-300"
            >
              <svg
                className="fill-current"
                width="16"
                height="16"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </button>
          </header>

          <main className="w-full bg-white py-3.5 px-8">{modalBody}</main>

          <footer className="flex items-center justify-end gap-x-3.5 w-full bg-white py-3.5 px-4 rounded-b-lg">
            <button
              onClick={handdleOnClose}
              className="bg-white font-medium text-base text-gray-600 border border-gray-200 p-2 px-8 rounded-full hover:bg-gray-200 focus:outline-none focus:ring transition-all duration-300 whitespace-nowrap"
            >
              {closeBtnTitle || "Close"}
            </button>
            <button
              disabled={timeSlot.minutes === 0}
              onClick={handleOnSave}
              className="bg-primary-600 disabled:bg-gray-500 disabled:border-transparent font-medium text-base text-white p-2 px-8 border border-primary-600 rounded-full hover:bg-primary-700 hover:border-primary-700 focus:ring transition-all duration-300 whitespace-nowrap"
            >
              {saveBtnTitle || "Save"}
            </button>
          </footer>
        </section>
      </Modal>
    </>
  );
};

export default CustomModal;
