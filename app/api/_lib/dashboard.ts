import { hasuraFetch } from "@/app/api/_lib/hasuraClient";
import { getRequest } from "relay-runtime";

import { DashboardQuery } from "@/features/dashboard/graphql/DashboardQuery";

const DASHBOARD_QUERY = getRequest(DashboardQuery).params.text;
if (!DASHBOARD_QUERY) {
  throw new Error("DashboardQuery text is unavailable");
}

type DashboardResult = {
  clubs_aggregate: { aggregate: { count: number } | null };
  players_aggregate: { aggregate: { count: number } | null };
  contracts_aggregate: { aggregate: { count: number } | null };
  transfers_aggregate: { aggregate: { count: number } | null };
  recent_clubs: Array<{
    id: string;
    name: string;
    league: string | null;
    country: string | null;
    updated_at: string;
  }>;
  recent_players: Array<{
    id: string;
    name: string;
    position: string | null;
    current_club: { id: string; name: string } | null;
  }>;
  recent_transfers: Array<{
    id: string;
    transfer_year: number;
    transfer_month: number;
    type: string;
    fee: number | null;
    player: { id: string; name: string };
    from_club: { id: string; name: string } | null;
    to_club: { id: string; name: string };
  }>;
};

export async function getDashboard() {
  return hasuraFetch<DashboardResult>(DASHBOARD_QUERY);
}
