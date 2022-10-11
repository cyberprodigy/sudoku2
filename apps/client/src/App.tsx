import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import ListRoomsActivity from "./activities/listRooms/components/ListRoomsActivity";
import LoginActivity from "./activities/login/components/LoginActivity";
import MenuActivity from "./activities/menu/MenuActivity";
import MultiPlayActivity from "./activities/play/components/MultiPlayActivity";
import PlayActivity from "./activities/play/components/PlayActivity";
import SettingsActivity from "./activities/settings/components/SettingsActivity";
import WaitForOpponentActivity from "./activities/waitForOpponent/WaitForOpponentActivity";
import CreateSinglePlayerRoomActivity from "./activities/createRoom/components/CreateSinglePlayerRoomActivity";
import "./App.css";
import buildTheme from "./theme/Theme";

const theme = buildTheme();
const Container = styled.div`
  text-align: center;
`;
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Switch>
            <Route path="/play/:boardId">
              <PlayActivity />
            </Route>
            <Route path="/multi-play/:boardId">
              <MultiPlayActivity />
            </Route>
            <Route path="/list-rooms">
              <ListRoomsActivity />
            </Route>
            <Route path="/wait-for-opponent">
              <WaitForOpponentActivity />
            </Route>
            <Route path="/menu">
              <MenuActivity />
            </Route>
            <Route path="/settings">
              <SettingsActivity />
            </Route>
            <Route path="/create-single-room">
              <CreateSinglePlayerRoomActivity />
            </Route>
            <Route path="/">
              <LoginActivity />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
