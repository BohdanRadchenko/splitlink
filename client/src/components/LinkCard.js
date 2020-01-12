import React from "react";

export const LinkCard = ({ link }) => {
  console.log(link);
  return (
    <div>
      <h3>Detail Link</h3>
      <p>
        You are link:
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        From link:
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Clicks:
        <strong> {link.clicks}</strong>
      </p>
      <p>
        create date:
        <strong> {new Date(link.data).toLocaleDateString()}</strong>
      </p>
    </div>
  );
};
