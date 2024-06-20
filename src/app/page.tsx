import { FilterSidebar } from '@/components/FilterSidebar'
import { JobResults } from '@/components/JobResults'
import { H1 } from '@/components/ui/h1'
import { JobFilterValues } from '@/schema/job'
import { Metadata } from 'next'
type Props = {
  searchParams: {
    q?: string
    location?: string
    type?: string
    remote?: string
  }
}

function getTitle({ q, location, type, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} jobs`
      : remote
        ? `Remote developer jobs`
        : 'All developer jobs'

  const titleSuffix = location ? `in ${location}` : ``
  return `${titlePrefix} ${titleSuffix}`
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: Props): Metadata {
  return {
    title: `${getTitle({ q, location, type, remote: remote === 'true' })} | Flow jobs`,
  }
}
export default async function Home({
  searchParams: { q, remote, location, type },
}: Props) {
  const filterValues: JobFilterValues = {
    q,
    type,
    remote: remote === 'true',
    location,
  }
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {getTitle(filterValues)}
        </H1>
        <p className="text-muted-foreground">Find your deream job</p>
      </div>
      <section className="flex flex-col gap-2 md:flex-row">
        <FilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  )
}
