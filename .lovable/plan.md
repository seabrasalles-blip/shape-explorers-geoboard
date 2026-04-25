## Gerar build estático para o site da escola

### 1. Ajustar `vite.config.ts`
- Adicionar `base: "./"` para que os caminhos de assets sejam relativos.
- Isso garante que o app funcione tanto na raiz do domínio quanto em uma subpasta (ex.: `escola.com.br/geoplano/`), sem precisar de reconfiguração.

### 2. Executar o build de produção
- Rodar `npm run build` (Vite + SWC + Tailwind).
- Saída: pasta `dist/` com `index.html`, JS/CSS minificados com hash, e todos os PNGs de `public/assets/` copiados.

### 3. Validar o build
- Listar `dist/` para confirmar presença de todos os arquivos (HTML, JS, CSS, PNGs).
- Conferir que `dist/index.html` usa caminhos relativos (`./assets/...`).
- Verificar tamanho final.

### 4. Empacotar em ZIP
- Compactar `dist/` inteira em `geoplano-exploradores-das-formas.zip`.
- Salvar em `/mnt/documents/` e disponibilizar via `<lov-artifact>` para download.

### 5. Entregar instruções de publicação
- 100% estático: funciona em qualquer hospedagem (cPanel, Hostgator, Locaweb, Netlify, GitHub Pages etc.).
- Sem necessidade de Node.js, banco ou backend.
- Recomendação de embed via `<iframe>` com dimensões mínimas de 1200x675 (layout fixo da atividade).
- Observação sobre fontes (Google Fonts via CDN, se aplicável).

### Pontos de atenção
- App tem apenas a rota `/`, então não há risco de 404 ao atualizar a página.
- **Nenhuma alteração na lógica da aplicação** — apenas configuração de build e empacotamento.
