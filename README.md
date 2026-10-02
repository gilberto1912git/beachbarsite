# 🌴 Bene Beach Bar | Site Oficial

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://gilberto1912git.github.io/beachbarsite/)

> O autêntico clima de praia com chão de areia de verdade em São Paulo, petiscos de boteco, chopp gelado, drinks autorais, música ao vivo e espaço família no Parque Regina.

---

## 🌊 Visão Geral do Projeto

O **Bene Beach Bar** é uma aplicação web moderna e imersiva desenvolvida com a metodologia **Mobile-First** e **Clean Code**, proporcionando aos clientes a sensação de estar em um quiosque de praia de alto padrão sem sair da capital paulista.

A interface foi concebida com base na atmosfera do **encontro do mar tropical cristalino com o pôr do sol dourado (*golden hour*)**, aliando beleza estética, máxima performance (60 FPS) e acessibilidade inclusiva.

---

## ✨ Principais Funcionalidades

- **🌅 Ambientação Visual Mar & Pôr do Sol**: Paleta cromática exclusiva com gradientes atmosféricos contínuos, efeitos *glassmorphism* translúcidos e texturas marítimas sutis.
- **⚡ Animações Suaves e Estabilizadas (60 FPS)**:
  - Letreiro rotativo (*marquee*) contínuo 100% acelerado por hardware via GPU (`translate3d`), livre de tremores de subpixel.
  - Efeitos de hover e elevação estáveis, sem oscilações (*chatter/jitter*) de borda.
  - Flutuação orgânica com ritmo de brisa marinha nos selos de destaque.
  - Revelação progressiva na rolagem (*scroll reveal*) com carregamento instantâneo da primeira dobra visível.
- **📲 Motor Inteligente de Reservas via WhatsApp**:
  - Formulário completo para reserva de mesas e camarotes (nome, data, período, convidados, tipo de celebração e observações).
  - **Live Preview em tempo real**: visualização fiel da mensagem formatada no estilo WhatsApp antes do envio.
  - Redirecionamento automático com codificação segura para o WhatsApp oficial do bar `(11) 96218-0691`.
- **🍤 Cardápio da Praia Interativo**:
  - Filtros dinâmicos por categoria (Porções, Churrasco, Chopp & Cervejas, Drinks Tropicais, Batidas e Não Alcoólicos).
  - Botão de acesso direto ao cardápio digital completo via Hubt.
- **📸 Galeria Fotográfica com Lightbox**:
  - Filtro por ambiente, gastronomia e eventos.
  - Modal com efeito de desfoque de fundo e navegação por teclado (`ESC`).
- **🎂 Espaço Especial para Aniversariantes**:
  - Apresentação de benefícios escalonados de acordo com a quantidade de convidados (caipirinhas cortesia, balde de cerveja, gin tropical e espumante).
- **❓ FAQ Interativo**: Acordeão acessível com suporte a leitores de tela e controle por teclado (`aria-expanded`).
- **📍 Localização Integrada**: Mapa dinâmico via Google Maps com instruções de proximidade à estação de metrô Vila das Belezas (Linha 5-Lilás).
- **♿ Acessibilidade & SEO**:
  - Metadados Open Graph para compartilhamento rico em redes sociais.
  - Marcação de dados estruturados com Schema.org (`BarOrPub`).
  - Suporte nativo à preferência de movimento reduzido (`prefers-reduced-motion: reduce`).
  - Contraste de cores em conformidade com as diretrizes WCAG AAA.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído **100% em Vanilla Web**, garantindo velocidade instantânea de carregamento, consumo mínimo de memória e zero custo de manutenção de dependências:

- **HTML5 Semântico**: Estruturação moderna, acessível e otimizada para motores de busca (SEO).
- **CSS3 Puro**:
  - Arquitetura de Design Tokens com CSS Custom Properties (`:root`).
  - Flexbox e CSS Grid Layout para responsividade adaptativa.
  - Animações e transições aceleradas por GPU (`will-change`, `translate3d`).
  - Efeitos de refração de luz (*backdrop-filter: blur*).
