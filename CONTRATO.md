# Contrato quiz → app (cadastro do cão)

O quiz (`funis/cao-idoso-quiz/index.html`, função `salvarPerfil`) grava o cadastro no **mesmo domínio** do app, em:

```
localStorage['maisanos:perfil']  (JSON)
```

O app lê essa chave ao abrir. Se ela não existir, o app grava ali um **perfil de demonstração** (Thor, Shih Tzu, `origem: 'demo'`). Quando a pessoa faz o quiz, o quiz sobrescreve com `origem: 'quiz'`.

## Campos

| Campo | Tipo | O que é |
|---|---|---|
| `versao` | número | Versão do contrato. Hoje `1`. |
| `criadoEm` | texto ISO | Quando o quiz salvou. **É a identidade do cão no app**: se mudar, o app apaga o estado antigo (check-ups, rotina etc.) e começa do zero. |
| `origem` | `'quiz'` \| `'demo'` | `'demo'` é criado pelo próprio app (e já vem com 4 semanas de uso de exemplo). |
| `nome` | texto | Nome do cão. |
| `sexo` | `'m'` \| `'f'` | Define ele/ela, o/a em todo o app. |
| `fichaId` | texto | Chave em `dados/racas-quiz.js` (`window.FICHAS[fichaId]`) e em `app/dados/racas-completo.js` (`window.RACAS_COMPLETO[fichaId]`). Ex.: `shih-tzu`, `pinscher`, `srd-medio`. |
| `racaRotulo` | texto | Como mostrar a raça (o botão escolhido ou o que a pessoa digitou). |
| `racaOrigem` | `'botao'` \| `'srd'` \| `'outra'` | Como a raça foi escolhida. |
| `usaPorte` | booleano | `true` quando a raça digitada não tem ficha própria e os dados são do porte. |
| `porte` | `'pequeno'` \| `'medio'` \| `'grande'` | O app também aceita `'médio'` e normaliza. |
| `idade` | número | Anos (1 a 25). |
| `idadeHumana` | número | Tabela por porte da AVMA. O app recalcula. |
| `radar` | objeto | `{apetite, agua, patas, noite, boca, respiracao, caroco}` → `{st: 'atencao'\|'observar'\|'nao', raca: bool}`. Vira o 1º ponto do histórico ("início"). Nunca existe "ok". |
| `acompanha` | número | Quantos dos 7 sinais não ficaram "Não observado". |
| `respostas` | objeto | Respostas de texto do quiz por etapa (`patas`, `consulta`, `remedio`...). O app usa `patas` (exercício recomendado), `consulta` (calendário) e `remedio` (alerta da gaveta). |
| `dono` | texto (opcional) | Só o app escreve: o nome do dono para o "Bom dia". |
| `editadoEm` | texto ISO (opcional) | Só o app escreve, quando a pessoa edita os dados. |

## O que o app guarda (prefixo `maisanos:`)

Tudo com `try/catch` (navegador sem armazenamento não quebra o app). É demo: o banco vem depois.

| Chave | Conteúdo |
|---|---|
| `app-dono` | `criadoEm|origem` do perfil dono do estado abaixo. |
| `checkups` | `[{data:'AAAA-MM-DD', res:{sinal:'atencao'|'observar'|'nao'}}]` |
| `tarefas` | `{'AAAA-MM-DD': [idTarefa...]}` (rotina feita no dia) |
| `remedios` | `[{id, nome, para, inst, horarios:['08:00'], lembrete}]` |
| `doses` | `{'AAAA-MM-DD': {'idRemedio@08:00': 'hora em que deu'}}` |
| `diario` | `[{id, data, texto, sinal}]` |
| `carocos` | `[{id, vista:'esq'|'dir'|'barriga', x, y, local, obs, foto(dataURL), medidas:[{data, cm}]}]` |
| `qv` | `[{data, v:{dor, fome, agua, higiene, alegria, mobilidade, mais}}]` (escala Dias bons, 0 a 10 cada) |
| `dias` | `{'AAAA-MM-DD': 'bom'|'dificil'}` (contador de dias bons) |
| `checks` / `escalas` | itens marcados nas listas (casa adaptada) e escalas (dor, DISHAA) |
| `resp` | `[{data, rpm}]` respiração dormindo |
| `consulta` | `{ultima:'AAAA-MM-DD'}` |
| `perguntas` | perguntas marcadas para levar ao veterinário |
| `emerg` | `{nome, tel}` do pronto-socorro 24 h |
| `foto` | dataURL JPEG 320x320 da foto real do cão (substitui a da raça em todo o app) |
| `lidas` | partes dos 5 cuidados já abertas (`{"cuidado/parte": true}`) |
| `jafaco` | dicas marcadas como "já faço" (chave = hash do texto da dica) |

## Para o banco (depois)

Cada chave acima vira uma tabela ligada ao cão (`perfil`), e o `perfil` ao usuário (login da compra). O app já separa o estado por cão (`app-dono`), então a troca é só trocar `LS.get/LS.set` em `app.js` por chamadas à API.
