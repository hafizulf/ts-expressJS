import { Response } from 'express';

class ResponseUtility {
  static ok(res: Response, data: any): Response {
    return res.status(200).json({
      status: 'OK',
      data,
    });
  }

  static created(res: Response, message: string): Response {
    return res.status(201).json({
      status: 'CREATED',
      message,
    });
  }

  static badRequest(res: Response, error: any): Response {
    return res.status(400).json({
      status: 'BAD REQUEST',
      error,
    });
  }

  static unauthorized(res: Response, error: any): Response {
    return res.status(401).json({
      status: 'UNAUTHORIZED',
      error,
    });
  }

  static internalServerError(res: Response, error: any): Response {
    return res.status(500).json({
      status: 'INTERNAL SERVER ERROR',
      error,
    });
  }
}

export default ResponseUtility;
