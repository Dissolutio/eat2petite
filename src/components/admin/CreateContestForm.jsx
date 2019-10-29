import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'
import useInputValue from '../../modules/hooks/useInputValue'
import * as ROUTES from '../../routes'
import { format, addDays } from 'date-fns'

const ContestCreateForm = (props) => {
  const { appData, createContest, enrollUserInContest } = useDataContext()
  const { users, challenges } = appData
  const [numberOfChallenges, setNumberOfChallenges] = useState(6)
  const [startDate, setStartDate] = useState(format(new Date(), 'P'))

  const handleStartDateChange = (event) => {
    // add one day, because `format` rounds down for some reason
    const newDate = addDays(new Date(event.target.value), 1)
    console.log(newDate)
    setStartDate(format(addDays(newDate, 1), 'P'))
  }
  const generateChallengeOrderInputLength = () => {
    let array = []
    for (let i = 1; i <= numberOfChallenges; i++) {
      array.push(i)
    }
    return array
  }
  const challengeInputNames = generateChallengeOrderInputLength().map(
    (input, index) => `Challenge${index + 1}`,
  )
  const title = useInputValue('Sample1')
  const daysPerChallenge = useInputValue(14)

  const createContestOnSubmit = async (event) => {
    event.preventDefault()
    const enrolledUsers = [...event.target.enrolledUsers]
      .filter((input) => input.checked)
      .map((input) => input.value)
    const orderOfChallenges = () => challengeInputNames.reduce(
      (orderOfChallenges, inputName, currIndex) => {
        orderOfChallenges[currIndex + 1] = event.target[inputName].value
        return orderOfChallenges
      }, {})
    const newContest = {
      title: title.value,
      startDate,
      daysPerChallenge: daysPerChallenge.value,
      orderOfChallenges: orderOfChallenges(),
      numberOfChallenges,
    }
    const newContestId = await createContest(newContest)
      enrolledUsers.forEach((userId) => {
        enrollUserInContest(userId, newContestId)
      })
      props.history.push(`${ROUTES.ADMIN_CONTESTS}${newContestId}`)
    })
  }
  return (
    <Container>
      <Form
        onSubmit={createContestOnSubmit}
        className="border border-primary rounded p-4 mt-4 mb-3 text-center">
        <h2>Contest Creation Form</h2>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input name="title" type="text" {...title} />
        </FormGroup>
        <FormGroup>
          <Label for="startDate">Start Date</Label>
          <Input
            name="startDate"
            type="date"
            defaultValue={startDate}
            onChange={handleStartDateChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="numberOfChallenges">Number of Challenges</Label>
          <Input
            name="numberOfChallenges"
            type="number"
            value={numberOfChallenges}
            onChange={(event) => setNumberOfChallenges(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="daysPerChallenge">Days per Challenge</Label>
          <Input name="daysPerChallenge" type="number" {...daysPerChallenge} />
        </FormGroup>
        {users && (
          <FormGroup>
            Enrolled Users:
            {Object.keys(users)
              .filter((userKey) => users[userKey].userRole === 'default')
              .map((userKey) => {
                const user = users[userKey]
                return (
                  <FormGroup key={userKey} check>
                    <Label check>
                      <Input
                        type="checkbox"
                        value={userKey}
                        name="enrolledUsers"
                      />
                      {`${user.firstName} ${user.lastName}`}
                    </Label>
                  </FormGroup>
                )
              })}
          </FormGroup>
        )}
        {generateChallengeOrderInputLength().map((orderSelect, orderIndex) => {
          const inputName = `Challenge${orderIndex + 1}`
          return (
            <FormGroup key={inputName}>
              <Label for={inputName}>{`Challenge ${orderIndex + 1}`}</Label>
              <Input type="select" name={inputName}>
                {challenges &&
                  Object.keys(challenges).map((challengeKey) => {
                    const challenge = challenges[challengeKey]
                    return (
                      <option
                        key={`${orderIndex}--${challengeKey}`}
                        value={challenge.uid}>
                        {challenge.challengeName}
                      </option>
                    )
                  })}
              </Input>
            </FormGroup>
          )
        })}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}
export default withRouter(ContestCreateForm)
