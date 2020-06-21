import React from 'react'
import { Route } from 'react-router-dom';
import { MainLayout } from '../components/layouts/MainLayout'

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

export { PublicRoute }