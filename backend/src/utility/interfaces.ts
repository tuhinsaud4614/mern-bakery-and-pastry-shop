import { ImageExtType } from "./types";

export interface IErrorResponse {
  code: number;
  success: boolean;
  detail: string | null;
  message: string;
  error: string;
  timeStamp: Date;
}

export interface ISuccessResponse {
  code: number;
  success: boolean;
  timeStamp: Date;
  data: any;
}

// When request for register need this in the body object
export interface IRegisterRequestBody {
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
}

export interface IImageProps {
  name: string;
  ext: ImageExtType;
  uri: string;
}
