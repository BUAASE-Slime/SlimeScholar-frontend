import el from "element-ui/src/locale/lang/el";

export default {
    methods: {
        highlight(data) {
            if (data) {
                this.resultList = data.articles;
                this.total_hits = data.total_hits;
                this.total_hits_str = data.total_hits_str;
            }
            else this.resultList = this.articles;
            this.resultList.map((item) => {
                if (this.header_select) {
                    // 普通检索
                    if (this.header_select === "main" || this.header_select === "title")
                        item.paper_title = this.brightKeyword(item.paper_title)
                    if (this.header_select === "main" || this.header_select === "abstract")
                        item.abstract = this.brightKeyword(item.abstract)
                    if (this.header_select === "affiliation_name")
                        item.author_affiliation.forEach((item1, index, arr) => {
                            arr[index] = this.brightKeyword(arr[index])
                        })
                    if (this.header_select === "author_name") {
                        item.authors.forEach((item2) => {
                            item2.author_name = this.brightKeyword(item2.author_name)
                        })
                    }
                    if (this.header_select === "main" || this.header_select === "field"){
                        item.fields.forEach((item3) => {
                            item3.name=this.brightKeyword(item3.name)
                        })
                    }
                } else if (this.searchValue) {
                    // 高级检索
                    this.searchValue.forEach((ins) => {
                        if (ins.type !== 3) {
                            if (ins.category === 'main' || ins.category === 'title')
                                item.paper_title = this.brightKeyword(item.paper_title, ins.content)
                            if (ins.category === "main" || ins.category === "abstract")
                                item.abstract = this.brightKeyword(item.abstract, ins.content)
                            if (ins.category === "affiliation_name")
                                item.author_affiliation.forEach((item1, index, arr) => {
                                    arr[index] = this.brightKeyword(arr[index], ins.content)
                                })
                            if (ins.category === "author") {
                                item.authors.forEach((item2) => {
                                    item2.author_name = this.brightKeyword(item2.author_name, ins.content)
                                })
                            }
                            if (ins.category === "main" || ins.category === "field"){
                                item.fields.forEach((item3) => {
                                    item3.name=this.brightKeyword(item3.name, ins.content)
                                })
                            }
                        }
                    })
                }
            })
        },
        brightKeyword (val, inVal) {
            let keyword;
            if (inVal) keyword = inVal;
            else keyword = this.input;
            let start=val.toLowerCase().indexOf(keyword.toLowerCase())
            if (start !== -1) {
                return val.replace(val.slice(start, start+keyword.length), `<font color='#ea4335'>${val.slice(start, start+keyword.length)}</font>`)
            } else {
                return val
            }
        },
    }
}