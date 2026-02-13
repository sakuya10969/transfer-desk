/**
 * @generated SignedSource<<29096ff448c0573bcc5973870f4d3f6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteTransferMutation$variables = {
  id: any;
};
export type DeleteTransferMutation$data = {
  readonly delete_transfers_by_pk: {
    readonly id: any;
  } | null | undefined;
};
export type DeleteTransferMutation = {
  response: DeleteTransferMutation$data;
  variables: DeleteTransferMutation$variables;
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
    "concreteType": "transfers",
    "kind": "LinkedField",
    "name": "delete_transfers_by_pk",
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
    "name": "DeleteTransferMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteTransferMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e1d04b4754a95847fbced4374d95ec80",
    "id": null,
    "metadata": {},
    "name": "DeleteTransferMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteTransferMutation(\n  $id: uuid!\n) {\n  delete_transfers_by_pk(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2c805815a9299cfa04f2212bd84b66a0";

export default node;
