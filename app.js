// Vovocão: app de cuidados para o cão idoso (demo sem banco).
// Lê o cadastro do quiz em localStorage['maisanos:perfil'] (contrato em CONTRATO.md).
// Todo o estado do app fica no localStorage com prefixo "maisanos:". Navegação por hash (#/hoje, #/checkup...).
(function () {
'use strict';

// =====================================================================
// 1. Armazenamento, datas e utilidades
// =====================================================================
const PREF = 'maisanos:';
const LS = {
  get(k, d) { try { const v = localStorage.getItem(PREF + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(PREF + k, JSON.stringify(v)); return true; } catch (e) { toast('Não consegui salvar neste navegador.'); return false; } },
  del(k) { try { localStorage.removeItem(PREF + k); } catch (e) { /* sem armazenamento */ } },
};
// chaves do estado do app (são apagadas quando o cão do perfil muda)
const CHAVES_APP = ['app-dono', 'checkups', 'tarefas', 'remedios', 'doses', 'diario', 'carocos', 'qv', 'dias', 'checks', 'escalas', 'resp', 'consulta', 'perguntas', 'emerg', 'foto', 'lidas', 'jafaco'];

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MESES_L = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const SEMANA = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const SEM_CURTA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const dISO = (d = new Date()) => { const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); };
const hoje = () => dISO();
const dataDe = (iso) => new Date(iso + 'T12:00:00');
const somaDias = (iso, n) => { const d = dataDe(iso); d.setDate(d.getDate() + n); return dISO(d); };
const difDias = (a, b) => Math.round((dataDe(b) - dataDe(a)) / 864e5); // b - a, em dias
const fData = (iso) => { const d = dataDe(iso); return d.getDate() + ' ' + MESES[d.getMonth()]; };
const fDataAno = (iso) => { const d = dataDe(iso); return d.getDate() + ' ' + MESES[d.getMonth()] + ' ' + d.getFullYear(); };
const fDataLonga = (iso) => { const d = dataDe(iso); return SEMANA[d.getDay()] + ', ' + d.getDate() + ' de ' + MESES_L[d.getMonth()]; };
const agoraHM = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sem = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const uid = () => Math.random().toString(36).slice(2, 9);
const hash = (s) => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const clone = (o) => JSON.parse(JSON.stringify(o));
const num = (n, casas = 1) => String(Math.round(n * 10 ** casas) / 10 ** casas).replace('.', ',');
const plural = (n, um, varios) => n + ' ' + (n === 1 ? um : varios);

// =====================================================================
// 2. Perfil do cão (vem do quiz; sem perfil, carrega o demo)
// =====================================================================
const FICHAS = window.FICHAS || {};
const RCOMP = window.RACAS_COMPLETO || {};
const SINAIS7 = window.SINAIS7;
const SN = Object.fromEntries(SINAIS7.map((s) => [s.id, s]));
const CUIDADOS = window.CUIDADOS || [];
const CU = Object.fromEntries(CUIDADOS.map((c) => [c.id, c]));
const GUIA = window.SINAIS_GUIA || [];
const ORDEM = { atencao: 3, observar: 2, nao: 1 };
const ROT_ST = { atencao: ['Atenção', 't-at', 'pt-at'], observar: ['Observar', 't-ob', 'pt-ob'], nao: ['Não observado', 't-no', 'pt-no'] };

// as 11 raças dos botões do quiz (para "trocar para outro cão")
const RACAS_BOTOES = [['srd', 'Vira-lata (SRD)'], ['shih-tzu', 'Shih Tzu'], ['poodle', 'Poodle'], ['yorkshire', 'Yorkshire'], ['pinscher', 'Pinscher'],
  ['lulu', 'Lulu da Pomerânia'], ['lhasa', 'Lhasa Apso'], ['dachshund', 'Salsicha'], ['golden', 'Golden'], ['maltes', 'Maltês'], ['pug', 'Pug']];
const COM_FOTO = new Set(RACAS_BOTOES.map((r) => r[0]));
const DEMOS = { 'shih-tzu': ['Thor', 'm', 11], poodle: ['Mel', 'f', 13], yorkshire: ['Bidu', 'm', 12], pinscher: ['Pitucha', 'f', 14], lulu: ['Luna', 'f', 11],
  lhasa: ['Fred', 'm', 13], dachshund: ['Bolinha', 'm', 12], golden: ['Max', 'm', 11], maltes: ['Nina', 'f', 12], pug: ['Bob', 'm', 10], srd: ['Caramelo', 'm', 12] };

const normPorte = (p) => (p === 'médio' || p === 'medio' ? 'medio' : p === 'grande' ? 'grande' : p === 'pequeno' ? 'pequeno' : 'medio');
// idade humana: tabela por porte da AVMA (a mesma conta do quiz)
function idadeHumana(a, porte) {
  const passo = porte === 'grande' ? 6 : porte === 'medio' ? 5 : 4;
  if (a <= 1) return Math.round(15 * a); if (a <= 2) return Math.round(15 + 9 * (a - 1)); return Math.round(24 + (a - 2) * passo);
}
function radarDemo(f) { // 2 Atenção, 3 Observar, 2 Não observado
  const riscos = f.riscos || [];
  const r = {}; SINAIS7.forEach((s) => { r[s.id] = { st: 'observar', raca: false }; });
  const at = [riscos[0] || 'boca']; at.push(at[0] === 'patas' ? (riscos[1] || 'boca') : 'patas');
  at.forEach((k) => { r[k] = { st: 'atencao', raca: riscos.includes(k) }; });
  ['noite', 'caroco', 'agua', 'apetite', 'respiracao'].filter((k) => !at.includes(k) && !riscos.includes(k)).slice(0, 2).forEach((k) => { r[k].st = 'nao'; });
  return r;
}
function perfilDemo(id) {
  const [nome, sexo, idade] = DEMOS[id] || DEMOS['shih-tzu'];
  const fichaId = id === 'srd' ? 'srd-medio' : id;
  const f = FICHAS[fichaId] || FICHAS['srd-medio'];
  const porte = normPorte(f.porte);
  const rot = (RACAS_BOTOES.find((r) => r[0] === id) || [0, f.curto])[1];
  const radar = radarDemo(f);
  return { versao: 1, criadoEm: new Date(Date.now() - 25 * 864e5).toISOString(), origem: 'demo', nome, sexo, fichaId, racaRotulo: rot,
    racaOrigem: id === 'srd' ? 'srd' : 'botao', usaPorte: false, porte, idade, idadeHumana: idadeHumana(idade, porte), radar,
    acompanha: Object.values(radar).filter((x) => x.st !== 'nao').length, respostas: {} };
}

let P, F, RC; // perfil, ficha do quiz, ficha completa da raça
function carregarPerfil() {
  let p = LS.get('perfil', null);
  if (!p || typeof p !== 'object' || !p.nome || !p.fichaId) { p = perfilDemo('shih-tzu'); LS.set('perfil', p); }
  p.porte = normPorte(p.porte || (FICHAS[p.fichaId] && FICHAS[p.fichaId].porte));
  if (!FICHAS[p.fichaId]) p.fichaId = 'srd-' + p.porte;
  p.sexo = p.sexo === 'f' ? 'f' : 'm';
  p.idade = Math.max(1, Math.min(25, +p.idade || 10));
  p.idadeHumana = idadeHumana(p.idade, p.porte);
  if (!p.criadoEm) p.criadoEm = new Date().toISOString();
  const r = p.radar || {}; SINAIS7.forEach((s) => { if (!r[s.id] || !ORDEM[r[s.id].st]) r[s.id] = { st: 'nao', raca: false }; }); p.radar = r;
  P = p; F = FICHAS[p.fichaId]; RC = RCOMP[p.fichaId] || RCOMP['srd-' + p.porte] || null;
  // o estado do app é de UM cão: perfil novo (quiz refeito ou troca no demo) começa do zero
  const assinatura = p.criadoEm + '|' + p.origem;
  if (LS.get('app-dono', null) !== assinatura) {
    CHAVES_APP.forEach((k) => LS.del(k)); LS.set('app-dono', assinatura);
    if (p.origem === 'demo') semearDemo();
  }
}
function salvarPerfil() { LS.set('perfil', P); }

// ---------- texto personalizado ----------
const fem = () => P.sexo === 'f';
function pers(t) {
  if (t == null) return '';
  return String(t).replace(/\{nome\}/g, P.nome).replace(/\{Ele\}/g, fem() ? 'Ela' : 'Ele').replace(/\{ele\}/g, fem() ? 'ela' : 'ele')
    .replace(/\{dele\}/g, fem() ? 'dela' : 'dele').replace(/\{O\}/g, fem() ? 'A' : 'O').replace(/\{o\}/g, fem() ? 'a' : 'o');
}
// textos da ficha do quiz (escritos no masculino: "O {nome} tosse...", "ele")
function persFicha(t) {
  let r = String(t || '').replace(/\bO \{nome\}/g, (fem() ? 'A ' : 'O ') + P.nome).replace(/\bdo \{nome\}/g, (fem() ? 'da ' : 'do ') + P.nome)
    .replace(/\bno \{nome\}/g, (fem() ? 'na ' : 'no ') + P.nome).replace(/\{nome\}/g, P.nome);
  if (fem()) r = r.replace(/\bele\b/g, 'ela').replace(/\bEle\b/g, 'Ela').replace(/\bdele\b/g, 'dela').replace(/\bpego\b/g, 'pega').replace(/\bdeitado\b/g, 'deitada')
    .replace(/\bapático\b/g, 'apática').replace(/\bsonolento\b/g, 'sonolenta').replace(/\bdesorientado\b/g, 'desorientada').replace(/\bagitado\b/g, 'agitada');
  return r;
}
const md = (t) => esc(pers(t)).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const N = () => esc(P.nome);
const oN = () => esc(pers('{o} {nome}'));     // "o Thor" / "a Mel"
const ON = () => esc(pers('{O} {nome}'));     // "O Thor"
const doN = () => esc(pers('d{o} {nome}'));   // "do Thor"

function racaNome() {
  if (P.racaOrigem === 'srd' || (/^srd/.test(P.fichaId) && !P.usaPorte)) return 'Vira-lata de porte ' + porteTxt();
  return P.racaRotulo || (F && F.curto) || 'Sem raça definida';
}
const porteTxt = () => ({ pequeno: 'pequeno', medio: 'médio', grande: 'grande' }[P.porte] || 'médio');
function fotoSrc() {
  const minha = LS.get('foto', null); if (minha) return minha;
  if (P.racaOrigem === 'srd' || (/^srd/.test(P.fichaId) && !P.usaPorte)) return '../img/raca-srd.webp';
  if (!P.usaPorte && COM_FOTO.has(P.fichaId)) return '../img/raca-' + P.fichaId + '.webp';
  return '../img/porte-' + P.porte + '.webp';
}
const fotoHtml = (cls = '', editavel = false) => { const f = `<span class="foto ${cls}"><img src="${fotoSrc()}" alt="" onerror="this.parentNode.textContent='🐶'"></span>`;
  return editavel ? `<span class="foto-wrap">${f}<button class="foto-bt" type="button" data-foto aria-label="Trocar a foto">${I.camera}</button></span>` : f; };
function fase() {
  const i = P.idade, ida = F.idosoAos || 10, vive = F.vive || 12;
  if (i >= vive) return 'Fase idosa avançada'; if (i >= ida) return 'Fase idosa'; if (i >= ida - 2) return 'Entrando na fase idosa'; return 'Adulto maduro';
}
const faseCurta = () => pers({ 'Adulto maduro': fem() ? 'Adulta' : 'Adulto', 'Entrando na fase idosa': 'Quase idos{o}', 'Fase idosa': 'Idos{o}', 'Fase idosa avançada': 'Bem idos{o}' }[fase()]);
// limitações para recomendar exercícios: raça com coluna, cão grande, respostas do quiz e radar
function limitacoes() {
  const s = new Set();
  const resp = (P.respostas && P.respostas.patas) || '';
  if (/trás tremem/.test(resp)) s.add('patas-tras');
  if (/Escorrega/.test(resp)) s.add('escorrega');
  if (/levantar|sofá/.test(resp)) s.add('levantar');
  if (racaTemColuna()) s.add('coluna');
  if (P.porte === 'grande') s.add('artrose');
  if (!s.size && radarAtual().patas === 'atencao') { s.add('levantar'); s.add('patas-tras'); }
  return s;
}
const racaTemColuna = () => (F.perguntas || []).some((p) => p.chave === 'coluna') || (RC && RC.doencas.some((d) => /hérnia|coluna|neurológica/i.test(d.nome)));

// =====================================================================
// 3. Histórico do radar (quiz + check-ups semanais)
// =====================================================================
const radarSimples = (r) => Object.fromEntries(SINAIS7.map((s) => [s.id, (r[s.id] && (r[s.id].st || r[s.id])) || 'nao']));
function historico() {
  const base = { data: dISO(new Date(P.criadoEm)), origem: 'quiz', res: radarSimples(P.radar) };
  return [base, ...LS.get('checkups', []).map((c) => ({ data: c.data, origem: 'checkup', res: radarSimples(c.res) }))].sort((a, b) => (a.data < b.data ? -1 : 1));
}
const radarAtual = () => { const h = historico(); return h[h.length - 1].res; };
const emAtencao = (res) => SINAIS7.filter((s) => res[s.id] === 'atencao').map((s) => s.id);
function contagem(res) { const c = { atencao: 0, observar: 0, nao: 0 }; SINAIS7.forEach((s) => { c[res[s.id]]++; }); return c; }
// compara a última semana com a anterior: melhorou / piorou / novo sinal / igual
function comparar(h) {
  const n = h.length; const out = {};
  SINAIS7.forEach((s) => {
    if (n < 2) { out[s.id] = null; return; }
    const ag = h[n - 1].res[s.id], an = h[n - 2].res[s.id];
    if (ag === 'atencao' && an !== 'atencao') out[s.id] = h.slice(0, n - 1).some((x) => x.res[s.id] === 'atencao') ? 'piorou' : 'novo';
    else if (an === 'atencao' && ag === 'observar') out[s.id] = 'melhorou';
    else out[s.id] = 'igual';
  });
  return out;
}
const COMP_TXT = { melhorou: '↓ melhorou', piorou: '↑ piorou', novo: '● novo sinal', igual: 'igual' };
function proximoCheckup() {
  const h = historico(); const ult = h[h.length - 1].data; const prox = somaDias(ult, 7);
  return { ult, prox, faltam: difDias(hoje(), prox) };
}
const checkupDevido = () => proximoCheckup().faltam <= 0;
// sinal em Atenção há 2 semanas seguidas, ou novo, ou piorou → sugerir veterinário
function pedeVet(id) {
  const h = historico(); const n = h.length; const c = comparar(h)[id];
  return h[n - 1].res[id] === 'atencao' && (c === 'novo' || c === 'piorou' || (n >= 2 && h[n - 2].res[id] === 'atencao'));
}

// =====================================================================
// 4. Plano do dia (rotina de 10 minutos)
// =====================================================================
const TAREFAS = window.TAREFAS;
const TID = Object.fromEntries(TAREFAS.map((t) => [t.id, t]));
function tarefaServe(t) {
  if (t.so === 'coluna') return racaTemColuna();
  if (t.so === 'grande') return P.porte === 'grande';
  if (t.ex === 'ex-levantar' || t.ex === 'ex-patas-tras') return !racaTemColuna() || t.ex === 'ex-patas-tras';
  return true;
}
function planoDoDia(iso) {
  const atual = radarAtual();
  const at = emAtencao(atual);
  const quizAt = emAtencao(radarSimples(P.radar));
  const obs = SINAIS7.filter((s) => atual[s.id] === 'observar').map((s) => s.id);
  const prio = [...new Set([...at, ...(F.riscos || []), ...quizAt, ...obs])];
  const seed = hash(iso + '|' + P.nome);
  const LIM = 10; const lista = []; let min = 0; // a promessa é "10 minutos por dia": o plano nunca passa disso
  for (const s of prio) {
    if (lista.length >= 3) break;
    let cands = TAREFAS.filter((t) => !t.mente && t.sinais.includes(s) && tarefaServe(t) && !lista.includes(t) && min + t.min <= LIM - 1);
    if (s === 'patas') { const esp = cands.filter((t) => t.so); if (esp.length) cands = esp.concat(cands.filter((t) => t.ex === 'massagem')); }
    if (!cands.length) continue;
    const t = cands[(seed + lista.length * 7) % cands.length]; lista.push(t); min += t.min;
  }
  const mentes = TAREFAS.filter((t) => t.mente && min + t.min <= LIM);
  if (mentes.length) { const m = mentes[seed % mentes.length]; lista.push(m); min += m.min; }
  else if (!lista.includes(TID['t-luz'])) { lista.push(TID['t-luz']); min += 1; }
  return { lista, min };
}
const feitasDe = (iso) => (LS.get('tarefas', {})[iso] || []);
function marcarTarefa(id, feita) {
  const t = LS.get('tarefas', {}); const d = hoje(); const s = new Set(t[d] || []);
  feita ? s.add(id) : s.delete(id); t[d] = [...s]; LS.set('tarefas', t);
}
function sequencia() {
  const t = LS.get('tarefas', {}); let d = hoje(); let n = 0;
  if (!(t[d] || []).length) d = somaDias(d, -1);
  while ((t[d] || []).length) { n++; d = somaDias(d, -1); }
  return n;
}

// =====================================================================
// 5. Demo: Thor (Shih Tzu, 11 anos) já com 4 semanas de uso
// =====================================================================
function semearDemo() {
  const H = hoje(); const base = radarSimples(P.radar);
  const naoK = SINAIS7.filter((s) => base[s.id] === 'nao').map((s) => s.id);
  const c1 = clone(base); if (naoK[0]) c1[naoK[0]] = 'observar';
  const c2 = clone(c1); if (naoK[1]) c2[naoK[1]] = 'observar'; if (c2.apetite === 'observar') c2.apetite = 'atencao';
  const c3 = clone(c2);
  const melhora = SINAIS7.find((s) => base[s.id] === 'atencao' && !(P.radar[s.id] || {}).raca); if (melhora) c3[melhora.id] = 'observar';
  if (c3.apetite === 'atencao' && c2.apetite === 'atencao' && base.apetite !== 'atencao') c3.apetite = 'observar';
  const novo = [...(F.riscos || []), 'respiracao', 'agua'].find((k) => c3[k] === 'observar' && base[k] !== 'atencao'); if (novo) c3[novo] = 'atencao';
  LS.set('checkups', [{ data: somaDias(H, -18), res: c1 }, { data: somaDias(H, -11), res: c2 }, { data: somaDias(H, -4), res: c3 }]);
  // rotina: 5 dias seguidos feitos + 1 tarefa hoje
  const tar = {};
  for (let i = 1; i <= 5; i++) { const d = somaDias(H, -i); tar[d] = planoDoDia(d).lista.map((t) => t.id); }
  tar[somaDias(H, -7)] = planoDoDia(somaDias(H, -7)).lista.slice(0, 2).map((t) => t.id);
  tar[H] = [planoDoDia(H).lista[0].id];
  LS.set('tarefas', tar);
  // remédio cadastrado (como o veterinário receitou) e as doses da semana
  const rid = 'r' + uid();
  LS.set('remedios', [{ id: rid, nome: 'Ômega 3 (óleo de peixe)', para: 'Articulações, indicado na última consulta', inst: 'Como o veterinário receitou: 1 vez ao dia, com a comida.', horarios: ['08:00'], lembrete: true }]);
  const doses = {}; for (let i = 1; i <= 6; i++) doses[somaDias(H, -i)] = { [rid + '@08:00']: '08:' + String(5 + i * 3).padStart(2, '0') }; LS.set('doses', doses);
  LS.set('diario', [
    { id: uid(), data: somaDias(H, -2), texto: pers('Comeu tudo com a ração morninha. Ficou pedindo mais.'), sinal: 'apetite' },
    { id: uid(), data: somaDias(H, -5), texto: pers('Tossiu duas vezes ao acordar, tosse curta. Contei 24 respirações por minuto dormindo.'), sinal: 'respiracao' },
    { id: uid(), data: somaDias(H, -9), texto: pers('Escorregou na cozinha correndo para a porta. Coloquei um tapete de borracha no corredor.'), sinal: 'patas' },
  ]);
  LS.set('carocos', [{ id: uid(), vista: 'esq', x: 138, y: 104, local: 'Peito, lado esquerdo', obs: 'Mole, mexe quando toca', foto: null,
    medidas: [{ data: somaDias(H, -40), cm: 0.5 }, { data: somaDias(H, -6), cm: 0.8 }] }]);
  const qvBase = [[7, 8, 9, 8, 7, 6, 7], [7, 8, 9, 8, 8, 6, 7], [6, 7, 8, 8, 7, 5, 6], [8, 8, 9, 8, 8, 7, 8]];
  LS.set('qv', qvBase.map((v, i) => ({ data: somaDias(H, -24 + i * 7), v: Object.fromEntries(window.QV_ITENS.map((it, j) => [it.id, v[j]])) })));
  const dias = {}; for (let i = 1; i <= 16; i++) dias[somaDias(H, -i)] = (i === 6 || i === 11) ? 'dificil' : 'bom'; LS.set('dias', dias);
  LS.set('consulta', { ultima: somaDias(H, -152) });
  LS.set('resp', [{ data: somaDias(H, -12), rpm: 22 }, { data: somaDias(H, -5), rpm: 24 }, { data: somaDias(H, -1), rpm: 26 }]);
  LS.set('checks', { casa: { tapete: true, luz: true, potes: true } });
}

// =====================================================================
// 6. Ícones (SVG de traço simples)
// =====================================================================
const sv = (p, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${p}</svg>`;
const PATA_P = '<ellipse cx="6" cy="9" rx="2.2" ry="2.8"/><ellipse cx="10" cy="5.2" rx="2.2" ry="2.8"/><ellipse cx="14.5" cy="5.2" rx="2.2" ry="2.8"/><ellipse cx="18.5" cy="9" rx="2.2" ry="2.8"/><path d="M12.2 11c-3.4 0-6.4 3.6-6.4 6.3 0 1.9 1.5 2.9 3.2 2.9 1.4 0 2.1-.7 3.2-.7s1.8.7 3.2.7c1.7 0 3.2-1 3.2-2.9 0-2.7-3-6.3-6.4-6.3z"/>';
const I = {
  pata: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${PATA_P}</svg>`,
  pataTraco: sv(PATA_P, 'stroke-width="1.7"'),
  voltar: sv('<path d="M15 5l-7 7 7 7"/>', 'stroke-width="2.3"'),
  chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  sirene: sv('<path d="M7 18v-5a5 5 0 0 1 10 0v5"/><path d="M5 18h14v3H5z"/><path d="M12 3v1.5M4.6 6.6l1 1M19.4 6.6l-1 1M2.5 12.5H4M20 12.5h1.5"/>'),
  cadeado: sv('<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', 'stroke-width="2.3"'),
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  pausa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/></svg>',
  prox: sv('<path d="M5 5l9 7-9 7z"/><path d="M19 5v14"/>'),
  ant: sv('<path d="M19 5l-9 7 9 7z"/><path d="M5 5v14"/>'),
  copiar: sv('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>'),
  imprimir: sv('<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>'),
  mais: sv('<path d="M12 5v14M5 12h14"/>', 'stroke-width="2.4"'),
  busca: sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
  editar: sv('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
  trocar: sv('<path d="M4 8h13l-3-3M20 16H7l3 3"/>'),
  diario: sv('<path d="M6 3h11a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z"/><path d="M9 8h6M9 12h6"/>'),
  doc: sv('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
  coracao: sv('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
  chat: sv('<path d="M5 18l-1.5 3.5L8 20a9 9 0 1 0-3-2z"/><path d="M9 11h.01M12.5 11h.01M16 11h.01"/>', 'stroke-width="2.2"'),
  sino: sv('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>'),
  camera: sv('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
  tel: sv('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  // abas
  hoje: sv('<path d="M4 10.5L12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z"/>'),
  radar: sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12l6.2-5.2"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>'),
  rotina: sv('<path d="M10 6.5h10M10 12h10M10 17.5h10"/><path d="M3.5 6.5l1.3 1.3L7.3 5.3M3.5 12l1.3 1.3 2.5-2.5M3.5 17.5l1.3 1.3 2.5-2.5"/>'),
  sinais: sv('<circle cx="11" cy="11" r="7.5"/><path d="M21 21l-4.5-4.5"/><path d="M11 7.5v4M11 14.5h.01"/>'),
  perfil: sv(PATA_P, 'stroke-width="1.6"'),
  // os 5 cuidados
  alimentacao: sv('<path d="M3 12h18a9 8 0 0 1-18 0z"/><path d="M8.5 8.5c0-1.3 1-1.7 1-3M12.5 8.5c0-1.3 1-1.7 1-3"/><path d="M8 20h8"/>'),
  remedios: sv('<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-40 12 12)"/><path d="M9.7 9.3l4.8 5.6"/>'),
  prevencao: sv('<path d="M6 3.5H5v5a4.5 4.5 0 0 0 9 0v-5h-1"/><path d="M9.5 13v2.5a4.5 4.5 0 0 0 9 0V13"/><circle cx="18.5" cy="11" r="2"/>'),
  mente: sv('<path d="M9.5 4A3 3 0 0 0 6.6 6.3 3 3 0 0 0 4.5 11a3 3 0 0 0 1 4.6A3.2 3.2 0 0 0 9 20a2.5 2.5 0 0 0 3-2.4V6.5A2.5 2.5 0 0 0 9.5 4z"/><path d="M14.5 4a3 3 0 0 1 2.9 2.3A3 3 0 0 1 19.5 11a3 3 0 0 1-1 4.6A3.2 3.2 0 0 1 15 20a2.5 2.5 0 0 1-3-2.4"/>'),
};
I.mobilidade = sv('<path d="M7 4.5a2.3 2.3 0 0 0-2.2 3 2.3 2.3 0 1 0 2.8 2.9l6 6a2.3 2.3 0 1 0 2.9 2.8 2.3 2.3 0 1 0 3-2.2 2.3 2.3 0 0 0-2.9-1.4l-6-6A2.3 2.3 0 1 0 7.7 6.7 2.3 2.3 0 0 0 7 4.5z"/>');
const icoCuidado = (id) => I[id] || I.pataTraco;

// =====================================================================
// 7. Componentes
// =====================================================================
function toast(msg) {
  const t = document.getElementById('toast'); if (!t) return;
  t.textContent = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), 2200);
}
function copiar(texto) {
  const ok = () => toast('Copiado. É só colar no WhatsApp ou mostrar na consulta.');
  try { navigator.clipboard.writeText(texto).then(ok, () => fallbackCopiar(texto, ok)); } catch (e) { fallbackCopiar(texto, ok); }
}
function fallbackCopiar(texto, ok) {
  try { const a = document.createElement('textarea'); a.value = texto; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove(); ok(); } catch (e) { toast('Não deu para copiar aqui.'); }
}
const tagSt = (st) => `<span class="tag ${ROT_ST[st][1]}">${ROT_ST[st][0]}</span>`;
const COR_TAG = { at: 't-at', ob: 't-ob', vd: 't-vd', no: 't-no' };

function radarSvg(res, o = {}) {
  const cx = 150, cy = 150, R = 100; const anim = o.anim !== false;
  const ang = (i) => -Math.PI / 2 + i * 2 * Math.PI / 7;
  const pt = (r, i) => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];
  const f1 = (p) => p.map((n) => n.toFixed(1)).join(',');
  const poly = (r) => SINAIS7.map((_, i) => f1(pt(r, i))).join(' ');
  const rr = (st) => (st === 'atencao' ? R * 0.94 : st === 'observar' ? R * 0.62 : R * 0.3);
  const cor = { atencao: 'var(--at)', observar: 'var(--ob)', nao: 'var(--no)' };
  const vb = o.rotulos === false ? '30 30 240 240' : '0 0 300 300';
  return `<svg class="radar" viewBox="${vb}" role="img" aria-label="Radar dos 7 sinais">
    <polygon class="anelr" points="${poly(R)}"/><polygon class="anelr" points="${poly(R * 0.62)}"/><polygon class="anelr" points="${poly(R * 0.3)}"/>
    ${SINAIS7.map((_, i) => { const p = pt(R, i); return `<line class="raio" x1="${cx}" y1="${cy}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}"/>`; }).join('')}
    ${o.varre ? `<g class="varre"><path d="M${cx},${cy} L${cx},${cy - R} A${R},${R} 0 0,1 ${(cx + R * Math.sin(Math.PI / 4)).toFixed(1)},${(cy - R * Math.cos(Math.PI / 4)).toFixed(1)} Z" fill="var(--verde)" opacity=".1"/></g>` : ''}
    <polygon class="area" points="${SINAIS7.map((s, i) => f1(pt(rr(res[s.id]), i))).join(' ')}"/>
    ${SINAIS7.map((s, i) => { const p = pt(rr(res[s.id]), i); return `<circle class="pr" style="animation-delay:${anim ? (0.1 + i * 0.07).toFixed(2) : 0}s${anim ? '' : ';opacity:1'}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${o.rotulos === false ? 12 : 10}" fill="${cor[res[s.id]]}" stroke="#fff" stroke-width="3"/>`; }).join('')}
    ${o.rotulos === false ? '' : SINAIS7.map((s, i) => { const p = pt(R + 27, i); return `<text class="lbl" x="${p[0].toFixed(1)}" y="${p[1].toFixed(1)}" text-anchor="middle" dominant-baseline="central" style="font-size:20px">${s.emoji}</text>`; }).join('')}
    <circle cx="${cx}" cy="${cy}" r="4" fill="var(--verde)"/></svg>`;
}
// histórico: linhas = 7 sinais, colunas = semanas
function histSvg(h) {
  const H = h.slice(-8); const n = H.length; const W = 340, esq = 34, topo = 30, lh = 27;
  const cw = (W - esq - 4) / Math.max(n, 1);
  const cor = { atencao: 'var(--at)', observar: 'var(--ob)', nao: '#C5D0CB' };
  let s = `<svg class="hist" viewBox="0 0 ${W} ${topo + 7 * lh + 26}" role="img" aria-label="Histórico dos check-ups">`;
  s += `<text x="0" y="14" style="font-weight:700;fill:var(--at)">Atenção</text>`;
  H.forEach((x, j) => {
    const cxx = esq + cw * j + cw / 2; const c = emAtencao(x.res).length;
    s += `<text x="${cxx.toFixed(1)}" y="14" text-anchor="middle" style="font-weight:800;fill:${c ? 'var(--at)' : 'var(--muted2)'};font-family:var(--f-d);font-size:13px">${c}</text>`;
    s += `<line class="gl" x1="${cxx.toFixed(1)}" y1="${topo - 6}" x2="${cxx.toFixed(1)}" y2="${topo + 7 * lh - 6}"/>`;
  });
  SINAIS7.forEach((sg, i) => {
    const y = topo + i * lh + lh / 2 - 4;
    s += `<text x="12" y="${y + 1}" text-anchor="middle" dominant-baseline="central" style="font-size:15px">${sg.emoji}</text>`;
    H.forEach((x, j) => { const cxx = esq + cw * j + cw / 2; s += `<circle cx="${cxx.toFixed(1)}" cy="${y}" r="8.5" fill="${cor[x.res[sg.id]]}"/>`; });
  });
  H.forEach((x, j) => { const cxx = esq + cw * j + cw / 2; s += `<text x="${cxx.toFixed(1)}" y="${topo + 7 * lh + 10}" text-anchor="middle">${x.origem === 'quiz' ? 'início' : fData(x.data)}</text>`; });
  return s + '</svg>';
}
function linhaSvg(pontos, o) { // pontos: [{rot, v}]; o: {max, linha, rotLinha}
  const W = 340, Hh = 170, esq = 26, dir = 10, topo = 16, base = 26; const n = pontos.length;
  const x = (i) => esq + (n === 1 ? (W - esq - dir) / 2 : i * (W - esq - dir) / (n - 1));
  const y = (v) => topo + (1 - v / o.max) * (Hh - topo - base);
  let s = `<svg class="hist" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="${esc(o.aria || 'Gráfico')}">`;
  [0, o.max / 2, o.max].forEach((v) => { s += `<line class="gl" x1="${esq}" x2="${W - dir}" y1="${y(v)}" y2="${y(v)}"/><text x="${esq - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`; });
  if (o.linha != null) s += `<line x1="${esq}" x2="${W - dir}" y1="${y(o.linha)}" y2="${y(o.linha)}" stroke="var(--ob)" stroke-width="1.5" stroke-dasharray="5 4"/><text x="${W - dir}" y="${y(o.linha) - 6}" text-anchor="end" style="fill:#8A5E0A;font-weight:600">${esc(o.rotLinha || '')}</text>`;
  if (n > 1) s += `<polyline fill="none" stroke="var(--verde)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" points="${pontos.map((p, i) => x(i) + ',' + y(p.v)).join(' ')}"/>`;
  pontos.forEach((p, i) => { s += `<circle cx="${x(i)}" cy="${y(p.v)}" r="5.5" fill="#fff" stroke="var(--verde)" stroke-width="3"/><text x="${x(i)}" y="${y(p.v) - 11}" text-anchor="middle" style="font-weight:700;fill:var(--ink)">${p.v}</text><text x="${x(i)}" y="${Hh - 8}" text-anchor="middle">${esc(p.rot)}</text>`; });
  return s + '</svg>';
}
function anelHtml(feitas, total, tam = '') {
  const C = 2 * Math.PI * 25; const f = total ? feitas / total : 0;
  return `<div class="anel ${tam}"><svg viewBox="0 0 58 58"><circle class="fundo" cx="29" cy="29" r="25"/><circle class="prog" cx="29" cy="29" r="25" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - f)).toFixed(1)}"/></svg><output>${feitas}/${total}</output></div>`;
}
function abrirFolha(html, ligar) {
  fecharFolha();
  const f = document.createElement('div'); f.className = 'folha'; f.id = 'folha';
  f.innerHTML = `<div class="caixa" role="dialog" aria-modal="true"><div class="pega"></div>${html}</div>`;
  f.addEventListener('click', (e) => { if (e.target === f) fecharFolha(); });
  document.body.appendChild(f); if (ligar) ligar(f.querySelector('.caixa'));
}
function fecharFolha() { const f = document.getElementById('folha'); if (f) f.remove(); }
function patinhasVoando(el) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('span'); p.className = 'patinha-voa'; p.innerHTML = I.pata;
    const a = (-150 + i * 24) * Math.PI / 180; const d = 46 + (i % 3) * 14;
    p.style.left = (r.left + r.width / 2 - 9) + 'px'; p.style.top = (r.top + r.height / 2 - 9) + 'px';
    p.style.setProperty('--dx', (Math.cos(a) * d).toFixed(0) + 'px'); p.style.setProperty('--dy', (Math.sin(a) * d).toFixed(0) + 'px'); p.style.setProperty('--rot', (i * 25 - 60) + 'deg');
    p.style.animationDelay = (i * 0.03) + 's'; document.body.appendChild(p); setTimeout(() => p.remove(), 1100);
  }
}
const vibrar = (ms) => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* sem vibração */ } };

