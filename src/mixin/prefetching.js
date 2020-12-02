import Vue from "vue";

Vue.mixin({
    beforeMount () {
        const { asyncData } = this.$options;
        if (asyncData) {
            if(this.$store.state.items.list.length) return;
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            });
        }
    },
    beforeRouteUpdate (to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
});