import { Card } from "./Card"

export const VolunteerConsole = () => {

  return (
    <>
      <div>
        <h1>Welcome Volunteer!</h1>
        <Card
          generalAddress="10 S Dearborn St"
          categories="plumbing"
          description="This job will take place downtown. There will be painting 
        involved" />
      </div>

    </>
  )
}