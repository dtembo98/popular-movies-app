import {Box} from "@material-ui/core"
import styled from "styled-components"

export const NoPage = () => {
  return (
    <StyledNotFoundContainer>
      <StyledErrorTitle>Page Not Found</StyledErrorTitle>
      <StyledErrorDescription>This page does not exist</StyledErrorDescription>
      <StyledErrorCode>
        Try to check the url you've entered is correct
      </StyledErrorCode>
    </StyledNotFoundContainer>
  )
}

const StyledNotFoundContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: "#000";
`
const StyledErrorTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`

const StyledErrorDescription = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`

const StyledErrorCode = styled.p`
  font-size: 10px;
  font-weight: 700;
`
