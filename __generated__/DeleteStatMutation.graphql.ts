/**
 * @generated SignedSource<<65f67b769114d16bb12699876d0201d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteStatMutation$variables = {
  id: any;
};
export type DeleteStatMutation$data = {
  readonly delete_stats_by_pk: {
    readonly id: any;
  } | null | undefined;
};
export type DeleteStatMutation = {
  response: DeleteStatMutation$data;
  variables: DeleteStatMutation$variables;
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
    "concreteType": "stats",
    "kind": "LinkedField",
    "name": "delete_stats_by_pk",
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
    "name": "DeleteStatMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteStatMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "62f68f23cd0a3558a48940ffb018f739",
    "id": null,
    "metadata": {},
    "name": "DeleteStatMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteStatMutation(\n  $id: uuid!\n) {\n  delete_stats_by_pk(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6c7008c457808a1cc30b7ef84e6828ec";

export default node;
