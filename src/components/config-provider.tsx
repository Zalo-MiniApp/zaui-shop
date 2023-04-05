import React from "react";
import { ReactNode, useEffect } from "react";
import appConfig from "../../app-config.json";

export function getConfig<T>(getter: (config: typeof appConfig) => T) {
  return getter(appConfig);
}

export const ConfigProvider = ({
  children,
  cssVariables,
}: {
  children: ReactNode;
  cssVariables: Record<string, string>;
}) => {
  useEffect(() => {
    Object.keys(cssVariables)
      .filter((cv) => cssVariables[cv])
      .forEach((cv) => {
        document.documentElement.style.setProperty(`${cv}`, cssVariables[cv]);
      });
    return () => {
      Object.keys(cssVariables).forEach((cv) => {
        document.documentElement.style.removeProperty(`${cv}`);
      });
    };
  }, [cssVariables]);
  return <>{children}</>;
};
