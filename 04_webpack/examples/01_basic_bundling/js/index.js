import todos from './model';
import buildTodoList from './listView';

const list = buildTodoList(todos);

const root = document.getElementById('root');

root.append(list);