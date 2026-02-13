import { graphql } from "react-relay";

export const ClubDetailQuery = graphql`
  query ClubDetailQuery($id: uuid!) {
    clubs_by_pk(id: $id) {
      id
      name
      country
      league
      founded_year
      stadium
      created_at
      updated_at
      players {
        id
        name
        position
        nationality
      }
      contracts {
        id
        start_date
        end_date
        salary
        player {
          id
          name
        }
      }
      transfersByToClubId {
        id
        transfer_year
        transfer_month
        type
        fee
        player {
          id
          name
        }
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
        player {
          id
          name
        }
        clubByToClubId {
          id
          name
        }
      }
      stats {
        id
        season
        matches
        goals
        assists
        player {
          id
          name
        }
      }
    }
  }
`;
