import * as React from "react";
import { useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";

import { createEnvironment } from "@/relay/environment";

export const RelayEnvironment = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const environment = useMemo(() => {
    return createEnvironment();
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};
