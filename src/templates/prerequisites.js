import React from 'react';
import { Heading, SigninWrapper, SigninContainer, SigninText, SigninButton, RequiredWrapper } from './styled'
import { wording } from './fixture'

class Prerequisites extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <Heading text={wording.prerequisitesText} size={"20px"}/>
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
            </React.Fragment>
        )
    }
}

export default Prerequisites
export { Prerequisites }