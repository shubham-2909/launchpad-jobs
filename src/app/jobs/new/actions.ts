'use server'
import { toSlug } from '@/lib/utils'
import { createJob } from '@/schema/job'
import { nanoid } from 'nanoid'
import { put } from '@vercel/blob'
import path from 'path'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function createNewJob(formData: FormData) {
  const values = Object.fromEntries(formData.entries())

  const {
    title,
    type,
    location,
    locationType,
    companyLogo,
    companyName,
    applicationEmail,
    applicationUrl,
    salary,
    description,
  } = createJob.parse(values)

  const slug = `${toSlug(title)}-${nanoid(10)}`
  let companyLogoUrl: string | undefined = undefined
  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      { access: 'public', addRandomSuffix: false }
    )

    companyLogoUrl = blob.url
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      locationType,
      location,
      companyLogoUrl,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      companyName: companyName?.trim(),
      salary: parseInt(salary),
      description: description?.trim(),
    },
  })

  redirect('/job-submitted')
}
