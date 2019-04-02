import React from 'react';
import { Heading } from './styled'
import { wording } from './fixture'

class Overview extends React.PureComponent {
    render() {
        return (
            <Heading text={wording.overviewText} size={"20px"}/>
        )
    }
}

export default Overview
export { Overview }