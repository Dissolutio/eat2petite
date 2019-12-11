import React from 'react'
import styled from 'styled-components'

export const AppStyle = styled.div`
  min-height: 100%;
  color: var(--font-dark);
  background-color: var(--app-bg);
  background-image: linear-gradient(350deg, var(--white), var(--gray1));
`

export const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 960px;
  min-height: 100vh;
`
