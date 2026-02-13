import { graphql } from "react-relay";

export const DashboardQuery = graphql`
  query DashboardQuery {
    clubs_aggregate {
      aggregate {
        count
      }
    }
    players_aggregate {
      aggregate {
        count
      }
    }
    contracts_aggregate {
      aggregate {
        count
      }
    }
    transfers_aggregate {
      aggregate {
        count
      }
    }
    recent_clubs: clubs(order_by: [{ updated_at: desc }], limit: 5) {
      id
      name
      league
      country
      updated_at
    }
    recent_players: players(order_by: [{ created_at: desc }], limit: 5) {
      id
      name
      position
      current_club {
        id
        name
      }
    }
    recent_transfers: transfers(order_by: [{ created_at: desc }], limit: 5) {
      id
      transfer_year
      transfer_month
      type
      fee
      player {
        id
        name
      }
      from_club {
        id
        name
      }
      to_club {
        id
        name
      }
    }
  }
`;
