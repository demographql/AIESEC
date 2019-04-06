import React from 'react';
import { Query } from 'react-apollo';
import { opportunityState } from './state'
import Opportunity from './pages/Opportunity'
import { GET_OPPORTUNITY } from './getOpportunity.graphql'

const RenderContext = React.createContext({})

const { Provider, Consumer } = RenderContext

function test(data) {
  opportunityState.opportunityDetails = data
  opportunityState.backgroundList = data.Opportunity.backgrounds
  opportunityState.skillsList = data.Opportunity.skills
}
class PostViewer extends React.PureComponent {
  static contextType = RenderContext
  render() {
      return (
        <Query query={GET_OPPORTUNITY}>
          {({ loading, data }) => !loading && (
          <Provider value={data}>
            {test(data)}
            <Opportunity />
          </Provider>
          )}
        </Query>
      )
  }
}

export default PostViewer
export { RenderContext, PostViewer }