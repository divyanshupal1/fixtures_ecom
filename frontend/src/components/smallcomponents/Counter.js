
const Counter = ({count, setCount}) => {

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if(count>1)
    {
        setCount(count - 1);
    }
  };

  return (
    <div className='counter'>
      <button onClick={handleDecrement} style={{width:"48px",backgroundColor: "wheat", marginRight:"15px", cursor:"pointer"}}>-</button><h1>{count}</h1>
      <button onClick={handleIncrement} style={{width:"48px",backgroundColor: "wheat",marginLeft: "15px", cursor:"pointer"}}>+</button>
    </div>
  );
};

export default Counter;
