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

async function getStats(event) {
  try {
    const sequence = event.target.dataset.shorturl;
    const stats = await axios.get(
      `${baseServerPath}/api/statistic/${sequence}`
    );
    return stats;
  } catch (err) {}
}

async function handlerStat(event) {
  const stats = await getStats(event);
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  document.getElementById("wrapper").style.display = "none";
  for (let stat in stats.data) {
    const statData = createElement(
      "LI",
      [`${stat}: ${stats.data[stat]}`],
      ["statLi"]
    );
    modal.children[1].append(statData);
  }
}

function closeStatsInfo() {
  const modal = document.getElementById("modal");
  document.querySelector(".details-modal-content").textContent = "";
  modal.style.display = "none";
  document.getElementById("wrapper").style.display = "flex";
}

async function getShortenUrl(originUrl) {
  try {
    const body = { originUrl: `${originUrl}` };
    const response = await axios.post(`${baseServerPath}/api/shorturl`, body, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(`${baseServerPath}/api/shorturl`);
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
  console.log(
    element.children[1].addEventListener("click", (event) => handlerStat(event))
  );
};

function clearResultDiv() {
  const result = document.getElementById("resultUrl");
  console.log(result);
  result.textContent = "";
  console.log(result);
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

document
  .getElementById("closeStatInfo")
  .addEventListener("click", () => closeStatsInfo());