// =====================================================================
// 8. Telas
// =====================================================================
// ---------- HOJE ----------
function telaHoje() {
  const h = new Date().getHours(); const saud = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  const { lista, min } = planoDoDia(hoje()); const feitas = feitasDe(hoje());
  const nFeitas = lista.filter((t) => feitas.includes(t.id)).length;
  const atual = radarAtual(); const cnt = contagem(atual); const pc = proximoCheckup();
  const seq = sequencia();
  const atNomes = emAtencao(atual).map((k) => `<span class="tag t-at">${SN[k].emoji} ${esc(SN[k].nome)}</span>`).join('');
  const tudo = nFeitas === lista.length;
  const html = `
    <div class="saud"><div><h1>${saud}${P.dono ? ', ' + esc(P.dono) : ''}!</h1><div class="data">${cap(fDataLonga(hoje()))}</div></div></div>
    <section class="cao">
      <div class="topo-cao">${fotoHtml('')}<div><div class="nome">${N()}</div><div class="info">${esc(racaNome())} · ${fem() ? 'fêmea' : 'macho'} · ${P.idade} aninhos</div></div></div>
      <div class="stats">
        <div class="stat"><b>~${P.idadeHumana}</b><span>anos em idade humana</span></div>
        <div class="stat"><b>${num(F.vive)}</b><span>anos, média da raça</span></div>
        <div class="stat"><b>${faseCurta()}</b><span>fase da vida</span></div>
      </div>
      <p class="promessa">Mais anos com ${oN()}, e anos bons.</p>
    </section>

    <div class="secao-tit"><h2>Radar dos 7 sinais</h2><a href="#/checkup">Ver tudo</a></div>
    <a class="card" href="#/checkup" style="display:block;text-decoration:none;color:inherit">
      <div class="radar-resumo"><div class="mini">${radarSvg(atual, { rotulos: false })}</div>
        <div><div class="contagem"><span class="tag t-at">${cnt.atencao} Atenção</span><span class="tag t-ob">${cnt.observar} Observar</span>${cnt.nao ? `<span class="tag t-no">${cnt.nao} Não observado</span>` : ''}</div>
        <div class="contagem">${atNomes}</div></div></div>
      <div class="prox"><div class="dias-n${pc.faltam <= 0 ? ' at' : ''}">${Math.max(0, pc.faltam)}</div>
        <div style="flex:1"><b style="font-size:15px">${pc.faltam > 0 ? `Próximo check-up: falta${pc.faltam > 1 ? 'm' : ''} ${plural(pc.faltam, 'dia', 'dias')}` : pc.faltam === 0 ? 'Check-up é hoje' : 'Check-up atrasado'}</b>
        <p class="pequeno">${pc.faltam > 0 ? 'Último em ' + fData(pc.ult) + '. Leva 2 minutos.' : '2 minutos para ver como foi a semana.'}</p></div>${I.chev}</div>
    </a>

    <a class="plano-linha${tudo ? ' tudo' : ''}" href="#/plano" style="margin-top:12px">
      ${anelHtml(nFeitas, lista.length, 'p')}
      <span class="txt"><b>${tudo ? 'Plano de hoje: tudo feito!' : `Plano de hoje: ${min} min`}</b>
        <span>${nFeitas} de ${lista.length} feitas · ${I.pata.replace('<svg', '<svg width="12" height="12" style="vertical-align:-1px;color:var(--verde)"')} ${seq ? plural(seq, 'dia seguido', 'dias seguidos') : 'comece hoje'}</span>
        <span class="barra"><i style="width:${lista.length ? (nFeitas / lista.length) * 100 : 0}%"></i></span></span>${I.chev}</a>

    <div class="vao"></div>
    <a class="emerg" href="#/emergencia"><span class="ic">${I.sirene}</span><span style="flex:1"><b>Emergência</b><span>Os sinais de correr para o veterinário agora, e o que fazer no caminho.</span></span>${I.chev}</a>

    <div class="secao-tit"><h2>Atalhos</h2></div>
    <div class="atalhos">
      <a class="atalho" href="#/dias-bons"><span class="ico">${I.coracao}</span><b>Dias bons</b><span>A escala da semana: dor, fome, alegria…</span></a>
      <a class="atalho" href="#/assistente"><span class="cad">${I.cadeado}</span><span class="ico" style="background:#13231D;color:#8FD6C3">${I.chat}</span><b>Assistente 24h</b><span>Dá pra esperar ou é emergência?</span></a>
      <a class="atalho" href="#/resumo"><span class="ico">${I.doc}</span><b>Resumo para o veterinário</b><span>Pronto para mostrar ou imprimir</span></a>
      <a class="atalho" href="#/sinais"><span class="ico">${I.sinais}</span><b>É da idade ou é alerta?</b><span>${GUIA.length} sinais explicados</span></a>
    </div>

    <div class="secao-tit"><h2>Você sabia?</h2></div>
    <div class="card plano"><p class="sabia" style="font-size:15px;line-height:1.55">${esc(persFicha(F.gancho))}</p>
      <a class="link" href="#/rotina/prevencao/doencas-raca" style="display:inline-block;margin-top:10px">O que fazer na raça ${pers('d{o} {nome}')} →</a></div>`;
  return { aba: 'hoje', html };
}

