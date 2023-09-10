import {z} from 'zod';
export const EditProfileSchema = z.object({
   name: z.string().min(3, {message: 'Name must be at least 3 characters long'}).optional(),
   surname: z.string().min(3, {message: 'Surname must be at least 3 characters long'}).optional(),
   username: z.string().min(3, {message: 'Username must be at least 3 characters long'}).optional(),
   newPassword: z.union([z.string().min(8, {message: 'Password must be at least 6 characters long'}), z.string().length(0)]).optional().transform(e=>e?e:undefined),
  });
  
  export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;
  