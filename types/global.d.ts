// Declarations for global interfaces & types
interface CustomError extends Error {
  code?: number;
  additionalInfo?: unknown;
}
