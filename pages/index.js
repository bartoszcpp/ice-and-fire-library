import React from "react";
import HomePage from "../components/HomePage";
import Header from "../components/Header";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ice and Fire</title>
        <link rel="icon" href="/favicon1.ico" />
        <meta
          data-react-helmet="true"
          name="theme-color"
          content="#7a0300"
        ></meta>
      </Head>
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
    </>
  );
}
