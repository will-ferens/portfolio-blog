import styled from '@emotion/styled'

export const Header = styled.div`
    padding: 1.45rem 1.0875rem;
    display: grid;
    grid-template-columns: 25% auto 25%;
    @media(max-width: 599px) {
        margin: 0px auto;
        max-width: 350;
        padding: 1.45rem 1.0875rem 0 1.0875rem;
        display: flex;
        justify-content: space-between;
    }
`

export const LinkWrapper = styled.div`
    justify-self: center;
    margin-top: 10px;
    width: 90%;
    @media(max-width: 599px) { 
        display: flex;
        align-items: center;
    }
`

