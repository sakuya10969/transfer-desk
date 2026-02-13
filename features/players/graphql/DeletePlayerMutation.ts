import { graphql } from "react-relay";

export const DeletePlayerMutation = graphql`
  mutation DeletePlayerMutation($id: uuid!) {
    delete_players_by_pk(id: $id) {
      id
    }
  }
`;
