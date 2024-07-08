
import { useNavigate } from "react-router-dom";

const PasswordNeu = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
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

export default PasswordNeu;