import { Route } from "react-router-dom";
import { AppProvider } from "./provider";
import { HomePage, RantPage, ChatPage } from "./pages";
import { Layout } from "./layout";
import { AudioRoomModule } from "./component/rant/audio";

export default function App() {
  return (
    <AppProvider>
      <Route element={<Layout />}>
        <Route path="/:userId" Component={HomePage} />
        <Route path="/rant" Component={RantPage} />
        <Route path="/rant/chat" Component={ChatPage} />
        <Route path="/rant/audio" Component={AudioRoomModule} />
      </Route>
    </AppProvider>
  );
}
