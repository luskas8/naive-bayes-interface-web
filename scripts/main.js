const form = document.querySelector("form");
const names = document.querySelector("#names");
const resposta = document.querySelector("#respostas");

const _URL = "";

let namesData = "";

const handleResponse = (response) => {

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

  resposta.value = "Descobrindo...";
  resposta.disabled = true;

  if (typeof namesData !== 'object') {
    namesData = namesData.split(",").map(name => { return name.replace(" ", "").replace("\n", "") });
  }

  fetch(_URL, {
    method: 'POST',
    data: namesData,
    mode: 'cors',
  })
    .then(rawData => { return rawData.json })
    .then(handleResponse)
    .catch(error => console.log(`Error: ${error}`))
};

const load = () => {
  form.addEventListener('submit', submit);

  names.addEventListener('keypress', handleChange)
}

window.addEventListener('load', load)