import './listView.css';

const buildTodoList = (todos) => {
  const listElm = document.createElement('ul');
  listElm.className = 'list';

  todos.forEach((todo, i) => {
    const itemElm = document.createElement('li');
    itemElm.innerText = todo;
    listElm.appendChild(itemElm);
  });

  return listElm;
};

export default buildTodoList;
