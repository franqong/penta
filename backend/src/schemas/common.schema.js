import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive({
    message: "El id debe ser un número entero positivo",
  }),
});
