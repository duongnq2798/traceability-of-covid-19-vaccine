import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(
      {
        status: 404,
        message: message || 'Not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
