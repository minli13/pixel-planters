import React from 'react'
import { Navigate } from 'react-router-dom'
import { useGarden } from '../helpers/GardenContext'

const ProtectedRoute = ({ children }) => {
    const { gameState } = useGarden();

    // if no save, redirect to gameSlots
    if (!gameState) {
        return <Navigate to="/gameSlots" replace />;
    }

    // if save exists, render children
    return children;

}

export default ProtectedRoute