import { Request, Response } from "express-serve-static-core";

export const mockRequest = {} as Request;

export const mockResponse = {
  json: jest.fn,
} as unknown as Response;
