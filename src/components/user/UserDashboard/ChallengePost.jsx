import React, { useState } from 'react'
import { Button, Form, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { format, addDays, isSameDay, differenceInCalendarDays } from 'date-fns'

import { useDataContext } from '../../../contexts/useDataContext'

export default function ChallengePost(props) {
  const { savePost } = useDataContext()
  const { userSelectedContest, selectedDate, formDisabled, me, currentPost, currentChallenge, challenges } = props
  const [quantityDrank, setQuantityDrank] = useState(0)
  const [quantityDrankUnits, setQuantityDrankUnits] = useState('cups')
  React.useEffect(() => {
    if (currentPost) {
      setQuantityDrank(currentPost.quantityDrank)
      setQuantityDrankUnits(currentPost.quantityDrankUnits)
    }
  }, [currentPost])
  if (!currentChallenge) {
    return null
  }
  if (currentChallenge) {
    console.log("TCL: ChallengePost -> currentChallenge", currentChallenge)

    const userTargetForDate = me.challengeTargetsForDates && me.challengeTargetsForDates[`${format(new Date(selectedDate), 'yyyy-MM-dd')}`]
    const userChallengeTarget = me.challengeTargets && me.challengeTargets[currentChallenge.uid]
    const currentPostHasTarget = currentPost && currentPost.target
    const challengeDefaultTarget = challenges[currentChallenge.uid] && challenges[currentChallenge.uid].defaultTarget
    const newPostTarget = userTargetForDate || userChallengeTarget || challengeDefaultTarget
    const updatedPostTarget = userTargetForDate || currentPostHasTarget || userChallengeTarget || challengeDefaultTarget
    const selectedDateIsAfterToday = differenceInCalendarDays(new Date(), new Date(selectedDate)) < 0


    function handleQuantityDrankInput(event) {
      setQuantityDrank(event.target.value)
    }
    function handleQuantityDrankUnitsChange(event) {
      setQuantityDrankUnits(event.target.value)
    }

    function initialPost() {
      if (selectedDateIsAfterToday) { return }
      // currentPost from props from UserContestDashboard
      if (currentPost) { return }
      return buildNewPost()
    }
    if (initialPost() && !currentPost) {
      savePost(initialPost())
    }

    function buildUpdatePost(event) {
      return {
        ...currentPost,
        quantityDrank,
        quantityDrankUnits: (event && event.target && event.target.quantityDrankUnits.value) || currentPost.quantityDrankUnits,
        lastEditedAt: (new Date()).toString(),
        target: updatedPostTarget,
      }
    }
    function buildNewPost() {
      const createdAt = (new Date()).toString()
      const postDate = format(new Date(selectedDate), 'P')
      const checkedInBonus = isSameDay(new Date(createdAt), new Date(postDate))
      return {
        author: me.uid,
        userId: me.uid,
        uid: null,
        contestId: userSelectedContest.uid,
        challengeId: currentChallenge.uid,
        postDate,
        createdAt,
        quantityDrank,
        quantityDrankUnits: 'cups',
        checkedInBonus,
        lastEditedAt: createdAt,
        target: newPostTarget,
      }
    }

    const onSubmitForm = (event) => {
      event.preventDefault()
      savePost(buildUpdatePost(event))
    }
    return (
      <Form
        onSubmit={onSubmitForm}
        className="border border-primary rounded p-4 mt-4 mb-3 text-center">
        <h5 className='text-primary border-bottom border-primary'>{format(new Date(selectedDate), 'P')}</h5>
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
        <Button type="submit" disabled={formDisabled}>Submit</Button>
      </Form>
    )
  }
}
