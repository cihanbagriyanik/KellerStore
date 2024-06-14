

import SettingsContainer from "../components/container/SettingsContainer";
import Banner from "../components/Banner";
import AdminSiedar from "../components/AdminSiedar";

const Adminverbot = () => {
  const title = `ADMIN`;
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
  )
}

export default Adminverbot