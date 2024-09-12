import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password?: string;
  provider?: string;
  providerId?: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  subscribedWidgets?: string[];
}
