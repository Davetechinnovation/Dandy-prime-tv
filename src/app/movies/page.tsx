"use client";
import React, { useState } from "react";
import All from "../All/page";
import Hollywood from "../Hollywood/page";
import Bollywood from "../Bollywood/page";
import Asian from "../Asian/page";
import Nollywood from "../Nollywood/page";

const Page = () => {
  const [activeTab, setActiveTab] = useState("All");

  const renderContent = () => {
    switch (activeTab) {
      case "Hollywood":
        return <Hollywood />;
      case "Bollywood":
        return <Bollywood />;
      case "Asian":
        return <Asian />;
      case "Nollywood":
        return <Nollywood />;
      default:
        return <All />;
    }
  };

  return (
    <div>
      <div className="overflow-x-auto scrollbar-non text-white flex justify-between py-5 px-2 sm:p-5 sm:px-20 gap-5">
        <button
          className={`border-2 border-blue-700 rounded-full px-3 cursor-pointer hover:bg-blue-700 focus:bg-blue-700 duration-500 transition-all ${
            activeTab === "All" ? "bg-blue-700" : ""
          }`}
          onClick={() => setActiveTab("All")}
        >
          All
        </button>
        <button
          className={`border-2 border-blue-700 rounded-full px-3 cursor-pointer hover:bg-blue-700 focus:bg-blue-700 duration-500 transition-all ${
            activeTab === "Hollywood" ? "bg-blue-700" : ""
          }`}
          onClick={() => setActiveTab("Hollywood")}
        >
          Hollywood
        </button>
        <button
          className={`border-2 border-blue-700 rounded-full px-3 cursor-pointer hover:bg-blue-700 focus:bg-blue-700 duration-500 transition-all ${
            activeTab === "Bollywood" ? "bg-blue-700" : ""
          }`}
          onClick={() => setActiveTab("Bollywood")}
        >
          Bollywood
        </button>
        <button
          className={`border-2 border-blue-700 rounded-full px-3 cursor-pointer hover:bg-blue-700 focus:bg-blue-700 duration-500 transition-all ${
            activeTab === "Asian" ? "bg-blue-700" : ""
          }`}
          onClick={() => setActiveTab("Asian")}
        >
          Asian
        </button>
        <button
          className={`border-2 border-blue-700 rounded-full px-3 cursor-pointer hover:bg-blue-700 focus:bg-blue-700 duration-500 transition-all ${
            activeTab === "Nollywood" ? "bg-blue-700" : ""
          }`}
          onClick={() => setActiveTab("Nollywood")}
        >
          Nollywood
        </button>
      </div>
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default Page;
