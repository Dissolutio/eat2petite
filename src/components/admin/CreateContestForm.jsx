import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { format, addDays } from 'date-fns'
import { range } from 'lodash'

import { useDataContext } from '../../contexts/useDataContext'
import useInputValue from '../../modules/hooks/useInputValue'
import * as ROUTES from '../../routes'
import { ordinalSuffixOf } from '../../modules/functions'

const ContestCreateForm = (props) => {
  const { appData, createContest, enrollUserInContest } = useDataContext()
  const { users, challenges } = appData
  const [numberOfChallenges, setNumberOfChallenges] = useState(6)
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const title = useInputValue('Sample1')
  const daysPerChallenge = useInputValue(14)
  const orderSpotsArray = range(0, (parseInt(numberOfChallenges))).map(integer => `${integer}`)

  const handleStartDateChange = (event) => {
    // add one day, because `format` rounds down for some reason
    const newDate = addDays(new Date(event.target.value), 1)
    console.log(newDate)
    setStartDate(format(addDays(newDate, 1), 'yyyy-MM-dd'))
  }

  const createContestOnSubmit = async (event) => {
    event.preventDefault()
    const enrolledUsers = [...event.target.enrolledUsers]
      .filter((input) => input.checked)
      .map((input) => input.value)

    const orderOfChallenges = () => {
      let answer = {}
      for (let i = 0; i < orderSpotsArray.length; i++) {
        answer[`${i}`] = event.target[`order${i + 1}`].value
      }
      return answer
    }

    const newContest = {
      title: title.value,
      startDate: format(new Date(startDate), 'P'),
      daysPerChallenge: daysPerChallenge.value,
      orderOfChallenges: orderOfChallenges(),
      numberOfChallenges,
    }
    const newContestId = await createContest(newContest)
    enrolledUsers.forEach((userId) => {
      enrollUserInContest(userId, newContestId)
    })
    props.history.push(`${ROUTES.ADMIN_CONTESTS}${newContestId}`)
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
            onChange={(event) => {
              console.log("TCL: ContestCreateForm -> event.target.value", event.target.value)
              setNumberOfChallenges(event.target.value)
            }
            }
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
        {orderSpotsArray.map((index0ToNumOfChallenges) => {
          const orderSpot = parseInt(index0ToNumOfChallenges) + 1
          const arbitraryName = `order${orderSpot}` // order1, order2, ..., order(#OfChallenges)
          return (
            <FormGroup key={`${arbitraryName}`}>
              <Label for={`${arbitraryName}`}>{`${ordinalSuffixOf(orderSpot)}`}</Label>
              <Input type="select" name={`${arbitraryName}`}  >
                {Object.entries(challenges).map((entry) => {
                  const challengeKey = entry[0]
                  const challenge = entry[1]
                  return (
                    <option
                      key={`${challengeKey}${arbitraryName}`}
                      value={challengeKey}
                      selected={challengeKey === `challenge${orderSpot}`}
                    >
                      {challenge.challengeName}
                    </option>
                  )
                })}
              </Input>
            </FormGroup>
          )
        })}
        < Button type="submit" > Submit</Button>
      </Form>
    </Container >
  )
}
export default withRouter(ContestCreateForm)
