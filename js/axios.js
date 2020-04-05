//CRIA FUNCAO ASSINCRONA
const runAxios = async () => {
    //CRIA ELEMENTO DE ESPERAR CARREGAR
    document.querySelector('#myList').innerHTML = `<div class='p-3 mt-5'>
                                                    <h3>Carregando 
                                                        <div class='spinner-grow text-success'></div>
                                                        <div class='spinner-grow text-success'></div>
                                                        <div class='spinner-grow text-success'></div>
                                                    </h3>
                                                </div>`;
    await dados();
};
runAxios(); //EXECUTA FUNCAO ASSINCRONA

//CRIA FUNCAO GET (BUSCAR DADOS)
function dados() {
    axios.get('https://api.github.com/users/GiaconBruno/repos')
        .then(function (response) {
            //VARRE TODOS OS DADOS
            response.data.forEach(value => {
                var { name, description, html_url } = value;
                console.log(value);

                var title = document.createAttribute("div");
                var text = document.createTextNode("Projeto");
                console.log(title);
                console.log(text);

                title.appendChild(text);

                var content = document.querySelector('#myList');
                // content.appendChild(title);

                var ul = document.createAttribute('ul');

                var repos = `<li><a href="${html_url}"/index.html>${name}</a> - ${description}</li>`

                // ul.appendChild(repos);

            });
        })
        .catch(function (error) {
            console.log(error);
        });
}