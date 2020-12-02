
export default function routerEach(router) {

    router.beforeEach((to, from, next) => {
        if(to.matched.length === 0) return next('/404');
        next();
    });

    router.afterEach(() => {

    });
}