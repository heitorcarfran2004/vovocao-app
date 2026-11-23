// Rotina de 10 minutos, perguntas do check-up semanal, escala "Dias bons" e o exemplo do Assistente 24h.
// Tokens (o app troca pelo cão do usuário): {nome} {ele} {Ele} {dele} {o} {O}. **negrito** permitido.

// Os 7 sinais do radar (mesma ordem e mesmas chaves do quiz).
window.SINAIS7 = [
  { id: 'apetite', nome: 'Apetite', emoji: '🍖', ex: 'come, recusa, só na mão' },
  { id: 'agua', nome: 'Água e xixi', emoji: '💧', ex: 'quanto bebe, quanto faz' },
  { id: 'patas', nome: 'Patas e coluna', emoji: '🐾', ex: 'levantar, escorregar, subir' },
  { id: 'noite', nome: 'Sono, noite e cabeça', emoji: '🌙', ex: 'sono, madrugada, desorientação' },
  { id: 'boca', nome: 'Boca e dentes', emoji: '🦷', ex: 'hálito, tártaro, gengiva' },
  { id: 'respiracao', nome: 'Respiração e coração', emoji: '❤️', ex: 'tosse, cansaço, ofegar' },
  { id: 'caroco', nome: 'Caroços e gengiva', emoji: '🔎', ex: 'caroço novo, gengiva pálida' },
];

// Check-up semanal: 1 pergunta por sinal. As 2 perguntas da raça (FICHAS[x].perguntas) entram no lugar
// da pergunta do mesmo sinal, ou se somam quando o assunto é outro (coluna, gengiva).
// op = rótulos das 4 respostas: [atenção, atenção, observar, não observado]
window.CHECKUP_PERGUNTAS = {
  apetite: { emoji: '🍖', q: 'Nesta semana, {o} {nome} ficou mais chat{o} para comer, deixou comida no pote ou só comeu na mão?' },
  agua: { emoji: '💧', q: '{Ele} bebeu mais água que o normal, ou fez mais xixi, dentro de casa ou dormindo?' },
  patas: { emoji: '🐾', q: '{O} {nome} demorou para levantar, escorregou, mancou ou desistiu do sofá e da escada?' },
  noite: { emoji: '🌙', q: '{Ele} andou pela casa de madrugada, ficou girando, parad{o} olhando a parede ou pareceu perdid{o}?' },
  boca: { emoji: '🦷', q: 'Sentiu mau hálito forte, viu gengiva vermelha, baba, ou {ele} mastigando de um lado só?' },
  respiracao: { emoji: '❤️', q: '{O} {nome} tossiu, ofegou parad{o}, cansou mais rápido no passeio ou respirou rápido dormindo?' },
  caroco: { emoji: '🔎', q: 'Passando a mão no corpo {dele}: achou caroço novo, um que cresceu, ou a gengiva mais clara?', op: ['Sim', 'Não tenho certeza', 'Não', 'Não olhei'] },
};
window.CHECKUP_OPCOES = [
  { e: '😟', t: 'Sim', st: 'atencao' },
  { e: '🤔', t: 'Às vezes', st: 'atencao' },
  { e: '🙂', t: 'Não', st: 'observar' },
  { e: '🤷', t: 'Não reparei', st: 'nao' },
];

// "Leve ao veterinário: o que dizer", por sinal (aparece quando o sinal fica em Atenção de novo, piora ou é novo).
// REVISAR VET: redação das frases e do critério de quando sugerir a consulta.
window.VET_DIZER = {
  apetite: '"Há [tempo] {o} {nome} está comendo menos / só come na mão. Ainda bebe água? [sim/não]. Teve vômito ou diarreia? [sim/não]."',
  agua: '"{O} {nome} está bebendo mais água que antes. Medi em casa: [quantidade] em 24 horas. Também está fazendo mais xixi [em casa / dormindo]."',
  patas: '"{O} {nome} está demorando para levantar e escorregando há [tempo]. Parou de subir no sofá. Pode ser dor? Trouxe um vídeo."',
  noite: '"{O} {nome} anda pela casa de madrugada e às vezes fica parad{o} olhando a parede. Começou há [tempo]. Pode ser a cabeça da idade?"',
  boca: '"{O} {nome} está com mau hálito forte e tártaro. Quero saber se precisa de limpeza e quais exames fazer antes da anestesia."',
  respiracao: '"{O} {nome} tosse [à noite / ao acordar] e contei [número] respirações por minuto com {ele} dormindo. {Ele} tem sopro?"',
  caroco: '"Achei um caroço em [local], com [tamanho] cm, desde [data]. Anotei as medidas no app. Dá para puncionar?"',
};

