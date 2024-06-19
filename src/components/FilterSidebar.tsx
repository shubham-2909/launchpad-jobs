import prisma from '@/lib/prisma'
import { jobTypes } from '@/lib/job-types'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { Button } from './ui/button'
import { JobFilterValues, jobFilter } from '@/schema/job'
import { redirect } from 'next/navigation'
import FormSubmitButton from './FormSubmitButton'

type Props = {
  defaultValues: JobFilterValues
}
async function filterJobs(form: FormData) {
  'use server'
  const values = Object.fromEntries(form.entries())
  const validatedValues = jobFilter.safeParse(values)
  if (!validatedValues.success) {
    throw validatedValues.error
  }

  const { q, location, type, remote } = validatedValues.data
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(location && { location }),
    ...(type && { type }),
    ...(remote && { remote: 'true' }),
  })
  redirect(`/?${searchParams.toString()}`)
}
export async function FilterSidebar({ defaultValues }: Props) {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ['location'],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    )) as string[]

  return (
    <aside className="sticky top-0 h-fit bg-background p-4 md:w-[250px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ''}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ''}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  )
}
