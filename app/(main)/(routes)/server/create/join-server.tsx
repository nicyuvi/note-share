import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createMember } from '@/actions/create/create-member'
import { useRouter } from 'next/navigation'
import { useSidebarStore } from '@/store/zustand'

const JoinServer = () => {
  const router = useRouter()
  const updateServer = useSidebarStore((state) => state.updateServer)
  const formSchema = z.object({
    inviteCode: z.string().min(1),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteCode: '',
    },
  })

  const action: () => void = form.handleSubmit(async (data) => {
    const res = await createMember(data)
    if (res.error) {
      alert(res.error)
    } else {
      alert(res.success)
      updateServer()
      router.push('/')
    }
  })

  return (
    <>
      <h2 className="text-hub-h1 mb-4">Join a Server</h2>
      <Form {...form}>
        <form action={action} className="mb-4 flex w-64 space-y-8">
          <FormField
            control={form.control}
            name="inviteCode"
            render={({ field }) => (
              <FormItem className="mr-4">
                <FormLabel>Invite Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="hub" type="submit">
            Join
          </Button>
        </form>
      </Form>
    </>
  )
}

export default JoinServer
