import { graphql } from "react-relay";

export const UpdateClubMutation = graphql`
  mutation UpdateClubMutation($id: uuid!, $set: clubs_set_input!) {
    update_clubs_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      name
      country
      league
      founded_year
      stadium
      updated_at
    }
  }
`;
