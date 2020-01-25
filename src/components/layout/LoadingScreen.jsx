import React from 'react'
import styled from 'styled-components';

import { brand } from 'assets/logo/brand.png'

export default function LoadingScreen() {
    return (
        <LoadingScreenStyle>
            <img src={brand} alt="website is loading" />
        </LoadingScreenStyle>
    )
}
const LoadingScreenStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--E2P-orange)
`;