/**
 * @generated SignedSource<<73dc5c503d055ae40c962931dd8377c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TransferDetailQuery$variables = {
  id: any;
};
export type TransferDetailQuery$data = {
  readonly transfers_by_pk: {
    readonly created_at: any;
    readonly fee: number | null | undefined;
    readonly from_club: {
      readonly id: any;
      readonly name: string;
    } | null | undefined;
    readonly id: any;
    readonly loan_end_month: number | null | undefined;
    readonly loan_end_year: number | null | undefined;
    readonly player: {
      readonly id: any;
      readonly name: string;
    };
    readonly to_club: {
      readonly id: any;
      readonly name: string;
    };
    readonly transfer_month: number;
    readonly transfer_year: number;
    readonly type: any;
  } | null | undefined;
};
export type TransferDetailQuery = {
  response: TransferDetailQuery$data;
  variables: TransferDetailQuery$variables;
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
    "concreteType": "transfers",
    "kind": "LinkedField",
    "name": "transfers_by_pk",
    "plural": false,
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
        "kind": "ScalarField",
        "name": "loan_end_year",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "loan_end_month",
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
        "name": "from_club",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "clubs",
        "kind": "LinkedField",
        "name": "to_club",
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
    "name": "TransferDetailQuery",
    "selections": (v3/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TransferDetailQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "42e7dd9e78cd0ecfddf63cbe92044a2e",
    "id": null,
    "metadata": {},
    "name": "TransferDetailQuery",
    "operationKind": "query",
    "text": "query TransferDetailQuery(\n  $id: uuid!\n) {\n  transfers_by_pk(id: $id) {\n    id\n    transfer_year\n    transfer_month\n    type\n    fee\n    loan_end_year\n    loan_end_month\n    created_at\n    player {\n      id\n      name\n    }\n    from_club {\n      id\n      name\n    }\n    to_club {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "acdab7c06191ef700ee5bff94bb412d7";

export default node;
