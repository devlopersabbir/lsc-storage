import { lsc } from "../../libs";
const output = document.getElementById("output");

document.getElementById("add").addEventListener("click", () => {
  const data = {
    name: "Sabbir",
    age: 21,
  };
  const res = lsc("data", data);
  console.log(res);
});

document.getElementById("get").addEventListener("click", () => {
  const data = lsc("data");
  console.log(data);
  output.innerHTML = JSON.stringify(data);
});
