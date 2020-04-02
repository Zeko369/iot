import React from "react";
import { Link } from "react-router-dom";

const Page: React.FC = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      Hello from page
    </div>
  );
};

export default Page;
