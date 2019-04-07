import { gql } from 'apollo-boost';

export const GET_OPPORTUNITY = gql`
  query GetOpportunity {
    Opportunity {
        id
        title
        location
        description
        duration
        positions
        earliestStartDate
        latestEndDate
        applicationsCloseDate
        nationalities {
            id
            name
        }
        skills {
            id
            name
        }
        backgrounds {
            id
            name
        }
        languages {
            id
            name
        }
        logistics_info {
            foodCovered
            foodProvided
            accommodationCovered
            accommodationProvided
        }
        legal_info {
            visaLink
            visaType
            visaDuration
            healthInsuranceInfo
        }
        role_info {
            city
            activities {
                id
                name
            }
            selectionProcess
        }
        specifics_info {
            salary
            computer
            workSchedule {
                from
                to
            }
        }
        sdg_info {
            id
            sdgTarget {
                id
                target
                parentId
                description
                goalId
                goalIndex
                targetIndex
            }
        }
        host_lc {
            id
            name
            fullName
            parentId
            country
        }	
    }
  }
`