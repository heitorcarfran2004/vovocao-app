// Guia "É da idade ou é alerta?" do app Vovocão.
// Conteúdo educativo: NÃO diagnostica, NÃO receita, NÃO indica remédio nem dose (CFMV).
// Será revisado por médico-veterinário: procure "REVISAR VET" para os pontos em aberto.
//
// Campos de cada sinal (window.SINAIS_GUIA):
//   id        kebab-case, único
//   nome      como o dono fala
//   emoji     ícone da lista
//   termos    palavras extras para a busca (sinônimos e escritas do povo)
//   area      um dos 7 sinais do radar (apetite|agua|patas|noite|boca|respiracao|caroco) ou 'outro'
//   cor       semáforo da LISTA: 'at' = pode ser urgência (vermelho) | 'ob' = marque consulta (amarelo)
//             | 'vd' = observe em casa e comente na consulta (verde). Nunca existe "ok".
//   resumo    1 linha para a lista
//   daIdade   resposta curta para "é da idade?"
//   podeSer   o que pode estar por trás (sem diagnosticar)
//   observar  o que olhar ou medir em casa
//   urgencia  VERMELHO: vá agora ao veterinário se...
//   consulta  AMARELO: marque consulta nos próximos dias se...
//   dizer     frase pronta para falar ao veterinário (1ª pessoa do dono)
//   cuidado   opcional: id do cuidado ligado (mobilidade|alimentacao|remedios|prevencao|mente)
//
// Tokens que o app troca pelo cão do usuário: {nome} {ele} {Ele} {dele} {o} {O}. **negrito** vira <b>.

