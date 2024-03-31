
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
      <button onClick={handleDecrement} style={{width:"40px",backgroundColor: "#f4f4f4", marginRight:"15px", cursor:"pointer", borderRadius:"7px", border:"1px solid gray", color:"gray" }}>-</button><h1>{count}</h1>
      <button onClick={handleIncrement} style={{width:"40px",backgroundColor: "#f4f4f4",marginLeft: "15px", cursor:"pointer", borderRadius:"7px", border:"1px solid gray", color:"gray"}}>+</button>
    </div>
  );
};

export default Counter;
