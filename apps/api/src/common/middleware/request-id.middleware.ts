import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { RequestWithId } from '../../types/request-with-id.type.js';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function requestIdMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const receivedRequestId = request.headers['x-request-id'];

  const requestId =
    typeof receivedRequestId === 'string' &&
    UUID_PATTERN.test(receivedRequestId)
      ? receivedRequestId
      : randomUUID();

  const requestWithId = request as RequestWithId;

  requestWithId.requestId = requestId;

  response.setHeader('X-Request-Id', requestId);

  next();
}