import React from 'react'
import { Container, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { useDataContext } from '../../contexts/useDataContext'
import { useAuthUserContext } from '../../contexts/useAuthUserContext'
import { format, addDays, isWithinInterval } from 'date-fns'
import useInputValue from '../../modules/hooks/useInputValue'

export default function WaterChallengePostForm(props) {
  const { saveUserPost } = useDataContext()
  const { user } = useAuthUserContext()
  const {
    selectedDate,
    setSelectedDate,
    contestStartDate,
    contestEndDate,
    userSelectedContest,
  } = props

  const contestStartDateText = format(contestStartDate, 'LLL d')
  const todaysDateText = format(new Date(), 'LLL d')
  const dateChangeHandler = (event) => {
    // add one day, because the date input rounds downa day for some reason
    const newDate = addDays(new Date(event.target.value), 1)
    if (
      isWithinInterval(newDate, {
        start: contestStartDate,
        end: new Date(),
      })
    ) {
      setSelectedDate(newDate)
    }
  }
  const quantityDrank = useInputValue(0)
  const onSubmitForm = (event) => {
    event.preventDefault()
    let newPost = {
      author: user.uid,
      userId: user.uid,
      createdAt: new Date(),
      postDate: selectedDate,
      contestId: userSelectedContest.uid,
      quantityDrank: quantityDrank.value,
      quantityDrankUnits: event.target.quantityUnits.value,
    }
    console.log('TCL: newPost', newPost)
    // saveUserPost(newPost)
  }
  return (
    <Container>
      <Form
        onSubmit={onSubmitForm}
        className="border border-primary rounded p-4 mt-4 mb-3 text-center">
        <h5 className='text-primary border-bottom border-primary'>Water Challenge</h5>
        <FormGroup>
          <Label for="postDate">Post Date</Label>
          <span className='small d-block text-muted'>{`${contestStartDateText} - ${todaysDateText}`}</span>
          <Input
            name="postDate"
            type="date"
            onChange={dateChangeHandler}
            value={selectedDate}
          />
        </FormGroup>
        <InputGroup size="sm">
          <Label for="quantity" hidden>Quantity</Label>
          <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
          <Input name="quantity" type="number" bsSize='sm' {...quantityDrank} />
        </InputGroup>
        <InputGroup size="sm">
          <Label for="quantityUnits" hidden>Units</Label>
          <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
          <Input type="select" name="quantityUnits" defaultValue="cups" bsSize='sm'>
            <option value="cups">Cups</option>
            <option value="ounces">Ounces</option>
            <option value="liters">Liters</option>
          </Input>
        </InputGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}
