import { Outlet } from "react-router"

export const Hello = () => {
  return (
    <>
      <div>
        Hello
      </div>
      <Outlet />
    </>
  )
}