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
  const { forgot } = useAuthCall();
  const [emaill, setEmaill] = useState("");

  const handleSave = () => {
    console.log(emaill);
    forgot(emaill);
    handleOpen();
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
              name="email"
              value={emaill}
              onChange={(e) => setEmaill(e.target.value)}
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
