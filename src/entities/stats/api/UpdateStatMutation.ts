import { graphql } from "react-relay";

export const UpdateStatMutation = graphql`
  mutation UpdateStatMutation($id: uuid!, $set: stats_set_input!) {
    update_stats_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      season
      matches
      goals
      assists
    }
  }
`;
