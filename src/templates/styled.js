import styled from 'styled-components'

const Heading = styled.div.attrs({
  children: (props) => props.text,
})`
  color: #4A4A4A;
  font-family: "Lato", sans-serif;
  font-size: 20px;
  font-weight: bold;
  padding-top: 20px;
  text-align: left;
  font-size: ${props => props.size};
`
const SigninWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export {
  Heading,
  SigninWrapper,
  SigninContainer,
  SigninText,
  SigninButton,
  RequiredWrapper
}
