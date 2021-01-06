import React, { useState }from "react";
import styled from 'styled-components';


import Navbar from './Navbar'


const StyledBurger = styled.div`
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 40px;
    top: -50px;
    z-index: 12; 
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;

    div {
        width: 2rem;
        height: 0.3rem;
        background-color: ${({open}) => open ? 'grey' : 'white'};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.2s linear;

        &:nth-child(1) {
            transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0deg)'}
        }
        &:nth-child(2) {
            transform: ${({open}) => open ? 'translateX(100%)' : 'translateX(0)'};
            opacity: ${({open}) => open ? 0 : 1};
        }
        &:nth-child(3) {
            transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0deg)'}
        }
    }

`;

export const Burger = (logoutUser) => {
    const [ open , setOpen] = useState(false);
    return (
        <>
        <StyledBurger 
            open={open} 
            onClick={()=> setOpen(!open)}>
                <div />
                <div />
                <div />
        </StyledBurger>
            <Navbar open={open} logoutUser={logoutUser} />
        </>
    )
}