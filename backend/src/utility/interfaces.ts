export interface IErrorResponse {
  success: boolean;
  detail: string | null;
  message: string;
  error: string;
  timeStamp: Date;
}

export interface ISuccessResponse {
  success: boolean;
  timeStamp: Date;
  data: any;
}

export interface IImageProps {
  name: string;
  uri: string;
  ext: string;
  baseName: string;
}

// When request for register need this in the body object
export interface IRegisterRequestBody {
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
}

// When request for category creation need this in the body object
export interface ICategoryCreateRequestBody {
  title: string;
  slug: string;
}

export interface ICategoryUpdateRequestBody {
  title?: string;
  slug?: string;
}
