import qs from "qs";

export default {
    methods: {
        getAvatars(author_ids, avatars) {
            let ids = '';
            if (this.$isArray(author_ids)) {
                let i;
                for (let i = 0; i < author_ids.length-1; i++)
                    ids += author_ids[i] + ',';
                ids += author_ids[i];
            } else {
                ids = author_ids;
            }

            this.$axios({
                method: 'post',
                url: '/es/query/author/avatars',
                data: qs.stringify({
                    author_ids: ids
                })
            })
            .then(res => {
                avatars.length = 0;
                if (res.data.success) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i] === "https://img-1304418829.cos.ap-beijing.myqcloud.com/avatar-grey-bg.jpg")
                            avatars.push(res.data.data[i]);
                        else
                            avatars.push(this.getAvatarFullPath(res.data.data[i]));
                    }
                }
                else this.$message.error("头像获取失败！");
            })
            .catch(err => {
                console.log(err);
            })
        },
        getAvatarFullPath(avatar_urls) {
            if (this.$isArray(avatar_urls)) {
                let avatar_full_urls = [];
                for (let i = 0; i < avatar_urls.length; i++)
                    avatar_full_urls.push(this.GLOBAL.backUrl + avatar_urls);
                return avatar_full_urls;
            } else {
                return (this.GLOBAL.backUrl + avatar_urls);
            }
        }
    }
}