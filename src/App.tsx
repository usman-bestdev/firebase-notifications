import { AppBar, Box, Button } from "@mui/material";
import NotificationComponent from "./components/notification";
import { Notification } from "./models/notification";
import { createNotification } from "./services/notification";
const App: React.FC = () => {
  const handleButtonClick = async (notification: Notification) => {
    await createNotification(notification); // Call
  };

  return (
    <>
      <AppBar position="static">
        <NotificationComponent />
      </AppBar>
      <Box
        margin={2}
        display={"flex"}
        flexDirection={"column"}
        alignContent={"space-between"}
        alignItems="center"
        justifyContent="space-between"
        height={200}
      >
        <Button
          variant="contained"
          onClick={() =>
            handleButtonClick({
              title: "Notification1",
              body: "first notification",
            })
          }
        >
          Notification 1
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            handleButtonClick({
              title: "Notification2",
              body: "second notification",
            })
          }
        >
          Notification 2
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            handleButtonClick({
              title: "Notification3",
              body: "third notification",
            })
          }
        >
          Notification 3
        </Button>
      </Box>
    </>
  );
};

export default App;
