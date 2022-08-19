<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <base-material-card
          color="primary"
          thin
        >
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Notify
            </div>
          </template>
          <v-list
            dense
          >
            <v-list-item-group
              active-class=""
            >
              <template v-for="(item, index) in notify.items">
                <v-list-item
                  :key="item.title"
                >
                  <template>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text v-text="item.action" />
                    </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index < notify.items.length - 1"
                  :key="index"
                />
              </template>
            </v-list-item-group>
          </v-list>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <base-material-card
          color="primary"
          thin
        >
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Q & A
            </div>
          </template>
          <v-list
            two-line
            dense
          >
            <v-list-item-group
              active-class=""
            >
              <template v-for="(item, index) in qa.items">
                <v-list-item :key="item.title">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title
                        class="txt_line"
                        v-text="item.title"
                      />
                      <v-list-item-subtitle
                        class="txt_line v-list-reply-text"
                        v-text="item.reply"
                      />
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text v-text="item.action" />
                      <v-list-item-action-text
                        class="v-list-reply-text"
                        v-text="item.replyAction"
                      />
                    </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index < qa.items.length - 1"
                  :key="index"
                />
              </template>
            </v-list-item-group>
          </v-list>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="partRegChart.data"
          :options="partRegChart.options"
          :responsive-options="partRegChart.responsiveOptions"
          :color-type="'red'"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            부품 등록 현황
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            월별 표준, 비표준 등록 건수
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="text-caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="unitRegChart.data"
          :options="unitRegChart.options"
          :color-type="'green'"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Unit 등록 현황
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            월별 Unit 등록 건수
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="text-caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="designRegChart.data"
          :options="designRegChart.options"
          :color-type="'blue'"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            설계 등록 현황
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            지난 일주일간 설계 등록 건수
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="text-caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card
          color="primary"
          thin
        >
          <template v-slot:heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <span
                class="subheading font-weight-light mx-3"
                style="align-self: center"
              >My Work :</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-layers-triple
                </v-icon>
                Unit
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-view-module
                </v-icon>
                Part
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">
                  mdi-view-dashboard-edit-outline
                </v-icon>
                Design
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items
            v-model="tabs"
            class="transparent"
          >
            <v-tab-item
              v-for="n in 3"
              :key="n"
            >
              <v-col cols="12">
                <v-row v-if="tabs != 0">
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers[tabs]"
                      :items="tasks[tabs]"
                      :options="{itemsPerPage: 5}"
                    />
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col cols="12">
                    <v-list
                      two-line
                      dense
                      flat
                    >
                      <v-list-item-group
                        active-class=""
                      >
                        <template v-for="(item, index) in tasks[tabs]">
                          <v-subheader
                            v-if="item.header"
                            :key="item.header"
                            v-text="item.header"
                          />
                          <v-divider
                            v-else-if="item.divider"
                            :key="index"
                            :inset="item.inset"
                          />
                          <v-list-item
                            v-else
                            :key="item.title"
                          >
                            <v-list-item-avatar>
                              <v-img :src="item.avatar" />
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title v-html="item.title" />
                              <v-list-item-subtitle v-html="item.subtitle" />
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </v-col>
                </v-row>
              </v-col>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Dashboard',

    data () {
      return {
        notify: {
          items: [
            {
              action: '15 min',
              title: 'BOM 사용자용/관리자용 Manual',
            },
            {
              action: '2 hr',
              title: 'Design 사용자용/관리자용 Manual',
            },
            {
              action: '6 hr',
              title: 'Part 사용자용/관리자용 Manual',
            },
            {
              action: '12 hr',
              title: 'Unit 사용자용/관리자용 Manual',
            },
            {
              action: '18hr',
              title: 'System 정기점검 공지(2022-08-21)',
            },
          ],
        },
        qa: {
          items: [
            {
              action: '30 min',
              title: 'Dashboard에서 Widget을 변경하려면 어떻게 해야 하나요?',
              reply: 'ㄴ우측 상단에 Profile 아이콘 클릭 후, Widget 설정으로 이동 하면, 원하는 Widget을 사이즈별로 설정할 수 있습니다.',
              replyAction: '12 min',
            },
            {
              action: '12 hr',
              title: 'Unit에 새로운 Template을 등록 하고 싶습니다.',
              reply: 'ㄴUnit > 관리 > Template 관리로 메뉴 이동 후, 새로운 Template 등록 후 원하는 Task등을 삽입하여 저장 하면 새로운 Template으로 진행할 수 있습니다.',
              replyAction: '10 hr',
            },
            {
              action: '3 day',
              title: 'BOM에 새로운 파생 모델을 생성하고 싶습니다.',
              reply: '',
              replyAction: '',
            },
          ],
        },
        unitRegChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              {
                name: 'Project',
                data: [1, 0, 2, 3, 1, 1, 2, 0, 0, 1, 2, 1],
              },
              {
                name: '회로',
                data: [4, 3, 1, 0, 0, 2, 1, 4, 2, 1, 3, 1],
              },
              {
                name: '기구',
                data: [1, 1, 2, 3, 2, 1, 2, 0, 0, 1, 3, 1],
              },
              {
                name: 'SW',
                data: [2, 2, 4, 1, 1, 2, 1, 0, 0, 1, 2, 1],
              },
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 8, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
            plugins: [
              this.$chartist.plugins.legend(),
            ],
          },
        },
        designRegChart: {
          data: {
            labels: ['Fri', 'Mon', 'Tue', 'Wed', 'Thu'],
            series: [
              [5, 11, 10, 7, 12],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 20, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        partRegChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              {
                name: 'Standard',
                data: [102, 121, 120, 153, 161, 170, 172, 98, 102, 131, 128, 99],
              },
              {
                name: 'Non Standard',
                data: [51, 44, 32, 78, 55, 45, 32, 34, 68, 10, 56, 95],
              },
            ],
          },
          options: {
            stackBars: true,
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 300,
            chartPadding: {
              top: 0,
              right: 1,
              bottom: 0,
              left: 0,
            },
            plugins: [
              this.$chartist.plugins.legend(),
            ],
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        headers: {
          0: [
          ],
          1: [
            {
              sortable: true,
              text: 'No',
              value: 'id',
              align: 'center',
            },
            {
              sortable: true,
              text: 'Part No',
              value: 'partNo',
              align: 'center',
            },
            {
              sortable: true,
              text: 'Desc.',
              value: 'partDesc',
              align: 'left',
            },
            {
              sortable: true,
              text: 'Spec.',
              value: 'partSpec',
              align: 'left',
            },
            {
              sortable: true,
              text: '상태',
              value: 'status',
              align: 'center',
            },
            {
              sortable: true,
              text: '작성일',
              value: 'createDate',
              align: 'center',
            },
          ],
          2: [
            {
              sortable: true,
              text: 'No',
              value: 'id',
              align: 'center',
            },
            {
              sortable: true,
              text: '제품군',
              value: 'productType',
              align: 'center',
            },
            {
              sortable: true,
              text: '제품명',
              value: 'product',
              align: 'left',
            },
            {
              sortable: true,
              text: 'Board Type',
              value: 'boardType',
              align: 'left',
            },
            {
              sortable: true,
              text: 'PBA No',
              value: 'pbaNo',
              align: 'center',
            },
            {
              sortable: true,
              text: 'PCB Code',
              value: 'pcbNo',
              align: 'center',
            },
            {
              sortable: true,
              text: '상태',
              value: 'status',
              align: 'center',
            },
          ],
        },
        tabs: 0,
        tasks: {
          0: [
            { header: 'QXST101101' },
            {
              avatar: require('@/assets/avatar/male_man_person.svg'),
              color: 'red',
              title: '신뢰성평가',
              subtitle: '<span class="text--primary">정호동</span> &mdash; 회로 신뢰성평가를 위한 산출물 등록 부탁드립니다.',
            },
            { divider: true, inset: true },
            { header: 'ATM101101' },
            {
              avatar: require('@/assets/avatar/office_man_person.svg'),
              color: 'blue',
              title: 'PCB 제작 <span class="grey--text text--lighten-1">4</span>',
              subtitle: '<span class="text--primary">홍길동</span> &mdash; PCB 제작 요청서 등록했습니다.',
            },
            { divider: true, inset: true },
            {
              avatar: require('@/assets/avatar/man_old_avatar_person.svg'),
              color: 'black',
              title: '회로 DR',
              subtitle: '<span class="text--primary">박재덕</span> &mdash; 회의 참석 부탁드립니다.',
            },
          ],
          1: [
            {
              id: 1,
              partNo: 'RC01-00037A',
              partDesc: 'R CHIP',
              partSpec: '10KΩ,5%,1/16W',
              status: '부품 등록',
              createDate: '2022-08-13',
            },
            {
              id: 2,
              partNo: 'RC01-00036A',
              partDesc: 'R CHIP',
              partSpec: '1MΩ,5%,1/16W',
              status: '부품 등록',
              createDate: '2022-08-13',
            },
            {
              id: 3,
              partNo: 'TP04-00011A',
              partDesc: 'THERMISTOR PTC',
              partSpec: '15ohm,20%,20Vac,1.6A,0.14A,TP',
              status: '부품 등록',
              createDate: '2022-08-13',
            },
            {
              id: 4,
              partNo: 'CH01-00183A',
              partDesc: 'CONNECTOR HEADER',
              partSpec: '1WALL,9P,1R,3.96MM,STRAIGHT,SN,WHT',
              status: 'Library 등록',
              createDate: '2022-08-12',
            },
            {
              id: 5,
              partNo: 'CE01-10021A',
              partDesc: 'C CERAMIC,CHIP',
              partSpec: '0.0015NF,0.1PF,50V,C0G,TP,1608',
              status: 'Library 등록',
              createDate: '2022-08-11',
            },
          ],
          2: [
            {
              id: 1,
              productType: 'TV',
              product: 'QXST101101',
              boardType: 'MAIN',
              pbaNo: 'PB01-00129A',
              pcbNo: 'PC01-00103A',
              status: '회로설계',
            },
            {
              id: 2,
              productType: 'TV',
              product: 'QXST101101',
              boardType: 'Control',
              pbaNo: 'PB01-00128A',
              pcbNo: 'PC01-00102A',
              status: '회로설계',
            },
            {
              id: 3,
              productType: 'Monitor',
              product: 'ATM101101',
              boardType: 'MAIN',
              pbaNo: 'PB01-00107A',
              pcbNo: 'PC01-00098A',
              status: 'PCB설계승인',
            },
            {
              id: 4,
              productType: 'TV',
              product: 'QGAU002610',
              boardType: 'Power',
              pbaNo: 'PB01-00059A',
              pcbNo: 'PC01-00065A',
              status: 'PCB설계',
            },
            {
              id: 5,
              productType: 'TV',
              product: 'QXST101097',
              boardType: 'Control',
              pbaNo: 'PB01-00099A',
              pcbNo: 'PC01-00088A',
              status: 'PCB설계',
            },
          ],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
