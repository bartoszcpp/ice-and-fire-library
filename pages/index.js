import React from "react";
import HomePage from "../components/HomePage";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="app">
      <header>
        <Header />
      </header>
      <div className="container">
        <main className="main">
          <HomePage />
        </main>
      </div>
    </div>
  );
}
