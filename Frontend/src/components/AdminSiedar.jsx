import { useNavigate } from "react-router-dom";

const AdminButtons = [
  { name: "admin", path: "/admin" },
  { name: "Alle Anzeigen", path: "/adminad" },
  { name: "Alle User", path: "/adminuser" },
  {name:"Verboten",path:"/admin"}
];

const AdminSiedar = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <nav className="bg-background-filter-light-blue space-y-3 sm:w-80 py-5 ms-3 my-3 me-2 mt-10 rounded-lg">
        {AdminButtons.map((x) => {
          return (
            <div className="text-center" key={x.name}>
              <button
                onClick={() => handleClick(x.path)}
                className="btnProfile mt-3 w-56"
              >
                {x.name}
              </button>
            </div>
          );
        })}
      </nav>
    </>
  );
};

export default AdminSiedar;
