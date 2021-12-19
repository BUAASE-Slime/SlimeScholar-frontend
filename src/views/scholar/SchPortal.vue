<template>
  <div class="schPortal">
    <el-row class="info-div">
          <el-col :span="4">
            <el-image v-if="info.people.headImgUrl&&info.people.headImgUrl!==''"
                      class="headImg"
                      :src="info.people.headImgUrl">
            </el-image>
            <el-image v-else
                      class="headImg"
                      src="https://img-1304418829.cos.ap-beijing.myqcloud.com/avatar-grey-bg.jpg">
            </el-image>
          </el-col>
          <el-col class="people-text" :span="17">
            <el-row style="color: black ;font-weight: bold;font-size:28px">
              <el-col>{{ info.people.author_name }}</el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <i class="el-icon-office-building" style="margin-right: 10px"></i>
              <span v-if="info.people.affiliation !== ''">{{ info.people.affiliation }}</span>
              <span v-else>暂无机构信息</span>
              <span v-if="info.people.home_page && info.people.home_page !== ''">
                &nbsp;-&nbsp;
                <span style="color: #2d94d4; cursor: pointer" @click="gotoHomePage(info.people.home_page)">个人主页</span>
              </span>
            </el-row>
            <el-row style="margin-top: 10px">
              <i class="el-icon-edit-outline" style="margin-right: 10px"></i>
              <span v-for="(area, index) in info.people.fields" v-bind:key="index" style="color:#00b1fd;">
                <el-link style="color: #2d94d4; font-size: medium;">{{ area }}</el-link>
                <span style="margin-left: 4px; margin-right: 4px; color:#2d94d4; font-size: medium;" v-if="index!==info.people.fields.length-1">/</span>
              </span>
            </el-row>
          </el-col>
          <el-col class="like-button" :span="2">
            <el-button class="opera-button" v-if="isSelf===true && isEdit===false" icon="el-icon-edit" @click="isEdit=true">
              编辑
            </el-button>
            <el-button class="opera-button" v-else-if="isSelf===true && isEdit===true " type="success" @click="save" icon="el-icon-circle-check">
              保存
            </el-button>
            <el-button class="opera-button" icon="el-icon-folder-checked" v-else-if="info.is_user===false" @click="apply">
              认领
            </el-button>
            <el-button class="opera-button" v-else icon="el-icon-message">
              关注
            </el-button>
          </el-col>
        </el-row>
    <el-row class="main-div">
      <el-col class="data-div" span="18">
        <el-tabs v-model="activeNameOut" >
          <el-tab-pane label="发表文献" name="article" style="text-align: left">
            <el-table
                :key="isEdit"
                :data="info.papers"
                style="border: none"
                height="520px"
                :cell-style = "{borderStyle:'none',padding:'2px 0'}"
                :default-sort = "{prop: 'date', order: 'descending'}"
            >
              <el-table-column
                  :render-header="isEdit?renderHead1:renderHead2"
              >
                <template class="art-info" slot-scope="scope">
                  <el-row style="font-size: 16px;margin: 2px">
                    <el-link style="color: #217ad9; font-size: 16px;" @click="gotoArticle(scope.row.paper_id)">{{scope.row.paper_title}}</el-link>
                  </el-row>
                  <el-row style="color: #999999;font-size: small;padding-left: 2px;margin: 0;border: none">
                    <span v-bind:key="i" v-for="(p,i) in scope.row.authors" >
                      {{p.author_name}}<span v-if="i !== scope.row.authors.length-1">, </span>
                    </span>
                  </el-row>
                  <el-row style="color: #999999;font-size: small;padding-left: 2px;margin: 0;border: none">
                    <span v-if="scope.row.journal && scope.row.journal.name!== ''">{{scope.row.journal.name}}</span>
                    <span v-else-if="scope.row.conference && scope.row.conference.name !== ''">{{scope.row.conference.name}}</span>
                    <span v-else-if="scope.row.publisher">{{scope.row.publisher}}</span>
                    <span v-if="scope.row.last_page!==''&&scope.row.first_page!==''&&scope.row.volume!==''">
                      {{ scope.row.volume }}, {{ scope.row.first_page }}-{{ scope.row.last_page }}
                    </span>
                    <span v-else-if="scope.row.first_page!==''&&scope.row.volume!==''">
                      {{ scope.row.volume }}, {{ scope.row.first_page }}
                    </span>
                    <span v-else-if="scope.row.volume!==''">
                      {{ scope.row.volume }}
                    </span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column
                  prop="date"
                  label="日期"
                  sortable
                  align="center"
                  width="95">
              </el-table-column>
              <el-table-column
                  prop="citation_count"
                  label="引用次数"
                  sortable
                  align="center"
                  width="100">
              </el-table-column>
              <el-table-column
                  align="center"
                  width="50"
                  label="管理"
                  v-if="isEdit">
                <template slot-scope="scope">
                  <div class="deleteIcon">
                    <icon style="font-size: medium;cursor: pointer" class="el-icon-remove" @click="deleteArt(scope.row.paper_id)"></icon>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog
                title="添加文献"
              :visible.sync="dialogVisible"
              width="60%"
              min-height="700px"
            >
              <el-input
                  style="width: 75%;margin-left: 100px;margin-right: 10px"
                  v-model="searchInput"
                  placeholder="请输入要添加的文献...">
              </el-input>
              <el-button type="primary" class="el-icon-search" @click="searchArt"></el-button>
              <el-table
                  :data="result"
                  style="border: none"
                  height="400px"
                  :cell-style = "{borderStyle:'none',padding:'2px 0'}"
              >
                <el-table-column
                    width="50px"
                    align="center"
                    >
                  <template slot-scope="scope">
                    <i class="el-icon-circle-plus-outline" style="color:#e6a33e;font-size: large;font-weight: bold;cursor: pointer" @click="addArt(scope.row.paper_id)"></i>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template class="art-info" slot-scope="scope">
                    <el-row style="font-size: 16px;margin: 2px">
                      <el-link style="color: #217ad9; font-size: 16px;" @click="gotoArticle(scope.row.paper_id)">{{scope.row.paper_title}}</el-link>
                    </el-row>
                    <el-row style="color: #999999;font-size: small;padding-left: 2px;margin: 0;border: none">
                    <span v-bind:key="i" v-for="(p,i) in scope.row.authors" >
                      {{p.author_name}}<span v-if="i !== scope.row.authors.length-1">, </span>
                    </span>
                    </el-row>
                    <el-row style="color: #999999;font-size: small;padding-left: 2px;margin: 0;border: none">
                      <span v-if="scope.row.journal && scope.row.journal.name!== ''">{{scope.row.journal.name}}</span>
                      <span v-else-if="scope.row.conference && scope.row.conference.name !== ''">{{scope.row.conference.name}}</span>
                      <span v-else-if="scope.row.publisher">{{scope.row.publisher}}</span>
                      <span v-if="scope.row.last_page!==''&&scope.row.first_page!==''&&scope.row.volume!==''">
                      {{ scope.row.volume }}, {{ scope.row.first_page }}-{{ scope.row.last_page }}
                    </span>
                      <span v-else-if="scope.row.first_page!==''&&scope.row.volume!==''">
                      {{ scope.row.volume }}, {{ scope.row.first_page }}
                    </span>
                      <span v-else-if="scope.row.volume!==''">
                      {{ scope.row.volume }}
                    </span>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="数据分析" name="analyse" class="dataChart">
            <el-tabs v-model="activeNameChart">
              <el-tab-pane label="被引用量" name="citations">
                <span slot="label">
                  <span class="span-box" style="font-size: 15px">
                    <i class="el-icon-s-data"></i>
                    <span style="margin-left: 5px">被引用量</span>
                  </span>
                </span>
                <el-row class="citationChart">
                  <el-row style="font-size: 15px;font-weight: bold;text-align: left;padding-left: 270px">
                    总被引用 {{ info.people.citation_count }} 次，被关注 {{ info.people.follow_count }} 人
                  </el-row>
                  <el-row>
                    <div id="citation-chart" style="width:500px;height: 400px;margin-left: 150px"></div>
                  </el-row>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="专家关系网络" name="relation">
                <span slot="label">
                  <span class="span-box" style="font-size: 15px">
                    <i class="el-icon-share"></i>
                    <span style="margin-left: 5px">专家关系网络</span>
                  </span>
                </span>
                <el-row>
                  <div id="relation-chart" style="width: 500px;height: 300px;margin-left: 190px"></div>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col class="friends-div" >
        <el-row style="font-size: 17px;font-weight: bold;margin-bottom: 20px;margin-top: 10px">
            合著作者
          </el-row>
        <el-scrollbar style="height: 520px">
            <el-row class="friends-item" v-for="(i,index) in info.friends" :key="index">
              <el-col :span="4">
                <el-image :src="i.headImgUrl"></el-image>
              </el-col>
              <el-col :span="17" style="padding-left: 10px">
                <el-row style="color: black ;font-weight: bold;font-size:small">
                  <el-col :span="20" style="padding-bottom: 1px;">{{i.author_name}}</el-col>
                </el-row>
                <el-row style="font-size: 13px; color: #777777">
                  <el-tooltip class="item" effect="light" :content="i.affiliation_name" placement="bottom">
                    <span>{{i.affiliation_name|ellipsis}}</span>
                  </el-tooltip>
                </el-row>
              </el-col>
              <el-col :span="2" style="padding-top: 17px;padding-left: 7px;color: #409EFF">
                <i class="el-icon-right" @click="toHim(i.author_id)" style="cursor: pointer"></i>
              </el-col>
            </el-row>
          </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import user from "../../store/user";
