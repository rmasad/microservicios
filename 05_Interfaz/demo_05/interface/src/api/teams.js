import { gql } from '@apollo/client';

export const LIST_TEAMS = gql`
  query {
    listTeams {
      id
      name
      country
    }
  }
`;

export const CREATE_TEAM = gql`
mutation (
  $name: String!,
  $country: String!,
  $description: String
) {
  createTeam(name: $name, country: $country, description: $description) {
    id
  }
}
`;
