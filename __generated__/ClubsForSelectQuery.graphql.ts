/**
 * @generated SignedSource<<a25482f7cd5119958b1bdf44025e2bcf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ClubsForSelectQuery$variables = Record<PropertyKey, never>;
export type ClubsForSelectQuery$data = {
  readonly clubs: ReadonlyArray<{
    readonly id: any;
    readonly name: string;
  }>;
};
export type ClubsForSelectQuery = {
  response: ClubsForSelectQuery$data;
  variables: ClubsForSelectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "order_by",
        "value": [
          {
            "name": "asc"
          }
        ]
      }
    ],
    "concreteType": "clubs",
    "kind": "LinkedField",
    "name": "clubs",
    "plural": true,
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
      }
    ],
    "storageKey": "clubs(order_by:[{\"name\":\"asc\"}])"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubsForSelectQuery",
    "selections": (v0/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ClubsForSelectQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "073bc2fdd56e13c3303b83cfbc591183",
    "id": null,
    "metadata": {},
    "name": "ClubsForSelectQuery",
    "operationKind": "query",
    "text": "query ClubsForSelectQuery {\n  clubs(order_by: [{name: asc}]) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "1f8f7449efce771f0eeed0bc8cb15d34";

export default node;
