import { gql } from '@apollo/client';


export const LIST_PLAYERS = gql`
query {
  listPlayers
  {
    id
    name
    age
    number
    avatar_url
    description
    team
    {
      id
      name
    }
  }
}
`;
