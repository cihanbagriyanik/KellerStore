import Banner from "../components/Banner";
import AdminSiedar from "../components/AdminSiedar";
import SettingsContainer from "../components/container/SettingsContainer";

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
          <SettingsContainer />
        </div>
      </div>
    </>
  );
};

export default Admin;
