import React from 'react'
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute ({ children }) {
    const {user, loading } = useAuth();

    console.log('hello',user, loading)

    if(loading) return <h2> </h2>
    if(!user) return <Navigate to='/login' />
    
    return (<>{children}</>);
}