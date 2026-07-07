# CMIC OS System - Sistema Integrado de Ordens de Serviço

Sistema profissional para gerenciamento de Ordens de Serviço (OS) com autenticação, multi-usuário por setor e permissões granulares.

## ✨ Recursos

### Autenticação & Segurança
- ✅ Login/Signup com Email + Senha
- ✅ JWT para autenticação stateless
- ✅ Hash bcrypt para senhas
- ✅ Logging de todos os logins (IP, hora, sucesso/erro)
- ✅ Controle de permissões por setor

### Multi-Usuário
- ✅ 3 Setores: Operacional, Comercial, Gerência
- ✅ Self-signup (qualquer pessoa se cadastra)
- ✅ Admin que vê tudo e gerencia usuários
- ✅ Isolamento de dados por setor

### Permissões
- ✅ **Leitura:** Qualquer usuário vê documentos de todos os setores
- ✅ **Escrita:** Edita apenas documentos do seu setor
- ✅ **Admin:** Acesso total + gerenciamento de usuários

### Banco de Dados
- ✅ PostgreSQL via Supabase
- ✅ Row Level Security (RLS) automático
- ✅ Tabelas para: OS, Check List, Passagem de Escopo, Visita Técnica, Fotos
- ✅ Logs de login para auditoria

### Dashboard & Admin
- ✅ Dashboard do usuário (seus documentos)
- ✅ Painel Admin (gerenciar usuários + logs)
- ✅ Interface responsiva (Mobile/Tablet/Desktop)

## 🚀 Quick Start

### 1. Setup Supabase (5 min)

```bash
# 1. Execute o SQL schema
# - Copie conteúdo de db/schema.sql
# - Cole no Supabase SQL Editor
# - Clique em Run

# 2. Copie credenciais
# - Vá em Settings > API
# - Copie Project URL, anon key, service key
```

### 2. Configurar .env

```bash
cp .env.example .env

# Edite .env com suas credenciais Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=seu_anon_key
SUPABASE_SERVICE_KEY=seu_service_key
```

### 3. Rodar Localmente

```bash
npm install
npm start

# Acesse:
# - Login: http://localhost:3000
# - Dashboard: http://localhost:3000/dashboard
# - Admin: http://localhost:3000/admin
```

## 📁 Estrutura

```
├── backend/
│   ├── config/          (Supabase, JWT)
│   ├── controllers/     (Lógica: auth, users)
│   ├── middleware/      (Auth, permissões)
│   └── routes/          (API endpoints)
├── public/
│   ├── login.html       (Página Login/Signup)
│   ├── dashboard.html   (Dashboard usuário)
│   └── admin/           (Painel Admin)
├── db/
│   └── schema.sql       (Tabelas + RLS)
└── server.js            (Servidor Express)
```

## 🔌 API Endpoints

```
POST   /api/auth/signup          (Público - Registrar novo usuário)
POST   /api/auth/login           (Público - Fazer login)
GET    /api/auth/me              (Autenticado - Dados do usuário)

GET    /api/users/               (Admin - Listar todos os usuários)
GET    /api/users/:id            (Admin - Detalhes usuário)
PUT    /api/users/:id            (Admin - Editar usuário)
DELETE /api/users/:id            (Admin - Desativar usuário)
GET    /api/users/logs/login     (Admin - Logs de login)
```

## 🔐 Segurança

- Senhas com hash bcrypt (10 rounds)
- JWT com expiração 24h
- Row Level Security (RLS) no Supabase
- Validação de input em backend
- CORS configurado
- Logging de tentativas de login

## 📱 Compatibilidade

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Tablet (iOS, Android)

## 🗓️ Roadmap

- [ ] Dashboard com dados dos documentos
- [ ] Admin panel profissional
- [ ] Upload de fotos em Supabase Storage
- [ ] Export PDF dos documentos
- [ ] Integração com seu HTML original (index.html → dashboard.html)
- [ ] Deploy no Vercel/Railway

## 📖 Documentação

- `SETUP.md` - Guia completo de setup
- `DEPLOY.md` - Guia de deployment
- `db/schema.sql` - Schema PostgreSQL com RLS

## 🚀 Próximas Etapas

1. Executar `db/schema.sql` no Supabase
2. Preencher `.env` com credenciais
3. Rodar `npm start`
4. Testar: Signup → Login → Dashboard
5. Criar usuário admin no Supabase
6. Testar painel admin (usuários + logs)
7. Integrar seu HTML original
8. Deploy!

## 💡 Desenvolvimento

**Sem "remendos"** - Arquitetura profissional:
- Controllers separados por funcionalidade
- Middleware reutilizável
- Rotas modulares
- Config centralizada
- Fácil de expandir

**Adicionar nova funcionalidade?**
1. Criar rota em `backend/routes/`
2. Criar controller em `backend/controllers/`
3. Adicionar middleware de auth se necessário
4. Integrar no `server.js`

## 📞 Suporte

Dúvidas ou problemas? Me avisa! 🚀

Desenvolvido com ❤️ para CMIC Soluções
