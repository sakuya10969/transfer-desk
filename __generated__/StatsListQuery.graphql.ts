/**
 * @generated SignedSource<<592c79a15f99e1c34de78040bd9f6c3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type contracts_select_column = "clause" | "club_id" | "created_at" | "end_date" | "id" | "player_id" | "salary" | "start_date" | "updated_at" | "%future added value";
export type order_by = "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | "%future added value";
export type players_select_column = "birth_date" | "created_at" | "current_club_id" | "id" | "name" | "nationality" | "position" | "updated_at" | "%future added value";
export type stats_select_column = "assists" | "club_id" | "created_at" | "goals" | "id" | "matches" | "player_id" | "season" | "updated_at" | "%future added value";
export type transfers_select_column = "created_at" | "fee" | "from_club_id" | "id" | "loan_end_month" | "loan_end_year" | "player_id" | "to_club_id" | "transfer_month" | "transfer_year" | "type" | "updated_at" | "%future added value";
export type stats_bool_exp = {
  _and?: ReadonlyArray<stats_bool_exp> | null | undefined;
  _not?: stats_bool_exp | null | undefined;
  _or?: ReadonlyArray<stats_bool_exp> | null | undefined;
  assists?: Int_comparison_exp | null | undefined;
  club?: clubs_bool_exp | null | undefined;
  club_id?: uuid_comparison_exp | null | undefined;
  created_at?: timestamp_comparison_exp | null | undefined;
  goals?: Int_comparison_exp | null | undefined;
  id?: uuid_comparison_exp | null | undefined;
  matches?: Int_comparison_exp | null | undefined;
  player?: players_bool_exp | null | undefined;
  player_id?: uuid_comparison_exp | null | undefined;
  season?: String_comparison_exp | null | undefined;
  updated_at?: timestamp_comparison_exp | null | undefined;
};
export type Int_comparison_exp = {
  _eq?: number | null | undefined;
  _gt?: number | null | undefined;
  _gte?: number | null | undefined;
  _in?: ReadonlyArray<number> | null | undefined;
  _is_null?: boolean | null | undefined;
  _lt?: number | null | undefined;
  _lte?: number | null | undefined;
  _neq?: number | null | undefined;
  _nin?: ReadonlyArray<number> | null | undefined;
};
export type clubs_bool_exp = {
  _and?: ReadonlyArray<clubs_bool_exp> | null | undefined;
  _not?: clubs_bool_exp | null | undefined;
  _or?: ReadonlyArray<clubs_bool_exp> | null | undefined;
  contracts?: contracts_bool_exp | null | undefined;
  contracts_aggregate?: contracts_aggregate_bool_exp | null | undefined;
  country?: String_comparison_exp | null | undefined;
  created_at?: timestamp_comparison_exp | null | undefined;
  founded_year?: Int_comparison_exp | null | undefined;
  id?: uuid_comparison_exp | null | undefined;
  league?: String_comparison_exp | null | undefined;
  name?: String_comparison_exp | null | undefined;
  players?: players_bool_exp | null | undefined;
  players_aggregate?: players_aggregate_bool_exp | null | undefined;
  stadium?: String_comparison_exp | null | undefined;
  stats?: stats_bool_exp | null | undefined;
  stats_aggregate?: stats_aggregate_bool_exp | null | undefined;
  transfers?: transfers_bool_exp | null | undefined;
  transfersByToClubId?: transfers_bool_exp | null | undefined;
  transfersByToClubId_aggregate?: transfers_aggregate_bool_exp | null | undefined;
  transfers_aggregate?: transfers_aggregate_bool_exp | null | undefined;
  updated_at?: timestamp_comparison_exp | null | undefined;
};
export type contracts_bool_exp = {
  _and?: ReadonlyArray<contracts_bool_exp> | null | undefined;
  _not?: contracts_bool_exp | null | undefined;
  _or?: ReadonlyArray<contracts_bool_exp> | null | undefined;
  clause?: Int_comparison_exp | null | undefined;
  club?: clubs_bool_exp | null | undefined;
  club_id?: uuid_comparison_exp | null | undefined;
  created_at?: timestamp_comparison_exp | null | undefined;
  end_date?: timestamp_comparison_exp | null | undefined;
  id?: uuid_comparison_exp | null | undefined;
  player?: players_bool_exp | null | undefined;
  player_id?: uuid_comparison_exp | null | undefined;
  salary?: Int_comparison_exp | null | undefined;
  start_date?: timestamp_comparison_exp | null | undefined;
  updated_at?: timestamp_comparison_exp | null | undefined;
};
export type uuid_comparison_exp = {
  _eq?: any | null | undefined;
  _gt?: any | null | undefined;
  _gte?: any | null | undefined;
  _in?: ReadonlyArray<any> | null | undefined;
  _is_null?: boolean | null | undefined;
  _lt?: any | null | undefined;
  _lte?: any | null | undefined;
  _neq?: any | null | undefined;
  _nin?: ReadonlyArray<any> | null | undefined;
};
export type timestamp_comparison_exp = {
  _eq?: any | null | undefined;
  _gt?: any | null | undefined;
  _gte?: any | null | undefined;
  _in?: ReadonlyArray<any> | null | undefined;
  _is_null?: boolean | null | undefined;
  _lt?: any | null | undefined;
  _lte?: any | null | undefined;
  _neq?: any | null | undefined;
  _nin?: ReadonlyArray<any> | null | undefined;
};
export type players_bool_exp = {
  _and?: ReadonlyArray<players_bool_exp> | null | undefined;
  _not?: players_bool_exp | null | undefined;
  _or?: ReadonlyArray<players_bool_exp> | null | undefined;
  birth_date?: timestamp_comparison_exp | null | undefined;
  club?: clubs_bool_exp | null | undefined;
  contracts?: contracts_bool_exp | null | undefined;
  contracts_aggregate?: contracts_aggregate_bool_exp | null | undefined;
  created_at?: timestamp_comparison_exp | null | undefined;
  current_club_id?: uuid_comparison_exp | null | undefined;
  id?: uuid_comparison_exp | null | undefined;
  name?: String_comparison_exp | null | undefined;
  nationality?: String_comparison_exp | null | undefined;
  position?: Position_comparison_exp | null | undefined;
  stats?: stats_bool_exp | null | undefined;
  stats_aggregate?: stats_aggregate_bool_exp | null | undefined;
  transfers?: transfers_bool_exp | null | undefined;
  transfers_aggregate?: transfers_aggregate_bool_exp | null | undefined;
  updated_at?: timestamp_comparison_exp | null | undefined;
};
export type contracts_aggregate_bool_exp = {
  count?: contracts_aggregate_bool_exp_count | null | undefined;
};
export type contracts_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<contracts_select_column> | null | undefined;
  distinct?: boolean | null | undefined;
  filter?: contracts_bool_exp | null | undefined;
  predicate: Int_comparison_exp;
};
export type String_comparison_exp = {
  _eq?: string | null | undefined;
  _gt?: string | null | undefined;
  _gte?: string | null | undefined;
  _ilike?: string | null | undefined;
  _in?: ReadonlyArray<string> | null | undefined;
  _iregex?: string | null | undefined;
  _is_null?: boolean | null | undefined;
  _like?: string | null | undefined;
  _lt?: string | null | undefined;
  _lte?: string | null | undefined;
  _neq?: string | null | undefined;
  _nilike?: string | null | undefined;
  _nin?: ReadonlyArray<string> | null | undefined;
  _niregex?: string | null | undefined;
  _nlike?: string | null | undefined;
  _nregex?: string | null | undefined;
  _nsimilar?: string | null | undefined;
  _regex?: string | null | undefined;
  _similar?: string | null | undefined;
};
export type Position_comparison_exp = {
  _eq?: any | null | undefined;
  _gt?: any | null | undefined;
  _gte?: any | null | undefined;
  _in?: ReadonlyArray<any> | null | undefined;
  _is_null?: boolean | null | undefined;
  _lt?: any | null | undefined;
  _lte?: any | null | undefined;
  _neq?: any | null | undefined;
  _nin?: ReadonlyArray<any> | null | undefined;
};
export type stats_aggregate_bool_exp = {
  count?: stats_aggregate_bool_exp_count | null | undefined;
};
export type stats_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<stats_select_column> | null | undefined;
  distinct?: boolean | null | undefined;
  filter?: stats_bool_exp | null | undefined;
  predicate: Int_comparison_exp;
};
export type transfers_bool_exp = {
  _and?: ReadonlyArray<transfers_bool_exp> | null | undefined;
  _not?: transfers_bool_exp | null | undefined;
  _or?: ReadonlyArray<transfers_bool_exp> | null | undefined;
  club?: clubs_bool_exp | null | undefined;
  clubByToClubId?: clubs_bool_exp | null | undefined;
  created_at?: timestamp_comparison_exp | null | undefined;
  fee?: Int_comparison_exp | null | undefined;
  from_club_id?: uuid_comparison_exp | null | undefined;
  id?: uuid_comparison_exp | null | undefined;
  loan_end_month?: Int_comparison_exp | null | undefined;
  loan_end_year?: Int_comparison_exp | null | undefined;
  player?: players_bool_exp | null | undefined;
  player_id?: uuid_comparison_exp | null | undefined;
  to_club_id?: uuid_comparison_exp | null | undefined;
  transfer_month?: Int_comparison_exp | null | undefined;
  transfer_year?: Int_comparison_exp | null | undefined;
  type?: TransferType_comparison_exp | null | undefined;
  updated_at?: timestamp_comparison_exp | null | undefined;
};
export type TransferType_comparison_exp = {
  _eq?: any | null | undefined;
  _gt?: any | null | undefined;
  _gte?: any | null | undefined;
  _in?: ReadonlyArray<any> | null | undefined;
  _is_null?: boolean | null | undefined;
  _lt?: any | null | undefined;
  _lte?: any | null | undefined;
  _neq?: any | null | undefined;
  _nin?: ReadonlyArray<any> | null | undefined;
};
export type transfers_aggregate_bool_exp = {
  count?: transfers_aggregate_bool_exp_count | null | undefined;
};
export type transfers_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<transfers_select_column> | null | undefined;
  distinct?: boolean | null | undefined;
  filter?: transfers_bool_exp | null | undefined;
  predicate: Int_comparison_exp;
};
export type players_aggregate_bool_exp = {
  count?: players_aggregate_bool_exp_count | null | undefined;
};
export type players_aggregate_bool_exp_count = {
  arguments?: ReadonlyArray<players_select_column> | null | undefined;
  distinct?: boolean | null | undefined;
  filter?: players_bool_exp | null | undefined;
  predicate: Int_comparison_exp;
};
export type stats_order_by = {
  assists?: order_by | null | undefined;
  club?: clubs_order_by | null | undefined;
  club_id?: order_by | null | undefined;
  created_at?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  id?: order_by | null | undefined;
  matches?: order_by | null | undefined;
  player?: players_order_by | null | undefined;
  player_id?: order_by | null | undefined;
  season?: order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type clubs_order_by = {
  contracts_aggregate?: contracts_aggregate_order_by | null | undefined;
  country?: order_by | null | undefined;
  created_at?: order_by | null | undefined;
  founded_year?: order_by | null | undefined;
  id?: order_by | null | undefined;
  league?: order_by | null | undefined;
  name?: order_by | null | undefined;
  players_aggregate?: players_aggregate_order_by | null | undefined;
  stadium?: order_by | null | undefined;
  stats_aggregate?: stats_aggregate_order_by | null | undefined;
  transfersByToClubId_aggregate?: transfers_aggregate_order_by | null | undefined;
  transfers_aggregate?: transfers_aggregate_order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type contracts_aggregate_order_by = {
  avg?: contracts_avg_order_by | null | undefined;
  count?: order_by | null | undefined;
  max?: contracts_max_order_by | null | undefined;
  min?: contracts_min_order_by | null | undefined;
  stddev?: contracts_stddev_order_by | null | undefined;
  stddev_pop?: contracts_stddev_pop_order_by | null | undefined;
  stddev_samp?: contracts_stddev_samp_order_by | null | undefined;
  sum?: contracts_sum_order_by | null | undefined;
  var_pop?: contracts_var_pop_order_by | null | undefined;
  var_samp?: contracts_var_samp_order_by | null | undefined;
  variance?: contracts_variance_order_by | null | undefined;
};
export type contracts_avg_order_by = {
  clause?: order_by | null | undefined;
  salary?: order_by | null | undefined;
};
export type contracts_max_order_by = {
  clause?: order_by | null | undefined;
  club_id?: order_by | null | undefined;
  created_at?: order_by | null | undefined;
  end_date?: order_by | null | undefined;
  id?: order_by | null | undefined;
  player_id?: order_by | null | undefined;
  salary?: order_by | null | undefined;
  start_date?: order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type contracts_min_order_by = {
  clause?: order_by | null | undefined;
  club_id?: order_by | null | undefined;
  created_at?: order_by | null | undefined;
  end_date?: order_by | null | undefined;
  id?: order_by | null | undefined;
  player_id?: order_by | null | undefined;
  salary?: order_by | null | undefined;
  start_date?: order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type contracts_stddev_order_by = {
  clause?: order_by | null | undefined;
  salary?: order_by | null | undefined;
};
export type contracts_stddev_pop_order_by = {
  clause?: order_by | null | undefined;
  salary?: order_by | null | undefined;
};
export type contracts_stddev_samp_order_by = {
  clause?: order_by | null | undefined;
  salary?: order_by | null | undefined;
};
export type contracts_sum_order_by = {
  clause?: order_by | null | undefined;
  salary?: order_by | null | undefined;
};
export type contracts_var_pop_order_by = {
  clause?: order_by | null | undefined;
  salary?: order_by | null | undefined;
};
export type contracts_var_samp_order_by = {
  clause?: order_by | null | undefined;
  salary?: order_by | null | undefined;
};
export type contracts_variance_order_by = {
  clause?: order_by | null | undefined;
  salary?: order_by | null | undefined;
};
export type players_aggregate_order_by = {
  count?: order_by | null | undefined;
  max?: players_max_order_by | null | undefined;
  min?: players_min_order_by | null | undefined;
};
export type players_max_order_by = {
  birth_date?: order_by | null | undefined;
  created_at?: order_by | null | undefined;
  current_club_id?: order_by | null | undefined;
  id?: order_by | null | undefined;
  name?: order_by | null | undefined;
  nationality?: order_by | null | undefined;
  position?: order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type players_min_order_by = {
  birth_date?: order_by | null | undefined;
  created_at?: order_by | null | undefined;
  current_club_id?: order_by | null | undefined;
  id?: order_by | null | undefined;
  name?: order_by | null | undefined;
  nationality?: order_by | null | undefined;
  position?: order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type stats_aggregate_order_by = {
  avg?: stats_avg_order_by | null | undefined;
  count?: order_by | null | undefined;
  max?: stats_max_order_by | null | undefined;
  min?: stats_min_order_by | null | undefined;
  stddev?: stats_stddev_order_by | null | undefined;
  stddev_pop?: stats_stddev_pop_order_by | null | undefined;
  stddev_samp?: stats_stddev_samp_order_by | null | undefined;
  sum?: stats_sum_order_by | null | undefined;
  var_pop?: stats_var_pop_order_by | null | undefined;
  var_samp?: stats_var_samp_order_by | null | undefined;
  variance?: stats_variance_order_by | null | undefined;
};
export type stats_avg_order_by = {
  assists?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  matches?: order_by | null | undefined;
};
export type stats_max_order_by = {
  assists?: order_by | null | undefined;
  club_id?: order_by | null | undefined;
  created_at?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  id?: order_by | null | undefined;
  matches?: order_by | null | undefined;
  player_id?: order_by | null | undefined;
  season?: order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type stats_min_order_by = {
  assists?: order_by | null | undefined;
  club_id?: order_by | null | undefined;
  created_at?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  id?: order_by | null | undefined;
  matches?: order_by | null | undefined;
  player_id?: order_by | null | undefined;
  season?: order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type stats_stddev_order_by = {
  assists?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  matches?: order_by | null | undefined;
};
export type stats_stddev_pop_order_by = {
  assists?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  matches?: order_by | null | undefined;
};
export type stats_stddev_samp_order_by = {
  assists?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  matches?: order_by | null | undefined;
};
export type stats_sum_order_by = {
  assists?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  matches?: order_by | null | undefined;
};
export type stats_var_pop_order_by = {
  assists?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  matches?: order_by | null | undefined;
};
export type stats_var_samp_order_by = {
  assists?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  matches?: order_by | null | undefined;
};
export type stats_variance_order_by = {
  assists?: order_by | null | undefined;
  goals?: order_by | null | undefined;
  matches?: order_by | null | undefined;
};
export type transfers_aggregate_order_by = {
  avg?: transfers_avg_order_by | null | undefined;
  count?: order_by | null | undefined;
  max?: transfers_max_order_by | null | undefined;
  min?: transfers_min_order_by | null | undefined;
  stddev?: transfers_stddev_order_by | null | undefined;
  stddev_pop?: transfers_stddev_pop_order_by | null | undefined;
  stddev_samp?: transfers_stddev_samp_order_by | null | undefined;
  sum?: transfers_sum_order_by | null | undefined;
  var_pop?: transfers_var_pop_order_by | null | undefined;
  var_samp?: transfers_var_samp_order_by | null | undefined;
  variance?: transfers_variance_order_by | null | undefined;
};
export type transfers_avg_order_by = {
  fee?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
};
export type transfers_max_order_by = {
  created_at?: order_by | null | undefined;
  fee?: order_by | null | undefined;
  from_club_id?: order_by | null | undefined;
  id?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  player_id?: order_by | null | undefined;
  to_club_id?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
  type?: order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type transfers_min_order_by = {
  created_at?: order_by | null | undefined;
  fee?: order_by | null | undefined;
  from_club_id?: order_by | null | undefined;
  id?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  player_id?: order_by | null | undefined;
  to_club_id?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
  type?: order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type transfers_stddev_order_by = {
  fee?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
};
export type transfers_stddev_pop_order_by = {
  fee?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
};
export type transfers_stddev_samp_order_by = {
  fee?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
};
export type transfers_sum_order_by = {
  fee?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
};
export type transfers_var_pop_order_by = {
  fee?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
};
export type transfers_var_samp_order_by = {
  fee?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
};
export type transfers_variance_order_by = {
  fee?: order_by | null | undefined;
  loan_end_month?: order_by | null | undefined;
  loan_end_year?: order_by | null | undefined;
  transfer_month?: order_by | null | undefined;
  transfer_year?: order_by | null | undefined;
};
export type players_order_by = {
  birth_date?: order_by | null | undefined;
  club?: clubs_order_by | null | undefined;
  contracts_aggregate?: contracts_aggregate_order_by | null | undefined;
  created_at?: order_by | null | undefined;
  current_club_id?: order_by | null | undefined;
  id?: order_by | null | undefined;
  name?: order_by | null | undefined;
  nationality?: order_by | null | undefined;
  position?: order_by | null | undefined;
  stats_aggregate?: stats_aggregate_order_by | null | undefined;
  transfers_aggregate?: transfers_aggregate_order_by | null | undefined;
  updated_at?: order_by | null | undefined;
};
export type StatsListQuery$variables = {
  limit: number;
  offset: number;
  order_by?: ReadonlyArray<stats_order_by> | null | undefined;
  where?: stats_bool_exp | null | undefined;
};
export type StatsListQuery$data = {
  readonly stats: ReadonlyArray<{
    readonly assists: number;
    readonly club: {
      readonly id: any;
      readonly name: string;
    };
    readonly goals: number;
    readonly id: any;
    readonly matches: number;
    readonly player: {
      readonly id: any;
      readonly name: string;
    };
    readonly season: string;
  }>;
  readonly stats_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null | undefined;
  };
};
export type StatsListQuery = {
  response: StatsListQuery$data;
  variables: StatsListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "offset"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "order_by"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "where"
},
v4 = {
  "kind": "Variable",
  "name": "where",
  "variableName": "where"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v7 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "limit",
        "variableName": "limit"
      },
      {
        "kind": "Variable",
        "name": "offset",
        "variableName": "offset"
      },
      {
        "kind": "Variable",
        "name": "order_by",
        "variableName": "order_by"
      },
      (v4/*: any*/)
    ],
    "concreteType": "stats",
    "kind": "LinkedField",
    "name": "stats",
    "plural": true,
    "selections": [
      (v5/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "season",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "matches",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "goals",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "assists",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "players",
        "kind": "LinkedField",
        "name": "player",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "clubs",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      (v4/*: any*/)
    ],
    "concreteType": "stats_aggregate",
    "kind": "LinkedField",
    "name": "stats_aggregate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "stats_aggregate_fields",
        "kind": "LinkedField",
        "name": "aggregate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "count",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "StatsListQuery",
    "selections": (v7/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "StatsListQuery",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "12b53ee7b98859ea5dbddbed29ff33b8",
    "id": null,
    "metadata": {},
    "name": "StatsListQuery",
    "operationKind": "query",
    "text": "query StatsListQuery(\n  $limit: Int!\n  $offset: Int!\n  $where: stats_bool_exp\n  $order_by: [stats_order_by!]\n) {\n  stats(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {\n    id\n    season\n    matches\n    goals\n    assists\n    player {\n      id\n      name\n    }\n    club {\n      id\n      name\n    }\n  }\n  stats_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c4561411f549a45ca95b352b517854ee";

export default node;
