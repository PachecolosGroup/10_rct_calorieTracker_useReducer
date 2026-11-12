import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext.tsx";

export const useActivity = () => {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "El hook useActiviy debe ser usado dentro de un ActivityProvider",
    );
  }

  return context;
};
