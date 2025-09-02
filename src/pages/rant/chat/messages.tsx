import { FC, useState, useCallback, useEffect } from "react";
import { useChannel, usePresence } from "ably/react";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";

import { ChatModule } from "../../../components";
import getInitialTime from "../../../utils/getInitialTime";
import getRemainingTime from "../../../utils/getRemainingTime";

interface MessagesProps {}

const Messages: FC<MessagesProps> = () => {
  const [urlSearchParams] = useSearchParams();
  const endAt = urlSearchParams.get("endAt");
  const roomId = urlSearchParams.get("roomId");

  const socket = io("https://backend.alterbuddy.com");

  const initialTime = getInitialTime(endAt as string);
  const channelName = `rant-chat-${roomId}`;

  const [messages, setMessages] = useState<
    Array<{ text: string; clientId: string; date: string }>
  >([]);
  const [message, setMessage] = useState<string>("");
  const { channel, publish } = useChannel(channelName, "messageName");
  const { updateStatus } = usePresence(channelName);
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  const sendMessage = useCallback(
    (e: any) => {
      e.preventDefault();

      try {
        publish("message", { text: message }).catch((err) => {
          console.error("Publish failed:", err);
        });
        updateStatus(message);
        setMessage("");
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    },
    [publish, message, updateStatus]
  );

  const leaveChannel = useCallback(
    (e?: any) => {
      if (e) {
        e.preventDefault();
      }

      channel.presence.leave();
      localStorage.removeItem("endRantChatOrAudioAt");
      localStorage.removeItem("timeLeft");
      localStorage.removeItem("chatRequestData");

      socket.emit("leaveChat", { roomId }, () => {
        console.log("Left the chat");
        window.location.replace("https://alterbuddy.com/");
      });
    },
    [channel, roomId, socket]
  );

  setInterval(() => {
    // Retrieve the stored date from local storage
    let storedDate = localStorage.getItem("endRantChatOrAudioAt");

    if (!storedDate && endAt) {
      // Set the end date in local storage
      localStorage.setItem("endRantChatOrAudioAt", JSON.stringify(endAt));
      storedDate = endAt;
    }

    if (storedDate) {
      // Convert the stored date to a timestamp
      const storedTimestamp = moment(
        !endAt ? JSON.parse(storedDate) : storedDate
      ).unix();

      // Get the current date and convert it to a timestamp
      const currentTimestamp = moment().unix();

      // Compare the timestamps
      if (storedTimestamp <= currentTimestamp) {
        console.log("Time is up!");
        // If the stored date is less than the current date, execute the function
        leaveChannel();
      }
    }
  }, 1000); // Check every 1 seconds (1000 milliseconds)

  useEffect(() => {
    // If the timeLeft is 0, stop the timer
    if (timeLeft === 0) return;

    // Set up the interval to decrease timeLeft by 1 every second
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const updatedTime = prevTimeLeft - 1;

        // Update the remaining time in localStorage
        localStorage.setItem("timeLeft", JSON.stringify(updatedTime));

        return updatedTime;
      });
    }, 1000);

    // Clear the interval on component unmount or re-render
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Listen for new messages and update the message list
  useEffect(() => {
    const messageHandler = (msg: any) => {
      const newMessage = {
        text: msg.data.text,
        clientId: msg.clientId,
        date: moment(msg.timestamp).format("DD-MM-YYYY hh:mm A"),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    channel.subscribe("message", messageHandler);

    return () => {
      // Unsubscribe from the channel
      channel.unsubscribe("message", messageHandler);

      // Close the Ably connection
      // ably.connection.close();
    };
  }, [channel, setMessages, message, setMessage, messages]);

  socket.on("chatLeft", (data) => {
    console.log("Chat was left by another app:", data);

    if (data.roomId === roomId) {
      window.location.replace("https://alterbuddy.com/");
    }
  });

  const remainingTime = getRemainingTime(timeLeft);

  return (
    <ChatModule
      messages={messages}
      sendMessage={sendMessage}
      message={message}
      setMessage={setMessage}
      remainingTime={remainingTime}
      leaveChannel={leaveChannel}
    />
  );
};

export default Messages;
