(function () {
  "use strict";

  const form = document.querySelector("form");
  const names = document.querySelector("#names");
  const resposta = document.querySelector("#respostas");

  const BASE_URL =
    "https://interdisciplinar-prob-poo.herokuapp.com/naive_bayes";
  // const BASE_URL = "http://127.0.0.1:5000/naive_bayes";

  const handleResponse = ({ names_by_gender: data }) => {
    resposta.value =
      " " +
      Object.entries(data)
        .map(([name, gender]) => `${name}: ${gender}`)
        .join("\n");
  };

  /**
   * @param {Event} e FormEvent
   */
  const handleChange = ({ target }) => {
    namesData = target.value;
  };

  /**
   * @param {Event} e FormEvent
   */
  const submit = (e) => {
    e.preventDefault();

    let namesData = names.value;

    if (namesData === "") {
      resposta.value = "Nada para descobrir!";
      return;
    }

    resposta.value = "Descobrindo...";

    if (typeof namesData !== "object") {
      namesData = namesData
        .split(",")
        .filter((name) => {
          const firstName = name.split("s")[0];

          return firstName;
        })
        .map((name) => name.replace("s|\n", ""));
    }

    const data = { nomes: namesData };

    fetch(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
    })
      .then((rawData) => rawData.json())
      .then(handleResponse)
      .catch((error) => console.log(`Error: ${error}`));
  };

  const load = () => {
    form.addEventListener("submit", submit);
    resposta.disabled = true;
  };

  window.addEventListener("load", load);
})();
