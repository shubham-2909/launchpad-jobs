import prisma from '@/lib/prisma'
import { JobListItem } from './JobListItem'
import { JobFilterValues } from '@/schema/job'
import { Prisma } from '@prisma/client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = {
  filterValues: JobFilterValues
  page?: number
}

export async function JobResults({ filterValues, page = 1 }: Props) {
  const { q, type, remote, location } = filterValues
  const jobsPerPage = 6
  const skip = (page - 1) * jobsPerPage
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
  const jobsPromise = prisma.job.findMany({
    where: whereQuery,
    orderBy: { createdAt: 'desc' },
    take: jobsPerPage,
    skip,
  })

  const countPromise = prisma.job.count({
    where: whereQuery,
  })

  const [jobs, totalJobs] = await Promise.all([jobsPromise, countPromise])
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link href={`/jobs/${job.slug}`} className="block" key={job.id}>
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found try adjusting your search filters
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalJobs / jobsPerPage)}
          filteredValues={filterValues}
        />
      )}
    </div>
  )
}

function Pagination({
  currentPage,
  totalPages,
  filteredValues: { q, type, remote, location },
}: {
  currentPage: number
  totalPages: number
  filteredValues: JobFilterValues
}) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: 'true' }),
      page: page.toString(),
    })

    return `/?${searchParams.toString()}`
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          'flex items-center gap-2 font-semibold',
          currentPage <= 1 && 'invisible'
        )}
      >
        <ArrowLeft size={16} />
        Previous Page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          'flex items-center gap-2 font-semibold',
          currentPage >= totalPages && 'invisible'
        )}
      >
        Next Page
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
