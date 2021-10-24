import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(
      {
        status: 400,
        message: message || 'Bad request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
