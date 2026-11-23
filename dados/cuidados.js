// Conteúdo dos 5 cuidados (aba Rotina) do app Vovocão.
// Esquema: window.CUIDADOS = [{ id, num, nome, emoji, sinais, frase, porQue, secoes: [{ id, titulo, emoji, resumo, blocos: [BLOCO] }] }]
// Blocos: p | lista | passos | aviso | exercicio | checklist | escala | semaforo | cartoes | suplementos | perguntas | alimentos | widget
// Tokens: {nome} {ele} {Ele} {dele} {o} {O}. **negrito** permitido. Sem HTML.
// Regras: não diagnostica, não receita, não indica remédio nem dose (CFMV). Não é dieta de emagrecimento.
// Tudo marcado com "REVISAR VET" precisa da leitura do veterinário antes de ir para o ar.
window.CUIDADOS = [
  // ====================================================================
  // 1. MOBILIDADE E DOR
  // ====================================================================
  {
    id: 'mobilidade', num: 1, nome: 'Mobilidade e dor', emoji: '🦴',
    sinais: ['patas'],
    frase: 'Músculo ativo e dor percebida cedo mantêm {o} {nome} de pé por mais tempo.',
    porQue: 'Quando veterinários procuraram com um checklist, mais de 1 em cada 3 cães tinha sinais de artrose, e a maioria nunca tinha sido diagnosticada (Duncan e Lascelles, 2024). Cão com dor se mexe menos, perde músculo e piora. Movimento certo, todo dia, quebra esse ciclo.',
    secoes: [
      {
        id: 'exercicios', titulo: 'Exercícios guiados', emoji: '🏃', resumo: '3 a 5 minutos, escolhidos pela dificuldade d{o} {nome}',
        blocos: [
          { t: 'aviso', cor: 'ob', titulo: 'Antes de começar', x: 'Se {o} {nome} mostra dor, comece estes exercícios **depois** que o veterinário avaliar. Dor tem tratamento, e exercício não substitui. Se piorar, pare e fale com ele.' },
          { t: 'p', x: 'Pouco e todo dia vale mais que muito de vez em quando. Faça em piso que não escorrega, com a ração ou um petisco seguro como prêmio, e sempre no ritmo {dele}.' },
          {
            t: 'exercicio', id: 'ex-levantar', nome: 'Levantar com mais firmeza',
            para: 'Para quem: demora para levantar, levanta "em etapas" ou desiste no meio.',
            tags: ['levantar'], duracao: '4 min', frequencia: '1 a 2x ao dia',
            passos: [
              { x: 'Aquecimento: com {o} {nome} deitad{o} de lado, faça carinho firme e lento nas coxas de trás, de cima para baixo.', s: 40 },
              { x: 'Deitad{o} de peito, mostre o petisco na frente do focinho e suba a mão devagar, para {ele} levantar no tempo {dele}. Elogie. Repita 3 vezes, com pausa.', s: 60 },
              { x: 'Em pé, leve o petisco devagar para um lado e depois para o outro, para {ele} passar o peso de uma pata para a outra. 3 vezes de cada lado.', s: 50 },
              { x: 'Caminhada lenta de 10 passos em linha reta, ida e volta, em tapete ou grama.', s: 60 },
              { x: 'Descanso deitad{o}, com carinho. Fim.', s: 30 },
            ],
            pare: ['Pare se {ele} gritar, chorar ou tentar morder ao ser tocad{o}.', 'Pare se tremer muito, ofegar forte ou se recusar a levantar.', 'Se no dia seguinte {ele} estiver mais dur{o} ou mancando mais, pule o exercício e fale com o veterinário.'],
            dica: 'Faça antes da refeição: a ração vira o prêmio e {ele} fica mais animad{o}.',
          },
          {
            t: 'exercicio', id: 'ex-escorrega', nome: 'Firmeza no piso liso',
            para: 'Para quem: escorrega no piso, abre as patas ou tem medo de andar no porcelanato.',
            tags: ['escorrega'], duracao: '3 min', frequencia: '1x ao dia',
            passos: [
              { x: 'Olhe as patas: pelo entre as almofadinhas cobrindo a sola e unha comprida fazem escorregar. Só olhe agora; apare depois, com calma ou no banho e tosa.', s: 30 },
              { x: 'Faça um "caminho" de 2 metros com tapete de borracha ou EVA. Ande ao lado {dele} em cima do tapete, devagar, guiando com o petisco. 4 idas.', s: 60 },
              { x: 'Parad{o} em pé no tapete, toque de leve uma pata de cada vez, como quem vai pegar, por 2 segundos. Assim {ele} aprende a se firmar nas outras três. Só faça se {ele} já fica firme em pé.', s: 50 },
              { x: 'Senta e levanta em cima do tapete, 3 vezes, com elogio.', s: 40 },
            ],
            pare: ['Pare se {ele} perder o equilíbrio ou cair de lado.', 'Pare se mostrar dor ao tocar a pata.', 'Pare se ficar com medo: volte só para a caminhada no tapete.'],
            dica: 'O exercício ajuda, mas o que mais muda é a casa: tapete nos caminhos que {ele} usa. Veja "Casa adaptada".',
          },
          {
            t: 'exercicio', id: 'ex-patas-tras', nome: 'Força nas patas de trás',
            para: 'Para quem: as patas de trás tremem, cruzam, arrastam um pouco ou ficam fracas no fim do passeio.',
            tags: ['patas-tras'], duracao: '5 min', frequencia: '1 a 2x ao dia',
            passos: [
              { x: 'Aquecimento: massagem nas coxas de trás, de cima para baixo, com a mão inteira.', s: 45 },
              { x: 'Caminhada lenta em linha reta, na grama ou no tapete, no ritmo {dele}.', s: 90 },
              { x: 'Senta e levanta devagar, com o petisco, de 3 a 5 vezes. Se {ele} sentar torto, ajude a ajeitar com a mão.', s: 60 },
              { x: 'Coloque um cabo de vassoura no chão e faça {ele} atravessar devagar, 4 vezes. Isso faz {ele} levantar e pensar em cada pata.', s: 60 },
              { x: 'Descanso deitad{o}, com carinho nas coxas.', s: 45 },
            ],
            pare: ['Pare se as patas de trás falharem ou {ele} sentar no meio do caminho.', 'Pare se tremer muito ou ofegar forte.', 'Patas de trás que ficaram fracas **de repente** não são para exercício: é para o veterinário hoje.'],
          },
          // REVISAR VET: exercícios para cão com histórico de hérnia de disco; confirmar se transferência de peso e o "8" largo são seguros fora da fase de crise.
          {
            t: 'exercicio', id: 'ex-coluna', nome: 'Coluna protegida (salsicha e coluna longa)',
            para: 'Para quem: Salsicha, Basset, Corgi, Shih Tzu e quem já teve dor de coluna ou hérnia, fora da crise e liberado pelo veterinário.',
            tags: ['coluna'], duracao: '4 min', frequencia: '1 a 2x ao dia',
            passos: [
              { x: 'Treine o colo certo: uma mão embaixo do peito, a outra embaixo do traseiro, coluna reta. Levante e ponha no chão 2 vezes, devagar. Nunca pegue pelas axilas ou pela barriga.', s: 40 },
              { x: 'Caminhada lenta em linha reta, com **peitoral** (nunca coleira puxando o pescoço), em chão firme que não escorrega.', s: 90 },
              { x: 'Parad{o} em pé no tapete, encoste a mão de leve no quadril, de um lado e depois do outro, só para {ele} se firmar. Bem de leve, sem empurrar.', s: 45 },
              { x: 'Ande devagar fazendo um "8" bem largo, com curvas abertas.', s: 35 },
              { x: 'Descanso. Nada de pular para sair do exercício: ajude a deitar.', s: 30 },
            ],
            pare: ['**Não faça** se {ele} estiver com as costas curvadas, gritando ao ser pego, tremendo de dor ou arrastando as patas: isso é para o veterinário hoje.', 'Pare se {ele} cruzar as patas de trás ou cambalear.', 'Pare se recusar andar ou ficar parad{o} com a cabeça baixa.'],
            dica: 'No dia a dia: sem pular do sofá e da cama, sem escada. Use rampa e escadinha. Isso vale mais que qualquer exercício.',
          },
          {
            t: 'exercicio', id: 'ex-artrose', nome: 'Caminhada para articulação (cão grande)',
            para: 'Para quem: Labrador, Golden, Pastor e cães grandes com artrose ou que "endurecem" depois de deitar.',
            tags: ['artrose'], duracao: '5 min', frequencia: '2 a 3x ao dia, curtinhas',
            passos: [
              { x: 'Aquecimento: 1 minuto de caminhada bem lenta, dentro de casa ou no quintal.', s: 60 },
              { x: 'Caminhada em chão macio (grama ou terra), no passo {dele}. Deixe cheirar.', s: 120 },
              { x: 'Suba uma rampa suave ou uma leve subida da rua, bem devagar, 2 vezes.', s: 60 },
              { x: 'Desaquecimento: ande devagar e termine com massagem leve nas coxas e nos ombros.', s: 60 },
            ],
            pare: ['Pare se {ele} começar a mancar mais ou ficar para trás.', 'Pare no calor forte: cão grande e idoso esquenta rápido.', 'Se depois de 1 hora {ele} estiver mais dur{o} que antes, a dose foi grande demais: diminua no próximo.'],
            dica: 'Três passeios curtos no dia cansam menos as articulações do que um passeio longo no fim de semana.',
          },
        ],
      },
      {
        id: 'massagem', titulo: 'Massagem e alongamento', emoji: '👐', resumo: 'Toque que relaxa, aquece e ainda ajuda a achar caroço e dor',
        blocos: [
          { t: 'p', x: 'Massagem não cura artrose, mas relaxa o músculo, aquece antes do exercício e é um ótimo momento para conhecer o corpo d{o} {nome}: se apareceu um caroço ou um lugar dolorido, você percebe.' },
          {
            t: 'exercicio', id: 'massagem', nome: 'Massagem de 5 minutos',
            para: 'Para todos. Melhor à noite, com {ele} calm{o}.',
            tags: ['geral'], duracao: '5 min', frequencia: '1x ao dia',
            passos: [
              { x: 'Com {o} {nome} deitad{o} de lado num lugar quieto, deslize a mão inteira da cabeça até o rabo, devagar.', s: 45 },
              { x: 'Pescoço e ombros: círculos pequenos com a ponta dos dedos, pressão de quem toca um tomate maduro.', s: 60 },
              { x: 'Costas: dos dois lados da coluna, nunca em cima do osso, de cima para baixo.', s: 60 },
              { x: 'Coxas de trás: aperte e solte de leve, de cima para baixo.', s: 75 },
              { x: 'Patas: se {ele} aceitar, segure com calma e massageie entre as almofadinhas.', s: 30 },
              { x: 'Termine com um carinho longo do focinho ao rabo.', s: 30 },
            ],
            pare: ['Pare se {ele} se afastar, rosnar ou ficar tens{o}: é sinal de dor naquele lugar. Anote e conte ao veterinário.'],
          },
          // REVISAR VET: alongamento passivo em cão com artrose; confirmar amplitude e tempo de sustentação.
          {
            t: 'exercicio', id: 'alongamento', nome: 'Alongamento passivo (você move, {ele} relaxa)',
            para: 'Para quem fica dur{o} depois de dormir. Só com {ele} relaxad{o} e depois da massagem.',
            tags: ['geral'], duracao: '3 min', frequencia: '1x ao dia',
            passos: [
              { x: 'Com {ele} deitad{o} de lado, segure a pata de trás de cima: uma mão acima do joelho, outra perto do tornozelo.', s: 20 },
              { x: 'Leve a pata devagar para trás até sentir a primeira resistência. Segure de 10 a 15 segundos e volte. Faça 2 vezes.', s: 40 },
              { x: 'Dobre e estique a pata devagar, como uma bicicleta lenta, 10 vezes. Sem forçar.', s: 40 },
              { x: 'Pata da frente de cima: leve devagar para a frente, segure 10 segundos, volte. 2 vezes.', s: 40 },
              { x: 'Vire {o} {nome} com cuidado e faça o mesmo do outro lado, de forma mais curta.', s: 40 },
            ],
            pare: ['Pare na primeira resistência: alongamento nunca dói.', 'Pare se {ele} puxar a pata, gemer ou olhar para a sua mão.'],
          },
          {
            t: 'lista', titulo: 'O que NÃO fazer',
            itens: [
              'Não force nenhuma articulação além do ponto em que ela para sozinha.',
              'Não massageie caroço, região quente, vermelha ou inchada: isso é para o veterinário ver.',
              'Não aperte em cima da coluna nem dos ossos.',
              'Não faça com {ele} agitad{o}, com fome ou logo depois de comer muito.',
              'Não use pomada, gel ou óleo de gente na pele {dele}: {ele} lambe.',
            ],
          },
        ],
      },
      {
        id: 'casa', titulo: 'Casa adaptada', emoji: '🏠', resumo: 'Pequenas mudanças que evitam tombos e dor',
        blocos: [
          { t: 'p', x: 'Um tombo no porcelanato pode virar semanas de dor. Marque o que você já fez. A maioria custa pouco ou nada.' },
          {
            t: 'checklist', id: 'casa',
            itens: [
              { id: 'tapete', x: 'Tapete antiderrapante nos caminhos que {ele} usa', d: 'Tapete de EVA (de academia ou de criança) e passadeira com borracha embaixo. Priorize: cama, pote de água, porta e onde {ele} levanta.' },
              { id: 'rampa', x: 'Rampa ou escadinha para sofá e cama', d: 'Dá para fazer com almofadas firmes ou caixote com espuma e tapete por cima. Ou, mais simples: tire o costume de subir.' },
              { id: 'escada', x: 'Barreira na escada', d: 'Portãozinho de bebê ou uma tábua. Escada é onde acontecem as quedas feias.' },
              { id: 'luz', x: 'Luz noturna no caminho da cama até a água', d: 'Lâmpada de tomada com sensor, barata. Ajuda quem enxerga menos e quem acorda confus{o} de madrugada.' },
              { id: 'cama', x: 'Cama firme e grossa, longe de corrente de ar', d: 'Espuma firme (tipo colchonete) é melhor que almofada que afunda. Cama baixa, fácil de entrar.' },
              { id: 'potes', x: 'Potes de comida e água elevados', d: 'Na altura do peito {dele}. Um banquinho ou caixote resolve. Menos esforço no pescoço e nas patas da frente.' },
              { id: 'unhas', x: 'Unhas curtas e pelo da sola aparado', d: 'Se você ouve "tec tec" no piso, a unha está grande. Peça no banho e tosa para aparar o pelo entre as almofadinhas.' },
              { id: 'meia', x: 'Meia ou botinha antiderrapante (se {ele} aceitar)', d: 'Ajuda em casa com piso liso. Tire para dormir e confira se não aperta.' },
              { id: 'molhado', x: 'Piso sempre seco onde {ele} passa', d: 'Pote de água em cima de um tapete que absorve. Secar logo depois do pano.' },
              { id: 'moveis', x: 'Móveis no mesmo lugar', d: 'Cão idoso que enxerga menos decora a casa. Mudar tudo de lugar confunde e causa tombo.' },
              { id: 'colo', x: 'Todos da casa sabem pegar no colo do jeito certo', d: 'Uma mão no peito, outra no traseiro. Nunca pelas axilas, nunca pela barriga.' },
            ],
          },
        ],
      },
      {
        id: 'dor', titulo: 'Sinais de dor que parecem preguiça', emoji: '🩹', resumo: 'O que muita gente chama de "é da idade" pode ser dor',
        blocos: [
          { t: 'aviso', cor: 'ob', titulo: 'Cão com dor quase nunca chora', x: 'Na dor que dura meses, o cão muda o comportamento em vez de gemer (diretriz de dor da AAHA, 2022). Os donos costumam esperar meses achando que é "da idade".' },
          {
            t: 'escala', id: 'dor', titulo: 'Marque o que você viu n{o} {nome} nas últimas 2 semanas',
            itens: [
              { id: 'levantar', x: 'Demora para levantar ou levanta "em etapas"' },
              { id: 'subir', x: 'Não sobe mais no sofá, na cama ou no carro' },
              { id: 'passeio', x: 'Fica para trás no passeio ou quer voltar logo' },
              { id: 'receber', x: 'Não vem mais te receber na porta' },
              { id: 'lambe', x: 'Lambe sempre a mesma pata ou articulação' },
              { id: 'senta', x: 'Senta torto, com uma pata para o lado' },
              { id: 'toque', x: 'Fica irritad{o} ou se afasta quando é tocad{o} em algum lugar' },
              { id: 'dorme', x: 'Dorme bem mais que antes, ou muda de posição a noite toda' },
              { id: 'ofega', x: 'Ofega parad{o}, sem calor e sem ter feito esforço' },
              { id: 'treme', x: 'As patas de trás tremem quando fica em pé' },
            ],
            faixas: [
              { min: 0, max: 0, cor: 'vd', x: 'Nada marcado agora. Continue olhando a cada semana: a dor costuma chegar devagar.' },
              { min: 1, max: 2, cor: 'ob', x: 'Pode ser começo de dor. Anote desde quando e mostre esta lista na próxima consulta. Comece os exercícios leves e a casa adaptada.' },
              { min: 3, max: 99, cor: 'at', x: 'Vários sinais juntos: vale marcar consulta para avaliar dor. Dor tem tratamento, e {o} {nome} pode voltar a ter dias bem melhores.' },
            ],
          },
          { t: 'aviso', cor: 'at', titulo: 'Nunca dê remédio de gente para dor', x: 'Ibuprofeno, diclofenaco, naproxeno e outros anti-inflamatórios de farmácia causam úlcera no estômago e lesão no rim do cão. Remédio de dor, só o que o veterinário receitar, na dose que ele calcular.' },
          { t: 'p', x: 'Esta lista não é diagnóstico. Ela serve para você chegar na consulta com o que viu em casa, que é justamente o que o veterinário não vê no consultório.' },
        ],
      },
    ],
  },

  // ====================================================================
  // 2. ALIMENTAÇÃO E ÁGUA
  // ====================================================================
  {
    id: 'alimentacao', num: 2, nome: 'Alimentação e água', emoji: '🥣',
    sinais: ['apetite', 'agua'],
    frase: 'Comer com vontade e beber bem: o prato também muda com os aninhos.',
    porQue: 'No idoso, o músculo cai antes de tudo, e o apetite é um dos primeiros sinais de que algo mudou (diretrizes de nutrição da WSAVA e da AAHA). Prestar atenção em como {o} {nome} come e bebe é a forma mais simples de perceber cedo.',
    secoes: [
      {
        id: 'o-que-muda', titulo: 'O que muda no prato do idoso', emoji: '🍲', resumo: 'Textura, porções, cheiro e dentes',
        blocos: [
          { t: 'p', x: 'Com a idade, o olfato e o paladar ficam mais fracos, os dentes doem ou faltam, e o estômago aceita melhor porções menores. Nada disso é frescura: é o corpo pedindo ajuste.' },
          {
            t: 'lista', titulo: 'Ajustes que ajudam',
            itens: [
              '**Textura:** se {ele} deixa a ração seca no pote, amoleça com água morna por 10 minutos, ou misture um pouco de ração úmida.',
              '**Cão banguela ou com dente dolorido:** papinha. Ração amolecida e amassada com garfo, ou ração úmida. E conte ao veterinário: dor de dente tira o apetite.',
              '**Porções menores, mais vezes:** dividir a quantidade do dia em 3 ou 4 refeições pesa menos no estômago.',
              '**Comida morna cheira mais:** aqueça um pouco (morna, nunca quente). O cheiro chama o apetite.',
              '**Pote elevado:** na altura do peito, para não forçar o pescoço e as patas da frente.',
              '**Lugar calmo:** longe de outros cães e do movimento. Idoso come mais devagar e se distrai.',
              '**Horário fixo:** a rotina ajuda o corpo e a cabeça, principalmente de quem anda confus{o}.',
            ],
          },
          {
            t: 'lista', titulo: 'Cuidados importantes',
            itens: [
              '**Troca de ração sempre aos poucos**, de 7 a 10 dias, misturando a nova na antiga. Troca de uma vez dá diarreia e recusa.',
              '**Ração de filhote não é para idoso.** Tem mais calorias e minerais do que o corpo velhinho precisa.',
              '**Se {ele} tem doença no rim, no coração ou no fígado,** a comida é parte do tratamento. Siga a ração que o veterinário indicou, sem misturar outras coisas sem perguntar.',
              '**Comida de gente temperada** (arroz com alho, feijão, carne com sal) faz mal. Veja a lista do "pode ou não pode".',
            ],
          },
          { t: 'aviso', cor: 'vd', titulo: 'O que importa observar', x: 'Se {o} {nome} come com vontade, se mastiga dos dois lados, se deixa cair comida da boca e se a vontade mudou de uma semana para outra. Isso entra no check-up semanal.' },
        ],
      },
      {
        id: 'parou-de-comer', titulo: 'Parou de comer: o que fazer hoje', emoji: '🚦', resumo: 'Quando dá para tentar em casa e quando é urgente',
        blocos: [
          { t: 'p', x: 'No idoso, não comer é um dos sinais mais importantes. Às vezes é manha ou calor. Às vezes é dor de dente, enjoo, rim ou algo mais sério. Use o semáforo:' },
          // REVISAR VET: limites de tempo da triagem do apetite (24 h no idoso/pequeno; 2 dias para consulta).
          {
            t: 'semaforo',
            itens: [
              { cor: 'vd', titulo: 'Pode tentar em casa hoje', itens: ['Pulou 1 refeição, mas bebe água normal.', 'Está animad{o}, faz xixi e cocô normal.', 'Sem vômito e sem diarreia.', 'Tente as dicas abaixo e ofereça de novo na próxima refeição.'] },
              { cor: 'ob', titulo: 'Marque consulta em 1 a 2 dias', itens: ['Come menos da metade há 2 dias.', 'Só come na mão ou só aceita petisco.', 'Come devagar, deixa cair da boca ou mastiga de um lado só.', 'Está comendo menos há semanas, aos pouquinhos.'] },
              { cor: 'at', titulo: 'Vá ao veterinário hoje', itens: ['Não comeu nada em 24 horas (principalmente cão pequeno e idoso).', 'Não come e está vomitando.', 'Não quer beber água.', 'Gengiva branca ou muito pálida.', 'Barriga inchada ou dura.', 'Muito parad{o}, fraco, sem levantar.', 'Pode ter comido algo tóxico, osso ou objeto.'] },
            ],
          },
          {
            t: 'lista', titulo: 'O que tentar em casa (no sinal verde)',
            itens: [
              'Aquecer a comida até ficar morna.',
              'Umedecer a ração com água morna ou misturar um pouco de ração úmida.',
              'Oferecer na mão, com calma, sem insistir demais.',
              'Usar prato raso: alguns idosos não gostam de enfiar o focinho em pote fundo.',
              'Tirar a comida depois de 15 a 20 minutos e oferecer de novo mais tarde.',
              'Deixar água fresca bem perto da cama.',
            ],
          },
          {
            t: 'lista', titulo: 'O que NÃO fazer',
            itens: [
              'Não dê remédio de enjoo ou de estômago de gente.',
              'Não force comida ou líquido pela boca se {ele} engasga, tosse ou está muito fraco: pode ir para o pulmão.',
              'Não troque de ração toda hora tentando acertar: isso pode piorar o estômago.',
              'Não espere vários dias "para ver se passa" no cão idoso.',
            ],
          },
        ],
      },
      {
        id: 'pode-nao-pode', titulo: 'Pode ou não pode?', emoji: '🔎', resumo: 'Busque o alimento e veja na hora',
        blocos: [
          { t: 'alimentos' },
          { t: 'aviso', cor: 'ob', titulo: 'A regra do petisco', x: 'Mesmo o que pode vai **sem tempero, sem sal e em pouquinho**. Petisco e comida extra não devem passar de cerca de 10% do que {o} {nome} come no dia. Se {ele} tem doença no rim, coração, pâncreas ou diabetes, pergunte ao veterinário antes de qualquer extra.' },
          { t: 'aviso', cor: 'at', titulo: 'Comeu algo da lista vermelha?', x: 'Não espere sinal. Vá ao veterinário agora e leve a embalagem ou diga quanto comeu e a que horas. Não provoque vômito por conta própria.' },
        ],
      },
      {
        id: 'agua', titulo: 'Água e hidratação', emoji: '💧', resumo: 'Beber bem, e saber quando a sede é sinal',
        blocos: [
          {
            t: 'lista', titulo: 'Para {ele} beber bem',
            itens: [
              'Água fresca trocada pelo menos 2 vezes ao dia, com o pote lavado.',
              'Mais de um pote pela casa, principalmente perto da cama.',
              'Fonte de água corrente ajuda alguns cães a beber mais.',
              'Ração úmida ou ração amolecida também conta como água.',
              'No calor, deixe à sombra e ofereça depois do passeio.',
            ],
          },
          { t: 'aviso', cor: 'at', titulo: 'Beber muito mais não é "se hidratar"', x: 'Sede nova e muito xixi no cão idoso podem ser sinal de rim, diabetes ou excesso de cortisol. Muitos donos acham normal e só descobrem tarde. Se mudou, meça e leve ao veterinário.' },
          {
            t: 'passos', titulo: 'Como medir quanto {ele} bebe em 24 horas',
            itens: [
              'De manhã, encha o pote com uma quantidade conhecida (use um copo medidor ou garrafa de 1 litro).',
              'Sempre que completar o pote, anote quanto colocou.',
              'Na manhã seguinte, meça o que sobrou.',
              'Bebeu = tudo o que você colocou menos o que sobrou. Anote no Diário do app.',
              'Repita por 2 ou 3 dias e leve os números para a consulta.',
            ],
          },
          // REVISAR VET: referência de consumo de água (acima de ~100 ml por kg por dia é considerado excessivo na literatura).
          { t: 'p', x: 'O veterinário compara o número com o peso {dele}. Como referência, a literatura veterinária considera alto quando passa de cerca de 100 ml por quilo por dia. Ração úmida e calor mudam a conta, por isso o número é para conversar, não para diagnosticar.' },
          { t: 'lista', titulo: 'Leve ao veterinário se', itens: ['Bebe visivelmente mais há mais de uma semana.', 'Começou a fazer xixi dormindo ou dentro de casa.', 'Bebe mais e está comendo menos ou mais fraco.', 'Não quer beber nada (isso é hoje).'] },
        ],
      },
    ],
  },

  // ====================================================================
  // 3. REMÉDIOS E SUPLEMENTOS
  // ====================================================================
  {
    id: 'remedios', num: 3, nome: 'Remédios e suplementos', emoji: '💊',
    sinais: [],
    frase: 'Organizar o que o veterinário receitou, e saber o que nunca dar.',
    porQue: 'Remédio de gente é a intoxicação nº 1 dos cães atendida pelo centro de intoxicação da ASPCA: 16,9% dos casos em 2025. E remédio certo, na hora certa, faz o tratamento funcionar. Aqui o app organiza e orienta; quem receita é o veterinário.',
    secoes: [
      {
        id: 'meus-remedios', titulo: 'Meus remédios', emoji: '⏰', resumo: 'Horários, lembrete e "dei a dose"',
        blocos: [
          { t: 'widget', w: 'remedios' },
          { t: 'aviso', cor: 'vd', x: 'O app só organiza o que o veterinário receitou. Nunca mude a dose nem pare um remédio sem falar com ele, mesmo que {o} {nome} pareça melhor.' },
        ],
      },
      {
        id: 'comprimido', titulo: 'Comprimido sem briga', emoji: '🤲', resumo: 'Truques que funcionam com quem cospe tudo',
        blocos: [
          { t: 'aviso', cor: 'ob', x: 'Antes de tudo, pergunte ao veterinário se o comprimido pode ser partido, amassado ou dado com comida. Alguns não podem.' },
          {
            t: 'passos', titulo: 'O truque das 3 bolinhas',
            itens: [
              'Prepare 3 bolinhas de um petisco seguro e macio (pedacinho de ração úmida ou frango cozido sem tempero). Só uma leva o comprimido.',
              'Dê a 1ª bolinha, sem nada. {Ele} engole confiante.',
              'Dê a 2ª, com o comprimido escondido no meio.',
              'Já mostre a 3ª na mão: {ele} engole a 2ª rápido para pegar a próxima.',
              'Elogie e faça festa. A hora do remédio vira hora boa.',
            ],
          },
          {
            t: 'passos', titulo: 'Se precisar dar direto na boca',
            itens: [
              'Fique ao lado {dele}, não de frente. Calma e voz baixa.',
              'Com uma mão por cima do focinho, levante de leve o lábio de cima atrás dos dentes do canto.',
              'Com a outra mão, abaixe o queixo e coloque o comprimido no meio da língua, mais para trás, sem empurrar com força.',
              'Feche a boca com carinho e faça carinho na garganta até {ele} lamber o focinho (sinal de que engoliu).',
              'Logo depois, ofereça um pouco de água com seringa sem agulha pelo canto da boca, devagar, ou um petisco.',
            ],
          },
          {
            t: 'lista', titulo: 'Remédio líquido',
            itens: [
              'Use a seringa que veio com o remédio (ou a dose que o veterinário mostrou).',
              'Coloque pelo canto da boca, atrás dos dentes do canto, devagar, deixando {ele} engolir.',
              'Nunca esguiche de uma vez com a cabeça muito para cima: pode ir para o pulmão.',
            ],
          },
          {
            t: 'lista', titulo: 'O que NÃO fazer',
            itens: [
              'Não jogue o comprimido no fundo da garganta com força.',
              'Não misture no pote de comida inteiro: se {ele} não comer tudo, você não sabe quanto tomou.',
              'Não esconda em comida proibida (chocolate, presunto temperado, queijo com alho).',
              'Não dê a dose dobrada porque esqueceu a anterior. Pergunte ao veterinário o que fazer.',
            ],
          },
        ],
      },
      {
        id: 'gaveta', titulo: 'O veneno nº 1 está na sua gaveta', emoji: '🚫', resumo: 'Os remédios de gente que fazem mal ao cão',
        blocos: [
          { t: 'p', x: 'Remédios de gente são a causa nº 1 de intoxicação de cães atendida pela ASPCA (16,9% dos casos em 2025). Quase sempre com boa intenção: "dei um comprimido para a dor". Dose de gente não é dose de cão.' },
          {
            t: 'cartoes',
            itens: [
              { emoji: '⛔', titulo: 'Anti-inflamatórios de gente', tag: 'Nunca dê', cor: 'at', x: 'Ibuprofeno, diclofenaco, naproxeno, cetoprofeno, nimesulida, ácido acetilsalicílico (AAS). Causam úlcera e sangramento no estômago e lesão nos rins, mesmo em dose pequena. É o erro mais perigoso.' },
              // REVISAR VET: redação sobre paracetamol em cães (não é proibido em absoluto; existe uso veterinário com prescrição).
              { emoji: '⚠️', titulo: 'Paracetamol', tag: 'Só com o veterinário', cor: 'ob', x: 'Não é exato dizer que é veneno para cão, mas a dose de gente (como um comprimido de 750 mg) em cão pequeno é perigosa, e dose repetida também. Para gato, é mortal. Só se o veterinário receitar e calcular.' },
              // REVISAR VET: redação sobre dipirona (usada por veterinários no Brasil com dose por peso).
              { emoji: '⚠️', titulo: 'Dipirona', tag: 'Só com dose do veterinário', cor: 'ob', x: 'Veterinários usam, com dose calculada pelo peso. O perigo é a gota "de olho", a dose de gente ou a dica de comentário na internet. Sem receita, não.' },
              { emoji: '💤', titulo: 'Remédio de enjoo, alergia, calmante ou convulsão emprestado', tag: 'Só com o veterinário', cor: 'ob', x: 'Dramin, antialérgico, calmante, remédio para dormir, gardenal "que sobrou" de outro cão. A dose e a substância mudam muito. Alguns parecem iguais e não são.' },
              { emoji: '🧴', titulo: 'Pomadas, sprays e colírios de gente', tag: 'Só com o veterinário', cor: 'ob', x: 'O cão lambe o que passa na pele. Pomada com corticoide ou anti-inflamatório e colírio com corticoide podem piorar feridas e úlceras no olho.' },
              { emoji: '💊', titulo: 'Vitaminas e suplementos de gente', tag: 'Só com o veterinário', cor: 'ob', x: 'Alguns têm xilitol (adoçante tóxico para cão), ferro ou vitamina D em excesso. Gomas e "zero açúcar" são as piores.' },
              { emoji: '🔒', titulo: 'Guarde tudo longe do alcance', cor: 'vd', x: 'Cartela no chão, bolsa aberta, porta-comprimidos na mesa de cabeceira: o cão idoso fareja e mastiga. Guarde no alto e fechado.' },
            ],
          },
          { t: 'aviso', cor: 'at', titulo: 'Comeu remédio?', x: 'Leve agora, com a cartela ou a caixa, mesmo que {ele} pareça bem. Muitos remédios só mostram o estrago horas ou dias depois. Não provoque vômito por conta própria.' },
        ],
      },
      {
        id: 'suplementos', titulo: 'Suplementos: o que a ciência diz', emoji: '🐟', resumo: 'Ômega 3, glucosamina, MCT e outros, sem promessa',
        blocos: [
          { t: 'p', x: 'Muitos donos já dão algum suplemento. Aqui está o que os estudos mostram, de forma honesta. **Nenhum substitui tratamento**, e a dose e a marca ficam com o veterinário.' },
          {
            t: 'suplementos',
            itens: [
              { nome: 'Ômega 3 (óleo de peixe, EPA e DHA)', emoji: '🐟', paraQue: 'Articulações e artrose; também estudado para pele, rim e coração.', ciencia: 'Num estudo controlado com 38 cães com artrose, a força de apoio na pata subiu 5,6% no grupo do ômega 3 contra 0,4% no grupo sem (Roush, 2010). Outro estudo mostrou que a dose faz diferença (Fritsch, 2010). Um estudo independente com 77 cães não achou efeito. Benefício modesto, de curto prazo.', evidencia: 'moderada', pergunte: 'Pergunte ao veterinário: o ômega 3 faz sentido para {o} {nome}? Qual produto e qual dose para o peso {dele}? Interfere com algum remédio que {ele} toma?' },
              { nome: 'Glucosamina e condroitina', emoji: '🦴', paraQue: 'Articulações.', ciencia: 'Muito vendidas, mas os estudos em cães são poucos e com resultados misturados: alguns acharam pequena melhora, outros nenhuma diferença. A qualidade dos produtos também varia muito.', evidencia: 'fraca', pergunte: 'Pergunte ao veterinário: vale a pena para {o} {nome}, ou existe algo com mais prova para a dor {dele}?' },
              { nome: 'MCT (óleo TCM, triglicerídeos de cadeia média)', emoji: '🧠', paraQue: 'Cérebro do idoso e sinais de "caduquice".', ciencia: 'Num estudo duplo-cego com 87 cães, uma dieta com 6,5% de MCT melhorou os sinais de disfunção cognitiva em 90 dias (Pan, 2018). Estudo financiado pela Purina; é a base de rações para o cérebro do idoso. Óleo de coco comum não é a mesma coisa.', evidencia: 'moderada', pergunte: 'Pergunte ao veterinário: uma ração ou suplemento com MCT ajudaria {o} {nome}? Pode dar com a doença {dele}? (MCT pode não ser indicado em cão com pancreatite.)' },
              { nome: 'Antioxidantes e dieta de apoio ao cérebro', emoji: '🫐', paraQue: 'Memória e aprendizado no idoso.', ciencia: 'Em beagles idosos acompanhados por 2 anos, dieta com antioxidantes **mais** brincadeiras e estímulo funcionou melhor que cada um sozinho: 12 de 12 cães resolveram a tarefa, contra 8 de 12 só com dieta (Milgram, 2005). Estudo pequeno, mas bem feito.', evidencia: 'moderada', pergunte: 'Pergunte ao veterinário: existe uma ração para o cérebro do idoso que faça sentido para {o} {nome}?' },
              { nome: 'Probióticos', emoji: '🦠', paraQue: 'Intestino, diarreia.', ciencia: 'Alguns estudos mostram que podem encurtar diarreias, mas para o envelhecimento em geral a prova ainda é fraca. Cada produto tem bactérias diferentes.', evidencia: 'fraca', pergunte: 'Pergunte ao veterinário: um probiótico ajuda no caso d{o} {nome}? Qual?' },
            ],
          },
          { t: 'aviso', cor: 'ob', titulo: 'Antes de começar qualquer suplemento', x: 'Suplemento não substitui tratamento e pode interagir com remédios (ômega 3, por exemplo, com remédios que afinam o sangue). Leve o rótulo na consulta e anote em "Meus remédios" o que {ele} toma.' },
        ],
      },
      {
        id: 'perguntas', titulo: 'Perguntas para levar ao veterinário', emoji: '📝', resumo: 'Para a consulta render, sem esquecer nada',
        blocos: [
          { t: 'p', x: 'Consulta passa rápido. Copie estas perguntas, marque as que importam para {o} {nome} e leve junto com o Resumo para o veterinário (em Perfil).' },
          {
            t: 'perguntas',
            itens: [
              '{O} {nome} pode estar com dor? Como eu percebo em casa?',
              'Quais exames de sangue e de urina {ele} deveria fazer agora, na idade {dele}? A cada quanto tempo?',
              'Podemos medir a pressão {dele}?',
              'O coração {dele} tem sopro? Preciso contar a respiração dormindo em casa?',
              'Como estão os rins? Vale pedir o SDMA junto com a creatinina?',
              'Os dentes precisam de limpeza? Quais exames deixam a anestesia mais segura para {ele}?',
              'Algum suplemento faria sentido para {ele}? Qual e em que dose?',
              'O que está mudando no sono e no comportamento à noite pode ser demência? Existe tratamento?',
              'Quais vacinas e vermífugos {ele} ainda precisa nessa idade? E o antipulgas e anticarrapato?',
              'Como eu sei se o remédio está funcionando? Quais efeitos colaterais devo vigiar?',
              'Quais são os sinais de emergência mais importantes para a raça {dele}?',
              'Esse caroço precisa de punção?',
              'Quanto de exercício é bom para {ele} hoje?',
              'Como avaliamos juntos a qualidade de vida {dele} daqui para a frente?',
            ],
          },
        ],
      },
    ],
  },

  // ====================================================================
  // 4. PREVENÇÃO DE DOENÇAS
  // ====================================================================
  {
    id: 'prevencao', num: 4, nome: 'Prevenção de doenças', emoji: '🩺',
    sinais: ['boca', 'caroco', 'respiracao'],
    frase: 'Pegar cedo o que a raça e a idade d{o} {nome} costumam trazer.',
    porQue: 'Um ano do cão vale vários dos nossos, por isso a associação americana de hospitais veterinários (AAHA) recomenda consulta a cada 6 meses para o idoso. Muitas doenças aparecem no exame antes de aparecer em casa, e tratar cedo costuma ser mais simples e mais barato.',
    secoes: [
      {
        id: 'checkup', titulo: 'Check-up a cada 6 meses', emoji: '📅', resumo: 'Quando ir e os exames para pedir',
        blocos: [
          { t: 'widget', w: 'calendario' },
          { t: 'p', x: 'A AAHA recomenda que o cão idoso vá ao veterinário **a cada 6 meses**, mesmo parecendo bem. Os exames de sangue e de urina pegam mudanças que ainda não dão sinal em casa.' },
          {
            t: 'lista', titulo: 'Os exames para pedir',
            itens: [
              '**Hemograma:** mostra anemia, infecção e plaquetas (importante para quem já teve carrapato).',
              '**Bioquímica com creatinina e SDMA:** rins e fígado. O SDMA costuma subir antes da creatinina, quando o rim começa a perder força.',
              '**Exame de urina (com densidade e proteína):** mostra se o rim está concentrando bem e se está perdendo proteína.',
              '**Pressão arterial:** pressão alta anda junto com doença no rim e pode afetar olhos e coração.',
              '**Tireoide:** quando o veterinário achar que faz sentido (cansaço, ganho de peso, pelo ralo).',
              '**NT-proBNP e ecocardiograma:** se {ele} tem sopro no coração, para ver como o coração está.',
              '**Avaliação da boca:** tártaro, gengiva, dentes moles.',
              '**Escore corporal e de músculo:** o idoso pode manter o peso e mesmo assim perder músculo.',
              '**Olhos e ouvidos:** catarata, pressão no olho, otite e surdez.',
            ],
          },
          {
            t: 'lista', titulo: 'Como chegar preparado',
            itens: [
              'Leve o **Resumo para o veterinário** do app (em Perfil): dados, remédios, check-ups e caroços.',
              'Leve as perguntas que você marcou.',
              'Se for exame de sangue, pergunte antes se precisa de jejum.',
              'Leve a lista ou as caixas dos remédios e suplementos.',
              'Se tiver vídeo de algo estranho (tosse, tremor, andar diferente), mostre. Vale muito.',
            ],
          },
        ],
      },
      {
        id: 'doencas-raca', titulo: 'As doenças da raça {dele}', emoji: '🧬', resumo: 'O sinal em casa, como atrasar e o exame a pedir',
        blocos: [
          { t: 'p', x: 'Cada raça envelhece de um jeito. Estas são as doenças que mais aparecem na raça d{o} {nome}, segundo os estudos. Para cada uma: o sinal que você consegue ver em casa, o que fazer para atrasar e o exame para pedir. Não é para assustar: é para você saber onde olhar.' },
          { t: 'widget', w: 'doencas-raca' },
        ],
      },
      {
        id: 'carocos', titulo: 'Mapa de caroços', emoji: '🔎', resumo: 'Marque, meça e acompanhe. A regra da ervilha',
        blocos: [
          { t: 'aviso', cor: 'ob', titulo: 'A regra da ervilha', x: 'Caroço do tamanho de uma ervilha (1 cm) que está ali há 1 mês: mostre ao veterinário e pergunte sobre a **punção**. A regra é da oncologista Dra. Sue Ettinger: "viu, mede, aspira". Muitos tumores de pele, pegos pequenos, se resolvem só com cirurgia.' },
          { t: 'widget', w: 'carocos' },
          { t: 'p', x: '"Caroço mole é gordura, não precisa ver" é um mito perigoso. Pelo toque, ninguém sabe o que é, nem o veterinário. Só a punção (uma agulha fina, geralmente rápida e sem anestesia) diz.' },
          {
            t: 'passos', titulo: 'O passa-mão do mês (5 minutos)',
            itens: [
              'Escolha um dia fixo do mês, com {o} {nome} calm{o}.',
              'Cabeça, orelhas (por dentro e por fora) e embaixo do queixo.',
              'Pescoço e os dois lados da garganta.',
              'Axilas e peito.',
              'Barriga, devagar, da frente para trás.',
              'Nas fêmeas: as mamas, uma por uma, das axilas até a virilha.',
              'Virilha e a parte de dentro das coxas.',
              'Patas, entre os dedos e as unhas.',
              'Costas e rabo, até a ponta.',
              'Achou algo? Marque no mapa com o tamanho e a data. Se puder, tire foto ao lado de uma moeda ou régua.',
            ],
          },
          { t: 'aviso', cor: 'at', x: 'Vá logo ao veterinário se o caroço **cresce rápido** (dias ou semanas), sangra, abre ferida, é duro e grudado, ou se {o} {nome} está mais parad{o}, comendo menos ou com gengiva pálida.' },
        ],
      },
      {
        id: 'boca', titulo: 'Boca e dentes', emoji: '🦷', resumo: 'Escovação em 2 semanas de adaptação',
        blocos: [
          { t: 'p', x: 'A maioria dos cães com mais de 3 anos já tem algum grau de doença na gengiva (AAHA), e quase nenhum dono percebe. Num estudo com cerca de 165 mil cães, a doença de gengiva grave andou junto com quase 3 vezes mais doença renal (Glickman, 2011). É associação, não prova de causa, mas mostra que boca não é só hálito.' },
          {
            t: 'passos', titulo: 'Adaptação à escova (1 a 2 semanas)',
            itens: [
              'Dias 1 a 3: só toque os lábios e a gengiva com o dedo, por poucos segundos, e dê um petisco. Pare antes de {ele} se incomodar.',
              'Dias 4 a 6: deixe {ele} lamber um pouco da pasta **veterinária** do seu dedo. Passe o dedo nos dentes do canto e de trás, por fora.',
              'Dias 7 a 9: troque o dedo por uma gaze enrolada no dedo ou uma escova de dedo. Movimentos pequenos, na linha da gengiva.',
              'Dias 10 a 14: escova de cerdas macias, inclinada para a gengiva. Comece pelos dentes de trás de cima, onde o tártaro junta mais.',
              'Depois: 1 a 2 minutos, só a parte de fora dos dentes já ajuda muito. Elogie sempre.',
            ],
          },
          {
            t: 'lista', titulo: 'Regras de ouro',
            itens: [
              '**Pasta de dente de gente, nunca:** pode ter xilitol (tóxico para cão) e flúor, que {ele} engole.',
              '**Frequência:** o ideal é todo dia. Dia sim, dia não, já ajuda. Uma vez por semana ajuda pouco.',
              'Petiscos e rações com o selo VOHC ajudam, mas não substituem a escova.',
              'Se a gengiva sangra muito, {ele} chora ou tem dente mole, pare e marque consulta: pode estar doendo.',
            ],
          },
          { t: 'lista', titulo: 'Sinais na boca para observar', itens: ['Mau hálito forte ou novo.', 'Tártaro amarelado ou marrom.', 'Gengiva vermelha, inchada ou sangrando.', 'Mastiga de um lado só ou deixa cair comida.', 'Dente mole ou quebrado.', 'Baba ou passa a pata na boca.'] },
          // REVISAR VET: redação sobre risco anestésico no idoso.
          { t: 'aviso', cor: 'vd', titulo: 'Medo da anestesia?', x: 'É um medo muito comum no cão idoso. Os exames antes (sangue, coração, às vezes raio-X) servem para deixar a anestesia mais segura e ajustada para {ele}. Converse com o veterinário sobre os riscos e os benefícios: deixar a boca doendo também tem custo para a saúde.' },
        ],
      },
    ],
  },

  // ====================================================================
  // 5. MENTE E ALEGRIA
  // ====================================================================
  {
    id: 'mente', num: 5, nome: 'Mente e alegria', emoji: '🧠',
    sinais: ['noite'],
    frase: 'Cabeça ativa e dias com vontade: farejar, brincar, ter rotina.',
    porQue: 'No maior estudo do mundo sobre envelhecimento de cães, com 41 mil cães, os mais ativos e curiosos viveram mais (Dog Aging Project, 2026; é associação, não promessa). Em outro estudo, brincadeiras de cérebro junto com boa alimentação ajudaram cães idosos a aprender como cães mais novos (Milgram, 2005).',
    secoes: [
      {
        id: 'faro', titulo: 'Brincadeiras de faro', emoji: '👃', resumo: '5 a 10 minutos que cansam a cabeça do jeito bom',
        blocos: [
          { t: 'p', x: 'Farejar é o exercício que o idoso ainda faz bem, mesmo enxergando e ouvindo menos. Cansa a cabeça, acalma e não força as articulações. Quando der, use a própria ração do dia como prêmio.' },
          {
            t: 'exercicio', id: 'br-tapete', nome: 'Tapete de farejar caseiro',
            para: 'Para todos, inclusive quem anda pouco. Ótimo para quem come rápido demais.',
            tags: ['geral'], duracao: '7 min', frequencia: '1x ao dia',
            passos: [
              { x: 'Monte: uma toalha velha enrolada com nós frouxos, ou tiras de pano amarradas num tapete de borracha com furos.', s: 120 },
              { x: 'Espalhe um punhado da ração entre as dobras e os nós.', s: 30 },
              { x: 'Coloque no chão e deixe {o} {nome} farejar e achar tudo. Ajude só se {ele} desistir.', s: 240 },
              { x: 'Recolha o tapete e guarde. Fica especial se só aparece na hora da brincadeira.', s: 30 },
            ],
            pare: ['Pare se {ele} começar a mastigar e engolir o pano.', 'Pare se ficar frustrad{o}: deixe mais fácil na próxima.'],
          },
          {
            t: 'exercicio', id: 'br-esconder', nome: 'Esconde-esconde do petisco',
            para: 'Para todos. Dá para fazer em um cômodo só.',
            tags: ['geral'], duracao: '5 min', frequencia: '1x ao dia',
            passos: [
              { x: 'Mostre o petisco ou uns grãos de ração e deixe {ele} cheirar.', s: 30 },
              { x: 'Esconda bem à vista, no chão, a 1 metro {dele}, e diga "procura!".', s: 60 },
              { x: 'Quando achar, festa. Repita mais 2 vezes, um pouco mais longe.', s: 60 },
              { x: 'Esconda mais difícil: atrás de uma almofada, embaixo de um pano, no pé da cadeira. Sempre no chão, sem pular.', s: 90 },
              { x: 'Termine com um achado fácil, para fechar com vitória.', s: 60 },
            ],
            pare: ['Pare se {ele} perder o interesse: sempre termine antes de cansar.'],
          },
          {
            t: 'exercicio', id: 'br-garrafa', nome: 'Garrafa da ração',
            para: 'Para quem ainda tem energia e gosta de empurrar coisas com o focinho.',
            tags: ['geral'], duracao: '6 min', frequencia: '1x ao dia',
            passos: [
              { x: 'Pegue uma garrafa PET limpa e seca, **sem tampa, sem rótulo e sem o anel do gargalo**. Coloque alguns grãos de ração.', s: 60 },
              { x: 'Mostre a garrafa, deixe cheirar e balance para fazer barulho.', s: 30 },
              { x: 'Deixe {ele} rolar e empurrar até os grãos caírem. Fique junto o tempo todo.', s: 240 },
              { x: 'Recolha a garrafa no fim. Nunca deixe {ele} sozinh{o} com ela.', s: 30 },
            ],
            pare: ['Pare se {ele} morder e quebrar o plástico.', 'Não faça com quem tem dentes fracos e quer mastigar a garrafa.'],
          },
          {
            t: 'exercicio', id: 'br-caminho', nome: 'Passeio de cheiro (caminho novo)',
            para: 'Para quem ainda caminha, mesmo devagar. Quem não anda pode fazer no colo ou no carrinho.',
            tags: ['geral'], duracao: '10 min', frequencia: '2 a 3x por semana',
            passos: [
              { x: 'Escolha um quarteirão ou trecho diferente do de sempre.', s: 60 },
              { x: 'Ande no ritmo {dele}, sem pressa, com guia frouxa e peitoral.', s: 240 },
              { x: 'Deixe parar e cheirar o quanto quiser: poste, grama, muro. É o melhor do passeio para {ele}.', s: 240 },
              { x: 'Volte com calma e ofereça água.', s: 60 },
            ],
            pare: ['Pare se {ele} sentar e não quiser seguir, mancar ou ofegar forte.', 'Evite o horário de calor e o asfalto quente.'],
          },
          {
            t: 'exercicio', id: 'br-copos', nome: 'Jogo dos copos',
            para: 'Para todos. Dá para fazer com {ele} deitad{o}.',
            tags: ['geral'], duracao: '5 min', frequencia: '3 a 4x por semana',
            passos: [
              { x: 'Separe 3 copos de plástico iguais, de boca para baixo.', s: 30 },
              { x: 'Com {ele} olhando, coloque um petisco embaixo de um copo.', s: 60 },
              { x: 'Diga "acha!" e espere {ele} cheirar ou tocar o copo certo. Levante e dê o petisco.', s: 90 },
              { x: 'Troque os copos de lugar devagar e repita. Se acertar fácil, aumente a dificuldade.', s: 90 },
              { x: 'Festa no final.', s: 30 },
            ],
            pare: ['Pare se {ele} ficar frustrad{o}: volte para o nível fácil.'],
          },
          {
            t: 'exercicio', id: 'br-truque', nome: 'Um truque novo',
            para: 'Para todos. Cachorro velho aprende truque novo, sim.',
            tags: ['geral'], duracao: '5 min', frequencia: '3 a 5x por semana',
            passos: [
              { x: 'Escolha algo simples: encostar o focinho na sua mão ("toca"), dar a pata, olhar para você quando chama.', s: 30 },
              { x: 'Mostre a mão aberta perto do focinho, com o petisco escondido na outra mão.', s: 60 },
              { x: 'Quando {ele} encostar ou fizer o movimento, diga "isso!" e dê o petisco na hora.', s: 120 },
              { x: 'Repita poucas vezes e pare enquanto ainda está bom.', s: 90 },
            ],
            pare: ['Pare se {ele} ficar ansios{o} ou perder o interesse.'],
          },
        ],
      },
      {
        id: 'madrugada', titulo: 'Madrugada agitada e "caduquice"', emoji: '🌙', resumo: 'Sinais de demência canina e a rotina que acalma',
        blocos: [
          { t: 'p', x: 'Andar em círculos, ficar com a cabeça na parede, latir de madrugada, se perder dentro de casa. Muitos chamam de "Alzheimer" ou "caduquice". O nome é disfunção cognitiva, e é comum: num estudo, 1 em cada 7 cães idosos tinha sinais, mas quase nenhum tinha diagnóstico (Salvin, 2010). Os sinais aumentam com a idade: cerca de 28% aos 11 a 12 anos e 68% aos 15 a 16 (Neilson, 2001).' },
          // REVISAR VET: escala resumida inspirada no DISHAA; faixas não são as oficiais da escala.
          {
            t: 'escala', id: 'dishaa', titulo: 'Marque o que você viu n{o} {nome} no último mês',
            itens: [
              { id: 'perdido', x: 'Fica perdid{o} em casa, preso atrás de móvel ou num canto' },
              { id: 'parede', x: 'Fica parad{o} olhando para a parede ou para o nada' },
              { id: 'reconhece', x: 'Parece não reconhecer pessoas da casa por um instante' },
              { id: 'interacao', x: 'Mudou o jeito com a família: mais grudad{o} ou mais distante' },
              { id: 'noite', x: 'Troca o dia pela noite: dorme de dia e anda de madrugada' },
              { id: 'late', x: 'Late, chora ou uiva de madrugada sem motivo' },
              { id: 'xixi', x: 'Voltou a fazer xixi ou cocô dentro de casa' },
              { id: 'esquece', x: 'Esquece o que sabia: nome, comandos, onde é a porta' },
              { id: 'circulos', x: 'Anda sem rumo ou em círculos' },
              { id: 'ansiedade', x: 'Ficou mais ansios{o} ou com medo de coisas que não tinha' },
            ],
            faixas: [
              { min: 0, max: 0, cor: 'vd', x: 'Nada marcado agora. Continue com as brincadeiras de faro e a rotina: cabeça ativa é cuidado.' },
              { min: 1, max: 3, cor: 'ob', x: 'Alguns sinais. Pode ser começo de mudança na cabeça, ou dor, visão e audição. Conte ao veterinário na próxima consulta e reforce a rotina abaixo.' },
              { min: 4, max: 99, cor: 'at', x: 'Vários sinais juntos. Vale marcar consulta: existem tratamentos e dietas que podem ajudar, e o veterinário precisa descartar outras causas. Isto não é diagnóstico.' },
            ],
          },
          {
            t: 'passos', titulo: 'A rotina que acalma a noite',
            itens: [
              'Horário fixo para comer, passear e dormir, todos os dias.',
              'De dia: passeio de cheiro e brincadeira de faro, para cansar a cabeça do jeito bom.',
              'Um último xixi logo antes de dormir.',
              'Luz noturna no caminho entre a cama e a água.',
              'Cama sempre no mesmo lugar, perto da família se {ele} se acalma assim.',
              'Barreira para {ele} não entrar atrás de móveis e ficar pres{o}.',
              'Fale antes de tocar: {ele} pode não ouvir ou não enxergar você chegando.',
              'Não mude os móveis de lugar.',
              'Música calma ou um rádio baixinho pode ajudar alguns cães.',
            ],
          },
          { t: 'aviso', cor: 'at', titulo: 'Não dê calmante de gente', x: 'Remédio para dormir ou calmante de gente pode piorar a confusão, derrubar a pressão ou intoxicar. Se as noites estão muito difíceis, conte ao veterinário: existem remédios e dietas para isso, e noites bem dormidas são cuidado para vocês dois.' },
          { t: 'p', x: 'Girar sem parar, andar com a cabeça torta, cair para um lado ou ter convulsão **não** é para esperar: veja em Sinais e Emergência.' },
        ],
      },
      {
        id: 'animado', titulo: 'Coisas que deixam o idoso animado', emoji: '🌞', resumo: 'Ideias simples e baratas para dias com mais vontade',
        blocos: [
          {
            t: 'cartoes',
            itens: [
              { emoji: '🌞', titulo: 'Banho de sol da manhã', x: '10 a 15 minutos no sol fraco da manhã. Esquenta as articulações e marca o começo do dia.' },
              { emoji: '🛒', titulo: 'Passeio de carrinho ou de colo', x: 'Quem não anda mais também quer ver a rua, sentir cheiros e o vento. Carrinho de bebê usado resolve.' },
              { emoji: '📍', titulo: 'Visitar um lugar que {ele} amava', x: 'A praça, a casa da avó, a calçada da padaria. Cheiro conhecido traz memória boa.' },
              { emoji: '🧸', titulo: 'Rodízio de brinquedos', x: 'Guarde metade dos brinquedos e troque a cada semana. O "velho" volta como novo.' },
              { emoji: '🍽️', titulo: 'Comer fora do lugar', x: 'Uma refeição no quintal ou na varanda, ou espalhada na grama, vira passeio.' },
              { emoji: '🌿', titulo: 'Trazer cheiros para dentro', x: 'Folhas, um galho, uma pinha, a sua roupa usada. Para quem sai pouco, cheiro novo é notícia.' },
              { emoji: '💬', titulo: 'Conversa e carinho com hora marcada', x: '5 minutos só de vocês, sem celular. Escovar o pelo conta.' },
              { emoji: '🐕', titulo: 'Um amigo calmo', x: 'Encontro curto com um cão tranquilo que {ele} já conhece. Nada de filhote agitado.' },
              { emoji: '🏡', titulo: 'Participar da rotina da casa', x: 'Deixar {ele} junto na cozinha, no jardim, na chegada das visitas. Sentir-se parte da família anima.' },
              { emoji: '🎵', titulo: 'Música e voz', x: 'Música calma, voz da família, rádio baixinho. Muitos cães se acalmam e ficam mais atentos.' },
              { emoji: '🚗', titulo: 'Volta de carro', x: 'Se {ele} gosta e não enjoa: janela um pouco aberta, cinto ou caixa de transporte.' },
              { emoji: '🎾', titulo: 'A brincadeira de sempre, adaptada', x: 'Bolinha rolando no chão em vez de jogada longe. A mesma alegria, sem pulo e sem freada.' },
            ],
          },
        ],
      },
      {
        id: 'dias-bons', titulo: 'Contador de dias bons', emoji: '💚', resumo: 'Um toque por dia: foi um dia bom?',
        blocos: [
          { t: 'p', x: 'No fim do dia, marque se foi um dia bom ou difícil para {o} {nome}. Leva 2 segundos. Com o tempo, você enxerga a tendência, e isso alimenta a escala de qualidade de vida (Dias bons), que ajuda a conversar com o veterinário.' },
          { t: 'widget', w: 'contador' },
        ],
      },
    ],
  },
];

