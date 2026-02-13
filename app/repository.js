const Database = require('./database')

class Repository {
  static async consultar(id, email) {
    console.log('ID: ', id)
    console.log('EMAIL: ', email)
    const db = Database.getInstance()
    const contrato = await db.query('SELECT * FROM Contrato WHERE id = $1 AND email = $2', [id, email])
    await db.close()
    console.log('CONTRATO: ', contrato)
    return contrato
  }

  static async concluir(email, conteudoContrato) {
    const db = Database.getInstance()
    const contrato = await db.query('INSERT INTO Contrato(email,conteudoContrato) VALUES($1,$2) RETURNING id'
      , [email, JSON.stringify(conteudoContrato)])
    console.log('CONTRATO: ', contrato)
    await db.close()
    return contrato[0]
  }

  static async atualizar(id, status, idPagamento) {
    const db = Database.getInstance()
    const contrato = await db.query('UPDATE Contrato SET status = $1, idPagamento = $2 WHERE id = $3 RETURNING id, email, conteudoContrato', [status, idPagamento, id])
    await db.close()
    return contrato[0]
  }
}

module.exports = Repository