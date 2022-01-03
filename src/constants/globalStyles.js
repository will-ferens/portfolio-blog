import styled from "@emotion/styled"

export const Theme = {
  primaryPurple: "#3C3880",
  accentedPurple: "#A8AAFF",
}
export const Container = styled.div`
  display: grid;
  grid-template-columns: 25% auto 25%;

  grid-gap: 16px;
  @media (max-width: 599px) {
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
  color: ${Theme.primaryPurple};
  text-decoration: none;
`
export const LargeImageWrapper = styled.div`
  .gatsby-image-wrapper {
    max-width: 150px;
  }
`

export const CtaAnchorTag = styled.a`
  color: ${Theme.primaryPurple};
  font-weight: bold;
  border-bottom: 2px solid ${Theme.accentedPurple};
`

export const Button = styled.button`
  border: 2px solid ${Theme.accentedPurple};
  background-color: #fff;
  cursor: pointer;
  border-radius: 3px;
  color: ${Theme.primaryPurple};
  &:hover {
    background-color: ${Theme.primaryPurple};
    border: 2px solid ${Theme.primaryPurple};
    color: #fff;
  }
`

export const darkTheme = {
  headerColor: "#5B024D",
  backgroundColor: "#121212",
  secondaryBackground: "#242424",
  text: "#dedede",
}
