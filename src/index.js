import axios from "axios";
import "./styles.scss";
import "./download.png";
const Base_Server_Path = "ziv-url-shortener.herokuapp.com";

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
    const stats = await axios.get(`/api/statistic/${sequence}`);
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
    const response = await axios.post(`/api/shorturl`, body, {
      headers: {
        "content-type": "application/json",
      },
    });
    return response;
  } catch (err) {
    const errorMessage = err.response.data.error;
    console.log(errorMessage);
    clearResultDiv();
    const errorsDiv = document.querySelector(".errors");
    errorsDiv.textContent = errorMessage;
    setTimeout(() => {
      errorsDiv.firstChild.remove();
    }, 3000);
  }
}

const createResultDiv = (element, newSequence) => {
  element.appendChild(
    createElement("a", `/${newSequence}`, ["shortLink"], {
      href: `${Base_Server_Path}/${newSequence}`,
    })
  );
  element.appendChild(
    createElement(
      "button",
      [createElement("span", "stats", [], { "data-shorturl": newSequence })],
      ["statsBtn", "btn"],
      { "data-shorturl": newSequence }
    )
  );
  element.children[1].addEventListener("click", (event) => handlerStat(event));
};

function clearResultDiv() {
  const result = document.getElementById("resultUrl");
  result.textContent = "";
}

async function serveUrl() {
  const inputValue = document.getElementById("urlInput").value;
  try {
    const newSequence = await getShortenUrl(inputValue);
    const result = document.getElementById("resultUrl");
    clearResultDiv();
    createResultDiv(result, newSequence.data);
  } catch (err) {
    return;
  }
}

document
  .getElementById("submitBtn")
  .addEventListener("click", () => serveUrl());

document
  .getElementById("closeStatInfo")
  .addEventListener("click", () => closeStatsInfo());
