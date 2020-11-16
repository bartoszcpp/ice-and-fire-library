import Link from "next/link";
import React from "react";

const Character = (props) => {
  const { data } = props;

  let tvSeriesLength = 0;
  if (data.tvSeries[0]) {
    tvSeriesLength = data.tvSeries.length;
  }

  const books = data.books.map((book, index) => {
    return (
      <span key={index}>
        <Link href="/[book]" as={`/book=${book.match(/\d+/)}`}>
          <span className="number-book">{book.match(/\d+/)}</span>
        </Link>
      </span>
    );
  });

  return (
    <div className="character-div">
      <p>
        <b>Name: </b>
        {data.name === "" ? `${data.aliases}` : `${data.name}, ${data.aliases}`}
      </p>
      <p>
        <b>Gender: </b>
        {data.gender === "" ? "Unknow" : data.gender}
      </p>
      <p>
        <b>Culture: </b>
        {data.culture === "" ? "Unknow" : data.culture}
      </p>
      <p className="book-display">
        <b>Books: </b>
        <br />
        {books}
      </p>
      <p>
        <b>Number of series: </b>
        {tvSeriesLength}
      </p>
    </div>
  );
};

export default Character;
