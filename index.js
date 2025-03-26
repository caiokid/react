const express = require("express");
let app = express();
const cors = require("cors");
const pool = require('./db');


//JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));


//ROTAS



app.post('/todos', async (req,res)=>{
  const {description} = req.body;

    try {
      const newTodo = await pool.query("INSERT INTO todos (description) VALUES($1)",[description]);
      res.json(newTodo.rows[0]);
  
    } catch (error) {
      console.log(error);
    }
  

  
})



app.get('/todos', async (req,res)=>{


  try {
    //const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todos");


    res.json(todo.rows);

  } catch (error) {
    console.log(error);
  }
})



app.put('/todos/:id',async (req,res)=>{
  
  try {

    const {id} = req.params;
    const {description} = req.body;
    const Update = await pool.query("UPDATE todos SET description = $1 WHERE todo_id =$2",[description, id]);

    res.json(Update);

  } catch (error) {

    console.log(error);

  }

})


app.put('/todos/:id', async (req,res)=>{

  try {
    const {id} = req.params;
    const {description} = req.body;
    const Update = await pool.query("UPDATE todos SET description = $1 WHERE todo_id =$2",[description, id]);

    res.json("Atualizou");

  } catch (error){
    console.log(error);
  }
})


app.delete('/todos/:id',async (req,res)=>{
  try {
    const {id} = req.params;
    const Delete = await pool.query("DELETE FROM todos WHERE todo_id =$1",[id]);
    res.json("Deletado Pai");
  } catch (error) {
    console.log(error);
  }
})







//ROTAS
 


//PORTAS

app.listen(5000,()=>{
    console.log('Rodando');
});

//PORTAS
