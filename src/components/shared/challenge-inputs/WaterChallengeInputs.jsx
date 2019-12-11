import React from 'react'
import { Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'

export default function WaterChallengeInputs({ quantityWaterDrank, quantityWaterDrankUnits }) {
  return (
    <>
      <InputGroup className='mb-2'>
        <Label for='quantityWaterDrank' hidden>
          Quantity
        </Label>
        <InputGroupAddon addonType='prepend'>Quantity</InputGroupAddon>
        <Input
          name='quantityWaterDrank'
          type='number'
          {...quantityWaterDrank}
        />
      </InputGroup>
      <InputGroup size='sm'>
        <Label for='quantityWaterDrankUnits' hidden>
          Units
        </Label>
        <InputGroupAddon addonType='prepend'>Units</InputGroupAddon>
        <Input
          disabled
          bsSize='sm'
          type='select'
          name='quantityWaterDrankUnits'
          {...quantityWaterDrankUnits}
        >
          <option value='cups'>Cups</option>
          <option value='ounces'>Ounces</option>
          <option value='liters'>Liters</option>
        </Input>
      </InputGroup>
    </>
  )
}
