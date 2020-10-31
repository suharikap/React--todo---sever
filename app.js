//import { Database } from 'sqlite3';
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./temp1.db");
var express = require("express");

//var bflag = Boolean(“true”);

db.serialize(() => {
  //db.run("drop table todos");
  const sql =
    "CREATE TABLE IF NOT EXISTS todos (id integer primary key, title, text, date, completed )";
  db.run(sql);
});

class Todo {
  constructor(id, title, text, date, completed) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.date = date;
    this.completed = completed;
    //this.isCompleted = isCompleted;
  }

  static all(callback) {
    db.all("SELECT * FROM todos", callback);
  }

  static add(todo) {
    const sql =
      "INSERT INTO todos(id, title, text, date, completed) VALUES(?,?,?,?,?)";
    db.run(
      sql,
      todo.id,
      todo.title,
      todo.text,
      todo.date,
      todo.completed
      //todo.completed ? 1 : 0,
     // todo.isCompleted
    );
  }

  static update(todo, callback) {
    console.log("update reques", todo);
    const sql =
      "UPDATE todos SET title = ?, text = ?, date=?, completed=? WHERE id = ?";
    db.run(
      sql,
      todo.title,
      todo.text,
      todo.date,
      todo.completed,
     // todo.completed ? 1 : 0,
     // todo.isCompleted,
      todo.id,
      callback
    );
  }

  static delete(id, callback) {
    const sql = "DELETE FROM todos where id = ?";
    db.run(sql, id, callback);
  }
}

//export default Todo;
module.exports = Todo;
