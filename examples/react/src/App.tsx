import { useState } from "react";
import { lsc } from "lsc-storage";
import "./App.css";

type User = {
  name: string;
  age: number;
};
function App() {
  const [output, setOutput] = useState<User>();
  const [data, setData] = useState<User>({
    name: "",
    age: 21,
  });

  return (
    <>
      <input
        onChange={(e) => setData({ name: e.target.value, age: 20 })}
        type="text"
      />

      <button onClick={() => lsc.set("user", data)}>add</button>
      <p>{output?.name}</p>
      <button
        onClick={async () => {
          const res = lsc.get<User>("user");
          if (res) {
            setOutput(res);
          } else {
            console.log("No data found");
          }
        }}
      >
        Get
      </button>
    </>
  );
}

export default App;
