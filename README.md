# 🍼 donations-web-app

Um aplicativo web para facilitar o gerenciamento e recebimento de doações.


## Funcionalidades

- Cadastro de doações e doadores
- Visualização e filtragem de doações recebidas
- Interface intuitiva para acompanhar o histórico de doações

## Requisitos

- Node.js (versão recomendada: 14.x ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/larascremin/donations-web-app.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd donations-web-app
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Como Usar

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
2. Acesse o aplicativo em [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

```
donations-web-app/
│
├── public/                  # Arquivos estáticos públicos (index.html, favicon, imagens)
│   └── ...
│
├── src/                     # Código-fonte principal da aplicação
│   ├── assets/              # Imagens, fontes e outros recursos estáticos
│   ├── components/          # Componentes reutilizáveis da interface (ex: Botões, Inputs)
│   ├── pages/               # Páginas/views principais da aplicação (Dashboard, Cadastro, etc.)
│   ├── services/            # Serviços de integração com APIs e lógica de negócio
│   ├── styles/              # Estilos globais e temas CSS/SASS
│   ├── utils/               # Funções utilitárias e helpers
│   └── App.js               # Componente principal da aplicação
│
├── .env                     # Variáveis de ambiente (se necessário)
├── .gitignore               # Arquivos/pastas ignorados pelo Git
├── package.json             # Dependências, scripts e configurações do projeto
├── README.md                # Documentação do projeto
└── ...
```

## Contribuindo

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Faça commit das suas alterações (`git commit -m 'Minha nova feature'`)
4. Faça push para a sua branch (`git push origin minha-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

---

Se precisar de instruções mais específicas (por exemplo, detalhes sobre autenticação ou integração com APIs), por favor, me avise!
