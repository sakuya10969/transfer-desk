/**
 * @generated SignedSource<<c94d1ec67ad5c9735e6e87584e14734c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteContractMutation$variables = {
  id: any;
};
export type DeleteContractMutation$data = {
  readonly delete_contracts_by_pk: {
    readonly id: any;
  } | null | undefined;
};
export type DeleteContractMutation = {
  response: DeleteContractMutation$data;
  variables: DeleteContractMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
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
    "name": "delete_contracts_by_pk",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "DeleteContractMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteContractMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6dd28533c95391915ed2598991435de7",
    "id": null,
    "metadata": {},
    "name": "DeleteContractMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteContractMutation(\n  $id: uuid!\n) {\n  delete_contracts_by_pk(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "059b202db1f7fc48b493a04abe170a8e";

export default node;
