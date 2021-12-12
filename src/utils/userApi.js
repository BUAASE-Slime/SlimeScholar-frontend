export default {
    install (Vue) {
        Vue.prototype.$userNotLogin = function (isJump) {
            if (isJump) {
                this.$message.warning("请先登录！");
                setTimeout(() => {
                    this.$router.push('/login');
                }, 500);
            } else {
                this.$message.warning("请先登录！");
            }
        }
        Vue.prototype.$userInvalid = function () {
            this.$message.error("用户登录信息已失效，请重新登录！");
            this.$store.dispatch('clear');
            setTimeout(() => {
                this.$router.push('/login');
            }, 1000);
        }
        Vue.prototype.$userNotFound = function () {
            this.$message.error("用户信息获取失败，请尝试重新登录！");
            this.$store.dispatch('clear');
            setTimeout(() => {
                this.$router.push('/login');
            }, 1000);
        }
    }
}