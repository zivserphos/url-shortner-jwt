import "./styles.scss";
import axios from "axios";

// eslint-disable-next-line camelcase
const Base_Server_Path = "http://localhost:3000";

async function createToken(event) {
  event.preventDefault();
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // eslint-disable-next-line camelcase
    await axios.post(`${Base_Server_Path}/login`, {
      password,
      userName,
    });
    window.location.href = "/app";
    return false;
  } catch (err) {
    return alert("cannot login");
  }
}

document
  .getElementById("login")
  .addEventListener("click", (event) => createToken(event));

// console.log(document.getElementById("login"));
