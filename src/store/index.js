import Vue from "vue";
import Vuex from "vuex";
import LocalStorage from "../module/LocalStorage";

Vue.use(Vuex);
const STORE = new LocalStorage("todo-vue");

export default new Vuex.Store({
  state: {
    // TODO
    // todos: [
    //   { tId: 0, content: 123, done: false },
    //   { tId: 1, content: 456, done: true },
    //   { tId: 2, content: 789, done: false },
    // ],
    todos: [
      { content: 123, done: false },
      { content: 456, done: true },
      { content: 789, done: false },
    ],
  },
  getters: {
    // TODO
    // 因為 tId 寫死了所以不需要
    list(state) {
      // 給假id
      return state.todos.map((todo, tId) => {
        return {
          todo,
          tId,
        };
      });
    },
    // all
    filterList(state, getters) {
      return (filter) => {
        switch (filter) {
          case "all":
            return getters.list;
          case "active":
            return getters.list.filter((todo) => {
              return !todo.todo.done;
            });
          case "done":
            return getters.list.filter((todo) => {
              return todo.todo.done;
            });
          default:
            return [];
        }
      };
    },
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
  },
  actions: {
    createTodo({ commit }, payload) {
      // 讀取跟新增
      const todos = STORE.load();
      // console.log(payload);
      todos.push(payload);
      // console.log(todos);
      STORE.set(todos);
      // 寫入state
      commit("setTodos", todos);
      // 返回
      return {
        tId: todos.length - 1,
        payload,
      };
    },
    readTodos({ commit }) {
      // 讀取
      // window.localStorage.getItem('XXX')
      const todos = STORE.load();
      // 寫入state
      commit("setTodos", todos);
      // 返回
      return {
        todos,
      };
    },
    // TODO
    // 因應 tId 調整需要改
    // 用 array.findIndex 找到要修改的 tId 做修改
    updateTodo({ commit }, { tId, content }) {
      // 讀取
      const todos = STORE.load();
      console.log("id:" + tId, "content:" + content);
      console.log(todos);
      // 修改這筆todo
      todos.splice(tId, 1, { content, done: false });
      STORE.set(todos);
      // 寫入state
      commit("setTodos", todos);
      // 返回
      return {
        tId,
        content,
      };
    },
    // TODO
    // 因應 tId 調整需要改
    // 用 array.filter 過濾不需要的 tId
    deleteTodo({ commit }, { tId }) {
      // 讀取
      const todos = STORE.load();
      // 刪出來的
      // console.log(commit);
      const todo = todos.splice(tId, 1)[0];
      // console.log(todo);
      // localStorage.setItem
      STORE.set(todos);
      // 寫入state
      commit("setTodos", todos);
      // 返回
      return {
        tId: null,
        todo,
      };
    },
    upRecord({ commit, getters }, payload) {
      // 讀取跟新增
      const todos = STORE.load();

      console.log(payload);
      // console.log(todos);
      console.log(getters.filterList("all")[1]);
      // let newList = [...getters.filterList("all")];
      //   this.list[index - 1] = this.list[index];
      // this.list[index] = newList[index - 1];
      // index = index - 1;
      STORE.set(todos);
      commit("setTodos", todos);
    },
    // TODO
    // 因應 tId 調整需要改
    // 用 array.findIndex 找到要修改的 tId 做修改
    checkTodo ({ commit }, { tId, done }) {
      // UPDATE_TODO ({ commit }, { tId, content }) {
        // 1. PATCH axios.patch()
        const todos = STORE.load()
        todos[tId].done = done
        // todos[tId].content = content
        STORE.set(todos)
        // 2. commit mutation
        commit('setTodos', todos)
        // 3. return
        return {
          tId,
          todo: todos[tId]
      }
    },
  },
  // upRecord: function(index) {
  //   if (index === 0) {
  //     console.log("是最上層０");
  //     return;
  //   }
  //   console.log(this.todos);
  //   // console.log(this.list);
  //   console.log(index);
  //   // let newList = [...this.list];
  //   // console.log(newList);
  //   // this.list[index - 1] = this.list[index];
  //   // this.list[index] = newList[index - 1];
  //   // index = index - 1;
  //   // console.log(index);
  // },
});
