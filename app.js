const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reserveme',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MariaDB');
});

//caminho da Rota
app.post('/cadastro', (req, res) => {
  const dados = req.body; 

  connection.query(
    'INSERT INTO contratante2 (email, nome, genero, celular, senha, dataNascimento, tipoDocumento, documento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [dados.email, dados.nome, dados.genero, dados.celular, dados.senha, dados.nascimento, dados.tipoDocumento, dados.numeroDocumento],
    (error, results) => {
      if (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Erro ao cadastrar dados' });
        alert('Não deu certo');
        return;
      }

      res.status(200).json({ success: true, message: 'Cadastro realizado com sucesso' });
      console.log('Deu certo!! ', dados);
    }
  );
});


// Rota para receber os dados do formulário
app.post('/profissionais', (req, res) => {
  const data = req.body;

    connection.query(
      'INSERT INTO profissionais (usuario, senha, servico_prestado, observacoes, local_atendimento, segunda,segunda_inicio, segunda_fim, terca, terca_inicio, terca_fim, quarta, quarta_inicio, quarta_fim, quinta, quinta_inicio, quinta_fim, sexta, sexta_inicio, sexta_fim, sabado, sabado_inicio, sabado_fim, domingo,domingo_inicio, domingo_fim) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [data.usuario, data.senha, data.servico, data.observacoes, data.local, data.segundaChecked, data.segundaHoraInicio, data.segundaHoraFim, data.tercaChecked, data.tercaHoraInicio, data.tercaHoraFim, data.quartaChecked, data.quartaHoraInicio, data.quartaHoraFim, data.quintaChecked, data.quintaHoraInicio, data.quintaHoraFim, data.sextaChecked, data.sextaHoraInicio, data.sextaHoraFim, data.sabadoChecked, data.sabadoHoraInicio, data.sabadoHoraFim, data.domingoChecked, data.domingoHoraInicio, data.domingoHoraFim],
      (error, results) => {
        if (error) {
          console.error('Erro ao inserir dados:', error);
          res.status(500).json({ error: 'Erro ao cadastrar dados' });
          return;
        }
  
        
        res.status(200).json({ success: true, message: 'Cadastro realizado com sucesso' });
      }
    );
  });

  
// Rota para obter dados de todos os profissionais
app.get('/profissionais', (req, res) => {
  const query = 'SELECT * FROM profissionais';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta:', error);
      res.status(500).send('Erro ao processar a requisição.');
      return;
    }

    res.status(200).json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



