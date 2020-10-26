import styled from '@emotion/styled'

export const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 25% 1fr 1fr 25%;
    
`

export const CoverContainer = styled.div`
    grid-column: 2;
    justify-self: center;
    .gatsby-image-wrapper {
        width: 250px;
    }
`

export const TitleContainer = styled.div`
    grid-column: 3;
    justify-self: center;
    h1 {
        font-style: italic;
        margin-bottom: 6px;
    }
`