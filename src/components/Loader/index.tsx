import React, { FC } from 'react';

type LoaderProps = {
  text?: string;
};


const Loader: FC<LoaderProps> = ({ text }) => {
  return (
    <>
      <div className="h-screen bg-white">
        <div className="flex flex-col justify-center items-center h-full">
          <span className="loader"></span>

          {text && (
            <p className="mt-16 font-medium text-lg text-primary-500">{text}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Loader;
