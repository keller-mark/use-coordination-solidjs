import type { Component } from 'solid-js';
import { CoordinationProvider, useCoordination } from './hooks.js';

const SliderInner: Component = (props: any) => {
  const {
    sliderValue,
    setSliderValue
  } = props;
  function handleChange(e: any) {
    setSliderValue(parseFloat(e.target.value))
  }
  return (
    <div>
      <input type="range" min="0" max="1" step="0.01" value={sliderValue()} onInput={handleChange} />
    </div>
  );
};

const SliderView: Component<{ viewUid: string }> = (props: any) => {
  const { viewUid } = props;
  const [{
    sliderValue
  }, {
    setSliderValue
  }] = useCoordination(viewUid, ["sliderValue"]);
  return (
    <div>
      <SliderInner sliderValue={sliderValue} setSliderValue={setSliderValue} />
    </div>
  );
};

const initialSpec = {
  "key": 1,
  "coordinationSpace": {
    "sliderValue": {
      "A": 0.5,
      "B": 0.75,
      "C": 0.25
    }
  },
  "viewCoordination": {
    "slider1": {
      "coordinationScopes": {
        "sliderValue": "A"
      }
    },
    "slider2": {
      "coordinationScopes": {
        "sliderValue": "A"
      }
    },
    "slider3": {
      "coordinationScopes": {
        "sliderValue": "C"
      }
    }
  }
};

const App: Component = () => {
  return (
    <CoordinationProvider spec={initialSpec}>
      <SliderView viewUid="slider1" />
      <SliderView viewUid="slider2" />
      <SliderView viewUid="slider3" />
    </CoordinationProvider>
  );
};

export default App;
