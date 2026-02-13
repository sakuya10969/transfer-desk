/**
 * @generated SignedSource<<1a44c332d8f2ccb19781af382af160c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ClubDetailQuery$variables = {
  id: any;
};
export type ClubDetailQuery$data = {
  readonly clubs_by_pk: {
    readonly contracts: ReadonlyArray<{
      readonly end_date: any | null | undefined;
      readonly id: any;
      readonly player: {
        readonly id: any;
        readonly name: string;
      };
      readonly salary: number | null | undefined;
      readonly start_date: any;
    }>;
    readonly country: string | null | undefined;
    readonly created_at: any;
    readonly founded_year: number | null | undefined;
    readonly id: any;
    readonly league: string | null | undefined;
    readonly name: string;
    readonly players: ReadonlyArray<{
      readonly id: any;
      readonly name: string;
      readonly nationality: string | null | undefined;
      readonly position: any | null | undefined;
    }>;
    readonly stadium: string | null | undefined;
    readonly stats: ReadonlyArray<{
      readonly assists: number;
      readonly goals: number;
      readonly id: any;
      readonly matches: number;
      readonly player: {
        readonly id: any;
        readonly name: string;
      };
      readonly season: string;
    }>;
    readonly transfers: ReadonlyArray<{
      readonly clubByToClubId: {
        readonly id: any;
        readonly name: string;
      };
      readonly fee: number | null | undefined;
      readonly id: any;
      readonly player: {
        readonly id: any;
        readonly name: string;
      };
      readonly transfer_month: number;
      readonly transfer_year: number;
      readonly type: any;
    }>;
    readonly transfersByToClubId: ReadonlyArray<{
      readonly club: {
        readonly id: any;
        readonly name: string;
      } | null | undefined;
      readonly fee: number | null | undefined;
      readonly id: any;
      readonly player: {
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
export type ClubDetailQuery = {
  response: ClubDetailQuery$data;
  variables: ClubDetailQuery$variables;
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
  "concreteType": "players",
  "kind": "LinkedField",
  "name": "player",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "transfer_year",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "transfer_month",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fee",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "clubs",
    "kind": "LinkedField",
    "name": "clubs_by_pk",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
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
        "concreteType": "players",
        "kind": "LinkedField",
        "name": "players",
        "plural": true,
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
          }
        ],
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
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "transfers",
        "kind": "LinkedField",
        "name": "transfersByToClubId",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "clubs",
            "kind": "LinkedField",
            "name": "club",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
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
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "clubs",
            "kind": "LinkedField",
            "name": "clubByToClubId",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
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
    "name": "ClubDetailQuery",
    "selections": (v9/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClubDetailQuery",
    "selections": (v9/*: any*/)
  },
  "params": {
    "cacheID": "262fd9d763794b4061001892f696aab1",
    "id": null,
    "metadata": {},
    "name": "ClubDetailQuery",
    "operationKind": "query",
    "text": "query ClubDetailQuery(\n  $id: uuid!\n) {\n  clubs_by_pk(id: $id) {\n    id\n    name\n    country\n    league\n    founded_year\n    stadium\n    created_at\n    updated_at\n    players {\n      id\n      name\n      position\n      nationality\n    }\n    contracts {\n      id\n      start_date\n      end_date\n      salary\n      player {\n        id\n        name\n      }\n    }\n    transfersByToClubId {\n      id\n      transfer_year\n      transfer_month\n      type\n      fee\n      player {\n        id\n        name\n      }\n      club {\n        id\n        name\n      }\n    }\n    transfers {\n      id\n      transfer_year\n      transfer_month\n      type\n      fee\n      player {\n        id\n        name\n      }\n      clubByToClubId {\n        id\n        name\n      }\n    }\n    stats {\n      id\n      season\n      matches\n      goals\n      assists\n      player {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "639990a990af8f50657ae71083906382";

export default node;
