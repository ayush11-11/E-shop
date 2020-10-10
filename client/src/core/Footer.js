import React from 'react'
import eshopi from './eshopi.png';
export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 p-4 container-fluid text-center" id="#footer">
            <img src={eshopi} alt="book" style={{height:'40px',width:'40px'}}/> <br/>
             E Shop -- Online World to buy  <br />
             Copyright &copy; {new Date().getFullYear()}   <i className="india flag"></i>
        </footer> 
    )
}