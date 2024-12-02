// Seleciona o elemento onde a data será exibida
const dataElement = document.getElementById("data");

// Função para formatar e exibir a data
function atualizarData() {
    const hoje = new Date();
    const opcoes = { year: 'numeric', month: 'long' };
    const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);

    // Exibe a data formatada
    dataElement.textContent = dataFormatada;
}

// Função para verificar se é fim de semana
function verificarFimDeSemana(dia, linha) {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth(); // Lembre-se que os meses em JavaScript são baseados em 0 (0 = janeiro, 11 = dezembro)
    const data = new Date(ano, mes, dia);

    // Verifica se o dia é sábado (6) ou domingo (0)
    const diaSemana = data.getDay();
    if (diaSemana === 0 || diaSemana === 6) { // 0 = Domingo, 6 = Sábado
        // Desabilita os campos de entrada e o select
        linha.querySelectorAll('input, select').forEach(element => {
            element.disabled = true;
        });
    }
}

// Função para gerar a tabela e carregar os dados salvos
function gerarTabela() {
    const tabela = document.querySelector('tbody');
    for (let dia = 1; dia <= 31; dia++) {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${dia}</td>
            <td><input type="time" id="chegada-${dia}" placeholder="--:--"></td>
            <td><input type="time" id="saida-almoco-${dia}" placeholder="--:--"></td>
            <td><input type="time" id="saida-${dia}" placeholder="--:--"></td>
            <td>
                <select id="modalidade-${dia}">
                    <option value="Presencial">Presencial</option>
                    <option value="Home">Home</option>
                </select>
            </td>
        `;

        // Verifica se o dia é fim de semana
        verificarFimDeSemana(dia, tr);
        
        tabela.appendChild(tr);

        // Carrega os dados salvos (se houver)
        carregarDados(dia);
    }
}

// Função para salvar os dados no localStorage
function salvarDados(dia) {
    const chegada = document.getElementById(`chegada-${dia}`).value;
    const saidaAlmoco = document.getElementById(`saida-almoco-${dia}`).value;
    const saida = document.getElementById(`saida-${dia}`).value;
    const modalidade = document.getElementById(`modalidade-${dia}`).value;

    const dadosDia = {
        chegada,
        saidaAlmoco,
        saida,
        modalidade
    };

    // Salva os dados no localStorage
    localStorage.setItem(`dia-${dia}`, JSON.stringify(dadosDia));
}

// Função para carregar os dados salvos do localStorage
function carregarDados(dia) {
    const dadosSalvos = localStorage.getItem(`dia-${dia}`);
    if (dadosSalvos) {
        const { chegada, saidaAlmoco, saida, modalidade } = JSON.parse(dadosSalvos);

        // Preenche os campos com os dados salvos
        document.getElementById(`chegada-${dia}`).value = chegada;
        document.getElementById(`saida-almoco-${dia}`).value = saidaAlmoco;
        document.getElementById(`saida-${dia}`).value = saida;
        document.getElementById(`modalidade-${dia}`).value = modalidade;
    }
}

// Adiciona um ouvinte para salvar os dados sempre que o usuário alterar um campo
document.addEventListener('input', (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
        const dia = event.target.id.split('-')[1]; // Extrai o dia do id do elemento
        salvarDados(dia);
    }
});

// Atualiza a data assim que a página carrega
atualizarData();
// Gera a tabela
gerarTabela();

