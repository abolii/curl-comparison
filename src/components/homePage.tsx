"use client";

import { curlCommands } from "@/constants";
import { levenshteinDistance } from "@/helpers/levinstien";
import React, { useState } from "react";
import { diffChars } from "diff";

function HomePage() {
  const [userCurl, setUserCurl] = useState("");
  const [curl, setCurl] = useState("");

  const [differences, setDifferences] = useState<
    { added?: boolean; removed?: boolean; value: string }[]
  >([]);

  const searchCurl = () => {
    // پیدا کردن کمترین فاصله (بیشترین شباهت) بین userCurl و دستورات موجود
    const closestMatch = curlCommands.reduce(
      (closest, currentCommand) => {
        const distance = levenshteinDistance(userCurl, currentCommand);
        if (distance < closest.distance) {
          return { command: currentCommand, distance };
        }
        return closest;
      },
      { command: "", distance: Infinity }
    );

    setCurl(closestMatch.command);
  };

  const compareCurl = () => {
    const differences = diffChars(userCurl, curl);
    setDifferences(differences);
  };

  const checkDifference = async () => {
    const response = await fetch("/api/db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userCurl }),
    });
    const data = await response.json();
    setCurl(data.result);
    setDifferences(data.differences);
  };
  return (
    <div
      dir="rtl"
      className="w-full text-black mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      {/* قسمت جستجوی curl */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={userCurl}
          onChange={(e) => setUserCurl(e.target.value)}
          placeholder="جستجو..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={checkDifference}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          جستجو
        </button>
      </div>
      <textarea
        readOnly
        rows={4}
        value={curl}
        placeholder="نتیجه جستجو"
        className="w-full p-2 border text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <div className="w-full border-t-2 my-2" />

      {/* قسمت ارسال curl */}
      <div className="grid grid-cols-2">
        <div className="flex flex-col p-4 gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="name">cURL کاربر</label>
            <button className="px-2 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              ارسال درخواست
            </button>
          </div>
          <textarea
            value={userCurl}
            readOnly
            rows={4}
            placeholder=""
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="flex flex-col p-4 gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="email">cURL صحیح</label>
            <button className="px-2 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              ارسال درخواست
            </button>
          </div>
          <textarea
            readOnly
            rows={4}
            value={curl}
            placeholder=""
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col p-4 gap-2">
          <div className="flex items-center justify-between">ریسپانس</div>
          <textarea
            readOnly
            rows={4}
            placeholder=""
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="flex flex-col p-4 gap-2">
          <div className="flex items-center justify-between">ریسپانس</div>
          <textarea
            readOnly
            rows={4}
            placeholder=""
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div className="w-full border-t-2 my-2" />

      {/* قسمت مقایسه */}
      <div>
        <button
          onClick={compareCurl}
          className="px-2 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          انجام مقایسه
        </button>
        <p>
          {differences.map((part, index) => (
            <span
              key={index}
              style={{
                backgroundColor: part.added
                  ? "green"
                  : part.removed
                  ? "red"
                  : "transparent",
                color: part.added ? "white" : "black",
              }}
            >
              {part.value}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default HomePage;
