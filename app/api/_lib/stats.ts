import { hasuraFetch } from "@/app/api/_lib/hasuraClient";
import { getRequest } from "relay-runtime";

import { CreateStatMutation } from "@/features/stats/graphql/CreateStatMutation";
import { DeleteStatMutation } from "@/features/stats/graphql/DeleteStatMutation";
import { StatDetailQuery } from "@/features/stats/graphql/StatDetailQuery";
import { StatsListQuery } from "@/features/stats/graphql/StatsListQuery";
import { UpdateStatMutation } from "@/features/stats/graphql/UpdateStatMutation";

const requireOperationText = (
  text: string | null | undefined,
  operationName: string,
) => {
  if (!text) throw new Error(`${operationName} text is unavailable`);
  return text;
};

export type CreateStatInput = {
  season: string;
  player_id: string;
  club_id: string;
  matches?: number | null;
  goals?: number | null;
  assists?: number | null;
};

export type UpdateStatInput = Partial<CreateStatInput>;

type StatListItem = {
  id: string;
  season: string;
  matches: number;
  goals: number;
  assists: number;
  player: { id: string; name: string };
  club: { id: string; name: string };
};

type GetStatsResult = {
  stats: StatListItem[];
};

type StatDetailResult = {
  stats_by_pk: StatListItem | null;
};

type CreateStatResult = {
  insert_stats_one: {
    id: string;
    season: string;
    player_id: string;
    club_id: string;
    matches: number;
    goals: number;
    assists: number;
  } | null;
};

type UpdateStatResult = {
  update_stats_by_pk: {
    id: string;
    season: string;
    matches: number;
    goals: number;
    assists: number;
  } | null;
};

type DeleteStatResult = {
  delete_stats_by_pk: { id: string } | null;
};

const STATS_LIST_QUERY = requireOperationText(
  getRequest(StatsListQuery).params.text,
  "StatsListQuery",
);
const STAT_DETAIL_QUERY = requireOperationText(
  getRequest(StatDetailQuery).params.text,
  "StatDetailQuery",
);
const CREATE_STAT_MUTATION = requireOperationText(
  getRequest(CreateStatMutation).params.text,
  "CreateStatMutation",
);
const UPDATE_STAT_MUTATION = requireOperationText(
  getRequest(UpdateStatMutation).params.text,
  "UpdateStatMutation",
);
const DELETE_STAT_MUTATION = requireOperationText(
  getRequest(DeleteStatMutation).params.text,
  "DeleteStatMutation",
);

export async function getStats(opts?: {
  limit?: number;
  offset?: number;
  search?: string;
  season?: string;
}) {
  const { limit = 100, offset = 0, search, season } = opts ?? {};
  const conditions: unknown[] = [];
  if (search) {
    conditions.push({
      _or: [
        { player: { name: { _ilike: `%${search}%` } } },
        { club: { name: { _ilike: `%${search}%` } } },
      ],
    });
  }
  if (season) {
    conditions.push({ season: { _eq: season } });
  }
  const where =
    conditions.length > 0
      ? conditions.length === 1
        ? conditions[0]
        : { _and: conditions }
      : null;

  const data = await hasuraFetch<GetStatsResult>(STATS_LIST_QUERY, {
    limit,
    offset,
    where,
    order_by: [{ season: "desc" }],
  });
  return data.stats;
}

export async function getStatById(id: string) {
  const data = await hasuraFetch<StatDetailResult>(STAT_DETAIL_QUERY, { id });
  return data.stats_by_pk;
}

export async function createStat(object: CreateStatInput) {
  const data = await hasuraFetch<CreateStatResult>(CREATE_STAT_MUTATION, {
    object,
  });
  return data.insert_stats_one;
}

export async function updateStat(id: string, set: UpdateStatInput) {
  const data = await hasuraFetch<UpdateStatResult>(UPDATE_STAT_MUTATION, {
    id,
    set,
  });
  return data.update_stats_by_pk;
}

export async function deleteStat(id: string) {
  const data = await hasuraFetch<DeleteStatResult>(DELETE_STAT_MUTATION, {
    id,
  });
  return data.delete_stats_by_pk;
}
