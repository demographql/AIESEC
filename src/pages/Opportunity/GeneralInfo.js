import React from 'react';
import {GeneralInfoHeader, Overview, Prerequisites, Visaandlogistic } from '../../templates'

class GeneralInfo extends React.PureComponent {
    render() {
        return (
            <div className={"general-info"}>
                <GeneralInfoHeader />
                <Overview />
                <Prerequisites />
                <Visaandlogistic />
            </div>
        )
    }
}

export default GeneralInfo