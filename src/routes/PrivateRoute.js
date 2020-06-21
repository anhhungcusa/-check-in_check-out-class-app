import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { CookieService } from '../services';
import { globals } from '../configs';
import { useStore, useRouter } from '../hooks';
import { MainLayout, FullScreenLayout, SpinEffect } from '../components';

function PrivateRoute({
    layout: Layout = MainLayout,
    redirectPath = '/login',
    path, children, ...rest }) {

    const store = useStore();
    const router = useRouter();
    const isExistedToken = CookieService.getCookie(globals.env.COOKIE_KEY);
    if (isExistedToken && store.auth.initLoading === false) {
        return (
            <FullScreenLayout>
                <SpinEffect />
            </FullScreenLayout>
        )
    }
    if (store.auth.isAuthorized) {
        return (
            <Route path={path} {...rest}>
                <Layout>
                    {children}
                </Layout>
            </Route>
        );
    }

    const from = router.pathname

    return <Redirect to={{ pathname: redirectPath, state: { from } }} />;
}

export default PrivateRoute 