window.SINAIS_GUIA = [
  // ---------- PATAS, COLUNA E DOR ----------
  {
    id: 'tremendo',
    nome: 'Tremendo',
    emoji: '🫨',
    termos: 'tremor tremedeira treme tremendo tremulo arrepiado frio medo',
    area: 'patas',
    cor: 'ob',
    resumo: 'Tremor de corpo inteiro ou só em uma parte, parado ou deitado.',
    daIdade: 'Às vezes o velhinho treme de frio ou de medo. Mas tremor que se repete, sem frio, muitas vezes é dor, e dor tem o que fazer.',
    podeSer: [
      'Dor (coluna, articulações, barriga). Cão com dor crônica raramente chora: ele treme, se encolhe e fica quieto.',
      'Frio: o idoso esquenta menos e perde músculo.',
      'Medo, ansiedade ou enjoo.',
      'Às vezes, alteração de glicose, de sais do sangue ou dos nervos. Só o exame diz.'
    ],
    observar: [
      'Quando acontece: depois do passeio, ao levantar, à noite, ao ser pego no colo?',
      'Se para quando você aquece com uma manta ou acalma.',
      'Se ele está comendo, bebendo e fazendo xixi como sempre.',
      'Filme 20 segundos do tremor para mostrar na consulta.'
    ],
    urgencia: [
      'Tremor junto com fraqueza, gengiva pálida, vômito ou barriga dura.',
      'Tremor forte que não passa, com rigidez, babando ou sem responder ao chamado (pode ser convulsão).',
      'Se pode ter comido algo tóxico (chocolate, chiclete sem açúcar, remédio de gente).'
    ],
    consulta: [
      'Treme vários dias na semana, sem frio.',
      'Treme e ficou mais quieto, gemendo ou evitando escada e sofá.'
    ],
    dizer: '"{O} {nome} está tremendo há [tempo], principalmente quando [situação]. Não é frio. Trouxe um vídeo."',
    cuidado: 'mobilidade'
  },
  {
    id: 'tremor-patas-tras',
    nome: 'Patas de trás tremendo ou fracas',
    emoji: '🦵',
    termos: 'perninha tremendo pata traseira fraca bambeia perna de tras fraqueza tombinho cai',
    area: 'patas',
    cor: 'ob',
    resumo: 'As perninhas de trás tremem em pé, depois do passeio, ou cedem.',
    daIdade: 'Perder um pouco de músculo com a idade é comum. Mas tremor e fraqueza que pioram costumam ter causa: dor, coluna ou nervos.',
    podeSer: [
      'Perda de músculo das patas de trás, comum no velhinho parado.',
      'Dor de artrose no quadril ou nos joelhos.',
      'Problema de coluna (hérnia) ou dos nervos, mais comum em salsicha, pastor e boxer.'
    ],
    observar: [
      'Se ele arrasta as unhas de trás (barulhinho no piso, unha gasta na ponta).',
      'Se cruza as patas ou "esquece" a pata dobrada ao andar.',
      'Se treme mais no fim do passeio do que no começo.'
    ],
    urgencia: [
      'Parou de andar com as patas de trás de repente.',
      'Arrasta as patas, não sente quando você aperta de leve os dedinhos, ou grita de dor.',
      'Não consegue fazer xixi ou faz sem perceber, junto com a fraqueza.'
    ],
    consulta: [
      'O tremor ou a fraqueza estão piorando de semana para semana.',
      'Ele levou tombinhos ao levantar ou ao descer degraus.'
    ],
    dizer: '"As patas de trás d{o} {nome} tremem e cedem desde [quando]. Piora depois de [situação]. Trouxe um vídeo andando."',
    cuidado: 'mobilidade'
  },
  {
    id: 'mancando',
    nome: 'Mancando',
    emoji: '🐾',
    termos: 'manca mancar capenga pata levantada nao apoia pata lambe pata lambe articulacao joelho',
    area: 'patas',
    cor: 'ob',
    resumo: 'Não apoia direito uma pata, ou manca ao levantar e melhora depois.',
    daIdade: 'Mancar não é da idade. Mancar ao levantar e "esquentar" depois é um jeito clássico de a artrose aparecer.',
    podeSer: [
      'Dor de artrose (piora de manhã ou depois do descanso).',
      'Lesão no joelho (ligamento), comum em cão médio e grande.',
      'Unha quebrada, espinho, ferida entre os dedos.',
      'Em cão grande, mancar que não passa com inchaço duro no osso precisa ser visto logo.'
    ],
    observar: [
      'Qual pata, e se ele lambe essa pata ou uma articulação.',
      'Se piora ao levantar, no frio ou depois de passeio longo.',
      'Olhe entre os dedos e as unhas com boa luz.',
      'Filme ele andando de lado e vindo na sua direção.'
    ],
    urgencia: [
      'Não apoia a pata de jeito nenhum e chora ao tocar.',
      'Pata inchada, deformada, quente, ou depois de queda ou atropelamento.'
    ],
    consulta: [
      'Mancou por mais de 3 a 5 dias, mesmo de leve.',
      'Tem um inchaço duro perto de uma articulação.',
      'Manca de vez em quando há semanas (vai e volta).'
    ],
    dizer: '"{O} {nome} manca da pata [qual] há [tempo]. Piora quando [situação] e melhora depois de andar um pouco."',
    cuidado: 'mobilidade'
  },
  {
    id: 'escorregando',
    nome: 'Escorregando no piso',
    emoji: '⛸️',
    termos: 'escorrega piso liso patinando abre as pernas cai no chao porcelanato',
    area: 'patas',
    cor: 'vd',
    resumo: 'As patas abrem ou deslizam no piso liso.',
    daIdade: 'É muito comum no velhinho, porque perde músculo e firmeza. Mas o escorregão machuca e dá medo de andar, então vale agir já.',
    podeSer: [
      'Perda de músculo e de força das patas.',
      'Dor nas articulações que deixa a pisada insegura.',
      'Pelo comprido entre as almofadinhas e unhas compridas.'
    ],
    observar: [
      'Se escorrega mais ao levantar ou ao virar.',
      'O tamanho das unhas e do pelo entre os dedos.',
      'Se passou a evitar cômodos de piso liso.'
    ],
    urgencia: [
      'Caiu e não consegue mais levantar, ou grita ao tentar.',
      'Depois de um escorregão, arrasta as patas de trás.'
    ],
    consulta: [
      'Escorrega mesmo com tapete e unhas aparadas.',
      'Vem junto com tremor, mancar ou demora para levantar.'
    ],
    dizer: '"{O} {nome} anda escorregando e já caiu [x] vezes. Pus tapete. Queria saber se tem dor por trás."',
    cuidado: 'mobilidade'
  },
  {
    id: 'grita-no-colo',
    nome: 'Grita ou geme ao ser pego no colo',
    emoji: '😣',
    termos: 'grito gritou gemendo gemido chora no colo dor ao pegar costas encolhido corcunda',
    area: 'patas',
    cor: 'ob',
    resumo: 'Solta um grito ao ser pego, ou fica encolhido com as costas arqueadas.',
    daIdade: 'Não. Grito ao pegar é sinal de dor, muitas vezes na coluna ou no pescoço.',
    podeSer: [
      'Dor na coluna ou no pescoço (hérnia de disco é comum em salsicha, shih tzu, pinscher e bulldog francês).',
      'Dor na barriga.',
      'Dor nas articulações.'
    ],
    observar: [
      'Se ele anda com as costas curvadas ou a cabeça baixa.',
      'Se evita olhar para cima ou virar o pescoço.',
      'Se recusou sofá, escada ou cama de repente.'
    ],
    urgencia: [
      'Junto com fraqueza ou arrasto das patas.',
      'Dor tão forte que ele treme, não deita ou não se mexe.',
      'Não consegue fazer xixi.'
    ],
    consulta: [
      'Gritou uma vez e depois ficou mais quieto, sem pular.',
      'Mesmo que pareça ter passado: dor de coluna pode voltar pior.'
    ],
    dizer: '"{O} {nome} gritou quando eu peguei no colo [quando]. Desde então está evitando [o quê]."',
    cuidado: 'mobilidade'
  },
  {
    id: 'nao-sobe-sofa',
    nome: 'Não sobe mais no sofá ou na cama',
    emoji: '🛋️',
    termos: 'nao pula nao sobe escada carro cama sofa desistiu hesita',
    area: 'patas',
    cor: 'vd',
    resumo: 'Para na frente do sofá, da escada ou do carro e desiste.',
    daIdade: 'Muita gente acha que é preguiça da idade. Muitas vezes é dor de artrose, que é comum e tem o que fazer.',
    podeSer: [
      'Dor nas articulações (quadril, joelho, coluna).',
      'Perda de força nas patas de trás.',
      'Enxergar pior e não calcular a altura.'
    ],
    observar: [
      'Se ele hesita, olha e "pensa" antes de subir.',
      'Se demora para levantar depois de deitar.',
      'Se ainda vem te receber na porta.'
    ],
    urgencia: [
      'Parou de repente junto com grito, tremor ou arrasto das patas.'
    ],
    consulta: [
      'Faz semanas que deixou de subir. Leve a pergunta: "isso pode ser dor?"'
    ],
    dizer: '"{O} {nome} parou de subir no sofá e no carro há [tempo]. Antes pulava. Queria avaliar dor e artrose."',
    cuidado: 'mobilidade'
  },
  {
    id: 'so-fica-deitado',
    nome: 'Só fica deitado',
    emoji: '🛏️',
    termos: 'deitado o dia todo parado molinho caidinho desanimado tristinho apatico nao levanta',
    area: 'patas',
    cor: 'ob',
    resumo: 'Quase não se levanta, não vem receber, perdeu o interesse.',
    daIdade: 'O velhinho descansa mais, mas não deixa de levantar para comer, receber e passear. "Molinho" e caidinho é sinal, não velhice.',
    podeSer: [
      'Dor (artrose, coluna) que faz ele evitar se mexer.',
      'Febre, anemia, doença do carrapato ou outra doença que tira a energia.',
      'Coração cansado ou falta de ar.',
      'Tristeza ou demência, mas isso só depois de afastar o resto.'
    ],
    observar: [
      'Se come, bebe e faz xixi e cocô normal.',
      'A cor da gengiva (rosada ou pálida).',
      'A respiração dormindo (conte 1 minuto).',
      'Desde quando: foi de repente ou aos poucos?'
    ],
    urgencia: [
      'Ficou assim de repente, com gengiva pálida, barriga inchada, vômito ou respiração difícil.',
      'Não levanta nem para comer ou fazer xixi.'
    ],
    consulta: [
      'Está mais parado há mais de uma semana, mesmo comendo.',
      'Parou de vir te receber na porta.'
    ],
    dizer: '"{O} {nome} está mais deitad{o} e desanimad{o} há [tempo]. Come [como]. Antes ainda [o que fazia]."',
    cuidado: 'mobilidade'
  },
  {
    id: 'cambaleando',
    nome: 'Cambaleando ou perdendo o equilíbrio',
    emoji: '🌀',
    termos: 'cambaleia bebado tonto zonzo desequilibrio cai de lado andando torto avc derrame',
    area: 'patas',
    cor: 'at',
    resumo: 'Anda como bêbado, cai de lado, não firma as patas.',
    daIdade: 'Não. Desequilíbrio que aparece de repente precisa de veterinário no mesmo dia.',
    podeSer: [
      'Problema do labirinto (o "equilíbrio" do ouvido), que no idoso costuma vir de repente e parece um "AVC".',
      'Problema de coluna ou de cérebro.',
      'Fraqueza por anemia, glicose baixa ou intoxicação.'
    ],
    observar: [
      'Se a cabeça está torta e os olhos ficam "balançando" de um lado para o outro.',
      'Se ele vomita ou baba (enjoo do labirinto).',
      'Filme para mostrar.'
    ],
    urgencia: [
      'Começou de repente.',
      'Junto com convulsão, desmaio, gengiva pálida ou se pode ter comido algo tóxico.',
      'Não consegue ficar em pé.'
    ],
    consulta: [
      'Leve desequilíbrio que vem piorando devagar há semanas: consulta logo, não espere.'
    ],
    dizer: '"{O} {nome} começou a cambalear [quando], de repente. A cabeça [está/não está] torta e os olhos [mexem/não mexem]."',
    cuidado: 'mobilidade'
  },

  // ---------- RESPIRAÇÃO E CORAÇÃO ----------
  {
    id: 'ofegante',
    nome: 'Ofegante mesmo parado',
    emoji: '😮‍💨',
    termos: 'ofegando arfando respiracao rapida lingua de fora cansado sem fazer nada respirando forte',
    area: 'respiracao',
    cor: 'ob',
    resumo: 'Respira rápido de boca aberta sem ter corrido nem estar no calor.',
    daIdade: 'Não. Ofegar no calor ou depois de brincar é esperado. Ofegar parado, no fresco, tem causa.',
    podeSer: [
      'Dor (é um dos jeitos mais comuns de o cão mostrar dor).',
      'Coração cansado ou problema no pulmão.',
      'Excesso de cortisol (mais comum no poodle e outros pequenos), febre, ansiedade.',
      'Focinho curto (pug, shih tzu, bulldog) piora com calor e esforço.'
    ],
    observar: [
      'Conte as respirações em 1 minuto com ele **dormindo** (cada vez que a barriga sobe conta 1).',
      'Se a gengiva e a língua estão rosadas.',
      'Se bebe mais água ou tem barriga mais "caída".'
    ],
    urgencia: [
      'Língua ou gengiva roxa, azulada ou muito pálida.',
      'Esforço para respirar: pescoço esticado, cotovelos abertos, não consegue deitar.',
      'Depois de calor forte, com moleza ou vômito (insolação).'
    ],
    consulta: [
      'Ofega parado vários dias na semana.',
      'Respiração dormindo acima de 30 por minuto em mais de uma contagem.'
    ],
    dizer: '"{O} {nome} fica ofegante parad{o}, no fresco, há [tempo]. Contei [x] respirações por minuto dormindo."',
    cuidado: 'prevencao'
  },
  {
    // REVISAR VET: corte de ~30 respirações/min dormindo (consenso ACVIM usa ~30-35) e a orientação para cão com sopro
    id: 'respiracao-rapida-dormindo',
    nome: 'Respiração rápida dormindo',
    emoji: '💤',
    termos: 'respira rapido dormindo frequencia respiratoria contar respiracao sopro coracao barriga mexendo',
    area: 'respiracao',
    cor: 'at',
    resumo: 'Dormindo tranquilo, a barriga sobe e desce rápido demais.',
    daIdade: 'Não. Dormindo, o cão respira devagar. Contar a respiração dormindo é um dos jeitos mais simples de pegar o coração cansando cedo.',
    podeSer: [
      'Coração que está começando a descompensar (comum em cão pequeno com sopro).',
      'Líquido ou problema no pulmão.',
      'Dor ou febre.'
    ],
    observar: [
      'Com ele em sono profundo, conte 1 minuto (ou 30 segundos vezes 2). Cada subida da barriga = 1.',
      'Anote o número na mesma hora do dia, 1 vez por semana. Se ele tem sopro, o veterinário pode pedir todo dia.',
      'Em geral, abaixo de 30 por minuto dormindo é o esperado.'
    ],
    urgencia: [
      'Acima de 30 a 35 por minuto dormindo em duas contagens seguidas, principalmente se ele **já tem sopro**.',
      'Respira com esforço, tosse muito, não consegue deitar ou a gengiva está roxa.'
    ],
    consulta: [
      'O número vem subindo aos poucos nas suas anotações.',
      'Nunca auscultaram o coração dele no último ano.'
    ],
    dizer: '"Contei a respiração d{o} {nome} dormindo: [x] por minuto hoje, [y] na semana passada. {Ele} [tem/não tem] sopro."',
    cuidado: 'prevencao'
  },
  {
    id: 'tosse-noite',
    nome: 'Tosse à noite',
    emoji: '🌙',
    termos: 'tosse tossindo engasgado de noite ao deitar grasnado ganso pigarro catarro',
    area: 'respiracao',
    cor: 'ob',
    resumo: 'Tosse ao deitar, de madrugada, ou ao se agitar.',
    daIdade: 'Não. Tosse no velhinho tem causa e vale investigar, principalmente nas raças pequenas.',
    podeSer: [
      'Coração aumentado (sopro) pressionando as vias aéreas.',
      'Traqueia mais mole (tosse que parece grasnado de ganso), comum em yorkshire, lulu, poodle, maltês e chihuahua.',
      'Problema no pulmão ou infecção.'
    ],
    observar: [
      'Se a tosse é seca tipo "ganso" ou com catarro.',
      'Se piora ao deitar, ao se agitar, ao puxar a coleira ou ao beber água.',
      'A respiração dormindo (conte 1 minuto).',
      'Grave um vídeo com som.'
    ],
    urgencia: [
      'Tosse com falta de ar, língua roxa ou desmaio.',
      'Tosse com respiração dormindo acima de 30 a 35 por minuto.'
    ],
    consulta: [
      'Tosse que se repete por mais de alguns dias.',
      'Cansa mais rápido no passeio junto com a tosse.'
    ],
    dizer: '"{O} {nome} tosse à noite há [tempo], [x] vezes por noite. Parece [seca/ganso/com catarro]. Gravei o som."',
    cuidado: 'prevencao'
  },
  {
    id: 'cansa-no-passeio',
    nome: 'Cansa rápido no passeio',
    emoji: '🚶',
    termos: 'cansa cansado para no passeio senta no meio do caminho fica para tras nao aguenta andar',
    area: 'respiracao',
    cor: 'ob',
    resumo: 'Senta no meio do caminho, fica para trás, quer voltar logo.',
    daIdade: 'O passeio do velhinho fica mais lento, mas parar, sentar e ofegar no mesmo trajeto de sempre é mudança, e mudança tem causa.',
    podeSer: [
      'Dor nas articulações.',
      'Coração ou pulmão cansando.',
      'Anemia ou outra doença que tira a energia.'
    ],
    observar: [
      'Quanto ele andava antes e quanto anda agora (em minutos).',
      'Se ofega, tosse ou manca no passeio.',
      'Se a gengiva fica pálida ou roxa depois do esforço.'
    ],
    urgencia: [
      'Desmaiou, caiu ou ficou com a língua roxa no passeio.'
    ],
    consulta: [
      'O passeio encurtou de forma clara em poucas semanas.'
    ],
    dizer: '"{O} {nome} andava [x] minutos e agora para com [y]. Senta e [ofega/tosse/manca]."',
    cuidado: 'mobilidade'
  },
  {
    id: 'lingua-roxa',
    nome: 'Língua ou gengiva roxa',
    emoji: '🟣',
    termos: 'lingua roxa azulada arroxeada gengiva roxa falta de ar sufocando cianose',
    area: 'respiracao',
    cor: 'at',
    resumo: 'Língua ou gengiva azulada ou arroxeada.',
    daIdade: 'Nunca. Roxo é falta de oxigênio. É emergência.',
    podeSer: [
      'Falta de ar grave: coração, pulmão, traqueia ou garganta fechando.',
      'Algo engasgado.'
    ],
    observar: [
      'Não perca tempo observando: vá para o veterinário 24 h.',
      'No caminho, mantenha ele calmo, no fresco, sem nada apertando o pescoço.'
    ],
    urgencia: [
      'Sempre. Língua ou gengiva roxa é para correr agora.'
    ],
    consulta: [
      'Se ficou roxa só por um instante durante tosse forte e voltou ao normal, mesmo assim avise o veterinário hoje.'
    ],
    dizer: '"A língua d{o} {nome} ficou roxa agora há [minutos], quando [situação]."',
    cuidado: 'prevencao'
  },
  {
    id: 'espirro-reverso',
    nome: 'Espirro ao contrário (ronco puxado)',
    emoji: '🤧',
    termos: 'espirro reverso espirro ao contrario ronco engasgado puxando ar barulho de porco',
    area: 'respiracao',
    cor: 'vd',
    resumo: 'Puxa o ar forte pelo nariz fazendo barulho, por alguns segundos.',
    daIdade: 'É comum em cão pequeno e costuma passar sozinho. Mas, se começou agora no velhinho ou ficou frequente, vale contar ao veterinário.',
    podeSer: [
      'Irritação no fundo do nariz ou na garganta (poeira, perfume, excitação).',
      'Quando vem com secreção, sangue no nariz ou piora rápido: pode ser algo no nariz que precisa ser examinado.'
    ],
    observar: [
      'Quanto dura (em geral, segundos) e quantas vezes por dia.',
      'Se sai secreção ou sangue do nariz.',
      'Grave em vídeo: ajuda muito a diferenciar de tosse.'
    ],
    urgencia: [
      'Não para, a língua fica roxa ou ele desmaia.',
      'Sangramento pelo nariz.'
    ],
    consulta: [
      'Ficou frequente ou começou de repente no velhinho.',
      'Tem secreção de um lado só do nariz.'
    ],
    dizer: '"{O} {nome} faz um espirro ao contrário [x] vezes por dia desde [quando]. Gravei um."',
    cuidado: 'prevencao'
  },
  {
    id: 'engasgo',
    nome: 'Engasgado',
    emoji: '😵',
    termos: 'engasgou engasgado osso preso algo na garganta tentando vomitar ansia pata na boca',
    area: 'respiracao',
    cor: 'at',
    resumo: 'Põe a pata na boca, faz ânsia, baba, tenta tossir algo para fora.',
    daIdade: 'Não. Engasgo é urgência, principalmente se ele não consegue respirar.',
    podeSer: [
      'Osso, brinquedo ou pedaço de comida preso na boca ou na garganta.',
      'Às vezes é tosse forte que parece engasgo (coração, traqueia).'
    ],
    observar: [
      'Se ele está respirando e se a língua está rosada.',
      'Se dá para ver o objeto. Só tente tirar se estiver fácil e sem risco de mordida.'
    ],
    urgencia: [
      'Não consegue respirar, língua roxa ou desmaiou: vá agora.',
      'Engoliu osso, espeto, linha, anzol ou pilha.'
    ],
    consulta: [
      'Ânsia que se repete sem sair nada, mesmo respirando bem: veterinário no mesmo dia.'
    ],
    dizer: '"{O} {nome} engasgou com [o quê] às [hora]. {Ele} [respira/não respira] bem."',
    cuidado: 'alimentacao'
  },
  {
    id: 'desmaio',
    nome: 'Desmaio',
    emoji: '😶',
    termos: 'desmaiou desmaio caiu duro apagou perdeu os sentidos colapso sincope fraqueza subita',
    area: 'respiracao',
    cor: 'at',
    resumo: 'Cai de repente, fica mole ou duro por alguns segundos e depois volta.',
    daIdade: 'Nunca. Desmaio é motivo para ir ao veterinário no mesmo dia, mesmo que ele volte ao normal.',
    podeSer: [
      'Problema no ritmo do coração ou coração cansado.',
      'Sangramento interno (gengiva branca), anemia ou glicose baixa.',
      'Às vezes uma convulsão parece desmaio.'
    ],
    observar: [
      'Quanto tempo durou e o que ele fazia antes (esforço, tosse, agitação).',
      'Cor da gengiva logo depois.',
      'Se fez xixi, babou ou se debateu (isso puxa mais para convulsão).'
    ],
    urgencia: [
      'Sempre que acontecer. Mais ainda se a gengiva estiver branca, a barriga inchada ou se repetir.'
    ],
    consulta: [
      'Mesmo um desmaio "rápido" que passou precisa de consulta logo para ouvir o coração.'
    ],
    dizer: '"{O} {nome} desmaiou [quando], por [segundos]. Estava [fazendo o quê]. Depois a gengiva estava [cor]."',
    cuidado: 'prevencao'
  },

  // ---------- APETITE E BARRIGA ----------
  {
    id: 'nao-come',
    nome: 'Não come',
    emoji: '🍽️',
    termos: 'nao quer comer recusa racao chato para comer so come na mao fastio sem apetite enjoado',
    area: 'apetite',
    cor: 'ob',
    resumo: 'Recusa a ração, fica chato para comer ou só come na mão.',
    daIdade: 'Não. "Sempre foi chato para comer" esconde muita doença. No velhinho, apetite que muda é um dos primeiros sinais.',
    podeSer: [
      'Dor na boca (dente mole, gengiva inflamada).',
      'Enjoo por rim, fígado, pâncreas ou outra doença.',
      'Dor em outro lugar, febre, efeito de remédio.',
      'Olfato pior: a comida "não chama" mais.'
    ],
    observar: [
      'Há quanto tempo, e se recusa tudo ou só a ração seca.',
      'Se mastiga de um lado só, deixa cair a comida ou tem mau hálito.',
      'Se está bebendo água e fazendo xixi.',
      'Vômito, diarreia, barriga dolorida.'
    ],
    urgencia: [
      'Mais de 24 horas sem comer nada, no velhinho.',
      'Não come e também não bebe água.',
      'Junto com vômito repetido, barriga inchada, gengiva pálida ou muita moleza.'
    ],
    consulta: [
      'Come bem menos há alguns dias.',
      'Só come na mão ou com algo misturado há semanas.'
    ],
    dizer: '"{O} {nome} está comendo [quanto] desde [quando]. Recusa [o quê]. Bebe água [normal/mais/menos]."',
    cuidado: 'alimentacao'
  },
  {
    id: 'emagrecendo',
    nome: 'Emagrecendo sem motivo',
    emoji: '📉',
    termos: 'emagrecendo magro perdendo peso costela aparecendo osso aparecendo derretendo musculo',
    area: 'apetite',
    cor: 'ob',
    resumo: 'Está mais magrinho, aparecem costelas, coluna ou ossos da cabeça.',
    daIdade: 'O velhinho perde músculo, mas emagrecer sem mudar a comida não é da idade. É sinal para investigar.',
    podeSer: [
      'Perda de músculo por falta de movimento ou dor.',
      'Doença dos rins, diabetes, tireoide, problema de intestino ou câncer. Só o exame diz.',
      'Dor na boca que faz comer menos.'
    ],
    observar: [
      'Peso na balança (você no colo com ele, menos o seu peso), 1 vez por mês.',
      'Se a coluna e o alto da cabeça estão mais "ossudos".',
      'Se come e bebe igual a antes.'
    ],
    urgencia: [
      'Junto com vômito, não comer, muita sede ou moleza forte.'
    ],
    consulta: [
      'Perdeu peso que dá para notar em 1 ou 2 meses, sem mudar a comida.'
    ],
    dizer: '"{O} {nome} pesava [x] kg em [mês] e agora pesa [y] kg. Come [como]."',
    cuidado: 'alimentacao'
  },
  {
    id: 'vomito',
    nome: 'Vomitando',
    emoji: '🤮',
    termos: 'vomito vomitou golfando enjoado vomita espuma amarela regurgita',
    area: 'apetite',
    cor: 'ob',
    resumo: 'Vômito de comida, espuma ou líquido.',
    daIdade: 'Um vômito isolado acontece. Vômito que se repete no velhinho não é da idade.',
    podeSer: [
      'Comeu algo diferente ou estragado.',
      'Doença do estômago, pâncreas, fígado ou rins.',
      'Algo engolido preso no intestino.',
      'Intoxicação.'
    ],
    observar: [
      'Quantas vezes, e se tem sangue ou borra escura.',
      'Se ele consegue manter água no estômago.',
      'Se a barriga está inchada ou dolorida.',
      'Tire foto do vômito.'
    ],
    urgencia: [
      'Vomitou mais de 2 a 3 vezes no dia, ou não segura nem água.',
      'Tem sangue ou borra de café no vômito.',
      'Faz ânsia sem sair nada com barriga inchada (cão grande: corra).',
      'Pode ter comido algo tóxico, osso, brinquedo ou remédio.'
    ],
    consulta: [
      'Vomita algumas vezes por semana, mesmo comendo bem.'
    ],
    dizer: '"{O} {nome} vomitou [x] vezes desde [hora]. Era [comida/espuma/sangue]. {Ele} [bebe/não bebe] água."',
    cuidado: 'alimentacao'
  },
  {
    id: 'diarreia',
    nome: 'Diarreia',
    emoji: '💩',
    termos: 'diarreia coco mole fezes moles cagando muito intestino solto',
    area: 'apetite',
    cor: 'ob',
    resumo: 'Cocô mole ou líquido, várias vezes.',
    daIdade: 'Não. No velhinho, diarreia desidrata mais rápido que no adulto.',
    podeSer: [
      'Mudança de comida ou comeu algo de casa (gordura, leite, tempero).',
      'Verme, infecção, problema de intestino ou de pâncreas.',
      'Efeito de remédio.'
    ],
    observar: [
      'Quantas vezes por dia, cor e se tem sangue ou muco.',
      'Se bebe água e se a gengiva está úmida.',
      'Se também vomita ou recusou comida.'
    ],
    urgencia: [
      'Diarreia com muito sangue, ou junto com vômito repetido.',
      'Moleza forte, gengiva seca ou pálida.',
      'Cocô preto como borra de café.'
    ],
    consulta: [
      'Diarreia que passa de 1 a 2 dias.',
      'Vai e volta há semanas.'
    ],
    dizer: '"{O} {nome} está com diarreia desde [quando], [x] vezes por dia, [com/sem] sangue."',
    cuidado: 'alimentacao'
  },
  {
    id: 'fezes-escuras',
    nome: 'Cocô preto ou com sangue',
    emoji: '🩸',
    termos: 'fezes pretas coco preto borra de cafe sangue nas fezes coco com sangue vermelho',
    area: 'apetite',
    cor: 'at',
    resumo: 'Cocô preto e brilhante (como piche), ou com sangue vivo.',
    daIdade: 'Não. Cocô preto pode ser sangue digerido do estômago e precisa ser visto rápido.',
    podeSer: [
      'Sangramento no estômago ou intestino (anti-inflamatório de gente é uma causa conhecida).',
      'Sangue vivo pode ser intestino grosso irritado.',
      'Alguns remédios e alimentos escurecem o cocô.'
    ],
    observar: [
      'Tire foto do cocô.',
      'Veja a cor da gengiva.',
      'Lembre de qualquer remédio que ele tomou, inclusive de gente.'
    ],
    urgencia: [
      'Cocô preto como piche, principalmente se tomou remédio para dor.',
      'Sangue em grande quantidade, gengiva pálida ou fraqueza.'
    ],
    consulta: [
      'Raios de sangue vivo uma vez, com ele bem: consulta nos próximos dias.'
    ],
    dizer: '"{O} {nome} fez cocô [preto/com sangue] [quando]. Tomou [remédios] nos últimos dias. Tenho foto."',
    cuidado: 'remedios'
  },
  {
    id: 'barriga-inchada',
    nome: 'Barriga inchada',
    emoji: '🎈',
    termos: 'barriga inchada estufada dura distendida torcao estomago ansia sem vomitar barriga grande barriguda',
    area: 'apetite',
    cor: 'at',
    resumo: 'Barriga que cresceu de repente, dura, ou aos poucos, "caída".',
    daIdade: 'Não. Barriga inchada de repente é das maiores urgências do cão.',
    podeSer: [
      'Em cão grande e de peito fundo: estômago dilatado e torcido. Mata em horas.',
      'Líquido na barriga (coração, fígado, sangramento de tumor no baço).',
      'Barriga "caída" aos poucos: às vezes excesso de cortisol ou fígado aumentado.'
    ],
    observar: [
      'Se foi de repente (horas) ou aos poucos (semanas).',
      'Se ele faz ânsia sem conseguir vomitar, baba e está inquieto.',
      'Cor da gengiva.'
    ],
    urgencia: [
      '**Barriga inchada e dura, ânsia sem vomitar, inquieto: corra agora.** Principalmente em cão grande.',
      'Barriga crescendo junto com gengiva branca, fraqueza ou desmaio.'
    ],
    consulta: [
      'Barriga aumentando devagar há semanas, com mais sede e fome.'
    ],
    dizer: '"A barriga d{o} {nome} inchou [de repente/aos poucos] desde [quando]. {Ele} [faz/não faz] ânsia sem vomitar."',
    cuidado: 'prevencao'
  },

  // ---------- ÁGUA E XIXI ----------
  {
    id: 'bebendo-muita-agua',
    nome: 'Bebendo muita água',
    emoji: '💧',
    termos: 'bebe muita agua sede sedento pote vazio toma muita agua',
    area: 'agua',
    cor: 'ob',
    resumo: 'O pote esvazia mais rápido, bebe toda hora.',
    daIdade: 'Não. Ele não está "se hidratando". Sede nova no velhinho é um dos sinais mais importantes para levar ao veterinário.',
    podeSer: [
      'Rins trabalhando com dificuldade.',
      'Diabetes ou excesso de cortisol.',
      'Infecção (inclusive no útero, em fêmea não castrada), calor, ração mais salgada, remédios.'
    ],
    observar: [
      'Meça: encha o pote com quantidade conhecida de manhã e veja quanto sobrou em 24 h.',
      'Se faz mais xixi, xixi em casa ou dormindo.',
      'Se come mais, come menos ou está emagrecendo.'
    ],
    urgencia: [
      'Fêmea não castrada com sede, moleza e secreção ou barriga aumentada.',
      'Bebe muito e vomita, não come ou está muito molinho.'
    ],
    consulta: [
      'Bebe claramente mais que antes há mais de alguns dias. Leve a medida.'
    ],
    dizer: '"{O} {nome} está bebendo cerca de [x] ml por dia. Antes era bem menos. Faz xixi [como]."',
    cuidado: 'prevencao'
  },
  {
    // REVISAR VET: "sede e fome ao mesmo tempo" como pista de diabetes/cortisol, redação final
    id: 'sede-e-fome-demais',
    nome: 'Muita sede e muita fome juntas',
    emoji: '🥣',
    termos: 'fome demais esfomeado come tudo rouba comida sede e fome barriga caida pelo ralo',
    area: 'agua',
    cor: 'ob',
    resumo: 'Come com desespero, pede comida o tempo todo e bebe muito.',
    daIdade: 'Não. O velhinho costuma comer igual ou menos. Fome e sede a mais juntas pedem exame.',
    podeSer: [
      'Diabetes (às vezes emagrece mesmo comendo mais).',
      'Excesso de cortisol (barriga caída, pelo ralo, ofegante).',
      'Efeito de alguns remédios.'
    ],
    observar: [
      'Quanto bebe por dia (meça o pote).',
      'Peso uma vez por mês.',
      'Barriga, pele e pelo mudando.'
    ],
    urgencia: [
      'Junto com vômito, moleza forte, respiração estranha ou se ele parar de comer de repente.'
    ],
    consulta: [
      'Mais de 1 semana com sede e fome aumentadas.'
    ],
    dizer: '"{O} {nome} está com muita fome e muita sede há [tempo]. Bebe [x] ml por dia e [ganhou/perdeu] peso."',
    cuidado: 'prevencao'
  },
  {
    id: 'xixi-em-casa',
    nome: 'Xixi dormindo ou em casa',
    emoji: '💦',
    termos: 'xixi dormindo molha a cama escapa xixi xixi fora do lugar incontinencia faz xixi em casa pinga',
    area: 'agua',
    cor: 'ob',
    resumo: 'Acorda molhado, pinga xixi ou faz fora do lugar.',
    daIdade: 'Pode aparecer com a idade, mas quase sempre tem uma causa que dá para cuidar. Não é para brigar com ele.',
    podeSer: [
      'Bexiga mais fraca (comum em fêmea castrada idosa).',
      'Beber mais água por rim, diabetes ou cortisol.',
      'Infecção ou pedra na bexiga.',
      'Demência (esquece onde faz) ou dor que dificulta ir até o lugar.'
    ],
    observar: [
      'Se ele sabe que fez (escape) ou faz de propósito em lugar errado.',
      'Quanto bebe de água em 24 h.',
      'Cor e cheiro do xixi, se faz esforço ou várias gotinhas.'
    ],
    urgencia: [
      'Faz força e não sai xixi, ou sai só gotinha.',
      'Sangue em quantidade, com dor ou moleza.'
    ],
    consulta: [
      'Começou a molhar a cama ou a casa nas últimas semanas.'
    ],
    dizer: '"{O} {nome} começou a fazer xixi [dormindo/em casa] há [tempo]. Bebe [x] ml de água por dia."',
    cuidado: 'prevencao'
  },
  {
    id: 'sangue-no-xixi',
    nome: 'Sangue no xixi',
    emoji: '🔴',
    termos: 'xixi com sangue urina vermelha rosada xixi escuro pedra bexiga ardencia',
    area: 'agua',
    cor: 'ob',
    resumo: 'Xixi rosado, avermelhado ou com pingos de sangue.',
    daIdade: 'Não. Sangue no xixi sempre pede consulta.',
    podeSer: [
      'Infecção de urina.',
      'Pedra na bexiga (mais comum em shih tzu, lhasa, schnauzer e dálmata).',
      'Próstata no macho não castrado, tumor de bexiga, problema de coagulação (doença do carrapato).'
    ],
    observar: [
      'Se faz esforço, vai muitas vezes e sai pouco.',
      'Se o sangue vem no começo, no fim ou no xixi todo.',
      'Colha um pouco num pote limpo para levar, se o veterinário pedir.'
    ],
    urgencia: [
      'Não consegue fazer xixi ou chora ao tentar.',
      'Muito sangue, gengiva pálida, manchinhas roxas na pele ou sangramento no nariz.'
    ],
    consulta: [
      'Sangue no xixi, mesmo uma vez, com ele bem: consulta nos próximos 1 a 2 dias.'
    ],
    dizer: '"O xixi d{o} {nome} saiu com sangue [quando]. {Ele} [faz/não faz] esforço e vai [x] vezes por dia."',
    cuidado: 'prevencao'
  },
  {
    id: 'nao-faz-xixi',
    nome: 'Faz força e não sai xixi',
    emoji: '🚫',
    termos: 'nao consegue fazer xixi esforco para urinar so gotas bexiga cheia preso urina retida',
    area: 'agua',
    cor: 'at',
    resumo: 'Fica na posição, faz força e não sai, ou sai só gotinha.',
    daIdade: 'Nunca. Bexiga travada é emergência: pode lesar os rins em horas.',
    podeSer: [
      'Pedra ou algo trancando a saída do xixi.',
      'Problema de coluna que tira o controle da bexiga.',
      'Próstata, tumor.',
      'Às vezes é esforço para fazer cocô, que parece xixi.'
    ],
    observar: [
      'Se a barriga embaixo está dura e dolorida.',
      'Quando foi o último xixi de verdade.'
    ],
    urgencia: [
      'Mais de 8 a 12 horas sem fazer xixi, ou faz força várias vezes sem sair: vá agora.'
    ],
    consulta: [
      'Se você não tem certeza se é xixi ou cocô, ligue para o veterinário hoje.'
    ],
    dizer: '"{O} {nome} está fazendo força para o xixi desde [hora] e só sai [nada/gotinhas]."',
    cuidado: 'prevencao'
  },
  {
    id: 'halito-amonia',
    nome: 'Hálito com cheiro de xixi',
    emoji: '👃',
    termos: 'halito de amonia cheiro de xixi na boca cheiro de urina hálito estranho uremia rim',
    area: 'agua',
    cor: 'ob',
    resumo: 'Um bafo diferente do de dente: cheira a xixi ou amônia.',
    daIdade: 'Não. Cheiro de amônia na boca pode indicar que os rins não estão filtrando bem.',
    podeSer: [
      'Rins trabalhando com dificuldade (às vezes com feridinhas na boca).',
      'Doença de gengiva forte também dá mau hálito, mas o cheiro é outro (podre).'
    ],
    observar: [
      'Se bebe mais água e faz mais xixi.',
      'Se come menos, vomita ou emagrece.',
      'Se tem feridas na língua ou na bochecha.'
    ],
    urgencia: [
      'Junto com vômito, sem comer e muito molinho.'
    ],
    consulta: [
      'Cheiro novo de amônia na boca: consulta com exame de sangue e urina.'
    ],
    dizer: '"O hálito d{o} {nome} está com cheiro de amônia desde [quando]. {Ele} bebe [x] ml de água por dia."',
    cuidado: 'prevencao'
  },

  // ---------- SONO, NOITE E CABEÇA ----------
  {
    id: 'dorme-o-dia-todo',
    nome: 'Dorme o dia todo',
    emoji: '😴',
    termos: 'dorme muito dorminhoco sono demais sonolento dormindo o tempo todo preguica',
    area: 'noite',
    cor: 'vd',
    resumo: 'Passa quase o dia inteiro dormindo.',
    daIdade: 'Dormir um pouco mais é esperado no velhinho. **Mudança brusca**, ou trocar o dia pela noite, não é.',
    podeSer: [
      'Velhice com menos estímulo (tédio também deixa o cão parado).',
      'Dor que faz ele evitar se mexer.',
      'Tireoide lenta, anemia, coração, demência.'
    ],
    observar: [
      'Se ainda acorda animado para comer, passear e receber você.',
      'Se de noite fica acordado andando ou latindo.',
      'Se a mudança foi aos poucos (meses) ou de repente (dias).'
    ],
    urgencia: [
      'Difícil de acordar, não responde direito, ou dorme e não quer comer nem beber.'
    ],
    consulta: [
      'O sono aumentou muito em poucas semanas.',
      'Dorme de dia e fica agitado de madrugada.'
    ],
    dizer: '"{O} {nome} dorme quase o dia todo desde [quando]. Antes [como era]. De noite {ele} [dorme/fica acordad{o}]."',
    cuidado: 'mente'
  },
  {
    id: 'madrugada-agitada',
    nome: 'Late ou chora de madrugada',
    emoji: '🌃',
    termos: 'late de madrugada chora a noite uiva noite agitada nao dorme anda de noite troca dia pela noite insonia',
    area: 'noite',
    cor: 'ob',
    resumo: 'Acorda de madrugada, anda, late ou chora sem motivo aparente.',
    daIdade: 'Não é só "manha de velho". Trocar o dia pela noite é um dos sinais mais comuns da demência canina, e também pode ser dor ou vontade de xixi.',
    podeSer: [
      'Demência (o "Alzheimer" do cão), que é comum e pouco diagnosticada.',
      'Dor que piora deitado.',
      'Precisar fazer xixi mais vezes (sede, bexiga).',
      'Enxergar ou ouvir pior e ficar inseguro no escuro.'
    ],
    observar: [
      'A que horas começa e quanto tempo dura.',
      'Se ele parece perdido, olhando para a parede ou preso em cantos.',
      'Se melhora com luz noturna acesa e uma volta para fazer xixi antes de dormir.'
    ],
    urgencia: [
      'Choro de dor forte, ofegante, barriga inchada ou não consegue deitar.'
    ],
    consulta: [
      'Mais de algumas noites por semana. Existem cuidados e tratamentos que o veterinário pode avaliar.'
    ],
    dizer: '"{O} {nome} acorda às [hora] e fica [latindo/andando/chorando] por [tempo], [x] noites por semana."',
    cuidado: 'mente'
  },
  {
    id: 'andando-em-circulo',
    nome: 'Andando em círculo',
    emoji: '🔄',
    termos: 'girando gira roda anda em circulo da voltas rodando sem parar anda sem rumo',
    area: 'noite',
    cor: 'ob',
    resumo: 'Dá voltas e mais voltas, anda sem rumo pela casa.',
    daIdade: 'Não é velhice "normal". Pode ser demência, mas também labirinto ou cérebro, então precisa de avaliação.',
    podeSer: [
      'Demência canina.',
      'Problema de labirinto ou do cérebro (girar sempre para o mesmo lado é uma pista).',
      'Enxergar mal.'
    ],
    observar: [
      'Se gira sempre para o mesmo lado.',
      'Se a cabeça está torta ou os olhos mexem sozinhos.',
      'Filme para mostrar.'
    ],
    urgencia: [
      'Começou de repente, com cabeça torta, quedas, convulsão ou olhos balançando.'
    ],
    consulta: [
      'Vem acontecendo aos poucos há semanas, junto com noite agitada ou ficar perdido.'
    ],
    dizer: '"{O} {nome} anda em círculo para o lado [qual] há [tempo], principalmente [quando]. Gravei."',
    cuidado: 'mente'
  },
  {
    // REVISAR VET: cabeça na parede classificada como urgência (pressionar a cabeça costuma ser sinal neurológico)
    id: 'cabeca-na-parede',
    nome: 'Cabeça encostada na parede',
    emoji: '🧱',
    termos: 'cabeca na parede encosta a cabeca empurra a cabeca olhando para a parede preso no canto parado no canto',
    area: 'noite',
    cor: 'at',
    resumo: 'Empurra a cabeça contra a parede ou fica parado de frente para ela.',
    daIdade: 'Não. Empurrar a cabeça contra a parede é sinal de que algo afeta o cérebro e precisa de veterinário logo.',
    podeSer: [
      'Algo afetando o cérebro (pressão, inflamação, tumor).',
      'Fígado que não filtra bem e "intoxica" o cérebro.',
      'Ficar parado olhando para a parede, sem empurrar, é mais típico da demência.'
    ],
    observar: [
      'Se ele **empurra** a cabeça com força ou só fica parado olhando.',
      'Se também gira, cambaleia ou parece não enxergar.',
      'Filme para mostrar.'
    ],
    urgencia: [
      'Empurra a cabeça contra a parede ou móveis: veterinário hoje.',
      'Junto com convulsão, cegueira de repente ou quedas.'
    ],
    consulta: [
      'Fica parado olhando a parede ou preso atrás de móveis, sem empurrar: consulta nos próximos dias.'
    ],
    dizer: '"{O} {nome} [empurra a cabeça/fica parad{o} olhando] a parede desde [quando], [x] vezes por dia. Gravei."',
    cuidado: 'mente'
  },
  {
    id: 'perdido-em-casa',
    nome: 'Perdido em casa ou não reconhece',
    emoji: '❓',
    termos: 'perdido desorientado nao reconhece esquece caduco gaga alzheimer demencia preso atras da porta lado errado da porta',
    area: 'noite',
    cor: 'ob',
    resumo: 'Fica no lado errado da porta, preso em cantos, ou estranha você por um instante.',
    daIdade: 'Ficar "caduquinho" é comum na velhice, mas tem nome (demência canina) e tem cuidado. Não é para aceitar calado.',
    podeSer: [
      'Demência canina: desorientação, mudança no jeito de interagir, sono trocado, xixi fora do lugar, esquecer comandos, ansiedade.',
      'Enxergar ou ouvir pior.',
      'Outras doenças que afetam o cérebro, que o veterinário precisa afastar.'
    ],
    observar: [
      'Anote quais destes aparecem: fica perdido, interage diferente, sono trocado, xixi em casa, esquece o que sabia, anda sem rumo, ansiedade nova.',
      'Se piora à noite.'
    ],
    urgencia: [
      'Mudança de repente, em horas ou dias, com quedas, cegueira ou convulsão.'
    ],
    consulta: [
      'Dois ou mais desses sinais aparecendo nas últimas semanas.'
    ],
    dizer: '"{O} {nome} está [ficando perdid{o}/sem me reconhecer] desde [quando]. Também notei [outros sinais]."',
    cuidado: 'mente'
  },
  {
    // REVISAR VET: redação sobre síndrome vestibular ("AVC" do povo) e prognóstico
    id: 'cabeca-torta',
    nome: 'Cabeça torta, olhos balançando',
    emoji: '😵‍💫',
    termos: 'cabeca torta inclinada olhos tremendo olhos balancando nistagmo avc derrame labirintite cai para um lado',
    area: 'outro',
    cor: 'at',
    resumo: 'De repente a cabeça fica inclinada, os olhos mexem sozinhos e ele cai para um lado.',
    daIdade: 'Não. Parece um "AVC" e assusta muito. Às vezes é o labirinto do velhinho, que tem cuidado, mas só o veterinário diferencia.',
    podeSer: [
      'Problema no labirinto (equilíbrio), comum no cão idoso e que costuma vir de repente.',
      'Otite profunda.',
      'Problema no cérebro.'
    ],
    observar: [
      'Para que lado a cabeça inclina.',
      'Se vomita ou baba (enjoo).',
      'Mantenha ele num lugar baixo e acolchoado para não cair.'
    ],
    urgencia: [
      'Começou de repente: veterinário no mesmo dia.',
      'Junto com convulsão, fraqueza nas 4 patas ou sem responder.'
    ],
    consulta: [
      'Inclinação leve que vem aos poucos, com coceira ou cheiro no ouvido.'
    ],
    dizer: '"Hoje às [hora] a cabeça d{o} {nome} ficou torta para o lado [qual], os olhos ficaram balançando e {ele} [vomitou/caiu]."',
    cuidado: 'prevencao'
  },
  {
    id: 'convulsao',
    nome: 'Convulsão',
    emoji: '⚡',
    termos: 'convulsao ataque epilepsia se debatendo pedalando babando tremendo duro crise',
    area: 'outro',
    cor: 'at',
    resumo: 'Cai de lado, se debate ou "pedala", baba, pode fazer xixi, não responde.',
    daIdade: 'Não. Primeira convulsão depois dos 7 anos pede investigação.',
    podeSer: [
      'Algo no cérebro, no fígado, glicose baixa, intoxicação.',
      'Epilepsia em raças com risco (beagle, border collie, pit bull, pug), mas no velhinho outras causas são mais lembradas.'
    ],
    observar: [
      'Não ponha a mão na boca dele. Tire de perto escada e móveis.',
      'Olhe o relógio: quanto tempo durou.',
      'Se der, filme.',
      'Depois, ele pode ficar perdido ou cego por um tempo.'
    ],
    urgencia: [
      'Durou mais de 5 minutos.',
      'Uma atrás da outra sem ele voltar ao normal, ou mais de uma em 24 horas.',
      'Primeira convulsão da vida, ou se pode ter comido algo tóxico.'
    ],
    consulta: [
      'Teve uma convulsão curta e voltou bem: consulta no mesmo dia ou no seguinte.'
    ],
    dizer: '"{O} {nome} teve uma convulsão às [hora], durou [minutos]. Depois ficou [como]. Gravei."',
    cuidado: 'prevencao'
  },

  // ---------- OLHOS E OUVIDOS ----------
  {
    id: 'olho-esbranquicado',
    nome: 'Olho esbranquiçado',
    emoji: '👁️',
    termos: 'olho branco azulado leitoso nublado catarata olho embacado mancha no olho',
    area: 'outro',
    cor: 'vd',
    resumo: 'O meio do olho fica azulado ou leitoso.',
    daIdade: 'Um azulado leve no centro é comum no velhinho e quase não atrapalha a visão. Mas pode ser catarata, então vale o veterinário olhar na consulta.',
    podeSer: [
      'Endurecimento da lente da idade (azulado, comum, enxerga bem).',
      'Catarata (branco mais forte, atrapalha a visão; comum em cão com diabetes).',
      'Se o olho todo está turvo, vermelho ou dolorido: outra coisa, pode ser urgente.'
    ],
    observar: [
      'Se ele esbarra nas coisas ou tem medo de escada.',
      'Se o olho está vermelho, lacrimejando ou ele aperta o olho.',
      'Se bebe muita água (diabetes pode levar a catarata).'
    ],
    urgencia: [
      'Olho vermelho, dolorido, saltado ou turvo de repente.'
    ],
    consulta: [
      'O branco está aumentando ou ele começou a enxergar pior.'
    ],
    dizer: '"O olho d{o} {nome} ficou esbranquiçado desde [quando]. {Ele} [esbarra/não esbarra] nas coisas."',
    cuidado: 'prevencao'
  },
  {
    id: 'esbarra-nas-coisas',
    nome: 'Esbarra nas coisas',
    emoji: '🦯',
    termos: 'enxerga mal cego ceguinho esbarra bate nos moveis nao ve medo do escuro nao acha brinquedo',
    area: 'outro',
    cor: 'ob',
    resumo: 'Bate nos móveis, não acha o petisco, fica inseguro no escuro.',
    daIdade: 'Enxergar pior é comum na velhice, mas cegueira pode ter causa tratável ou dolorosa. E cegueira de repente é urgência.',
    podeSer: [
      'Catarata, retina que vai se apagando, pressão alta no olho (comum no cocker).',
      'Pressão alta no corpo, diabetes.',
      'Demência pode parecer cegueira.'
    ],
    observar: [
      'Se é pior no escuro ou também de dia.',
      'Se foi aos poucos ou de repente.',
      'Teste simples: jogue uma bolinha de algodão perto dele, sem barulho, e veja se ele acompanha.'
    ],
    urgencia: [
      'Ficou cego de repente (em horas ou dias).',
      'Olho vermelho, dolorido ou saltado.'
    ],
    consulta: [
      'Vem enxergando pior aos poucos. Não mude os móveis de lugar enquanto isso.'
    ],
    dizer: '"{O} {nome} começou a esbarrar nas coisas há [tempo], [mais no escuro/o tempo todo]."',
    cuidado: 'mente'
  },
  {
    // REVISAR VET: olho vermelho e dolorido como urgência (glaucoma/úlcera) e redação
    id: 'olho-vermelho',
    nome: 'Olho vermelho ou fechando',
    emoji: '😖',
    termos: 'olho vermelho lacrimejando aperta o olho olho fechado remela olho saltado dor no olho coca o olho',
    area: 'outro',
    cor: 'ob',
    resumo: 'Olho vermelho, lacrimejando, ele aperta ou coça o olho.',
    daIdade: 'Não. Olho dolorido não é da idade e alguns problemas de olho fazem perder a visão em pouco tempo.',
    podeSer: [
      'Machucado ou ferida na superfície do olho (comum em shih tzu, pug, lhasa e outros de olho grande).',
      'Olho seco.',
      'Pressão alta dentro do olho, que dói muito e ameaça a visão.'
    ],
    observar: [
      'Se ele mantém o olho fechado ou esfrega no chão.',
      'Se a remela é verde ou amarela.',
      'Não pingue colírio de gente.'
    ],
    urgencia: [
      'Olho muito vermelho, turvo, saltado ou com dor forte.',
      'Machucou o olho (arranhão de gato, galho).'
    ],
    consulta: [
      'Remela ou vermelhidão leve que não passa em 1 a 2 dias.'
    ],
    dizer: '"O olho [qual] d{o} {nome} está vermelho desde [quando] e {ele} [aperta/coça] o olho."',
    cuidado: 'prevencao'
  },
  {
    id: 'nao-ouve',
    nome: 'Não ouve chamar',
    emoji: '🦻',
    termos: 'surdo surdinho nao escuta nao atende desobediente nao vem quando chama assusta ao tocar',
    area: 'outro',
    cor: 'vd',
    resumo: 'Não vem quando chama, se assusta quando você toca dormindo.',
    daIdade: 'Ouvir menos é comum na velhice e muita gente acha que é desobediência. Mas otite também tira a audição e dói.',
    podeSer: [
      'Perda de audição da idade.',
      'Otite ou cera acumulada.',
      'Demência (ouve, mas não "liga").'
    ],
    observar: [
      'Cheiro, cera escura, coceira ou dor no ouvido.',
      'Se ele acorda com barulho forte (palma, porta).',
      'Acorde sempre com cheiro ou tocando devagar o corpo, não a cabeça.'
    ],
    urgencia: [
      'Junto com cabeça torta, desequilíbrio ou dor forte no ouvido.'
    ],
    consulta: [
      'Ouvido com cheiro, secreção ou coceira.',
      'A surdez apareceu de repente.'
    ],
    dizer: '"{O} {nome} não atende mais quando chamo desde [quando]. O ouvido [tem/não tem] cheiro ou coceira."',
    cuidado: 'mente'
  },

  // ---------- BOCA ----------
  {
    id: 'mau-halito',
    nome: 'Mau hálito',
    emoji: '🦷',
    termos: 'bafo mau halito boca podre dente podre tartaro dente mole gengiva vermelha sangra banguela',
    area: 'boca',
    cor: 'ob',
    resumo: 'Bafo forte, tártaro amarelado ou marrom, gengiva vermelha.',
    daIdade: 'Não. Mau hálito é quase sempre doença de gengiva, que atinge a maioria dos cães adultos e anda junto com problema de rim e coração.',
    podeSer: [
      'Doença de gengiva e tártaro (muito mais comum em raças pequenas).',
      'Dente quebrado ou com infecção na raiz.',
      'Cheiro de amônia pode ser rim; cheiro doce, outras doenças.'
    ],
    observar: [
      'Levante o lábio com boa luz: tártaro, gengiva vermelha, sangue, dente mole.',
      'Se mastiga de um lado só, deixa cair a ração ou passou a preferir comida mole.',
      'Inchaço embaixo do olho (pode ser raiz de dente).'
    ],
    urgencia: [
      'Rosto inchado, não come por dor, ou sangramento na boca que não para.'
    ],
    consulta: [
      'Tártaro visível, gengiva vermelha ou dente mole: peça avaliação da boca. Com exames antes, a anestesia no idoso é planejada com segurança.'
    ],
    dizer: '"{O} {nome} está com mau hálito e tártaro. {Ele} [mastiga de um lado/deixa cair comida]. Quero avaliar a boca e os exames antes da limpeza."',
    cuidado: 'prevencao'
  },

  // ---------- CAROÇOS, GENGIVA E PELE ----------
  {
    // REVISAR VET: regra da ervilha (campanha de oncologista, não diretriz oficial)
    id: 'caroco-novo',
    nome: 'Caroço novo',
    emoji: '🔎',
    termos: 'caroco bolinha nodulo tumor verruga calombo inchaco bola na pele lipoma gordura cisto',
    area: 'caroco',
    cor: 'ob',
    resumo: 'Bolinha nova na pele ou embaixo dela, ou uma antiga que mudou.',
    daIdade: 'Caroços ficam mais comuns na velhice e muitos são benignos. Mas só a punção (agulhinha) diz o que é. Tocar não diz.',
    podeSer: [
      'Gordura (lipoma), cisto, verruga, que são comuns e benignos.',
      'Tumor que, pego pequeno, muitas vezes se resolve com cirurgia.',
      'Íngua (gânglio) aumentada no pescoço, axila ou atrás do joelho.'
    ],
    observar: [
      '**Regra da ervilha:** do tamanho de uma ervilha (1 cm) e está ali há 1 mês? Mostre ao veterinário.',
      'Marque no mapa de caroços: local, tamanho com régua, data e foto.',
      'Meça de novo a cada 2 a 4 semanas.'
    ],
    urgencia: [
      'Caroço que cresceu muito em dias, sangra, abriu ou está quente e dolorido.',
      'Várias ínguas aumentadas ao mesmo tempo, com moleza.'
    ],
    consulta: [
      'Qualquer caroço de 1 cm ou mais há 1 mês.',
      'Caroço que mudou de tamanho, cor ou consistência.'
    ],
    dizer: '"Achei um caroço n{o} {nome} em [local], de [x] cm, há [tempo]. Quero fazer a punção para saber o que é."',
    cuidado: 'prevencao'
  },
  {
    id: 'gengiva-palida',
    nome: 'Gengiva pálida ou branca',
    emoji: '🤍',
    termos: 'gengiva branca palida descorada lingua branca anemia sem cor fraqueza sangramento interno baco',
    area: 'caroco',
    cor: 'at',
    resumo: 'A gengiva, que era rosada, ficou clara, branca ou acinzentada.',
    daIdade: 'Nunca. Gengiva branca é sinal de pouco sangue circulando.',
    podeSer: [
      'Sangramento interno (por exemplo, tumor no baço que sangra, mais comum em golden, pastor e labrador).',
      'Anemia por doença do carrapato, por doença em que o corpo destrói o próprio sangue, ou por rim.',
      'Choque ou coração muito fraco.'
    ],
    observar: [
      'Aprenda a cor normal dele: levante o lábio com boa luz, num dia bom, e tire foto.',
      'Aperte a gengiva com o dedo: a cor deve voltar em menos de 2 segundos.'
    ],
    urgencia: [
      '**Gengiva branca com fraqueza de repente, barriga inchada ou desmaio: corra agora.**',
      'Gengiva amarelada ou com pontinhos roxos de sangue.'
    ],
    consulta: [
      'Gengiva um pouco mais clara que o normal dele, com ele bem: consulta nos próximos dias com hemograma.'
    ],
    dizer: '"A gengiva d{o} {nome} ficou [branca/pálida] desde [quando]. {Ele} [está/não está] fraco. Teve carrapato [quando]."',
    cuidado: 'prevencao'
  },
  {
    id: 'coceira-queda-pelo',
    nome: 'Coceira e queda de pelo',
    emoji: '🐕',
    termos: 'coceira cocando queda de pelo falha no pelo pele vermelha ferida lambedura caspa pelo ralo pele escura',
    area: 'outro',
    cor: 'vd',
    resumo: 'Se coça muito, lambe as patas, falhas no pelo ou pele vermelha.',
    daIdade: 'O pelo do velhinho fica mais ralo e seco, mas coceira e falhas têm causa.',
    podeSer: [
      'Pulga, carrapato, alergia, fungo ou bactéria na pele.',
      'Pelo ralo e simétrico, sem coceira: pode ter a ver com tireoide ou cortisol.',
      'Lamber uma articulação sem parar pode ser dor.'
    ],
    observar: [
      'Onde coça e se tem pulga ou carrapato (orelhas e entre os dedos).',
      'Se tem cheiro, feridas ou caroços.',
      'Se as falhas são dos dois lados iguais.'
    ],
    urgencia: [
      'Inchaço no rosto de repente, dificuldade de respirar ou muitas manchas roxas na pele.'
    ],
    consulta: [
      'Coceira que não passa em 1 semana, feridas ou falhas aumentando.'
    ],
    dizer: '"{O} {nome} está se coçando [onde] desde [quando]. O antipulgas foi dado em [data]."',
    cuidado: 'prevencao'
  },
  {
    id: 'unhas-patas',
    nome: 'Unhas compridas ou patinhas feridas',
    emoji: '💅',
    termos: 'unha comprida unha encravada unha grande almofadinha rachada ferida na pata pelo entre os dedos sangra unha',
    area: 'patas',
    cor: 'vd',
    resumo: 'Unhas batendo no chão, encravando, ou almofadinhas rachadas.',
    daIdade: 'O velhinho gasta menos a unha porque anda menos. Unha grande muda a pisada e piora o escorregão e a dor nas patas.',
    podeSer: [
      'Unha crescida por andar pouco (inclusive o "dedinho" de dentro, que pode encravar).',
      'Pelo comprido entre as almofadinhas.',
      'Ferida, espinho ou infecção entre os dedos.'
    ],
    observar: [
      'Com ele em pé, a unha não deve encostar no chão.',
      'Se ouve "tec tec" no piso.',
      'Se ele lambe muito uma pata.'
    ],
    urgencia: [
      'Unha arrancada sangrando muito, ou pata inchada com dor forte.'
    ],
    consulta: [
      'Unha encravada, inchaço entre os dedos ou ferida que não fecha.'
    ],
    dizer: '"{O} {nome} está com [unha encravada/ferida] na pata [qual] desde [quando]."',
    cuidado: 'mobilidade'
  }
];

