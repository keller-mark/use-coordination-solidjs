import { createSignal, createContext, useContext } from "solid-js";
import { type Accessor } from "solid-js";

type CounterContextType = [Accessor<number>, { increment: () => void, decrement: () => void }];

const CounterContext = createContext<CounterContextType>();

export function CounterProvider(props: any) {
  const [count, setCount] = createSignal(props.count || 0);
  const counter: CounterContextType  = [
      count,
      {
        increment() {
          setCount(c => c + 1);
        },
        decrement() {
          setCount(c => c - 1);
        }
      }
    ];

  return (
    <CounterContext.Provider value={counter}>
      {props.children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return useContext(CounterContext) as CounterContextType;
}