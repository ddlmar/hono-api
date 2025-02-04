import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: Root,
})

function NavBar() {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Livros
      </Link>{' '}
      <Link to="/login" className="[&.active]:font-bold">
        Login
      </Link>
    </div>
  )
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
