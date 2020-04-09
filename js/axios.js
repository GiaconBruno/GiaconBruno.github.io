//CRIA FUNCAO ASSINCRONA
const runAxios = async () => {
    //CRIA ELEMENTO DE ESPERAR CARREGAR
    document.querySelector('#myList').innerHTML = `<div class='p-3 mt-5'>
                                                    <h3>Carregando 
                                                        <div id="dv1"></div>
                                                        <div id="dv2"></div>
                                                        <div id="dv3"></div>
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
                var { name, description, updated_at } = value;
                updated_at = updated_at.substr(0, 10);
                updated_at = updated_at.slice(8, 10) + "/" + updated_at.slice(5, 7) + "/" + updated_at.slice(0, 4);
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
                    var list = `<a href="https://GiaconBruno.github.io/${name}" target="_blank">
                                    <div class="item text-break">
                                        <div class="d-flow">
                                            <i class="fas fa-check mr-3 mt-2 text-success float-left fa-lg"></i>
                                            <span class="float-right">${updated_at} </span>
                                            <span class="float-left"><strong>${name}</strong></span>
                                        </div>
                                        <span> - ${description}</span>
                                     </div>
                                </a>`;
                    //Define novo registro dentro do 'li'
                    div.innerHTML = list;
                    cont++;
                }
            });
        })
        .catch(function (error) {
            document.querySelector('#myList').innerHTML = `<div class="m-3 text-break">
                                                                <h2>Erro ao carregar projetos</h2>
                                                                <span>${error}</span>
                                                            </div>`;
        });
};
