import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000"); // Backend URL

const RoomPage = () => {
  const { roomId } = useParams();
  const [problems, setProblems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("roomData", ({ problems, time }) => {
      setProblems(problems);
      setTimeLeft(time * 60); // convert minutes to seconds
    });

    return () => socket.off("roomData");
  }, [roomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-[#EA00FF] mb-4">Room: {roomId}</h1>
      <p className="text-lg mb-6">Time Left: <span className="font-mono text-yellow-400">{formatTime(timeLeft)}</span></p>
      <ul className="space-y-4">
        {problems.map((p, idx) => (
          <li key={idx} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-[#EA00FF]">{p.title}</h2>
            <p>Difficulty: {p.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomPage;
