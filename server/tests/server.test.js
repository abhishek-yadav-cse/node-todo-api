const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');



//make up some dummy data into database
const todos = [{
  _id : new ObjectID(),
  text: 'First test todo'
}, {
  _id : new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];
//removing the things the database before running everything
beforeEach((done) => {
  Todo.remove({}).then(() => {
  return Todo.insertMany(todos);
}).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        //make request to database
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });


  //test case to see if the invalid body data was there
  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })

  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
  });

  it('should return 404 if todo not found', (done) => {
      //make sure a 404 is found

      var hexId = new ObjectID().toHexString();
       request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    // /todos/123 --> should return 404 for this
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });

});




//test for DELETE
describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        //querry database using findById
        //expect(null).toNotExist();

        Todo.findById(hexID).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });

  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
     request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  //
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});




//writing test cases for patch
describe('PATCH /todos/:id', () => {

  it('should update the todo', (done) => {
    //grad id of first item
    //update text, set completed true
    // 200
    // custom assertion - response body has text, text is changed, completed is true,
    //completedAt is a number use .toBeA for things

    var hexID = todos[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        completed: true,
        text: text
        //or simply write text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });


  it('should clear completedAt when todo is not completed', (done) => {
    //grab id of second todo item
    //update text, set completed to false
    //200
    //text is changed, completed false, completedAt is null .toNotExist
    //

    var hexID = todos[1]._id.toHexString();
    var text = 'This should be the new text!!';

    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        completed: false,
        text: text
        //or simply write text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);


  });
});
