import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestoreDB } from "../firebase";
import { Notification } from "../models/notification";

const notificationsCollection = collection(firestoreDB, "notifications");

// create a new notification
export const createNotification = async (
  notification: Omit<Notification, "id" | "createdAt" | "read">,
) => {
  const docRef = await addDoc(notificationsCollection, {
    ...notification,
    createdAt: serverTimestamp(),
    read: false,
  });
  return docRef.id;
};
// get notifications count
export const getNotificationsCount = (
  setNotificationsCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const q = query(notificationsCollection);
  onSnapshot(q, (querySnapshot) => {
    let value = querySnapshot.docs.filter((doc) => !doc.data().read);
    setNotificationsCount(value.length);
  });
};
// get notifications
export const getNotifications = async () => {
  const q = query(notificationsCollection, where("read", "==", false));

  const querySnapshot = await getDocs(q);
  const notifications = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Notification;
  });

  return notifications;
};
// mark notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  const notificationRef = doc(firestoreDB, "notifications", notificationId);
  await updateDoc(notificationRef, { read: true });
};
