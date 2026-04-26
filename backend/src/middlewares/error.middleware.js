import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (err, req, res, next) => {
  // ZOD
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Datos inválidos",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // PRISMA
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      message: "Error de base de datos",
      code: err.code,
    });
  }

  // ERROR CON STATUS PERSONALIZADO
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // ERROR GENÉRICO
  console.error(err);

  res.status(500).json({
    message: "Error interno del servidor",
  });
};
