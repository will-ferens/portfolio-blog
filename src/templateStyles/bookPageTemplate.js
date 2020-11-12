import styled from '@emotion/styled'

export const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 27.5% auto 1fr 27.5%;
    grid-gap: 16px;
    padding-bottom: 48px;
    @media(max-width: 599px) { 
        grid-template-columns: 2% 1fr 3fr 2%;
    }
`

export const CoverContainer = styled.div`
    grid-column: 2;
    .gatsby-image-wrapper {
        width: 250px;
    }
    @media(max-width: 599px) { 
        .gatsby-image-wrapper {
            width: 150px;
        }
    }
`

export const TitleContainer = styled.div`
    grid-column: 3; 
    h1 {
        font-style: italic;
        margin-bottom: 6px;
    }
    @media(max-width: 599px) { 
    }
`
