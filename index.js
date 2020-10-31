const express = require('express');
const port = 9000;
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
//app.use(cors());
const Todo = require('./app');

var todos = [{id:1, title:'buy the milk', text:"cat",date:"june", completed:false}, {id:2, title:'rent a car',text:"cats",date:"june", isCompleted:false}, {id:3, title:'feed the cat',text:"catss",date:"june",isCompleted:false}];
var count = todos.length;

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000'
  }));


app.get('/db/todo', function(request, response){
    Todo.all((err, todos) =>{
      let newTodos = todos.map((todo) => {
        if(todo.completed == 1) {
          todo.completed = true;
        } else {
          todo.completed = false;
        }
        return todo;
      });

     response.status(200).json(newTodos);
    });
});
  
  app.post('/db/todo', (request, response) => {
      //console.log(request.body);
      var newTodo = request.body;// JSON.parse(request.body);
      newTodo.id = Math.floor((Math.random() * 100) + 1);
      Todo.add(newTodo);
      response.status(201).json(newTodo);
  });
  
  app.put('/db/todo/:id', (request, response) => {
    var id = request.params.id;
    var updatedTodo = request.body;
    updatedTodo.id = parseInt(id);
    Todo.update(updatedTodo, (err, data) => {
      if(err)
      {
        console.log("Update err", err);
        response.status(404, 'The task is not found').send();
      } else {
      response.status(200).json(updatedTodo);
    }
  });
  });
  app.delete('/db/todo/:id', (request, response) => {
    var id = parseInt(request.params.id);
    Todo.delete(id, (err) => {
      if(err){
        response.status(404).send();
      }else{
            response.status(200).send();
      }
    });
  });  

  
/*app.get('/', (request, response) => response.status(200).json(todos));

app.post('/', (request, response) => {
    var newTodo = JSON.parse(request.body);
    count = count +1;
    newTodo.id = count;
    todos.push(newTodo);
    response.status(200).json();
});

app.put('/:id', (request, response) => {
  var id = request.params.id;
  if (todos[id]){
    var updatedTodo = JSON.parse(request.body);
    todos[id] = updatedTodo;
    response.status(200).send();
  }else{
    response.status(404, 'The task is not found').send();
  }
});

app.delete('/:id', (request, response) => {
  var id = parseInt(request.params.id);
  if(todos.filter(todo => todo.id == id).length !== 0){
    todos = todos.filter(todo => todo.id !== id);
    response.status(200).send();
  }else{
    response.status(404).send();
  }
});*/
app.listen(port);
