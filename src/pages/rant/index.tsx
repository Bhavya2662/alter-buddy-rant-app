import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch } from "../../app/store";
import { saveUser, saveUserProfile, useAuthSlice } from "../../app/features";
import { useLazyUserProfileQuery } from "../../app/api";
import { IUserProps } from "../../interface";
import { RentModule, Loader } from "../../components";

interface ITimeSlot {
  minutes: number;
  timeFor: string;
}

const initialTimeSlot: ITimeSlot = {
  minutes: 0,
  timeFor: "",
};

export const RantPage = () => {
  const [urlSearchParams] = useSearchParams();
  const urlToken = urlSearchParams.get("appToken");
  const { token, user } = useAuthSlice();
  const dispatch = useAppDispatch();
  const [GetProfile, { isError, error, data }] = useLazyUserProfileQuery();
  const [timeSlot, setTimeSlot] = useState<ITimeSlot>(initialTimeSlot);
  const [loader, setLoader] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(true);

  useEffect(() => {
    if (!token) {
      window.location.replace("https://alterbuddy.com");
    }
  }, [token]);

  const socket = io(process.env.REACT_APP_SOCKET_SERVER!);

  /** This function sets the time slot for rant chat or audio
   * @function
   *
   * @param {number} minutes - The number of minutes for the rant chat or audio
   * @param {string} timeFor - The type of rant chat or audio
   */
  const setTimeSlotForChatOrAudio = (minutes: number, timeFor: string) => {
    setTimeSlot({ minutes, timeFor });
  };

  const startChatOrAudio = (callback?: () => void) => {
    const roomId = uuidv4();
    setAccepted(false);

    const localStorageKey = "endRantChatOrAudioAt";

    const now = moment();
    const end = moment(now.add(timeSlot.minutes, "minutes")).toISOString();

    // Set timing for rant chat or audio
    localStorage.setItem(localStorageKey, JSON.stringify(end));

    // Save timeLeft to localStorage
    localStorage.setItem("timeLeft", JSON.stringify(timeSlot.minutes * 60));

    socket.emit("requestChat", {
      roomId,
      endAt: end,
      requestType: timeSlot.timeFor,
    });
    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    setLoader(true);

    if (isError) {
      console.log(error);
      return;
    }

    if (token) {
      (async () => {
        await GetProfile();
        dispatch(saveUserProfile(data?.data as IUserProps));
        setLoader(false);
      })();
    }
  }, [token, GetProfile, data?.data, dispatch, isError, error]);

  useEffect(() => {
    if (urlToken) {
      dispatch(saveUser(urlToken as string));
      urlSearchParams.delete("appToken");
    }
  }, [urlToken, dispatch, urlSearchParams]);

  useEffect(() => {
    socket.on("chatAccepted", (data) => {
      if (data.accepted) {
        // Redirect to chat or audio page
        const redirectUrl =
          timeSlot.timeFor === "chat" ? "/rant/chat" : "/rant/audio";
        window.location.replace(redirectUrl + `?roomId=${data.roomId}`);
      }
    });

    return () => {
      socket.off("chatAccepted");
    };
  }, [socket, timeSlot.timeFor, timeSlot.minutes]);

  if (!data || !user || !user?._id || loader || !accepted) {
    return (
      <Loader
        text={
          !accepted ? "Please wait, while we are assign a mentor to you..." : ""
        }
      />
    );
  }

  return (
    <section className="py-20 flex flex-col justify-center items-start relative overflow-hidden border-2 border-red-500">
      <div className="container xl:w-[80%] mx-auto">
        <h1 className="text-6xl text-gray-800 font-semibold tracking-wide mb-6">
          Welcome to rant head,{" "}
          <span className="capitalize">
            {user?.name.firstName} {user?.name.lastName}
          </span>
        </h1>

        <p className="text-lg text-gray-500 mb-20 w-2/3 tracking-wide leading-8 font-light">
          This feature is have some limted time resources so 5, 10 ,15 mins, and
          in this feature you and mentor both will be anonymous and please do
          not share personal detials for safty purposes. Rant is provided audio
          &chat plateform please select the one you are most comfortable in.
          select the number of rant limit. now set back & get started with
          anything you wish to rant about.
        </p>

        <RentModule
          timeSlot={timeSlot}
          setTimeSlotForChatOrAudio={setTimeSlotForChatOrAudio}
          startChatOrAudio={startChatOrAudio}
        />
      </div>
    </section>
  );
};
