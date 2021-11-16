import "./styles.scss";
import axios from "axios";
const Base_Server_Path = "http://localhost:3000";

async function createToken(event) {
  event.preventDefault();
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await axios.post(`${Base_Server_Path}/login`, {
      password,
      userName,
    });
    window.location.href = "/app";
  } catch (err) {
    console.log(err);
    alert("cannot login");
  }
}

document
  .getElementById("login")
  .addEventListener("click", (event) => createToken(event));

//console.log(document.getElementById("login"));
