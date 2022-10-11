import { io, Socket } from "socket.io-client";
import { UserDto } from './../activities/login/model/User';
import { DIFFICULTIES, PlayerProgressDto, RoomDto, ScoreDto } from './../models/Nouns';
interface OutEventsMap {
    createRoom: (args: { title: string, difficulty: DIFFICULTIES, playerCount: number }) => void;
    listRooms: () => void;
    leaveRoom: (args: { roomId: string }) => void;
    joinRoom: (args: { roomId: string }) => void;
    informProgress: (progress: PlayerProgressDto) => void;
    broadcastPlayerInfo: (user: UserDto) => void;
    broadcastPlayerInfoRequest: (user: UserDto) => void;
}

interface InEventsMap {
    roomListUpdate: (room: RoomDto[]) => void;
    roomCreated: (room: RoomDto) => void;
    start: (room: RoomDto) => void;
    opponentProgress: (progress: PlayerProgressDto) => void;
    reconnect: () => void;
    youFinish: (score: ScoreDto) => void;
    opponentFinish: (score: ScoreDto) => void;
    opponentLeave: (room: RoomDto) => void;
    opponentPlayerInfo: (user: UserDto) => void;
    playerInfoRequest: (user: UserDto) => void;
}
const netSocket: Socket<InEventsMap, OutEventsMap> = io(`${process.env.REACT_APP_INSTANT_SERVER}`);

export default netSocket;

 //http://185.227.110.179/
