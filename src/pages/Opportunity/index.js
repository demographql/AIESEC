import React from 'react';
import GeneralInfo from './GeneralInfo'
import Volunteer from './Volunteer'

class Opportunity extends React.PureComponent {
    render() {
        return (
            <div className={"opportunityWrapper"}>
                <GeneralInfo />
                <Volunteer />
            </div>
        )
    }
}

export default Opportunity