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

export const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      country
      description
      players {
        id
        name
        number
        age
        avatar_url
      }
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
