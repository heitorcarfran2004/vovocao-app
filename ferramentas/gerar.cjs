// Gera app/dados/racas-completo.js a partir de pesquisa/cao-idoso/racas/racas.json
//   node app/ferramentas/gerar.cjs        (rodar de dentro de funis/cao-idoso-quiz)
// Depois que o veterinário revisar o racas.json, é só rodar de novo.
// Os ids são os mesmos do quiz (dados/racas-quiz.js → window.FICHAS), então perfil.fichaId serve para os dois.
const fs = require('fs'), path = require('path');
const APP = path.join(__dirname, '..');
const fonte = path.join(APP, '..', '..', '..', 'pesquisa', 'cao-idoso', 'racas', 'racas.json');
const racas = JSON.parse(fs.readFileSync(fonte, 'utf8'));

// mesmo mapeamento de ferramentas/gerar-dados.cjs do quiz
const IDS = [
  [/^SRD.*pequeno/i, 'srd-pequeno'], [/^SRD.*médio/i, 'srd-medio'], [/^SRD.*grande/i, 'srd-grande'],
  [/^Shih/i, 'shih-tzu'], [/^Yorkshire/i, 'yorkshire'], [/^Spitz/i, 'lulu'], [/^Lhasa/i, 'lhasa'],
  [/^Pinscher/i, 'pinscher'], [/^Maltês/i, 'maltes'], [/^Poodle/i, 'poodle'], [/^Dachshund/i, 'dachshund'],
  [/^Chihuahua/i, 'chihuahua'], [/^Cavalier/i, 'cavalier'], [/^Jack/i, 'jack-russell'], [/^Schnauzer/i, 'schnauzer'],
  [/^Pug/i, 'pug'], [/^Bulldog Francês/i, 'bulldog-frances'], [/^Bulldog Inglês/i, 'bulldog-ingles'], [/^Beagle/i, 'beagle'],
  [/^Cocker/i, 'cocker'], [/^Border/i, 'border-collie'], [/^Pit/i, 'pitbull'], [/^Golden/i, 'golden'],
  [/^Labrador/i, 'labrador'], [/^Pastor/i, 'pastor-alemao'], [/^Rottweiler/i, 'rottweiler'], [/^Boxer/i, 'boxer'],
  [/^Husky/i, 'husky'], [/^Dálmata/i, 'dalmata'],
];

// cada doença aponta para um dos 7 sinais do radar (ou 'outro')
function sinalDe(nome) {
  const n = nome.toLowerCase();
  if (/gengiva/.test(n)) return 'boca';
  if (/vasos sangu|anemia/.test(n)) return 'caroco';
  if (/câncer|gânglios|tumor/.test(n)) return 'caroco';
  if (/válvula|coração|focinho|traqueia|laringe|arritmia|insola/.test(n)) return 'respiracao';
  if (/renal|diabetes|cortisol|bexiga|tireoide/.test(n)) return 'agua';
  if (/hérnia|neurológica|medula|patas de trás|artrose|ligamento|osso/.test(n)) return 'patas';
  if (/demência|convuls|cérebro|fígado|desvio de sangue/.test(n)) return 'noite';
  if (/pâncreas|torção/.test(n)) return 'apetite';
  return 'outro';
}

// O app vende "mais anos e anos bons", não emagrecimento: a obesidade sai da lista da raça
// e as frases de "manter magro" viram "manter no peso ideal".
const FORA = /obesidade/i;
const suaviza = (t) => String(t || '')
  .replace(/Labradores magros/g, 'Labradores no peso ideal')
  .replace(/Peso magro/g, 'Peso ideal')
  .replace(/manter (o cão |ele )?magro/gi, 'manter no peso ideal')
  .replace(/mantê-lo magro/gi, 'mantê-lo no peso ideal');

const out = {};
for (const r of racas) {
  const par = IDS.find(([re]) => re.test(r.raca));
  if (!par) { console.warn('sem id:', r.raca); continue; }
  const id = par[1];
  out[id] = {
    id,
    raca: r.raca,
    porte: r.porte === 'médio' ? 'medio' : r.porte,
    vive: r.expectativa_anos,
    fonteVive: r.fonte_expectativa,
    idosoAos: r.senior_a_partir,
    causaMorte: r.causa_morte_comum,
    doencas: r.doencas.filter(d => !FORA.test(d.nome)).map(d => ({
      nome: d.nome,
      tecnico: d.tecnico,
      sinal: sinalDe(d.nome),
      frequencia: d.frequencia,
      idadeInicio: d.idade_inicio,
      emCasa: d.sinal_em_casa,
      prevencao: suaviza(d.prevencao_em_casa),
      exame: d.exame,
    })),
    fontes: (r.fontes || []).map(f => ({ titulo: f.titulo, url: f.url })),
  };
}

const destino = path.join(APP, 'dados', 'racas-completo.js');
fs.writeFileSync(destino,
  '// GERADO por app/ferramentas/gerar.cjs a partir de pesquisa/cao-idoso/racas/racas.json. Não editar à mão.\n' +
  '// REVISAR VET: todo o conteúdo vem do racas.json (pesquisa); corrigir lá e rodar o gerador de novo.\n' +
  'window.RACAS_COMPLETO = ' + JSON.stringify(out, null, 1) + ';\n');
console.log('ok:', Object.keys(out).length, 'raças →', path.relative(process.cwd(), destino));
