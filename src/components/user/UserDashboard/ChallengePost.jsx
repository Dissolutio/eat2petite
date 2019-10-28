import React, { useState } from 'react'
import { Alert, Button, Form, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { format, addDays, isWithinInterval } from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'
import useInputValue from '../../../modules/hooks/useInputValue'

import { ReactComponent as CalendarIcon } from '../../../assets/calendar-tool-variant-for-time-administration.svg'

export default function ChallengePost(props) {
  const [formError, setFormError] = useState('')
  const [formDisabled, setFormDisabled] = useState(false)
  const [quantityDrank, setQuantityDrank] = useState(0)
  console.log("TCL: ChallengePost -> quantityDrank", quantityDrank)
  const { saveUserPost } = useDataContext()
  const { userSelectedContest, selectedDate, setSelectedDate, contestStartDate, contestEndDate, me, currentPost } = props
  const currentQuantityDrank = currentPost && currentPost.quantityDrank
  React.useEffect(() => {
    setQuantityDrank(currentQuantityDrank)
  }, [currentQuantityDrank, currentPost])
  const contestStartDateText = format(contestStartDate, 'LLL d')
  const todaysDateText = format(new Date(), 'LLL d')
  
  const dateChangeHandler = (event) => {
    // add one day, because the date input rounds downa day for some reason
    const newDate = addDays(new Date(event.target.value), 1)
    const isBetweenStartAndToday = isWithinInterval(newDate, {
      start: contestStartDate,
      end: new Date(),
    })
    if (!isBetweenStartAndToday) {
      setFormError(`You selected: ${format(newDate, 'P')}. Please choose a date between the contest start day and today.`)
      setFormDisabled(true)
      setTimeout(() => {
        setFormError('')
      }, 5000);
    }
    if (isBetweenStartAndToday) {
      setSelectedDate(newDate)
      setFormError(``)
      setFormDisabled(false)
    }
  }

  const handleQuantityDrankInput = (event) => {
    setQuantityDrank(event.target.value)
  }
  const onSubmitForm = (event) => {
    event.preventDefault()
    let newPost = {
      author: me.uid,
      userId: me.uid,
      uid: currentPost.uid,
      createdAt: new Date(),
      postDate: selectedDate,
      contestId: userSelectedContest.uid,
      quantityDrank: quantityDrank,
      quantityDrankUnits: event.target.quantityDrankUnits.value,
    }
    console.log('TCL: newPost', newPost)
    // saveUserPost(newPost)
  }
  return (
    <Form
      onSubmit={onSubmitForm}
      className="border border-primary rounded p-4 mt-4 mb-3 text-center">
      <h5 className='text-primary border-bottom border-primary'>Water Intake Challenge</h5>
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
        <Input name="quantity" type="number" disabled={formDisabled} bsSize='sm' defaultValue={currentQuantityDrank} onChange={handleQuantityDrankInput} />
      </InputGroup>
      <InputGroup size="sm">
        <Label for="quantityUnits" hidden>Units</Label>
        <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
        <Input type="select" name="quantityDrankUnits" defaultValue={currentPost ? currentPost.quantityDrankUnits : 'cups'} bsSize='sm'>
          <option value="cups">Cups</option>
          <option value="ounces">Ounces</option>
          <option value="liters">Liters</option>
        </Input>
      </InputGroup>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
