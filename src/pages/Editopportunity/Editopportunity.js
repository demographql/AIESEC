import React from 'react';
import { Query } from 'react-apollo';
import { GET_SKILLS, GET_BACKGROUNDS } from '../../queries/Opportunity.graphql'
import { Link } from "react-router-dom"
import { EditOpportunity } from '../../templates/editOpportunity'
import { opportunityState } from '../../state'

class Editopportunity extends React.Component {
  render() {
      const data = opportunityState.opportunityDetails && opportunityState.opportunityDetails.Opportunity
      if(data) {
          return (
            <Query query={GET_SKILLS}>
              {({ loading: skillsLoading, error: skillsError, data: skillsData }) => (
                <Query query={GET_BACKGROUNDS}>
                  {({ loading: backgroundloading, error: backgroundError, data: backgroundData}) => {
                    if (skillsLoading || backgroundloading) return <p>Loading...</p>
                    if (skillsError || backgroundError) return (
                        <React.Fragment>
                            <p>ERROR MEASSAGE : ${skillsError.message || backgroundError.message}</p>
                            <p>{`Check your internet conection (or) Please try after sometimes`}</p>
                        </React.Fragment>
                    )
                    const listData = {skills: skillsData.skills, backgrounds: backgroundData.backgrounds}
                    return (
                        <EditOpportunity context={listData}/>
                    )
                  }}
                </Query>
              )}
            </Query>
          )
      }
      return (
          <React.Fragment>
              <div>Something went wrong, Navigate to home page.</div>
              <Link to="/">HOME PAGE</Link>
          </React.Fragment>
      )
  }
}

export default Editopportunity
export { Editopportunity }