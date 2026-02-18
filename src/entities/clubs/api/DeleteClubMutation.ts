import { graphql } from "react-relay";

export const DeleteClubMutation = graphql`
  mutation DeleteClubMutation($id: uuid!) {
    delete_clubs_by_pk(id: $id) {
      id
    }
  }
`;