// ---------- PLANO DE HOJE (a rotina de 10 minutos) ----------
const COR_CUIDADO = { mobilidade: '#E3F1EC', alimentacao: '#FBF0D6', remedios: '#FBE6DC', prevencao: '#E4EEF8', mente: '#EFE7F7' };
function telaPlano() {
  const { lista, min } = planoDoDia(hoje()); const feitas = feitasDe(hoje());
  const nFeitas = lista.filter((t) => feitas.includes(t.id)).length; const tudo = nFeitas === lista.length;
  const seq = sequencia(); const tar = LS.get('tarefas', {});
  const dias7 = Array.from({ length: 7 }, (_, i) => somaDias(hoje(), i - 6));
  const at = emAtencao(radarAtual()); const motivos = [...new Set([...at, ...(F.riscos || [])])];
  const html = `
    <section class="plano-topo" id="plano">${anelHtml(nFeitas, lista.length, 'g')}
      <div><span class="rotulo">${cap(fDataLonga(hoje()))}</span><h1 style="margin-top:6px;font-size:25px" id="planoTit">${tudo ? 'Tudo feito hoje!' : `${min} minutos hoje`}</h1>
      <p class="pequeno" style="margin-top:4px">${tudo ? pers('{O} {nome} agradece. Amanhã tem mais.') : 'Toque no círculo quando terminar cada uma.'}</p></div></section>
    <div class="tarefas-cards">${lista.map((t, i) => { const f = feitas.includes(t.id); const cu = CU[t.cuidado]; return `
      <div class="tarefa-card tarefa${f ? ' feita' : ''}" data-t="${t.id}" style="--cor:${COR_CUIDADO[t.cuidado] || 'var(--soft)'}">
        <a class="corpo-t" href="${t.ex ? '#/fazer/' + t.ex : t.abre}"><span class="em">${t.emoji}</span>
          <span class="txt"><span class="n">${i + 1}</span><b>${esc(t.titulo)}</b><span>${esc(pers(t.x))}</span>
          <span class="meta"><span class="tag t-cinza">⏱ ${t.min} min</span>${cu ? `<span class="tag t-cinza">${esc(cu.nome)}</span>` : ''}<span class="ir">${t.ex ? I.play.replace('<svg', '<svg width="12" height="12"') + ' Guiado' : 'Como fazer'}</span></span></span></a>
        <button class="marcar" type="button" aria-label="Marcar como feita: ${esc(t.titulo)}" aria-pressed="${f}">${I.check}</button>
      </div>`; }).join('')}</div>
    <div class="patinhas" style="margin-top:14px">
      <div class="dias">${dias7.map((d) => `<div class="dia${(tar[d] || []).length ? ' ok' : ''}${d === hoje() ? ' hoje' : ''}"><i>${I.pata}</i>${SEM_CURTA[dataDe(d).getDay()]}</div>`).join('')}</div>
      <div class="seq">${seq ? `<b>${seq}</b><span>${seq === 1 ? 'dia seguido' : 'dias seguidos'}</span>` : '<b style="font-size:15px">Comece hoje</b><span>cada dia vira uma patinha</span>'}</div>
    </div>
    <div class="card soft" style="margin-top:14px"><span class="rotulo">Por que estas tarefas</span>
      <div class="contagem" style="margin-top:10px">${motivos.map((k) => `<span class="tag ${at.includes(k) ? 't-at' : 't-ob'}">${SN[k].emoji} ${esc(SN[k].nome)} · ${at.includes(k) ? 'em Atenção' : 'risco da raça'}</span>`).join('')}</div>
      <p class="pequeno" style="margin-top:10px">O plano muda todo dia e acompanha o check-up semanal.</p></div>
    <a class="btn sec" href="#/rotina" style="margin-top:14px">Ver os 5 cuidados</a>`;
  return { aba: 'hoje', titulo: 'Plano de hoje', pai: 'hoje', html, ligar: ligarPlano };
}
function ligarPlano(root) {
  root.querySelectorAll('.tarefa .marcar').forEach((b) => {
    b.onclick = () => {
      const row = b.closest('.tarefa'); const id = row.dataset.t; const feita = !row.classList.contains('feita');
      marcarTarefa(id, feita); row.classList.toggle('feita', feita); b.setAttribute('aria-pressed', feita);
      if (feita) { row.classList.remove('pop'); void row.offsetWidth; row.classList.add('pop'); patinhasVoando(b); vibrar(25); }
      const tot = root.querySelectorAll('.tarefa').length, n = root.querySelectorAll('.tarefa.feita').length;
      const C = 2 * Math.PI * 25; root.querySelector('#plano .anel .prog').style.strokeDashoffset = (C * (1 - n / tot)).toFixed(1); root.querySelector('#plano .anel output').textContent = n + '/' + tot;
      clearTimeout(ligarPlano._t); ligarPlano._t = setTimeout(() => { if (rotaAtual().r === 'plano') render(true); }, 900);
    };
  });
}

// ---------- foto do cão (a foto real substitui a da raça) ----------
function folhaFoto() {
  const temFoto = !!LS.get('foto', null);
  abrirFolha(`<div style="display:flex;gap:14px;align-items:center">${fotoHtml()}<div><h2>Foto d${pers('{o}')} ${N()}</h2><p class="pequeno">Ela aparece no início, no perfil e no resumo para o veterinário.</p></div></div>
    <label class="btn" style="margin-top:18px;cursor:pointer">${I.camera} ${temFoto ? 'Trocar a foto' : 'Tirar ou escolher uma foto'}<input type="file" accept="image/*" id="ff" hidden></label>
    ${temFoto ? '<button class="btn sec" type="button" id="fr" style="margin-top:10px">Voltar para a foto da raça</button>' : ''}`, (cx) => {
    cx.querySelector('#ff').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      fotoQuadrada(f, (url) => { if (LS.set('foto', url)) { fecharFolha(); toast('Foto nova salva.'); render(true); } });
    };
    const fr = cx.querySelector('#fr'); if (fr) fr.onclick = () => { LS.del('foto'); fecharFolha(); toast('Voltamos para a foto da raça.'); render(true); };
  });
}
// recorta o quadrado do centro e reduz para 320 px (JPEG 0,8)
function fotoQuadrada(arquivo, ok) {
  const leitor = new FileReader();
  leitor.onload = () => { const img = new Image(); img.onload = () => {
    try {
      const lado = Math.min(img.width, img.height); const T = 320; const cv = document.createElement('canvas'); cv.width = T; cv.height = T;
      cv.getContext('2d').drawImage(img, (img.width - lado) / 2, (img.height - lado) / 2, lado, lado, 0, 0, T, T);
      ok(cv.toDataURL('image/jpeg', 0.8));
    } catch (e) { toast('Não consegui usar essa foto.'); }
  }; img.onerror = () => toast('Não consegui abrir essa foto.'); img.src = leitor.result; };
  leitor.readAsDataURL(arquivo);
}

// ---------- CHECK-UP ----------
function telaCheckup() {
  const h = historico(); const atual = h[h.length - 1].res; const comp = comparar(h); const pc = proximoCheckup();
  const ultimo = h[h.length - 1];
  const at = emAtencao(atual);
  const html = `
    <h1 style="margin-top:6px">Check-up semanal</h1>
    <p class="sub">2 minutos por semana. Os 7 sinais avisam antes de virar problema.</p>
    <div class="vao"></div>
    <section class="card ${pc.faltam <= 0 ? 'verde' : ''}" style="${pc.faltam <= 0 ? '' : ''}">
      ${pc.faltam <= 0
        ? `<span class="rotulo">Está na hora</span><h2 style="margin-top:8px">Como foi a semana d${pers('{o}')} ${N()}?</h2><p class="sub">${CHECKUP_N()} perguntas, uma por tela. Inclui as 2 da raça.</p><a class="btn" href="#/checkup/fazer" style="margin-top:14px">Começar o check-up</a>`
        : `<div style="display:flex;align-items:center;gap:14px"><div class="ico">${I.radar}</div><div style="flex:1"><b style="font-size:16px">Feito ${difDias(pc.ult, hoje()) === 0 ? 'hoje' : 'há ' + plural(difDias(pc.ult, hoje()), 'dia', 'dias')}</b><p class="pequeno">Próximo em ${plural(pc.faltam, 'dia', 'dias')} (${fData(pc.prox)}).</p></div></div>
           <a class="btn sec" href="#/checkup/fazer" style="margin-top:14px">Fazer agora mesmo assim</a>`}
    </section>

    <div class="secao-tit"><h2>Radar de ${ultimo.origem === 'quiz' ? 'quando você fez o diagnóstico' : fData(ultimo.data)}</h2></div>
    <div class="card plano">
      <div style="max-width:280px;margin:0 auto">${radarSvg(atual, { varre: true })}</div>
      ${h.length > 1 ? '<p class="pequeno" style="text-align:center;margin:2px 0 12px">Comparado com o check-up anterior</p>' : ''}
      <div class="sinais-lista">${SINAIS7.map((s) => `
        <div class="sinal-linha"><span class="em">${s.emoji}</span><span class="nm">${esc(s.nome)}<small>${esc(s.ex)}${(P.radar[s.id] || {}).raca ? ' · risco da raça' : ''}</small></span>
          <span class="dir">${tagSt(atual[s.id])}${comp[s.id] ? `<span class="comp ${comp[s.id]}">${COMP_TXT[comp[s.id]]}</span>` : ''}</span></div>`).join('')}</div>
    </div>

    ${at.length ? `<div class="secao-tit"><h2>O que fazer agora</h2></div><div class="lista-cards">${at.map((k) => cartaoAcao(k)).join('')}</div>` : ''}

    <div class="secao-tit"><h2>Histórico</h2><span class="pequeno">${plural(h.length, 'registro', 'registros')}</span></div>
    <div class="card plano">${histSvg(h)}
      <div class="legenda"><span><i class="pt pt-at"></i>Atenção</span><span><i class="pt pt-ob"></i>Observar</span><span><i class="pt" style="background:#C5D0CB"></i>Não observado</span></div>
    </div>
    <p class="nota" style="margin-top:12px">O check-up organiza o que você observa em casa. Ele não diagnostica: quem examina é o médico-veterinário.</p>`;
  return { aba: 'checkup', html, ligar: ligarAcoes };
}
function cartaoAcao(k) {
  const ts = TAREFAS.filter((t) => t.sinais.includes(k) && tarefaServe(t)); const t = ts[0];
  const vet = pedeVet(k); const comp = comparar(historico())[k];
  const sinalGuia = GUIA.find((g) => g.area === k && g.cor !== 'vd');
  return `<div class="card">
    <div style="display:flex;gap:12px;align-items:center"><span class="ico at" style="font-size:21px">${SN[k].emoji}</span>
      <div style="flex:1"><b style="font-size:16px">${esc(SN[k].nome)}</b><div style="margin-top:4px">${tagSt('atencao')} ${comp && comp !== 'igual' ? `<span class="comp ${comp}" style="margin-left:4px">${COMP_TXT[comp]}</span>` : ''}</div></div></div>
    ${t ? `<a class="card-link" href="${t.ex ? '#/fazer/' + t.ex : t.abre}" style="margin-top:12px;box-shadow:none;background:var(--soft);border-color:transparent"><span style="font-size:22px">${t.emoji}</span><span class="txt"><b>Na rotina: ${esc(t.titulo)}</b><span>${esc(pers(t.x))}</span></span>${I.chev}</a>` : ''}
    ${vet ? `<details class="vet-det" style="margin-top:10px"><summary class="link" style="cursor:pointer">🩺 Leve ao veterinário: o que dizer</summary>
      <div class="dizer" style="margin-top:10px"><span class="rotulo">Fale assim na consulta</span><q>${esc(pers(window.VET_DIZER[k]))}</q>
      <div class="linha-btns"><button class="btn pq" type="button" data-copiar="${esc(pers(window.VET_DIZER[k]))}">${I.copiar} Copiar</button></div></div></details>` : ''}
    ${sinalGuia ? `<a class="link" href="#/sinais?area=${k}" style="display:inline-block;margin-top:10px">É da idade ou é alerta? Ver os sinais de ${esc(SN[k].nome.toLowerCase())} →</a>` : ''}
  </div>`;
}
function ligarAcoes(root) { root.querySelectorAll('[data-copiar]').forEach((b) => { b.onclick = () => copiar(b.dataset.copiar); }); }

const ILU = { boca: '🦷', respiracao: '❤️', agua: '💧', coluna: '🦴', patas: '🐾', gengiva: '👄', caroco: '🔎', noite: '🌙', apetite: '🍖' };
function perguntasCheckup() {
  const lista = SINAIS7.map((s) => ({ sinal: s.id, emoji: window.CHECKUP_PERGUNTAS[s.id].emoji, q: pers(window.CHECKUP_PERGUNTAS[s.id].q), op: window.CHECKUP_PERGUNTAS[s.id].op, raca: false }));
  (F.perguntas || []).forEach((p) => {
    const item = { sinal: p.sinal, emoji: ILU[p.chave] || '🔎', q: persFicha(p.texto), raca: true };
    const i = lista.findIndex((x) => x.sinal === p.chave && !x.raca);
    if (i >= 0) lista[i] = item; else { const j = lista.map((x) => x.sinal).lastIndexOf(p.sinal); lista.splice(j + 1, 0, item); }
  });
  return lista;
}
const CHECKUP_N = () => perguntasCheckup().length;
let CK = null; // check-up em andamento
function telaCheckupFazer() {
  if (!CK) CK = { i: 0, perg: perguntasCheckup(), resp: [] };
  const p = CK.perg[CK.i]; const n = CK.perg.length;
  const ops = window.CHECKUP_OPCOES.map((o, j) => ({ ...o, t: p.op ? p.op[j] : o.t }));
  const html = `<div class="perg">
    <div class="conta"><span>Pergunta ${CK.i + 1} de ${n}</span><span>~${Math.max(1, Math.round((n - CK.i) * 12 / 60))} min</span></div>
    <div class="prog"><i style="width:${(CK.i / n) * 100}%"></i></div>
    <div class="meio">
      <div class="ilustra" aria-hidden="true">${p.emoji}</div>
      ${p.raca ? `<div class="da-raca"><span class="tag t-vd">Pergunta da raça · ${esc(racaNome())}</span></div>` : ''}
      <h2>${esc(p.q)}</h2>
      <div class="opcoes">${ops.map((o, j) => `<button class="op${CK.resp[CK.i] === j ? ' on' : ''}" type="button" data-j="${j}"><span class="e">${o.e}</span><span>${esc(o.t)}</span></button>`).join('')}</div>
    </div></div>`;
  return {
    aba: 'checkup', titulo: 'Check-up semanal', pai: 'checkup', html,
    voltar: () => { if (CK && CK.i > 0) { CK.i--; render(); return true; } CK = null; return false; },
    ligar(root) {
      root.querySelectorAll('.op').forEach((b) => {
        b.onclick = () => {
          root.querySelectorAll('.op').forEach((x) => x.classList.remove('on')); b.classList.add('on');
          CK.resp[CK.i] = +b.dataset.j;
          setTimeout(() => { if (CK.i < CK.perg.length - 1) { CK.i++; render(); } else concluirCheckup(); }, 240);
        };
      });
    },
  };
}
function concluirCheckup() {
  const res = {}; SINAIS7.forEach((s) => { res[s.id] = 'nao'; });
  CK.perg.forEach((p, i) => { const st = window.CHECKUP_OPCOES[CK.resp[i]].st; if (ORDEM[st] > ORDEM[res[p.sinal]]) res[p.sinal] = st; });
  const lista = LS.get('checkups', []).filter((c) => c.data !== hoje()); lista.push({ data: hoje(), res }); LS.set('checkups', lista);
  CK = null; location.hash = '#/checkup/resultado';
}
function telaCheckupResultado() {
  const h = historico(); const atual = h[h.length - 1].res; const comp = comparar(h); const cnt = contagem(atual);
  const at = emAtencao(atual);
  const mudou = SINAIS7.filter((s) => comp[s.id] && comp[s.id] !== 'igual');
  const html = `<div style="text-align:center;margin-top:4px"><span class="rotulo">Check-up de ${fData(h[h.length - 1].data)}</span>
      <h1 style="margin-top:8px">Radar d${pers('{o}')} ${N()}</h1>
      <p class="sub">${cnt.atencao ? `${plural(cnt.atencao, 'sinal pede', 'sinais pedem')} atenção nesta semana.` : 'Nenhum sinal em Atenção nesta semana. Continue acompanhando.'}</p></div>
    <div style="max-width:290px;margin:4px auto 0">${radarSvg(atual, { varre: true })}</div>
    ${mudou.length ? `<div class="card plano"><span class="rotulo">Comparado com a semana passada</span><div class="sinais-lista" style="margin-top:10px">${mudou.map((s) => `<div class="sinal-linha"><span class="em">${s.emoji}</span><span class="nm">${esc(s.nome)}</span><span class="dir">${tagSt(atual[s.id])}<span class="comp ${comp[s.id]}">${COMP_TXT[comp[s.id]]}</span></span></div>`).join('')}</div></div>` : ''}
    ${at.length ? `<div class="secao-tit"><h2>O que fazer agora</h2></div><div class="lista-cards">${at.map((k) => cartaoAcao(k)).join('')}</div>` : ''}
    <div class="vao"></div>
    <a class="btn" href="#/hoje">Ver o plano de hoje</a>
    <a class="btn sec" href="#/checkup" style="margin-top:10px">Ver o histórico</a>`;
  return { aba: 'checkup', titulo: 'Resultado', pai: 'checkup', html, ligar: ligarAcoes };
}

