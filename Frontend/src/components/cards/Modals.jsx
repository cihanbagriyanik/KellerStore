import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

function Modals({ open, handleOpen }) {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen((cur) => !cur);
 

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Upload
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Profil Name
            </Typography>
            <Input label="Profil Name" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Lieferadresse
            </Typography>
            <Input label="Lieferadresse" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Telefonnummer
            </Typography>
            <Input label="Telefonnummer" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input label="Email" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Bearbeiten
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
export default Modals;
