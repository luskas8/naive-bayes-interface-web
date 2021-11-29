const form = document.querySelector("form");
const names = document.querySelector("#names");
const resposta = document.querySelector("#respostas");

const BASE_URL = "https://interdisciplinar-prob-poo.herokuapp.com/naive_bayes";
// const BASE_URL = "http://127.0.0.1:5000/naive_bayes";

const handleResponse = (response) => {
  const data = response.names_by_gender;
  let text_resposta = "";

  Object.keys(data).map(key => {
    text_resposta += `${key}: ${data[key]}\n`;
  })

  console.log(text_resposta);
  resposta.value = text_resposta;
}

/**
 * @param {Event} e FormEvent
 */
const handleChange = (e) => {
  const { value } = e.target;
  console.log(value)
  namesData = value;
}

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

  if (typeof namesData !== 'object') {
    namesData = namesData.split(",").map(name => { return name.replace(" ", "").replace("\n", "") });
  }

  const data = { "nomes": namesData };

  fetch(BASE_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'cors',
  })
    .then(rawData => { return rawData.json() })
    .then(handleResponse)
    .catch(error => console.log(`Error: ${error}`))
};

const load = () => {
  form.addEventListener('submit', submit);
  resposta.disabled = true;
}

window.addEventListener('load', load)