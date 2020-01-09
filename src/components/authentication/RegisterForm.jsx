import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Alert, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'

import { useFirebaseContext } from '../../contexts/useFirebaseContext'
import useInputValue from 'hooks/useInputValue'

const RegisterForm = () => {
  const firebaseApp = useFirebaseContext()
  const username = useInputValue('')
  const firstName = useInputValue('')
  const lastName = useInputValue('')
  const userWeight = useInputValue(100)
  const email = useInputValue('')
  const password = useInputValue('')
  const passwordVerify = useInputValue('')
  const [formError, setFormError] = useState({ code: '', message: '' })
  const onFormSubmit = event => {
    event.preventDefault()
    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      userWeight: userWeight.value,
      userHeightFeet: event.target.userHeightFeet.value,
      userHeightInches: event.target.userHeightInches.value,
      username: username.value,
      email: email.value,
      userRole: 'default',
    }
    const userPassword = password.value
    console.log("Sign Up, User", user)
    firebaseApp.doCreateNewUser(user, userPassword).then(response => console.log(response)).catch(error => setFormError(error))
  }

  const isInvalid =
    password.value !== passwordVerify.value ||
    password.value === '' ||
    email.value === '' ||
    username.value === ''
  return (
    <Container>
      <Form
        className='p-2 border border-primary rounded text-center'
        onSubmit={onFormSubmit}>
        <h2>Sign Up</h2>
        {formError && formError.message ? (
          <Alert color='danger'>
            <h6>{formError.code}</h6>
            <p>{formError.message}\</p>
          </Alert>
        ) : null}
        <FormGroup>
          <Label htmlFor='username'>
            Username:
              <Input
              type='text'
              {...username}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='firstName'>
            First Name:
              <Input type='text' {...firstName} />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='lastName'>
            Last Name:
              <Input type='text' {...lastName} />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='userWeight'>
            Your weight in pounds:
              <Input type='text' {...userWeight} />
          </Label>
        </FormGroup>
        <FormGroup>
          Height:
              <InputGroup>
            <Input type='select' name='userHeightFeet' id='userHeightFeet' defaultValue='5'>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </Input>
            <InputGroupAddon addonType="append">
              <InputGroupText>feet</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <Input type='select' name='userHeightInches' id='userHeightInches'>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
            </Input>
            <InputGroupAddon addonType="append">
              <InputGroupText>inches</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='email'>
            Email address:
            <Input type='text' placeholder='Email' {...email} />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>
            Password:
            <Input type='password' placeholder='Password' {...password} />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='passwordVerify'>
            Confirm password:
            <Input
              type='password'
              placeholder='Verify Password'
              {...passwordVerify}
            />
          </Label>
        </FormGroup>
        <Button type='submit' disabled={isInvalid} color={`${isInvalid ? 'secondary' : 'primary'}`}>
          SIGN UP!
        </Button>
      </Form>
    </Container>
  )
}

export default withRouter(RegisterForm)
