import styled from 'styled-components'

import heroscapeLogo from '../../assets/hs-logo-black.jpg'

export const AppStyleContainer = styled.div`
    background-color: var(--black);
    background-image: url(${heroscapeLogo});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: contain;

    min-height: 100%;

    color: var(--font-light, #fff);
`

export const PageStyleContainer = styled.div`
    background-color: var(--transparent-black);
    min-height: 100vh;
`
export const GalleryStyleContainer = styled.div`
    color: var(--font-light, #fff);
`
