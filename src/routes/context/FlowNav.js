import { useContext, createContext } from "react";

export const PortalContext = createContext({
  portalDate: "",
  setPortalData: "",
});

export const ContextProvider = PortalContext.Provider;

export function useFlow() {
  return useContext(PortalContext);
}
