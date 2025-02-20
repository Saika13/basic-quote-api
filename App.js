import React, { useState } from "react";

const RandomQuoteApp = () => {
  const [quote, setQuote] = useState("Click below to get a random Quote!");
  const [author, setAuthor] = useState(""); // Store author separately

  const PAGE_ACCESS_TOKEN = "token"; // Replace with actual token
  const PAGE_ID = "page-id"; // Replace with actual Facebook Page ID

  // Fetch a Random Quote
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();
      setQuote(`"${data.quote}"`); // Set the quote
      setAuthor(`- ${data.author}`); // Set the author
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to load quote.");
      setAuthor(""); // Clear author in case of an error
    }
  };

  // Post the quote to Facebook
  const postToFacebook = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/${PAGE_ID}/feed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `${quote}\n${author}`, // Include author in the post
            access_token: PAGE_ACCESS_TOKEN,
          }),
        }
      );

      const data = await response.json();
      if (data.id) {
        alert("Quote posted to Facebook!");
      } else {
        alert("Failed to post to Facebook.");
      }
    } catch (error) {
      console.error("Error posting to Facebook:", error);
      alert("Error posting to Facebook.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>💬 Random Quotes</h1>
      <blockquote
        style={{
          fontSize: "1.5rem",
          fontStyle: "italic",
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {quote}
      </blockquote>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{author}</p> {/* Show author */}
      <button
        onClick={fetchQuote}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          marginRight: "10px",
        }}
      >
        Get Random Quote
      </button>
      <button
        onClick={postToFacebook}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          background: "#1877F2",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Post to Facebook
      </button>
    </div>
  );
};

export default RandomQuoteApp;
