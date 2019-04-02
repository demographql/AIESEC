import React from 'react';
import { Heading } from './styled'
import { wording } from './fixture'

class Prerequisites extends React.PureComponent {
    render() {
        return (
            <Heading text={wording.prerequisitesText} size={"20px"}/>
        )
    }
}

export default Prerequisites
export { Prerequisites }