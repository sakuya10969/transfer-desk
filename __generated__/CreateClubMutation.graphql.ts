/**
 * @generated SignedSource<<456c456f1366aa4280ee1e7c9406c75a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type clubs_constraint = "clubs_pkey" | "%future added value";
export type clubs_update_column = "country" | "created_at" | "founded_year" | "id" | "league" | "name" | "stadium" | "updated_at" | "%future added value";
export type contracts_constraint = "contracts_pkey" | "%future added value";
export type contracts_select_column = "clause" | "club_id" | "created_at" | "end_date" | "id" | "player_id" | "salary" | "start_date" | "updated_at" | "%future added value";
export type contracts_update_column = "clause" | "club_id" | "created_at" | "end_date" | "id" | "player_id" | "salary" | "start_date" | "updated_at" | "%future added value";
export type players_constraint = "players_pkey" | "%future added value";
export type players_select_column = "birth_date" | "created_at" | "current_club_id" | "id" | "name" | "nationality" | "position" | "updated_at" | "%future added value";
export type players_update_column = "birth_date" | "created_at" | "current_club_id" | "id" | "name" | "nationality" | "position" | "updated_at" | "%future added value";
export type stats_constraint = "stats_pkey" | "stats_season_player_id_club_id_key" | "%future added value";
export type stats_select_column = "assists" | "club_id" | "created_at" | "goals" | "id" | "matches" | "player_id" | "season" | "updated_at" | "%future added value";
export type stats_update_column = "assists" | "club_id" | "created_at" | "goals" | "id" | "matches" | "player_id" | "season" | "updated_at" | "%future added value";
export type transfers_constraint = "transfers_pkey" | "%future added value";
export type transfers_select_column = "created_at" | "fee" | "from_club_id" | "id" | "loan_end_month" | "loan_end_year" | "player_id" | "to_club_id" | "transfer_month" | "transfer_year" | "type" | "updated_at" | "%future added value";
export type transfers_update_column = "created_at" | "fee" | "from_club_id" | "id" | "loan_end_month" | "loan_end_year" | "player_id" | "to_club_id" | "transfer_month" | "transfer_year" | "type" | "updated_at" | "%future added value";
export type clubs_insert_input = {
  contracts?: contracts_arr_rel_insert_input | null | undefined;
  country?: string | null | undefined;
  created_at?: any | null | undefined;
  founded_year?: number | null | undefined;
  id?: any | null | undefined;
  league?: string | null | undefined;
  name?: string | null | undefined;
  players?: players_arr_rel_insert_input | null | undefined;
  stadium?: string | null | undefined;
  stats?: stats_arr_rel_insert_input | null | undefined;
  transfers?: transfers_arr_rel_insert_input | null | undefined;
  transfersByToClubId?: transfers_arr_rel_insert_input | null | undefined;
  updated_at?: any | null | undefined;
};
export type contracts_arr_rel_insert_input = {
  data: ReadonlyArray<contracts_insert_input>;
  on_conflict?: contracts_on_conflict | null | undefined;
};
export type contracts_insert_input = {
  clause?: number | null | undefined;
  club?: clubs_obj_rel_insert_input | null | undefined;
  club_id?: any | null | undefined;
  created_at?: any | null | undefined;
  end_date?: any | null | undefined;
  id?: any | null | undefined;
  player?: players_obj_rel_insert_input | null | undefined;
  player_id?: any | null | undefined;
  salary?: number | null | undefined;
  start_date?: any | null | undefined;
  updated_at?: any | null | undefined;
};
export type clubs_obj_rel_insert_input = {
  data: clubs_insert_input;
  on_conflict?: clubs_on_conflict | null | undefined;
};
export type clubs_on_conflict = {
  constraint: clubs_constraint;
  update_columns?: ReadonlyArray<clubs_update_column>;
  where?: clubs_bool_exp | null | undefined;
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
export type players_obj_rel_insert_input = {
  data: players_insert_input;
  on_conflict?: players_on_conflict | null | undefined;
};
export type players_insert_input = {
  birth_date?: any | null | undefined;
  club?: clubs_obj_rel_insert_input | null | undefined;
  contracts?: contracts_arr_rel_insert_input | null | undefined;
  created_at?: any | null | undefined;
  current_club_id?: any | null | undefined;
  id?: any | null | undefined;
  name?: string | null | undefined;
  nationality?: string | null | undefined;
  position?: any | null | undefined;
  stats?: stats_arr_rel_insert_input | null | undefined;
  transfers?: transfers_arr_rel_insert_input | null | undefined;
  updated_at?: any | null | undefined;
};
export type stats_arr_rel_insert_input = {
  data: ReadonlyArray<stats_insert_input>;
  on_conflict?: stats_on_conflict | null | undefined;
};
export type stats_insert_input = {
  assists?: number | null | undefined;
  club?: clubs_obj_rel_insert_input | null | undefined;
  club_id?: any | null | undefined;
  created_at?: any | null | undefined;
  goals?: number | null | undefined;
  id?: any | null | undefined;
  matches?: number | null | undefined;
  player?: players_obj_rel_insert_input | null | undefined;
  player_id?: any | null | undefined;
  season?: string | null | undefined;
  updated_at?: any | null | undefined;
};
export type stats_on_conflict = {
  constraint: stats_constraint;
  update_columns?: ReadonlyArray<stats_update_column>;
  where?: stats_bool_exp | null | undefined;
};
export type transfers_arr_rel_insert_input = {
  data: ReadonlyArray<transfers_insert_input>;
  on_conflict?: transfers_on_conflict | null | undefined;
};
export type transfers_insert_input = {
  club?: clubs_obj_rel_insert_input | null | undefined;
  clubByToClubId?: clubs_obj_rel_insert_input | null | undefined;
  created_at?: any | null | undefined;
  fee?: number | null | undefined;
  from_club_id?: any | null | undefined;
  id?: any | null | undefined;
  loan_end_month?: number | null | undefined;
  loan_end_year?: number | null | undefined;
  player?: players_obj_rel_insert_input | null | undefined;
  player_id?: any | null | undefined;
  to_club_id?: any | null | undefined;
  transfer_month?: number | null | undefined;
  transfer_year?: number | null | undefined;
  type?: any | null | undefined;
  updated_at?: any | null | undefined;
};
export type transfers_on_conflict = {
  constraint: transfers_constraint;
  update_columns?: ReadonlyArray<transfers_update_column>;
  where?: transfers_bool_exp | null | undefined;
};
export type players_on_conflict = {
  constraint: players_constraint;
  update_columns?: ReadonlyArray<players_update_column>;
  where?: players_bool_exp | null | undefined;
};
export type contracts_on_conflict = {
  constraint: contracts_constraint;
  update_columns?: ReadonlyArray<contracts_update_column>;
  where?: contracts_bool_exp | null | undefined;
};
export type players_arr_rel_insert_input = {
  data: ReadonlyArray<players_insert_input>;
  on_conflict?: players_on_conflict | null | undefined;
};
export type CreateClubMutation$variables = {
  object: clubs_insert_input;
};
export type CreateClubMutation$data = {
  readonly insert_clubs_one: {
    readonly country: string | null | undefined;
    readonly founded_year: number | null | undefined;
    readonly id: any;
    readonly league: string | null | undefined;
    readonly name: string;
    readonly stadium: string | null | undefined;
  } | null | undefined;
};
export type CreateClubMutation = {
  response: CreateClubMutation$data;
  variables: CreateClubMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "object"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "object",
        "variableName": "object"
      }
    ],
    "concreteType": "clubs",
    "kind": "LinkedField",
    "name": "insert_clubs_one",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "country",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "league",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "founded_year",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "stadium",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateClubMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateClubMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "37610016b49e261f368ed72f164b051a",
    "id": null,
    "metadata": {},
    "name": "CreateClubMutation",
    "operationKind": "mutation",
    "text": "mutation CreateClubMutation(\n  $object: clubs_insert_input!\n) {\n  insert_clubs_one(object: $object) {\n    id\n    name\n    country\n    league\n    founded_year\n    stadium\n  }\n}\n"
  }
};
})();

(node as any).hash = "6027bd06ad0380358083faa0a6a02356";

export default node;
