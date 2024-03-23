import React, { useState, useEffect } from 'react';

const Timer = ({ hours, minutes, seconds }) => {
  const [time, setTime] = useState({
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
        clearInterval(timer);
        // You can perform any action when the countdown reaches zero.
        console.log('Countdown reached zero!');
      } else {
        setTime((prevTime) => {
          const newTime = { ...prevTime };
          if (newTime.seconds > 0) {
            newTime.seconds -= 1;
          } else {
            if (newTime.minutes > 0) {
              newTime.minutes -= 1;
              newTime.seconds = 59;
            } else {
              if (newTime.hours > 0) {
                newTime.hours -= 1;
                newTime.minutes = 59;
                newTime.seconds = 59;
              }
            }
          }
          return newTime;
        });
      }
    }, 1000);

    return () => clearInterval(timer);

  }, [time]);

  return (
    <div>
      <div style={{margin:"20px 0px"}}>
        <span style={{backgroundColor:"rgb(255,215,2)", padding: "10px", color: "black", border:"1px solid black", borderRadius:"4px"}}>{time.hours < 10 ? `0${time.hours}` : time.hours}</span>:
        <span style={{backgroundColor:"rgb(255,215,2)", padding: "10px", color: "black", border:"1px solid black", borderRadius:"4px"}}>{time.minutes < 10 ? `0${time.minutes}` : time.minutes}</span>:
        <span style={{backgroundColor:"rgb(255,215,2)", padding: "10px", color: "black", border:"1px solid black", borderRadius:"4px"}}>{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</span>
      </div>
    </div>
  );
};

export default Timer;
