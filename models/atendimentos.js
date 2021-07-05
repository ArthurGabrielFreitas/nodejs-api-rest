const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')

        const dataValida = moment(dataAtendimento).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 3

        const validacoes = [
            {nome: 'data',
            valido: dataValida,
            mensagem: 'Data deve ser igual ou após a data atual'
        },
            {nome: 'cliente',
            valido: clienteValido,
            mensagem: 'Nome do cliente deve ter pelo menos três caracteres'
        }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        } else{

            const atendimentoDatado = {...atendimento, dataCriacao, dataAtendimento}
            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                }else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

    conexao.query(sql, (erro, resultados) =>{
        const atendimento = resultados[0]
        if(erro){
            res.status(400).json(erro)
        } else{
            res.status(200).json(atendimento)
        }
    })
    }

    altera(id, valores, res){
        if(valores.dataAtendimento){
            valores.dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Atendimento