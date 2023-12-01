'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { redirect } from 'next/navigation'
import { createNote } from '@/actions/create-note'
import { getNote } from '@/actions/get-note'
import { useState, useEffect } from 'react'

const EditNote = ({ params }: { params: { id: string } }) => {
  const [note, setNote] = useState<any>() // note type from prisma ?
  useEffect(() => {
    const fetchData = async () => {
      const response = await getNote(Number(params.id))
      if (response.error) {
        alert(response.error)
      } else {
        setNote(response.note)
      }
    }
    fetchData()
  }, [params.id])

  console.log(note, 'display note info in client')

  const formSchema = z.object({
    title: z.string().min(1).max(50),
    content: z
      .string()
      .min(1, {
        message: 'Content cannot be empty.',
      })
      .max(255, {
        message: 'Content must not be longer than 255 characters.',
      }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const action: () => void = form.handleSubmit(async (data) => {
    const response = await createNote(data)
    if (response.error) {
      alert(response.error)
    } else {
      alert(response.success)
      redirect('/')
    }
  })

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form action={action} className="space-y-8 w-64">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default EditNote
