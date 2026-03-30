# Central de Chamados

Aplicação Angular 19 criada para o desafio técnico de Analista Front-End. O projeto simula o gerenciamento de chamados corporativos com listagem, cadastro, validação de formulário, feedback visual ao usuário e layout responsivo para desktop e mobile.

## Tecnologias utilizadas

- Angular 19 com componentes standalone e roteamento.
- PrimeNG 19, PrimeIcons e tema Aura para tabela, formulário, botões, tags e toasts.
- TypeScript e Reactive Forms para modelagem tipada e validações.
- Signals para estado local em memória no serviço de chamados.
- Mock local em TypeScript para simular a origem de dados sem depender de backend.

## Justificativas das escolhas

- Angular 19: entrega uma base moderna, organizada e adequada para componentização, testes e roteamento.
- PrimeNG: atende diretamente ao requisito do desafio e acelera a construção de uma interface consistente e acessível.
- Serviço com mock local: permite demonstrar arquitetura de front-end, fluxo de criação e atualização de estado sem adicionar complexidade desnecessária de API.
- Signals: simplificam o gerenciamento do estado local e deixam a atualização da listagem imediata após o cadastro.

## Funcionalidades entregues

- Listagem de chamados com ID, título, descrição e categoria.
- Cadastro de novo chamado com título, descrição e categoria.
- Edição de chamados existentes diretamente pela listagem.
- Exclusão de chamados com confirmação antes da remoção.
- Validações para impedir envio de campos obrigatórios vazios.
- Feedback com toast para sucesso no cadastro e aviso de validação.
- Estado vazio com chamada para ação.
- Navegação entre listagem e criação por roteamento.
- Responsividade para diferentes larguras de tela.

## Estrutura resumida

```text
src/app
├─ chamados
│  ├─ data
│  ├─ models
│  ├─ pages
│  ├─ services
│  └─ validators
├─ app.component.*
├─ app.config.ts
└─ app.routes.ts
```

## Como executar

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm start
```

Abra `http://localhost:4200/`.

### Build de produção

```bash
npm run build
```

### Testes

Modo padrão do Angular:

```bash
npm test
```

Modo headless, útil para validação rápida:

```bash
npm run test:ci
```

## Decisões de implementação

- Os dados são mantidos em memória durante a execução da aplicação.
- Novos chamados recebem ID sequencial com base no maior ID existente.
- O chamado recém-criado aparece no topo da listagem para facilitar conferência.

## Uso de IA e ferramentas de apoio

- Ferramentas utilizadas: `Codex / ChatGPT` e `Copilot` como apoio de implementação e revisão.
- Tipo de uso: apoio para escrita de código, testes e documentação.

## Percentual estimado de autoria

- Código escrito: `70%`
- Código gerado com apoio de IA: `30%`

## Observações finais

- O projeto não possui persistência após recarregar a página.
- A solução prioriza clareza, componentização e aderência ao escopo pedido no enunciado.
