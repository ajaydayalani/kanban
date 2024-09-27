import React, { useState } from 'react'
import Board, { BoardLoader } from './Board'
import "./App.css"
import {createBrowserRouter , Route, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';
import RouterLayout from './components/RouterLayout/RouterLayout';
import ErrorPage from './components/pageNorFound/ErrorPage';
import BoardError from './components/ErrorElement/BoardError';

const App: React.FC = () => {




    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<RouterLayout/>}>
                <Route  path="/board" element={<Outlet/>} errorElement={<BoardError/>}>
                    <Route path=":id" element={<Board name={"testing"}/>} loader={BoardLoader}/>
                </Route>
                
                <Route path="*" element={<ErrorPage/>}></Route>

            </Route>
        )
    )

    
    return (
        <RouterProvider router={router}></RouterProvider>

    )
}

export default App