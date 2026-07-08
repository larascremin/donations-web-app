# 🍼 donations-web-app

Aplicativo web para conectar doadores e instituições, facilitando a solicitação, o gerenciamento e o acompanhamento de doações.

Frontend em React + Vite que consome a [API do backend](https://github.com/Danielarceeno) (Spring Boot, autenticação JWT).

## Funcionalidades

- Autenticação (login, cadastro, recuperação de senha) com JWT
- Doadores: buscar solicitações de doação e confirmar/cancelar doações feitas
- Instituições: criar/editar solicitações, listar e confirmar doações recebidas
- Perfil de usuário com upload de avatar
- PWA (instalável, com service worker)

## Requisitos

- Node.js 20+
- npm

## Instalação

```bash
git clone https://github.com/larascremin/donations-web-app.git
cd donations-web-app
npm install
```

## Configuração de ambiente

Copie `.env.example` para `.env` e ajuste conforme seu backend:

```bash
cp .env.example .env
```

```properties
# URL base da API (backend Spring Boot)
VITE_API_URL=http://localhost:8080/api
```

O backend precisa estar rodando e aceitando CORS da origem do frontend (ver `SecurityConfig` do backend).

## Como usar

```bash
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção localmente
npm run lint      # ESLint
npm run test      # roda a suíte de testes (Vitest)
```

## Estrutura do projeto

```
donations-web-app/
├── src/
│   ├── assets/          # imagens e vetores
│   ├── components/      # componentes reutilizáveis (NavigationBar, PasswordInput, ProtectedRoute...)
│   ├── hooks/            # UserContext (estado de autenticação global)
│   ├── pages/
│   │   ├── auth/         # login, cadastro, reset de senha
│   │   ├── tabHome/      # dashboard inicial
│   │   ├── tabFinder/    # busca de solicitações de doação
│   │   ├── tabDonation/  # doações/solicitações do usuário logado
│   │   └── tabProfile/   # perfil do usuário
│   ├── services/         # api.js (cliente axios + interceptors JWT), logger.js
│   └── styles/            # CSS global e variáveis de tema
├── .env.example
├── vite.config.js
└── .github/workflows/ci.yml
```

## Autenticação

O token JWT retornado por `POST /auth/login` é salvo em `localStorage` e injetado automaticamente em todas as requisições pelo interceptor do axios (`src/services/api.js`). Um 401 na resposta limpa a sessão e desloga o usuário. Rotas autenticadas usam `ProtectedRoute` (`src/components/ProtectedRoute.jsx`), que redireciona para `/auth` quando não há usuário logado.

## Testes e CI

Testes com Vitest + React Testing Library (`npm run test`). O workflow `.github/workflows/ci.yml` roda lint, testes e build a cada push/PR para `main`.

## Contribuindo

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Faça commit das suas alterações (`git commit -m 'Minha nova feature'`)
4. Faça push para a sua branch (`git push origin minha-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
