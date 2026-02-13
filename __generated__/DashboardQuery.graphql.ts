/**
 * @generated SignedSource<<237c272bfa3e1840e253e440a3d53dc4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DashboardQuery$variables = Record<PropertyKey, never>;
export type DashboardQuery$data = {
  readonly clubs_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null | undefined;
  };
  readonly contracts_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null | undefined;
  };
  readonly players_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null | undefined;
  };
  readonly recent_clubs: ReadonlyArray<{
    readonly country: string | null | undefined;
    readonly id: any;
    readonly league: string | null | undefined;
    readonly name: string;
    readonly updated_at: any;
  }>;
  readonly recent_players: ReadonlyArray<{
    readonly club: {
      readonly id: any;
      readonly name: string;
    } | null | undefined;
    readonly id: any;
    readonly name: string;
    readonly position: any | null | undefined;
  }>;
  readonly recent_transfers: ReadonlyArray<{
    readonly club: {
      readonly id: any;
      readonly name: string;
    } | null | undefined;
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
  readonly transfers_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null | undefined;
  };
};
export type DashboardQuery = {
  response: DashboardQuery$data;
  variables: DashboardQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "count",
    "storageKey": null
  }
],
v1 = {
  "kind": "Literal",
  "name": "limit",
  "value": 5
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "order_by",
    "value": [
      {
        "created_at": "desc"
      }
    ]
  }
],
v5 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "clubs",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "clubs_aggregate",
    "kind": "LinkedField",
    "name": "clubs_aggregate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "clubs_aggregate_fields",
        "kind": "LinkedField",
        "name": "aggregate",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "players_aggregate",
    "kind": "LinkedField",
    "name": "players_aggregate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "players_aggregate_fields",
        "kind": "LinkedField",
        "name": "aggregate",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "contracts_aggregate",
    "kind": "LinkedField",
    "name": "contracts_aggregate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "contracts_aggregate_fields",
        "kind": "LinkedField",
        "name": "aggregate",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "transfers_aggregate",
    "kind": "LinkedField",
    "name": "transfers_aggregate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "transfers_aggregate_fields",
        "kind": "LinkedField",
        "name": "aggregate",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": "recent_clubs",
    "args": [
      (v1/*: any*/),
      {
        "kind": "Literal",
        "name": "order_by",
        "value": [
          {
            "updated_at": "desc"
          }
        ]
      }
    ],
    "concreteType": "clubs",
    "kind": "LinkedField",
    "name": "clubs",
    "plural": true,
    "selections": [
      (v2/*: any*/),
      (v3/*: any*/),
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
        "name": "country",
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
    "storageKey": "clubs(limit:5,order_by:[{\"updated_at\":\"desc\"}])"
  },
  {
    "alias": "recent_players",
    "args": (v4/*: any*/),
    "concreteType": "players",
    "kind": "LinkedField",
    "name": "players",
    "plural": true,
    "selections": [
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "position",
        "storageKey": null
      },
      (v6/*: any*/)
    ],
    "storageKey": "players(limit:5,order_by:[{\"created_at\":\"desc\"}])"
  },
  {
    "alias": "recent_transfers",
    "args": (v4/*: any*/),
    "concreteType": "transfers",
    "kind": "LinkedField",
    "name": "transfers",
    "plural": true,
    "selections": [
      (v2/*: any*/),
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
        "concreteType": "players",
        "kind": "LinkedField",
        "name": "player",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      (v6/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "clubs",
        "kind": "LinkedField",
        "name": "clubByToClubId",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": "transfers(limit:5,order_by:[{\"created_at\":\"desc\"}])"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardQuery",
    "selections": (v7/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DashboardQuery",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "a425f7023f1e80e72a0ce2c9f3b9f181",
    "id": null,
    "metadata": {},
    "name": "DashboardQuery",
    "operationKind": "query",
    "text": "query DashboardQuery {\n  clubs_aggregate {\n    aggregate {\n      count\n    }\n  }\n  players_aggregate {\n    aggregate {\n      count\n    }\n  }\n  contracts_aggregate {\n    aggregate {\n      count\n    }\n  }\n  transfers_aggregate {\n    aggregate {\n      count\n    }\n  }\n  recent_clubs: clubs(order_by: [{updated_at: desc}], limit: 5) {\n    id\n    name\n    league\n    country\n    updated_at\n  }\n  recent_players: players(order_by: [{created_at: desc}], limit: 5) {\n    id\n    name\n    position\n    club {\n      id\n      name\n    }\n  }\n  recent_transfers: transfers(order_by: [{created_at: desc}], limit: 5) {\n    id\n    transfer_year\n    transfer_month\n    type\n    fee\n    player {\n      id\n      name\n    }\n    club {\n      id\n      name\n    }\n    clubByToClubId {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "18f42d81e1e2dabdb492be0cc5c1ae19";

export default node;
