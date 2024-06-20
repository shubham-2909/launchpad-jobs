import { Metadata } from 'next'
import { JobForm } from './JobForm'

export const metadata: Metadata = {
  title: 'New job',
}
export default function page() {
  return <JobForm />
}
