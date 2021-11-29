const form = document.querySelector("form");
const names = document.querySelector("#names");
const resposta = document.querySelector("#respostas");

const BASE_URL = "https://interdisciplinar-prob-poo.herokuapp.com/naive_bayes";

const handleResponse = (response) => {
  console.log(response);
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

  resposta.value = "Descobrindo...";
  resposta.disabled = true;

  if (typeof namesData !== 'object') {
    namesData = namesData.split(",").map(name => { return name.replace(" ", "").replace("\n", "") });
  }

  const data = { "nomes": namesData };
  console.log(data);

  fetch(BASE_URL, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Headers': "*",
    },
    method: 'POST',
    body: JSON.parse({"nomes": namesData}),
    mode: 'cors',
  })
    .then(rawData => { return rawData.json() })
    .then(handleResponse)
    .catch(error => console.log(`Error: ${error}`))
};

const load = () => {
  form.addEventListener('submit', submit);
}

window.addEventListener('load', load)