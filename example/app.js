import { lscStorage } from "lsc-storage";
const output = document.getElementById("output");

document.getElementById("add").addEventListener("click", async () => {
  const data = {
    name: "Sabbir",
    age: 21,
  };
  const res = await lscStorage("data", data);
  console.log(res);
});

document.getElementById("get").addEventListener("click", async () => {
  const data = await lscStorage("data");
  console.log(data);
  output.innerHTML = JSON.stringify(data);
});
