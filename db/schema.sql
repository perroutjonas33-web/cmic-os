-- ============================================
-- CMIC OS System - Schema PostgreSQL (Supabase)
-- ============================================

-- Tabela de Setores
CREATE TABLE IF NOT EXISTS setores (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO setores (name, description) VALUES
  ('Operacional', 'Setor Operacional'),
  ('Comercial', 'Setor Comercial'),
  ('Gerência', 'Setor de Gerência')
ON CONFLICT (name) DO NOTHING;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  setor_id BIGINT REFERENCES setores(id),
  role VARCHAR(20) DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Logs de Login
CREATE TABLE IF NOT EXISTS login_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  success BOOLEAN DEFAULT TRUE
);

-- Tabela de Ordens de Serviço
CREATE TABLE IF NOT EXISTS os (
  id BIGSERIAL PRIMARY KEY,
  numero VARCHAR(50) NOT NULL UNIQUE,
  setor_id BIGINT NOT NULL REFERENCES setores(id),
  cliente_nome VARCHAR(255),
  cliente_cnpj VARCHAR(18),
  cliente_endereco TEXT,
  os_responsavel VARCHAR(100),
  os_data DATE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  dados JSONB,
  created_by BIGINT REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Check Lists
CREATE TABLE IF NOT EXISTS checklists (
  id BIGSERIAL PRIMARY KEY,
  os_id BIGINT NOT NULL REFERENCES os(id) ON DELETE CASCADE,
  setor_id BIGINT NOT NULL REFERENCES setores(id),
  dados JSONB,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Passagem de Escopo
CREATE TABLE IF NOT EXISTS passagem_escopo (
  id BIGSERIAL PRIMARY KEY,
  os_id BIGINT NOT NULL REFERENCES os(id) ON DELETE CASCADE,
  setor_id BIGINT NOT NULL REFERENCES setores(id),
  dados JSONB,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Visita Técnica
CREATE TABLE IF NOT EXISTS visita_tecnica (
  id BIGSERIAL PRIMARY KEY,
  os_id BIGINT NOT NULL REFERENCES os(id) ON DELETE CASCADE,
  setor_id BIGINT NOT NULL REFERENCES setores(id),
  dados JSONB,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Fotos
CREATE TABLE IF NOT EXISTS fotos (
  id BIGSERIAL PRIMARY KEY,
  os_id BIGINT REFERENCES os(id) ON DELETE CASCADE,
  setor_id BIGINT NOT NULL REFERENCES setores(id),
  url VARCHAR(500),
  nome VARCHAR(255),
  tipo VARCHAR(50),
  observacao TEXT,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Índices para Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_setor ON users(setor_id);
CREATE INDEX IF NOT EXISTS idx_os_setor ON os(setor_id);
CREATE INDEX IF NOT EXISTS idx_os_numero ON os(numero);
CREATE INDEX IF NOT EXISTS idx_checklists_os ON checklists(os_id);
CREATE INDEX IF NOT EXISTS idx_login_logs_user ON login_logs(user_id);
