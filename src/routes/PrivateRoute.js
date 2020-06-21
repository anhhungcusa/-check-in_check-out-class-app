import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { CookieService } from '../services';
import { env } from '../configs/globals';
import { useStore, useRouter } from '../hooks';
import { MainLayout, FullScreenLayout, SpinEffect } from '../components';

function PrivateRoute({
    layout: Layout = MainLayout,
    redirectPath = '/login', 
    path, children,...rest }) {
        
    const store = useStore();
    const router = useRouter();
    const isExistedToken = CookieService.getCookie(env.COOKIE_KEY);
    if (store.auth.isAuthorized) {
        return (
            <Route path={path} {...rest}>
                <Layout>
                    {children}
                </Layout>
            </Route>
        );
    }
    if (isExistedToken && store.auth.initLoading === true) {
        return (
            <FullScreenLayout>
                <SpinEffect />
            </FullScreenLayout>
        )
    }

    const from = router.pathname

    return <Redirect to={{ pathname: redirectPath, state: { from } }} />;
}

export default PrivateRoute 