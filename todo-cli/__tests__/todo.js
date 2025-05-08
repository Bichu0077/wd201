const { describe, test, expect } = require('node:test');
const todolist = require('../todo');

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todolist();

describe('Todo List Test Suite', () => {
    
    // Common due dates for test filtering
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]; // -1 day
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0]; // +1 day

    test("Add a new todo", () => {
        const initialCount = all.length;
        add({ title: "Buy groceries", completed: false, dueDate: today });
        expect(all.length).toBe(initialCount + 1);
    });

    test("Mark a todo as complete", () => {
        add({ title: "Finish project", completed: false, dueDate: today });
        const index = all.length - 1;
        markAsComplete(index);
        expect(all[index].completed).toBe(true);
    });

    test("Retrieve overdue items", () => {
        add({ title: "Overdue Task", completed: false, dueDate: yesterday });
        const items = overdue();
        expect(items.every(todo => todo.dueDate < today)).toBe(true);
    });

    test("Retrieve due today items", () => {
        add({ title: "Due Today Task", completed: false, dueDate: today });
        const items = dueToday();
        expect(items.every(todo => todo.dueDate === today)).toBe(true);
    });

    test("Retrieve due later items", () => {
        add({ title: "Future Task", completed: false, dueDate: tomorrow });
        const items = dueLater();
        expect(items.every(todo => todo.dueDate > today)).toBe(true);
    });
});
