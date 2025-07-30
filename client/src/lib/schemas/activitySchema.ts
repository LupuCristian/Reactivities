import { z } from 'zod';
import { requiredString } from '../util/util';

// const requiredString = (name: string) =>
//   z.string().trim().min(1, { message: `${name} is required` })

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  date: z.coerce.date({
    message: 'Date is required'
  }),
  location: z.object({
    venue: requiredString('Venue'),
    city: z.string().optional(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number()
  })
});

export type ActivitySchema = z.infer<typeof activitySchema>;