// ---------- ROTINA (os 5 cuidados) ----------
function prioridadeCuidado(c) {
  const at = emAtencao(radarAtual()); const r = F.riscos || [];
  if (c.sinais.some((s) => at.includes(s))) return 'Prioridade agora';
  if (c.sinais.some((s) => r.includes(s))) return 'Risco da raça';
  return '';
}
function telaRotina() {
  const html = `<h1 style="margin-top:6px">A rotina d${pers('{o}')} ${N()}</h1>
    <p class="sub">10 minutos por dia, montados para ${esc(racaNome().toLowerCase().startsWith('vira') ? 'um vira-lata' : 'a raça')} e a idade ${pers('{dele}')}.</p>
    <div class="card verde" style="margin-top:14px"><div style="display:flex;gap:12px;align-items:center">
      <div style="width:64px;flex:none">${radarSvg(radarAtual(), { rotulos: false, anim: false })}</div>
      <p style="font-size:14.5px;line-height:1.45;color:var(--verde-esc)"><b>Os 7 sinais avisam.</b> <b>Os 5 cuidados</b> fazem ${pers('{o} {nome}')} viver mais e melhor.</p></div></div>
    <div class="lista-cards" style="margin-top:14px">${CUIDADOS.map((c) => { const pr = prioridadeCuidado(c); return `
      <a class="cuid-card" href="#/rotina/${c.id}"><span class="num">${c.num}</span><span class="ico">${icoCuidado(c.id)}</span>
        <span style="flex:1;min-width:0"><b>${esc(c.nome)}</b><p>${md(c.frase)}</p>
        <span class="tags">${pr ? `<span class="tag ${pr === 'Prioridade agora' ? 't-at' : 't-ob'}">${pr}</span>` : ''}<span class="tag t-cinza">${c.secoes.length} partes</span></span></span></a>`; }).join('')}</div>
    <div class="secao-tit"><h2>Ferramentas</h2></div>
    <div class="lista-cards">
      <a class="card-link" href="#/contar"><span class="ico">🫁</span><span class="txt"><b>Contar a respiração dormindo</b><span>30 segundos, o app faz a conta</span></span>${I.chev}</a>
      <a class="card-link" href="#/rotina/prevencao/carocos"><span class="ico">🔎</span><span class="txt"><b>Mapa de caroços</b><span>Marque, meça e acompanhe</span></span>${I.chev}</a>
      <a class="card-link" href="#/rotina/remedios/meus-remedios"><span class="ico">💊</span><span class="txt"><b>Meus remédios</b><span>Horários e "dei a dose"</span></span>${I.chev}</a>
    </div>`;
  return { aba: 'rotina', html };
}
function telaCuidado(id) {
  const c = CU[id]; if (!c) return telaNaoAchei();
  const pr = prioridadeCuidado(c); const lidas = LS.get('lidas', {});
  const nLidas = c.secoes.filter((s) => lidas[c.id + '/' + s.id]).length;
  const pq = partes(c.porQue);
  const html = `<section class="faixa"><span class="ico">${icoCuidado(c.id)}</span><span class="rotulo" style="display:block;margin-top:14px">Cuidado ${c.num} de 5</span>
      <h1 style="margin-top:6px">${esc(c.nome)}</h1><p>${md(c.frase)}</p>${pr ? `<span class="tag ${pr === 'Prioridade agora' ? 't-at' : 't-ob'}" style="margin-top:10px">${pr} para ${N()}</span>` : ''}</section>
    ${id === 'remedios' && P.respostas && /Já dei|pensei/.test(P.respostas.remedio || '') ? `<div class="aviso-c at" style="margin-top:12px"><span class="ic">⚠️</span><div><b>No diagnóstico, você contou que ${/Já dei/.test(P.respostas.remedio) ? 'já deu' : 'já pensou em dar'} remédio de gente</b><p>Veja "O veneno nº 1 está na sua gaveta".</p></div></div>` : ''}
    <div class="dobra porque-c" data-card style="margin-top:12px"><span class="rotulo">Por que importa</span><p class="porque-t">${md(pq.tit)}</p>
      ${pq.det ? `<div class="det"><p>${md(pq.det)}</p></div><button class="ler-mais" type="button" data-abre>Ler mais</button>` : ''}</div>
    <div class="progresso-lido"><span><b>${nLidas}</b> de ${c.secoes.length} partes vistas</span><span class="barra"><i style="width:${(nLidas / c.secoes.length) * 100}%"></i></span></div>
    <div class="lista-cards">${c.secoes.map((s, i) => { const lida = lidas[c.id + '/' + s.id]; return `
      <a class="card-link sec-link${lida ? ' lida' : ''}" href="#/rotina/${c.id}/${s.id}"><span class="ico">${s.emoji}</span><span class="txt"><small class="num-parte">Parte ${i + 1}</small><b>${md(s.titulo)}</b><span>${md(s.resumo)}</span></span>${lida ? `<span class="visto">${I.check}</span>` : I.chev}</a>`; }).join('')}</div>`;
  return { aba: 'rotina', titulo: c.nome, pai: 'rotina', html, ligar: ligarBlocos };
}
function telaSecao(cid, sid) {
  const c = CU[cid]; const s = c && c.secoes.find((x) => x.id === sid); if (!s) return telaNaoAchei();
  const lidas = LS.get('lidas', {}); if (!lidas[cid + '/' + sid]) { lidas[cid + '/' + sid] = true; LS.set('lidas', lidas); }
  const temEx = s.blocos.some((b) => b.t === 'exercicio' && b.tags && !b.tags.includes('geral'));
  const lim = limitacoes();
  const idx = c.secoes.indexOf(s); const prox = c.secoes[idx + 1];
  const FILTROS = [['todos', 'Todos'], ['levantar', 'Levanta devagar'], ['escorrega', 'Escorrega'], ['patas-tras', 'Patas de trás'], ['coluna', 'Coluna'], ['artrose', 'Artrose']];
  const html = `<div class="sec-cab"><span class="em-g">${s.emoji}</span><div><span class="rotulo">${esc(c.nome)} · parte ${idx + 1} de ${c.secoes.length}</span><h1 style="margin-top:4px;font-size:25px">${md(s.titulo)}</h1></div></div>
    <p class="sub">${md(s.resumo)}</p>
    ${temEx ? `<div class="chips" style="margin-top:14px" id="filtros">${FILTROS.map(([k, t]) => `<button class="chip${k === 'todos' ? ' on' : ''}" type="button" data-f="${k}">${t}${lim.has(k) ? ' ⭐' : ''}</button>`).join('')}</div>
      <p class="nota" style="margin-top:2px">⭐ = recomendado para ${N()} pela raça e pelo que você marcou.</p>` : ''}
    <div class="blocos" style="margin-top:16px">${s.blocos.map((b, i) => bloco(b, lim, cid + '/' + sid + '/' + i)).join('')}</div>
    ${prox ? `<a class="card-link proxima" href="#/rotina/${c.id}/${prox.id}" style="margin-top:22px"><span class="ico">${prox.emoji}</span><span class="txt"><small class="num-parte">Próxima parte</small><b>${md(prox.titulo)}</b></span>${I.chev}</a>`
      : `<a class="btn sec" href="#/rotina/${c.id}" style="margin-top:22px">Voltar para ${esc(c.nome)}</a>`}
    <p class="nota" style="margin-top:16px">Conteúdo de orientação, baseado em diretrizes veterinárias (AAHA, WSAVA) e estudos publicados. Não substitui a consulta.</p>`;
  return {
    aba: 'rotina', titulo: c.nome, pai: 'rotina/' + c.id, html,
    ligar(root) {
      ligarBlocos(root);
      const f = root.querySelector('#filtros');
      if (f) f.querySelectorAll('.chip').forEach((b) => { b.onclick = () => {
        f.querySelectorAll('.chip').forEach((x) => x.classList.toggle('on', x === b)); const k = b.dataset.f;
        root.querySelectorAll('.exer').forEach((e) => { e.hidden = !(k === 'todos' || (e.dataset.tags || '').split(',').includes(k) || (e.dataset.tags || '').includes('geral')); });
      }; });
    },
  };
}

// ---------- peças visuais (o texto do conteúdo não muda, só a forma) ----------
// separa um item em título curto + detalhe: "**Título:** detalhe", "Título: detalhe" ou 1ª frase + resto
function partes(t) {
  const s = pers(String(t || '')).trim(); let m;
  const limpa = (d) => cap(d.replace(/^[\s,:;.–-]+/, '').trim());
  if ((m = s.match(/^\*\*(.+?)\*\*([\s\S]*)$/))) return { tit: m[1].replace(/[\s:.,;]+$/, ''), det: limpa(m[2]) };
  if ((m = s.match(/^([^:.!?]{3,52}):\s+([\s\S]+)$/))) return { tit: m[1], det: cap(m[2]) };
  if ((m = s.match(/^([\s\S]{6,90}?[.!?])\s+([\s\S]+)$/))) return { tit: m[1], det: m[2] };
  return { tit: s, det: '' };
}
// emoji do assunto, para os cartões de dica
const EMOJIS = [[/água|beb|hidrat|xixi/i, '💧'], [/morn|aquec|quente/i, '🔥'], [/banguela|dente|boca|gengiva|escova/i, '🦷'], [/textura|papinha|amolec|úmida/i, '🥄'],
  [/porç|refeiç|quantidade/i, '🍽️'], [/pote|tigela/i, '🥣'], [/calmo|lugar|canto/i, '🛋️'], [/horário|rotina|mesmo hor/i, '⏰'], [/troca/i, '🔄'], [/filhote/i, '🐶'],
  [/rim|coração|fígado|doença/i, '🩺'], [/tempero|sal|alho|cebola|comida de gente/i, '🧂'], [/hemograma|sangue|anemia/i, '🩸'], [/urina/i, '🧪'], [/bioquím|sdma|creatinina/i, '🧬'],
  [/pressão/i, '🩺'], [/tireoide/i, '🦋'], [/sopro|ecocard|nt-probnp/i, '❤️'], [/olho/i, '👁️'], [/ouvido/i, '👂'], [/escore|músculo|peso/i, '⚖️'], [/luz|noite|escuro/i, '💡'],
  [/passeio|caminh|rua/i, '🌳'], [/cama|dormir/i, '🛏️'], [/tapete|piso|escorreg/i, '🧶'], [/música|som/i, '🎵'], [/petisco|prêmio|ração/i, '🍪'], [/remédio|comprimido|dose|cartela/i, '💊'],
  [/mão|toque|tocar|carinho/i, '🤲'], [/foto|vídeo|film/i, '📷'], [/anot|lista|resumo|diário|leve/i, '📝'], [/veterin|consulta/i, '🩺'], [/fonte|chafariz/i, '⛲'], [/seringa/i, '💉'],
  [/barreira|móve|preso/i, '🚧'], [/fal|chame|voz/i, '🗣️'], [/frio|calor|sol/i, '🌤️'], [/brinc|faro|cheir/i, '👃'], [/calmante|gente/i, '🚫']];
const emojiDe = (t, d = '') => (EMOJIS.find(([re]) => re.test(t)) || EMOJIS.find(([re]) => re.test(d)) || [0, '✨'])[1];
const chaveDe = (t) => 'k' + hash(t);

// cartões de dica em grade de 2 colunas: título curto + toque para ver o detalhe + "já faço"
function dicasHtml(itens, o = {}) {
  const jf = LS.get('jafaco', {}); const rot = o.rotulo || 'Já faço';
  const ks = itens.map((x) => chaveDe(String(x))); const n = o.jafaco === false ? 0 : ks.filter((k) => jf[k]).length;
  return `<div class="dicas-bloco" data-dicas>
    ${o.titulo ? `<div class="bloco-cab"><div class="bloco-tit">${md(o.titulo)}</div>${o.jafaco === false ? '' : `<span class="conta-jf"><b>${n}</b>/${itens.length} ${rot.toLowerCase()}</span>`}</div>` : ''}
    <div class="dicas">${itens.map((x, i) => { const p = partes(x); const k = ks[i]; const on = o.jafaco !== false && jf[k];
      return `<div class="dica-c dobra${on ? ' feito' : ''}" data-card><button class="topo-dica" type="button" data-abre${p.det ? '' : ' data-so-jf'}><span class="em">${o.emoji || emojiDe(p.tit, p.det)}</span><b>${md(p.tit)}</b>${p.det ? '<span class="mais-i" aria-hidden="true">+</span>' : ''}</button>
        <div class="det">${p.det ? `<p>${md(p.det)}</p>` : ''}${o.jafaco === false ? '' : `<button class="jf${on ? ' on' : ''}" type="button" data-jf="${k}">${I.check} ${rot}</button>`}</div></div>`; }).join('')}</div></div>`;
}
// lista de "não faça" ou de alerta: linhas com ✕ / ⚠
function linhasHtml(itens, tipo, titulo) {
  return `<div class="linhas-bloco ${tipo}">${titulo ? `<div class="bloco-tit">${tipo === 'evite' ? '✕ ' : '⚠️ '}${md(titulo)}</div>` : ''}${itens.map((x) => { const p = partes(x); return `
    <div class="linha-x dobra" data-card${p.det ? ' data-abre' : ''}><span class="xi">${tipo === 'evite' ? '✕' : tipo === 'faca' ? '✓' : '!'}</span><div><b>${md(p.tit)}</b>${p.det ? `<p class="clamp">${md(p.det)}</p>` : ''}</div></div>`; }).join('')}</div>`;
}
// passos numerados num carrossel horizontal
function carrosselHtml(itens, titulo) {
  return `<div class="carrossel-bloco">${titulo ? `<div class="bloco-cab"><div class="bloco-tit">${md(titulo)}</div><span class="conta-jf">${itens.length} passos · deslize →</span></div>` : ''}
    <div class="carrossel">${itens.map((x, i) => { const p = partes(x); return `<div class="passo-c"><span class="nump">${i + 1}<small>/${itens.length}</small></span><b>${md(p.tit)}</b>${p.det ? `<p>${md(p.det)}</p>` : ''}</div>`; }).join('')}</div></div>`;
}
// parágrafo longo: a 1ª frase fica à vista, o resto em "ler mais"
function leadHtml(t, cls = '') {
  const s = pers(String(t || '')); if (s.length <= 150) return `<p class="lead-p ${cls}">${md(s)}</p>`;
  const m = s.match(/^([\s\S]{20,160}?[.!?:])\s+([\s\S]+)$/); if (!m) return `<p class="lead-p ${cls}">${md(s)}</p>`;
  return `<div class="lead dobra ${cls}" data-card><p>${md(m[1])}</p><div class="det"><p>${md(m[2])}</p></div><button class="ler-mais" type="button" data-abre>Ler mais</button></div>`;
}
const ICO_AVISO = { at: '⚠️', ob: '💡', vd: '✅' };
function avisoHtml(cor, titulo, x) {
  const s = pers(String(x || '')); const longo = s.length > 120;
  let tit = titulo, det = s; if (!tit) { const p = partes(s); tit = p.tit; det = p.det; }
  return `<div class="aviso-c ${cor || 'vd'} dobra" data-card${longo ? ' data-abre' : ''}><span class="ic">${ICO_AVISO[cor] || '💡'}</span><div><b>${md(tit)}</b>${det ? `<p class="${longo ? 'clamp' : ''}">${md(det)}</p>` : ''}${longo ? '<span class="ler-mais-i">ler mais</span>' : ''}</div></div>`;
}
const EVITE = /n[ãa]o (fazer|faça|fa[çc]a)|evite|nunca|não dê/i;
const ALERTA = /leve ao veterin|vá logo|sinais|quando ligar|urg/i;
function bloco(b, lim, chave) {
  switch (b.t) {
    case 'p': return leadHtml(b.x);
    case 'lista': {
      if (EVITE.test(b.titulo || '')) return linhasHtml(b.itens, 'evite', b.titulo);
      if (ALERTA.test(b.titulo || '')) return linhasHtml(b.itens, 'alerta', b.titulo);
      return dicasHtml(b.itens, { titulo: b.titulo || 'Dicas', rotulo: /exame/i.test(b.titulo || '') ? 'Já pedi' : /preparad/i.test(b.titulo || '') ? 'Pronto' : 'Já faço' });
    }
    case 'passos': return carrosselHtml(b.itens, b.titulo || 'Passo a passo');
    case 'aviso': return avisoHtml(b.cor, b.titulo, b.x);
    case 'exercicio': {
      const rec = lim && b.tags && b.tags.some((t) => lim.has(t));
      return `<article class="exer${rec ? ' rec' : ''}" data-tags="${(b.tags || []).join(',')}" id="ex-${b.id}">
        ${rec ? `<span class="tag t-vd" style="margin-bottom:8px">⭐ Recomendado para ${N()}</span>` : ''}
        <h3>${md(b.nome)}</h3><p class="para">${md(b.para)}</p>
        <div class="meta"><span class="tag t-vd">⏱ ${esc(b.duracao)}</span><span class="tag t-cinza">🔁 ${esc(b.frequencia)}</span><span class="tag t-cinza">${b.passos.length} passos</span></div>
        <details><summary>Ver os passos e quando parar</summary><ol class="ol">${b.passos.map((p) => `<li>${md(p.x || p)}${p.s ? `<small>${p.s >= 60 ? num(p.s / 60) + ' min' : p.s + ' s'}</small>` : ''}</li>`).join('')}</ol>
        ${b.pare && b.pare.length ? `<div class="pare"><b>Pare se…</b><ul class="ul at">${b.pare.map((x) => `<li>${md(x)}</li>`).join('')}</ul></div>` : ''}
        ${b.dica ? `<div class="dica">💡 ${md(b.dica)}</div>` : ''}</details>
        <a class="btn" href="#/fazer/${b.id}">${I.play} Fazer agora, guiado</a></article>`;
    }
    case 'checklist': {
      const st = (LS.get('checks', {})[b.id]) || {}; const n = b.itens.filter((i) => st[i.id]).length;
      return `<div class="checklist" data-ck="${b.id}"><div class="bloco-cab"><div class="bloco-tit">Marque o que já tem</div><span class="conta-jf"><b class="ck-n">${n}</b>/${b.itens.length} prontos</span></div>
        <div class="barra" style="margin-bottom:6px"><i class="ck-barra" style="width:${(n / b.itens.length) * 100}%"></i></div>
        ${b.itens.map((i) => `<button class="ck${st[i.id] ? ' on' : ''}" type="button" data-i="${i.id}" aria-pressed="${!!st[i.id]}"><span class="box">${I.check}</span><span class="em-ck">${emojiDe(i.x)}</span><span><b>${md(i.x)}</b>${i.d ? `<span>${md(i.d)}</span>` : ''}</span></button>`).join('')}</div>`;
    }
    case 'escala': {
      const st = (LS.get('escalas', {})[b.id]) || {};
      return `<div data-esc="${b.id}">${b.titulo ? `<div class="bloco-tit">${md(b.titulo)}</div>` : ''}<p class="nota" style="margin:-4px 0 8px">Toque no que você já viu. O resultado aparece embaixo.</p><div class="checklist">${b.itens.map((i) => `<button class="ck${st[i.id] ? ' on' : ''}" type="button" data-i="${i.id}" aria-pressed="${!!st[i.id]}"><span class="box">${I.check}</span><span><b>${md(i.x)}</b></span></button>`).join('')}</div>
        <div class="resultado-escala" data-res></div></div>`;
    }
    case 'semaforo': return `<div class="semaforo">${b.itens.map((i) => `<div class="sem ${i.cor}"><div class="cab"><span class="pt pt-${i.cor}"></span><b>${md(i.titulo)}</b></div>${(i.itens || [i.x]).map((x) => { const p = partes(x); return `<div class="sem-it dobra" data-card${p.det ? ' data-abre' : ''}><b>${md(p.tit)}</b>${p.det ? `<p class="clamp">${md(p.det)}</p>` : ''}</div>`; }).join('')}</div>`).join('')}</div>`;
    case 'cartoes': return `<div class="dicas">${b.itens.map((i) => `<div class="dica-c tile dobra ${i.cor || ''}" data-card><button class="topo-dica" type="button" data-abre><span class="em">${i.emoji || '•'}</span><b>${md(i.titulo)}</b>${i.tag ? `<span class="tag ${COR_TAG[i.cor] || 't-cinza'}">${esc(i.tag)}</span>` : ''}<span class="mais-i" aria-hidden="true">+</span></button><div class="det"><p>${md(i.x)}</p></div></div>`).join('')}</div>`;
    case 'suplementos': return b.itens.map((i) => { const n = { fraca: 1, moderada: 2, boa: 3 }[i.evidencia] || 1; return `<div class="supl"><div class="cab"><span class="ico">${i.emoji || '💊'}</span><div><h3>${md(i.nome)}</h3><div class="ev">${[1, 2, 3].map((k) => `<i class="${k <= n ? 'on' : ''}"></i>`).join('')} Evidência ${esc(i.evidencia)}</div></div></div>
      <div class="para-que"><span class="tag t-vd">Para quê</span> ${md(i.paraQue)}</div>
      <details class="cien"><summary>O que a ciência diz</summary><p>${md(i.ciencia)}</p></details><div class="perg-vet">🩺 ${md(i.pergunte)}</div></div>`; }).join('');
    case 'perguntas': {
      const sel = new Set(LS.get('perguntas', []));
      return `<div class="bloco-cab"><div class="bloco-tit">Toque para levar na consulta</div><span class="conta-jf"><b class="pq-n">${b.itens.filter((x) => sel.has(pers(x))).length}</b>/${b.itens.length}</span></div><div class="perguntas" data-perg>${b.itens.map((x) => { const t = pers(x); return `<button class="pq-item${sel.has(t) ? ' on' : ''}" type="button" data-q="${esc(t)}"><span class="box">${I.check}</span><span>${md(x)}</span></button>`; }).join('')}</div>
        <p class="nota" style="margin-top:8px">As marcadas entram no "Resumo para o veterinário".</p>
        <div class="linha-btns" style="margin-top:10px"><button class="btn leve pq" type="button" data-copiar-todas>${I.copiar} Copiar as marcadas</button><a class="btn sec pq" href="#/resumo">Ver o resumo</a></div>`;
    }
    case 'alimentos': return `<div data-alim><div class="busca">${I.busca}<input class="campo" type="search" placeholder="Busque: uva, ovo, pão, abóbora…" aria-label="Buscar alimento"></div>
      <div class="chips" style="margin-top:10px"><button class="chip on" type="button" data-f="">Todos</button><button class="chip" type="button" data-f="nao"><i class="pt pt-at"></i>Não pode</button><button class="chip" type="button" data-f="cuidado"><i class="pt pt-ob"></i>Pode, com cuidado</button></div>
      <div class="alim-grade" data-lista></div></div>`;
    case 'widget': return `<div data-widget="${b.w}"></div>`;
    default: return '';
  }
}
// abrir/fechar cartões e "já faço" (vale para todas as telas)
function ligarDobras(root) {
  root.querySelectorAll('[data-abre]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-jf]')) return;
      const card = el.closest('[data-card]') || el; if (el.hasAttribute('data-so-jf')) { const jf = card.querySelector('[data-jf]'); if (jf) jf.click(); return; }
      card.classList.toggle('aberto'); const lm = card.querySelector(':scope > .ler-mais'); if (lm) lm.textContent = card.classList.contains('aberto') ? 'Ler menos' : 'Ler mais';
    });
  });
  root.querySelectorAll('[data-jf]').forEach((b) => {
    b.onclick = (e) => {
      e.stopPropagation(); const k = b.dataset.jf; const jf = LS.get('jafaco', {}); jf[k] = !jf[k]; if (!jf[k]) delete jf[k]; LS.set('jafaco', jf);
      b.classList.toggle('on', !!jf[k]); const card = b.closest('.dica-c'); card.classList.toggle('feito', !!jf[k]);
      if (jf[k]) { patinhasVoando(b); vibrar(20); }
      const bl = b.closest('[data-dicas]'); const c = bl && bl.querySelector('.conta-jf b'); if (c) c.textContent = bl.querySelectorAll('.dica-c.feito').length;
    };
  });
}

