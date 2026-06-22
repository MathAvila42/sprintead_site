# Sprint EaD — Landing Page

Site de marketing estático (HTML/CSS/JS puro, sem build step) para o Sprint EaD, uma plataforma de autogestão acadêmica para estudantes de graduação EaD.

A plataforma em si (dashboard, IA de planejamento, etc.) é desenvolvida em outro ambiente — este repositório contém **apenas o site institucional** com o fluxo de cadastro (wizard "Começar teste grátis").

## Estrutura

```
index.html       página única (landing page + modal de cadastro)
css/style.css     estilos (grid custom replicando Tailwind grid-12, design tokens via CSS vars)
js/main.js        interações: marquee, FAQ accordion, wizard de cadastro multi-step
assets/           imagens
design/           referência de design original (chat de design + prototype React/JSX gerado no Claude Design)
```

## Rodando localmente

Como é só HTML/CSS/JS estático, basta servir a pasta com qualquer servidor estático:

```bash
npx http-server -p 8080
```

e abrir `http://localhost:8080/`.

## Origem do design

O design final foi prototipado no Claude Design e está preservado em `design/` (chat de design em `design/chats/` e prototype React/JSX em `design/project/`: `lp.jsx`, `signup.jsx`, `tweaks-panel.jsx`) como referência — não faz parte do site em produção.

