import React from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import BooksPage from "../components/BooksPage";

export default function Book() {
  const router = useRouter();
  const { book } = router.query;

  if (book) {
    return (
      <div className="app">
        <header>
          <Header />
        </header>
        <div className="container">
          <main>
            <BooksPage id={book.match(/\d+/)[0]} />
          </main>
        </div>
      </div>
    );
  } else
    return (
      <div className="loading-container">
        <div className="fire">
          <div className="fire-left">
            <div className="main-fire"></div>
            <div className="particle-fire"></div>
          </div>
          <div className="fire-main">
            <div className="main-fire"></div>
            <div className="particle-fire"></div>
          </div>
          <div className="fire-right">
            <div className="main-fire"></div>
            <div className="particle-fire"></div>
          </div>
          <div className="fire-bottom">
            <div className="main-fire"></div>
          </div>
        </div>
      </div>
    );
}