// A rotina de 10 minutos. O app escolhe 3 a 4 por dia pelo que está em Atenção e pelos riscos da raça.
// abre = rota do app; ex = id de exercício guiado em CUIDADOS (abre o modo guiado com cronômetro).
window.TAREFAS = [
  { id: 't-levantar', sinais: ['patas'], cuidado: 'mobilidade', min: 4, emoji: '🐕', titulo: 'Exercício: levantar com firmeza', x: 'Petisco na frente do focinho, levantar no tempo {dele}, 10 passos.', ex: 'ex-levantar' },
  { id: 't-patas-tras', sinais: ['patas'], cuidado: 'mobilidade', min: 5, emoji: '🦵', titulo: 'Força nas patas de trás', x: 'Massagem nas coxas, caminhada lenta e o cabo de vassoura.', ex: 'ex-patas-tras' },
  { id: 't-coluna', sinais: ['patas'], cuidado: 'mobilidade', min: 4, emoji: '🌭', titulo: 'Coluna protegida', x: 'Colo certo, caminhada de peitoral e firmeza em pé.', ex: 'ex-coluna', so: 'coluna' },
  { id: 't-artrose', sinais: ['patas'], cuidado: 'mobilidade', min: 5, emoji: '🦴', titulo: 'Caminhada para a artrose', x: 'Curta, em chão macio, no ritmo {dele}.', ex: 'ex-artrose', so: 'grande' },
  { id: 't-massagem', sinais: ['patas'], cuidado: 'mobilidade', min: 5, emoji: '👐', titulo: 'Massagem de 5 minutos', x: 'Mão inteira, devagar, das costas para as patas.', ex: 'massagem' },
  { id: 't-escovar', sinais: ['boca'], cuidado: 'prevencao', min: 2, emoji: '🪥', titulo: 'Escovar os dentes', x: 'Pasta de cachorro, movimentos curtos na linha da gengiva.', abre: '#/rotina/prevencao/boca' },
  { id: 't-gengiva', sinais: ['boca', 'caroco'], cuidado: 'prevencao', min: 1, emoji: '👄', titulo: 'Olhar a cor da gengiva', x: 'Levante o lábio: rosada é o esperado. Clara ou branca, anote.', abre: '#/rotina/prevencao/boca' },
  { id: 't-respirar', sinais: ['respiracao'], cuidado: 'prevencao', min: 1, emoji: '🫁', titulo: 'Contar a respiração dormindo', x: '30 segundos com {ele} dormindo. O app faz a conta.', abre: '#/contar' },
  { id: 't-passeio-leve', sinais: ['respiracao'], cuidado: 'mobilidade', min: 5, emoji: '🌳', titulo: 'Passeio leve, de peitoral', x: 'Nas horas frescas. Pare se ofegar forte ou tossir.', abre: '#/rotina/mobilidade/exercicios' },
  { id: 't-carocos', sinais: ['caroco'], cuidado: 'prevencao', min: 2, emoji: '🔎', titulo: 'Passa-mão: procurar caroços', x: 'Da cabeça ao rabo, devagar. Achou? Marque no mapa.', abre: '#/rotina/prevencao/carocos' },
  { id: 't-agua', sinais: ['agua'], cuidado: 'alimentacao', min: 1, emoji: '💧', titulo: 'Medir a água do dia', x: 'Encha o pote com uma medida conhecida e anote amanhã.', abre: '#/rotina/alimentacao/agua' },
  { id: 't-agua-fresca', sinais: ['agua'], cuidado: 'alimentacao', min: 1, emoji: '🚰', titulo: 'Água fresca em 2 potes', x: 'Um perto da cama, outro no caminho de sempre.', abre: '#/rotina/alimentacao/agua' },
  { id: 't-papinha', sinais: ['apetite'], cuidado: 'alimentacao', min: 2, emoji: '🥣', titulo: 'Ração morninha e macia', x: 'Água morna na ração por 10 minutos: cheira mais e fica fácil de mastigar.', abre: '#/rotina/alimentacao/o-que-muda' },
  { id: 't-porcoes', sinais: ['apetite'], cuidado: 'alimentacao', min: 1, emoji: '🍽️', titulo: 'Porções menores, mais vezes', x: 'A mesma quantidade do dia, dividida em 3 ou 4.', abre: '#/rotina/alimentacao/o-que-muda' },
  { id: 't-luz', sinais: ['noite'], cuidado: 'mente', min: 1, emoji: '💡', titulo: 'Luz noturna e xixi antes de dormir', x: 'Mesmo horário toda noite. A rotina acalma a cabeça.', abre: '#/rotina/mente/madrugada' },
  { id: 't-tapete', sinais: ['noite', 'mente'], cuidado: 'mente', min: 5, emoji: '🧺', titulo: 'Tapete de farejar', x: 'Ração escondida numa toalha enrolada. Faro cansa a cabeça do jeito bom.', ex: 'br-tapete', mente: true },
  { id: 't-esconder', sinais: ['noite', 'mente'], cuidado: 'mente', min: 5, emoji: '🫣', titulo: 'Esconde-esconde do petisco', x: 'Três esconderijos fáceis, depois um difícil.', ex: 'br-esconder', mente: true },
  { id: 't-copos', sinais: ['noite', 'mente'], cuidado: 'mente', min: 5, emoji: '🥤', titulo: 'Jogo dos copos', x: 'Petisco embaixo de um copo. Deixe {ele} descobrir pelo faro.', ex: 'br-copos', mente: true },
  { id: 't-truque', sinais: ['noite', 'mente'], cuidado: 'mente', min: 5, emoji: '🎓', titulo: 'Um truque novo', x: 'Sessões curtas, prêmio na hora certa. Cabeça ativa.', ex: 'br-truque', mente: true },
];

