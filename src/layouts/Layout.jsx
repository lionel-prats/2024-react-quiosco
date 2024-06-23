import { Outlet } from 'react-router-dom' // v259

export default function Layout() {
  return (
    <div>
      Layout
      <Outlet />
    </div>
  )
}