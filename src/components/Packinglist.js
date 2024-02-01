import { useState } from "react";
import { Item } from "./Item";

export default function PackingList({
  items,
  onDeleteItems,
  onHandlePackedItem,
  OnHandleClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  // Sort List by: input
  if (sortBy === "input") sortedItems = items;

  // Sort List by: description
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  // Sort List by: packed
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onHandlePackedItem={onHandlePackedItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={OnHandleClearList}>Clear list</button>
      </div>
    </div>
  );
}
