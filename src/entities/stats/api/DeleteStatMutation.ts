import { graphql } from "react-relay";

export const DeleteStatMutation = graphql`
  mutation DeleteStatMutation($id: uuid!) {
    delete_stats_by_pk(id: $id) {
      id
    }
  }
`;
