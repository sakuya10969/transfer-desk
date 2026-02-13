/**
 * @generated SignedSource<<e21841899de8ee07c995791fbe3f5a6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ContractDetailQuery$variables = {
  id: any;
};
export type ContractDetailQuery$data = {
  readonly contracts_by_pk: {
    readonly clause: number | null | undefined;
    readonly club: {
      readonly id: any;
      readonly name: string;
    };
    readonly created_at: any;
    readonly end_date: any | null | undefined;
    readonly id: any;
    readonly player: {
      readonly id: any;
      readonly name: string;
    };
    readonly salary: number | null | undefined;
    readonly start_date: any;
    readonly updated_at: any;
  } | null | undefined;
};
export type ContractDetailQuery = {
  response: ContractDetailQuery$data;
  variables: ContractDetailQuery$variables;
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
    "concreteType": "contracts",
    "kind": "LinkedField",
    "name": "contracts_by_pk",
    "plural": false,
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
    "name": "ContractDetailQuery",
    "selections": (v3/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ContractDetailQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "6339d703cbbf43ff88d353cdef4b1366",
    "id": null,
    "metadata": {},
    "name": "ContractDetailQuery",
    "operationKind": "query",
    "text": "query ContractDetailQuery(\n  $id: uuid!\n) {\n  contracts_by_pk(id: $id) {\n    id\n    start_date\n    end_date\n    salary\n    clause\n    created_at\n    updated_at\n    player {\n      id\n      name\n    }\n    club {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "95a192915ea3087bcccead5c12052915";

export default node;
