import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authors')({
  component: Authors,
})

function Authors() {
  return <div className="p-2">Hello from Authors!</div>
}
