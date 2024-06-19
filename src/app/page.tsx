import { FilterSidebar } from '@/components/FilterSidebar'
import { JobResults } from '@/components/JobResults'
import { H1 } from '@/components/ui/h1'
import { JobFilterValues } from '@/schema/job'
type Props = {
  searchParams: {
    q?: string
    location?: string
    type?: string
    remote?: string
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
      <div className="spaye-y-5 text-center">
        <H1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer Jobs
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
