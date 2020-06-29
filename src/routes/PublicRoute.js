import React from 'react'
import { Route } from 'react-router-dom';
import { MainLayout } from '../components';

function PublicRoute({
    layout: Layout = MainLayout,
    path, children, ...rest }) {

    return (
        <Route path={path} {...rest}>
            <Layout>
                {children}
            </Layout>
        </Route>
    )
}

export default PublicRoute 