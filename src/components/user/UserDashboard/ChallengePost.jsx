import React, { useState } from 'react'
import { Alert, Button, Form, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { format, addDays, isWithinInterval } from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'

import { ReactComponent as CalendarIcon } from '../../../assets/calendar-tool-variant-for-time-administration.svg'

export default function ChallengePost(props) {

  const [quantityDrank, setQuantityDrank] = useState(0)
  const { savePost } = useDataContext()
  const { userSelectedContest, selectedDate, formError, dateChangeHandler, me, currentPost } = props
  console.log("TCL: ChallengePost -> currentPost", currentPost)
  const currentQuantityDrank = (currentPost && currentPost.quantityDrank) || 0
  React.useEffect(() => {
    setQuantityDrank(currentQuantityDrank)
  }, [selectedDate, currentQuantityDrank])

  // const contestStartDateText = format(contestStartDate, 'LLL d')
  // const todaysDateText = format(new Date(), 'LLL d')



  const handleQuantityDrankInput = (event) => {
    setQuantityDrank(event.target.value)
  }
  const onSubmitForm = (event) => {
    event.preventDefault()
    let newPost = {
      author: me.uid,
      userId: me.uid,
      uid: (currentPost && currentPost.uid) || null,
      createdAt: new Date(),
      postDate: format(addDays(new Date(selectedDate), 1), 'P'),
      contestId: userSelectedContest.uid,
      quantityDrank: quantityDrank,
      quantityDrankUnits: event.target.quantityDrankUnits.value,
    }
    console.log('TCL: newPost', newPost)
    savePost(newPost)
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
        <Input name="quantity" type="number" bsSize='sm' value={quantityDrank} onChange={handleQuantityDrankInput} />
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
