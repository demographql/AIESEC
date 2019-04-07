import React from 'react';
import { Link } from "react-router-dom"
import {observer} from 'mobx-react'
import GeneralInfo from './GeneralInfo'
import Volunteer from './Volunteer'

class Opportunity extends React.Component {
    render() {
        return (
            <div className={"opportunityWrapper"}>
                <Link to="/edit-opportunity">Edit Opportunity</Link>
                <div>
                    <GeneralInfo />
                    <Volunteer />
                </div>
            </div>
        )
    }
}

export default observer(Opportunity)