- **JavaScript Moderno (ES6+)**:
  - `IntersectionObserver` para revelação na rolagem e lazy loading de imagens.
  - `requestAnimationFrame` para controle suave de rolagem da navbar.
  - Manipulação leve e nativa do DOM sem bibliotecas externas.

---

## 📁 Estrutura de Diretórios

```plaintext
05 Beach Bar/
│
├── index.html                   # Estrutura principal da página (Single Page)
├── favicon.svg                  # Ícone vetorial da aba do navegador
├── logotipo.png                 # Logotipo oficial em alta definição
├── .gitignore                   # Regras de exclusão para versionamento seguro
├── .env.example                 # Guia de variáveis de ambiente e segurança
├── deploy-github.ps1            # Script de automação e sincronização com GitHub
├── README.md                    # Documentação técnica e operacional do projeto
│
└── assets/
    ├── css/
    │   ├── style.css            # Estilos globais, tipografia, seções e design tokens
    │   └── animations.css       # Animações GPU, keyframes, scroll reveal e acessibilidade
    │
    ├── js/
    │   ├── main.js              # Menu mobile, galeria, filtros de cardápio e FAQ
    │   ├── reservation-whatsapp.js # Formulário de reservas e gerador de mensagem WhatsApp
    │   └── scroll-animations.js # IntersectionObserver e comportamento de sticky header
    │
    └── images/
        ├── logotipo.png         # Logo oficial
        ├── favicon.svg          # Favicon vetorial
        ├── praia.jpg            # Imagem de destaque com chão de areia
        ├── bebidas.jpg          # Foto de drinks e coquetéis
        ├── cerveja.jpg          # Foto de chopps e cervejas artesanais
        ├── churrasco.jpg        # Foto de espetos e churrasco na brasa
        ├── espaco.jpg           # Foto da estrutura e mesas
        ├── espaco-kids.jpg      # Foto da área infantil
        ├── porcoes-1.jpg        # Foto de porções crocantes de boteco
        └── porcoes-2.jpg        # Foto de petiscos variados
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído exclusivamente com tecnologias web nativas, nenhuma instalação de pacotes (`npm install`) é necessária.

### Opção 1: Abrir Diretamente no Navegador
Dê um duplo clique no arquivo `index.html` ou abra-o em qualquer navegador moderno (Chrome, Edge, Firefox, Safari, Brave).

### Opção 2: Servidor Local com Python
Caso deseje testar o comportamento com protocolo HTTP local:

```bash
# Python 3
python -m http.server 3000
```
Acesse no seu navegador: `http://localhost:3000`

### Opção 3: Extensão Live Server (VS Code)
1. Instale a extensão **Live Server** no VS Code.
2. Clique com o botão direito no `index.html` e selecione **"Open with Live Server"**.

---

## 📦 Publicação no GitHub Pages

Para disponibilizar o site gratuitamente na web via GitHub Pages:

1. Acesse o repositório no GitHub: [https://github.com/gilberto1912git/beachbarsite](https://github.com/gilberto1912git/beachbarsite).
2. Vá em **Settings** > **Pages** (no menu lateral esquerdo).
3. Na seção **Build and deployment**:
   - **Source**: Selecione `Deploy from a branch`.
   - **Branch**: Selecione `main` e a pasta `/ (root)`.
4. Clique em **Save**.
5. Em poucos instantes, o link público estará ativo em:
   `https://gilberto1912git.github.io/beachbarsite/`

---

## 🔒 Segurança e Privacidade

- **Auditoria de Código**: O projeto passou por uma verificação completa contra segredos expostos, credenciais de banco de dados, chaves de API e tokens de acesso.
- **Dados Públicos**: Os contatos presentes no código (telefone WhatsApp e link do Instagram) são dados públicos oficiais de atendimento do estabelecimento.
- **Proteção Git**: Arquivos sensíveis (`.env`, chaves privadas, logs, pastas de cache) estão protegidos contra envio acidental através do `.gitignore`.

---

## 👨‍💻 Autor & Manutenção

Desenvolvido e mantido por:
- **GitHub**: [@gilberto1912git](https://github.com/gilberto1912git)
- **Repositório**: [beachbarsite](https://github.com/gilberto1912git/beachbarsite.git)

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE) - sinta-se livre para usar, adaptar e aprimorar.