function ligarBlocos(root) {
  // checklists
  root.querySelectorAll('[data-ck]').forEach((box) => {
    const id = box.dataset.ck;
    box.querySelectorAll('.ck').forEach((b) => { b.onclick = () => {
      const all = LS.get('checks', {}); const st = all[id] || {}; st[b.dataset.i] = !st[b.dataset.i]; all[id] = st; LS.set('checks', all);
      b.classList.toggle('on', st[b.dataset.i]); b.setAttribute('aria-pressed', !!st[b.dataset.i]);
      const tot = box.querySelectorAll('.ck').length, n = box.querySelectorAll('.ck.on').length;
      box.querySelector('.ck-n').textContent = n; box.querySelector('.ck-barra').style.width = (n / tot * 100) + '%';
      if (n === tot) toast('Casa pronta! ' + pers('{O} {nome}') + ' agradece.');
    }; });
  });
  // escalas
  root.querySelectorAll('[data-esc]').forEach((box) => {
    const id = box.dataset.esc; const def = acharBloco((b) => b.t === 'escala' && b.id === id);
    const pinta = () => {
      const n = box.querySelectorAll('.ck.on').length; const fx = def.faixas.find((f) => n >= f.min && n <= f.max) || def.faixas[def.faixas.length - 1];
      const r = box.querySelector('[data-res]'); r.className = 'resultado-escala ' + fx.cor;
      r.innerHTML = `<div style="display:flex;gap:12px;align-items:center"><span class="n">${n}</span><span class="pequeno" style="color:var(--ink)">de ${def.itens.length} marcados</span></div><p style="margin-top:8px;font-size:14.5px">${md(fx.x)}</p>`;
    };
    box.querySelectorAll('.ck').forEach((b) => { b.onclick = () => {
      const all = LS.get('escalas', {}); const st = all[id] || {}; st[b.dataset.i] = !st[b.dataset.i]; all[id] = st; LS.set('escalas', all);
      b.classList.toggle('on', st[b.dataset.i]); b.setAttribute('aria-pressed', !!st[b.dataset.i]); pinta();
    }; });
    pinta();
  });
  // perguntas para o veterinário
  root.querySelectorAll('[data-perg]').forEach((box) => {
    box.querySelectorAll('.pq-item').forEach((b) => { b.onclick = () => {
      const sel = new Set(LS.get('perguntas', [])); const q = b.dataset.q; sel.has(q) ? sel.delete(q) : sel.add(q); LS.set('perguntas', [...sel]); b.classList.toggle('on', sel.has(q)); const pn = root.querySelector('.pq-n'); if (pn) pn.textContent = box.querySelectorAll('.pq-item.on').length;
    }; });
  });
  root.querySelectorAll('[data-copiar-todas]').forEach((b) => { b.onclick = () => {
    const sel = LS.get('perguntas', []); if (!sel.length) { toast('Marque primeiro as perguntas que quer levar.'); return; }
    copiar('Perguntas para o veterinário sobre ' + pers('{o} {nome}') + ':\n' + sel.map((q, i) => (i + 1) + '. ' + q).join('\n'));
  }; });
  // alimentos
  root.querySelectorAll('[data-alim]').forEach((box) => {
    const inp = box.querySelector('input'); const lista = box.querySelector('[data-lista]'); let filtro = '';
    const pinta = () => {
      const q = sem(inp.value.trim());
      const itens = (window.ALIMENTOS || []).filter((a) => (!filtro || a.st === filtro) && (!q || sem(a.nome + ' ' + (a.termos || '')).includes(q)));
      lista.innerHTML = itens.length ? itens.map((a) => `<div class="alim-c dobra ${a.st === 'nao' ? 'at' : 'ob'}" data-card data-abre><span class="xi">${a.st === 'nao' ? '✕' : '✓'}</span><div><b>${md(a.nome)}</b><span class="st">${a.st === 'nao' ? 'Não pode' : 'Pode, com cuidado'}</span><p class="clamp">${md(a.x)}</p></div></div>`).join('')
        : `<div class="vazio"><div class="e">🤔</div>Não achei "${esc(inp.value)}". Na dúvida, não dê e pergunte ao veterinário.</div>`;
    };
    inp.oninput = () => { pinta(); ligarDobras(lista); };
    box.querySelectorAll('.chip').forEach((c) => { c.onclick = () => { filtro = c.dataset.f; box.querySelectorAll('.chip').forEach((x) => x.classList.toggle('on', x === c)); pinta(); ligarDobras(lista); }; });
    pinta();
  });
  // widgets
  root.querySelectorAll('[data-widget]').forEach((el) => { const w = WIDGETS[el.dataset.widget]; if (w) w(el); });
  ligarAcoes(root);
}
function acharBloco(fn) {
  for (const c of CUIDADOS) for (const s of c.secoes) for (const b of s.blocos) if (fn(b)) return Object.assign({ _c: c, _s: s }, b);
  return null;
}

// ---------- widgets ----------
const WIDGETS = {
  remedios: wRemedios, calendario: wCalendario, 'doencas-raca': wDoencasRaca, carocos: wCarocos, contador: wContador,
};
function wRemedios(el) {
  const rems = LS.get('remedios', []); const doses = LS.get('doses', {}); const hj = doses[hoje()] || {};
  const dias7 = Array.from({ length: 7 }, (_, i) => somaDias(hoje(), i - 6));
  el.innerHTML = `${rems.length ? `<div class="pilha">${rems.map((r) => {
    const prox = r.horarios.find((hh) => !hj[r.id + '@' + hh]);
    return `<div class="rem" data-r="${r.id}"><div class="cab"><span class="ico">💊</span><div class="txt"><b>${esc(r.nome)}</b><span>${esc(r.para || '')}</span></div><button class="apagar" type="button" data-edit="${r.id}" aria-label="Editar">${I.editar.replace('<svg', '<svg width="18" height="18"')}</button></div>
      ${r.inst ? `<div class="inst">📋 ${esc(r.inst)}</div>` : ''}
      <div class="doses">${r.horarios.map((hh) => { const dada = hj[r.id + '@' + hh]; return `<button class="dose${dada ? ' dada' : ''}" type="button" data-dose="${r.id}@${hh}">${dada ? I.check.replace('<svg', '<svg style="stroke:currentColor;stroke-width:3;fill:none"') : '🕗'} ${hh} · ${dada ? 'dei às ' + dada : 'dei a dose'}</button>`; }).join('')}</div>
      <div class="rod"><span class="lemb">${I.sino.replace('<svg', '<svg width="16" height="16"')} ${r.lembrete ? (prox ? 'Lembrete às ' + prox : 'Doses de hoje feitas') : 'Lembrete desligado'}</span><button class="interruptor${r.lembrete ? ' on' : ''}" type="button" data-lemb="${r.id}" aria-label="Lembrete"></button></div>
      <div class="historico-doses">Últimos 7 dias<div class="semana-doses">${dias7.map((d) => { const dd = doses[d] || {}; const ok = r.horarios.every((hh) => dd[r.id + '@' + hh]); return `<i class="${ok ? 'on' : ''}" title="${fData(d)}"></i>`; }).join('')}</div></div>
    </div>`; }).join('')}</div>` : `<div class="card soft vazio"><div class="e">💊</div>Nenhum remédio cadastrado. Cadastre o que o veterinário receitou, com o horário, para não esquecer nem repetir dose.</div>`}
    <button class="btn sec" type="button" data-novo style="margin-top:12px">${I.mais} Cadastrar remédio ou suplemento</button>
    <p class="nota" style="margin-top:8px">No app de verdade, o lembrete chega como notificação no celular. Aqui no demo, ele só aparece na tela.</p>`;
  el.querySelectorAll('[data-dose]').forEach((b) => { b.onclick = () => {
    const d = LS.get('doses', {}); const dd = d[hoje()] || {}; const k = b.dataset.dose;
    if (dd[k]) delete dd[k]; else { dd[k] = agoraHM(); vibrar(20); toast('Dose registrada às ' + dd[k] + '.'); }
    d[hoje()] = dd; LS.set('doses', d); wRemedios(el);
  }; });
  el.querySelectorAll('[data-lemb]').forEach((b) => { b.onclick = () => { const l = LS.get('remedios', []); const r = l.find((x) => x.id === b.dataset.lemb); r.lembrete = !r.lembrete; LS.set('remedios', l); wRemedios(el); }; });
  el.querySelectorAll('[data-edit]').forEach((b) => { b.onclick = () => folhaRemedio(el, b.dataset.edit); });
  el.querySelector('[data-novo]').onclick = () => folhaRemedio(el, null);
}
function folhaRemedio(el, id) {
  const l = LS.get('remedios', []); const r = id ? l.find((x) => x.id === id) : { nome: '', para: '', inst: '', horarios: ['08:00'], lembrete: true };
  let hor = [...r.horarios];
  abrirFolha(`<h2>${id ? 'Editar' : 'Cadastrar'} remédio</h2><p class="sub">Escreva como está na receita do veterinário. O app não sugere remédio nem dose.</p>
    <label class="lbl" for="rn">Nome do remédio ou suplemento</label><input class="campo" id="rn" maxlength="60" value="${esc(r.nome)}" placeholder="Como está na receita">
    <label class="lbl" for="rp">Para quê (opcional)</label><input class="campo" id="rp" maxlength="80" value="${esc(r.para)}" placeholder="Ex.: coração, articulações">
    <label class="lbl" for="ri">Como o veterinário receitou</label><textarea class="campo" id="ri" maxlength="240" placeholder="Copie a instrução da receita (quantidade, com ou sem comida, por quantos dias)">${esc(r.inst)}</textarea>
    <label class="lbl">Horários</label><div class="hor-lista" id="hl"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px"><span style="font-weight:600">Lembrete</span><button class="interruptor${r.lembrete ? ' on' : ''}" type="button" id="rl" aria-label="Lembrete"></button></div>
    <button class="btn" type="button" id="rs" style="margin-top:18px">Salvar</button>
    ${id ? '<button class="btn sec" type="button" id="rx" style="margin-top:10px;color:var(--at);border-color:var(--at-line)">Apagar este remédio</button>' : ''}`, (cx) => {
    const hl = cx.querySelector('#hl'); let lemb = r.lembrete;
    const pinta = () => {
      hl.innerHTML = hor.map((hh, i) => `<span class="chip">${hh}<button type="button" data-x="${i}" aria-label="Tirar horário" style="border:0;background:none;padding:0 0 0 4px;color:var(--muted)">✕</button></span>`).join('') +
        `<input class="campo" type="time" id="nh" value="20:00" aria-label="Novo horário"><button class="btn leve pq" type="button" id="ah">${I.mais}</button>`;
      hl.querySelectorAll('[data-x]').forEach((b) => { b.onclick = () => { hor.splice(+b.dataset.x, 1); pinta(); }; });
      hl.querySelector('#ah').onclick = () => { const v = hl.querySelector('#nh').value; if (v && !hor.includes(v)) { hor.push(v); hor.sort(); pinta(); } };
    };
    pinta();
    cx.querySelector('#rl').onclick = (e) => { lemb = !lemb; e.currentTarget.classList.toggle('on', lemb); };
    cx.querySelector('#rs').onclick = () => {
      const nome = cx.querySelector('#rn').value.trim(); if (nome.length < 2) { toast('Escreva o nome do remédio.'); return; }
      if (!hor.length) { toast('Coloque pelo menos um horário.'); return; }
      const novo = { id: id || 'r' + uid(), nome, para: cx.querySelector('#rp').value.trim(), inst: cx.querySelector('#ri').value.trim(), horarios: hor, lembrete: lemb };
      const lista = LS.get('remedios', []); const i = lista.findIndex((x) => x.id === novo.id); if (i >= 0) lista[i] = novo; else lista.push(novo);
      LS.set('remedios', lista); fecharFolha(); wRemedios(el); toast('Remédio salvo.');
    };
    const rx = cx.querySelector('#rx'); if (rx) rx.onclick = () => { LS.set('remedios', LS.get('remedios', []).filter((x) => x.id !== id)); fecharFolha(); wRemedios(el); };
  });
}
function wCalendario(el) {
  const c = LS.get('consulta', {}); let ult = c.ultima;
  const respQuiz = P.respostas && P.respostas.consulta;
  const prox = ult ? somaDias(ult, 182) : null; const falta = prox ? difDias(hoje(), prox) : null;
  el.innerHTML = `<div class="card ${falta != null && falta <= 30 ? 'verde' : ''}">
    <span class="rotulo">Check-up no veterinário · a cada 6 meses</span>
    ${ult ? `<div style="display:flex;align-items:center;gap:14px;margin-top:12px"><div class="prox" style="margin:0;padding:0;border:0"><div class="dias-n${falta < 0 ? ' at' : ''}" style="font-size:34px">${Math.abs(falta)}</div></div>
      <div><b style="font-size:16px">${falta > 0 ? 'dias para o próximo check-up' : falta === 0 ? 'O check-up é hoje' : 'dias de atraso'}</b><p class="pequeno">Última consulta: ${fDataAno(ult)} · próxima: ${fDataAno(prox)}</p></div></div>`
      : `<p style="margin-top:10px">${respQuiz ? `No diagnóstico você respondeu: <b>${esc(respQuiz)}</b>. ` : ''}Quando foi a última consulta d${pers('{o}')} ${N()}?</p>`}
    <label class="lbl" for="uc">Data da última consulta</label>
    <div class="linha-btns"><input class="campo" type="date" id="uc" max="${hoje()}" value="${esc(ult || '')}"><button class="btn pq" type="button" id="hj">Foi hoje</button></div>
  </div>`;
  const salvar = (v) => { if (!v) return; LS.set('consulta', { ultima: v }); wCalendario(el); toast('Anotado. O app conta os 6 meses.'); };
  el.querySelector('#uc').onchange = (e) => salvar(e.target.value);
  el.querySelector('#hj').onclick = () => salvar(hoje());
}
function wDoencasRaca(el) {
  if (!RC) { el.innerHTML = '<div class="card soft vazio">Sem ficha para esta raça.</div>'; return; }
  const at = emAtencao(radarAtual());
  el.innerHTML = `<div class="card verde"><div style="display:flex;gap:12px;align-items:center">${fotoHtml()}<div><b style="font-size:16px">${esc(P.usaPorte ? 'Cães de porte ' + porteTxt() : racaNome())}</b>
      <p class="pequeno" style="color:var(--verde-esc)">Vive em média ${num(RC.vive)} anos · idoso a partir dos ${RC.idosoAos}</p></div></div></div>
    <div class="pilha" style="margin-top:12px">${RC.doencas.map((d, i) => `
      <details class="card exer" ${i === 0 ? 'open' : ''} style="padding:14px 16px">
        <summary style="color:var(--ink);font:700 16px/1.3 var(--f-d)">${esc(d.nome)}</summary>
        <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">${SN[d.sinal] ? `<span class="tag ${at.includes(d.sinal) ? 't-at' : 't-cinza'}">${SN[d.sinal].emoji} ${esc(SN[d.sinal].nome)}${at.includes(d.sinal) ? ' · em Atenção' : ''}</span>` : ''}</div>
        <dl class="supl" style="border:0;padding:0;margin-top:4px">
          <dt>O sinal que dá para ver em casa</dt><dd>${esc(d.emCasa)}</dd>
          <dt>O que fazer para atrasar</dt><dd>${esc(d.prevencao)}</dd>
          <dt>O exame para pedir</dt><dd>${esc(d.exame)}</dd>
          <dt>Quanto aparece</dt><dd class="pequeno">${esc(d.frequencia)}${d.idadeInicio ? ' · ' + esc(d.idadeInicio) : ''}</dd>
        </dl></details>`).join('')}</div>
    <p class="nota" style="margin-top:10px">Fonte: pesquisa com estudos por raça (VetCompass, McMillan 2024 e outros). Ter risco não quer dizer que ${pers('{o} {nome}')} vai ter a doença: quer dizer olhar com mais cuidado.</p>`;
}
// --- mapa de caroços ---
// REVISAR VET: a regra de cor (1 cm e 1 mês, ou cresceu = mostrar ao veterinário) é a campanha "See something, do something" (Dra. Sue Ettinger).
function statusCaroco(c) {
  const m = c.medidas; const prim = m[0], ult = m[m.length - 1]; const dias = difDias(prim.data, hoje()); const cresceu = m.length > 1 && ult.cm > prim.cm;
  if (cresceu) return { cor: 'at', t: 'Cresceu: mostre ao veterinário' };
  if (ult.cm >= 1 && dias >= 30) return { cor: 'at', t: 'Regra da ervilha: mostre ao veterinário' };
  if (ult.cm >= 1) return { cor: 'ob', t: `Já tem 1 cm: se continuar até ${fData(somaDias(prim.data, 30))}, mostre ao veterinário` };
  return { cor: 'ob', t: 'Acompanhe: meça de novo em 1 mês' };
}
function corpoCao(vista) {
  // silhueta simples; o contorno sai do "truque" de desenhar as formas com traço grosso por baixo e brancas por cima
  const formas = vista === 'barriga'
    ? '<ellipse cx="170" cy="40" rx="28" ry="26"/><ellipse cx="170" cy="118" rx="52" ry="76"/><rect x="104" y="64" width="24" height="56" rx="12" transform="rotate(35 116 92)"/><rect x="212" y="64" width="24" height="56" rx="12" transform="rotate(-35 224 92)"/><rect x="104" y="142" width="24" height="58" rx="12" transform="rotate(-30 116 170)"/><rect x="212" y="142" width="24" height="58" rx="12" transform="rotate(30 224 170)"/><rect x="163" y="186" width="14" height="24" rx="7"/>'
    : '<rect x="92" y="70" width="172" height="72" rx="36"/><ellipse cx="112" cy="100" rx="34" ry="38"/><ellipse cx="96" cy="74" rx="22" ry="30" transform="rotate(28 96 74)"/><ellipse cx="74" cy="50" rx="31" ry="27"/><rect x="26" y="49" width="48" height="27" rx="13.5"/><rect x="100" y="120" width="21" height="66" rx="10"/><rect x="127" y="122" width="19" height="62" rx="9.5"/><rect x="222" y="116" width="23" height="70" rx="11"/><rect x="247" y="114" width="19" height="66" rx="9.5"/>';
  const rabo = vista === 'barriga' ? '' : '<path d="M258 90 q30 -6 38 -42" fill="none" stroke-linecap="round"/>';
  const det = vista === 'barriga'
    ? '<path class="det" d="M152 38 q0 -6 4 -6M188 38 q0 -6 -4 -6"/><path class="det" d="M170 60 v110"/><circle cx="170" cy="46" r="3" fill="#9DB3AA"/>'
    : '<path class="det" d="M80 30 q26 2 22 44 q-14 6 -22 -12" fill="#F2F6F4"/><circle cx="62" cy="44" r="3.4" fill="#14201B"/><circle cx="29" cy="57" r="5" fill="#14201B"/><path class="det" d="M34 70 q12 6 24 2"/><path class="det" d="M118 150 v8M236 148 v8"/>';
  const espelho = vista === 'dir' ? ' transform="translate(320 0) scale(-1 1)"' : '';
  return `<g${espelho}><g stroke="#9DB3AA" stroke-width="5" fill="#9DB3AA">${formas}</g><g stroke="#9DB3AA" stroke-width="15" fill="none">${rabo}</g><g fill="#fff">${formas}</g><g stroke="#fff" stroke-width="10" fill="none">${rabo}</g>${det}</g>`;
}
let VISTA = 'esq';
function wCarocos(el) {
  const cs = LS.get('carocos', []);
  const VISTAS = [['esq', 'Lado esquerdo'], ['dir', 'Lado direito'], ['barriga', 'Barriga e peito']];
  const naVista = cs.filter((c) => c.vista === VISTA);
  const corN = { at: 'var(--at)', ob: 'var(--ob)' };
  el.innerHTML = `<div class="vistas chips" style="margin:0 -16px 10px">${VISTAS.map(([k, t]) => `<button class="chip${k === VISTA ? ' on' : ''}" type="button" data-v="${k}">${t} <span class="pequeno">${cs.filter((c) => c.vista === k).length || ''}</span></button>`).join('')}</div>
    <div class="mapa"><svg viewBox="0 0 320 215" id="mapaSvg" role="img" aria-label="Corpo do cão: toque para marcar um caroço">${corpoCao(VISTA)}
      ${naVista.map((c) => { const s = statusCaroco(c); const i = cs.indexOf(c) + 1; const ult = c.medidas[c.medidas.length - 1].cm; const r = 7 + Math.min(ult, 3) * 3; return `<g class="marca-c" data-c="${c.id}"><circle cx="${c.x}" cy="${c.y}" r="${r + 5}" fill="${corN[s.cor]}" opacity=".18"/><circle cx="${c.x}" cy="${c.y}" r="${r}" fill="${corN[s.cor]}" stroke="#fff" stroke-width="2.5"/><text x="${c.x}" y="${c.y + 4}" text-anchor="middle" fill="#fff" style="font:800 11px var(--f-d)">${i}</text></g>`; }).join('')}
    </svg><span class="dica-mapa">Toque no corpo para marcar</span></div>
    <div class="pilha" style="margin-top:12px">${cs.length ? cs.map((c, i) => { const s = statusCaroco(c); const u = c.medidas[c.medidas.length - 1]; return `<button class="caroco-it" type="button" data-c="${c.id}" style="width:100%;text-align:left"><span class="n" style="background:${corN[s.cor]}">${i + 1}</span><span class="txt"><b>${esc(c.local)}</b><span>${num(u.cm)} cm · notado em ${fData(c.medidas[0].data)} · ${plural(c.medidas.length, 'medida', 'medidas')}</span><span class="tag ${COR_TAG[s.cor]}" style="margin-top:6px">${esc(s.t)}</span></span>${c.foto ? `<img class="ft" src="${c.foto}" alt="">` : ''}</button>`; }).join('')
      : `<div class="card soft vazio"><div class="e">🔎</div>Nenhum caroço marcado. Faça o passa-mão 1 vez por mês e marque aqui o que achar.</div>`}</div>
    <div class="ervilha" style="margin-top:12px"><span class="bola"></span><div><b style="font-size:15px">A regra da ervilha</b><p class="pequeno">Do tamanho de uma ervilha (1 cm) e está ali há 1 mês? Mostre ao veterinário. Só a punção diz o que é.</p></div></div>`;
  el.querySelectorAll('[data-v]').forEach((b) => { b.onclick = () => { VISTA = b.dataset.v; wCarocos(el); }; });
  const svg = el.querySelector('#mapaSvg');
  svg.addEventListener('click', (e) => {
    const m = e.target.closest('[data-c]'); if (m) { folhaCaroco(el, m.dataset.c); return; }
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    folhaCaroco(el, null, { x: Math.round(p.x), y: Math.round(p.y) });
  });
  el.querySelectorAll('.caroco-it').forEach((b) => { b.onclick = () => folhaCaroco(el, b.dataset.c); });
}
const NOME_VISTA = { esq: 'lado esquerdo', dir: 'lado direito', barriga: 'barriga/peito' };
function folhaCaroco(el, id, pos) {
  const cs = LS.get('carocos', []); const c = id ? cs.find((x) => x.id === id) : null;
  const TAM = [0.5, 1, 1.5, 2, 3];
  let cm = c ? c.medidas[c.medidas.length - 1].cm : 0.5; let foto = c ? c.foto : null;
  const hist = c ? `<div class="card plano" style="margin-top:12px"><span class="rotulo">Medidas</span><table style="width:100%;margin-top:8px;font-size:14px;border-collapse:collapse">${c.medidas.map((m) => `<tr><td style="padding:6px 0;border-bottom:1px solid var(--line)">${fDataAno(m.data)}</td><td style="text-align:right;font-weight:700;border-bottom:1px solid var(--line)">${num(m.cm)} cm</td></tr>`).join('')}</table>
    <p class="pequeno" style="margin-top:10px"><b>${esc(statusCaroco(c).t)}</b></p></div>` : '';
  abrirFolha(`<h2>${c ? esc(c.local) : 'Novo caroço'}</h2><p class="sub">${c ? 'Adicione uma medida nova ou ajuste os dados.' : 'Meça com uma régua, de borda a borda.'}</p>
    ${hist}
    ${c ? '' : `<label class="lbl" for="cl">Onde fica</label><input class="campo" id="cl" maxlength="60" value="${esc(cap(NOME_VISTA[VISTA]))}">`}
    <label class="lbl">${c ? 'Tamanho hoje' : 'Tamanho'}</label><div class="tamanhos">${TAM.map((t) => `<button class="chip${t === cm ? ' on' : ''}" type="button" data-cm="${t}">${t === 3 ? '3 cm ou +' : num(t) + ' cm'}</button>`).join('')}</div>
    <label class="lbl" for="cd">${c ? 'Data da medida' : 'Notei em'}</label><input class="campo" type="date" id="cd" max="${hoje()}" value="${hoje()}">
    ${c ? '' : `<label class="lbl" for="co">Como é (opcional)</label><input class="campo" id="co" maxlength="80" placeholder="Mole, duro, mexe, preso, vermelho…">`}
    <label class="lbl">Foto (opcional)</label><label class="btn sec pq" style="cursor:pointer;width:auto">${I.camera} ${foto ? 'Trocar foto' : 'Tirar ou escolher foto'}<input type="file" accept="image/*" capture="environment" id="cf" hidden></label>
    <img id="cfv" src="${foto || ''}" alt="" style="${foto ? '' : 'display:none;'}width:96px;height:96px;object-fit:cover;border-radius:12px;margin-top:10px">
    <button class="btn" type="button" id="cs" style="margin-top:18px">${c ? 'Salvar medida' : 'Marcar caroço'}</button>
    ${c ? '<button class="btn sec" type="button" id="cx" style="margin-top:10px;color:var(--at);border-color:var(--at-line)">Apagar (o veterinário viu e liberou)</button>' : ''}`, (cx) => {
    cx.querySelectorAll('[data-cm]').forEach((b) => { b.onclick = () => { cm = +b.dataset.cm; cx.querySelectorAll('[data-cm]').forEach((x) => x.classList.toggle('on', x === b)); }; });
    cx.querySelector('#cf').onchange = (e) => { const f = e.target.files[0]; if (!f) return; reduzirFoto(f, (url) => { foto = url; const v = cx.querySelector('#cfv'); v.src = url; v.style.display = 'block'; }); };
    cx.querySelector('#cs').onclick = () => {
      const data = cx.querySelector('#cd').value || hoje(); const lista = LS.get('carocos', []);
      if (c) { const it = lista.find((x) => x.id === c.id); it.medidas.push({ data, cm }); it.medidas.sort((a, b) => (a.data < b.data ? -1 : 1)); it.foto = foto; }
      else lista.push({ id: uid(), vista: VISTA, x: pos.x, y: pos.y, local: cx.querySelector('#cl').value.trim() || cap(NOME_VISTA[VISTA]), obs: cx.querySelector('#co').value.trim(), foto, medidas: [{ data, cm }] });
      if (LS.set('carocos', lista)) { fecharFolha(); wCarocos(el); toast(c ? 'Medida anotada.' : 'Caroço marcado. Meça de novo em 1 mês.'); }
    };
    const x = cx.querySelector('#cx'); if (x) x.onclick = () => { LS.set('carocos', LS.get('carocos', []).filter((k) => k.id !== c.id)); fecharFolha(); wCarocos(el); };
  });
}
const cap = (s) => String(s).replace(/^./, (c) => c.toUpperCase());
function reduzirFoto(arquivo, ok) {
  const leitor = new FileReader();
  leitor.onload = () => { const img = new Image(); img.onload = () => {
    const max = 420; const k = Math.min(1, max / Math.max(img.width, img.height)); const cv = document.createElement('canvas');
    cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k); cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
    ok(cv.toDataURL('image/jpeg', 0.72));
  }; img.src = leitor.result; };
  leitor.readAsDataURL(arquivo);
}
function wContador(el) {
  const d = LS.get('dias', {}); const hj = d[hoje()];
  const ult = Array.from({ length: 30 }, (_, i) => somaDias(hoje(), -i)); const bons = ult.filter((x) => d[x] === 'bom').length; const dif = ult.filter((x) => d[x] === 'dificil').length;
  const tira = Array.from({ length: 14 }, (_, i) => somaDias(hoje(), i - 13));
  el.innerHTML = `<div class="card"><span class="rotulo">Como foi o dia de hoje?</span>
    <div class="contador" style="margin-top:12px"><button type="button" class="bom${hj === 'bom' ? ' on' : ''}" data-d="bom"><span class="e">☀️</span>Dia bom</button><button type="button" class="dificil${hj === 'dificil' ? ' on' : ''}" data-d="dificil"><span class="e">🌧️</span>Dia difícil</button></div>
    <div class="tira" aria-label="Últimos 14 dias">${tira.map((x) => `<i class="${d[x] || ''}" title="${fData(x)}"></i>`).join('')}</div>
    <p class="pequeno" style="margin-top:10px">Nos últimos 30 dias: <b style="color:var(--verde)">${plural(bons, 'dia bom', 'dias bons')}</b> e <b style="color:#8A5E0A">${plural(dif, 'difícil', 'difíceis')}</b>.</p></div>`;
  el.querySelectorAll('[data-d]').forEach((b) => { b.onclick = () => { const x = LS.get('dias', {}); x[hoje()] = x[hoje()] === b.dataset.d ? undefined : b.dataset.d; LS.set('dias', x); if (x[hoje()] === 'bom') { patinhasVoando(b); } wContador(el); }; });
}

