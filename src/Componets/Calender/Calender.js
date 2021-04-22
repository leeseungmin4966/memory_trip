import React, { useState, useEffect } from "react";
import "./Calender.css";
import SideBar from "../SideBar/SideBar";
const Calender = () => {
  let today = new Date();
  const [thisDay, setThisDay] = useState(today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [date, setDate] = useState(today.getDay());
  const [cal, setCal] = useState([]);

  const [isSideBar, setIsSideBar] = useState(false);
  const calDic = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  const weekDic = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekDic2 = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATDAY",
  ];

  const leftHandleWeek = () => {
    if (month === 1) {
      setMonth((prev) => 13 - prev);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };
  const rightHandleWeek = () => {
    if (month === 12) {
      setMonth((prev) => 13 - prev);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };
  const getFirstDayIndex = () => {
    let fistDayIndex = new Date(`${year}-${month}-01`).getDay();
    return fistDayIndex;
  };
  const makeCalendar = () => {
    setCal([]);
    let arr = [];
    let fistDayIndex = getFirstDayIndex();
    let day = 1;
    for (let i = 0, cnt = 1; i < 7; i++) {
      if (i < fistDayIndex) {
        arr.push(".");
      } else {
        arr.push(`${cnt}`);
        cnt += 1;
        day = cnt;
      }
    }
    let m = calDic[month];
    for (let i = day; i <= m; i++) {
      arr.push(i);
    }
    setCal((prev) => [...prev, ...arr]);
  };
  const getWeekDic2 = (d) => {
    return weekDic2[d];
  };

  const dayOnClick = (e) => {
    console.log(year, month, parseInt(e.target.innerText));
    const className = e.target.className;
    const arr = className.split(" ");
    for (var i in arr) {
      // dot 클릭시 sidebar 실행 x
      if (arr[i] === "dot") {
        return;
      }
    }
    setIsSideBar(true);
  };

  useEffect(() => {
    makeCalendar();
    return () => {};
  }, [year, month]);

  return (
    <>
      <SideBar setIsSideBar={setIsSideBar} isSideBar={isSideBar} />
      <div
        className={
          "calender" +
          (isSideBar === true ? " active-side" : " non-active-side")
        }
      >
        <div id="container">
          <h2>Day info</h2>
          <div className="year-month-container">
            <div>
              <div id="year">{year}</div>
              <span id="bar">/</span>
              <div id="month">{month}</div>
            </div>
            <div className="btn">
              <div onClick={leftHandleWeek}>
                <i className="fas fa-arrow-circle-left"></i>
              </div>
              <div onClick={rightHandleWeek}>
                <i className="fas fa-arrow-circle-right"></i>
              </div>
            </div>
          </div>
          <div id="weekDic">
            {weekDic.map((dic, index) => {
              return (
                <div className="dic" id={dic} key={index}>
                  {dic}
                </div>
              );
            })}
          </div>
          <div id="calenda">
            {cal.map((day, index) => {
              return (
                <div
                  className={
                    "day" +
                    (day === today.getDate() && month === today.getMonth() + 1
                      ? " today"
                      : "") +
                    (day !== "." ? " day-num" : " dot")
                  }
                  key={index}
                  onClick={dayOnClick}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
        <div id="controller">
          <h3>Today is ...</h3>
          <div id="this-day">{thisDay}</div>
          <div id="date">{getWeekDic2(date)}</div>
        </div>
      </div>
    </>
  );
};

export default Calender;
