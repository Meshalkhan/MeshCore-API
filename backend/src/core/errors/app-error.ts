export class AppError extends Error { constructor(public readonly message: string, public readonly statusCode = 500, public readonly isOperational = true) { super(message); } }
