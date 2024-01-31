import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePackedItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onHandlePackedItem={handlePackedItem}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>😁😎 Far Away 🧳🌴</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    // if description is empty, return
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 🤔</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onHandlePackedItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onHandlePackedItem={onHandlePackedItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems, onHandlePackedItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => {
          onHandlePackedItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: `line-through` } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list 📝</em>
      </p>
    );

  const packedItems = items.filter((item) => item.packed);
  const packedPercentage = Math.round(
    (packedItems.length / items.length) * 100
  );
  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "You got everything packed! Ready to go ✈️"
          : `You have ${items.length} items on your list, and you already packed ${packedItems.length} (${packedPercentage}%)🔎`}
      </em>
    </footer>
  );
}
