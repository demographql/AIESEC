import React from 'react';
import { RenderContext } from '../pages/Opportunity'
import { renderHeadingWithContent } from './deps'
import { Heading, SigninWrapper, SigninContainer, SigninText, SigninButton, RequiredWrapper } from './styled'
import { wording } from './fixture'

class Prerequisites extends React.PureComponent {
    static contextType = RenderContext
      
    renderChildren = (context) => {
        const { skills, backgrounds, languages, nationalities } = context.Opportunity
        const { backgroundHeading, skillsHeading, citizenHeading, languagesHeading } = wording
        return (
            <React.Fragment>
                <Heading text={wording.prerequisitesText} heading={`mainheading`} />
                <SigninWrapper>
                    <SigninContainer>
                        <SigninText>You need to be signed in to apply.</SigninText>
                        <SigninButton>Sign In</SigninButton>
                    </SigninContainer>
                    <RequiredWrapper>
                        <span>&#10033;</span>
                        <div> - Required</div>
                    </RequiredWrapper>
                </SigninWrapper>
                {backgrounds && renderHeadingWithContent(backgrounds, backgroundHeading)}
                {skills && renderHeadingWithContent(skills, skillsHeading)}
                {languages && renderHeadingWithContent(languages, languagesHeading)}
                {nationalities && renderHeadingWithContent(nationalities, citizenHeading)}
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

export default Prerequisites
export { Prerequisites }