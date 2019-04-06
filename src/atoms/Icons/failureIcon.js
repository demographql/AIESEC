import React from 'react'
import { StyledSvg, StyledFailureCircle, StyledPolyline } from './styled'

class FailureIcon extends React.Component {
    render() {
        return (
            <StyledSvg cancel={this.props.cancel} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 50 50">
                <g>
                    <StyledFailureCircle cx="25" cy="25" r="25"/>
                    <StyledPolyline points="16,34 25,25 34,16 "/>
                    <StyledPolyline points="16,16 25,25 34,34 "/>
                </g>
            </StyledSvg>
        )
    }
}

export default FailureIcon
export { FailureIcon }