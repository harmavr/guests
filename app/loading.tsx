'use client';


import React, { useEffect } from 'react'
import { useAppSelector } from './lib/hooks';

export default function Loading() {

    useEffect(() => {
        setTimeout(() => { }, 5000)
    })

    return (
        <div>Loading</div>
    )
}
