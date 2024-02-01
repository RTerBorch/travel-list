export default function Stats({ items }) {
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
