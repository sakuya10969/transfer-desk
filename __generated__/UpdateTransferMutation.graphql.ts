/**
 * @generated SignedSource<<91ddd2bd8a4270558252056238cecd85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type transfers_set_input = {
  created_at?: any | null | undefined;
  fee?: number | null | undefined;
  from_club_id?: any | null | undefined;
  id?: any | null | undefined;
  loan_end_month?: number | null | undefined;
  loan_end_year?: number | null | undefined;
  player_id?: any | null | undefined;
  to_club_id?: any | null | undefined;
  transfer_month?: number | null | undefined;
  transfer_year?: number | null | undefined;
  type?: any | null | undefined;
};
export type UpdateTransferMutation$variables = {
  id: any;
  set: transfers_set_input;
};
export type UpdateTransferMutation$data = {
  readonly update_transfers_by_pk: {
    readonly fee: number | null | undefined;
    readonly id: any;
    readonly loan_end_month: number | null | undefined;
    readonly loan_end_year: number | null | undefined;
    readonly transfer_month: number;
    readonly transfer_year: number;
    readonly type: any;
  } | null | undefined;
};
export type UpdateTransferMutation = {
  response: UpdateTransferMutation$data;
  variables: UpdateTransferMutation$variables;
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
    "concreteType": "transfers",
    "kind": "LinkedField",
    "name": "update_transfers_by_pk",
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
    "name": "UpdateTransferMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateTransferMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4692d9a2e9c1f8c7fa348f0a1048cece",
    "id": null,
    "metadata": {},
    "name": "UpdateTransferMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateTransferMutation(\n  $id: uuid!\n  $set: transfers_set_input!\n) {\n  update_transfers_by_pk(pk_columns: {id: $id}, _set: $set) {\n    id\n    transfer_year\n    transfer_month\n    type\n    fee\n    loan_end_year\n    loan_end_month\n  }\n}\n"
  }
};
})();

(node as any).hash = "a9afed6b594a244282d12f789d8be0de";

export default node;