// ---------- EMERGÊNCIA: a lista vermelha ----------
// REVISAR VET: lista completa, ordem e os passos do "no caminho" / "não faça"
window.EMERGENCIA = {
  correr: [
    { emoji: '⚡', t: 'Convulsão que não para', x: 'Dura mais de 5 minutos, ou vem uma atrás da outra sem {ele} voltar ao normal.' },
    { emoji: '😮‍💨', t: 'Não consegue respirar', x: 'Esforço para puxar o ar, pescoço esticado, não consegue deitar, ou respiração muito rápida que não acalma.' },
    { emoji: '🟣', t: 'Língua ou gengiva roxa', x: 'Azulada ou arroxeada: falta de oxigênio.' },
    { emoji: '🤍', t: 'Gengiva branca e fraqueza', x: 'Gengiva pálida ou branca com moleza de repente. Pode ser sangramento por dentro.' },
    { emoji: '🎈', t: 'Barriga inchada e dura', x: 'Barriga crescendo, dura, com ânsia sem conseguir vomitar e inquietação. Em cão grande, é questão de horas.' },
    { emoji: '☠️', t: 'Comeu veneno ou algo tóxico', x: 'Remédio de gente, chumbinho, raticida, uva ou passa, chiclete sem açúcar (xilitol), chocolate, produto de limpeza. Vá mesmo sem sinais.' },
    { emoji: '😶', t: 'Desmaio', x: 'Caiu, apagou ou ficou mole, mesmo que tenha voltado.' },
    { emoji: '🩸', t: 'Sangramento que não para', x: 'Sangue que não para com pressão por 5 minutos, ou sangue pelo nariz, boca, vômito ou cocô preto.' },
    { emoji: '🚫', t: 'Não consegue fazer xixi', x: 'Faz força e não sai, ou só sai gotinha, por várias horas.' },
    { emoji: '🌀', t: 'Não fica em pé de repente', x: 'Perdeu as patas de trás, cambaleia, cabeça torta de repente, ou não responde ao chamado.' },
    { emoji: '🤮', t: 'Vômito sem parar', x: 'Vomita várias vezes seguidas, não segura nem água, ou o vômito tem sangue.' },
    { emoji: '🌡️', t: 'Calor demais (insolação)', x: 'Depois de sol ou carro fechado: ofegante demais, língua muito vermelha ou roxa, babando, cambaleando.' },
    { emoji: '🚗', t: 'Atropelamento ou queda', x: 'Mesmo que pareça bem: pode ter sangramento por dentro.' },
    { emoji: '😖', t: 'Dor muito forte', x: 'Grita ao ser tocado, treme, não acha posição, olho de repente vermelho e saltado.' },
    { emoji: '🍖', t: 'Engasgado', x: 'Pata na boca, ânsia, baba e dificuldade para respirar.' }
  ],
  caminho: [
    'Ligue para o pronto-socorro veterinário 24 h enquanto alguém dirige. Diga o que aconteceu e que está a caminho.',
    'Mantenha {o} {nome} deitad{o} de lado, quietinh{o}, numa toalha ou caixa de transporte.',
    'Cão grande que não anda: use uma toalha ou cobertor como maca, com duas pessoas.',
    'Se sangra, aperte o local com pano limpo e não solte.',
    'No calor, ar ligado ou janela aberta; não cubra o cão.',
    'Fale baixo e com calma. Mesmo o cão mais doce pode morder quando sente dor.',
    'Leve a embalagem, o vídeo e a lista de remédios (veja abaixo).'
  ],
  naoFaca: [
    'Não dê remédio de gente (para dor, febre, enjoo ou convulsão), nem "só um pouquinho".',
    'Não provoque vômito por conta própria, nem com sal, água oxigenada ou dedo na garganta, sem o veterinário mandar.',
    'Não ponha a mão na boca durante uma convulsão. Ele não engole a língua.',
    'Não dê água nem comida se ele estiver engasgado, desmaiado, convulsionando ou com barriga inchada.',
    'Não dê leite, óleo ou carvão "para cortar o veneno".',
    'Não espere "para ver se melhora" quando o sinal está nesta lista.',
    'Não jogue água gelada no cão com calor demais: use água fresca, não gelada.',
    'Não aperte o pescoço: tire a coleira e use peitoral ou toalha.'
  ],
  levar: [
    'A embalagem ou um pedaço do que ele comeu (remédio, planta, produto).',
    'A hora em que tudo começou e o que você viu (anote no celular).',
    'O vídeo da convulsão, do desmaio ou da respiração.',
    'A lista de remédios e suplementos que ele toma (o app tem ela pronta no Resumo para o veterinário).',
    'Exames recentes, se tiver.'
  ],
  antes: [
    'Salve hoje no celular o telefone e o endereço do pronto-socorro veterinário 24 h mais perto.',
    'Descubra se ele atende de madrugada e aos domingos, e quanto custa a consulta de urgência.',
    'Deixe à mão a caixa de transporte ou uma toalha grande para carregar.',
    'Aprenda a cor normal da gengiva d{o} {nome} e tire uma foto num dia bom.',
    'Guarde remédios, chocolate, uva passa e chiclete onde ele não alcança.'
  ]
};
