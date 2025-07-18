import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';

const socket = io("http://localhost:3000"); // Backend URL

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    // Listen for room data
    socket.on("roomData", ({ problems, time }) => {
      setProblems(problems);
      setTimeLeft(time * 60); // Convert minutes to seconds
    });

    // Cleanup listener
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

  // -- Shareable Link related code below --

  const shareableLink = `${window.location.origin}/room/${roomId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  // -- click to code editor like ListPage --
  const handleProblemClick = (title) => {
    try {
      navigate(`/codeEditor?title=${encodeURIComponent(title)}`);
    } catch (err) {
      toast.error('Navigation failed!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-4xl font-bold text-[#EA00FF]">Room: {roomId}</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyLink}
            className="bg-[#EA00FF] text-black px-4 py-2 rounded-lg font-semibold hover:bg-pink-500 transition"
          >
            {copied ? "Copied!" : "Share Room Link"}
          </button>
        </div>
      </div>
      <p className="text-lg mb-6">
        Time Left: <span className="font-mono text-yellow-400">{formatTime(timeLeft)}</span>
      </p>
      <ul className="space-y-4">
        {problems.map((p, idx) => (
          <li
            key={idx}
            onClick={() => handleProblemClick(p.title)}
            className="bg-gray-800 p-4 rounded-lg hover:cursor-pointer hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold text-[#EA00FF]">{p.title}</h2>
            <p>Difficulty: {p.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomPage;
