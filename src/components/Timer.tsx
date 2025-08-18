import { useEffect, useMemo, useState } from "react";
import { useWakeLock } from 'react-screen-wake-lock';

function Timer() {
  const DEFAULT_TIMER = 45000;
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const [status, setStatus] = useState("stopped");

  const { request, release } = useWakeLock();

  // const seconds = 45;
  useEffect(() => {
    setTimeRemaining(timer);
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime: number) => {
        if (status !== "playing") {
          clearInterval(timerInterval);
          return prevTime;
        }
        if (prevTime === 0) {
        /* alarm */
          clearInterval(timerInterval);
          release();
          return 0;
        } else {
          return prevTime - 1000;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [timer, status, release]);

  const handlePlayClick = () => {
    setStatus("playing");
    request();
  };

  const handleStopClick = () => {
    setTimer(DEFAULT_TIMER);
    setStatus("stopped");
    release();
  };

  const remainingSeconds = useMemo(() => {
    return timeRemaining / 1000;
  }, [timeRemaining]);

  return (
    <div className="text-center">
      <div className="text-6xl">{remainingSeconds}</div>
      {status === "stopped" && (
        <button
          className="cursor-pointer grow text-center border-yellow-800 border-2 p-2 rounded-md"
          onClick={handlePlayClick}
        >
          play
        </button>
      )}
      {status === "playing" && (
        <button
          className="cursor-pointer grow text-center border-yellow-800 border-2 p-2 rounded-md"
          onClick={handleStopClick}
        >
          stop
        </button>
      )}
    </div>
  );
}

export default Timer;
