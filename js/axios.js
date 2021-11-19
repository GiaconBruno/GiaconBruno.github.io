//CRIA FUNCAO ASSINCRONA
const runAxios = async () => {
    //CRIA ELEMENTO DE ESPERAR CARREGAR
    document.querySelector('#myList').innerHTML = `<div class='mt-3 w-100'>
                                                    <h3 class="text-center">
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
    let cont = 0;
    axios.get('https://api.github.com/users/GiaconBruno/repos?sort=created')
        .then(function (response) {
            //VARRE TODOS OS DADOS
            response.data.forEach(value => {
                let { name, description, updated_at, created_at, has_pages, homepage } = value;
                //Formatando Data
                // updated_at = updated_at.substr(0, 10);
                // updated_at = updated_at.slice(8, 10) + "/" + updated_at.slice(5, 7) + "/" + updated_at.slice(0, 4);
                // updated_at = updated_at.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/g, '\$3-\$2-\$1')
                updated_at = updated_at.slice(0, 10).split('-').reverse().join('/')
                created_at = created_at.slice(0, 10).split('-').reverse().join('/')
                //Verificando se existe page.io
                let icon, link;
                icon = (has_pages || homepage) ? 'fa-check' : 'fa-times negative';
                link = (homepage) ? homepage :
                    (has_pages) ? 'https://GiaconBruno.github.io/' : 'https://github.com/giaconbruno/';

                //Removendo descricao null
                description = (description === null) ? 'Sem descrição' : description;

                //Igonara Repositorios
                if (name !== "GiaconBruno.github.io") {
                    let content = document.querySelector('#myList');
                    //Valida se first value
                    if (!cont) content.innerHTML = '';
                    // Cria Elemento 'div'
                    let div = document.createElement('div');
                    div.classList.add("col-12");
                    div.classList.add("col-lg-6");
                    // Define Elemento 'div' dentro do Elemento '#myList'
                    content.appendChild(div);
                    // Criar novo registro
                    let list = `<a href="${link + name}" target="_blank">
                                    <div class="item text-break">
                                    <div class="row m-0 justify-content-between">
                                    <div class="col-auto px-0 data">Criado em: ${created_at} </div>
                                    <div class="col-auto px-0 text-right data">Atualizado em: ${updated_at} </div>
                                    <div class="position-absolute" style="top:0px;left:.5rem;right:.5rem">
                                            </div>
                                        </div>
                                        <div>
                                            <i class="mr-3 mt-2 text-success fas ${icon} fa-lg"></i>
                                            <span class="text-break"><strong>${name}</strong></span>
                                        </div>
                                        <span class="text-break conteudo"> - ${description}</span>
                                     </div>
                                </a>`;
                    //Define novo registro dentro da 'div'
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
