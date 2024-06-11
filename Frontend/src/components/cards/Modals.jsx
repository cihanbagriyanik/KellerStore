import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import useAuthCall from "../../hooks/useAuthCall";

function Modals({ open, handleOpen, user, address }) {
  const [userData, setUserData] = useState({});
  const [adres, setAdres] = useState("");
  const { profileUpdate } = useAuthCall();

  useEffect(() => {
    setUserData(user);
    // setAdres(address[0]?.zipCode || '');
  }, [user, address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    setAdres(e.target.value);
  };

  const handleSave = () => {
    //console.log(userData, "USERDATA");
    // console.log(adres);
    handleOpen();
    profileUpdate(userData, adres);
  };

  return (
    <>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none flex items-center justify-center min-h-screen"
      >
        <Card className="w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Upload
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Profil Name
            </Typography>
            <Input
              label="Profil Name"
              size="lg"
              name="userName"
              value={userData?.userName || ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Lieferadresse
            </Typography>
            <Input
              label="Lieferadresse"
              size="lg"
              name="address"
              value={adres}
              onChange={handleAddressChange}
            />
            <Typography className="-mb-2" variant="h6">
              Telefonnummer
            </Typography>
            <Input
              label="Telefonnummer"
              size="lg"
              name="tel"
              value={userData?.tel || ""}
              onChange={handleChange}
            />
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input
              label="Email"
              size="lg"
              name="email"
              value={userData?.email || ""}
              onChange={handleChange}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSave} fullWidth>
              Bearbeiten
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default Modals;

