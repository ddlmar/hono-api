import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: unknown) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      <input {...register('password')} />
      <input type="submit" />
    </form>
  )
}