// ---------- modo guiado (exercício com cronômetro) ----------
let GUIADO = null; let TIMER = null;
function pararTimer() { if (TIMER) { clearInterval(TIMER); TIMER = null; } }
function telaGuia(id) {
  const b = acharBloco((x) => x.t === 'exercicio' && x.id === id); if (!b) return telaNaoAchei();
  if (!GUIADO || GUIADO.id !== id) GUIADO = { id, i: 0, rest: b.passos[0].s || 30, rodando: false, fim: false };
  const g = GUIADO; const p = b.passos[g.i]; const tot = p.s || 30;
  const pai = 'rotina/' + b._c.id + '/' + b._s.id;
  if (g.fim) {
    const tarefa = TAREFAS.find((t) => t.ex === id);
    return { aba: 'rotina', titulo: pers(b.nome).replace(/**/g, ''), pai, html: `<div class="festa"><div class="grande">🐾</div><h1 style="margin-top:10px">Feito!</h1>
      <p class="sub">${esc(b.duracao)} de cuidado com ${oN()}. Pouco e todo dia é o que funciona.</p></div>
      ${tarefa && planoDoDia(hoje()).lista.includes(tarefa) ? `<div class="aviso vd"><p>Marcamos "${esc(tarefa.titulo)}" como feito no plano de hoje.</p></div>` : ''}
      <div class="vao"></div><a class="btn" href="#/hoje">Voltar para o plano de hoje</a><button class="btn sec" type="button" id="denovo" style="margin-top:10px">Fazer de novo</button>`,
      ligar(root) { root.querySelector('#denovo').onclick = () => { GUIADO = null; render(); }; } };
  }
  const C = 2 * Math.PI * 88;
  const html = `<div class="guia"><h2 style="text-align:center;margin-top:4px">${md(b.nome)}</h2>
    <div class="passo-n">Passo ${g.i + 1} de ${b.passos.length}</div>
    <div class="relogio"><svg viewBox="0 0 200 200"><circle class="fundo" cx="100" cy="100" r="88"/><circle class="prog" id="rp" cx="100" cy="100" r="88" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - g.rest / tot)).toFixed(1)}"/></svg><output id="rt">${mmss(g.rest)}</output></div>
    <p class="txt-passo">${md(p.x)}</p>
    <div class="pontos">${b.passos.map((_, i) => `<i class="${i === g.i ? 'on' : i < g.i ? 'feito' : ''}"></i>`).join('')}</div>
    ${b.pare && b.pare.length ? `<div class="pare" style="margin-top:4px"><b>Pare se…</b><ul class="ul at">${b.pare.slice(0, 2).map((x) => `<li>${md(x)}</li>`).join('')}</ul></div>` : ''}
    <div class="ctrl"><button type="button" id="ga" aria-label="Passo anterior" ${g.i === 0 ? 'disabled style="opacity:.4"' : ''}>${I.ant}</button>
      <button type="button" class="play" id="gp" aria-label="${g.rodando ? 'Pausar' : 'Começar'}">${g.rodando ? I.pausa : I.play}</button>
      <button type="button" id="gn" aria-label="Próximo passo">${I.prox}</button></div></div>`;
  return {
    aba: 'rotina', titulo: pers(b.nome).replace(/**/g, ''), pai, html,
    ligar(root) {
      const avancar = () => {
        pararTimer(); vibrar(60);
        if (g.i < b.passos.length - 1) { g.i++; g.rest = b.passos[g.i].s || 30; render(true); }
        else { g.fim = true; g.rodando = false; const t = TAREFAS.find((x) => x.ex === id); if (t && planoDoDia(hoje()).lista.includes(t)) marcarTarefa(t.id, true); render(); }
      };
      const tick = () => {
        g.rest--; const rt = document.getElementById('rt'), rp = document.getElementById('rp');
        if (rt) rt.textContent = mmss(Math.max(0, g.rest)); if (rp) rp.style.strokeDashoffset = (C * (1 - Math.max(0, g.rest) / tot)).toFixed(1);
        if (g.rest <= 0) avancar();
      };
      const iniciar = () => { pararTimer(); TIMER = setInterval(tick, 1000); };
      root.querySelector('#gp').onclick = () => { g.rodando = !g.rodando; pararTimer(); render(true); };
      root.querySelector('#gn').onclick = avancar;
      root.querySelector('#ga').onclick = () => { if (g.i > 0) { pararTimer(); g.i--; g.rest = b.passos[g.i].s || 30; render(true); } };
      if (g.rodando && !TIMER) iniciar();
    },
  };
}
const mmss = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

// ---------- contar a respiração dormindo ----------
// REVISAR VET: corte de 30 por minuto dormindo (consenso ACVIM usa 30 a 35) e o texto de cada faixa.
let RESP = null;
function telaContar() {
  const hist = LS.get('resp', []).slice(-6);
  if (!RESP) RESP = { fase: 'pronto', n: 0, rest: 30 };
  let corpo = '';
  if (RESP.fase === 'pronto') corpo = `<p class="sub" style="text-align:center">Espere ${oN()} estar em sono profundo, deitad${pers('{o}')} e calm${pers('{o}')}. Cada vez que o peito sobe e desce é 1 respiração.</p>
      <button class="toque" type="button" id="ini"><span>Começar<small>30 segundos</small></span></button>`;
  else if (RESP.fase === 'contando') corpo = `<p class="sub" style="text-align:center">Toque no círculo a cada respiração.</p>
      <button class="toque" type="button" id="tq" aria-label="Contar respiração"><span id="tn">${RESP.n}<small id="tr">${RESP.rest} s</small></span></button>`;
  else {
    const rpm = RESP.n * 2; const fx = rpm <= 30 ? ['vd', 'Dentro do esperado', 'Até 30 respirações por minuto, dormindo, costuma ser o esperado. Conte de novo na semana que vem.']
      : rpm <= 35 ? ['ob', 'Um pouco alta', pers('Conte de novo daqui a algumas horas, com {ele} em sono profundo. Se continuar acima de 30, fale com o veterinário nesta semana.')]
        : ['at', 'Alta', pers('Acima de 35 dormindo: fale com o veterinário hoje. Se {ele} estiver com esforço para respirar, língua ou gengiva roxa, ou não conseguir deitar, é emergência.')];
    corpo = `<div class="resultado-escala ${fx[0]}" style="text-align:center;margin-top:16px"><div class="n" style="font-size:56px">${rpm}</div><b>respirações por minuto · ${fx[1]}</b><p style="margin-top:8px;font-size:14.5px">${esc(fx[2])}</p></div>
      ${fx[0] === 'at' ? '<a class="btn at" href="#/emergencia" style="margin-top:12px">Ver a lista de emergência</a>' : ''}
      <button class="btn sec" type="button" id="denovo" style="margin-top:12px">Contar de novo</button>`;
  }
  const html = `<h1 style="text-align:center;margin-top:6px">Respiração dormindo</h1>${corpo}
    ${hist.length ? `<div class="secao-tit"><h2>Últimas contagens</h2></div><div class="card plano">${linhaSvg(hist.map((r) => ({ rot: fData(r.data), v: r.rpm })), { max: 60, linha: 30, rotLinha: 'limite: 30', aria: 'Respirações por minuto' })}</div>` : ''}
    <div class="aviso vd" style="margin-top:14px"><div class="at-tit">Por que contar?</div><p>Nos cães com doença na válvula do coração, a respiração dormindo que vai subindo é um dos primeiros sinais de que o coração precisa de ajuda. Contar 1 vez por semana leva 30 segundos.</p></div>`;
  return {
    aba: 'rotina', titulo: 'Contar a respiração', pai: 'rotina', html,
    sair: () => { pararTimer(); if (RESP && RESP.fase !== 'contando') RESP = null; },
    ligar(root) {
      const ini = root.querySelector('#ini');
      if (ini) ini.onclick = () => {
        RESP = { fase: 'contando', n: 0, rest: 30 }; render(true);
        pararTimer(); TIMER = setInterval(() => {
          RESP.rest--; const tr = document.getElementById('tr'); if (tr) tr.textContent = RESP.rest + ' s';
          if (RESP.rest <= 0) {
            pararTimer(); RESP.fase = 'fim'; vibrar(120);
            const l = LS.get('resp', []); l.push({ data: hoje(), rpm: RESP.n * 2 }); LS.set('resp', l.slice(-30));
            if (planoDoDia(hoje()).lista.some((t) => t.id === 't-respirar')) marcarTarefa('t-respirar', true);
            render(true);
          }
        }, 1000);
      };
      const tq = root.querySelector('#tq');
      if (tq) tq.onclick = () => { RESP.n++; document.getElementById('tn').firstChild.nodeValue = RESP.n; tq.classList.remove('pulsa'); void tq.offsetWidth; tq.classList.add('pulsa'); };
      const dn = root.querySelector('#denovo'); if (dn) dn.onclick = () => { RESP = null; render(true); };
    },
  };
}

