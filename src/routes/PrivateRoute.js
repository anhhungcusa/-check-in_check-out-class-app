import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import useStore from '../hooks/useStore';
import useRouter from '../hooks/useRouter';
import { CookieService, AuthService } from '../services';
import { env } from '../configs/globals';
import { FullScreenLayout } from '../components/layouts/FullScreenLayout';
import { SpinEffect } from '../components/loading-effects/SpinEffect';
import { MainLayout } from '../components/layouts/MainLayout'

function PrivateRoute({
    layout: Layout = MainLayout,
    redirectPath = AuthService.loginPath, 
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

export { PrivateRoute }