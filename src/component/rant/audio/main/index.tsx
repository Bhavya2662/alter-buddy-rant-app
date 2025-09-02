import { useEffect, useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useLazyGetGetStreamTokenQuery } from "../../../../app/api";
import { useAuthSlice } from "../../../../app/features";
import { AudioCallFeature } from "../../../audio-call";

export const AudioRoomModule = () => {
  const { token: appToken, user } = useAuthSlice();
  const [GetToken, { isError, error, data, isSuccess }] =
    useLazyGetGetStreamTokenQuery();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (appToken) {
      (async () => {
        await GetToken();
      })();
    }
  }, [appToken, GetToken]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      setToken(data?.data);
    }
  }, [isSuccess, data?.data]);

  return (
    <div className="w-full h-screen border flex justify-center items-center">
      {token && user ? (
        <AudioCallFeature token={token} />
      ) : (
        <p>Token not initialized</p>
      )}
    </div>
  );
};
