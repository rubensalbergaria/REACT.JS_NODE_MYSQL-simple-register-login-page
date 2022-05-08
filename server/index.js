const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json()); //usado para parsear todo objeto json enviado pelo front end
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "3.91.244.79",
  password: "Galodoido84",
  database: "loginsystem",
})

app.post('/register', (req, res) => {

  const username = req.body.username   //o nome dessas variaveis tem q ser igual ao das presentes no Axios.post 
  const password = req.body.password

  db.query("INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      console.log(err)
  })
})

app.post('/login', (req, res) => {
  const username = req.body.username   //o nome dessas variaveis tem q ser igual ao das presentes no Axios.post 
  const password = req.body.password

  db.query("SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({err: err}) //se tiver um erros na query, vc manda o erro pro front em forma de objeto
      } 

      if (result.length > 0) { //se a combinação da query (batendo login e senha) existir, ou seja, se tiver alguma (> 0) 
        res.send(result) //se bater a query, vc manda o username e o password pro front
        } else {
          res.send({message: "Wrong username/password combination!"}) //se nao bater, vc manda um objeto contendo essa msg
        }    

  })
})

app.listen(3333, () => {
  console.log('running on port 3333');
});
