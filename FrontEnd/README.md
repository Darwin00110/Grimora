# 🧙‍♂️ GRIMORA — Frontend Foundation & Game Experience

Plataforma gamificada de aprendizagem matemática ambientada em um universo de fantasia medieval em **Pixel Art**. O jogador assume o papel de um pequeno mago aprendiz em uma academia mágica onde a matemática é a própria linguagem de construção e transformação da realidade.

---

## 📌 Sumário
1. [Visão Geral](#-visão-geral)
2. [Stack Tecnológica](#-stack-tecnológica)
3. [Direção Artística & Assets](#-direção-artística--assets)
4. [Arquitetura (Clean Architecture)](#-arquitetura-clean-architecture)
5. [Organização das Pastas](#-organização-das-pastas)
6. [Instalação e Execução](#-instalação-e-execução)
7. [Fluxo da Experiência (Missões & Cutscenes)](#-fluxo-da-experiência-missões--cutscenes)
8. [Como Adicionar Novos Personagens (NPCs e Estados)](#-como-adicionar-novos-personagens)
9. [Como Adicionar Novos Desafios](#-como-adicionar-novos-desafios)
10. [Como Adicionar Novos Assets](#-como-adicionar-novos-assets)
11. [Guia de Integração com o Backend (ASP.NET Core)](#-guia-de-integração-com-o-backend-aspnet-core)
12. [Guia de Integração do Motor Matemático Autoral](#-guia-de-integração-do-motor-matemático-autoral)
13. [Decisões Arquiteturais](#-decisões-arquiteturais)

---

## 🔮 Visão Geral

No universo do Grimora, feitiços não são palavras místicas arbitrárias, mas sim **operações e relações matemáticas**. O aprendiz precisa investigar problemas apresentados pelos cidadãos do reino, manipular incógnitas, calcular dimensões e aplicar fórmulas para que o feitiço funcione corretamente.

- **Público-alvo:** Aprendizes de matemática do ensino fundamental ao médio.
- **Estrutura de Progressão:** Mundo → Estágios → Etapas → Desafios (inspirada no modelo Duolingo, com identidade de RPG medieval).
- **Colecionismo:** Cada desafio concluído concede um feitiço desbloqueado no **Grimório do Jogador**.

---

## 🛠 Stack Tecnológica

| Componente | Tecnologia |
| :--- | :--- |
| **Bundler & Dev Server** | [Vite](https://vitejs.dev/) |
| **Biblioteca de UI** | [React 19](https://react.dev/) |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) |
| **Roteamento** | [React Router DOM](https://reactrouter.com/) |
| **Estilização** | CSS3 puro com variáveis CSS & estética Pixel Art |
| **Gerenciamento de Estado** | React Context API + Reducer (Domain/Application) |

> ⚠️ **Restrições respeitadas:** Sem Electron, sem backend acoplado, sem chamadas HTTP fictícias.

---

## 🎨 Direção Artística & Assets

A identidade visual é inteiramente voltada para **Pixel Art** clássico de 16/32-bits:
- Resolução e escala consistente com `image-rendering: pixelated;`.
- Tipografia retrô com as fontes `Press Start 2P` e `VT323`.
- Caixas de diálogo com bordas de ouro e veludo escuro.
- Sombras com efeito de brilho mágico (*glow*) nas cores púrpura (`#7B2FBE`), dourado (`#FFD700`) e verde cura (`#00E676`).

### Assets Oficiais Incluídos:
- **Logo Grimora:** `/public/assets/images/logo.png` (utilizado na tela inicial e no header).
- **Chapéu do Mago:** `/public/assets/images/hat.png` (ícone da aplicação, favicon e ornamento de navegação).
- **Favicon:** `/public/favicon.png`.

---

## 🏛 Arquitetura (Clean Architecture)

A estrutura do projeto segue rigorosamente o isolamento de camadas da **Clean Architecture**, onde dependências sempre apontam para o centro:

```
┌─────────────────────────────────────────────────────────────┐
│                 PRESENTATION (React, UI)                    │
│    Pages, Components, Cutscenes, Styles, Animations        │
├─────────────────────────────────────────────────────────────┤
│                 APPLICATION (Use Cases & DTOs)              │
│    GameContext, Orquestração de Desafios, Progressão        │
├─────────────────────────────────────────────────────────────┤
│                 INFRASTRUCTURE (Mocks & Adapters)           │
│    Mock Repositories, Datasets (Spells, NPCs, Challenges)   │
├─────────────────────────────────────────────────────────────┤
│                 DOMAIN (Pure TypeScript - Core)             │
│    Entities (Player, NPC, Spell, Challenge, Progression)   │
│    Contracts (IMathEngine, Repositories Interfaces)         │
└─────────────────────────────────────────────────────────────┘
```

1. **Domain:** Camada pura em TypeScript. Não importa React nem bibliotecas de terceiros.
2. **Application:** Gerencia as regras de negócio do frontend e coordena o estado com o `GameContext`.
3. **Infrastructure:** Contém dados mockados e repositórios que implementam os contratos do Domain.
4. **Presentation:** Telas, componentes visuais, animações e integração com o usuário.

---

## 📁 Organização das Pastas

```
grimora/
├── public/
│   ├── assets/
│   │   └── images/
│   │       ├── hat.png          # Asset oficial: Chapéu
│   │       └── logo.png         # Asset oficial: Logo Grimora
│   └── favicon.png              # Favicon da aplicação
├── src/
│   ├── domain/                  # CAMADA DE DOMÍNIO (PURA)
│   │   ├── entities/
│   │   │   ├── Challenge.ts     # Modelo de Desafios
│   │   │   ├── NPC.ts           # Modelo de NPCs e diálogos
│   │   │   ├── Player.ts        # Modelo do Mago Aprendiz e estados
│   │   │   ├── Progression.ts   # Mundos, Estágios e Etapas
│   │   │   └── Spell.ts         # Feitiços e conceitos matemáticos
│   │   └── contracts/
│   │       └── index.ts         # IMathEngine, IPlayerRepository, etc.
│   │
│   ├── infrastructure/          # CAMADA DE INFRAESTRUTURA
│   │   ├── data/                # Dados mockados isolados
│   │   │   ├── challenges.data.ts
│   │   │   ├── npcs.data.ts
│   │   │   ├── spells.data.ts
│   │   │   └── worlds.data.ts
│   │   └── repositories/
│   │       └── mock.repositories.ts  # Implementações mock dos contratos
│   │
│   ├── presentation/            # CAMADA DE APRESENTAÇÃO
│   │   ├── components/
│   │   │   ├── challenge/       # Resolução, Investigação, Grimório de Dicas
│   │   │   │   ├── GrimoireHints.tsx
│   │   │   │   ├── InvestigationPanel.tsx
│   │   │   │   ├── ResolutionPanel.tsx
│   │   │   │   └── ResultPanel.tsx
│   │   │   ├── cutscene/        # Cutscenes e caixas de diálogo
│   │   │   │   ├── CutsceneIntro.tsx
│   │   │   │   └── DialogueBox.tsx
│   │   │   ├── game/            # Sprites em Pixel Art
│   │   │   │   ├── PixelMage.tsx
│   │   │   │   └── PixelNPC.tsx
│   │   │   └── layout/          # Layout e Header
│   │   │       ├── AppLayout.tsx
│   │   │       └── GameHeader.tsx
│   │   ├── context/
│   │   │   └── GameContext.tsx  # Estado global da sessão
│   │   ├── pages/
│   │   │   ├── Academy/         # Hub central da academia
│   │   │   ├── Challenge/       # Fluxo de resolução em 4 etapas
│   │   │   ├── Home/            # Tela inicial com animação e logo
│   │   │   ├── Progression/     # Caminho visual de progressão
│   │   │   └── SpellBook/       # Grimório com feitiços desbloqueados
│   │   └── styles/
│   │       ├── components.css   # Painéis, botões e barras de XP
│   │       ├── global.css       # Variáveis de cor, reset e animações
│   │       ├── pixel-characters.css # Sprites CSS do mago e NPCs
│   │       └── sprites.css      # Sistema de renderização de sprites
│   │
│   ├── App.tsx                  # Rotas e providers da aplicação
│   └── main.tsx                 # Ponto de entrada React
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### 1. Instalar as dependências:
```bash
npm install
```

### 2. Rodar o servidor de desenvolvimento:
```bash
npm run dev
```
Acesse no navegador: `http://localhost:5173`

### 3. Gerar a build de produção:
```bash
npm run build
```

---

## 🎮 Fluxo da Experiência (Missões & Cutscenes)

Cada desafio segue rigorosamente 4 etapas canônicas:

```
[Etapa A: Introdução] ──▶ [Etapa B: Investigação] ──▶ [Etapa C: Resolução] ──▶ [Etapa D: Resultado]
  (Cutscene NPC + Mago)    (Cenário & Variáveis)       (Entrada & Validação)      (Sucesso / Falha)
```

1. **Etapa A — Introdução:**
   - Cutscene com o NPC da missão relatando o problema em uma caixa de diálogo RPG com efeito máquina de escrever.
   - O Mago Aprendiz e o NPC reagem visualmente com expressões personalizadas.

2. **Etapa B — Investigação:**
   - Visualização das quantidades, itens envolvidos, incógnitas e expressão mágica.
   - Painéis com destaque nas variáveis essenciais.

3. **Etapa C — Resolução:**
   - Espaço para interação do aluno, inserção de resposta e manipulação de fórmulas.
   - Acesso em tempo real ao **Grimório de Dicas** (3 níveis: Observação, Raciocínio, Direcionamento).
   - *Área comentada para implementação das representações algébricas e geométricas autorais.*

4. **Etapa D — Resultado:**
   - **Sucesso:** Animação de estrelas, NPC feliz e parabenizando, feitiço concedido e adicionado com animação ao Grimório do Jogador, concedendo XP.
   - **Falha:** Feitiço descontrolado explode no rosto do Mago, o personagem fica chamuscado, o NPC incentiva uma nova tentativa e permite consultar o Grimório de Dicas.

---

## 👤 Sistema de Personagens (Pixel Art Canônico)

### 1. NPCs Diversificados (Design Canônico 64x64):
Construídos a partir do modelo anatômico de Pixel Art base, apresentando diversidade completa de identidade, papéis sociais e vestimentas do universo medieval de Grimora:

- **👨‍🍳 Mestre Bolo (`npc_padeiro`):** Baseado fielmente no sprite original com vestimenta completa branca de padeiro (*túnica e bermuda/calças brancas* com sombreamento suave) e um imponente e harmonioso chapéu *Toque Blanche* de chef/padeiro com pregas visíveis, ajustado confortavelmente sobre a cabeça e deixando as mechas da franja aparentes. Possui todas as animações canônicas: em repouso (`idle`), falando com movimento labial (`talking`), apresentando o enigma das fornadas com faíscas (`presenting`), em apuros cômicos com gota de suor na testa (`worried`) e comemorando com braços erguidos (`happy`).
- **🌿 Flora (`npc_jardineira`):** Botânica encantada com longas mechas de cabelo esmeralda/hortelã, flor rosa desabrochada no cabelo, túnica com motivos de folhas e botas de campo.
- **📐 Thorin (`npc_arquiteto`):** Jovem arquiteto do castelo com cabelo escuro obsidiana, monóculo dourado, casaco real azul safira com botões dourados e cinto de ferramentas com pergaminho de plantas arquitetônicas.
- **✨ Kael (`npc_aprendiz`):** Jovem aprendiz colega de classe com cabelo dourado espetado e uniforme púrpura oficial da Academia Grimora.

### 2. Animações Padronizadas dos NPCs:
Todos os NPCs compartilham o mesmo conjunto canônico de animações:
- `idle`: Postura de repouso com respiração suave.
- `talking`: Boca aberta em sincronia com o efeito de digitação do diálogo e micro-movimentos de cabeça.
- `presenting`: Braço estendido apontando em direção ao centro para mostrar o problema matemático, com faíscas de atenção e balão de ideia iluminado.
- `worried`: Gestos de preocupação, sobrancelha franzida e gota de suor na têmpora (utilizado ao relatar a perda de controle das quantidades).
- `happy`: Braços erguidos em comemoração, sorriso largo com dentes à mostra e estrelas douradas de parabenização.

### 3. Pequena Cutscene Animada da Missão:
Ao ingressar em uma missão (Etapa A):
- O diálogo inicial ativa a animação de fala (`talking`) do NPC.
- Nos passos onde as quantidades matemáticas são detalhadas, o NPC transiciona dinamicamente para `presenting`.
- Um **holograma animado do problema matemático** surge no centro da cena entre o NPC e o Mago:
  - **Mestre Bolo:** Fornadas fumegantes de pão 🥖 e sacos de farinha 🌾 com o enigma `6 × 4 = ?`.
  - **Flora:** Canteiros de jardim 🪴 e flores mágicas 🌺 distribuindo-se com o enigma `48 ÷ 6 = ?`.
  - **Thorin:** Torres do castelo 🏰 elevando-se sequencialmente com o enigma exponencial `3³ = ?`.
- O Mago Aprendiz reage ativando a animação de concentração (`concentrating`) com efeito de centelhas arcanas.

### 2. Estados Visuais do Mago Aprendiz (Pixel Art Canônico 32x32):
O componente `PixelMage` (`src/presentation/components/game/PixelMage.tsx`) agora renderiza o design oficial do pequeno mago aprendiz em alta definição pixel art com transparência real e interpolação *nearest-neighbor*:
- `idle` (`player_idle.png`): Postura natural com cajado e orbe verde, cachecol vermelho esvoaçante e respiração suave.
- `walking` (`player_walking.png`): Passos rítmicos alternando os pés e cachecol ondulando com o deslocamento.
- `concentrating` (`player_concentrating.png`): Olhos focados e orbe do cajado emitindo aura energética pulsante.
- `casting` (`player_casting.png`): Olhos brilhando em pura energia mágica, rajada de poder irradiando do orbe e faíscas mágicas.
- `success` (`player_success.png`): Olhos felizes em arco (`^ ^`), sorriso, bochechas coradas e estrelas douradas de vitória.
- `failure` (`player_failure.png`): Olhos caídos (`v v`), gota clássica de suor na têmpora e orbe do cajado diminuído.
- `scorched` (`player_scorched.png`): **Mago Chamuscado** após explosão matemática, tons escuros de fuligem/carvão, ponta do chapéu chamuscada com brasa incandescente, olhos em `X X` e tufos de fumaça subindo.

---

## 🎯 Como Adicionar Novos Desafios

1. Abra o arquivo `src/infrastructure/data/challenges.data.ts`.
2. Adicione uma nova entrada ao array `MOCK_CHALLENGES`:

```typescript
{
  id: 'challenge-4',
  title: 'A Runa da Área',
  stageId: 'stage-1-2',
  npcId: 'npc-ferreiro',
  spellRewardId: 'spell-geometry',
  type: 'geometry', // 'arithmetic' | 'algebra' | 'geometry' | 'equation'
  problemDescription: 'Calcule a área de um escudo triangular de base 10 e altura 6.',
  mathExpressionLatex: 'A = \\frac{10 \\times 6}{2}',
  mockCorrectAnswer: '30',
  investigationItems: [
    { label: 'Base', value: 10, unit: 'cm', highlight: true },
    { label: 'Altura', value: 6, unit: 'cm', highlight: true },
    { label: 'Área', value: '?', unit: 'cm²', highlight: false },
  ],
  hints: [
    { level: 1, title: 'Observação', text: 'Observe a fórmula da área do triângulo.' },
    { level: 2, title: 'Raciocínio', text: 'Multiplique a base pela altura e divida por 2.' },
    { level: 3, title: 'Direcionamento', text: 'Quanto é (10 × 6) ÷ 2?' },
  ],
  xpReward: 60,
  mpCost: 10,
}
```

---

## 🖼 Como Adicionar Novos Assets

1. **Imagens estáticas:** Salve em `public/assets/images/`.
2. **Spritesheets:** Ao introduzir spritesheets em PNG (ex: `mage_sheet.png`), atualize o componente `PixelMage.tsx` ou adicione classes CSS com `background-image` e `steps()`.
3. **Mantenha a regra de Pixel Art:** Todo elemento visual rasterizado deve conter a classe `.pixel-art` ou propriedade CSS `image-rendering: pixelated;`.

---

## 🔌 Guia de Integração com o Backend (ASP.NET Core)

Quando o backend em ASP.NET Core estiver pronto:

1. As interfaces já estão definidas em `src/domain/contracts/index.ts`:
   - `IPlayerRepository`
   - `ISpellRepository`
   - `IChallengeRepository`
   - `IProgressionRepository`

2. Crie uma pasta `src/infrastructure/api/` e implemente os repositórios HTTP:
```typescript
// Exemplo: src/infrastructure/api/HttpChallengeRepository.ts
import type { IChallengeRepository } from '../../domain/contracts';
import type { Challenge } from '../../domain/entities/Challenge';

export class HttpChallengeRepository implements IChallengeRepository {
  private readonly baseUrl = 'https://api.grimora.com/api/challenges';

  async getChallengeById(id: string): Promise<Challenge> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('Falha ao buscar desafio');
    return response.json();
  }

  async getAllChallenges(): Promise<Challenge[]> {
    const response = await fetch(this.baseUrl);
    return response.json();
  }
}
```

3. Em `src/infrastructure/repositories/index.ts`, basta exportar as novas instâncias HTTP no lugar dos mocks. **Nenhuma página ou componente React precisará ser alterado!**

---

## 📐 Guia de Integração do Motor Matemático Autoral

O motor matemático deve ser desenvolvido pelo proprietário. A aplicação já possui todos os pontos de integração preparados:

### 1. Contrato `IMathEngine`
Localizado em `src/domain/contracts/index.ts`:
```typescript
export interface IMathEngine {
  validateAnswer(input: string, challengeId: string): boolean;
  simplify(expression: string): string;
  solve(equation: string): { result: string; steps: string[] };
}
```

### 2. Ponto de Validação em `ResolutionPanel.tsx`
Procure pelo comentário:
```typescript
// ==========================================================================
// [AUTORAL] MOTOR MATEMÁTICO — LÓGICA DE VALIDAÇÃO
// ==========================================================================
```
Substitua a validação demonstrativa simples `answer.trim() === challenge.mockCorrectAnswer` pela chamada ao seu avaliador de expressões simbólicas.

### 3. Representações Geométricas e Algébricas
No arquivo `src/presentation/components/challenge/ResolutionPanel.tsx`, os seguintes blocos contêm os componentes reservados:
- `[PONTO DE INTEGRAÇÃO — GEOMETRIA PLANA / ESPACIAL]`: local reservado para Canvas 2D / SVG interativo.
- `[PONTO DE INTEGRAÇÃO — BALANÇA ALGÉBRICA & MANIPULAÇÃO]`: local reservado para simulação de equações e incógnitas.

---

## 🧠 Decisões Arquiteturais

1. **Clean Architecture e Inversão de Controle:**
   O domínio não tem conhecimento de React, Vite ou bibliotecas de UI. Ele define contratos (`interfaces`) que a infraestrutura implementa e que a apresentação consome.
2. **Sprites CSS procedurais como fallback:**
   Enquanto novos spritesheets em PNG não são fornecidos, o Mago e os NPCs são renderizados via CSS Art com animações completas de caminhada, conjuração, comemoração e estado chamuscado, garantindo fidelidade pixel art sem depender de imagens externas inacessíveis.
3. **Isolamento de Mocks:**
   Nenhum dado estático está acoplado a componentes. Todos os desafios, mundos, feitiços e NPCs residem estritamente na pasta `infrastructure/data/`.
