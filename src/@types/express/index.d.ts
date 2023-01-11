import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        fullName: string;
        email: string;
        cpf: string;
        isSeller: boolean;
        id: string;
      };
    }
  }
}
