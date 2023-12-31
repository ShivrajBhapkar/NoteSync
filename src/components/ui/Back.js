import React from 'react'
import {useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
const Back = () => {
       const navigate = useNavigate();
  return (
      <div className="mb-2 bg-black rounded-full w-fit">
          <IoMdArrowBack
              size={26}
              onClick={() => navigate(-1)}
              className="text-white cursor-pointer"
          />
      </div>
  );
}

export default Back
