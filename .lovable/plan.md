## Plano: Remover Missão 11

### O que será feito
1. Remover o objeto da **Missão 11 – Retângulo grande** do array `MISSIONS` em `src/lib/missions.ts`.
2. Corrigir o comentário em `src/components/GameScreen.tsx` que menciona "Missão 14 concluída" para refletir o novo total de 13 missões.

### Impacto
- O array passará de 14 para 13 missões.
- Todos os componentes (`GameScreen`, `MissionPanel`, `StatsPanel`) usam `MISSIONS.length` e `MISSIONS[missionIdx]`, portanto ajustam-se automaticamente.
- A ordem das missões 1–10 e 12–13 permanece inalterada.
- Nenhuma outra alteração de código ou lógica é necessária.

### Arquivos alterados
- `src/lib/missions.ts`
- `src/components/GameScreen.tsx` (apenas comentário)