import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    {
      task: "giv katten mad",
      completed: false,
      id: 1,
    },
  ]);
  function remove(id) {
    setItems((state) => state.filter((item) => item.id !== id));
  }
  function toggle(id) {
    setItems((state) =>
      state.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
      })
    );
  }
  return (
    <>
      <div>
        <Form setItems={setItems}></Form>
        <List remove={remove} toggle={toggle} items={items}></List>
      </div>
    </>
  );
}
function Form({ setItems }) {
  function submit(e) {
    e.preventDefault();
    //console.log(e);
    const formData = new FormData(e.target);
    const newItem = {
      task: formData.get("item"),
      completed: false,
      id: crypto.randomUUID(),
    };
    setItems((state) => state.concat(newItem));
  }
  return (
    <form onSubmit={submit}>
      <input type="text" name="item" id="" />
      <button>GEM</button>
    </form>
  );
}

function List({ items, remove, toggle }) {
  return (
    <div>
      <h2>Her et min Items</h2>
      <ul>
        {items.map((item) => (
          <ListItem
            remove={remove}
            toggle={toggle}
            {...item}
            key={item.id}
          ></ListItem>
        ))}
      </ul>
    </div>
  );
}

function ListItem(props) {
  return (
    <li>
      {props.task} <button onClick={() => props.remove(props.id)}>Slet</button>{" "}
      <button onClick={() => props.toggle(props.id)}>Completed</button>
    </li>
  );
}
export default App;
