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
import { createServer } from '@/actions/create/create-server'
import { useRouter } from 'next/navigation'
import { useSidebarStore } from '@/store/zustand'
import { Separator } from '@/components/ui/separator'
import JoinServer from './join-server'

const CreateServer = () => {
  const updateServer = useSidebarStore((state) => state.updateServer)
  const router = useRouter()
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
      updateServer()
      router.push('/')
    }
  })

  return (
    <div className="flex h-full flex-col items-center">
      <h1 className="text-hub-h1 mb-6">Create a Server</h1>
      <Form {...form}>
        <form action={action} className="mb-4 w-64 space-y-8">
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
          <Button variant="hub" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      {/* <Separator className="mb-4 w-1/2" /> */}
      <div className="flex w-1/2 items-center">
        <div className="flex-1 border-t-2 border-gray-200"></div>
        <span className="bg-white px-3 text-gray-500">Or</span>
        <div className="flex-1 border-t-2 border-gray-200"></div>
      </div>
      <JoinServer />
    </div>
  )
}

export default CreateServer
