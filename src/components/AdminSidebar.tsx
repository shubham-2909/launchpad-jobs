'use client'
import { Job } from '@prisma/client'
import FormSubmitButton from './FormSubmitButton'
import { useFormState } from 'react-dom'
import { approveJob, deleteJob } from '@/app/admin/jobs/actions'

type Props = {
  job: Job
}

export function AdminSidebar({ job }: Props) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-emerald-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissonButton jobId={job.id} />
      )}
      <DeleteSubmissionButton jobId={job.id} />
    </aside>
  )
}

type AdminButtonProps = {
  jobId: number
}

function ApproveSubmissonButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveJob, undefined)
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-emerald-500 hover:bg-emerald-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-rose-500">{formState.error}</p>
      )}
    </form>
  )
}

function DeleteSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(deleteJob, undefined)

  return (
    <form action={formAction}>
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-rose-500 hover:bg-rose-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-rose-500">{formState.error}</p>
      )}
    </form>
  )
}
