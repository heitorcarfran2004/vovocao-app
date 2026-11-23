# App "Vovocão" (cuidados para o cão idoso)

O produto de R$ 47 que vem depois do quiz. Promessa: **"Mais anos com o [nome], e anos bons."** Uma rotina de 10 minutos por dia, montada para a raça e a idade do cão: **os 7 sinais avisam** (check-up semanal) e **os 5 cuidados fazem viver mais e melhor**.

O app não diagnostica, não receita e não indica remédio nem dose (CFMV). Aviso fixo em todas as telas: "Não substitui o médico-veterinário."

## Como rodar

```
cd funis/cao-idoso-quiz
node servidor.cjs
```

Abrir **http://localhost:4271/app/**.


- **Sem cadastro**, abre o demo: Thor, Shih Tzu, macho, 11 anos, com 4 semanas de uso (check-ups, rotina, remédio, diário, um caroço, dias bons).
- **Com cadastro do quiz** (mesmo domínio), o app inteiro vira o cão da pessoa: nome, ele/ela, foto da raça, riscos e perguntas da raça.
- Para testar outra raça: Perfil → "Trocar para outro cão (demo)" (as 11 raças dos botões do quiz).
- Para voltar ao zero: apagar o `localStorage` do site (ou Perfil → "Apagar os registros do app").

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Casca: topo, área da tela, aviso fixo, barra de 5 abas. Carrega os dados e o `app.js`. |
| `app.css` | Visual (branco/verde de consultório, Bricolage Grotesque + Inter). Respeita `prefers-reduced-motion`. Tem CSS de impressão para o resumo do veterinário. |
| `app.js` | Tudo: perfil, roteador por hash, telas, widgets, demo. |
| `dados/rotina.js` | Os 7 sinais, perguntas do check-up, tarefas da rotina de 10 min, frases "o que dizer ao veterinário", escala Dias bons, exemplo do Assistente. |
| `dados/cuidados.js` | Conteúdo dos 5 cuidados em blocos (texto, passos, exercícios guiados, listas, escalas, semáforo, suplementos, perguntas) + `ALIMENTOS` (pode ou não pode). |
| `dados/sinais.js` | Guia "É da idade ou é alerta?" (44 sinais) + `EMERGENCIA`. |
| `dados/racas-completo.js` | GERADO. Ficha completa de 29 raças (doenças, sinal em casa, prevenção, exame). |
| `../dados/racas-quiz.js` | As fichas do quiz (carregadas, não copiadas). |
| `ferramentas/gerar.cjs` | Gera `racas-completo.js` a partir de `pesquisa/cao-idoso/racas/racas.json`. Rodar de novo depois que o veterinário revisar: `node app/ferramentas/gerar.cjs`. Tira "Obesidade" da lista da raça e troca "peso magro" por "peso ideal". |
| `ferramentas/prints.cjs` | Prints de todas as telas a 390x844 no Chrome headless + teste do perfil do quiz (Pinscher fêmea) + erros do console. `node app/ferramentas/prints.cjs` |
| `CONTRATO.md` | A chave `maisanos:perfil` e tudo que o app guarda. |
| `prints/` | Os prints. |

## Mapa das telas (rota)

Barra inferior: **Hoje · Check-up · Rotina · Sinais · Perfil**. Botão **SOS** no topo de todas as telas.

1. **Hoje** `#/hoje`: saudação, card do cão (foto da raça ou a foto real, com botão de câmera), radar com o próximo check-up, **o plano de hoje numa linha** (anel + "X de 4 feitas" + dias seguidos), Emergência, atalhos e "Você sabia?" no fim.
   - `#/plano`: **Plano de hoje**, a lista das 3 a 4 tarefas (até 10 min) para marcar, com patinhas da semana e por que essas tarefas.
2. **Check-up** `#/checkup`: status da semana, radar com emojis, comparação (melhorou / piorou / novo sinal), "O que fazer agora" (tarefa da rotina + "Leve ao veterinário: o que dizer"), histórico em grade SVG.
   - `#/checkup/fazer`: uma pergunta por tela, Sim / Às vezes / Não / Não reparei, com as 2 perguntas da raça.
   - `#/checkup/resultado`: radar novo e o que mudou.
