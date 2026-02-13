/**
 * @generated SignedSource<<3aaabbadce6db1e1f3fa3e948c987e4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type contracts_set_input = {
  clause?: number | null | undefined;
  club_id?: any | null | undefined;
  created_at?: any | null | undefined;
  end_date?: any | null | undefined;
  id?: any | null | undefined;
  player_id?: any | null | undefined;
  salary?: number | null | undefined;
  start_date?: any | null | undefined;
  updated_at?: any | null | undefined;
};
export type UpdateContractMutation$variables = {
  id: any;
  set: contracts_set_input;
};
export type UpdateContractMutation$data = {
  readonly update_contracts_by_pk: {
    readonly clause: number | null | undefined;
    readonly end_date: any | null | undefined;
    readonly id: any;
    readonly salary: number | null | undefined;
    readonly start_date: any;
    readonly updated_at: any;
  } | null | undefined;
};
export type UpdateContractMutation = {
  response: UpdateContractMutation$data;
  variables: UpdateContractMutation$variables;
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
    "concreteType": "contracts",
    "kind": "LinkedField",
    "name": "update_contracts_by_pk",
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
    "name": "UpdateContractMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateContractMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8756789a0180f022de4b027571f59ae7",
    "id": null,
    "metadata": {},
    "name": "UpdateContractMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateContractMutation(\n  $id: uuid!\n  $set: contracts_set_input!\n) {\n  update_contracts_by_pk(pk_columns: {id: $id}, _set: $set) {\n    id\n    start_date\n    end_date\n    salary\n    clause\n    updated_at\n  }\n}\n"
  }
};
})();

(node as any).hash = "3b7998a04b69eb21007ec71c4b562b3e";

export default node;
