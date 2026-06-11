// ===== PERGUNTAS DO QUIZ =====
const perguntas = [
    { pergunta: "O que é agricultura sustentável?", opcoes: ["Usar muitos agrotóxicos", "Produzir preservando o meio ambiente", "Desmatar para plantar", "Usar só máquinas"], correta: 1 },
    { pergunta: "Qual prática economiza água no campo?", opcoes: ["Aspersão o dia todo", "Irrigação por gotejamento", "Deixar torneira aberta", "Molhar ao meio-dia"], correta: 1 },
    { pergunta: "O que é compostagem?", opcoes: ["Queimar lixo", "Jogar resto no rio", "Transformar orgânicos em adubo", "Usar fertilizante químico"], correta: 2 },
    { pergunta: "Vantagem do controle biológico?", opcoes: ["Usar venenos fortes", "Usar inimigos naturais", "Deixar pragas crescer", "Queimar plantação"], correta: 1 },
    { pergunta: "O que é agrofloresta?", opcoes: ["Plantar só uma árvore", "Sistema com árvores + culturas + animais", "Desmatar floresta", "Usar agrotóxicos"], correta: 1 },
    { pergunta: "Benefício do plantio direto?", opcoes: ["Aumenta erosão", "Protege solo com palha", "Remove vegetação", "Usa mais água"], correta: 1 },
    { pergunta: "O que são agrotóxicos?", opcoes: ["Produtos naturais", "Químicos que prejudicam saúde", "Fertilizantes orgânicos", "Sementes modificadas"], correta: 1 },
    { pergunta: "Importância das abelhas?", opcoes: ["Comem plantações", "Polinizam culturas", "Destroem pragas", "Não têm importância"], correta: 1 },
    { pergunta: "Produção orgânica significa?", opcoes: ["Sem agrotóxicos", "Em estufas", "Só grãos", "Com fertilizantes químicos"], correta: 0 },
    { pergunta: "Ação NÃO sustentável?", opcoes: ["Reaproveitar água", "Fazer queimadas", "Plantar árvores", "Compostagem"], correta: 1 },
    { pergunta: "O que são transgênicos (OGMs)?", opcoes: ["Alimentos sem água", "Organismos modificados", "Orgânicos", "Congelados"], correta: 1 },
    { pergunta: "Relação desmatamento x agricultura?", opcoes: ["Desmatar é bom", "Agricultura causa desmatamento", "Não tem relação", "Desmatamento ajuda a chover"], correta: 1 },
    { pergunta: "O que é rotação de culturas?", opcoes: ["Plantar sempre igual", "Alternar culturas", "Girar plantas", "Plantar em círculo"], correta: 1 },
    { pergunta: "Exemplo de energia renovável na fazenda?", opcoes: ["Gerador a diesel", "Placa solar", "Queima de carvão", "Velas"], correta: 1 },
    { pergunta: "Como agricultura sustentável ajuda no clima?", opcoes: ["Aumentando queimadas", "Plantando árvores e reduzindo emissões", "Usando agrotóxicos", "Desmatando"], correta: 1 }
];

let perguntaAtual = 0, pontuacao = 0, respostaSelecionada = null;

function iniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    document.getElementById('quizInicio').style.display = 'none';
    document.getElementById('quizResultado').style.display = 'none';
    mostrarPergunta();
}

function mostrarPergunta() {
    const p = perguntas[perguntaAtual];
    const html = `
        <div class="quiz-header">
            <span class="quiz-contador">📋 Questão ${perguntaAtual + 1}/${perguntas.length}</span>
            <span class="quiz-pontos">⭐ Pontos: ${pontuacao}</span>
        </div>
        <div class="pergunta">${p.pergunta}</div>
        <div class="opcoes" id="opcoes">
            ${p.opcoes.map((op, i) => `<div class="opcao" onclick="selecionarResposta(${i})">${op}</div>`).join('')}
        </div>
        <button class="btn" onclick="proximaPergunta()" style="margin-top:20px">${perguntaAtual === perguntas.length - 1 ? '🏆 Finalizar' : '→ Próxima'}</button>
    `;
    document.getElementById('quizPergunta').style.display = 'block';
    document.getElementById('quizPergunta').innerHTML = html;
    respostaSelecionada = null;
}

