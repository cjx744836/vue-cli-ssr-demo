import {createApp} from "./main";

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();
        const meta = app.$meta();
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                context.state = store.state;
                context.meta = meta;
                resolve(app);
            }).catch(reject);
        }, reject)
    })
}