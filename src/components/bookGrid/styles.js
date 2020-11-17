import styled from '@emotion/styled'

export const BookGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: auto;
    grid-gap: .25rem;
    @media(max-width: 991px) { 
        grid-template-columns: repeat(3, 1fr);
    }
    @media(max-width: 599px) { 
        grid-template-columns: repeat(2, 1fr);
    }
`

export const Book = styled.article`
`