// ---------- SINAIS: é da idade ou é alerta? ----------
const COR_SINAL = { at: ['Pode ser urgência', 't-at', 'pt-at'], ob: ['Marque consulta', 't-ob', 'pt-ob'], vd: ['Observe em casa', 't-vd', 'pt-vd'] };
let BUSCA_SINAIS = { q: '', cor: '' };
function telaSinais(params) {
  const area = (params && params.get('area')) || ''; if (area !== (BUSCA_SINAIS.area || '')) BUSCA_SINAIS = { q: '', cor: '', area };
  const html = `<h1 style="margin-top:6px">É da idade ou é alerta?</h1>
    <p class="sub">${GUIA.length} sinais que os donos mais veem no velhinho, com o que observar e quando correr.</p>
    <a class="emerg" href="#/emergencia" style="margin-top:14px;padding:14px"><span class="ic" style="width:42px;height:42px">${I.sirene}</span><span style="flex:1"><b style="font-size:17px">Emergência agora</b><span>A lista do "corra para o veterinário"</span></span>${I.chev}</a>
    <div class="busca" style="margin-top:14px">${I.busca}<input class="campo" id="bq" type="search" placeholder="Ex.: tremendo, não come, tosse, xixi…" value="${esc(BUSCA_SINAIS.q)}" aria-label="Buscar sinal"></div>
    <div class="chips" style="margin-top:10px" id="bc"><button class="chip${!BUSCA_SINAIS.cor ? ' on' : ''}" type="button" data-c="">Todos</button>${Object.entries(COR_SINAL).map(([k, v]) => `<button class="chip${BUSCA_SINAIS.cor === k ? ' on' : ''}" type="button" data-c="${k}"><i class="pt ${v[2]}"></i>${v[0]}</button>`).join('')}</div>
    ${BUSCA_SINAIS.area ? `<div style="margin-top:4px"><button class="chip on" type="button" id="limpaArea">${SN[BUSCA_SINAIS.area] ? SN[BUSCA_SINAIS.area].emoji + ' ' + esc(SN[BUSCA_SINAIS.area].nome) : ''} ✕</button></div>` : ''}
    <div id="bl" style="margin-top:8px"></div>`;
  return {
    aba: 'sinais', html,
    ligar(root) {
      const inp = root.querySelector('#bq'), bl = root.querySelector('#bl');
      const pinta = () => {
        const q = sem(BUSCA_SINAIS.q.trim());
        const it = GUIA.filter((g) => (!BUSCA_SINAIS.cor || g.cor === BUSCA_SINAIS.cor) && (!BUSCA_SINAIS.area || g.area === BUSCA_SINAIS.area) && (!q || sem(g.nome + ' ' + g.termos + ' ' + g.resumo).includes(q)));
        const item = (g) => `<a class="sinal-item" href="#/sinais/${g.id}"><span class="em">${g.emoji}<i class="pt ${COR_SINAL[g.cor][2]}"></i></span><span class="txt"><b>${md(g.nome)}</b><span>${md(g.resumo)}</span></span>${I.chev}</a>`;
        if (!it.length) { bl.innerHTML = `<div class="card soft vazio"><div class="e">🔎</div>Não achei "${esc(BUSCA_SINAIS.q)}". Tente outra palavra, ou veja a lista de emergência.</div>`; return; }
        if (q || BUSCA_SINAIS.area) { bl.innerHTML = `<div class="card plano" style="padding:2px 14px">${it.map(item).join('')}</div>`; return; }
        const grupos = [...SINAIS7.map((s) => [s.id, s.emoji + ' ' + s.nome]), ['outro', '👁️ Olhos, ouvidos, pele e nervos']];
        bl.innerHTML = grupos.map(([k, t]) => { const g = it.filter((x) => (x.area === k) || (k === 'outro' && !SN[x.area])); return g.length ? `<div class="secao-tit" style="margin-top:18px"><h2 style="font-size:16px">${esc(t)}</h2><span class="pequeno">${g.length}</span></div><div class="card plano" style="padding:2px 14px">${g.map(item).join('')}</div>` : ''; }).join('');
      };
      inp.oninput = () => { BUSCA_SINAIS.q = inp.value; pinta(); };
      root.querySelectorAll('#bc .chip').forEach((c) => { c.onclick = () => { BUSCA_SINAIS.cor = c.dataset.c; root.querySelectorAll('#bc .chip').forEach((x) => x.classList.toggle('on', x === c)); pinta(); }; });
      const la = root.querySelector('#limpaArea'); if (la) la.onclick = () => { BUSCA_SINAIS.area = ''; location.hash = '#/sinais'; };
      pinta();
    },
  };
}
function telaSinal(id) {
  const g = GUIA.find((x) => x.id === id); if (!g) return telaNaoAchei();
  const c = COR_SINAL[g.cor]; const cu = g.cuidado && CU[g.cuidado];
  const html = `<div class="cab-sinal"><span class="em">${g.emoji}</span><div><h1 style="font-size:26px">${md(g.nome)}</h1><span class="tag ${c[1]}" style="margin-top:8px">${c[0]}</span></div></div>
    <p class="sub" style="margin-top:12px">${md(g.resumo)}</p>
    <div class="daidade-c dobra" data-card data-abre style="margin-top:14px"><span class="q">É da<br>idade?</span><p class="clamp">${md(g.daIdade)}</p></div>
    <div class="semaforo" style="margin-top:14px">
      <div class="sem at"><div class="cab"><span class="pt pt-at"></span><b>Vá agora ao veterinário se…</b></div>${g.urgencia.map((x) => `<div class="sem-it"><b>${md(x)}</b></div>`).join('')}</div>
      <div class="sem ob"><div class="cab"><span class="pt pt-ob"></span><b>Marque consulta nos próximos dias se…</b></div>${g.consulta.map((x) => `<div class="sem-it"><b>${md(x)}</b></div>`).join('')}</div>
    </div>
    <div class="vao"></div>
    ${dicasHtml(g.podeSer, { titulo: 'O que pode ser', jafaco: false, emoji: '🔍' })}
    <p class="nota" style="margin-top:6px">Toque em cada um para ver mais. O app não diagnostica: só o exame diz o que é.</p>
    <div class="vao"></div>
    ${carrosselHtml(g.observar, 'O que observar em casa')}
    <div class="dizer" style="margin-top:16px"><span class="rotulo">O que dizer ao veterinário</span><q>${esc(pers(g.dizer))}</q>
      <div class="linha-btns"><button class="btn pq" type="button" data-copiar="${esc(pers(g.dizer))}">${I.copiar} Copiar</button><button class="btn pq" type="button" id="anotar">${I.diario} Anotar no diário</button></div></div>
    ${cu ? `<a class="card-link" href="#/rotina/${cu.id}" style="margin-top:14px"><span class="ico">${icoCuidado(cu.id)}</span><span class="txt"><b>Na rotina: ${esc(cu.nome)}</b><span>${md(cu.frase)}</span></span>${I.chev}</a>` : ''}
    <a class="card-link" href="#/emergencia" style="margin-top:10px"><span class="ico at">${I.sirene}</span><span class="txt"><b>Lista de emergência</b><span>Quando é para correr, e o que fazer no caminho</span></span>${I.chev}</a>`;
  return {
    aba: 'sinais', titulo: 'Sinais', pai: 'sinais', html,
    ligar(root) {
      ligarAcoes(root);
      root.querySelector('#anotar').onclick = () => {
        const l = LS.get('diario', []); l.unshift({ id: uid(), data: hoje(), texto: 'Sinal: ' + g.nome.replace(/\*\*/g, '') + '. ', sinal: g.area }); LS.set('diario', l);
        toast('Anotado no diário. Complete lá com o que você viu.'); setTimeout(() => { location.hash = '#/diario'; }, 700);
      };
    },
  };
}

// ---------- EMERGÊNCIA ----------
function telaEmergencia() {
  const E = window.EMERGENCIA || { correr: [], caminho: [], naoFaca: [], levar: [], antes: [] }; const em = LS.get('emerg', {});
  const html = `<section class="emerg-cab"><span class="ic" style="display:grid;place-items:center;width:52px;height:52px;border-radius:16px;background:rgba(255,255,255,.16)">${I.sirene.replace('<svg', '<svg width="30" height="30"')}</span>
      <h1 style="margin-top:12px;color:#fff">Corra para o veterinário 24 horas se ${oN()}…</h1><p>Não espere amanhecer. Toque em cada sinal para ver os detalhes.</p></section>
    ${em.tel ? `<a class="btn at" href="tel:${esc(em.tel.replace(/[^\d+]/g, ''))}" style="margin-top:12px">${I.tel} Ligar: ${esc(em.nome || 'pronto-socorro')} · ${esc(em.tel)}</a>` : ''}
    <div class="dicas" style="margin-top:14px">${E.correr.map((x) => `<div class="dica-c tile at dobra" data-card><button class="topo-dica" type="button" data-abre><span class="em">${x.emoji}</span><b>${md(x.t)}</b><span class="mais-i" aria-hidden="true">+</span></button><div class="det"><p>${md(x.x)}</p></div></div>`).join('')}</div>
    <div class="vao"></div>
    ${carrosselHtml(E.caminho, 'No caminho')}
    <div class="vao"></div>
    ${linhasHtml(E.naoFaca, 'evite', 'Não faça')}
    <div class="vao"></div>
    ${linhasHtml(E.levar, 'faca', 'Leve com você')}
    <div class="vao"></div>
    ${dicasHtml(E.antes, { titulo: 'Deixe pronto hoje', rotulo: 'Já fiz' })}
    <div class="card" style="margin-top:12px"><span class="rotulo">Seu pronto-socorro 24 h</span>
      <label class="lbl" for="en">Nome da clínica</label><input class="campo" id="en" maxlength="60" placeholder="Nome da clínica" value="${esc(em.nome || '')}">
      <label class="lbl" for="et">Telefone</label><input class="campo" id="et" type="tel" maxlength="20" placeholder="(11) 99999-9999" value="${esc(em.tel || '')}">
      <button class="btn" type="button" id="es" style="margin-top:12px">Salvar</button></div>
    <p class="nota" style="margin-top:12px">Lista de orientação, não substitui o atendimento. Na dúvida, ligue para o veterinário.</p>`;
  return { aba: 'sinais', titulo: 'Emergência', pai: 'hoje', semSos: true, html,
    ligar(root) { root.querySelector('#es').onclick = () => { LS.set('emerg', { nome: root.querySelector('#en').value.trim(), tel: root.querySelector('#et').value.trim() }); toast('Salvo. O botão de ligar aparece no topo desta tela.'); render(true); }; } };
}

// ---------- PERFIL ----------
function telaPerfil() {
  const cnt = contagem(radarSimples(P.radar));
  const html = `<div class="perfil-cab">${fotoHtml('g', true)}<h1>${N()}</h1><p class="sub" style="margin-top:4px">${esc(racaNome())} · ${fem() ? 'fêmea' : 'macho'} · ${P.idade} aninhos</p>
      <span class="tag ${P.origem === 'quiz' ? 't-vd' : 't-cinza'}" style="margin-top:10px">${P.origem === 'quiz' ? 'Cadastro do diagnóstico de ' + fDataAno(dISO(new Date(P.criadoEm))) : 'Modo demonstração'}</span></div>
    <dl class="dados" style="margin-top:16px">
      <div><dt>Sexo</dt><dd>${fem() ? 'Fêmea' : 'Macho'}</dd></div>
      <div><dt>Porte</dt><dd>${cap(porteTxt())}</dd></div>
      <div><dt>Raça</dt><dd>${esc(racaNome())}</dd></div>
      <div><dt>Idade</dt><dd>${P.idade} anos</dd></div>
      <div><dt>Idade humana</dt><dd>~${P.idadeHumana} anos<small>tabela por porte (AVMA)</small></dd></div>
      <div><dt>Fase da vida</dt><dd>${fase()}</dd></div>
      <div><dt>Vive em média</dt><dd>${num(F.vive)} anos<small>${P.usaPorte || /^srd/.test(P.fichaId) ? 'pelo porte' : 'média da raça'}</small></dd></div>
      <div><dt>Idoso a partir de</dt><dd>${F.idosoAos} anos<small>últimos 25% da vida (AAHA)</small></dd></div>
    </dl>
    <div class="secao-tit"><h2>Radar inicial</h2><span class="pequeno">${P.origem === 'quiz' ? 'do diagnóstico' : 'exemplo'}</span></div>
    <div class="card plano"><div class="contagem" style="margin-top:0">${SINAIS7.map((s) => `<span class="tag ${ROT_ST[P.radar[s.id].st][1]}">${s.emoji} ${esc(s.nome)}</span>`).join('')}</div>
      <p class="pequeno" style="margin-top:10px">Você acompanhava ${cnt.atencao + cnt.observar} de 7 sinais. ${P.radar && Object.values(P.radar).some((x) => x.raca) ? 'Os marcados como risco da raça subiram para Atenção.' : ''}</p></div>
    <div class="secao-tit"><h2>Riscos da raça</h2><a href="#/rotina/prevencao/doencas-raca">Ver ficha</a></div>
    <div class="card plano"><ul class="ul at">${(F.doencas || []).map((d) => `<li>${esc(d)}</li>`).join('')}</ul></div>
    <div class="secao-tit"><h2>Registros</h2></div>
    <div class="lista-cards">
      <a class="card-link" href="#/resumo"><span class="ico">${I.doc}</span><span class="txt"><b>Resumo para o veterinário</b><span>Dados, remédios, check-ups e caroços numa tela só</span></span>${I.chev}</a>
      <a class="card-link" href="#/diario"><span class="ico">${I.diario}</span><span class="txt"><b>Diário</b><span>${plural(LS.get('diario', []).length, 'anotação', 'anotações')}</span></span>${I.chev}</a>
      <a class="card-link" href="#/dias-bons"><span class="ico">${I.coracao}</span><span class="txt"><b>Dias bons</b><span>Escala de qualidade de vida da semana</span></span>${I.chev}</a>
      <a class="card-link" href="#/assistente"><span class="ico" style="background:#13231D;color:#8FD6C3">${I.chat}</span><span class="txt"><b>Assistente 24h</b><span>Bloqueado no demo</span></span>${I.cadeado.replace('<svg', '<svg width="18" height="18" style="color:var(--muted2)"')}</a>
    </div>
    <div class="secao-tit"><h2>Cadastro</h2></div>
    <div class="lista-cards">
      <a class="card-link" href="#/perfil/editar"><span class="ico">${I.editar}</span><span class="txt"><b>Editar dados</b><span>Nome, sexo, raça, idade e o seu nome</span></span>${I.chev}</a>
      <a class="card-link" href="#/perfil/trocar"><span class="ico">${I.trocar}</span><span class="txt"><b>Trocar para outro cão (demo)</b><span>As 11 raças do diagnóstico</span></span>${I.chev}</a>
    </div>
    <button class="link" type="button" id="zerar" style="margin:18px auto 0;display:block;color:var(--muted)">Apagar os registros do app neste aparelho</button>`;
  return { aba: 'perfil', html, ligar(root) {
    root.querySelector('#zerar').onclick = () => {
      if (!confirm('Apagar check-ups, rotina, remédios, diário e caroços deste aparelho? O cadastro d' + pers('{o} {nome}') + ' continua.')) return;
      CHAVES_APP.forEach((k) => LS.del(k)); LS.set('app-dono', P.criadoEm + '|' + P.origem); toast('Registros apagados.'); render();
    };
  } };
}
function telaEditar() {
  const idsRaca = Object.keys(FICHAS).filter((k) => !/^srd/.test(k)).sort((a, b) => FICHAS[a].curto.localeCompare(FICHAS[b].curto, 'pt'));
  const ehSrd = /^srd/.test(P.fichaId) && !P.usaPorte;
  const f = { nome: P.nome, sexo: P.sexo, raca: ehSrd ? 'srd' : P.fichaId, porte: P.porte, idade: P.idade, dono: P.dono || '' };
  const html = `<h1 style="margin-top:6px">Editar dados</h1><p class="sub">O radar e os registros continuam.</p>
    <label class="lbl" for="pn">Nome do cão</label><input class="campo" id="pn" maxlength="24" value="${esc(f.nome)}">
    <label class="lbl">Sexo</label><div class="seg" id="ps"><button type="button" data-s="m" class="${f.sexo === 'm' ? 'on' : ''}">Macho</button><button type="button" data-s="f" class="${f.sexo === 'f' ? 'on' : ''}">Fêmea</button></div>
    <label class="lbl" for="pr">Raça</label><select class="campo" id="pr"><option value="srd"${ehSrd ? ' selected' : ''}>Vira-lata (SRD)</option>${idsRaca.map((k) => `<option value="${k}"${k === f.raca ? ' selected' : ''}>${esc(FICHAS[k].curto === FICHAS[k].nome ? FICHAS[k].nome : FICHAS[k].curto)}</option>`).join('')}</select>
    <div id="pp"${ehSrd ? '' : ' hidden'}><label class="lbl">Porte</label><div class="seg" style="grid-template-columns:1fr 1fr 1fr" id="ppb">${['pequeno', 'medio', 'grande'].map((p) => `<button type="button" data-p="${p}" class="${f.porte === p ? 'on' : ''}">${{ pequeno: 'Pequeno', medio: 'Médio', grande: 'Grande' }[p]}</button>`).join('')}</div></div>
    <label class="lbl">Idade</label><div class="stepper"><button type="button" id="im" aria-label="Menos um ano">–</button><output id="iv">${f.idade}</output><button type="button" id="ip" aria-label="Mais um ano">+</button><span class="pequeno">anos</span></div>
    <label class="lbl" for="pd">Seu nome (opcional, para o "bom dia")</label><input class="campo" id="pd" maxlength="24" value="${esc(f.dono)}" placeholder="Como quer ser chamad${'o(a)'}">
    <button class="btn" type="button" id="psv" style="margin-top:20px">Salvar</button>`;
  return { aba: 'perfil', titulo: 'Editar dados', pai: 'perfil', html, ligar(root) {
    root.querySelectorAll('#ps button').forEach((b) => { b.onclick = () => { f.sexo = b.dataset.s; root.querySelectorAll('#ps button').forEach((x) => x.classList.toggle('on', x === b)); }; });
    root.querySelectorAll('#ppb button').forEach((b) => { b.onclick = () => { f.porte = b.dataset.p; root.querySelectorAll('#ppb button').forEach((x) => x.classList.toggle('on', x === b)); }; });
    root.querySelector('#pr').onchange = (e) => { f.raca = e.target.value; root.querySelector('#pp').hidden = f.raca !== 'srd'; };
    const iv = root.querySelector('#iv'); const set = (n) => { f.idade = Math.max(1, Math.min(25, n)); iv.textContent = f.idade; };
    root.querySelector('#im').onclick = () => set(f.idade - 1); root.querySelector('#ip').onclick = () => set(f.idade + 1);
    root.querySelector('#psv').onclick = () => {
      const nome = root.querySelector('#pn').value.trim().replace(/\s+/g, ' '); if (nome.length < 2) { toast('Escreva o nome do cão.'); return; }
      P.nome = cap(nome); P.sexo = f.sexo; P.idade = f.idade; P.dono = root.querySelector('#pd').value.trim();
      if (f.raca === 'srd') { P.fichaId = 'srd-' + f.porte; P.porte = f.porte; P.racaOrigem = 'srd'; P.racaRotulo = 'Vira-lata (SRD)'; P.usaPorte = false; }
      else if (f.raca !== P.fichaId || P.usaPorte) { P.fichaId = f.raca; P.porte = normPorte(FICHAS[f.raca].porte); P.racaOrigem = 'botao'; P.racaRotulo = FICHAS[f.raca].curto; P.usaPorte = false; }
      P.idadeHumana = idadeHumana(P.idade, P.porte); P.editadoEm = new Date().toISOString();
      salvarPerfil(); carregarPerfil(); toast('Dados salvos.'); location.hash = '#/perfil';
    };
  } };
}
function telaTrocar() {
  const atual = P.origem === 'demo' ? (P.racaOrigem === 'srd' ? 'srd' : P.fichaId) : '';
  const html = `<h1 style="margin-top:6px">Trocar para outro cão</h1><p class="sub">Para ver o app como ele fica em cada raça do diagnóstico. Cada cão de exemplo já vem com 4 semanas de uso.</p>
    ${P.origem === 'quiz' ? `<div class="aviso ob" style="margin-top:12px"><p>Isso troca o cadastro d${pers('{o}')} ${N()}, que veio do diagnóstico, por um cão de demonstração.</p></div>` : ''}
    <div class="racas-grade" style="margin-top:14px">${RACAS_BOTOES.map(([id, rot]) => { const d = DEMOS[id]; return `<button class="raca-bt${id === atual ? ' on' : ''}" type="button" data-r="${id}"><span class="foto"><img src="../img/raca-${id}.webp" alt="" onerror="this.parentNode.textContent='🐶'"></span><span>${esc(rot)}<br><small class="pequeno">${d[0]}, ${d[2]} anos</small></span></button>`; }).join('')}</div>`;
  return { aba: 'perfil', titulo: 'Trocar de cão', pai: 'perfil', html, ligar(root) {
    root.querySelectorAll('[data-r]').forEach((b) => { b.onclick = () => {
      if (P.origem === 'quiz' && !confirm('Trocar o cadastro do diagnóstico por um cão de demonstração?')) return;
      LS.set('perfil', perfilDemo(b.dataset.r)); carregarPerfil(); toast('Agora o app é d' + pers('{o} {nome}') + '.'); location.hash = '#/hoje';
    }; });
  } };
}
function telaDiario() {
  const l = LS.get('diario', []);
  const html = `<h1 style="margin-top:6px">Diário d${pers('{o}')} ${N()}</h1><p class="sub">O que você viu hoje vira informação na consulta.</p>
    <div class="card" style="margin-top:14px"><label class="lbl" for="dt" style="margin-top:0">Nova anotação</label>
      <textarea class="campo" id="dt" maxlength="600" placeholder="Ex.: Tossiu 2 vezes ao acordar. Comeu metade da ração."></textarea>
      <div class="chips" style="margin-top:10px" id="dsn">${SINAIS7.map((s) => `<button class="chip" type="button" data-s="${s.id}">${s.emoji} ${esc(s.nome)}</button>`).join('')}</div>
      <div class="linha-btns" style="margin-top:6px"><input class="campo" type="date" id="dd" value="${hoje()}" max="${hoje()}"><button class="btn pq" type="button" id="ds">Salvar</button></div></div>
    <div class="pilha" style="margin-top:14px">${l.length ? l.map((e) => `<div class="entrada"><div class="data">${fDataLonga(e.data)}</div><p>${esc(e.texto)}</p><div class="rod">${e.sinal && SN[e.sinal] ? `<span class="tag t-cinza">${SN[e.sinal].emoji} ${esc(SN[e.sinal].nome)}</span>` : '<span></span>'}<button class="apagar" type="button" data-x="${e.id}">Apagar</button></div></div>`).join('')
      : '<div class="card soft vazio"><div class="e">📔</div>Nenhuma anotação ainda.</div>'}</div>`;
  return { aba: 'perfil', titulo: 'Diário', pai: 'perfil', html, ligar(root) {
    let sinal = ''; const ta = root.querySelector('#dt');
    if (l[0] && l[0].data === hoje() && /^Sinal: /.test(l[0].texto)) { ta.value = l[0].texto; sinal = l[0].sinal; }
    root.querySelectorAll('#dsn .chip').forEach((c) => { c.classList.toggle('on', c.dataset.s === sinal); c.onclick = () => { sinal = sinal === c.dataset.s ? '' : c.dataset.s; root.querySelectorAll('#dsn .chip').forEach((x) => x.classList.toggle('on', x.dataset.s === sinal)); }; });
    root.querySelector('#ds').onclick = () => {
      const t = ta.value.trim(); if (t.length < 3) { toast('Escreva o que você observou.'); return; }
      let lista = LS.get('diario', []);
      if (lista[0] && lista[0].data === hoje() && /^Sinal: /.test(lista[0].texto)) lista = lista.slice(1);
      lista.unshift({ id: uid(), data: root.querySelector('#dd').value || hoje(), texto: t, sinal }); lista.sort((a, b) => (a.data < b.data ? 1 : -1));
      LS.set('diario', lista); toast('Anotado.'); render();
    };
    root.querySelectorAll('[data-x]').forEach((b) => { b.onclick = () => { LS.set('diario', LS.get('diario', []).filter((e) => e.id !== b.dataset.x)); render(true); }; });
  } };
}
function telaResumo() {
  const rems = LS.get('remedios', []); const h = historico().slice(-4).reverse(); const cs = LS.get('carocos', []); const di = LS.get('diario', []).slice(0, 6);
  const qv = LS.get('qv', []).slice(-3); const resp = LS.get('resp', []).slice(-4); const perg = LS.get('perguntas', []); const cons = LS.get('consulta', {});
  const totQV = (x) => window.QV_ITENS.reduce((a, it) => a + (+x.v[it.id] || 0), 0);
  const html = `<div class="linha-btns nao-imprime" style="margin:4px 0 14px"><button class="btn" type="button" id="imp">${I.imprimir} Imprimir ou salvar PDF</button></div>
    <article class="resumo">
      <div style="display:flex;gap:12px;align-items:center">${fotoHtml()}<div><span class="rotulo">Resumo para o veterinário</span><h2 style="margin-top:6px">${N()} · ${esc(racaNome())}</h2><p class="pequeno">Gerado em ${fDataAno(hoje())} pelo app Vovocão</p></div></div>
      <h3>Dados</h3><div class="linha-dados"><span>Sexo: <b>${fem() ? 'fêmea' : 'macho'}</b></span><span>Idade: <b>${P.idade} anos</b> (~${P.idadeHumana} humanos)</span><span>Porte: <b>${porteTxt()}</b></span><span>Última consulta: <b>${cons.ultima ? fDataAno(cons.ultima) : 'não informada'}</b></span></div>
      <h3>Remédios e suplementos em uso</h3>${rems.length ? `<table><tr><th>Nome</th><th>Como foi receitado</th><th>Horários</th></tr>${rems.map((r) => `<tr><td><b>${esc(r.nome)}</b>${r.para ? '<br><span class="pequeno">' + esc(r.para) + '</span>' : ''}</td><td>${esc(r.inst || '-')}</td><td>${r.horarios.join(', ')}</td></tr>`).join('')}</table>` : '<p class="pequeno">Nenhum cadastrado.</p>'}
      <h3>Últimos check-ups em casa (7 sinais)</h3><table><tr><th>Data</th><th>Sinais em Atenção</th></tr>${h.map((x) => `<tr><td>${x.origem === 'quiz' ? fData(x.data) + ' (diagnóstico)' : fData(x.data)}</td><td>${emAtencao(x.res).map((k) => SN[k].nome).join(', ') || 'nenhum'}</td></tr>`).join('')}</table>
      ${resp.length ? `<h3>Respiração dormindo</h3><p style="font-size:14px">${resp.map((r) => `${fData(r.data)}: <b>${r.rpm}</b>/min`).join(' · ')}</p>` : ''}
      <h3>Caroços</h3>${cs.length ? `<table><tr><th>Local</th><th>Primeira vez</th><th>Medidas</th></tr>${cs.map((c) => `<tr><td><b>${esc(c.local)}</b>${c.obs ? '<br><span class="pequeno">' + esc(c.obs) + '</span>' : ''}</td><td>${fDataAno(c.medidas[0].data)}</td><td>${c.medidas.map((m) => num(m.cm) + ' cm (' + fData(m.data) + ')').join(' → ')}</td></tr>`).join('')}</table>` : '<p class="pequeno">Nenhum marcado.</p>'}
      ${qv.length ? `<h3>Escala de qualidade de vida (0 a 70)</h3><p style="font-size:14px">${qv.map((x) => `${fData(x.data)}: <b>${totQV(x)}</b>`).join(' · ')}</p>` : ''}
      ${di.length ? `<h3>Diário</h3><table>${di.map((e) => `<tr><td style="white-space:nowrap">${fData(e.data)}</td><td>${esc(e.texto)}</td></tr>`).join('')}</table>` : ''}
      ${perg.length ? `<h3>Perguntas que quero fazer</h3><ol style="margin:0;padding-left:20px;font-size:14px">${perg.map((q) => `<li style="margin:4px 0">${esc(q)}</li>`).join('')}</ol>` : ''}
      <p class="rodape-r">Anotações feitas pelo dono em casa, organizadas pelo app Vovocão. O app não faz diagnóstico.</p>
    </article>`;
  return { aba: 'perfil', titulo: 'Resumo para o veterinário', pai: 'perfil', html, ligar(root) { root.querySelector('#imp').onclick = () => window.print(); } };
}

