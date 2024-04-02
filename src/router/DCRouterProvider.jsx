import React from "react";
import {RouterProvider} from "react-router-dom";
import {dcRouter} from "./dc-router";

export const DCRouterProvider = () => {
    return <RouterProvider router={dcRouter} />;
}