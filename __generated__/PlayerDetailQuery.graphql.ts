/**
 * @generated SignedSource<<b80b14dca024dd3bf7a68575b3f6bf83>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PlayerDetailQuery$variables = {
  id: any;
};
export type PlayerDetailQuery$data = {
  readonly players_by_pk: {
    readonly birth_date: any | null | undefined;
    readonly contracts: ReadonlyArray<{
      readonly clause: number | null | undefined;
      readonly club: {
        readonly id: any;
        readonly name: string;
      };
      readonly end_date: any | null | undefined;
      readonly id: any;
      readonly salary: number | null | undefined;
      readonly start_date: any;
    }>;
    readonly created_at: any;
    readonly current_club: {
      readonly id: any;
      readonly name: string;
    } | null | undefined;
    readonly id: any;
    readonly name: string;
    readonly nationality: string | null | undefined;
    readonly position: any | null | undefined;
    readonly stats: ReadonlyArray<{
      readonly assists: number;
      readonly club: {
        readonly id: any;
        readonly name: string;
      };
      readonly goals: number;
      readonly id: any;
      readonly matches: number;
      readonly season: string;
    }>;
    readonly transfers: ReadonlyArray<{
      readonly fee: number | null | undefined;
      readonly from_club: {
        readonly id: any;
        readonly name: string;
      } | null | undefined;
      readonly id: any;
      readonly to_club: {
        readonly id: any;
        readonly name: string;
      };
      readonly transfer_month: number;
      readonly transfer_year: number;
      readonly type: any;
    }>;
    readonly updated_at: any;
  } | null | undefined;
};
export type PlayerDetailQuery = {
  response: PlayerDetailQuery$data;
  variables: PlayerDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "clubs",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "players",
    "kind": "LinkedField",
    "name": "players_by_pk",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
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
        "name": "created_at",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updated_at",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "clubs",
        "kind": "LinkedField",
        "name": "current_club",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "contracts",
        "kind": "LinkedField",
        "name": "contracts",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "start_date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "end_date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "salary",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clause",
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "transfers",
        "kind": "LinkedField",
        "name": "transfers",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "transfer_year",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "transfer_month",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fee",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "clubs",
            "kind": "LinkedField",
            "name": "from_club",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "clubs",
            "kind": "LinkedField",
            "name": "to_club",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "order_by",
            "value": [
              {
                "season": "desc"
              }
            ]
          }
        ],
        "concreteType": "stats",
        "kind": "LinkedField",
        "name": "stats",
        "plural": true,
        "selections": [
          (v1/*: any*/),
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
          (v4/*: any*/)
        ],
        "storageKey": "stats(order_by:[{\"season\":\"desc\"}])"
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
    "name": "PlayerDetailQuery",
    "selections": (v5/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PlayerDetailQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "90e86686fbb4eb8b3e56ab42cf9d7bdb",
    "id": null,
    "metadata": {},
    "name": "PlayerDetailQuery",
    "operationKind": "query",
    "text": "query PlayerDetailQuery(\n  $id: uuid!\n) {\n  players_by_pk(id: $id) {\n    id\n    name\n    position\n    nationality\n    birth_date\n    created_at\n    updated_at\n    current_club {\n      id\n      name\n    }\n    contracts {\n      id\n      start_date\n      end_date\n      salary\n      clause\n      club {\n        id\n        name\n      }\n    }\n    transfers {\n      id\n      transfer_year\n      transfer_month\n      type\n      fee\n      from_club {\n        id\n        name\n      }\n      to_club {\n        id\n        name\n      }\n    }\n    stats(order_by: [{season: desc}]) {\n      id\n      season\n      matches\n      goals\n      assists\n      club {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f937cd6a980b9c353c04f88c7020663e";

export default node;
