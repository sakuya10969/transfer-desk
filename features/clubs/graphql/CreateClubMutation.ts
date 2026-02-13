import { graphql } from "react-relay";

export const CreateClubMutation = graphql`
  mutation CreateClubMutation($object: clubs_insert_input!) {
    insert_clubs_one(object: $object) {
      id
      name
      country
      league
      founded_year
      stadium
    }
  }
`;
