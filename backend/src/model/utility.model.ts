import { Schema, SchemaDefinitionProperty, Types } from "mongoose";
import { IErrorResponse, IImageProps } from "../utility/interfaces";

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
    this.error = this._checkError(code);
  }

  private _checkError(code: number) {
    switch (code) {
      case 301:
        return "Moved Permanently";
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 402:
        return "Payment Required";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 415:
        // The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.[49]
        return "Unsupported Media Type";
      case 422:
        // Invalid Inputs
        return "Unprocessable Entity";
      case 429:
        return "Too Many Requests";
      case 431:
        return "Request Header Fields Too Large";
      case 500:
        return "Internal Server Error";
      default:
        return "An unknown error occurred";
    }
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

export interface IImage extends Types.Subdocument {
  main: IImageProps;
  smWebp: IImageProps;
  mdWebp: IImageProps;
  lgWebp: IImageProps;
  sm: IImageProps;
  md: IImageProps;
  lg: IImageProps;
}

const schemaDefinition: SchemaDefinitionProperty<IImageProps> = {
  name: { type: String, required: true },
  ext: {
    type: String,
    required: true,
    enum: {
      values: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
      message:
        "{VALUE} must be valid image extension like (jpeg , jpg , png , gif , svg , webp)",
    },
  },
  uri: { type: String, required: true, unique: true },
};

export const ImageSchema = new Schema<IImage>({
  main: schemaDefinition,
  smWebp: schemaDefinition,
  mdWebp: schemaDefinition,
  lgWebp: schemaDefinition,
  sm: schemaDefinition,
  md: schemaDefinition,
  lg: schemaDefinition,
});
