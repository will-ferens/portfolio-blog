import styled from "@emotion/styled"
import { Theme } from "../../constants/globalStyles"

export const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  grid-gap: 0.25rem;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`
export const ImageWrapper = styled.div`
  max-height: 150px;
`
export const ExcerptWrapper = styled.div`
  margin-top: 0.5rem;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 3px;
  margin-bottom: 1rem;
  text-decoration: none;

  @media (max-width: 600px) {
    padding: 0;
    background-color: transparent;
  }
`
export const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  color: ${Theme.primaryPurple};
  text-decoration: none;
`
export const Author = styled.h4`
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
  font-weight: 300;
  color: #212121;
`
export const Excerpt = styled.p`
  font-size: 14px;
  line-height: 1.5;
  @media (max-width: 600px) {
    display: none;
  }
`

export const BookOverlay = styled.div`
  position: absolute;
  display: none;
  border: none;
  padding: 5px 20px 0 5px;
`