import styled from '@emotion/styled'

export const Footer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 25% auto 25%;
    grid-gap: 16px;
    @media(max-width: 599px) { 
        display: block;
        margin: 0 auto;
        padding: 16px;
    }
`
export const FooterItem = styled.div`
    grid-column: 2; 
    width: 90%; 
    justify-self: center;
`
export const Mailto = styled.a`
    color: #3C3880;
    font-weight: bold;
    border-bottom: 2px solid #A8AAFF;
`

export const Social = styled.ul`
    display: flex;
    list-style: none;
    justify-content: space-between;
    padding: 32px 0;
    margin: 0;
`

export const SocialItem = styled.li`

`