const sendGraphql = ({ query }) => fetch('/graphql', {
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ query }),
  method: 'POST',
}).then((it) => it.json())
  .then((result) => {
    if (result.errors) {
      throw result;
    }
    return result;
  });

const addTask = ({ name }) => sendGraphql({ query: `mutation { addTask(name: "${name}") { id name } }` });
const updateTask = ({ id, name }) => sendGraphql({ query: `mutation { updateTask(id: ${id}, name: "${name}") { id name } }` });
const deleteTask = ({ id }) => sendGraphql({ query: `mutation { deleteTask(id: ${id}) { success } }` });

const addNewTaskEvent = (form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    event.target.reset();
    const name = data.get('name');
    addTask({ name })
      .then(({ data: { addTask: { id, name } } }) => renderTask({ id, name }));
  });
};

const addUpdateTaskEvent = (container) => {
  const input = container.querySelector('input');
  input.addEventListener('click', (event) => {
    if (event.target.readOnly) {
      event.target.readOnly = false;
      event.target.style = '';
    }
  });
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      updateTask({ id: event.target.dataset.id, name: event.target.value })
        .then(() => {
          event.target.readOnly = true;
          event.target.style = 'border:none; outline:none; background-color:inherit;';
        });
    }
  });
};

const addDeleteTaskEvent = (container) => {
  const button = container.querySelector('input');
  button.addEventListener('click', (event) => {
    deleteTask({ id: event.target.dataset.id })
      .then(() => event.target.parentElement.parentElement.remove());
  });
};
const renderTask = ({ id, name }) => {
  const table = document.querySelector('table');
  const row = table.insertRow(1);
  const nameCell = row.insertCell(0);
  const nameInput = document.createElement('input');
  nameInput.value = name;
  nameInput.style = 'border:none; outline:none; background-color:inherit;';
  nameInput.type = 'text';
  nameInput.readOnly = true;
  nameInput.dataset.id = id;
  nameCell.append(nameInput);
  addUpdateTaskEvent(nameCell);

  const actionsCell = row.insertCell(1);
  const deleteInput = document.createElement('input');
  deleteInput.classList.add('btn', 'btn-danger');
  deleteInput.value = 'Delete';
  deleteInput.type = 'button';
  deleteInput.dataset.id = id;
  actionsCell.append(deleteInput);
  addDeleteTaskEvent(actionsCell);
};

export default async () => {
  addNewTaskEvent(document.querySelector('#newTask'));
  Array.from(document.querySelectorAll('tbody tr'))
    .forEach((row) => {
      addUpdateTaskEvent(row.querySelector('td:nth-of-type(1)'));
      addDeleteTaskEvent(row.querySelector('td:nth-of-type(2)'));
    });
};
