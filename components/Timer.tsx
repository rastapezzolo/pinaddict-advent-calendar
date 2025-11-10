"use client";
import React from "react"


export default function Timer({isCyberMonday = false, lang = "it"}) {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  // set a countdown for 24:00:00 of today
  React.useEffect(() => {
    const now = new Date();
    const end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );

    const interval = setInterval(() => {
      const now = new Date();
      const diff = end.getTime() - now.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
    return () => clearInterval(interval);

  }, [hours, minutes, seconds]);

  const pad = (n) => (n < 10 ? `0${n}` : n);

  const textColor = isCyberMonday ? "text-white" : "text-white";
  const bgColor = isCyberMonday ? "bg-[#f06aa7]/70" : "bg-[#f06aa7]/70";
  const classNamesDigits = `${bgColor} px-1 rounded-md content-center text-center min-w-[28px] text-sm font-regular`;
  const classNameDigitText = "m-0 pt-0.5 text-sm"

  const timerOffer = "OFFERTA LIMITATA";

  return (
    <div className={`text-[16px] text-uppercase font-[600] flex justify-start align-center gap-2 ${textColor} bg-[#f06aa7]/40 px-2 py-1 rounded-md`}>
      <span className="text-sm md:text-base">
        {timerOffer}
      </span>
      <div className="flex align-center justify-center gap-1">
        <div className={classNamesDigits}><p className={classNameDigitText}>{pad(hours)}</p></div>
        <div className={classNamesDigits}><p className={classNameDigitText}>{pad(minutes)}</p></div>
        <div className={classNamesDigits}><p className={classNameDigitText}>{pad(seconds)}</p></div>
      </div>
    </div>
  )

}