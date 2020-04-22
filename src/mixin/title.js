let clientTitleMixin = {
    mounted() {
        if(this.$route.meta.title) {
            document.title = this.$route.meta.title;
        }
    }
};

let serverTitleMixin = {
    created() {
        if(this.$route.meta.title) {
            this.$ssrContext.title = this.$route.meta.title;
        }
    }
};

export default process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin;