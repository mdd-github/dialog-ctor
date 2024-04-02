import React, {useMemo} from "react";
import {NavLink, Outlet, useLocation} from "react-router-dom";

const APP_SCREENS = [
    {
        id: 0,
        route: '/',
        label: 'Создание персонажа',
        hasNextButton: true,
        nextRouteName: '/thread',
        nextButtonLabel: 'Продолжить'
    },
    {
        id: 1,
        route: '/thread',
        label: 'Создание чата',
        hasNextButton: true,
        nextRouteName: '/chat',
        nextButtonLabel: 'Готово'
    }
]

export const DefaultLayout = () => {
    const location = useLocation();
    const currentScreen = useMemo(() => {
        return APP_SCREENS.find(screen => screen.route === location.pathname)
    }, [location.pathname])

    return (
        <>
            <header className="layout_header">
                <div className="layout_header_start">
                    <ul className="layout_header_navigation">
                        {
                            APP_SCREENS.map((screen) => (
                                <li key={screen.id}>
                                    {
                                        screen.route !== location.pathname
                                            ? <NavLink to={screen.route}>{screen.label}</NavLink>
                                            : <span>{screen.label}</span>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="layout_header_end">
                    {
                        currentScreen.hasNextButton
                        && <NavLink to={currentScreen.nextRouteName}>
                            {currentScreen.nextButtonLabel}
                        </NavLink>
                    }
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}