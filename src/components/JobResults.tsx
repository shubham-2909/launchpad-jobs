import prisma from '@/lib/prisma'
import { JobListItem } from './JobListItem'
import { JobFilterValues } from '@/schema/job'
import { Prisma } from '@prisma/client'

type Props = {
  filterValues: JobFilterValues
}

export async function JobResults({
  filterValues: { q, type, remote, location },
}: Props) {
  const searchString = q
    ?.split(' ')
    .filter((word) => word.length > 0)
    .join(' & ')

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { location: { search: searchString } },
          { locationType: { search: searchString } },
          { type: { search: searchString } },
        ],
      }
    : {}

  const whereQuery: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      location ? { location } : {},
      type ? { type } : {},
      remote ? { locationType: 'Remote' } : {},
      { approved: true },
    ],
  }
  const jobs = await prisma.job.findMany({
    where: whereQuery,
    orderBy: { createdAt: 'desc' },
  })
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found try adjusting your search filters
        </p>
      )}
    </div>
  )
}
