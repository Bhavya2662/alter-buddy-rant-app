import {
  BackgroundFiltersProvider,
  CallControls,
  OwnCapability,
  PaginatedGridLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { useAuthSlice } from "../../app/features";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

export const AudioCallFeature = ({ token }: { token: string }) => {
  const { user } = useAuthSlice();
  const [featureUser, setFeatureUser] = useState<string>();

  useEffect(() => {
    if (user) {
      setFeatureUser(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (call.currentUserId) {
      (async () => {
        await call.revokePermissions(call.currentUserId as string, [
          OwnCapability.STOP_RECORD_CALL,
          OwnCapability.SCREENSHARE,
          OwnCapability.SEND_VIDEO,
        ]);
      })();
    }
  });

  const client = new StreamVideoClient({
    apiKey: "n9y75xde4yk4",
    user: {
      id: featureUser as string,
      name: "Anonymous",
    },
    token: token,
  });
  const call = client.call("audio_room", v4());
  if (!call) {
    return (
      <div className="center-column">
        <h2>Could not find the room</h2>
        <Link to="/rooms">Return to rooms overview</Link>
      </div>
    );
  }
  call.join({
    create: true,
    data: {
      members: [],
      custom: {
        title: "AlterBuddy App",
      },
    },
  });

  return (
    <div>
      {client && featureUser && (
        <StreamVideo client={client}>
          <StreamTheme color="light" as="main" className="w-[60%] border">
            <StreamCall call={call}>
              <BackgroundFiltersProvider
                backgroundFilter="blur" // initial filter
                backgroundImages={[
                  "https://images.pexels.com/photos/134065/pexels-photo-134065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                ]}
              >
                <PaginatedGridLayout />
                <CallControls
                  onLeave={() => {
                    window.location.replace(`https://alterbuddy.com`);
                  }}
                />
              </BackgroundFiltersProvider>
            </StreamCall>
          </StreamTheme>
        </StreamVideo>
      )}
    </div>
  );
};
