\c legal_docs

CREATE TABLE IF NOT EXISTS Contrato (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(200) NOT NULL,
  conteudoContrato TEXT NOT NULL,
  idPagamento BIGINT,
  status VARCHAR(200),
  dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)