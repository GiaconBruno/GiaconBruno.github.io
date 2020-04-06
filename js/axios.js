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
    var cont = 0;
    axios.get('https://api.github.com/users/GiaconBruno/repos')
        .then(function (response) {
            //VARRE TODOS OS DADOS
            response.data.forEach(value => {
                var { name, description, html_url } = value;

                var content = document.querySelector('#myList');
                if (cont === 0) {
                    content.innerHTML = '';
                }

                var li = document.createElement('li');
                content.appendChild(li);
                var list = `<i class="fas fa-check mr-3"></i><a href="./${name}"></a> - ${description}`;
                li.innerHTML = list;
                cont++;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}