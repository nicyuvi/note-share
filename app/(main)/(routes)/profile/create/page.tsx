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
import { createProfile } from '@/actions/create/create-profile'
import { useRouter } from 'next/navigation'

const CreateProfile = () => {
  const router = useRouter()
  const formSchema = z.object({
    name: z.string().min(1).max(50),
    bio: z
      .string()
      .min(10, {
        message: 'Bio must be at least 10 characters.',
      })
      .max(160, {
        message: 'Bio must not be longer than 30 characters.',
      }),
    imageUrl: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bio: '',
      imageUrl: '',
    },
  })

  const action: () => void = form.handleSubmit(async (data) => {
    const response = await createProfile(data)
    if (response.error) {
      alert(response.error)
    } else {
      alert(response.success)
      router.push('/')
    }
  })

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-6 text-3xl font-bold text-hub-600">Create Profile</h1>
      <Form {...form}>
        <form action={action} className="w-64 space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
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
    </div>
  )
}

export default CreateProfile
