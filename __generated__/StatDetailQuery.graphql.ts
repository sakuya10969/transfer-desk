/**
 * @generated SignedSource<<f193c793609fed629f40a4c9f1386cfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type StatDetailQuery$variables = {
  id: any;
};
export type StatDetailQuery$data = {
  readonly stats_by_pk: {
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
  } | null | undefined;
};
export type StatDetailQuery = {
  response: StatDetailQuery$data;
  variables: StatDetailQuery$variables;
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
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "stats",
    "kind": "LinkedField",
    "name": "stats_by_pk",
    "plural": false,
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
      {
        "alias": null,
        "args": null,
        "concreteType": "players",
        "kind": "LinkedField",
        "name": "player",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "clubs",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": (v2/*: any*/),
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
    "name": "StatDetailQuery",
    "selections": (v3/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StatDetailQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c03331edecd2e6c1f1e074b39019e474",
    "id": null,
    "metadata": {},
    "name": "StatDetailQuery",
    "operationKind": "query",
    "text": "query StatDetailQuery(\n  $id: uuid!\n) {\n  stats_by_pk(id: $id) {\n    id\n    season\n    matches\n    goals\n    assists\n    player {\n      id\n      name\n    }\n    club {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6b63b9035de7753ebe851591b85f3e37";

export default node;
