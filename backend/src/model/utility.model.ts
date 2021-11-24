import { errorAccordingStatusCode } from "../utility";
import { IErrorResponse, ISuccessResponse } from "../utility/interfaces";

export class HttpSuccess {
  readonly _success: boolean;
  readonly _code: number;
  readonly _data: number;

  constructor(data: any, code: number) {
    this._code = code;
    this._success = code >= 301 && code <= 500 ? false : true;
    this._data = data;
  }

  toObject(): ISuccessResponse {
    return {
      success: this._success,
      timeStamp: new Date(),
      code: this._code,
      data: this._data,
    };
  }
}

export class HttpError extends Error {
  readonly error: string;
  readonly success: boolean;

  constructor(
    public message: string,
    public code: number,
    public detail?: string
  ) {
    super(message);
    this.success = code >= 301 && code <= 500 ? false : true;
    this.error = errorAccordingStatusCode(code);
  }

  toObject(): IErrorResponse {
    return {
      success: this.success,
      detail: this.detail || null,
      message: this.message,
      error: this.error,
      timeStamp: new Date(),
      code: this.code,
    };
  }
}