// ---------- DIAS BONS (qualidade de vida) ----------
const totQV = (x) => window.QV_ITENS.reduce((a, it) => a + (+x.v[it.id] || 0), 0);
function telaDiasBons() {
  const l = LS.get('qv', []); const ult = l[l.length - 1]; const tot = ult ? totQV(ult) : null;
  const fx = tot != null ? window.QV_FAIXAS.find((f) => tot >= f.min) : null; const desde = ult ? difDias(ult.data, hoje()) : 99;
  const html = `<h1 style="margin-top:6px">Dias bons</h1>
    <p class="sub">Uma vez por semana, 7 notas de 0 a 10. A curva mostra, com calma e sem achismo, como ${oN()} está vivendo.</p>
    ${ult ? `<div class="card" style="margin-top:14px"><span class="rotulo">Semana de ${fData(ult.data)}</span>
      <div class="qv-total" style="margin-top:10px"><div class="n">${tot}<small>/70</small></div><div><span class="tag ${COR_TAG[fx.cor]}">${esc(fx.titulo)}</span></div></div>
      <p style="margin-top:10px;font-size:14.5px;line-height:1.55">${md(fx.x)}</p>
      <div class="pilha" style="margin-top:14px">${window.QV_ITENS.map((it) => `<div style="display:flex;align-items:center;gap:10px;font-size:14px"><span style="width:22px">${it.emoji}</span><span style="flex:1">${esc(it.nome)}</span><div class="barra" style="width:38%"><i style="width:${(ult.v[it.id] || 0) * 10}%"></i></div><b style="width:22px;text-align:right">${ult.v[it.id]}</b></div>`).join('')}</div></div>` : ''}
    <a class="btn${ult && desde < 7 ? ' sec' : ''}" href="#/dias-bons/avaliar" style="margin-top:14px">${ult && desde < 7 ? 'Avaliar de novo' : 'Avaliar esta semana'}</a>
    ${l.length > 1 ? `<div class="secao-tit"><h2>A curva</h2><span class="pequeno">${plural(l.length, 'semana', 'semanas')}</span></div><div class="card plano">${linhaSvg(l.slice(-8).map((x) => ({ rot: fData(x.data), v: totQV(x) })), { max: 70, linha: 35, rotLinha: 'linha dos 35', aria: 'Curva da qualidade de vida' })}</div>` : ''}
    <div class="card soft dobra" data-card style="margin-top:14px"><span class="rotulo">Sobre esta escala</span>
      <p style="margin-top:8px;font-size:14.5px;line-height:1.55"><b>Inspirada na HHHHHMM, da veterinária Alice Villalobos. Ela não decide nada sozinha.</b></p><div class="det"><p style="margin-top:8px;font-size:14.5px;line-height:1.55">É inspirada na escala HHHHHMM, da veterinária Alice Villalobos, usada para acompanhar a qualidade de vida de cães idosos ou doentes. Ela não decide nada sozinha. Serve para você chegar na consulta com o que viu, semana a semana, e conversar com o veterinário sobre conforto, dor e o que dá para melhorar. Quando chegar a hora de falar sobre o fim da vida, essa conversa também fica mais clara, no seu tempo e do seu jeito.</p></div><button class="ler-mais" type="button" data-abre>Ler mais</button></div>`;
  return { aba: 'perfil', titulo: 'Dias bons', pai: 'hoje', html };
}
function telaAvaliar() {
  const l = LS.get('qv', []); const ult = l[l.length - 1]; const v = {}; window.QV_ITENS.forEach((it) => { v[it.id] = ult ? ult.v[it.id] : 5; });
  const dias = LS.get('dias', {}); const s7 = Array.from({ length: 7 }, (_, i) => dias[somaDias(hoje(), -i)]); const b = s7.filter((x) => x === 'bom').length, d = s7.filter((x) => x === 'dificil').length;
  const html = `<h1 style="margin-top:6px">Como foi a semana?</h1><p class="sub">Pense nos últimos 7 dias. 10 é o melhor, 0 é o mais difícil.</p>
    <div class="pilha" style="margin-top:14px">${window.QV_ITENS.map((it) => `<div class="qv-item"><div class="cab"><span style="font-size:20px">${it.emoji}</span><b>${esc(it.nome)}</b><span class="val" id="v-${it.id}">${v[it.id]}</span></div>
      <input type="range" min="0" max="10" step="1" value="${v[it.id]}" data-i="${it.id}" aria-label="${esc(it.nome)}">
      <div class="ext"><span>0: ${esc(pers(it.zero))}</span><span>10: ${esc(pers(it.dez))}</span></div>
      ${it.id === 'mais' && (b + d) ? `<p class="pequeno" style="margin-top:8px">No contador de dias: ${plural(b, 'dia bom', 'dias bons')} e ${plural(d, 'difícil', 'difíceis')} nesta semana.</p>` : ''}</div>`).join('')}</div>
    <div class="card verde" style="margin-top:14px;position:sticky;bottom:calc(var(--abas-h) + var(--aviso-h) + 10px);display:flex;align-items:center;gap:14px"><div class="qv-total"><div class="n" style="font-size:40px" id="vt">0</div></div><div style="flex:1"><b>de 70</b><p class="pequeno" style="color:var(--verde-esc)">Acima de 35: qualidade de vida aceitável na escala.</p></div><button class="btn pq" type="button" id="qs">Salvar</button></div>`;
  return { aba: 'perfil', titulo: 'Dias bons', pai: 'dias-bons', html, ligar(root) {
    const tot = () => { root.querySelector('#vt').textContent = Object.values(v).reduce((a, x) => a + x, 0); };
    root.querySelectorAll('input[type=range]').forEach((r) => { r.oninput = () => { v[r.dataset.i] = +r.value; root.querySelector('#v-' + r.dataset.i).textContent = r.value; tot(); }; });
    tot();
    root.querySelector('#qs').onclick = () => { const lista = LS.get('qv', []).filter((x) => x.data !== hoje()); lista.push({ data: hoje(), v: { ...v } }); LS.set('qv', lista); toast('Semana anotada.'); location.hash = '#/dias-bons'; };
  } };
}

// ---------- ASSISTENTE 24h (upsell, bloqueado) ----------
function telaAssistente() {
  const A = window.ASSISTENTE_EXEMPLO; const c = { vd: 'Pode esperar e observar', ob: 'Marque consulta', at: 'Emergência' };
  const html = `<section class="assist-hero"><span class="cad">${I.cadeado} Bloqueado no demo</span>
      <h1>Pergunte a qualquer hora: dá pra esperar ou é emergência?</h1>
      <p>Domingo, 2 da manhã, ${oN()} passando mal. Você conta o que está vendo e recebe, em segundos, uma orientação em 3 partes.</p></section>
    <div class="secao-tit"><h2>Um exemplo</h2></div>
    <div class="chat">
      <div class="bolha eu">${esc(pers(A.pergunta))}</div>
      <div class="bolha ia">
        <div class="parte"><div class="rotulo ${A.nivel.cor === 'at' ? 'at' : ''}">1. Nível de urgência</div><span class="tag ${COR_TAG[A.nivel.cor]}" style="margin-bottom:6px">${c[A.nivel.cor]}</span><div style="font-weight:700">${esc(A.nivel.t)}</div><p style="margin-top:4px">${md(A.nivel.x)}</p></div>
        <div class="parte"><div class="rotulo">2. O que pode ser</div><p>${md(A.podeSer)}</p></div>
        <div class="parte"><div class="rotulo">3. Próximo passo</div><p>${md(A.passo)}</p></div>
      </div>
      <div class="assina"><i>${I.pata.replace('<svg', '<svg width="13" height="13" style="color:#fff"')}</i>Assistente 24h · revisado por médico-veterinário</div>
    </div>
    <ul class="ul" style="margin-top:18px"><li>Conhece ${oN()}: raça, idade, remédios e o histórico do radar.</li><li>Responde em português simples, a qualquer hora.</li><li>Sempre diz quando é hora de ir ao veterinário. Não diagnostica nem receita.</li></ul>
    <button class="btn" type="button" style="margin-top:18px">${I.cadeado} Liberar o Assistente 24h</button>
    <p class="nota" style="margin-top:10px;text-align:center">Orientação de triagem. Não substitui a consulta com o médico-veterinário.</p>`;
  return { aba: 'hoje', titulo: 'Assistente 24h', pai: 'hoje', html };
}

function telaNaoAchei() { return { aba: 'hoje', titulo: 'Não encontrado', pai: 'hoje', html: '<div class="vazio"><div class="e">🐾</div>Esta tela não existe.<br><a href="#/hoje">Voltar para o início</a></div>' }; }

// =====================================================================
// 9. Roteador, topo e abas
// =====================================================================
const ABAS = [['hoje', 'Hoje', I.hoje], ['checkup', 'Check-up', I.radar], ['rotina', 'Rotina', I.rotina], ['sinais', 'Sinais', I.sinais], ['perfil', 'Perfil', I.perfil]];
const ROTAS = [
  [/^hoje$/, () => telaHoje()],
  [/^plano$/, () => telaPlano()],
  [/^checkup$/, () => telaCheckup()],
  [/^checkup\/fazer$/, () => telaCheckupFazer()],
  [/^checkup\/resultado$/, () => telaCheckupResultado()],
  [/^rotina$/, () => telaRotina()],
  [/^rotina\/([\w-]+)$/, (m) => telaCuidado(m[1])],
  [/^rotina\/([\w-]+)\/([\w-]+)$/, (m) => telaSecao(m[1], m[2])],
  [/^fazer\/([\w-]+)$/, (m) => telaGuia(m[1])],
  [/^contar$/, () => telaContar()],
  [/^sinais$/, (m, q) => telaSinais(q)],
  [/^sinais\/([\w-]+)$/, (m) => telaSinal(m[1])],
  [/^emergencia$/, () => telaEmergencia()],
  [/^perfil$/, () => telaPerfil()],
  [/^perfil\/editar$/, () => telaEditar()],
  [/^perfil\/trocar$/, () => telaTrocar()],
  [/^diario$/, () => telaDiario()],
  [/^resumo$/, () => telaResumo()],
  [/^dias-bons$/, () => telaDiasBons()],
  [/^dias-bons\/avaliar$/, () => telaAvaliar()],
  [/^assistente$/, () => telaAssistente()],
];
let ATUAL = null; let ROTA_ANT = '';
function rotaAtual() { const h = (location.hash || '#/hoje').replace(/^#\/?/, ''); const [r, q] = h.split('?'); return { r: r || 'hoje', q: new URLSearchParams(q || '') }; }
function render(manterRolagem) {
  const { r, q } = rotaAtual();
  if (r !== ROTA_ANT) { if (ATUAL && ATUAL.sair) ATUAL.sair(); pararTimer(); if (!/^fazer\//.test(r)) GUIADO = null; if (r !== 'checkup/fazer') CK = null; if (r !== 'contar') RESP = null; }
  let tela = null;
  for (const [re, fn] of ROTAS) { const m = r.match(re); if (m) { tela = fn(m, q); break; } }
  if (!tela) tela = telaNaoAchei();
  ATUAL = tela;
  const mudou = r !== ROTA_ANT; ROTA_ANT = r;
  // topo
  const topo = document.getElementById('topo');
  const sos = tela.semSos ? '' : `<a class="btn-sos" href="#/emergencia" aria-label="Emergência">${I.sirene}SOS</a>`;
  topo.innerHTML = tela.pai
    ? `<button class="btn-voltar" type="button" id="voltar" aria-label="Voltar">${I.voltar.replace('<svg', '<svg width="24" height="24"')}</button><div class="titulo">${esc(tela.titulo || '')}</div>${sos}`
    : `<a class="marca" href="#/hoje"><i>${I.pata.replace('<svg', '<svg width="17" height="17" style="color:#fff"')}</i>Vovocão</a><span class="espaco"></span>${sos}`;
  const vb = document.getElementById('voltar');
  if (vb) vb.onclick = () => { if (tela.voltar && tela.voltar()) return; location.hash = '#/' + tela.pai; };
  // abas
  const devido = checkupDevido();
  document.getElementById('abas').innerHTML = ABAS.map(([id, t, ic]) => `<a class="aba${tela.aba === id ? ' on' : ''}" href="#/${id}" ${tela.aba === id ? 'aria-current="page"' : ''}>${ic}${id === 'checkup' && devido ? '<span class="ponto" aria-label="check-up pendente"></span>' : ''}<span>${t}</span></a>`).join('');
  // tela
  const area = document.getElementById('tela');
  const y = window.scrollY;
  area.innerHTML = `<div class="tela${mudou ? '' : ' sem-anim'}">${tela.html}</div>`;
  if (!mudou) area.firstElementChild.style.animation = 'none';
  if (tela.ligar) tela.ligar(area);
  ligarDobras(area);
  area.querySelectorAll('[data-foto]').forEach((b) => { b.onclick = (e) => { e.preventDefault(); folhaFoto(); }; });
  if (mudou && !manterRolagem) { window.scrollTo(0, 0); } else window.scrollTo(0, y);
  document.title = (tela.titulo ? tela.titulo + ' · ' : '') + 'Vovocão';
}
window.addEventListener('hashchange', () => { fecharFolha(); render(); });
window.addEventListener('scroll', () => { const t = document.getElementById('topo'); if (t) t.classList.toggle('rolou', window.scrollY > 4); }, { passive: true });
// quiz refeito em outra aba: recarrega o perfil
window.addEventListener('storage', (e) => { if (e.key === PREF + 'perfil') { carregarPerfil(); render(); } });

carregarPerfil();
if (!location.hash) history.replaceState(null, '', '#/hoje');
render();
})();
