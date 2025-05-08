const { describe, default: test } = require('node:test');
const todolist = require('../todo');

const {all,markAsComplete,add} = todolist();

describe('Todo List', () => {
    test("should add todo ",() => {
        expect(all.length).toBe(0);

        add({title: 'Test Todo',completed: false,dueDate: new Date().toISOString().split("T")[0]});
        expect(all.length).toBe(1);
    })
});