import { createContext, createEffect, useContext } from "solid-js";
import { createStore, unwrap } from "solid-js/store";
import { cloneDeep } from "lodash-es";

const CoordinationContext = createContext<any>();

export function CoordinationProvider(props: any) {
  const store = createStore({
    spec: props.spec,
    initialSpec: cloneDeep(props.spec),
    trigger: 0,
  });

  createEffect(() => {
    if(store[0].trigger && props.onConfigChange) {
      props.onConfigChange(unwrap(store[0].spec));
    }
  });
  
  return (
    <CoordinationContext.Provider value={store}>
      {props.children}
    </CoordinationContext.Provider>
  );
}

export function useCoordinationStore() {
  return useContext(CoordinationContext);
}

export function capitalize(word: string | null) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
}

export function useCoordination(viewUid: string, cTypes: string[]) {
  const [state, setState] = useCoordinationStore();

  const coordinationScopes = state.spec.viewCoordination?.[viewUid]?.coordinationScopes;

  const values = Object.fromEntries(cTypes.map((cType) => ([
    cType, () => state.spec.coordinationSpace[cType][coordinationScopes[cType]],
  ])));
  const setters = Object.fromEntries(cTypes.map((cType) => ([
    `set${capitalize(cType)}`, (newValue: any) => {
      setState("spec", "coordinationSpace", cType, coordinationScopes[cType], newValue);
      setState("trigger", state.trigger + 1);
    },
  ])));

  return [values, setters];
}
