// GERADO por ferramentas/gerar-dados.cjs a partir de racas.json. Não editar à mão.
window.FICHAS = {
 "srd-pequeno": {
  "id": "srd-pequeno",
  "nome": "Vira-lata porte pequeno",
  "curto": "vira-lata",
  "porte": "pequeno",
  "vive": 12,
  "idosoAos": 10,
  "gancho": "Até 85% dos cães pequenos têm lesão na válvula do coração aos 13 anos — e um dos primeiros sinais de que o coração está descompensando é a respiração acelerada enquanto ele dorme.",
  "doencas": [
   "Doença da válvula do coração (\"sopro\")",
   "Doença da gengiva e dos dentes",
   "Colapso de traqueia"
  ],
  "riscos": [
   "respiracao",
   "boca"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   },
   {
    "texto": "O {nome} tem mau hálito forte ou tártaro visível nos dentes?",
    "sinal": "boca",
    "chave": "boca",
    "doenca": "Doença da gengiva e dos dentes"
   }
  ]
 },
 "srd-medio": {
  "id": "srd-medio",
  "nome": "Vira-lata porte médio",
  "curto": "vira-lata",
  "porte": "médio",
  "vive": 12,
  "idosoAos": 9,
  "gancho": "Metade dos cães com mais de 10 anos vai ter câncer em algum momento, segundo a Associação Veterinária Americana. E artrose e rim estão logo atrás entre os problemas do cão médio idoso.",
  "doencas": [
   "Câncer",
   "Artrose (dor nas articulações)",
   "Doença renal crônica"
  ],
  "riscos": [
   "caroco",
   "patas"
  ],
  "perguntas": [
   {
    "texto": "Você encontrou algum caroço novo no {nome} nos últimos meses, ou ele está emagrecendo sem motivo?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer"
   },
   {
    "texto": "O {nome} anda trocando o dia pela noite ou fica parado olhando para a parede?",
    "sinal": "noite",
    "chave": "noite",
    "doenca": "Demência canina"
   }
  ]
 },
 "srd-grande": {
  "id": "srd-grande",
  "nome": "Vira-lata porte grande",
  "curto": "vira-lata",
  "porte": "grande",
  "vive": 12,
  "idosoAos": 9,
  "gancho": "Quando veterinários procuraram com um checklist, mais de 1 em cada 3 cães tinha sinais de artrose, e a maioria nunca tinha sido diagnosticada. Em cão grande, o primeiro sinal costuma ser demorar para levantar.",
  "doencas": [
   "Artrose (dor nas articulações)",
   "Rompimento do ligamento do joelho",
   "Câncer de osso"
  ],
  "riscos": [
   "patas",
   "caroco"
  ],
  "perguntas": [
   {
    "texto": "O {nome} está mancando de uma pata há mais de duas semanas, ou tem um inchaço duro perto de uma articulação?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer de osso"
   },
   {
    "texto": "O {nome} já teve episódios de fraqueza súbita com a gengiva pálida, que melhoraram sozinhos?",
    "sinal": "caroco",
    "chave": "gengiva",
    "doenca": "Câncer dos vasos sanguíneos (baço/coração)"
   }
  ]
 },
 "shih-tzu": {
  "id": "shih-tzu",
  "nome": "Shih Tzu",
  "curto": "Shih Tzu",
  "porte": "pequeno",
  "vive": 12.8,
  "idosoAos": 10,
  "gancho": "A doença mais diagnosticada no Shih Tzu é a da boca (cerca de 1 em cada 10 por ano), e ele tem quase 3 vezes mais chance de doença na válvula do coração que um vira-lata.",
  "doencas": [
   "Doença da gengiva e dos dentes",
   "Doença da válvula do coração (\"sopro\")",
   "Falta de ar do focinho curto"
  ],
  "riscos": [
   "boca",
   "respiracao"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tem mau hálito forte ou tártaro visível nos dentes?",
    "sinal": "boca",
    "chave": "boca",
    "doenca": "Doença da gengiva e dos dentes"
   },
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   }
  ]
 },
 "yorkshire": {
  "id": "yorkshire",
  "nome": "Yorkshire Terrier",
  "curto": "Yorkshire",
  "porte": "pequeno",
  "vive": 13.3,
  "idosoAos": 10,
  "gancho": "98% dos Yorkshires já tinham início de doença na gengiva antes de completar 1 ano — e doença dos rins está entre as duas causas de morte mais registradas da raça.",
  "doencas": [
   "Doença da gengiva e dos dentes",
   "Colapso de traqueia",
   "Doença renal crônica"
  ],
  "riscos": [
   "boca",
   "respiracao",
   "agua"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tem mau hálito forte ou tártaro visível nos dentes?",
    "sinal": "boca",
    "chave": "boca",
    "doenca": "Doença da gengiva e dos dentes"
   },
   {
    "texto": "O {nome} tem uma tosse que parece um \"grasnado de ganso\", principalmente quando fica agitado ou puxa a coleira?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Colapso de traqueia"
   }
  ]
 },
 "lulu": {
  "id": "lulu",
  "nome": "Spitz Alemão Anão",
  "curto": "Lulu da Pomerânia",
  "porte": "pequeno",
  "vive": 12.2,
  "idosoAos": 9,
  "gancho": "O Lulu está entre as raças em que a traqueia pode \"murchar\" com a idade — e o primeiro sinal é uma tosse que parece grasnado de ganso, que muita gente acha que é engasgo.",
  "doencas": [
   "Colapso de traqueia",
   "Doença da válvula do coração (\"sopro\")",
   "Doença da gengiva e dos dentes"
  ],
  "riscos": [
   "respiracao",
   "boca"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tem uma tosse que parece um \"grasnado de ganso\", principalmente quando fica agitado ou puxa a coleira?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Colapso de traqueia"
   },
   {
    "texto": "O {nome} tem mau hálito forte ou tártaro visível nos dentes?",
    "sinal": "boca",
    "chave": "boca",
    "doenca": "Doença da gengiva e dos dentes"
   }
  ]
 },
 "lhasa": {
  "id": "lhasa",
  "nome": "Lhasa Apso",
  "curto": "Lhasa Apso",
  "porte": "pequeno",
  "vive": 14,
  "idosoAos": 11,
  "gancho": "O Lhasa é uma das raças que mais vivem (mediana de 14 anos) — e, justamente por isso, chega à idade em que 2 de cada 3 cães mostram algum sinal de demência.",
  "doencas": [
   "Doença da gengiva e dos dentes",
   "Pedra na bexiga",
   "Doença renal crônica"
  ],
  "riscos": [
   "boca",
   "agua"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tem mau hálito forte ou tártaro visível nos dentes?",
    "sinal": "boca",
    "chave": "boca",
    "doenca": "Doença da gengiva e dos dentes"
   },
   {
    "texto": "O {nome} anda trocando o dia pela noite ou fica parado olhando para a parede?",
    "sinal": "noite",
    "chave": "noite",
    "doenca": "Demência canina"
   }
  ]
 },
 "pinscher": {
  "id": "pinscher",
  "nome": "Pinscher",
  "curto": "Pinscher",
  "porte": "pequeno",
  "vive": 13.7,
  "idosoAos": 10,
  "gancho": "Na maior pesquisa de causas de morte da América do Norte, o Pinscher está entre as 5 raças que mais morrem de doença neurológica e de acidente.",
  "doencas": [
   "Doença neurológica (coluna/cérebro)",
   "Doença da válvula do coração (\"sopro\")",
   "Doença da gengiva e dos dentes"
  ],
  "riscos": [
   "patas",
   "respiracao",
   "boca"
  ],
  "perguntas": [
   {
    "texto": "O {nome} já gritou ao ser pego no colo ou passou a recusar subir no sofá/escada?",
    "sinal": "patas",
    "chave": "coluna",
    "doenca": "Doença neurológica (coluna/cérebro)"
   },
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   }
  ]
 },
 "maltes": {
  "id": "maltes",
  "nome": "Maltês",
  "curto": "Maltês",
  "porte": "pequeno",
  "vive": 13.1,
  "idosoAos": 10,
  "gancho": "O Maltês está entre as 5 raças que mais morrem do coração — e o primeiro sinal costuma ser tosse à noite ou respiração acelerada enquanto dorme.",
  "doencas": [
   "Doença da válvula do coração (\"sopro\")",
   "Doença da gengiva e dos dentes",
   "Colapso de traqueia"
  ],
  "riscos": [
   "respiracao",
   "boca"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   },
   {
    "texto": "O {nome} tem mau hálito forte ou tártaro visível nos dentes?",
    "sinal": "boca",
    "chave": "boca",
    "doenca": "Doença da gengiva e dos dentes"
   }
  ]
 },
 "poodle": {
  "id": "poodle",
  "nome": "Poodle",
  "curto": "Poodle",
  "porte": "pequeno",
  "vive": 14,
  "idosoAos": 11,
  "gancho": "O Poodle toy tem quase 4 vezes mais chance de doença na gengiva que outros cães, e o Poodle está entre as raças de alto risco para diabetes.",
  "doencas": [
   "Doença da gengiva e dos dentes",
   "Doença da válvula do coração (\"sopro\")",
   "Diabetes"
  ],
  "riscos": [
   "boca",
   "respiracao",
   "agua"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tem mau hálito forte ou tártaro visível nos dentes?",
    "sinal": "boca",
    "chave": "boca",
    "doenca": "Doença da gengiva e dos dentes"
   },
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   }
  ]
 },
 "dachshund": {
  "id": "dachshund",
  "nome": "Dachshund",
  "curto": "Salsicha (Dachshund)",
  "porte": "pequeno",
  "vive": 13.2,
  "idosoAos": 10,
  "gancho": "Dachshunds têm risco 10 a 12 vezes maior de hérnia de disco que outras raças, e cerca de 1 em cada 5 terá sinais ao longo da vida — o primeiro sinal costuma ser gritar ao ser pego no colo ou recusar o sofá.",
  "doencas": [
   "Hérnia de disco",
   "Doença da válvula do coração (\"sopro\")",
   "Doença da gengiva e dos dentes"
  ],
  "riscos": [
   "patas",
   "respiracao"
  ],
  "perguntas": [
   {
    "texto": "O {nome} já gritou ao ser pego no colo ou passou a recusar subir no sofá/escada?",
    "sinal": "patas",
    "chave": "coluna",
    "doenca": "Hérnia de disco"
   },
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   }
  ]
 },
 "chihuahua": {
  "id": "chihuahua",
  "nome": "Chihuahua",
  "curto": "Chihuahua",
  "porte": "pequeno",
  "vive": 11.8,
  "idosoAos": 9,
  "gancho": "O coração é a principal causa de morte do Chihuahua, e ele tem 6 vezes mais chance de doença na válvula do coração que um vira-lata.",
  "doencas": [
   "Doença da válvula do coração (\"sopro\")",
   "Doença da gengiva e dos dentes",
   "Colapso de traqueia"
  ],
  "riscos": [
   "respiracao",
   "boca"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   },
   {
    "texto": "O {nome} tem mau hálito forte ou tártaro visível nos dentes?",
    "sinal": "boca",
    "chave": "boca",
    "doenca": "Doença da gengiva e dos dentes"
   }
  ]
 },
 "cavalier": {
  "id": "cavalier",
  "nome": "Cavalier King Charles Spaniel",
  "curto": "Cavalier",
  "porte": "pequeno",
  "vive": 11.8,
  "idosoAos": 9,
  "gancho": "Cavaliers têm 47 vezes mais chance de doença na válvula do coração que vira-latas — e cerca de 4 em cada 10 morrem do coração.",
  "doencas": [
   "Doença da válvula do coração (\"sopro\")",
   "Cavidades na medula (\"cérebro maior que o crânio\")"
  ],
  "riscos": [
   "respiracao",
   "patas"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   },
   {
    "texto": "O {nome} coça o pescoço no ar, sem encostar a pata?",
    "sinal": "patas",
    "chave": "coluna",
    "doenca": "Cavidades na medula (\"cérebro maior que o crânio\")"
   }
  ]
 },
 "jack-russell": {
  "id": "jack-russell",
  "nome": "Jack Russell Terrier",
  "curto": "Jack Russell",
  "porte": "pequeno",
  "vive": 13.3,
  "idosoAos": 10,
  "gancho": "O Jack Russell é a raça de maior expectativa de vida entre as mais comuns do Reino Unido — e está entre as 5 que mais morrem de acidente.",
  "doencas": [
   "Câncer",
   "Doença da gengiva e dos dentes"
  ],
  "riscos": [
   "caroco"
  ],
  "perguntas": [
   {
    "texto": "Você encontrou algum caroço novo no {nome} nos últimos meses, ou ele está emagrecendo sem motivo?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer"
   },
   {
    "texto": "O {nome} tem mau hálito forte ou tártaro visível nos dentes?",
    "sinal": "boca",
    "chave": "boca",
    "doenca": "Doença da gengiva e dos dentes"
   }
  ]
 },
 "schnauzer": {
  "id": "schnauzer",
  "nome": "Schnauzer miniatura",
  "curto": "Schnauzer",
  "porte": "pequeno",
  "vive": 13.3,
  "idosoAos": 10,
  "gancho": "Mais de 3 em cada 4 Schnauzers miniatura têm gordura alta no sangue aos 10 anos — e os com nível muito alto têm 4,5 vezes mais chance de exame compatível com pancreatite.",
  "doencas": [
   "Inflamação do pâncreas",
   "Diabetes",
   "Pedra na bexiga"
  ],
  "riscos": [
   "apetite",
   "agua"
  ],
  "perguntas": [
   {
    "texto": "O {nome} já vomitou ou ficou na \"posição de reza\" depois de comer churrasco ou restos de comida?",
    "sinal": "apetite",
    "chave": "apetite",
    "doenca": "Inflamação do pâncreas"
   },
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   }
  ]
 },
 "pug": {
  "id": "pug",
  "nome": "Pug",
  "curto": "Pug",
  "porte": "pequeno",
  "vive": 11.6,
  "idosoAos": 9,
  "gancho": "No Reino Unido, a expectativa de vida de um pug ao nascer é de só 7,7 anos — e quase 1 em cada 3 eutanásias de pugs é por doença neurológica.",
  "doencas": [
   "Falta de ar do focinho curto",
   "Fraqueza progressiva das patas de trás",
   "Convulsões / encefalite do Pug"
  ],
  "riscos": [
   "respiracao",
   "patas",
   "noite"
  ],
  "perguntas": [
   {
    "texto": "O {nome} ronca alto, para de respirar enquanto dorme ou cansa em poucos minutos de passeio?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Falta de ar do focinho curto"
   },
   {
    "texto": "O {nome} está com as patas de trás fracas ou perdendo xixi sem perceber?",
    "sinal": "patas",
    "chave": "coluna",
    "doenca": "Fraqueza progressiva das patas de trás"
   }
  ]
 },
 "bulldog-frances": {
  "id": "bulldog-frances",
  "nome": "Bulldog Francês",
  "curto": "Bulldog Francês",
  "porte": "pequeno",
  "vive": 9.8,
  "idosoAos": 7,
  "gancho": "Buldogues franceses têm 31 vezes mais chance de síndrome respiratória do focinho curto que outras raças — ronco alto e cansaço no passeio não são \"charme\", são sinal.",
  "doencas": [
   "Falta de ar do focinho curto",
   "Hérnia de disco"
  ],
  "riscos": [
   "respiracao",
   "patas"
  ],
  "perguntas": [
   {
    "texto": "O {nome} ronca alto, para de respirar enquanto dorme ou cansa em poucos minutos de passeio?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Falta de ar do focinho curto"
   },
   {
    "texto": "O {nome} já gritou ao ser pego no colo ou passou a recusar subir no sofá/escada?",
    "sinal": "patas",
    "chave": "coluna",
    "doenca": "Hérnia de disco"
   }
  ]
 },
 "bulldog-ingles": {
  "id": "bulldog-ingles",
  "nome": "Bulldog Inglês",
  "curto": "Bulldog Inglês",
  "porte": "médio",
  "vive": 9.8,
  "idosoAos": 7,
  "gancho": "Metade dos buldogues ingleses morre antes dos 7,2 anos, e eles têm cerca de 14 vezes mais chance de insolação que um labrador — no calor do Brasil, isso pesa.",
  "doencas": [
   "Falta de ar do focinho curto",
   "Doença do coração",
   "Câncer"
  ],
  "riscos": [
   "respiracao"
  ],
  "perguntas": [
   {
    "texto": "O {nome} ronca alto, para de respirar enquanto dorme ou cansa em poucos minutos de passeio?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Falta de ar do focinho curto"
   },
   {
    "texto": "Você encontrou algum caroço novo no {nome} nos últimos meses, ou ele está emagrecendo sem motivo?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer"
   }
  ]
 },
 "beagle": {
  "id": "beagle",
  "nome": "Beagle",
  "curto": "Beagle",
  "porte": "médio",
  "vive": 12.5,
  "idosoAos": 9,
  "gancho": "Câncer é a principal causa de morte do Beagle — cerca de 1 em cada 5 mortes, sem contar os \"caroços\" que respondem por mais 1 em cada 8.",
  "doencas": [
   "Câncer",
   "Convulsões",
   "Hérnia de disco"
  ],
  "riscos": [
   "caroco",
   "noite"
  ],
  "perguntas": [
   {
    "texto": "Você encontrou algum caroço novo no {nome} nos últimos meses, ou ele está emagrecendo sem motivo?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer"
   },
   {
    "texto": "O {nome} já teve alguma convulsão ou episódio de tremor/\"desligamento\"?",
    "sinal": "noite",
    "chave": "noite",
    "doenca": "Convulsões"
   }
  ]
 },
 "cocker": {
  "id": "cocker",
  "nome": "Cocker Spaniel",
  "curto": "Cocker",
  "porte": "médio",
  "vive": 13.3,
  "idosoAos": 10,
  "gancho": "Câncer e caroços são as principais causas de morte do Cocker — e o Cocker está entre as raças mais predispostas a uma anemia que destrói o próprio sangue, cujo primeiro sinal é a gengiva pálida.",
  "doencas": [
   "Câncer",
   "Anemia em que o corpo destrói o próprio sangue",
   "Doença da válvula do coração (\"sopro\")"
  ],
  "riscos": [
   "caroco"
  ],
  "perguntas": [
   {
    "texto": "Você encontrou algum caroço novo no {nome} nos últimos meses, ou ele está emagrecendo sem motivo?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer"
   },
   {
    "texto": "A gengiva do {nome} já ficou pálida ou amarelada, junto com fraqueza?",
    "sinal": "caroco",
    "chave": "gengiva",
    "doenca": "Anemia em que o corpo destrói o próprio sangue"
   }
  ]
 },
 "border-collie": {
  "id": "border-collie",
  "nome": "Border Collie",
  "curto": "Border Collie",
  "porte": "médio",
  "vive": 13.1,
  "idosoAos": 10,
  "gancho": "Border Collies têm o dobro de chance de doença na válvula do coração que vira-latas, e a epilepsia da raça costuma ser das mais difíceis de controlar.",
  "doencas": [
   "Convulsões",
   "Doença da válvula do coração (\"sopro\")",
   "Artrose (dor nas articulações)"
  ],
  "riscos": [
   "noite",
   "respiracao",
   "patas"
  ],
  "perguntas": [
   {
    "texto": "O {nome} já teve alguma convulsão ou episódio de tremor/\"desligamento\"?",
    "sinal": "noite",
    "chave": "noite",
    "doenca": "Convulsões"
   },
   {
    "texto": "O {nome} tosse à noite ou fica com a respiração acelerada enquanto dorme?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Doença da válvula do coração (\"sopro\")"
   }
  ]
 },
 "pitbull": {
  "id": "pitbull",
  "nome": "Pit Bull / American Staffordshire Terrier",
  "curto": "Pit Bull",
  "porte": "médio",
  "vive": 12.5,
  "idosoAos": 9,
  "gancho": "Na maior pesquisa de mortalidade da América do Norte, o AmStaff está entre as 5 raças que mais morrem de doença infecciosa e de acidente — causas que vacina, antiparasitário e guia evitam.",
  "doencas": [
   "Rompimento do ligamento do joelho",
   "Câncer de pele mais comum do cão",
   "Convulsões"
  ],
  "riscos": [
   "patas",
   "caroco",
   "noite"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tem algum caroço na pele que às vezes incha e depois diminui?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer de pele mais comum do cão"
   },
   {
    "texto": "O {nome} já teve alguma convulsão ou episódio de tremor/\"desligamento\"?",
    "sinal": "noite",
    "chave": "noite",
    "doenca": "Convulsões"
   }
  ]
 },
 "golden": {
  "id": "golden",
  "nome": "Golden Retriever",
  "curto": "Golden",
  "porte": "grande",
  "vive": 13.2,
  "idosoAos": 10,
  "gancho": "Num estudo com 652 Goldens, 65% morreram de câncer — e o mais comum, o hemangiossarcoma, costuma dar como primeiro sinal uma fraqueza súbita com a gengiva pálida.",
  "doencas": [
   "Câncer dos vasos sanguíneos (baço/coração)",
   "Câncer dos gânglios",
   "Câncer de pele mais comum do cão"
  ],
  "riscos": [
   "caroco"
  ],
  "perguntas": [
   {
    "texto": "O {nome} já teve episódios de fraqueza súbita com a gengiva pálida, que melhoraram sozinhos?",
    "sinal": "caroco",
    "chave": "gengiva",
    "doenca": "Câncer dos vasos sanguíneos (baço/coração)"
   },
   {
    "texto": "Você já sentiu bolinhas firmes embaixo do queixo ou atrás dos joelhos do {nome}?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer dos gânglios"
   }
  ]
 },
 "labrador": {
  "id": "labrador",
  "nome": "Labrador Retriever",
  "curto": "Labrador",
  "porte": "grande",
  "vive": 13.1,
  "idosoAos": 10,
  "gancho": "Artrose, câncer e rompimento do ligamento do joelho são os problemas que mais pesam no Labrador idoso. O primeiro sinal costuma ser demorar para levantar ou hesitar antes de subir no carro.",
  "doencas": [
   "Artrose (dor nas articulações)",
   "Câncer",
   "Rompimento do ligamento do joelho"
  ],
  "riscos": [
   "patas",
   "caroco"
  ],
  "perguntas": [
   {
    "texto": "Você encontrou algum caroço novo no {nome} nos últimos meses, ou ele está emagrecendo sem motivo?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer"
   },
   {
    "texto": "O latido do {nome} mudou ou ele faz barulho ao respirar no passeio?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Paralisia da laringe do idoso"
   }
  ]
 },
 "pastor-alemao": {
  "id": "pastor-alemao",
  "nome": "Pastor Alemão",
  "curto": "Pastor Alemão",
  "porte": "grande",
  "vive": 11.3,
  "idosoAos": 8,
  "gancho": "Quase 1 em cada 3 Pastores Alemães morre por problema de articulação ou por não conseguir mais ficar de pé — e o primeiro sinal costuma ser demorar para levantar ou arrastar as unhas das patas de trás.",
  "doencas": [
   "Artrose (dor nas articulações)",
   "Paralisia progressiva das patas de trás",
   "Câncer dos vasos sanguíneos (baço/coração)"
  ],
  "riscos": [
   "patas",
   "caroco"
  ],
  "perguntas": [
   {
    "texto": "As unhas das patas de trás do {nome} estão gastas na ponta, ou ele cambaleia/cruza as patas ao andar?",
    "sinal": "patas",
    "chave": "coluna",
    "doenca": "Paralisia progressiva das patas de trás"
   },
   {
    "texto": "O {nome} já teve episódios de fraqueza súbita com a gengiva pálida, que melhoraram sozinhos?",
    "sinal": "caroco",
    "chave": "gengiva",
    "doenca": "Câncer dos vasos sanguíneos (baço/coração)"
   }
  ]
 },
 "rottweiler": {
  "id": "rottweiler",
  "nome": "Rottweiler",
  "curto": "Rottweiler",
  "porte": "grande",
  "vive": 10.6,
  "idosoAos": 8,
  "gancho": "1 em cada 3 Rottweilers morre de câncer, e eles têm cerca de 27 vezes mais risco de câncer ósseo que vira-latas — o primeiro sinal costuma ser mancar de uma pata e não melhorar.",
  "doencas": [
   "Câncer de osso",
   "Rompimento do ligamento do joelho",
   "Câncer dos gânglios"
  ],
  "riscos": [
   "caroco",
   "patas"
  ],
  "perguntas": [
   {
    "texto": "O {nome} está mancando de uma pata há mais de duas semanas, ou tem um inchaço duro perto de uma articulação?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer de osso"
   },
   {
    "texto": "O {nome} come muito rápido ou faz exercício logo depois de comer?",
    "sinal": "apetite",
    "chave": "apetite",
    "doenca": "Torção do estômago"
   }
  ]
 },
 "boxer": {
  "id": "boxer",
  "nome": "Boxer",
  "curto": "Boxer",
  "porte": "grande",
  "vive": 11.3,
  "idosoAos": 8,
  "gancho": "Quase metade dos Boxers da maior pesquisa de mortalidade da América do Norte morreu de câncer — e caroço que incha e desincha na pele do Boxer precisa de punção, não de espera.",
  "doencas": [
   "Câncer de pele mais comum do cão",
   "Outros cânceres (linfoma, tumor cerebral)",
   "Arritmia do Boxer (risco de morte súbita)"
  ],
  "riscos": [
   "caroco",
   "respiracao"
  ],
  "perguntas": [
   {
    "texto": "O {nome} tem algum caroço na pele que às vezes incha e depois diminui?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer de pele mais comum do cão"
   },
   {
    "texto": "O {nome} já desmaiou ou caiu de fraqueza durante brincadeira ou passeio?",
    "sinal": "respiracao",
    "chave": "respiracao",
    "doenca": "Arritmia do Boxer (risco de morte súbita)"
   }
  ]
 },
 "husky": {
  "id": "husky",
  "nome": "Husky Siberiano",
  "curto": "Husky Siberiano",
  "porte": "grande",
  "vive": 11.9,
  "idosoAos": 9,
  "gancho": "Sem número forte específico da raça Gancho possível e defensável: \"O Husky vive em média 11,9 anos — e os olhos estão entre os pontos fracos da raça: olho esbranquiçado não é só 'idade'.\"",
  "doencas": [
   "Câncer",
   "Artrose (dor nas articulações)"
  ],
  "riscos": [
   "caroco"
  ],
  "perguntas": [
   {
    "texto": "Você encontrou algum caroço novo no {nome} nos últimos meses, ou ele está emagrecendo sem motivo?",
    "sinal": "caroco",
    "chave": "caroco",
    "doenca": "Câncer"
   }
  ]
 },
 "dalmata": {
  "id": "dalmata",
  "nome": "Dálmata",
  "curto": "Dálmata",
  "porte": "grande",
  "vive": 13.2,
  "idosoAos": 10,
  "gancho": "Quase todo Dálmata nasce com um defeito no transporte do ácido úrico que favorece pedra na bexiga — e a raça está entre as 5 que mais morrem de doença urinária.",
  "doencas": [
   "Pedra na bexiga",
   "Artrose (dor nas articulações)"
  ],
  "riscos": [
   "agua",
   "caroco"
  ],
  "perguntas": []
 }
};
