import React from "react";

export const HomePage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center flex-col w-[50%] border-2 border-primary-500">
        <input type="text" className="focus:outline-none border w-full" />
        <button className="bg-primary-500 px-5 py-2 rounded-md text-white">
          Sign In
        </button>
      </div>
    </div>
  );
};
