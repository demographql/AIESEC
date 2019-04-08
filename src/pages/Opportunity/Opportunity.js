import React from 'react';
import {observer} from 'mobx-react'
import GeneralInfo from './GeneralInfo'
import Volunteer from './Volunteer'
import { opportunityState } from '../../state'

class Opportunity extends React.Component {
    render() {
        return (
            <div className={"opportunityWrapper"}>
                <h1>{opportunityState.opportunityDetails.Opportunity.title}</h1>
                <div className={"opportunityCont"}>
                    <GeneralInfo />
                    <Volunteer />
                </div>
            </div>
        )
    }
}

export default observer(Opportunity)