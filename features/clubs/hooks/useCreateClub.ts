import { useMutation } from "react-relay";

import { CreateClubMutation } from "@/features/clubs/graphql/CreateClubMutation";

export const useCreateClub = () => {
  const [commit, isInFlight] = useMutation(CreateClubMutation);

  return {
    createClub: (object: any, onCompleted?: () => void, onError?: (e: Error) => void) => {
      commit({
        variables: { object },
        onCompleted: () => onCompleted?.(),
        onError: (e) => onError?.(e),
      });
    },
    isInFlight,
  };
};
