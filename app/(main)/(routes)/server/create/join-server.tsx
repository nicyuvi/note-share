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

const JoinServer = () => {
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
    console.log(data)
    // const response = await createServer(data)
    // if (response.error) {
    //   alert(response.error)
    // } else {
    //   alert(response.success)
    //   updateServer()
    //   router.push('/')
    // }
  })

  return (
    <>
      <h2 className="text-hub-h1 mb-4">Join a Server</h2>
      <Form {...form}>
        <form action={action} className="mb-4 flex w-64 space-y-8">
          <FormField
            control={form.control}
            name="name"
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
