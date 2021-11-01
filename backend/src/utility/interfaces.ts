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
