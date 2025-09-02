import { FC, useEffect } from "react";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { useSearchParams } from "react-router-dom";

import { saveUser, useAuthSlice } from "../../../app/features";
import { useAppDispatch } from "../../../app/store";
import ablyConfig from "../../../config/ablyConfig";

import { Loader } from "../../../components";
import Messages from "./messages";

const ChatPage: FC = () => {
    const [urlSearchParams] = useSearchParams();
    const appToken = urlSearchParams.get('appToken');
    const mentorToken = urlSearchParams.get('mentorToken');
    const roomId = urlSearchParams.get('roomId');
    const { token } = useAuthSlice();
    const dispatch = useAppDispatch();
    const channelName = `rant-chat-${roomId}`;

    useEffect(() => {
        if (appToken || mentorToken) {
            dispatch(saveUser((appToken || mentorToken) as string));
            urlSearchParams.delete('appToken');
            urlSearchParams.delete('mentorToken');
        }
    }, [token, appToken, mentorToken, dispatch, urlSearchParams]);

    ablyConfig.clientId = token as string;

    const ablyClient = new Ably.Realtime(ablyConfig);
    ablyClient.auth.authorize();

    if (!ablyClient || !roomId) {
        return <Loader />;
    }

    return (
        <AblyProvider client={ablyClient}>
            <ChannelProvider channelName={channelName}>
                <Messages />
            </ChannelProvider>
        </AblyProvider>
    );
};

export default ChatPage;
