<template>
  <v-container
    id="unitMyWork"
    fluid
    tag="section"
  >
    <v-tabs
      v-model="tab"
      value="search"
      background-color="transparent"
      slider-color="blue"
    >
      <!-- <v-tab
        key="worktodo"
        href="#unit-card-work"
      >
        Work To Do
      </v-tab> -->
      <v-tab
        key="search"
        href="#search"
      >
        search
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tab"
    >
      <v-tab-item
        key="worktodo"
      >
      </v-tab-item>
      <v-tab-item
        key="search"
        value="search"
      >
        <!-- Filter Headr -->
        <v-toolbar
          flat
          color="transparent"
        >
          <v-toolbar-title
            class="grey--text"
          >
          </v-toolbar-title>
  
          <v-spacer></v-spacer>
  
          <v-btn icon>
            <v-icon>mdi-filter-outline</v-icon>
          </v-btn>
  
          <v-btn
            small
            color="primary"
            dark
          >
            상세
          </v-btn>
  
          <v-text-field
            :label="$t('search')"
            append-icon="mdi-magnify"
            color="secondary"
            hide-details
            style="max-width: 165px;"
            class="ml-5"
          >
          </v-text-field>
        </v-toolbar>
       
        <tree-table
          :value="units"
          :paginator="true"
          :rows="10"
          :resizable-columns="true"
          column-resize-mode="expand"
          indentation="0.5"
        >
            <column header-style="width: 30%" header-class="sm-invisible" field="name" header="Unit Name" :expander="true"></column>
            <column header-style="width: 30%" field="desc" header="Description"></column>
            <column header-style="width: 5%" field="type" header="Type" body-style="text-align: center"></column>
            <column header-style="width: 5%" field="status" header="상태" body-style="text-align: center">
              <template #body="slotProps">
                <span :class="slotProps.node.data.cssClass">
                  {{slotProps.node.data.status}}
                </span>
              </template>
            </column>
            <column header-style="width: 10%" field="planDate" header="일정"></column>
            <column header-style="width: 19%" field="regDate" header="등록일" body-style="text-align: center"></column>
            <column header-style="width: 1%" field="manager" header="담당자" body-style="text-align: center"></column>
        </tree-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
  import TreeTable from 'primevue/treetable';
  import Column from 'primevue/column';
  import 'primevue/resources/primevue.min.css';
  import 'primevue/resources/themes/saga-blue/theme.css';
  import 'primeicons/primeicons.css';
  import '@/sass/treetable.sass'

  export default {
    name: 'UnitListSearchMyWork',
    components: {
      TreeTable,
      Column,
    },
    data () {
      return {
        tab: 'search',
        page: 0,
        filter: '',
        units: [
          {
            "key":"0",
            "data":{
              "name":"QXST101101","desc":"Project Description","type":"Project","status":"진행중","planDate":"2022.08-25 ~ 2023.01.15","regDate":"2022.08.25","manager":"임꺽정","cssClass":"blue--text"
            },
            "children":[
              {
                "key":"0-0",
                "data":{
                  "name":"PCA","desc":"단계 Description","type":"단계","status":"완료","planDate":"2022.08-25 ~ 2023.09.15","regDate":"2022.08.25","manager":"홍길동","cssClass":"grey--text"
                },
                "children":[
                  {
                    "key":"0-0-1",
                    "data":{
                      "name":"사업계획서","desc":"","type":"Task","status":"완료","planDate":"2022.08-25 ~ 2023.09.15","regDate":"2022.08.25","manager":"강사업","cssClass":"grey--text"
                    },
                  },
                  {
                    "key":"0-0-1",
                    "data":{
                      "name":"시장조사","desc":"","type":"Task","status":"완료","planDate":"2022.08-27 ~ 2023.09.03","regDate":"2022.08.25","manager":"김시장","cssClass":"grey--text"
                    },
                  },                  
                ]
              },
            ]
          },
          {
            "key":"1",
            "data":{
              "name":"QXST101096","desc":"Project Description","type":"Project","status":"진행중","planDate":"2021.12-25 ~ 2023.12.15","regDate":"2021.12.23","manager":"임꺽정","cssClass":"blue--text"
            },
            "children":[
              {
                "key":"1-0",
                "data":{
                  "name":"DVR","desc":"단계 Description","type":"단계","status":"완료","planDate":"2021.12-25 ~ 2022.02.13","regDate":"2021.12.23","manager":"홍길동","cssClass":"grey--text"
                },
                "children":[
                  {
                    "key":"1-0-1",
                    "data":{
                      "name":"회로검증","desc":"","type":"Task","status":"완료","planDate":"2021.12-25 ~ 2022.01.09","regDate":"2021.12.23","manager":"강회로","cssClass":"grey--text"
                    },
                  },
                  {
                    "key":"1-0-2",
                    "data":{
                      "name":"PCB검증","desc":"","type":"Task","status":"완료","planDate":"2022.01.12 ~ 2022.01.28","regDate":"2021.12.23","manager":"최아트","cssClass":"grey--text"
                    },
                  },                  
                ]
              },
              {
                "key":"1-1",
                "data":{
                  "name":"PVR","desc":"단계 Description","type":"단계","status":"완료","planDate":"2022.02.14 ~ 2022.09.13","regDate":"2021.12.23","manager":"홍길동","cssClass":"grey--text"
                },
                "children":[
                  {
                    "key":"1-1-1",
                    "data":{
                      "name":"제품검증","desc":"","type":"Task","status":"완료","planDate":"2022.02.14 ~ 2022.01.09","regDate":"2021.12.23","manager":"강회로","cssClass":"grey--text"
                    },
                  },            
                ]
              },
            ]
          },
        ],
      }
    },
    computed: {
      headers () {
        return [
          {field: 'name', header: 'Unit Name', expander: true},
          {field: 'size', header: 'Size'},
          {field: 'type', header: 'Type'}
        ]
      },
    },
    methods: {
        filterChanged (filter) {
            this.filter = filter;
        },
        
        pageChanged (page) {
            this.page = page;
        },
    },
  }
</script>
