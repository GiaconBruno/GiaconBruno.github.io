//CRIA FUNCAO ASSINCRONA
const runAxios = async () => {
    //CRIA ELEMENTO DE ESPERAR CARREGAR
    document.querySelector('#myList').innerHTML = `<div class='mt-3'>
                                                    <h3 class="text-left">
                                                        <span>Carregando</span>
                                                            <div class="d-inline-flex min-w">
                                                                <div id="dv1"> </div>
                                                                <div id="dv2"> </div>
                                                                <div id="dv3"> </div>
                                                            </div>
                                                    </h3>
                                                </div>`;
    await dados();
};
runAxios(); //EXECUTA FUNCAO ASSINCRONA

//CRIA FUNCAO GET (BUSCAR DADOS)
function dados() {
    var cont = 0;
    axios.get('https://api.github.com/users/GiaconBruno/repos')
        .then(function (response) {
            //VARRE TODOS OS DADOS
            response.data.forEach(value => {
                var { name, description, updated_at, has_pages } = value;
                //Formatando Data
                updated_at = updated_at.substr(0, 10);
                updated_at = updated_at.slice(8, 10) + "/" + updated_at.slice(5, 7) + "/" + updated_at.slice(0, 4);
                //Verificando se existe page.io
                var icon, link;
                (has_pages === true) ? icon = 'fa-check' : icon = 'fa-times negative';
                (has_pages === true) ? link = 'https://GiaconBruno.github.io/' : link = 'https://github.com/giaconbruno/';
                //Removendo descricao null
                (description === null) ? description = 'Sem descrição' : description;

                //Igonara Repositorio home
                if (name !== "GiaconBruno.github.io") {
                    var content = document.querySelector('#myList');
                    //Valida se first value
                    if (cont === 0) {
                        content.innerHTML = '';
                    }
                    //Cria Elemento 'li'
                    var div = document.createElement('div');
                    //Define Elemento 'li' dentro do Elemento '#myList'
                    content.appendChild(div);
                    //Criar novo registro
                    var list = `<a href="${link + name}" target="_blank">
                                    <div class="item text-break">
                                        <div>
                                            <span class="d-flow float-right data">${updated_at} </span>
                                            <i class="mr-3 mt-2 text-success fas ${icon} fa-lg"></i>
                                            <span class="text-break"><strong>${name}</strong></span>
                                        </div>
                                        <span class="text-break conteudo"> - ${description}</span>
                                     </div>
                                </a>`;
                    //Define novo registro dentro do 'li'
                    div.innerHTML = list;
                    cont++;
                }
            });
        })
        .catch(function (error) {
            (error.message === 'Request failed with status code 404') ? error = 'Projetos Indisponiveis no momento' : error;
            document.querySelector('#myList').innerHTML = `<div class="m-3 text-break">
                                                                <h2>Erro ao carregar projetos</h2>
                                                                <span>${error}</span>
                                                            </div>`
        });
};