3. **Rotina** `#/rotina`: os 5 cuidados (com "Prioridade agora" / "Risco da raça") e ferramentas.
   - `#/rotina/<cuidado>` e `#/rotina/<cuidado>/<seção>`:
     - **Mobilidade e dor**: exercícios guiados por limitação (filtro + ⭐ recomendado), massagem e alongamento, casa adaptada (checklist), sinais de dor que parecem preguiça (escala).
     - **Alimentação e água**: o que muda no prato, parou de comer (semáforo), pode ou não pode (busca), água.
     - **Remédios e suplementos**: meus remédios (cadastro, horários, "dei a dose", lembrete visual, 7 dias), comprimido sem briga, a gaveta (veneno nº 1), suplementos (sem dose), perguntas para o veterinário (marcar → vão para o resumo).
     - **Prevenção**: check-up a cada 6 meses (contagem) + exames, doenças da raça, **mapa de caroços** (3 vistas, toque para marcar, tamanho, data, foto, regra da ervilha), boca e dentes.
     - **Mente e alegria**: brincadeiras de faro guiadas, madrugada e "caduquice" (escala DISHAA), coisas que animam, contador de dias bons.
   - `#/fazer/<exercício>`: modo guiado com cronômetro por passo.
   - `#/contar`: contar a respiração dormindo (30 s, toque a cada respiração).
4. **Sinais** `#/sinais`: busca, filtro por semáforo, 44 sinais em grupos. `#/sinais/<id>`: é da idade?, o que pode ser, o que observar, vá agora se (vermelho), marque consulta se (amarelo), o que dizer ao veterinário (copiar / anotar no diário).
5. **Emergência** `#/emergencia`: lista vermelha, no caminho, não faça, leve com você, deixe pronto hoje (pronto-socorro 24 h com botão de ligar).
6. **Perfil** `#/perfil`: dados do cadastro, radar inicial, riscos da raça. `#/perfil/editar`, `#/perfil/trocar`, `#/diario`, `#/resumo` (resumo para o veterinário, `window.print`).
7. **Dias bons** `#/dias-bons` e `#/dias-bons/avaliar`: escala de 7 itens (0 a 10) inspirada na HHHHHMM, curva com a linha dos 35.
8. **Assistente 24h** `#/assistente`: bloqueado, exemplo de conversa em 3 partes, botão "Liberar" sem ação. Nunca chamado de "veterinário".

## Forma do conteúdo

O texto dos dados não muda; o `app.js` desenha cada bloco como peça de app: listas viram grade de dicas (toque abre o detalhe e tem "já faço"), "não faça" vira linhas com ✕, passos viram carrossel, parágrafos longos mostram a 1ª frase com "ler mais", avisos viram cartões com ícone, e cada cuidado mostra "X de Y partes vistas".

## REVISAR VET

Procure `REVISAR VET` nos arquivos. Os pontos:
- `dados/sinais.js`: corte de ~30 respirações/min dormindo; sede + fome como pista; cabeça na parede como urgência; redação do vestibular ("AVC"); olho vermelho como urgência; regra da ervilha; a lista de emergência inteira.
- `dados/cuidados.js`: exercícios de coluna (hérnia); alongamento passivo; prazos da triagem do apetite (24 h / 2 dias); ~100 ml/kg/dia de água; paracetamol; dipirona; risco da anestesia; escala DISHAA resumida (faixas não oficiais); nozes, leite e fígado no "pode ou não pode".
- `dados/rotina.js`: frases "o que dizer ao veterinário" e quando sugerir consulta; itens e faixas da escala Dias bons.
- `app.js`: cores do mapa de caroços (regra da ervilha) e faixas da contagem de respiração.
- `dados/racas-completo.js`: tudo vem do `racas.json`; corrigir lá e rodar `gerar.cjs`.

## O que falta

- **Banco e login**: hoje é tudo `localStorage` (um aparelho, sem backup). Ver o fim do `CONTRATO.md`.
- **Login ligado à compra** (webhook Wiapy → Supabase, como nos outros apps de membros).
- **Notificações reais** (remédio, check-up semanal, consulta de 6 meses): precisam de PWA com push ou WhatsApp.
- **Assistente 24h**: o upsell (IA com triagem em 3 partes, revisada por veterinário). Só a vitrine existe.
- **Revisão do veterinário** de todo o conteúdo (acima).
- **PDF de verdade** do resumo (hoje é `window.print`, que já salva em PDF no celular e no computador).
- **Imagens que valem gerar no Flow** (projeto "cão idoso"):
  - fotos das 16 raças sem foto (Labrador, Pastor Alemão, Beagle, Chihuahua, Bulldog Francês, Border Collie, Pit Bull, Rottweiler, Cocker, Schnauzer, Cavalier, Jack Russell, Bulldog Inglês, Boxer, Husky, Dálmata), no mesmo estilo de `img/raca-*.webp` (hoje caem na foto do porte);
  - 1 ilustração por exercício guiado (13), mostrando a posição da mão e do cão;
  - capa de cada um dos 5 cuidados;
  - ilustração do "passa-mão" (onde procurar caroço) e da escovação;
  - silhueta do cão para o mapa de caroços em versão ilustrada (hoje é SVG simples).
