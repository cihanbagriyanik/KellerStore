import React from "react";
import { useNavigate } from "react-router-dom";

const ResetBuuton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reset");
  };

  return (
    <div>
      <button
        className="btn bg-twitter-button-blue border border-0.5 border-button-blue hover:border-button-orange"
        type="submit"
        onClick={handleClick}
      >
        Reset Password
      </button>
    </div>
  );
};

export default ResetBuuton;