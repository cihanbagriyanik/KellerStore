
import Banner from "../components/Banner";
import AdminSiedar from "../components/AdminSiedar";

const Admin = () => {
  const title = `Admin`;

  return (
    <>
      <div>
        <Banner title={title} target={"/allad"} />
      </div>
      <div className="flex">
        <div>
          <AdminSiedar />
        </div>

        <div className="flex-grow">
        
        </div>
      </div>
    </>
  );
};

export default Admin;
