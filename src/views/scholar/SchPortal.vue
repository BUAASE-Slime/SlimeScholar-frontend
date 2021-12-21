<template>
  <div class="schPortal">
    <el-row class="info-div">
          <el-col :span="4">
            <el-upload
                v-if="isSelf"
                :action="uploadAvatarUrl"
                :http-request="upLoadAvatar"
                :before-upload="beforeUpload"
                :show-file-list="false">
              <el-image class="headImg" v-if="avatarUrls.length>0" :src="avatarUrls[0]"></el-image>
            </el-upload>
            <div v-else>
              <el-image v-if="avatarUrls.length>0" :src="avatarUrls[0]" class="headImg"></el-image>
            </div>
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
                <el-link style="color: #2d94d4; font-size: medium;" @click="toArea(area)">{{ area }}</el-link>
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
                  @keyup.enter.native="searchArt"
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
                <scroll-loader slot="append" :loader-method="searchArt" :loader-disable="loadMoreDisable"></scroll-loader>
              </el-table>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="数据分析" name="analyse" class="dataChart" style="height: 510px">
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
                    <div id="citation-chart" style="width:500px;height: 435px;margin-left: 150px"></div>
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
                  <div id="relation-chart" style="width: 800px;height: 455px;margin-right: 10px"></div>
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
            <el-row class="friends-item" v-for="(i,index) in info.coauthors" :key="index">
              <el-col :span="4">
                <el-image v-if="coauthor_avatars[index]&&coauthor_avatars[index]!==''" :src="coauthor_avatars[index]"></el-image>
<!--                <el-image v-else src="https://img-1304418829.cos.ap-beijing.myqcloud.com/avatar-grey-bg.jpg"></el-image>-->
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
import avatarApi from "../../utils/avatarApi";

