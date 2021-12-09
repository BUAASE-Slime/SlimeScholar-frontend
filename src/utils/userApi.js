function userNotLogin (isJump) {
    if (isJump) {
        this.$message.warning("请先登录！");
        setTimeout(() => {
            this.$router.push('/login');
        }, 500);
    } else {
        this.$message.warning("请先登录！");
    }
}

function userInvalid () {
    this.$message.error("用户登录信息已失效，请重新登录！");
    this.$store.dispatch('clear');
    setTimeout(() => {
        this.$router.push('/login');
    }, 1000);
}

function userNotFound () {
    this.$message.error("用户信息获取失败，请尝试重新登录！");
    this.$store.dispatch('clear');
    setTimeout(() => {
        this.$router.push('/login');
    }, 1000);
}

export default {
    methods: {
        userInvalid,
        userNotFound,
        userNotLogin,
    }
}