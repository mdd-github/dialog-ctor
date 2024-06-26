import React from 'react';
import {createBrowserRouter} from "react-router-dom";

import {CharacterListPage} from "../pages/characters/CharacterListPage";
import {RouterErrorPage} from "../pages/RouterErrorPage";
import {ThreadPage} from "../pages/thread/ThreadPage";
import {DefaultLayout} from "../pages/layout/DefaultLayout";
import {ChatPage} from "../pages/chat/ChatPage";

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
            {
                path: '/chat',
                element: <ChatPage />
            }
        ]
    },
]);