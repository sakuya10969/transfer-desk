/**
 * @generated SignedSource<<fa718c0392e0b6857a691a3b8be940de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type players_set_input = {
  birth_date?: any | null | undefined;
  created_at?: any | null | undefined;
  current_club_id?: any | null | undefined;
  id?: any | null | undefined;
  name?: string | null | undefined;
  nationality?: string | null | undefined;
  position?: any | null | undefined;
  updated_at?: any | null | undefined;
};
export type UpdatePlayerMutation$variables = {
  id: any;
  set: players_set_input;
};
export type UpdatePlayerMutation$data = {
  readonly update_players_by_pk: {
    readonly birth_date: any | null | undefined;
    readonly current_club_id: any | null | undefined;
    readonly id: any;
    readonly name: string;
    readonly nationality: string | null | undefined;
    readonly position: any | null | undefined;
    readonly updated_at: any;
  } | null | undefined;
};
export type UpdatePlayerMutation = {
  response: UpdatePlayerMutation$data;
  variables: UpdatePlayerMutation$variables;
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
    "concreteType": "players",
    "kind": "LinkedField",
    "name": "update_players_by_pk",
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
        "name": "position",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "nationality",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "birth_date",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "current_club_id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updated_at",
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
    "name": "UpdatePlayerMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdatePlayerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "007b8f3b213607d5752e653148d5581e",
    "id": null,
    "metadata": {},
    "name": "UpdatePlayerMutation",
    "operationKind": "mutation",
    "text": "mutation UpdatePlayerMutation(\n  $id: uuid!\n  $set: players_set_input!\n) {\n  update_players_by_pk(pk_columns: {id: $id}, _set: $set) {\n    id\n    name\n    position\n    nationality\n    birth_date\n    current_club_id\n    updated_at\n  }\n}\n"
  }
};
})();

(node as any).hash = "6922371be5a287ec298936f9b43aec4b";

export default node;
