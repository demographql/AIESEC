import styled, {css} from 'styled-components'

const StyledSvg = styled.svg`
    width:12px;
    padding-bottom: 2px;
    ${props => props.cancel && css`
        width: 20px;
        height: 20px;
    `};
`
const StyledPlus = styled(StyledSvg)`
    width: 20px;
    path {
        fill: #037ef3;
    }
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
    StyledPlus,
}