function selecionarResposta(idx) {
    if (respostaSelecionada !== null) return;
    respostaSelecionada = idx;
    const p = perguntas[perguntaAtual];
    const opcoesDiv = document.querySelectorAll('.opcao');
    opcoesDiv.forEach((op, i) => {
        if (i === p.correta) op.classList.add('correta');
        if (i === idx && i !== p.correta) op.classList.add('errada');
    });
    if (idx === p.correta) pontuacao++;
}

function proximaPergunta() {
    if (respostaSelecionada === null) {
        alert('📢 Selecione uma resposta!');
        return;
    }
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    document.getElementById('quizPergunta').style.display = 'none';
    const percentual = (pontuacao / perguntas.length) * 100;
    let medalha, titulo, mensagem;
    
    if (percentual >= 80) {
        medalha = '🏆🌿👑'; titulo = 'MEDALHA DE OURO!'; mensagem = 'Parabéns! Você é um especialista em agro sustentável!';
    } else if (percentual >= 60) {
        medalha = '🥈⭐'; titulo = 'MEDALHA DE PRATA!'; mensagem = 'Muito bem! Continue aprendendo sobre sustentabilidade!';
    } else if (percentual >= 40) {
        medalha = '🥉🌱'; titulo = 'MEDALHA DE BRONZE!'; mensagem = 'Bom trabalho! Reveja as práticas sustentáveis.';
    } else {
        medalha = '📚🌿'; titulo = 'CERTIFICADO DE PARTICIPAÇÃO'; mensagem = 'Continue estudando! Você vai melhorar.';
    }
    
    document.getElementById('quizResultado').innerHTML = `
        <div class="resultado-final">
            <div class="medalha">${medalha}</div>
            <h3>${titulo}</h3>
            <p style="font-size:2rem; font-weight:bold; margin:16px 0">${pontuacao} / ${perguntas.length}</p>
            <p>${mensagem}</p>
            <div class="botoes-final">
                <button class="btn-refazer" onclick="reiniciarQuiz()">🔄 Refazer Quiz</button>
                <button class="btn-compartilhar" onclick="compartilhar()">📢 Compartilhar</button>
            </div>
        </div>
    `;
    document.getElementById('quizResultado').style.display = 'block';
}

function reiniciarQuiz() {
    document.getElementById('quizResultado').style.display = 'none';
    document.getElementById('quizInicio').style.display = 'block';
}

function compartilhar() {
    const texto = `🌿 Fiz ${pontuacao} de ${perguntas.length} no quiz do AgroSustentável! Teste seus conhecimentos sobre agricultura sustentável!`;
    if (navigator.share) navigator.share({ title: 'Quiz AgroSustentável', text: texto });
    else { navigator.clipboard.writeText(texto); alert('📋 Copiado! Cole onde quiser.'); }
}

// ===== CALCULADORA =====
function calcular() {
    const tipo = document.getElementById('tipo').value;
    const kg = parseFloat(document.getElementById('kg').value);
    const modo = document.getElementById('modo').value;
    
    const fatores = { hortalica: 0.5, carne: 27, frango: 6.9, leite: 1.5 };
    const fatorModo = { convencional: 1, organico: 0.7 };
    const total = fatores[tipo] * kg * fatorModo[modo];
    
    let sugestao = '';
    if (tipo === 'carne') sugestao = '💡 Prefira carnes de frango ou vegetais.';
    else if (modo === 'organico') sugestao = '🌱 Boa escolha! Orgânico reduz emissões.';
    else sugestao = '🌍 Consuma alimentos locais e orgânicos.';
    
    document.getElementById('resultado').innerHTML = `
        <div class="resultado-valor">${total.toFixed(2)} kg CO₂</div>
        <p>Pegada de carbono do seu consumo</p>
        <p style="font-size:0.9rem">${sugestao}</p>
    `;
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});