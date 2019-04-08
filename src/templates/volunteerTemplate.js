import React from 'react';
import { RenderContext } from '../pages/Opportunity'
import { renderHeadingWithContent, convertDate } from './deps'
import { Image, BorderConatiner, LoginButton, StyledLink } from './styled'
import { wording } from './fixture'

class VolunteerTemplate extends React.Component {
    renderChildren = (context) => {
        const { languages, earliestStartDate, latestEndDate, duration, positions, specifics_info } = context.Opportunity
        const { languageVolunteer, earliestStartText, latestEndText, durationText, salaryText, positionText } = wording
        const durations = duration && `${duration} Weeks`
        return (
            <React.Fragment>
                <Image src="https://s3-eu-west-1.amazonaws.com/cdn.expa.aiesec.org/icons-v2/gv-logo.png" />
                <BorderConatiner>
                    {languages && renderHeadingWithContent(languages, languageVolunteer, `smallheading`)}
                </BorderConatiner>
                <BorderConatiner>
                    {earliestStartDate && renderHeadingWithContent(convertDate(earliestStartDate), earliestStartText, `smallheading`)}
                    {latestEndDate && renderHeadingWithContent(convertDate(latestEndDate), latestEndText, `smallheading`)}
                    {duration && renderHeadingWithContent(durations, durationText, `smallheading`)}
                </BorderConatiner>
                <BorderConatiner>
                    {specifics_info && specifics_info.salary && renderHeadingWithContent(specifics_info.salary, salaryText, `smallheading`)}
                    {positions && renderHeadingWithContent(positions, positionText, `smallheading`)}
                </BorderConatiner>
                <LoginButton><StyledLink to="/edit-opportunity">Edit Opportunity</StyledLink></LoginButton>
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

export default VolunteerTemplate
export { VolunteerTemplate }