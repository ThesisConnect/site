import { z } from 'zod';

export const createNewProjectSchema = z.object({
  projectName: z
    .string()
    .min(5, { message: 'Project name must be at least 5 characters long.' }),
  userInProject: z
    .array(
      z.object({
        email: z.string().email(),
        role: z.enum(['Co_advisor', 'Advisee', 'Advisor']),
      })
    )
    .nonempty()
    .refine((value) => value.length > 0, {
      message: 'At least one user is required in the project.',
    }),
});

export type createNewProjectType = z.infer<typeof createNewProjectSchema>;
type CheckSchemaReturnType = {
  data: createNewProjectType | null;
  error: string;
};

export const checkSchemaCreateProject = (data: {
  projectName: string;
  userInProject: {
    email: string;
    role: 'Co_advisor' | 'Advisee' | 'Advisor';
  }[];
}) => {
  const sendData: CheckSchemaReturnType = {
    data: null,
    error: '',
  };
  try {
    createNewProjectSchema.parse(data);
    sendData.data = data as createNewProjectType;
  } catch (err) {
    if (err instanceof z.ZodError) {
      // console.log(err)
      sendData.error = err.errors?.[1]?.message || err.errors[0].message;
    }
  }
  return sendData;
};
