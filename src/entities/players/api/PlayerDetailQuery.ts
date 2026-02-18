import { graphql } from "react-relay";

export const PlayerDetailQuery = graphql`
  query PlayerDetailQuery($id: uuid!) {
    players_by_pk(id: $id) {
      id
      name
      position
      nationality
      birth_date
      created_at
      updated_at
      club {
        id
        name
      }
      contracts {
        id
        start_date
        end_date
        salary
        clause
        club {
          id
          name
        }
      }
      transfers {
        id
        transfer_year
        transfer_month
        type
        fee
        club {
          id
          name
        }
        clubByToClubId {
          id
          name
        }
      }
      stats(order_by: [{ season: desc }]) {
        id
        season
        matches
        goals
        assists
        club {
          id
          name
        }
      }
    }
  }
`;