// Escala de qualidade de vida "Dias bons", inspirada na HHHHHMM (Dra. Alice Villalobos, 2004; Merck Vet Manual).
// 7 itens de 0 a 10, total de 0 a 70. Na escala original, acima de 35 a qualidade de vida é considerada aceitável
// para seguir com os cuidados. A escala ajuda a conversa com o veterinário; ela não decide nada sozinha.
// REVISAR VET: redação dos itens e das faixas.
window.QV_ITENS = [
  { id: 'dor', nome: 'Dor e respiração', emoji: '🩹', zero: 'Sente dor que não passa, ou respira com esforço', dez: 'Sem sinais de dor, respira tranquil{o}' },
  { id: 'fome', nome: 'Fome', emoji: '🍖', zero: 'Não come, mesmo com ajuda', dez: 'Come com vontade, sozinh{o}' },
  { id: 'agua', nome: 'Água', emoji: '💧', zero: 'Não bebe, ou parece desidratad{o}', dez: 'Bebe bem, sem precisar de ajuda' },
  { id: 'higiene', nome: 'Higiene', emoji: '🛁', zero: 'Fica sujo de xixi ou cocô, tem feridas de ficar deitad{o}', dez: 'Limp{o}, sem feridas, consegue se ajeitar' },
  { id: 'alegria', nome: 'Alegria', emoji: '💚', zero: 'Não responde à família nem ao que gostava', dez: 'Abana o rabo, interage, se interessa' },
  { id: 'mobilidade', nome: 'Mobilidade', emoji: '🐾', zero: 'Não levanta nem com ajuda', dez: 'Levanta e anda sozinh{o}' },
  { id: 'mais', nome: 'Mais dias bons que ruins', emoji: '☀️', zero: 'Quase todos os dias são difíceis', dez: 'Quase todos os dias são bons' },
];
window.QV_FAIXAS = [
  { min: 50, cor: 'vd', titulo: 'Muitos dias bons', x: 'Pelo que você marcou, {o} {nome} tem uma vida com conforto e alegria. Continue a rotina e anote o que mudar.' },
  { min: 36, cor: 'ob', titulo: 'Bons dias, com pontos de cuidado', x: 'A soma ainda está acima de 35, a linha que a escala usa como qualidade de vida aceitável. Olhe os itens mais baixos: muitos têm o que fazer (dor, por exemplo, tem tratamento). Leve esta nota na próxima consulta.' },
  { min: 0, cor: 'at', titulo: 'Semanas mais difíceis', x: 'A soma ficou em 35 ou menos. Isso não é uma sentença: é um sinal de que vale uma conversa franca com o veterinário sobre conforto, dor e o que pode melhorar. Cuidar também é perguntar. Você não precisa passar por isso sem apoio.' },
];

// Assistente 24h (upsell, bloqueado no demo). Nunca chamar de "veterinário".
window.ASSISTENTE_EXEMPLO = {
  pergunta: '{O} {nome} vomitou 2 vezes hoje de manhã e agora está quiet{o} no canto. Dá para esperar até amanhã?',
  nivel: { cor: 'ob', t: 'Marque consulta hoje ou amanhã cedo', x: 'Pelo que você contou, não parece emergência agora. Mas no velhinho, vômito com apatia merece o veterinário em até 24 horas.' },
  podeSer: 'Pode ter sido algo que {ele} comeu, mudança na comida ou um enjoo passageiro. Também pode ter a ver com barriga, rim ou outra coisa que só o exame mostra.',
  passo: 'Ofereça água aos pouquinhos. Segure a comida por algumas horas e depois ofereça pouca, como o veterinário costuma orientar. **Vá hoje mesmo** se vomitar de novo, se a barriga ficar dura ou inchada, se a gengiva ficar clara ou se {ele} não conseguir ficar em pé.',
};
