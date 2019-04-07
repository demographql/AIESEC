import React from 'react';
import { Query } from 'react-apollo';
import { opportunityState } from '../../state'
import OpportunityPage from './Opportunity'
import { GET_OPPORTUNITY } from '../../queries/Opportunity.graphql'

const RenderContext = React.createContext({})

const { Provider, Consumer } = RenderContext

function getOpportunityData(data) {
  opportunityState.opportunityDetails = data
  opportunityState.backgroundList = data.Opportunity.backgrounds
  opportunityState.skillsList = data.Opportunity.skills
}
class Opportunity extends React.PureComponent {
  static contextType = RenderContext
  render() {
      return (
        <Query query={GET_OPPORTUNITY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return (
                <React.Fragment>
                    <p>ERROR MEASSAGE : ${error.message}</p>
                    <p>{`Check your internet conection (or) Please try after sometimes`}</p>
                </React.Fragment>
            )
            if (data) {
                return (
                    <Provider value={data}>
                        {getOpportunityData(data)}
                        <OpportunityPage />
                    </Provider>
                )
            }
          }}
        </Query>
      )
  }
}

export default Opportunity
export { RenderContext, Opportunity }