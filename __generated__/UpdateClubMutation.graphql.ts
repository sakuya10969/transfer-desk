/**
 * @generated SignedSource<<5b275b670c088a8187e84727eac5d1a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type clubs_set_input = {
  country?: string | null | undefined;
  created_at?: any | null | undefined;
  founded_year?: number | null | undefined;
  id?: any | null | undefined;
  league?: string | null | undefined;
  name?: string | null | undefined;
  stadium?: string | null | undefined;
  updated_at?: any | null | undefined;
};
export type UpdateClubMutation$variables = {
  id: any;
  set: clubs_set_input;
};
export type UpdateClubMutation$data = {
  readonly update_clubs_by_pk: {
    readonly country: string | null | undefined;
    readonly founded_year: number | null | undefined;
    readonly id: any;
    readonly league: string | null | undefined;
    readonly name: string;
    readonly stadium: string | null | undefined;
    readonly updated_at: any;
  } | null | undefined;
};
export type UpdateClubMutation = {
  response: UpdateClubMutation$data;
  variables: UpdateClubMutation$variables;
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
    "concreteType": "clubs",
    "kind": "LinkedField",
    "name": "update_clubs_by_pk",
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
    "name": "UpdateClubMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateClubMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bde616c3961548fcd3303c61d7d15692",
    "id": null,
    "metadata": {},
    "name": "UpdateClubMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateClubMutation(\n  $id: uuid!\n  $set: clubs_set_input!\n) {\n  update_clubs_by_pk(pk_columns: {id: $id}, _set: $set) {\n    id\n    name\n    country\n    league\n    founded_year\n    stadium\n    updated_at\n  }\n}\n"
  }
};
})();

(node as any).hash = "7ed49def0cd6247d735797d480c594e6";

export default node;
