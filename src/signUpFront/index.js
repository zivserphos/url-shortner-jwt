import axios from "axios";
import "./styles.scss";
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
    const response = await axios.post(`${Base_Server_Path}/signUp`, {
      newUser,
    });
  } catch (err) {
    throw err;
  }
}

document
  .getElementById("signUp")
  .addEventListener("click", (event) => createNewUser(event));
