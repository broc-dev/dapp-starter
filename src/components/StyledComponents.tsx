import React from 'react';
import ts from 'tailwind-styled-components';

export const PageNavButton = ts.button`
    w-4
    h-4
    my-1
    border-2
    border-transparent
    bg-murkyblack
    rounded-full
    transition
    duration-200
    ${props => props.active ? 'bg-aqua border-foam border-opacity-20' : 'bg-black'}
`;

export const Button = ts.button`
    bg-murkyblack
    hover:bg-deepsea
    font-serif
    text-lg
    text-foam
    hover:text-white
    border-[1px]
    border-gray-2
    hover:border-white
    min-w-sm
    px-3
    py-2
    flex
    flex-row
    items-center
    justify-center
`;