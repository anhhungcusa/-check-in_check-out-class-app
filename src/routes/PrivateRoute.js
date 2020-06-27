import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CookieService } from '../services';
import { globals } from '../configs';
import { useStore, useRouter, useRequireRole } from '../hooks';
import { MainLayout, FullScreenLayout, SpinEffect, NotFound } from '../components';

function PrivateRoute({ layout: Layout = MainLayout, redirectPath = '/login', roles = [], path, children, ...rest }) {
	const store = useStore();
	const router = useRouter();
	const requireRoles = useRequireRole();
	const isExistedToken = CookieService.getCookie(globals.env.COOKIE_KEY);
	if (isExistedToken && store.auth.initLoading === false) {
		return (
			<FullScreenLayout>
				<SpinEffect />
			</FullScreenLayout>
		);
	}
	if (store.auth.isAuthorized) {
		return requireRoles(roles) ? (
			<Route path={path} {...rest}>
				<Layout>{children}</Layout>
			</Route>
		) : (
			<FullScreenLayout>
				<NotFound status="403" title="Sorry, you are not authorized to access this page." />
			</FullScreenLayout>
		);
	}

	const from = router.pathname;

	return <Redirect to={{ pathname: redirectPath, state: { from } }} />;
}

export default PrivateRoute;
