import { z } from 'zod';

export const schemaEmail = z.string().email().trim().toLowerCase();
export type schemaEmailType = z.infer<typeof schemaEmail>;

export const checkEmail = (email: string) => {
  const sendData = {
    email: '',
    error: '',
  };
  try {
    schemaEmail.parse(email);
    sendData.email = email;
  } catch (err) {
    if (err instanceof z.ZodError) {
      sendData.error = err.errors[0].message;
    }
  }
  return sendData;
};
