import { createSignal, createContext, useContext } from "solid-js";
import { type Accessor } from "solid-js";
import { cloneDeep } from 'lodash-es';



const CoordinationContext = createContext<any>();

export function CoordinationProvider(props: any) {
  const store = {
    spec: props.spec,
    specWithSignals: {
      ...props.spec,
      coordinationSpace: Object.fromEntries(
          Object.entries(props.spec.coordinationSpace || {}).map(([cType, cObj]) => {
            return [cType, Object.fromEntries(Object.entries(cObj || {}).map(([cKey, cValue]) => {
              return [cKey, createSignal(cValue)];
            }))];
          })
        ),
    },
  };

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
  const store = useCoordinationStore();
  const spec = store.specWithSignals;

  const coordinationScopes = spec.viewCoordination?.[viewUid]?.coordinationScopes;

  const values = Object.fromEntries(cTypes.map((cType) => ([
    cType, spec.coordinationSpace[cType][coordinationScopes[cType]][0],
  ])));
  const setters = Object.fromEntries(cTypes.map((cType) => ([
    `set${capitalize(cType)}`, spec.coordinationSpace[cType][coordinationScopes[cType]][1],
  ])));

  return [values, setters];
}
