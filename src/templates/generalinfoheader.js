import React from 'react';
import { wording } from './fixture'

class GeneralInfoHeader extends React.PureComponent {
    render() {
        return (
            <div className={"general-nav-wrapper"}>
                <div className={"general-nav-item"}>
                    {wording.overviewText}
                </div>
                <div className={"general-nav-item"}>
                    {wording.prerequisitesText}
                </div>
                <div className={"general-nav-item"}>
                    {wording.logisticsText}
                </div>
            </div>
        )
    }
}

export default GeneralInfoHeader
export { GeneralInfoHeader }