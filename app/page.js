"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Define the possible winning combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

export default function Home() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [winner, setWinner] = useState(null);
  const [winnerImage, setWinnerImage] = useState("");

  useEffect(() => {
    // Check for a winner after every move
    checkWinner();
  }, [data]);

  const checkWinner = () => {
    // Loop through all winning combinations
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setWinner(data[a]);
        setLock(true); // Lock further clicks
        setWinnerImage(data[a] === "O" ? "/circle.png" : "/cross.png");
        return;
      }
    }
  };

  const Toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return null;
    }

    let newData = [...data];
    let r = "";

    if (count % 2 === 0) {
      r = "/circle.png"; // Show Circle on even clicks
      newData[num] = "O";
    } else {
      r = "/cross.png"; // Show Cross on odd clicks
      newData[num] = "X";
    }

    setData(newData);
    setCount(count + 1);

    e.target.innerHTML = `<img src="${r}" alt="Not Available" width="80"/>`;
  };

  const handleReset = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setWinner(null);
    setLock(false);
    setWinnerImage("");
    document.querySelectorAll(".box").forEach((box) => (box.innerHTML = ""));
  };

  const handleStart = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white font-bold flex justify-center flex-col overflow-hidden text-center items-center">
        <h1 className="p-2 md:text-5xl text-3xl ">
          {winner ? (
            <>
              Congratulations:
              <Image
                src={winnerImage}
                alt={winner}
                width={90}
                height={90}
                className="inline-flex mx-2"
              />
              Won
            </>
          ) : (
            <>
              Tic Tac Toe With{" "}
              <span className="font-[900] text-black bg-white tracking-tight py-1 px-2 rounded-sm inline-block m-2">
                NEXT.js
              </span>
            </>
          )}
        </h1>
        <div className="container flex flex-col items-center justify-f gap-10 flex-wrap scale-95">
          <div className="rows flex flex-col gap-2 flex-wrap ">
            <div className="row flex justify-center  gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="box bg-gray-800 w-28 h-28 md:h-40 md:w-40 md:max-w-[10rem] sm:max-w-[8rem] sm:h-32 max-w-[6rem] rounded-md flex justify-center items-center"
                  onClick={(e) => Toggle(e, i)}
                />
              ))}
            </div>
            <div className="row flex justify-center gap-2">
              {[3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="box bg-gray-800 w-28 h-28 md:h-40 md:w-40 md:max-w-[10rem] sm:max-w-[8rem] sm:h-32 max-w-[6rem]  rounded-md flex justify-center items-center"
                  onClick={(e) => Toggle(e, i)}
                />
              ))}
            </div>
            <div className="row flex justify-center gap-2">
              {[6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="box bg-gray-800 md:h-40 md:w-40 md:max-w-[10rem] sm:max-w-[8rem] sm:h-32 max-w-[6rem] w-28 h-28 rounded-md flex justify-center items-center"
                  onClick={(e) => Toggle(e, i)}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 md:scale-100 scale-50">
            <button
              type="button"
              className="bg-white  text-black py-1 mx-2 px-4 text-[25px] rounded-sm hover:bg-black hover:text-white focus:shadow-[0px_4px_0px_#ffffff] focus:bg-black focus:text-white"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="bg-white text-black py-1 px-5 mx-2 text-[25px] rounded-sm hover:bg-black hover:text-white focus:shadow-[0px_4px_0px_#ffffff] focus:bg-black focus:text-white"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
