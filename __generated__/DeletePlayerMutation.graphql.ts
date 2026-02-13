/**
 * @generated SignedSource<<c321b837a24c80c1809a6537c695e797>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeletePlayerMutation$variables = {
  id: any;
};
export type DeletePlayerMutation$data = {
  readonly delete_players_by_pk: {
    readonly id: any;
  } | null | undefined;
};
export type DeletePlayerMutation = {
  response: DeletePlayerMutation$data;
  variables: DeletePlayerMutation$variables;
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
    "concreteType": "players",
    "kind": "LinkedField",
    "name": "delete_players_by_pk",
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
    "name": "DeletePlayerMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeletePlayerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f7720712a23f11cf803f96d27864b67d",
    "id": null,
    "metadata": {},
    "name": "DeletePlayerMutation",
    "operationKind": "mutation",
    "text": "mutation DeletePlayerMutation(\n  $id: uuid!\n) {\n  delete_players_by_pk(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "149ae8c99ad341220f51d82dda9205e5";

export default node;
