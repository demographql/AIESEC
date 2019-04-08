import styled, { css } from 'styled-components'
import { Form } from 'react-advanced-form'
import { Inputs } from '../atoms'
import { Link } from "react-router-dom"

const HeadingContainer = styled.div`
  ${props => (props.heading === 'sideheading' || props.heading === 'pointheading')&& css`
    display: flex;
    `};
  ${props => props.heading === 'smallheading' && css`
    div {
      padding: 5px 0;
    }
  `};
`

const Heading = styled.div.attrs({
  children: (props) => props.text,
})`
  display: flex;
  align-items: center;
  color: #4A4A4A;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  text-align: left;
  padding: 0;
  font-size: 15px;
  
  ${props => props.heading === 'mainheading' && css`
    padding: 30px 0 0 0;
    font-size: 20px;
  `};

  ${props => props.heading === 'smallheading' && css`
    color: #9b9b9b;
    padding: 5px 0;
    font-size: 12px;
  `};

  ${props => props.heading === 'subheading' && css`
    padding: 13px 0;
    font-size: 16px;
  `};
  
  ${props => props.heading === 'sideheading' && css`
    padding: 13px 0;
    align-items: flex-start;
    flex: 0 0 20%;
  `};
  ${props => props.heading === 'pointheading' && css`
    padding: 0 0 13px 0;
  `};
`

const Content = styled.div`
  text-align: left;
  padding: 13px 0;
  padding-left: 40px;
  ${props => props.heading === 'pointheading' && css`
    padding: 0 0 13px 10px;
  `};
  ul {
    margin: 0;
    padding: 0;
  }
  li { 
    padding-bottom: ${props => props.heading === 'subheading'
      ? '1rem'
      : '0'
    };
  }
`

const SigninWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 13px 0;
`

const SigninContainer = styled.div`
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  background-color: #037ef3;
  border-radius: 2px;
  padding: 5px;
  line-height: 1.5;
`

const SigninButton = styled.div`
  padding: 5px;
  background-color: #fff;
  color: #037ef3;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
` 

const SigninText = styled.div`
  color: #fff;
  font-size: 16px;
  margin-right: 15px;
` 

const RequiredWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  > div {
    color: #4A4A4A;
  }
  > span {
    color: #F85A40;
    height: 17px;
  }
` 

const Image = styled.img`
    width: 220px;
    height: 70px;
    margin-top: 20px;
`
const BorderConatiner = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
  border-bottom: 1px solid #cbcbcb;
  ul {
    list-style-type: none;
  }
`
const LoginButton = styled.div`
  padding: 20px;
  margin: 25px;
  border-radius: 2px;
  background-color: #037ef3;
  color: #fff;
  display: inline-block;
`
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`
const StyledInput = styled(Inputs)`
  border-right-width: 0;
  border-top-width: 0;
  border-left-width: 0;
  border-color: #a0a0a0;
  flex: 0 0 80%;
  :focus {
    outline: none;
    border-color: #037ef3;
  }
`
const StyledLabel = styled.label`
  width: 100%;
  flex-direction: row;
  display: flex;
  ${StyledInput} {
    ${props => !props.domToShow && css`
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    `};
  }
  select {
    width: 237px;
  }
`

const InputTitle = styled.div`
  flex: 0 0 20%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
`
const StyledSpan = styled.span`
  flex: 0 0 100%;
  display: flex;
  align-items: center;
  div {
    margin: 1.5rem 0;
    &:not(:first-child) {
      padding-left: 20px;
    }
  }
  select, option {
    text-transform: capitalize;
  }
  ${StyledInput} {
    flex: 0 0 100%;
  }
`
const IconButton = styled.div`
  display: flex;
  padding-left: 10px;
`
const InputListWrap = styled.div`
  flex-basis: 100%;
}
`
const StyledLink = styled(Link)`
  color: white;
  background-color: #037ef3;
  color: #fff;
  text-decoration: none;
  padding: 20px;
  margin: 25px;
  border-radius: 2px;
  width: 200px;
`
const OverviewWrap = styled.div`
  padding-top: 50px;
`
const StyledButton = styled(LoginButton)`
  margin: 0px;
  width: 200px;
`
const GooglePlaceWrap = styled.div`
  margin: 1.5rem 0;
`
export {
  Heading,
  SigninWrapper,
  SigninContainer,
  SigninText,
  SigninButton,
  RequiredWrapper,
  HeadingContainer,
  Content,
  Image,
  BorderConatiner,
  LoginButton,
  StyledForm,
  StyledInput,
  InputTitle,
  StyledSpan,
  InputListWrap,
  IconButton,
  StyledLabel,
  StyledLink,
  OverviewWrap,
  StyledButton,
  GooglePlaceWrap
}
