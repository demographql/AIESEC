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

export {
  Heading
}
