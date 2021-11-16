import axios from "axios";
import "./styles.scss";

// eslint-disable-next-line camelcase
const Base_Server_Path = "http://localhost:3000";

async function createNewUser(event) {
  event.preventDefault();
  console.log("im here");
  const newUser = {
    userName: document.getElementById("username").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
  };
  try {
    // eslint-disable-next-line camelcase
    await axios.post(`${Base_Server_Path}/signUp`, {
      newUser,
    });
    console.log("window.location");
    window.location.href = "/app/login";
  } catch (err) {
    alert("sign up failed");
  }
}

document
  .getElementById("signUp")
  .addEventListener("click", (event) => createNewUser(event));
