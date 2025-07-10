function rfc_RandomGenerator({ onGenerate }) {
  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    onGenerate(randomNumber);
  };

  return (
    <div>
      <button onClick={handleClick}>Generate Random Number</button>
    </div>
  );
}