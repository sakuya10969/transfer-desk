/**
 * @generated SignedSource<<de0c3cf3a10405770e4de857ca32dd0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteClubMutation$variables = {
  id: any;
};
export type DeleteClubMutation$data = {
  readonly delete_clubs_by_pk: {
    readonly id: any;
  } | null | undefined;
};
export type DeleteClubMutation = {
  response: DeleteClubMutation$data;
  variables: DeleteClubMutation$variables;
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
    "concreteType": "clubs",
    "kind": "LinkedField",
    "name": "delete_clubs_by_pk",
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
    "name": "DeleteClubMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteClubMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e4dad6892d30fe2457df254238c8c3f0",
    "id": null,
    "metadata": {},
    "name": "DeleteClubMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteClubMutation(\n  $id: uuid!\n) {\n  delete_clubs_by_pk(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8d14ff46e600984c775e6074a1148733";

export default node;
