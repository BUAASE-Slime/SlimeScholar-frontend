export default {
    install (Vue) {
        Vue.prototype.$dateFormat = function (time, format) {
            var t = new Date(time);
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i;
            }
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                    case 'MM':
                        return tf(t.getMonth() + 1);
                    case 'mm':
                        return tf(t.getMinutes());
                    case 'dd':
                        return tf(t.getDate());
                    case 'HH':
                        return tf(t.getHours());
                    case 'ss':
                        return tf(t.getSeconds());
                }
            })
        }
        Vue.prototype.$isArray = function (object){
            return Object.prototype.toString.call(object) === '[object Array]';
        }
        Vue.prototype.$downloadSameArea = function (url, filename){
            // TIP: 这种方式无法下载跨域文件
            var a = document.createElement('a');
            // 需要下载的数据内容,我这里放的就是BLOB，如果你有下载链接就不需要了
            a.href = url;
            a.download = filename;
            a.click();
            a.remove();
        }
    }
}