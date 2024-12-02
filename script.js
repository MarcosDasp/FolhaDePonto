// Função para formatar e exibir a data
function atualizarData() {
    const hoje = new Date();
    const opcoes = { year: 'numeric', month: 'long' };
    const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
    const dataElement = document.getElementById("data");
    dataElement.textContent = dataFormatada;
}

// Função para verificar se é fim de semana
function verificarFimDeSemana(dia, linha) {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const data = new Date(ano, mes, dia);
    const diaSemana = data.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
        linha.querySelectorAll('input, select').forEach(element => {
            element.disabled = true;
        });
    }
}

// Função para gerar a tabela
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
        verificarFimDeSemana(dia, tr);
        tabela.appendChild(tr);
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

    localStorage.setItem(`dia-${dia}`, JSON.stringify(dadosDia));
}

// Função para carregar os dados salvos do localStorage
function carregarDados(dia) {
    const dadosSalvos = localStorage.getItem(`dia-${dia}`);
    if (dadosSalvos) {
        const { chegada, saidaAlmoco, saida, modalidade } = JSON.parse(dadosSalvos);
        document.getElementById(`chegada-${dia}`).value = chegada;
        document.getElementById(`saida-almoco-${dia}`).value = saidaAlmoco;
        document.getElementById(`saida-${dia}`).value = saida;
        document.getElementById(`modalidade-${dia}`).value = modalidade;
    }
}

document.addEventListener('input', (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
        const dia = event.target.id.split('-')[1];
        salvarDados(dia);
    }
});

atualizarData();
gerarTabela();
