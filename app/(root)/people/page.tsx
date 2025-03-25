import { Button } from 'antd'
import React from 'react'

async function Page() {
  const response = await fetch("https://openshift-test-new-johntan757575-dev.apps.rm2.thpm.p1.openshiftapps.com/api/people")
  const people = await response.json()

  return (
    <div>
      <div>People</div>
      <br></br>
      <Button type="primary">Test</Button>
      {people.map((person: { nric: string, fullName: string, email: string, dateOfBirth: Date }) => (
        <div key={person.nric} className="flex flex-col">
          Person:
          <div>NRIC: {person.nric}</div>
          <div>Full Name: {person.fullName}</div>
          <div>Email: {person.email}</div>
          <div>DOB: {person.dateOfBirth.toDateString()}</div>
          <br></br>
        </div>
      ))}
    </div>
  )
}

export default Page