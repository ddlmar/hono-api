import Table from '@components/Table'
import { api } from '@lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

const getBooks = async () => {
  const response = await api.books.$get()

  if (!response.ok) {
    throw new Error('Server error')
  }

  return response.json()
}

function Index() {
  const query = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  })

  return (
    <div className="flex m-autos flex-col p-10 gap-4">
      <Table
        caption="List of all books."
        header={['id', 'name', 'author', 'date']}
        fetchData={query.data?.books || []}
        renderRow={(item, Cell) => (
          <>
            <Cell>{item.id}</Cell>
            <Cell>{item.title}</Cell>
            <Cell>{item.author}</Cell>
            <Cell>{item.date}</Cell>
          </>
        )}
      />
    </div>
  )
}
