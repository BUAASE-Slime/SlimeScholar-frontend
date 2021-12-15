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
                    if (this.header_select === "main" || this.header_select === "title")
                        item.paper_title = this.brightKeyword(item.paper_title)
                    if (this.header_select === "main" || this.header_select === "abstract")
                        item.abstract = this.brightKeyword(item.abstract)
                    if (this.header_select === "main" || this.header_select === "author_name") {
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

                }
            })
        },
        brightKeyword (val) {
            let keyword = this.input
            let start=val.toLowerCase().indexOf(keyword.toLowerCase())
            if (start !== -1) {
                return val.replace(val.slice(start, start+keyword.length), `<font color='#f00'>${val.slice(start, start+keyword.length)}</font>`)
            } else {
                return val
            }
        },
    }
}