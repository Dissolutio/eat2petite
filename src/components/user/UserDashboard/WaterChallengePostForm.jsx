import React, { useState } from 'react'
import { Alert, Button, Form, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { format, addDays, isWithinInterval } from 'date-fns'

import { useDataContext } from '../../contexts/useDataContext'
import useInputValue from '../../modules/hooks/useInputValue'

import { ReactComponent as CalendarIcon } from '../../assets/calendar-tool-variant-for-time-administration.svg'

export default function WaterChallengePostForm(props) {
  const [formError, setFormError] = useState()
  const { saveUserPost } = useDataContext()
  const { userSelectedContest, selectedDate, setSelectedDate, contestStartDate, contestEndDate, datePostObjects, me } = props

  const contestStartDateText = format(contestStartDate, 'LLL d')
  const todaysDateText = format(new Date(), 'LLL d')
  const dateChangeHandler = (event) => {
    // add one day, because the date input rounds downa day for some reason
    const newDate = addDays(new Date(event.target.value), 1)
    const isBetweenStartAndToday = isWithinInterval(newDate, {
      start: contestStartDate,
      end: new Date(),
    })
    const currentDatePostObject = datePostObjects.find(post => post.postDate === selectedDate)
    console.log("TCL: ChallengePost -> currentDatePostObject", currentDatePostObject)
    if (!isBetweenStartAndToday) {
      setFormError(`The date you selected (${format(newDate, 'P')}) is not a valid choice -- please choose a contest day past or present.`)
    }
    if (isBetweenStartAndToday) {
      setSelectedDate(newDate)
      setFormError(``)
    }
  }
  const quantityDrank = useInputValue(0)
  const onSubmitForm = (event) => {
    event.preventDefault()
    let newPost = {
      author: me.uid,
      userId: me.uid,
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
    <Form
      onSubmit={onSubmitForm}
      className="border border-primary rounded p-4 mt-4 mb-3 text-center">
      <h5 className='text-primary border-bottom border-primary'>Water Challenge</h5>
      {formError && <Alert color="danger">{formError}</Alert>}
      <InputGroup size="sm">
        <Label for="postDate" hidden>Post Date</Label>
        <InputGroupAddon addonType="prepend"><CalendarIcon /></InputGroupAddon>
        <Input
          name="postDate"
          type="date"
          onChange={dateChangeHandler}
          value={selectedDate}
        />
      </InputGroup>
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
  )
}
