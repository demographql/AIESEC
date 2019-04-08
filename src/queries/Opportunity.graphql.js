import { gql } from 'apollo-boost';

const GET_OPPORTUNITY = gql`
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

const GET_SKILLS = gql`
  query GetSkills {
    skills {
        id
        name
        matchingOpportunity	
    }
  }
`
const GET_BACKGROUNDS = gql`
  query GetBackgrounds {
    backgrounds {
        id
        name
        matchingOpportunity	
    }
  }
`
const UPDATE_OPPORTUNITY = gql`
    mutation UpdateOpportunity($input: UpdateOpportunityDetails!) {
        UpdateOpportunity(input: $input) {
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
`;

export { GET_OPPORTUNITY, GET_SKILLS, GET_BACKGROUNDS, UPDATE_OPPORTUNITY }