import styled from '@emotion/styled'

export const Container = styled.div`
    display: grid;
    grid-template-columns: 25% auto 25%;
   
    grid-gap: 16px;
    @media(max-width: 599px) {
        display: block;
        margin: 0 auto 8rem;
        max-width: 350px;
    }
`

export const ContainerItem = styled.div`
    grid-column: 2;
    justify-self: center;
    width: 90%;
    padding: 16px 0;
`

export const Heading1 = styled.h1`
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1;
    color: #3C3880;
    text-decoration: none;
`
export const LargeImageWrapper = styled.div`
    .gatsby-image-wrapper {
        max-width: 150px;
    }
`

export const CtaAnchorTag = styled.a`
    color: #3C3880;
    font-weight: bold;
    border-bottom: 2px solid #A8AAFF;
`


export const darkTheme = {
    headerColor: 'C0BDFF',
    backgroundColor: '#121212',
    secondaryBackground: '#242424',
    text: '#dedede'
}

