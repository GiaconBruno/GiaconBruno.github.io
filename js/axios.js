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
    axios.get('https://api.github.com/users/GiaconBruno/repos/')
        .then(function (response) {
            //VARRE TODOS OS DADOS
            response.data.forEach(value => {
                var { name, description } = value;
                //Igonara Repositorio home
                if (name !== "GiaconBruno.github.io") {
                    var content = document.querySelector('#myList');
                    //Valida se first value
                    if (cont === 0) {
                        content.innerHTML = '';
                    }
                    //Cria Elemento 'li'
                    var li = document.createElement('li');
                    //Define Elemento 'li' dentro do Elemento '#myList'
                    content.appendChild(li);
                    //Criar novo registro
                    var list = `<i class="fas fa-check mr-3 text-success"></i>
                                <a href="https://GiaconBruno.github.io/${name}" target="_blank">${name}</a>
                                 - ${description}`;
                    //Define novo registro dentro do 'li'
                    li.innerHTML = list;
                    cont++;
                }
            });
        })
        .catch(function (error) {
            document.querySelector('#myList').innerHTML = `<div class="m-3">
                                                                <h2>Erro ao carregar projetos</h2>
                                                                <span>${error}</span>
                                                            </div>`;
        });
};
