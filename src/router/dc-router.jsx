import React from 'react';
import {createBrowserRouter} from "react-router-dom";

import {CharacterListPage} from "../pages/CharacterListPage";
import {RouterErrorPage} from "../pages/RouterErrorPage";
import {ThreadPage} from "../pages/ThreadPage";
import {StartupPage} from "../pages/StartupPage";

export const dcRouter = createBrowserRouter([
    {
        path: '/',
        element: <StartupPage />,
        errorElement: <RouterErrorPage />,
        children: [
            {
                path: 'characters',
                element: <CharacterListPage />,
            },
            {
                path: 'thread',
                element: <ThreadPage />,
            }
        ]
    }
]);