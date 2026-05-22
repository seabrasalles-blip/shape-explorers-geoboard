## Objetivo
Substituir a palavra "missão/missões" por "tarefa/tarefas" em todo o material visível ao usuário, mantendo todo o resto idêntico (lógica, layout, build, design).

## Alterações textuais (apenas strings)

**index.html**
- Título e og:title: "Exploradores das Formas: Missão Geoplano" → "Exploradores das Formas: Tarefa Geoplano"

**src/lib/missions.ts** (apenas os títulos exibidos)
- "Missão 1 – ..." → "Tarefa 1 – ..." (e assim por diante, das 12 tarefas)
- Mensagem final: "...completou todas as missões!" → "...completou todas as tarefas!"

**src/components/MissionPanel.tsx**
- "Missão {n} de {total}" → "Tarefa {n} de {total}"

**src/components/IntroScreen.tsx**
- Texto inicial: "Cada missão pede um polígono..." → "Cada tarefa pede um polígono..."
- Texto final: "completou todas as missões" → "completou todas as tarefas"
- Botão alt: "Reiniciar missão" / "Iniciar missão" → "Reiniciar tarefa" / "Iniciar tarefa"
- Título final: "🏆 Missão Cumprida!" → "🏆 Tarefa Cumprida!"

**src/components/GameScreen.tsx**
- "Missão {n}/{total}" → "Tarefa {n}/{total}"
- Botão alt: "Reiniciar missão" → "Reiniciar tarefa"
- Comentários internos também ajustados (cosmético).

## O que NÃO muda
- Nomes de arquivos (`missions.ts`, `MissionPanel.tsx`), nomes de variáveis (`MISSIONS`, `missionIdx`), tipos (`Mission`), props — tudo permanece igual. Só o texto visível em português muda.
- Nenhuma mudança em lógica de validação, layout, cores, build ou assets.
- O `StartScreen.tsx` mantém "Missão Geoplano" como subtítulo do nome do jogo? → **Decisão necessária:** trocar também para "Tarefa Geoplano" para consistência total (recomendado), ou manter como nome próprio do jogo.

## Entrega
Após aplicar as mudanças, gerar novo build estático (`dist/`) e novo ZIP atualizado para publicação.
