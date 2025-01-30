import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useForm } from '@tanstack/react-form'

import { BookRequestSchema } from '@server/request/books'
import { Button } from '@components/shadcn/ui/button'
import { api } from '@lib/api'

export const Route = createFileRoute('/authors')({
  component: Authors,
})

function Authors() {
  const navigate = useNavigate()

  const form = useForm<BookRequestSchema>({
    defaultValues: {
      author: '',
      date: '',
      title: '',
    },
    onSubmit: async ({ value }) => {
      const response = await api.books.$post({ json: value })

      if (!response.ok) {
        throw new Error('Server error')
      }

      navigate({ to: '/' })
    },
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="flex flex-col max-w-md m-auto gap-2 [&_input]:text-slate-400 [&_input]:px-2 [&_input]:py-1 [&_input]:rounded [&_input]:bg-black [&_input]:border-2 [&_input]:border-slate-400">
          <form.Field
            name="title"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Titulo</label>
                <input
                  placeholder="Digite o título do livro"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </>
            )}
          />
          <form.Field
            name="author"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Autor</label>
                <input
                  placeholder="Digite o nome do autor do livro"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </>
            )}
          />
          <form.Field
            name="date"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Data do livro</label>
                <input
                  placeholder="Digite a data de lançamento do livro"
                  type="date"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors ? (
                  <em role="alert">{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button variant={'outline'} type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'Criando' : 'Criar livro'}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  )
}
