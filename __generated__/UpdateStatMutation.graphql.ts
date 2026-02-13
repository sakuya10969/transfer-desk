/**
 * @generated SignedSource<<bcb351e6f99e78fe5f1409ea306042df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type stats_set_input = {
  assists?: number | null | undefined;
  club_id?: any | null | undefined;
  created_at?: any | null | undefined;
  goals?: number | null | undefined;
  id?: any | null | undefined;
  matches?: number | null | undefined;
  player_id?: any | null | undefined;
  season?: string | null | undefined;
  updated_at?: any | null | undefined;
};
export type UpdateStatMutation$variables = {
  id: any;
  set: stats_set_input;
};
export type UpdateStatMutation$data = {
  readonly update_stats_by_pk: {
    readonly assists: number;
    readonly goals: number;
    readonly id: any;
    readonly matches: number;
    readonly season: string;
  } | null | undefined;
};
export type UpdateStatMutation = {
  response: UpdateStatMutation$data;
  variables: UpdateStatMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "set"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "_set",
        "variableName": "set"
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "pk_columns"
      }
    ],
    "concreteType": "stats",
    "kind": "LinkedField",
    "name": "update_stats_by_pk",
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
    "name": "UpdateStatMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateStatMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "26abba50bd42e837ccf2ea7aad521c85",
    "id": null,
    "metadata": {},
    "name": "UpdateStatMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateStatMutation(\n  $id: uuid!\n  $set: stats_set_input!\n) {\n  update_stats_by_pk(pk_columns: {id: $id}, _set: $set) {\n    id\n    season\n    matches\n    goals\n    assists\n  }\n}\n"
  }
};
})();

(node as any).hash = "b67c4060c9f2dd43f603d9754e543bc9";

export default node;
