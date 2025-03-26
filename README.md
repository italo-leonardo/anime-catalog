# Catálogo de Animes

Aplicação web full-stack para gerenciamento de um catálogo de animes com funcionalidades CRUD.

## 🛠 Tecnologias

### Backend (Repositório: `Backend-anime`)
- **NestJS**: Framework Node.js para construção eficiente de APIs
- **Prisma**: ORM para interação com banco de dados
- **SQLite**: Banco de dados relacional embutido
- **TypeScript**: Tipagem estática

### Frontend (Repositório: `anime-catalog`)
- **Next.js**: Framework React com SSR
- **Tailwind CSS**: Estilização utilitária
- **Axios**: Cliente HTTP
- **TypeScript**: Tipagem estática

## 📋 Pré-requisitos

- Node.js v18+
- npm ou yarn
- Git (opcional)

---

## 🚀 Configuração do Backend

### 1. Clonar repositório
```bash
git clone https://github.com/seu-usuario/Backend-anime.git
cd Backend-anime

2. Instalar dependências

npm install

3. Configurar banco de dados

npx prisma migrate dev --name init

4. Iniciar servidor

npm run start:dev

🔌 Endpoints disponíveis

Método	Endpoint	Descrição

GET	/animes	Listar todos
POST	/animes	Criar novo anime
PUT	/animes/:id	Atualizar anime
DELETE	/animes/:id	Excluir anime

Acesse a documentação da API em: http://localhost:3000/docs (se usar Swagger)

🎨 Configuração do Frontend

1. Clonar repositório

    git clone https://github.com/seu-usuario/anime-catalog.git
    cd anime-catalog

2. Instalar dependências

    npm install

3. Configurar variáveis de ambiente

    NEXT_PUBLIC_API_URL=http://localhost:3000/animes

4. Iniciar aplicação
     npm run dev

Acesse no navegador: http://localhost:3001

Desenvolvido por Italo Leonardo
📧 Contato: italoleonardonv@gmail.com
🔗 GitHub: Italo_Leonardo