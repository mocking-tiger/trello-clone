import "./App.css";
import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "./atoms";
import { FormEvent } from "react";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinutesChange = (event: FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // string에 +를 붙이면 number로 형변환 됨
  };

  const onHoursChange = (event: FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default App;
