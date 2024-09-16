const hello = (req, res) => (async () => { //async para que o node espere a hora de fazer requisição
    res.json({ status: "ok", "mensagem": "Olá segundo!" });
})();

const helloUser = (request, res) => (async () =>{
    const { username } = request.body
    res.json({ status: "ok", "nomeusuario": username });
})();

module.exports = {
    hello,
    helloUser,
}