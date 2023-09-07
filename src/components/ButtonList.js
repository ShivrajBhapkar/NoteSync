import React from 'react'
import Button from './Button'
          <Button name={"Cricket"} />
const list = [
    "All",
    "Live",
    "Gaming",
    "Songs",
    "Live",
    "Cricket",
    "Cooking",
    "Soccer",
    "Valentines",
    
];

const ButtonList = () => {
  return (
      <div className="flex">
          
          {list.map((item , index) => {
              return <Button key={index} name={item} />;
          })}
      </div>
  );
}

export default ButtonList
