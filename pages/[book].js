import React from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import BooksPage from "../components/BooksPage";

export default function Book() {
  const router = useRouter();
  const { book } = router.query;

  console.log(book.match(/\d+/)[0]);

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
}
