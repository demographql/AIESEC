import styled from 'styled-components'

const StyledSvg = styled.svg`
    width:12px;
    padding-bottom: 2px;
`
const StyledSuccessCircle = styled.circle`
    fill:#25AE88;
`
const StyledFailureCircle = styled.circle`
    fill:#D75A4A;
`
const StyledPolyline = styled.polyline`
    fill:none;
    stroke:#FFFFFF;
    stroke-width:2;
    stroke-linecap:round;
    stroke-linejoin:round;
    stroke-miterlimit:10;
`

export {
    StyledSvg,
    StyledSuccessCircle,
    StyledFailureCircle,
    StyledPolyline,
}