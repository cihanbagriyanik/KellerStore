import { useState } from "react";
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

function ResetModal({ open, handleOpen }) {
  const [userData, setUserData] = useState({});
  const [adres, setAdres] = useState("");
  const { profileUpdate } = useAuthCall();

  

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
            Password Vergessen
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Email
            </Typography>
            <Input
          label="Email"
              size="lg"
              name="userName"
        
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

export default ResetModal;