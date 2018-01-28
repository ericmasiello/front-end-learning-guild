const buildTodoList = (todos) => {
  const listElm = document.createElement('ul');
  todos.forEach((todo, i) => {
    const itemElm = document.createElement('li');
    itemElm.innerText = todo;
    listElm.append(itemElm);
  });

  return listElm;
};

export default buildTodoList;