export default {
  name: "schPortal.vue",
  mixins: [ avatarApi ],
  watch: {
    result(val) {
      this.loadMoreDisable = val.length >= this.resultTotalHits;
    },
  },
  data(){
    return {
      isEdit: false,
      dialogVisible: false,
      searchInput:"",
      result: [],
      result_page_idx: 1,
      loadMoreDisable: true,
      resultTotalHits: 10,
      isSelf: false,
      tableTitle:"文献",
      tableTitleEdit:"已有文献",

      // 个人信息
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
        coauthors: [
          {
            affiliation_id: "141649914",
            author_id: "2554276614",
            citation_count: 1059,
            name: "Zengqi Huang",
            paper_count: 40,
            rank: 16859
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
      infoForChart: {
        affiliation_name: "Slime",
        author_id: "999",
        author_name: "AAAAAAAAAA",
        friends: [
          {
            affiliation_name: "Independent Researcher",
            author_id: "1",
            author_name: "Slime Scholar",
            friends:[
              {
                affiliation_name: "BUAA",
                author_id: "12",
                author_name: "A.A.A",
                friends:[]
              },
              {
                affiliation_name: "TES",
                author_id: "18",
                author_name: "A.A.B",
                friends:[
                  {
                    affiliation_name: "TES",
                    author_id: "66",
                    author_name: "A.A.B.A",
                    friends:[]
                  },
                  {
                    affiliation_name: "TES",
                    author_id: "456",
                    author_name: "A.A.B.B",
                    friends:[]
                  },
                  {
                    affiliation_name: "TES",
                    author_id: "789",
                    author_name: "A.A.B.C",
                    friends:[]
                  }
                ]
              }
            ]
          },
          {
            affiliation_name: "BUAA",
            author_id: "12",
            author_name: "A.B",
            friends:[]
          },{
            affiliation_name: "Independent Researcher",
            author_id: "8",
            author_name: "A.C",
            friends:[]
          },{
            affiliation_name: "BUAA",
            author_id: "7",
            author_name: "A.D",
            friends:[]
          },{
            affiliation_name: "Independent Researcher",
            author_id: "5",
            author_name: "A.E",
            friends:[]
          },
        ]
      },

      // 头像
      avatarUrls: ["https://img-1304418829.cos.ap-beijing.myqcloud.com/avatar-grey-bg.jpg"],
      avatarUrl: '',
      uploadAvatarUrl: this.GLOBAL.backUrl + '/user/export/avatar',
      coauthor_avatars: ["https://img-1304418829.cos.ap-beijing.myqcloud.com/avatar-grey-bg.jpg"],
    }
  },
  created() {
    // 查询的是别人的门户
    this.author_id = this.$route.query.v;
    if (this.$route.query.v && this.$route.query.v !== '') {
      this.getSchInfo(this.$route.query.v, 'author_id');
      this.getCitationCount(this.author_id);
      this.artNumInit = this.info.papers.length > 6? 6 : this.info.papers.length;
    } else {
      // 自己的门户
      const userInfo = user.getters.getUser(user.state());
      // 未登录则先登录
      if (!userInfo) {
        this.$userNotLogin(true);
      }
      this.author_id = userInfo.user.authorId;
      // 调用接口返回学者信息
      this.getSchInfo(userInfo.user.userId, 'user_id');
    }

    // 请求被引用量随年份的变化信息
    this.getCitationCount(this.author_id);
    // 请求学者的学者关系信息
    this.getRelaAuthors(this.author_id,1);
    // 获取学者头像
    this.getAvatars(this.author_id, this.avatarUrls);
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
    toArea(area) {
      let routeUrl = this.$router.resolve({
        path: '/searchRes',
        query: { field: area }
      });
      window.open(routeUrl .href, "_blank");
    },
    // 头像上传
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return (isJPG || isPNG) && isLt5M;
    },
    upLoadAvatar(file) {
      // 未登录则先登录
      const userInfo = user.getters.getUser(user.state());
      if (!userInfo) {
        this.$userNotLogin(true);
      }

      const formData = new FormData();
      formData.append('avatar', file.file);
      formData.append('user_id', userInfo.user.userId);
      this.$axios({
        method: 'post',
        url: this.uploadAvatarUrl,
        data: formData,
      })
      .then(res => {
        if (res.data.success) {
          this.$message.success('上传头像成功！');
          this.avatarUrls = [this.getAvatarFullPath(res.data.data)];
        } else {
          this.$message.error("发生错误！");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    save(){
      this.isEdit = false;
      this.$message.success("保存成功");
      setTimeout(() => {
        location.reload();
      }, 1000);
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
      if (this.result.length >= this.resultTotalHits) {
        this.loadMoreDisable = true;
        return;
      }

      this.$axios({
        method: 'post',
        url: 'es/query/paper/title',
        data: qs.stringify({
          title: this.searchInput,
          page: this.result_page_idx,
          is_precise: true,
        })
      })
      .then(res => {
        console.log(res.data);
        switch (res.data.status) {
          case 200:
            this.result = this.result.concat(res.data.details);
            this.result_page_idx += 1;
            this.resultTotalHits = res.data.total_hits;
            if (this.result.length >= this.resultTotalHits)
              this.loadMoreDisable = true;
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
            this.getCoauthorAvatars();
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
    getCitationCount(author_id) {
      this.$axios({
        method: 'post',
        url: '/scholar/get/citation/author',
        data: qs.stringify({
          id: author_id
        })
      })
      .then(res => {
        if (res.data.success) {
          this.ciaChart.cia = res.data.citations;
          this.ciaChart.years = res.data.years;
          setTimeout(() => {
            this.showCiaChart();
          }, 500);
        } else {
          this.$message.error("图表信息获取失败！");
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    getCoauthorAvatars() {
      let author_ids = [];
      for (let i = 0; i < this.info.coauthors.length; i++)
        author_ids.push(this.info.coauthors[i].author_id);
      this.getAvatars(author_ids, this.coauthor_avatars);
    },
    getRelaAuthors(author_id, level) {
      this.$axios({
        method: 'post',
        url: '/scholar/graph',
        data: qs.stringify({
          author_id: author_id,
          level: level,
        })
      })
      .then(res => {
        if (res.data.success) {
          this.infoForChart = res.data.detail;
          setTimeout(() => {
            this.showRelChart();
          }, 300);
        }
        else this.$message.error("学者关系网络获取失败！");
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
    apply() {
      this.$router.push({
        path: '/applySettle',
        query: {
          v: this.author_id
        }
      })
    },
    showRelChart(){
      let self = this
      let nodeList=[]
      let linkList=[]
      let node = {
        id:this.infoForChart.author_id,
        name:this.infoForChart.author_name,
        affiliation_name:this.infoForChart.affiliation_name,
        symbol:"circle",
        layer:0
      }
      nodeList.push(node)
      //处理f
      for (let i=0;i<this.infoForChart.friends.length;i++) {
        let fItem = this.infoForChart.friends[i]
        let f = {
          id: fItem.author_id,
          name: fItem.author_name,
          affiliation_name: fItem.affiliation_name,
          symbol: "circle",
          layer:1,
        }
        //检查是否已生成该f
        let flag = 0;
        for (let w = 0; w < nodeList.length; w++) {
          if (nodeList[w].id === fItem.author_id) {
            nodeList[w].layer = 1;
            nodeList[w].name = fItem.author_name;
            flag = 1;
            break
          }
        }
        if (flag === 0) {
          nodeList.push(f);
        }
        linkList.push({
          source: node.id,
          target: f.id
        })
        //处理ff  fItem:f的结构 node:源节点
        for (let q = 0; q < fItem.friends.length; q++) {
          //获取朋友的朋友
          let ffItem = fItem.friends[q]
          let ff = {
            id: ffItem.author_id,
            name: ffItem.author_name,
            affiliation_name: ffItem.affiliation_name,
            symbol: "circle",
            layer: 2
          }

          //判断是否为已出现结点
          let flag = 0;
          for (let w = 0; w < nodeList.length; w++) {
            if (nodeList[w].id === ffItem.author_id) {
              flag = 1;
              if (nodeList[w].layer > 2) {
                nodeList[w].symbolSize = 2
              }
              break
            }
          }
          if (flag === 0) {
            nodeList.push(ff)
          }
          linkList.push({
            source: f.id,
            target: ff.id
          })
          //处理fff
          for (let r = 0; r < ffItem.friends.length; r++) {
            //获取朋友的朋友
            let fffItem = ffItem.friends[r]
            let fff = {
              id: fffItem.author_id,
              name: fffItem.author_name,
              affiliation_name: fffItem.affiliation_name,
              symbol: "circle",
              layer:3
            }

            //判断是否为已出现结点
            let flag = 0;
            for (let t = 0; t < nodeList.length; t++) {
              if (nodeList[t].id === fffItem.author_id) {
                flag = 1;
                if (nodeList[t].symbolSize > 3) {
                  nodeList[t].symbolSize = 3
                }
                break
              }
            }
            if (flag === 0) {
              nodeList.push(fff)
            }
            linkList.push({
              source: ff.id,
              target: fff.id
            })
          }
        }
      }

      var myChart = this.$echarts.init(document.getElementById('relation-chart'), 'macaroons');
      // 指定图表的配置项和数据
      var option = {
        tooltip : {
          show : true,   //默认显示
          showContent:true, //是否显示提示框浮层
          trigger:'item',//触发类型，默认数据项触发
          triggerOn:'mousemove',//提示触发条件，mousemove鼠标移至触发，还有click点击触发
          alwaysShowContent:false, //默认离开提示框区域隐藏，true为一直显示
          showDelay:0,//浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。在 triggerOn 为 'mousemove' 时有效。
          hideDelay:200,//浮层隐藏的延迟，单位为 ms，在 alwaysShowContent 为 true 的时候无效。
          enterable:false,//鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
          position:'right',//提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。只在 trigger 为'item'的时候有效。
          confine:true,//是否将 tooltip 框限制在图表的区域内。外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
          transitionDuration:0.4,//提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
          formatter:function(params){
            if(params.dataType==='node'){
              let ans = "<el-row>";
              //简介
              ans+="<el-col>" +
                  "<span style='margin-right: 3px'>"+params.name+"，</span>" +
                  "<span>"+params.data.affiliation_name+"</span>" +
                  "</el-col>"
              ans+="</el-row>"
              return ans;
            }
            return null;
          }
        },
        series : [ {
          type : 'graph', //关系图
          name : "学者人际关系图", //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
          layout : 'force', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
          legendHoverLink : true,//是否启用图例 hover(悬停) 时的联动高亮。
          hoverAnimation : true,//是否开启鼠标悬停节点的显示动画
          coordinateSystem : null,//坐标系可选
          xAxisIndex : 0, //x轴坐标 有多种坐标系轴坐标选项
          yAxisIndex : 0, //y轴坐标
          force : {
            //力引导图基本配置
            //initLayout: ,//力引导的初始化布局，默认使用xy轴的标点
            repulsion : 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
            gravity : 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            edgeLength :150,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
            layoutAnimation : true
            //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
          },
          roam : true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          nodeScaleRatio : 0.6,//鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
          draggable : true,//节点是否可拖拽，只在使用力引导布局的时候有用。
          focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
          //symbol:'roundRect',//关系图节点标记的图形。ECharts 提供的标记类型包括 'circle'(圆形), 'rect'（矩形）, 'roundRect'（圆角矩形）, 'triangle'（三角形）, 'diamond'（菱形）, 'pin'（大头针）, 'arrow'（箭头）  也可以通过 'image://url' 设置为图片，其中 url 为图片的链接。'path:// 这种方式可以任意改变颜色并且抗锯齿
          //symbolSize:10 ,//也可以用数组分开表示宽和高，例如 [20, 10] 如果需要每个数据的图形大小不一样，可以设置为如下格式的回调函数：(value: Array|number, params: Object) => number|Array
          //symbolRotate:,//关系图节点标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
          //symbolOffset:[0,0],//关系图节点标记相对于原本位置的偏移。[0, '50%']
          symbolSize: function (value,params) {//改变节点大小
            var SizeList = [100,80, 60, 40, 20];
            return SizeList[params.data.layer]
          },
          edgeSymbol : [ 'none', 'none' ],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
          edgeSymbolSize : 10,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
          itemStyle : {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
            normal : { //默认样式
              label : {
                show : true
              },
              color: function (params) {
                var colorList = ['rgb(255,225,106)','rgb(97,133,185)', 'rgb(133,166,206)', 'rgb(158,192,238)', 'rgb(205,236,248)', 'rgb(216,233,243)'];
                return colorList[params.data.layer]
              },
              borderType : 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
              borderColor : 'rgba(255,106,106,0)', //设置图形边框为淡金色,透明度为0.4
              borderWidth : 1, //图形的描边线宽。为 0 时无描边。
              opacity : 1
              // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
            },
            emphasis : {//高亮状态
            }
          },
          lineStyle : { //公用线条样式。
            normal : {
              color : 'rgba(0,0,0,0.4)',
              width : '1',
              type : 'solid', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
              curveness : 0.25, //线条的曲线程度，从0到1
              opacity : 0.5 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
            },
            emphasis : {//高亮状态
            }
          },
          label : { //文本标签
            normal : {
              show : true,//是否显示标签。
              position : 'inside',//标签的位置。['50%', '50%'] [x,y]
              textStyle : { //标签的字体样式
                color : '#000000', //字体颜色
                fontStyle : 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                fontWeight : '400',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                fontFamily : 'sans-serif', //文字的字体系列
                fontSize : 12, //字体大小
              }
            },
            emphasis : {//高亮状态

            }
          },
          edgeLabel : {//线条的边缘标签
            normal : {
              show : false
            },
            emphasis : {//高亮状态

            }
          },
          nodes:nodeList,
          links:linkList
        } ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart.on('click',function (params){
        if (params.dataType === 'node') {
          toThisOne(params.data.id)
        }
      });
      function toThisOne(id){
        let routeUrl = self.$router.resolve({
          path: '/schPortal',
          query: { v: id }
        });
        window.open(routeUrl .href, "_blank");
      }
    },
  }
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