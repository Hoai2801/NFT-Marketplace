import React from "react";

const NewCard = () => {
  return (
    <div className="rounded-t-lg w-[250px] px-0 bg-gray-300 bg-opacity-75">
      <div className="h-[250px] w-full overflow-hidden">
        <img
          src={`https://images.unsplash.com/photo-1702512035697-935b865a85c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8`}
          alt=""
          className="w-full p-0"
        />
      </div>
      <div className="h-[250px] w-full bg-opacity-70">
        <p>lajglkjalkj</p>
        <p>lkajlfajo</p>
      </div>
    </div>
  );
};

export default NewCard;
