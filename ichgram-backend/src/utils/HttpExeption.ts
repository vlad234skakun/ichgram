export type StatusCode = 400 | 401 | 403 | 404 | 409 | 500;

const messageList = {
    400: "Bad Request",
    401: "Unauthorizet",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error"
    
}

export class HttpError extends Error {
  status?: number;

  constructor(message: string | undefined, status?: number) {
    super(message);
    this.status = status;
  }
}

const HttpExeption = (status: StatusCode , message = messageList[status]) => {
	const error = new HttpError(message)
	error.status = status
	return error
}

export default HttpExeption;
