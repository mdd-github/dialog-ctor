import React from 'react';
import {createBrowserRouter} from "react-router-dom";

import {CharacterListPage} from "../pages/characters/CharacterListPage";
import {RouterErrorPage} from "../pages/RouterErrorPage";
import {ThreadPage} from "../pages/ThreadPage";
import {DefaultLayout} from "../pages/layout/DefaultLayout";

export const dcRouter = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        errorElement: <RouterErrorPage />,
        children: [
            {
                path: '/',
                element: <CharacterListPage />
            },
            {
                path: '/thread',
                element: <ThreadPage />
            },
        ]
    },
]);