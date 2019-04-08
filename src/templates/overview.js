import React from 'react';
import { RenderContext } from '../pages/Opportunity'
import {
    renderHeadingWithContent
} from './deps'
import { Heading, OverviewWrap } from './styled'
import { wording } from './fixture'

class Overview extends React.PureComponent {
    static contextType = RenderContext

    renderChildren = (context) => {
        const { descriptionHeading, contentHeading, activitiesHeading} = wording
        const { sdg_info, description, role_info } = context.Opportunity
        const content = sdg_info && sdg_info.sdgTarget && sdg_info.sdgTarget.description
        const activities = role_info && role_info.activities && role_info.activities.length>0
        return (
            <OverviewWrap>
                <Heading text={wording.overviewText} heading={`mainheading`} />
                <Heading text={wording.overviewHeading} heading={`subheading`} />
                {content && renderHeadingWithContent(content, contentHeading, `subheading`)}
                {description && renderHeadingWithContent(description, descriptionHeading, `subheading`)}
                {activities && renderHeadingWithContent(role_info.activities, activitiesHeading, `subheading`)}
            </OverviewWrap>
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

export default Overview
export { Overview }