import qs from "qs";

export default {
  name: "schPortal.vue",
  data(){
    return {
      isEdit: false,
      dialogVisible: false,
      searchInput:"",
      result: [
        // {
        //   authors: [
        //     {
        //       affiliation_id: "",
        //       affiliation_name: "Independent Researcher",
        //       author_id: "3323123",
        //       author_name: "Sergei Belousov",
        //       order: "1"
        //     }
        //   ],
        //   book_title: "",
        //   citation_count: "4",
        //   citation_msg: [],
        //   conference: {
        //     name: "",
        //   },
        //   conference_id: "",
        //   date: "2019-11-01",
        //   doctype: "",
        //   doi: "10.1016/J.SIMPA.2021.100115",
        //   doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
        //   fields: [],
        //   first_page: "100115",
        //   journal: {
        //     citation_count: "451567",
        //     issn: "",
        //     journalid: "2597175965",
        //     name: "arXiv: Computer Vision and Pattern Recognition",
        //     paper_count: "49431",
        //     publisher: "",
        //     rank: "8182",
        //     webpage: ""
        //   },
        //   journal_id: "",
        //   last_page: "12312",
        //   paper_id: "3191610454",
        //   paper_title: "mobilestyle model mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
        //   publisher: "Elsevier BV",
        //   rank: "23112",
        //   reference_count: "12",
        //   volume: "10",
        //   year: "2021"
        // },
        // {
        //   authors: [
        //     {
        //       affiliation_id: "",
        //       affiliation_name: "Independent Researcher",
        //       author_id: "3323123",
        //       author_name: "Sergei Belousov",
        //       order: "1"
        //     }
        //   ],
        //   book_title: "",
        //   citation_count: "9",
        //   citation_msg: [],
        //   conference: {
        //     name: "",
        //   },
        //   conference_id: "",
        //   date: "2021-11-02",
        //   doctype: "",
        //   doi: "10.1016/J.SIMPA.2021.100115",
        //   doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
        //   fields: [],
        //   first_page: "100115",
        //   journal: {
        //     citation_count: "451567",
        //     issn: "",
        //     journalid: "2597175965",
        //     name: "arXiv: Computer Vision and Pattern Recognition",
        //     paper_count: "49431",
        //     publisher: "",
        //     rank: "8182",
        //     webpage: ""
        //   },
        //   journal_id: "",
        //   last_page: "12312",
        //   paper_id: "3191610454",
        //   paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
        //   publisher: "Elsevier BV",
        //   rank: "23112",
        //   reference_count: "12",
        //   volume: "10",
        //   year: "2021"
        // },
        // {
        //   authors: [
        //     {
        //       affiliation_id: "",
        //       affiliation_name: "Independent Researcher",
        //       author_id: "3323123",
        //       author_name: "Sergei Belousov",
        //       order: "1"
        //     }
        //   ],
        //   book_title: "",
        //   citation_count: "1",
        //   citation_msg: [],
        //   conference: {
        //     name: "",
        //   },
        //   conference_id: "",
        //   date: "2021-11-01",
        //   doctype: "",
        //   doi: "10.1016/J.SIMPA.2021.100115",
        //   doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
        //   fields: [],
        //   first_page: "100115",
        //   journal: {
        //     citation_count: "451567",
        //     issn: "",
        //     journalid: "2597175965",
        //     name: "arXiv: Computer Vision and Pattern Recognition",
        //     paper_count: "49431",
        //     publisher: "",
        //     rank: "8182",
        //     webpage: ""
        //   },
        //   journal_id: "",
        //   last_page: "12312",
        //   paper_id: "3191610454",
        //   paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
        //   publisher: "Elsevier BV",
        //   rank: "23112",
        //   reference_count: "12",
        //   volume: "10",
        //   year: "2021"
        // },
        // {
        //   authors: [
        //     {
        //       affiliation_id: "",
        //       affiliation_name: "Independent Researcher",
        //       author_id: "3323123",
        //       author_name: "Sergei Belousov",
        //       order: "1"
        //     }
        //   ],
        //   book_title: "",
        //   citation_count: "4",
        //   citation_msg: [],
        //   conference: {
        //     name: "",
        //   },
        //   conference_id: "",
        //   date: "2019-11-01",
        //   doctype: "",
        //   doi: "10.1016/J.SIMPA.2021.100115",
        //   doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
        //   fields: [],
        //   first_page: "100115",
        //   journal: {
        //     citation_count: "451567",
        //     issn: "",
        //     journalid: "2597175965",
        //     name: "arXiv: Computer Vision and Pattern Recognition",
        //     paper_count: "49431",
        //     publisher: "",
        //     rank: "8182",
        //     webpage: ""
        //   },
        //   journal_id: "",
        //   last_page: "12312",
        //   paper_id: "3191610454",
        //   paper_title: "mobilestyle model mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
        //   publisher: "Elsevier BV",
        //   rank: "23112",
        //   reference_count: "12",
        //   volume: "10",
        //   year: "2021"
        // },
        // {
        //   authors: [
        //     {
        //       affiliation_id: "",
        //       affiliation_name: "Independent Researcher",
        //       author_id: "3323123",
        //       author_name: "Sergei Belousov",
        //       order: "1"
        //     }
        //   ],
        //   book_title: "",
        //   citation_count: "9",
        //   citation_msg: [],
        //   conference: {
        //     name: "",
        //   },
        //   conference_id: "",
        //   date: "2021-11-02",
        //   doctype: "",
        //   doi: "10.1016/J.SIMPA.2021.100115",
        //   doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
        //   fields: [],
        //   first_page: "100115",
        //   journal: {
        //     citation_count: "451567",
        //     issn: "",
        //     journalid: "2597175965",
        //     name: "arXiv: Computer Vision and Pattern Recognition",
        //     paper_count: "49431",
        //     publisher: "",
        //     rank: "8182",
        //     webpage: ""
        //   },
        //   journal_id: "",
        //   last_page: "12312",
        //   paper_id: "3191610454",
        //   paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
        //   publisher: "Elsevier BV",
        //   rank: "23112",
        //   reference_count: "12",
        //   volume: "10",
        //   year: "2021"
        // },
      ],
      isSelf: false,
      tableTitle:"文献",
      tableTitleEdit:"已有文献",
      info: {
        is_user: false,
        people: {
          user_id: 1,
          username: "liyu",
          password: "handsome",
          user_info: "",
          user_type: 1,
          affiliation: "buaa",
          author_name: "ly",
          home_page: "https://blog.bflame.studio/",
          email: "bflame@qq.com",
          work_email: "bflame@qq.com",
          fields: ["Deep learning"],
          has_confirmed: true,
          confirm_number: 797547,
          reg_time: "2021-11-13T22:15:49+08:00",
          paper_count: 108,
          follow_count: 30,
          citation_count: 48,
          headImgUrl: "https://i.loli.net/2021/11/13/39PJtQWi7nrHMXu.jpg",
        },
        papers: [
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "4",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2019-11-01",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestyle model mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "9",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2021-11-02",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "1",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2021-11-01",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },

          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "4",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2019-11-01",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestyle model mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "9",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2021-11-02",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "1",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2021-11-01",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "4",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2019-11-01",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestyle model mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "9",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2021-11-02",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "1",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2021-11-01",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "4",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2019-11-01",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestyle model mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "9",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2021-11-02",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          },
          {
            authors: [
              {
                affiliation_id: "",
                affiliation_name: "Independent Researcher",
                author_id: "3323123",
                author_name: "Sergei Belousov",
                order: "1"
              }
            ],
            book_title: "",
            citation_count: "1",
            citation_msg: [],
            conference: {
              name: "",
            },
            conference_id: "",
            date: "2021-11-01",
            doctype: "",
            doi: "10.1016/J.SIMPA.2021.100115",
            doi_url: "https://dx.doi.org/10.1016/J.SIMPA.2021.100115 Add to Citavi project by DOI",
            fields: [],
            first_page: "100115",
            journal: {
              citation_count: "451567",
              issn: "",
              journalid: "2597175965",
              name: "arXiv: Computer Vision and Pattern Recognition",
              paper_count: "49431",
              publisher: "",
              rank: "8182",
              webpage: ""
            },
            journal_id: "",
            last_page: "12312",
            paper_id: "3191610454",
            paper_title: "mobilestylegan pytorch pytorch based toolkit to compress stylegan2 model",
            publisher: "Elsevier BV",
            rank: "23112",
            reference_count: "12",
            volume: "10",
            year: "2021"
          }
        ],
        friends:[
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher Tsing University",
            author_id: "332123123423",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher",
            author_id: "33234567653",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher",
            author_id: "3323123",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher Tsing University",
            author_id: "332123123423",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher",
            author_id: "33234567653",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher",
            author_id: "3323123",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher Tsing University",
            author_id: "332123123423",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher",
            author_id: "33234567653",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher",
            author_id: "3323123",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher Tsing University",
            author_id: "332123123423",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher",
            author_id: "33234567653",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
          {
            affiliation_id: "",
            affiliation_name: "Independent Researcher",
            author_id: "3323123",
            author_name: "Sergei Belousov",
            order: "1",
            headImgUrl: "https://i.loli.net/2021/11/14/eO5qSUM3yvQxfkp.jpg",
          },
        ],
      },

      ciaChart:{
        years:["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
        cia:["198","268","98","200","1","6","198","268","398","200"]
      },
      flag: false,
      activeNameOut: "article",
      activeNameChart:"citations",
      author_id: 123,
    }
  },
  created() {
    // 查询的是别人的门户
    this.author_id = this.$route.query.v;
    if (this.$route.query.v) {
      this.getSchInfo(this.$route.query.v, 'author_id');
      this.artNumInit = this.info.papers.length > 6? 6 : this.info.papers.length;
      return;
    }

    // 自己的门户
    const userInfo = user.getters.getUser(user.state());
    // 未登录则先登录
    if (!userInfo) {
      this.$message.warning("请先登录！");
      setTimeout(() => {
        this.$router.push('/login');
      }, 1000);
      return;
    }
    // 调用接口返回信息
    this.getSchInfo(userInfo.user.userId, 'user_id');
  },
  mounted(){
    //页面加载完成后,才执行
    setTimeout(() => {
      this.showCiaChart();
      this.showRelChart();
    }, 1000);
  },
  filters: {
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 20) {
        return value.slice(0,20) + "...";
      }
      return value;
    },
  },
  methods: {
    save(){
      this.isEdit = false;
      this.$message.success("保存成功");
    },
    renderHead1(h, { column, $index }) {
      return (
            <div>
              <span>已有文献</span>
              <span style="color:#7ABCFFFF;cursor:pointer" on-click={()=>this.showAddArtDia()}> （ <span style="text-decoration:underline;">添加文献</span> ）</span>
            </div>
        )
    },
    renderHead2(h, { column, $index }) {
      return (
          <div>
            <span>文献</span>
          </div>
      )
    },
    showAddArtDia(){
      this.dialogVisible=true;
    },
    searchArt(){
      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      this.$axios({
        method: 'post',
        url: 'es/query/paper/title',
        data: qs.stringify({
          title: this.searchInput,
          page: 1,
          is_precise: true,
        })
      })
      .then(res => {
        _loadingIns.close();
        switch (res.data.status) {
          case 200:
            this.result = res.data.details;
            break;
          case 404:
            this.result = [];
            break;
          default:
            this.$message.error("搜索失败！");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    addArt(paper_id) {
      let alHave = false;
      for (let i = 0; i < this.info.papers.length; i++)
        if (this.info.papers[i].paper_id === paper_id)
          alHave = true;
      if (alHave) {
        this.$message.warning("已认领此文献，请勿重复认领！");
        return;
      }

      const userInfo = user.getters.getUser(user.state());
      this.$axios({
        method: 'post',
        url: '/scholar/transfer',
        data: qs.stringify({
          user_id: userInfo.user.userId,
          paper_id: paper_id,
          kind: 0
        })
      })
      .then(res => {
        if (res.data.success) {
          this.$message.success("添加成功");
          let idx;
          for (idx = 0; idx < this.result.length; idx++)
            if (this.result[idx].paper_id === paper_id)
              break;
          this.info.papers.push(this.result[idx]);
        } else {
          this.$message.error("添加失败！");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteArt(paper_id){
      this.$confirm('确认删除？')
      .then(_ => {
        const userInfo = user.getters.getUser(user.state());
        this.$axios({
          method: 'post',
          url: '/scholar/transfer',
          data: qs.stringify({
            user_id: userInfo.user.userId,
            paper_id: paper_id,
            kind: 1
          })
        })
        .then(res => {
          if (res.data.success) {
            this.$message.success("删除成功");
            let idx;
            for (idx = 0; idx < this.info.papers.length; idx++)
              if (this.info.papers[idx].paper_id === paper_id)
                break;
            this.info.papers.splice(idx,0);
          }
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(_ => {});
    },
    getSchInfo(id, tag) {
      let _loadingIns = this.$loading({fullscreen: true, text: '拼命加载中'});
      this.$axios({
        method: 'post',
        url: '/scholar/info',
        data: qs.stringify({
          [tag]: id
        })
      })
      .then(res => {
        _loadingIns.close();
        switch (res.data.status) {
          case 200:
            this.info = res.data;
            const userInfo = user.getters.getUser(user.state());
            if (userInfo && userInfo.user.userId === this.info.people.user_id)
              this.isSelf = true;
            this.artNumInit = this.info.papers.length > 6? 6 : this.info.papers.length;
            this.flag = (this.info.papers.length<=this.artNumInit);
            break;
          case 401:
            this.$message.error("参数错误！");
            break;
          case 402:
            this.$message.warning("您未认证，请先申请入驻！");
            setTimeout(() => {
              this.$router.push('/applySettle');
            }, 1000);
            break;
          case 404:
            this.$message.error("查无您的用户信息，请尝试重新登录！");
            setTimeout(() => {
              this.$store.dispatch('clear');
              this.$router.push("/login");
            }, 1000);
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    gotoHomePage(home_page) {
      window.open(home_page);
    },
    gotoArticle(paper_id) {
      let routeUrl = this.$router.resolve({
        path: '/article',
        query: { v: paper_id }
      });
      window.open(routeUrl .href, "_blank");
    },
    AddArtNum(){
      let x = parseInt(this.artNumInit);
      x+=20;
      if(x>this.info.papers.length) x=this.info.papers.length;
      this.artNumInit=x;
      this.flag = (this.info.papers.length<=this.artNumInit);
    },
    toHim(author_id){
      let routeUrl = this.$router.resolve({
        path: '/schPortal',
        query: { v: author_id }
      });
      window.open(routeUrl .href, "_self");
    },
    showCiaChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById('citation-chart'))
      // 绘制图表
      myChart1.setOption({
        title: { text: this.ciaChart.title },
        tooltip: {},
        xAxis: {
          data:this.ciaChart.years,
          name: '年份'
        },
        yAxis: {
          type: 'value',
          name: '次数',
          axisLabel: {
            formatter: '{value} '
          }
        },
        dataZoom: [{
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '9%',
          bottom: -6,
          start: 50,
          end: 100 //初始化滚动条
        }],
        grid: { //调整图表上下左右位置
          top:'22%',
          left: '3%',
          right: '15%',
          bottom: '8%',
          containLabel: true
        },
        series: [{
          type: 'bar',
          data:this.ciaChart.cia,
        }]
      });
    },
    showRelChart(){
    },
    apply() {
      this.$router.push({
        path: '/applySettle',
        query: {
          v: this.author_id
        }
      })
    }
  },
}
</script>

<style scoped>
.schPortal .info-div {
  background-color: white;
  padding-top: 25px;
  padding-left: 45px;
  padding-bottom: 25px;
  margin-left: 170px;
  margin-top: 40px;
  width: 80%;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.schPortal .main-div{
  width: 80%;
  margin-left: 170px;
  margin-top: 22px;
}

.schPortal .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #ffffff00 !important;
}

.schPortal .art-table{
  width: 100%;
}


.schPortal .headImg{
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-left: 10px;
}

.schPortal .people-text{
  padding-top: 25px;
}

.schPortal .data-div{
  padding: 10px 30px 20px;
  margin-bottom: 30px;
  min-height: 500px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}
.schPortal .friends-div{
  text-align: left;
  padding: 10px 10px 5px 15px;
  min-height: 608px;
  width: 23.3%;
  margin-left: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .04)
}

.schPortal .article-body{
  margin-top: 15px;
  margin-bottom: 15px;
}

.schPortal .article-body .art-info{
  padding-left: 2px;
}

.schPortal >>> .el-tabs__item{
  padding-left: 20px;
  height: 45px;
  font-size: medium;
}

.schPortal >>> .el-tabs__item.is-active{
  color: #00b1fd;
  font-weight: 650;
}

.schPortal >>> .el-tabs__active-bar{
  transition: all 0.3s;
  background-color: #00b1fd;
}

.schPortal >>> .dataChart .el-tabs__item{
  padding-left: 20px;
  height: 45px;
  font-size: small;
}

.schPortal .dataChart >>> .el-tabs__item.is-active{
  color: #00b1fd;
  font-weight: 500;
}

.schPortal .opera-button {
  margin-left:5px;
  margin-top:50px;
  height: 35px;
  width: 80px;
  text-align: center;
  vertical-align:middle;
  border-radius: 10px;
  padding: 10px;
}

.schPortal .dataChart >>> .el-tabs__active-bar{
  transition: all 0.3s;
  background-color: rgba(0, 177, 253, 0);
}

.schPortal .dataChart >>> .el-tabs__nav-wrap::after{
  height: 0;
}

.schPortal .dataChart{
  padding-left: 30px;
  padding-top: 7px;
}

.schPortal .friends-item{
  padding-bottom: 13px;
  margin-top: 18px;
  border-bottom: #e2e2e2 solid 1px;
}

.schPortal .friends-item >>> .el-col-20 {
  margin-top: 7px;
}

.schPortal .friends-item >>> .el-image{
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.schPortal >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}

.schPortal .el-table--border::after, .el-table--group::after, .el-table::before{
  background-color: rgba(41, 56, 69, 0);
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 7px;
}
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb  {
  background-color: rgba(203, 202, 202, 0.66);
  border-radius: 8px;
}

.schPortal .deleteIcon{
  color: #F56C6C;
}

.schPortal .deleteIcon :hover{
  color: #ff7b7b;
}


</style>