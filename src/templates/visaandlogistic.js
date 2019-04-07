import React from 'react';
import { RenderContext } from '../pages/Opportunity'
import { renderHeadingWithContent, renderWorkingHours, renderVisaInfo, renderLogistics } from './deps'
import { Heading } from './styled'
import { wording } from './fixture'

class Visaandlogistic extends React.PureComponent {
    static contextType = RenderContext

    renderChildren = (context) => {
        const { host_lc, legal_info, specifics_info, logistics_info } = context.Opportunity
        const { hostOfficeHeading, healthInsurance } = wording
        return (
            <React.Fragment>
                <Heading text={wording.logisticsText}  heading={`mainheading`} />
                {specifics_info.workSchedule && 
                    renderWorkingHours(specifics_info.workSchedule)}
                {logistics_info && renderLogistics(logistics_info)}
                {renderVisaInfo(legal_info)}
                {legal_info.healthInsuranceInfo && 
                    renderHeadingWithContent(legal_info.healthInsuranceInfo, healthInsurance)}
                {host_lc.fullName && 
                    renderHeadingWithContent(host_lc.fullName, hostOfficeHeading)}
            </React.Fragment>
        )
    }
    render() {
        return (
            <RenderContext.Consumer>
                {context => {
                    return this.renderChildren(context)
                }}
            </RenderContext.Consumer>
        )
    }
}

export default Visaandlogistic
export { Visaandlogistic }