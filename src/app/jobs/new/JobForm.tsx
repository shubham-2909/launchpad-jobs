'use client'
import { H1 } from '@/components/ui/h1'
import { CreateJobValues, createJob } from '@/schema/job'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { jobTypes, locationTypes } from '@/lib/job-types'
import { LocationInput } from '@/components/LocationInput'
import { X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { TextEditor } from '@/components/TextEditor'
import { draftToMarkdown } from 'markdown-draft-js'
import LoadingButton from '@/components/LoadingButton'
import { createNewJob } from './actions'
export function JobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJob),
  })
  async function handleSubmit(values: CreateJobValues) {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value)
      }
    })

    try {
      await createNewJob(formData)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <main className="m-auto my-10 max-w-3xl space-x-10">
      <div className="space-y-5 text-center">
        <H1>Find your perfect developer</H1>
        <p className="text-muted-foreground">
          Provide a job description and details
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a Job description and details
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="eg. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue={``}>
                      <option value="" hidden>
                        Select a job type
                      </option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field: { value, ...fieldValues } }) => {
                return (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="/image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          fieldValues.onChange(file)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue={``}>
                      <option value="" hidden>
                        Select an option
                      </option>
                      {locationTypes.map((type) => (
                        <option key={type} value={type}>
                          {' '}
                          {type}{' '}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Office location</FormLabel>
                    <FormControl>
                      <LocationInput
                        onLocationSelect={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>
                    {form.watch('location') && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            form.setValue('location', '', {
                              shouldValidate: true,
                            })
                          }}
                        >
                          <X size={20} />
                        </button>
                        <span className="text-sm">
                          {form.watch('location')}
                        </span>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type="email"
                            {...field}
                          />
                          <span className="mx-2">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            form.trigger('applicationEmail')
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => form.setFocus('description')}>
                    Description
                  </Label>
                  <FormControl>
                    <TextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  )
}
