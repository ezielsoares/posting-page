class PacoteBuscador {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    put(endpoint, body) {
        return this._send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this._send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this._send("delete", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method, 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const formEL = document.querySelector("#form-posting");
const tituloEl = document.querySelector("#tituloPost");
const conteudoEl = document.querySelector("#conteudoPost");
const botaoEL = document.querySelector("#botao")
const tituloRenderizar = document.querySelector("#renderizador-titulo");
const conteudoRenderizar = document.querySelector("#renderizador-conteudo");


const API = new PacoteBuscador("https://jsonplaceholder.typicode.com");

const obterPostagem = () => {
    API.get("/posts").then(data => {
        tituloRenderizar.innerHTML = data[1].title;
        conteudoRenderizar.innerHTML = data[1].body;
    });
}

formEL.addEventListener("submit", event => {

    event.preventDefault();

    API.post("/posts", {
        title: tituloEl.value,
        category: conteudoEl.value,
        userId:1
    }).then(data => {
        console.log(data);
        if (!data.error) {
            obterPostagem();
        }
    })
    .finally(() => {
        botaoEL.removeAttribute("disabled");
    });
});



