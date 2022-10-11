import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "../../../models/Nouns";
import netSocket from "../../../utils/NetworkSocket";

const List = styled.ul`
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  list-style: none;
  padding: 12px;
  margin: 0;
  background-color: #fff;
  font-size: 16px;
  display: flex;
  border-bottom: 1px solid #ccc;
`;

const RoomDifficulty = styled.div`
  flex: 1;
  margin: 0 12px 0 0;
  align-self: center;
`;

const RoomNameContainer = styled.div`
  flex: 3;
  text-align: left;
  align-self: center;

  font-weight: normal;
`;
const RoomNameTitle = styled.h2`
  font-weight: 500;
  font-size: 21px;
  margin: 0;
`;

const RoomNameSubTitle = styled.h3`
  font-size: 12px;
  margin: 5px 0;
  font-weight: normal;
  color: #666;
`;

const EnterIcon = styled.div`
  flex: 1;
  text-align: right;
  align-self: center;
`;

const NoGamesMessage = styled.div`
  padding: 25px 0;
`;
function RoomList() {
  const { rooms } = useSelector((state: AppState) => state.listRooms);
  return (
    <Paper style={{ marginBottom: "30px" }}>
      {rooms.length === 0 ? (
        <NoGamesMessage>No games available</NoGamesMessage>
      ) : (
        <span></span>
      )}
      <List>
        {rooms.map((room) => (
          <ListItem
            onClick={() => netSocket.emit("joinRoom", { roomId: room.id })}
            key={room.id}
          >
            <RoomDifficulty>
              <div>{room.difficulty}</div>
            </RoomDifficulty>
            <RoomNameContainer>
              <RoomNameTitle>{room.title}</RoomNameTitle>
              <RoomNameSubTitle>{room.difficulty}</RoomNameSubTitle>
            </RoomNameContainer>
            <EnterIcon>
              <ArrowForwardIosIcon />
            </EnterIcon>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default RoomList;
