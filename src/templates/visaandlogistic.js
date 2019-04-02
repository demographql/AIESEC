import React from 'react';
import { Heading } from './styled'
import { wording } from './fixture'

class Visaandlogistic extends React.PureComponent {
    render() {
        return (
            <Heading text={wording.logisticsText} size={"20px"}/>
        )
    }
}

export default Visaandlogistic
export { Visaandlogistic }