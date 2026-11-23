// Tira os prints das telas principais a 390x844 num Chrome headless (não usa o Chrome da porta 9222).
//   node app/ferramentas/prints.cjs            (com o servidor do quiz rodando: node servidor.cjs)
//   node app/ferramentas/prints.cjs hoje sinais (só algumas telas)
// Saída: app/prints/*.png. Também roda o caminho "perfil vindo do quiz" (Pinscher fêmea) e lista erros do console.
const path = require('path');
const { chromium } = require('C:/Users/thorz/.dev-browser/node_modules/playwright-core');
const BASE = (process.env.URL || 'http://localhost:4271') + '/app/index.html';
const SAIDA = path.join(__dirname, '..', 'prints');
const so = process.argv.slice(2);

const TELAS = [
  ['01-hoje', 'hoje'], ['01c-plano', 'plano'], ['06b-o-que-muda', 'rotina/alimentacao/o-que-muda'], ['16b-boca', 'rotina/prevencao/boca'], ['02-checkup', 'checkup'], ['03-checkup-pergunta', 'checkup/fazer'], ['05-rotina', 'rotina'],
  ['06-mobilidade', 'rotina/mobilidade'], ['07-exercicios', 'rotina/mobilidade/exercicios'], ['08-guiado', 'fazer/ex-levantar'],
  ['09-casa', 'rotina/mobilidade/casa'], ['10-dor', 'rotina/mobilidade/dor'], ['11-pode-nao-pode', 'rotina/alimentacao/pode-nao-pode'],
  ['12-parou-de-comer', 'rotina/alimentacao/parou-de-comer'], ['13-remedios', 'rotina/remedios/meus-remedios'], ['14-gaveta', 'rotina/remedios/gaveta'],
  ['15-suplementos', 'rotina/remedios/suplementos'], ['16-checkup-6m', 'rotina/prevencao/checkup'], ['17-doencas-raca', 'rotina/prevencao/doencas-raca'],
  ['18-carocos', 'rotina/prevencao/carocos'], ['19-mente-faro', 'rotina/mente/faro'], ['20-madrugada', 'rotina/mente/madrugada'],
  ['21-contar', 'contar'], ['22-sinais', 'sinais'], ['23-sinal', 'sinais/tremendo'], ['24-emergencia', 'emergencia'], ['25-perfil', 'perfil'],
  ['26-resumo', 'resumo'], ['27-dias-bons', 'dias-bons'], ['28-avaliar', 'dias-bons/avaliar'], ['29-assistente', 'assistente'],
  ['30-trocar', 'perfil/trocar'], ['31-diario', 'diario'], ['32-editar', 'perfil/editar'],
];

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const erros = [];
  const nova = async (perfil) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, locale: 'pt-BR' });
    if (perfil) await ctx.addInitScript((p) => { if (!localStorage.getItem('maisanos:perfil')) localStorage.setItem('maisanos:perfil', p); }, JSON.stringify(perfil));
    const page = await ctx.newPage();
    page.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()); });
    page.on('pageerror', (e) => erros.push('pageerror: ' + e.message));
    return { ctx, page };
  };
  // no print de página inteira, as barras fixas vão para o fim (no celular elas ficam presas embaixo)
  const CSS = '.moldura{padding-bottom:0!important}.aviso-fixo,.abas{position:relative!important;transform:none!important;left:auto!important;bottom:auto!important;width:100%!important}';
  const ir = async (page, rota) => { await page.goto(BASE + '#/' + rota); await page.addStyleTag({ content: CSS }); await page.waitForTimeout(rota === 'hoje' ? 900 : 700); };

  // 1) demo (sem perfil)
  const { ctx, page } = await nova(null);
  for (const [nome, rota] of TELAS) {
    if (so.length && !so.some((s) => nome.includes(s))) continue;
    await ir(page, rota);
    await page.screenshot({ path: path.join(SAIDA, nome + '.png'), fullPage: true });
  }
  // check-up completo → resultado
  if (!so.length || so.some((s) => 'resultado'.includes(s))) {
    await ir(page, 'checkup/fazer');
    for (let i = 0; i < 12; i++) {
      const ops = await page.$$('.op'); if (!ops.length) break;
      await ops[i % 3 === 0 ? 0 : 2].click(); await page.waitForTimeout(450);
      if (!(await page.url()).includes('fazer')) break;
    }
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(SAIDA, '04-checkup-resultado.png'), fullPage: true });
  }
  // marcar tarefa (animação) e a dobra da tela de Hoje
  await ir(page, 'hoje');
  const b = await page.$('.tarefa:not(.feita) .marcar'); if (b) { await b.click(); await page.waitForTimeout(250); await page.screenshot({ path: path.join(SAIDA, '01b-hoje-marcando.png') }); }
  await ctx.close();

  // 2) perfil vindo do quiz: Pinscher fêmea
  const pinscher = { versao: 1, criadoEm: new Date().toISOString(), origem: 'quiz', nome: 'Mel', sexo: 'f', fichaId: 'pinscher', racaRotulo: 'Pinscher', racaOrigem: 'botao',
    usaPorte: false, porte: 'pequeno', idade: 12, idadeHumana: 64,
    radar: { apetite: { st: 'observar', raca: false }, agua: { st: 'atencao', raca: false }, patas: { st: 'atencao', raca: true }, noite: { st: 'nao', raca: false }, boca: { st: 'atencao', raca: true }, respiracao: { st: 'atencao', raca: true }, caroco: { st: 'nao', raca: false } },
    acompanha: 5, respostas: { patas: 'Escorrega no piso | Demora pra levantar', consulta: 'Mais de 1 ano', remedio: 'Já dei' } };
  const q = await nova(pinscher);
  for (const [nome, rota] of [['40-quiz-hoje', 'hoje'], ['41-quiz-checkup', 'checkup'], ['42-quiz-pergunta-raca', 'checkup/fazer'], ['43-quiz-perfil', 'perfil'], ['44-quiz-doencas', 'rotina/prevencao/doencas-raca'], ['45-quiz-remedios', 'rotina/remedios'], ['46-quiz-sinal', 'sinais/nao-come'], ['47-quiz-plano', 'plano']]) {
    if (so.length && !so.some((s) => nome.includes(s))) continue;
    await ir(q.page, rota);
    if (rota === 'checkup/fazer') { const ops = await q.page.$$('.op'); for (let i = 0; i < 6; i++) { const o = await q.page.$$('.op'); await o[2].click(); await q.page.waitForTimeout(400); } }
    await q.page.screenshot({ path: path.join(SAIDA, nome + '.png'), fullPage: true });
  }
  const txt = await q.page.evaluate(() => document.body.innerText);
  console.log('Pinscher: tem "Mel":', txt.includes('Mel'), '| tem " ele " solto:', / ele /.test(txt));
  await q.ctx.close();
  await browser.close();
  console.log(erros.length ? 'ERROS NO CONSOLE:\n' + [...new Set(erros)].join('\n') : 'Sem erros no console.');
})();
