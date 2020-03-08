// configurando o servidor
const express = require("express")
const server = express()

// configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//habiliar body do formulário
server.use(express.urlencoded({extended: true}))

//configurar a conexão com o banco de dados
// const Pool = require('pg').Pool
// const db = new Pool({   //igual a tela do postbird (que eu não consegui abrir)
//     user:'postgres',
//     password: '0000',
//     host:'localhost',
//     post:5432,
//     database:'doe'
// })


// configrando a template engine(motor) (que é o nunjucks)
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true
})

// lista de doadores
const donors = [
    {
        name: "Kátia Menezes",
        blood: "A+"
    },
    {
        name: "Cleiton Fernandes",
        blood: "AB+"
    },
    {
        name: "Lúcia Pereira",
        blood: "B-"
    },
    {
        name: "Gelton Filho",
        blood: "O+"
    },
]

//configurar a apresentação da página
server.get("/", function (req, res) {
    return res.render("index.html", { donors })
})

server.post("/", function (req, res) {
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //coloco valores dentro do array
    donors.push({
        name: name,
        blood: blood,
    })

    return res.redirect("/")
})






//ligar o servidor e permitir o aceso pela porta 3000
server.listen(3000)