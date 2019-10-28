import React, { useState } from 'react'
import { Button, Form, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { format, addDays } from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'

export default function ChallengePost(props) {

  const [quantityDrank, setQuantityDrank] = useState(0)
  const [quantityDrankUnits, setQuantityDrankUnits] = useState('cups')
  const { savePost } = useDataContext()
  const { userSelectedContest, selectedDate, formDisabled, me, currentPost } = props

  const currentQuantityDrank = (currentPost && currentPost.quantityDrank) || 0
  const currentQuantityDrankUnits = (currentPost && currentPost.quantityDrankUnits) || 'cups'
  React.useEffect(() => {
    setQuantityDrank(currentQuantityDrank)
    setQuantityDrankUnits(currentQuantityDrankUnits)
  }, [selectedDate, currentQuantityDrank, currentQuantityDrankUnits])

  const formattedSelectedDate = format(addDays(new Date(selectedDate), 1), 'P')

  const handleQuantityDrankInput = (event) => {
    setQuantityDrank(event.target.value)
  }
  const handleQuantityDrankUnitsChange = (event) => {
    setQuantityDrankUnits(event.target.value)
  }
  const onSubmitForm = (event) => {
    event.preventDefault()
    let newPost = {
      author: me.uid,
      userId: me.uid,
      uid: (currentPost && currentPost.uid) || null,
      createdAt: new Date(),
      postDate: formattedSelectedDate,
      contestId: userSelectedContest.uid,
      quantityDrank: quantityDrank,
      quantityDrankUnits: event.target.quantityDrankUnits.value,
    }
    savePost(newPost)
  }
  return (
    <Form
      onSubmit={onSubmitForm}
      className="border border-primary rounded p-4 mt-4 mb-3 text-center">
      <h5 className='text-primary border-bottom border-primary'>{format(addDays(new Date(selectedDate), 1), 'P')}</h5>
      <fieldset disabled={formDisabled}>
        <InputGroup size="sm">
          <Label for="quantity" hidden>Quantity</Label>
          <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
          <Input name="quantity" type="number" bsSize='sm' value={quantityDrank} onChange={handleQuantityDrankInput} />
        </InputGroup>
        <InputGroup size="sm">
          <Label for="quantityUnits" hidden>Units</Label>
          <InputGroupAddon addonType="prepend">Units</InputGroupAddon>
          <Input type="select" name="quantityDrankUnits" value={quantityDrankUnits} onChange={handleQuantityDrankUnitsChange} bsSize='sm'>
            <option value="cups">Cups</option>
            <option value="ounces">Ounces</option>
            <option value="liters">Liters</option>
          </Input>
        </InputGroup>
      </fieldset>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
