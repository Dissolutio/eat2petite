import React from 'react'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import { format, addDays, isWithinInterval } from 'date-fns'
export default function WaterChallengePostForm(props) {
  const { createUserPost } = useDataContext()
  const { user } = useAuthUserContext()
  const {
    selectedDate,
    setSelectedDate,
    contestStartDate,
    contestEndDate,
    userSelectedContest,
  } = props

  const dateChangeHandler = (event) => {
    // add one day, because the date input rounds downa day for some reason
    const newDate = addDays(new Date(event.target.value), 1)
    if (
      isWithinInterval(newDate, {
        start: contestStartDate,
        end: contestEndDate,
      })
    ) {
      setSelectedDate(newDate)
    }
  }
  const createPostOnSubmit = (event) => {
    event.preventDefault()
    let newPost = {
      author: user.uid,
      userId: user.uid,
      createdAt: new Date(),
      postDate: selectedDate,
      contestId: userSelectedContest.uid,
      postData: {
        quantity: event.target.quantity.value || 0,
        quantityUnits: event.target.quantityUnits.value,
      },
    }
    console.log('TCL: newPost', newPost)
    // createUserPost(newPost)
  }
  const today = format(new Date(), 'yyyy-MM-dd')
  return (
    <Container>
      <Form
        onSubmit={createPostOnSubmit}
        className="border border-primary rounded p-4 mt-4 mb-3 text-center">
        <h2>Water Challenge Post Form</h2>
        <FormGroup>
          <Label for="postDate">Post Date</Label>
          <Input
            name="postDate"
            type="date"
            onChange={dateChangeHandler}
            value={selectedDate}
          />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Quantity</Label>
          <Input name="quantity" type="number" placeholder="quantity" />
        </FormGroup>
        <FormGroup>
          <Label for="quantityUnits">Units</Label>
          <Input type="select" name="quantityUnits" defaultValue="cups">
            <option value="cups">Cups</option>
            <option value="ounces">Ounces</option>
            <option value="liters">Liters</option>
          </Input>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}
