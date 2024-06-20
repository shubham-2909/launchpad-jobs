import { jobTypes, locationTypes } from '@/lib/job-types'
import { z } from 'zod'

const requiredString = z.string().min(1, 'Required')

const numericRequiredString = requiredString.regex(/^\d+$/, 'Must be a number')

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) =>
      !file ||
      (file instanceof File && file.type.startsWith('image'),
      'Must be an image file')
  )
  .refine(
    (file) => !file || file.size < 1024 * 1024 * 2,
    'File must be less than 2Mb'
  )

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal('')),
    applicationUrl: z.string().max(100).url().optional().or(z.literal('')),
  })
  .refine((value) => value.applicationEmail || value.applicationUrl, {
    message: 'Email or url is required',
    path: ['applicationEmail'],
  })

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      'Invalid location type'
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (values) =>
      values.locationType === 'Remote' || !values.location || !values.location
  )

export const createJob = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      'Invalid job type'
    ),

    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 9 digits"
    ),
  })
  .and(applicationSchema)
  .and(locationSchema)

export type CreateJobValues = z.infer<typeof createJob>
export const jobFilter = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  remote: z.coerce.boolean().optional(),
})

export type JobFilterValues = z.infer<typeof jobFilter>
