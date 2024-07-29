import { Timestamp } from "firebase/firestore";

export interface Notification {
  id?: string;
  title: string;
  body: string;
  createdAt?: Timestamp;
  read?: boolean;
}