// Pode ou não pode? st: 'nao' (Não pode) | 'cuidado' (Pode, com cuidado)
// Itens "cuidado": sempre cozido quando aplicável, sem tempero, sem sal e em pouquinho (até ~10% do dia somando petiscos).
window.ALIMENTOS = [
  // ---- NÃO PODE ----
  { nome: 'Uva e uva-passa', termos: 'uva passa passas panetone bolo', st: 'nao', x: 'Podem parar os rins do cão, e não existe quantidade segura. Cuidado com panetone, bolo e biscoito com passas.' },
  { nome: 'Xilitol (adoçante)', termos: 'xilitol chiclete bala goma zero açúcar adoçante pasta de dente', st: 'nao', x: 'Está em chiclete, bala, pasta de dente de gente e produtos "zero açúcar". Derruba a glicose em menos de uma hora e pode lesar o fígado.' },
  { nome: 'Chocolate e cacau', termos: 'chocolate cacau brigadeiro achocolatado bombom ovo de páscoa', st: 'nao', x: 'Tem teobromina, que acelera o coração e pode dar convulsão. Quanto mais escuro, menos quantidade já intoxica.' },
  { nome: 'Cebola, alho, alho-poró e cebolinha', termos: 'cebola alho alho poró cebolinha', st: 'nao', x: 'Crus, cozidos ou em pó, destroem as células do sangue e causam anemia. O alho é ainda mais forte.' },
  { nome: 'Tempero pronto e caldo', termos: 'tempero caldo knorr sazon tablete', st: 'nao', x: 'Concentram sal, cebola e alho em pó. Um pouco de "comida temperada" já soma muito.' },
  { nome: 'Comida de gente temperada', termos: 'arroz feijão feijoada sobra almoço comida caseira linguiça salsicha presunto', st: 'nao', x: 'A "sobrinha do almoço" costuma ter sal, alho, cebola e gordura. Feijoada, linguiça, salsicha e presunto, nunca.' },
  { nome: 'Macadâmia', termos: 'macadâmia noz castanha', st: 'nao', x: 'Dá fraqueza nas patas de trás, vômito e tremor em poucas horas.' },
  // REVISAR VET: nozes e castanhas em geral (o tóxico confirmado é a macadâmia; as demais por gordura e mofo).
  { nome: 'Nozes e castanhas em geral', termos: 'noz nozes castanha caju pará amendoim salgado', st: 'nao', x: 'Muito gordurosas, salgadas e às vezes com mofo. Podem dar pancreatite e engasgo.' },
  { nome: 'Osso cozido', termos: 'osso cozido assado frango churrasco costela', st: 'nao', x: 'Lasca, pode furar o intestino ou entalar. Osso de frango e de churrasco são os piores.' },
  { nome: 'Abacate', termos: 'abacate guacamole', st: 'nao', x: 'O caroço entala e a casca e as folhas fazem mal. A polpa é muito gordurosa para o idoso.' },
  { nome: 'Caroço de fruta', termos: 'caroço semente pêssego manga ameixa cereja', st: 'nao', x: 'Caroço de manga, pêssego e ameixa entala no intestino. Alguns têm substâncias tóxicas.' },
  { nome: 'Bebida alcoólica', termos: 'álcool cerveja vinho cachaça bebida', st: 'nao', x: 'Mesmo pouco derruba a glicose e a temperatura do cão. Nunca.' },
  { nome: 'Café, chá preto e energético', termos: 'café cafeína chá preto mate energético coca refrigerante', st: 'nao', x: 'A cafeína acelera o coração e pode dar tremor e convulsão.' },
  { nome: 'Massa crua com fermento', termos: 'massa crua fermento pão cru pizza', st: 'nao', x: 'Cresce dentro do estômago e produz álcool. Pode inchar a barriga.' },
  { nome: 'Gordura, pele e bacon', termos: 'gordura pele bacon torresmo picanha frango frito fritura', st: 'nao', x: 'Gordura em excesso pode dar pancreatite, uma inflamação muito dolorida e perigosa no idoso.' },
  { nome: 'Sal e salgadinhos', termos: 'sal salgadinho batata frita pipoca salgada', st: 'nao', x: 'Muito sal faz mal ao coração e aos rins, e pode intoxicar.' },
  // REVISAR VET: leite (intolerância à lactose comum em cão adulto; não confirmado com fonte primária na pesquisa).
  { nome: 'Leite', termos: 'leite de vaca', st: 'nao', x: 'Muitos cães adultos não digerem bem a lactose: diarreia e gases. Não faz falta na dieta.' },
  { nome: 'Doces, bolos e sorvete', termos: 'doce bolo sorvete pudim açúcar biscoito recheado', st: 'nao', x: 'Açúcar e gordura à toa, e podem ter chocolate, xilitol ou passas escondidos.' },
  // ---- PODE, COM CUIDADO ----
  { nome: 'Ovo cozido', termos: 'ovo cozido gema clara', st: 'cuidado', x: 'Bem cozido, picado, sem sal e sem óleo. Pouquinho, como petisco ou misturado na ração.' },
  { nome: 'Abóbora cozida', termos: 'abóbora moranga jerimum', st: 'cuidado', x: 'Cozida e amassada, sem tempero e sem sal. Pouquinho; ajuda na papinha.' },
  { nome: 'Cenoura', termos: 'cenoura', st: 'cuidado', x: 'Cozida (melhor para quem tem dente fraco) ou crua ralada. Sem tempero, pouquinho.' },
  { nome: 'Arroz cozido', termos: 'arroz branco', st: 'cuidado', x: 'Arroz branco cozido só em água, sem sal, sem alho e sem óleo. Pouquinho.' },
  { nome: 'Frango cozido', termos: 'frango peito galinha', st: 'cuidado', x: 'Peito cozido em água, sem pele, sem osso, sem tempero e sem sal, desfiado. Pouquinho.' },
  { nome: 'Batata-doce cozida', termos: 'batata doce', st: 'cuidado', x: 'Cozida, sem casca, sem tempero e sem sal. Pouquinho. Batata inglesa só cozida, nunca crua ou frita.' },
  { nome: 'Banana', termos: 'banana', st: 'cuidado', x: 'Rodelinhas, como petisco. Tem bastante açúcar: pouquinho, e com cuidado no diabético.' },
  { nome: 'Maçã sem semente', termos: 'maçã', st: 'cuidado', x: 'Em pedacinhos, sem sementes e sem o miolo. Pouquinho.' },
  { nome: 'Pera sem semente', termos: 'pera', st: 'cuidado', x: 'Em pedacinhos, sem sementes e sem o miolo. Pouquinho.' },
  { nome: 'Melancia sem semente', termos: 'melancia', st: 'cuidado', x: 'Sem sementes e sem casca, em cubinhos. Pouquinho; refresca no calor.' },
  { nome: 'Mamão sem semente', termos: 'mamão papaia', st: 'cuidado', x: 'Sem sementes e sem casca. Pouquinho, pode soltar o intestino.' },
  { nome: 'Pepino', termos: 'pepino', st: 'cuidado', x: 'Rodelinhas sem tempero. Pouquinho. Bom petisco leve.' },
  { nome: 'Abobrinha e chuchu cozidos', termos: 'abobrinha chuchu legumes', st: 'cuidado', x: 'Cozidos em água, sem sal e sem tempero. Pouquinho, na papinha.' },
  { nome: 'Carne magra cozida', termos: 'carne patinho músculo boi moída', st: 'cuidado', x: 'Cozida em água, sem gordura, sem sal e sem tempero. Pouquinho.' },
  { nome: 'Peixe cozido sem espinha', termos: 'peixe tilápia merluza sardinha atum', st: 'cuidado', x: 'Cozido, sem espinha, sem sal e sem tempero. Nunca cru. Enlatado só em água e sem sal, de vez em quando.' },
  // REVISAR VET: fígado (excesso de vitamina A; muito citado pelo público como "papinha").
  { nome: 'Fígado cozido', termos: 'fígado bife de fígado miúdo', st: 'cuidado', x: 'Cozido e sem tempero, em quantidade bem pequena e não todo dia: em excesso dá vitamina A demais.' },
  { nome: 'Iogurte natural sem açúcar', termos: 'iogurte coalhada', st: 'cuidado', x: 'Natural, sem açúcar e sem adoçante. Uma colherinha. Alguns cães não toleram: se der diarreia, pare.' },
  { nome: 'Pasta de amendoim', termos: 'pasta de amendoim manteiga de amendoim', st: 'cuidado', x: '**Só** a que não tem xilitol nem sal (leia o rótulo). Muito calórica: uma pontinha, boa para esconder comprimido.' },
  { nome: 'Aveia cozida', termos: 'aveia mingau', st: 'cuidado', x: 'Cozida em água, sem açúcar, sem leite e sem sal. Pouquinho.' },
  { nome: 'Brócolis', termos: 'brócolis couve-flor', st: 'cuidado', x: 'Cozido, sem tempero, em pedacinhos. Bem pouquinho: em excesso dá gases e irrita o estômago.' },
];
