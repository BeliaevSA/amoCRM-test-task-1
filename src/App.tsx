import { useState } from "react";

export const App = () => {
  const [value, setValue] = useState("");
  const [showTime, setShowTime] = useState("");
  const [button, setButton] = useState("Start");
  const [valueForResetTimer, setValueForResetTimer] = useState<
    NodeJS.Timer | string
  >("");

  const setTime = (time: number) => {
    let seconds = (time % 60).toString();
    let minutes = (Math.floor(time / 60) % 60).toString();
    let hours = Math.floor(time / 3600).toString();

    if (+seconds < 10) seconds = `0${seconds}`;
    if (+minutes < 10) minutes = `0${minutes}`;
    if (+hours < 10) hours = `0${hours}`;

    return {
      seconds,
      minutes,
      hours,
    };
  };

  const createTimerAnimator = () => {
    return (time: number) => {
      const timer = () => {
        time--;

        const { seconds, minutes, hours } = setTime(time);

        if (time > 0) {
          setShowTime(`${hours}:${minutes}:${seconds}`);
        }
        if (time === 0) {
          setButton("Start");
          clearInterval(valueForResetTimer);
          setShowTime("Time's up");
        }
      };

      const intervalID = setInterval(timer, 1000);
      setValueForResetTimer(intervalID);
    };
  };

  const animateTimer = createTimerAnimator();

  const handleClickStart = () => {
    const time = +value;

    if (!time) return;

    const { seconds, minutes, hours } = setTime(time);

    setShowTime(`${hours}:${minutes}:${seconds}`);

    animateTimer(time);

    setValue("");
    setButton("Reset");
  };

  const handleClickReset = () => {
    setButton("Start");
    clearInterval(valueForResetTimer);
    setShowTime("hh : mm : ss");
  };

  const handleClickButton = () => {
    if (button === "Start") handleClickStart();

    if (button === "Reset") handleClickReset();
  };

  const handleChangeValue: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    if (e.target.value.length === 0) setValue("");
    if (+e.target.value) setValue(e.target.value);
  };

  const content = showTime ? showTime : "hh : mm : ss";

  return (
    <div>
      <div>
        <input
          placeholder="Seconds"
          type="text"
          value={value}
          onChange={handleChangeValue}
        />
        <button onClick={handleClickButton}>{button}</button>
      </div>
      <span>{content}</span>
    </div>
  );
};
