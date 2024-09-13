import { Document } from 'mongoose';

export interface User extends Document {
  _id: string;
  email: string;
  password?: string;
  provider?: string;
  providerId?: string;
  accessToken?: string;
  refreshToken?: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  subscribedWidgets?: string[];
  role: string;
}
