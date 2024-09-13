declare global {
  namespace Express {
    interface Request {
      headers: {
        authorization?: string;
      };
    }
  }
}
