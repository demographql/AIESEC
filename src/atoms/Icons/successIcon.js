import React from 'react'
import { StyledSvg, StyledSuccessCircle, StyledPolyline } from './styled'

class SuccessIcon extends React.Component {
    render() {
        return (
            <StyledSvg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 50 50">
                <g>
                    <StyledSuccessCircle cx="25" cy="25" r="25"/>
                    <StyledPolyline points="38,15 22,33 12,25 "/>
                </g>
            </StyledSvg>
        )
    }
}

export default SuccessIcon
export { SuccessIcon }