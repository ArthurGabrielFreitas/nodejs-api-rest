class Tabelas{
    init(conexao){
        this.conexao = conexao

        this.cirarAtendimentos()
    }

    cirarAtendimentos() {
        const sql = 'CREATE TABLE Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        this.conexao.query(sql, (erro) =>{
            if(erro){
                console.log(erro)
            } else{
                console.log('Tabela criada corretamente')
            }
        })
    }
}

module.exports = new Tabelas