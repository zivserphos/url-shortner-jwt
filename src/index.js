import axios from "axios";
import "./styles.scss";
const baseServerPath = "http://localhost:3000";

function createElement(tagName, children = [], classes = [], attributes = {}) {
  // create new element in more comfortable
  const el = document.createElement(tagName);
  for (let child of children) {
    // append childs of element
    el.append(child);
  }
  for (let cls of classes) {
    // add all the classes to the element
    el.classList.add(cls);
  }
  for (let attr in attributes) {
    // add all attributes to the element
    el.setAttribute(attr, attributes[attr]);
  }
  return el;
}

// async function getStats(event) {
//   try {
//     const sequence = event.target.dataset.shortUrl;
//     const stats = await axios.get(
//       `${baseServerPath}/api/statistic/${sequence}`
//     );
//   } catch (err) {}
// }

//function handlerStat

async function getShortenUrl(originUrl) {
  try {
    const body = { originUrl: `${originUrl}` };
    const response = await axios.post(`${baseServerPath}/api/shorturl`, body, {
      headers: {
        "content-type": "application/json",
      },
    });
    return response;
  } catch (err) {
    clearResultDiv();
    const errorsDiv = document.querySelector(".errors");
    errorsDiv.textContent = "Invalid Url";
    setTimeout(() => {
      errorsDiv.firstChild.remove();
    }, 3000);
  }
  throw "invalid Url";
}

const createResultDiv = (element, newSequence) => {
  console.log(newSequence);
  element.appendChild(
    createElement("a", `${baseServerPath}/${newSequence}`, ["shortLink"], {
      href: `${baseServerPath}/${newSequence}`,
    })
  );
  element.appendChild(
    createElement(
      "button",
      [createElement("span", "stats")],
      ["statsBtn", "btn"],
      { "data-shorturl": newSequence }
    )
  );
};

function clearResultDiv() {
  const result = document.getElementById("resultUrl");
  result.textContent = "";
}

async function serveUrl() {
  const inputValue = document.getElementById("urlInput").value;
  const newSequence = await getShortenUrl(inputValue);
  const result = document.getElementById("resultUrl");
  clearResultDiv();
  createResultDiv(result, newSequence.data);
}

document
  .getElementById("submitBtn")
  .addEventListener("click", () => serveUrl());
