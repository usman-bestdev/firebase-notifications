import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Notification } from "../models/notification";
import {
  getNotifications,
  getNotificationsCount,
  markNotificationAsRead,
} from "../services/notification";

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [isListOpen, setIsListOpen] = useState(false);
  useEffect(() => {
    getNotificationsCount(setNotificationsCount);
  }, []);
  // fetch notifications from notifications collection
  const fetchNotifications = async () => {
    const notifications = await getNotifications();
    setNotifications(notifications);
  };
  // mark notifications as read and update notifications
  const handleNotificationClick = async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    let tempNotifications = notifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n,
    );

    setNotifications(
      tempNotifications.filter((notification) => {
        if (!notification.read) return notification;
      }),
    );
  };

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "right" }}
      >
        <IconButton
          size="large"
          color="inherit"
          onClick={() => {
            setIsListOpen(true);
            fetchNotifications();
          }}
        >
          <Badge
            badgeContent={notificationsCount ? notificationsCount : null}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>
      {notifications.length !== 0 && (
        <Menu
          anchorOrigin={{
            vertical: 55,
            horizontal: "right",
          }}
          open={isListOpen}
          onClose={() => setIsListOpen(false)}
        >
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id!)}
            >
              <ListItemText
                primary={notification.title}
                secondary={notification.body}
              />
            </ListItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default NotificationComponent;
