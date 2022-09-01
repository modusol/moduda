<template>
  <v-container
    id="unitDashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="8"
      >
        <base-material-card
          color="primary"
          thin
        >
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Project 현황
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Project 별 계획 진척율, 공정 진척율
            </div>
          </template>

          <v-card-text>
            <v-data-table
              :headers="proj.projHeaders"
              :items="proj.projItems"
              :page.sync="proj.page"
              :items-per-page="5"
              hide-default-footer
              @page-count="pageCount = $event"
            >
              <template v-slot:item.milestones="{ item }">
                <template v-for="(ms) in item.milestones">
                  <v-btn
                    :key="ms.name"
                    :value="ms.name"
                    :color="ms.color"
                    :dark="ms.value"
                    :disabled="!ms.value"
                    x-small
                    class="ml-1"
                  >
                    {{ ms.name }}
                  </v-btn>
                </template>
              </template>
              <template v-slot:item.status="{ item }">
                <v-badge
                  color="green"
                  :content="item.all"
                  overlap
                  class="mr-3"
                  bordered
                >
                  <v-icon
                    color="grey lighten-1"
                    size="30"
                  >
                    mdi-progress-check
                  </v-icon>
                </v-badge>
                <v-badge
                  color="blue"
                  :content="item.ing"
                  overlap
                  class="mr-3"
                  bordered
                >
                  <v-icon
                    color="grey lighten-1"
                    size="30"
                  >
                    mdi-progress-clock
                  </v-icon>
                </v-badge>
                <v-badge
                  color="red"
                  overlap
                  :content="item.issue"
                  bordered
                >
                  <v-icon
                    color="grey lighten-1"
                    size="30"
                  >
                    mdi-alert-decagram
                  </v-icon>
                </v-badge>
              </template>
              <template v-slot:item.process="{ item }">
                <v-progress-linear
                  :value="item.plan"
                  color="amber"
                  height="20"
                  disabled
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
                <v-progress-linear
                  :value="item.process"
                  color="blue"
                  height="20"
                  disabled
                >
                  <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-pagination
                v-model="proj.page"
                :length="proj.pageCount"
              />
            </div>
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-card
          color="primary"
          thin
        >
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Milestone 현황
            </div>

            <div class="text-subtitle-1 font-weight-light">
              단계별 계획/실적 Project 진행 현황
            </div>
          </template>

          <v-card-text>
            <pie-chart
              :data="milestone"
              width="295"
              height="295"
            />
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card
          color="primary"
          thin
        >
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              진행할 업무 Schedule
            </div>
          </template>

          <v-card-text>
            <v-sheet height="64">
              <v-toolbar
                flat
              >
                <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
                >
                  Today
                </v-btn>
                <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="prev"
                >
                  <v-icon small>
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
                <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="next"
                >
                  <v-icon small>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer />
                <v-menu
                  bottom
                  right
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="grey darken-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span>{{ cal.typeToLabel[cal.type] }}</span>
                      <v-icon right>
                        mdi-menu-down
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="cal.type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="cal.type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="cal.type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="cal.type = '4day'">
                      <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="cal.focus"
                color="primary"
                :events="cal.events"
                :event-color="getEventColor"
                :type="cal.type"
                title="진행할 업무"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
              />
              <v-menu
                v-model="cal.selectedOpen"
                :close-on-content-click="false"
                :activator="cal.selectedElement"
                offset-x
              >
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    :color="cal.selectedEvent.color"
                    dark
                  >
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="cal.selectedEvent.name" />
                    <v-spacer />
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="cal.selectedEvent.details" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      text
                      color="secondary"
                      @click="cal.selectedOpen = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import PieChart from '@/components/chart/Pie'
  export default {
    name: 'UnitDashboard',
    components: {
      PieChart,
    },
    data () {
      return {
        proj: {
          page: 1,
          pageCount: 2,
          projHeaders: [
            {
              text: 'Project',
              value: 'project',
              align: 'center',
            },
            {
              text: 'Milestones',
              value: 'milestones',
              align: 'start',
            },
            {
              text: 'Status',
              value: 'status',
              align: 'start',
            },
            {
              text: '계획진척율/공정진척율',
              value: 'process',
              align: 'center',
            },
          ],
          projItems: [
            {
              project: 'QXST101101',
              plan: 32,
              process: 20,
              all: 20,
              ing: 3,
              issue: 2,
              milestones: [
                {
                  name: 'PCA',
                  color: 'blue',
                  value: true,
                },
                {
                  name: 'DIA',
                  color: 'green',
                  value: true,
                },
              ],
            },
            {
              project: 'QXST101096',
              plan: 76,
              process: 20,
              all: 13,
              ing: 2,
              issue: 1,
              milestones: [
                {
                  name: 'DIA',
                  color: 'blue',
                  value: true,
                },
                {
                  name: 'PIA',
                  color: 'green',
                  value: false,
                },
              ],
            },
            {
              project: 'ATM101101',
              plan: 98,
              process: 87,
              all: 23,
              ing: 6,
              issue: 2,
              milestones: [
                {
                  name: 'DIA',
                  color: 'blue',
                  value: false,
                },
                {
                  name: 'PIA',
                  color: 'blue',
                  value: true,
                },
                {
                  name: 'DVR',
                  color: 'blue',
                  value: true,
                },
                {
                  name: 'PVR',
                  color: 'blue',
                  value: true,
                },
                {
                  name: 'PRA',
                  color: 'green',
                  value: true,
                },
              ],
            },
            {
              project: 'ATM103021',
              plan: 5,
              process: 1,
              all: '12',
              ing: 1,
              issue: '0',
              milestones: [
                {
                  name: 'DVR',
                  color: 'green',
                  value: true,
                },
              ],
            },
          ],
        },
        milestone: {
          chartData: {
            labels: ['PCA', 'DIA', 'PIA', 'DVR', 'PVR', 'PRA', 'SRA'],
            datasets: [
              {
                backgroundColor: ['#BCAAA4', '#81D4FA', '#FFE082', '#C5E1A5', '#80DEEA', '#E6EE9C', '#B2EBF2'],
                data: [3, 15, 20, 24, 27, 5, 6],
              },
            ],
          },
          chartOptions: {
            responsive: true,
            maintainAspectRatio: false,
          },
        },
        cal: {
          focus: '',
          type: 'month',
          typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day',
            '4day': '4 Days',
          },
          selectedEvent: {},
          selectedElement: null,
          selectedOpen: false,
          events: [],
          colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1', 'red', 'green', 'blue'],
          names: ['시험 성적서', '요구사항 명세', 'PCB 제작요청', '회로설계검증', '기구설계검증', '도면배포', '신뢰성 시험 의뢰', 'Sample 발주', '[회의]회로DR', '[회의]품평회 진행'],
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
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      viewDay ({ date }) {
        this.cal.focus = date
        this.cal.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.cal.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.cal.selectedEvent = event
          this.cal.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => { this.cal.selectedOpen = true }))
        }

        if (this.cal.selectedOpen) {
          this.cal.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)
        for (let i = 0; i < eventCount; i++) {
          const allDay = true
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)
          const project = this.proj.projItems[this.rnd(0, this.proj.projItems.length - 1)].project
          const title = `${project} - ${this.cal.names[this.rnd(0, this.cal.names.length - 1)]}`
          events.push({
            name: title,
            start: first,
            end: title.indexOf('회의') > -1 ? first : second,
            color: this.cal.colors[this.rnd(0, this.cal.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.cal.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>
