import {
  createContext,
  type Dispatch,
  type ReactNode,
  useReducer,
  useMemo,
} from "react";

import {
  activityReducer,
  initialState,
  type ActivityActions,
  type ActivityState,
} from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import type { Activity } from "../types";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriesBurned: number;
  netCalories: number;
  categoryName: (category: number) => string[];
  isEmptyActivities: boolean;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  /* Lo que se va a compartir con el provider */

  const [state, dispatch] = useReducer(activityReducer, initialState);

  // Contadores de calores
  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0,
      ),
    [state.activities],
  );

  // Contadores de calores
  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + Number(activity.calories) : total,
        0,
      ),
    [state.activities],
  );
  // Diferencial de calorias
  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [state.activities],
  );

  /* activityList */

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [state.activities],
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities],
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        netCalories,
        categoryName,
        isEmptyActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
