// db.server.create data: {profileId, name, members: {create: {profileId, role: MemberRole.ADMIN, }}}
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
import { createServer } from '@/actions/create/create-server'
import { redirect } from 'next/navigation'

const CreateServer = () => {
  const formSchema = z.object({
    name: z.string().min(1).max(50),
    imageUrl: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const action: () => void = form.handleSubmit(async (data) => {
    const response = await createServer(data)
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Server Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
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

export default CreateServer
