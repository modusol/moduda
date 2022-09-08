<template>
  <v-container
    id="unitMyWork"
    fluid
    tag="section"
  >
    <v-tabs
      v-model="tab"
      background-color="transparent"
    >
      <v-tab
        key="worktodo"
      >
        Work To Do
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tab"
    >
      <v-tab-item
        key="worktodo"
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
        <v-row
          align="center"
        >
          <v-col
            v-for="work in works"
            :key="work"
            cols="12"
            sm="6"
            lg="3"
          >
            <v-card
              elevation="2"
              outlined
              class="mx-3"
            >
              <v-toolbar
              flat
              dense
              class="toolbar-pr-0"
              >
                <template slot="default">
                  <v-chip
                    v-for="tag in work.tags"
                    :key="tag"
                    class="mr-2"
                    :color="tag.color"
                    x-small
                    dark
                    link
                  >
                    {{ tag.title }}
                  </v-chip>                
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    small
                  >
                  <v-icon 
                    :color="work.favorite? 'yellow' : ''">mdi-star</v-icon> 
                  </v-btn>
                  <v-btn
                    icon
                    small
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
              </v-toolbar>
                <v-card-title class="pt-1 pb-0">{{work.title}}</v-card-title>
                <v-card-text class="pa-0">
                  <v-list-item two-line>
                    <v-list-item-content>                    
                      <v-list-item-subtitle class="pr-3 pb-2 text--secondary text-right">{{work.period}}</v-list-item-subtitle>
                      <v-list-item-subtitle class="text--primary pl-1">{{work.subtitle}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card-text>
                <v-card-actions>
                  <v-list-item class="grow align-end">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-icon class="mr-1">
                          mdi-application-edit-outline
                        </v-icon>
                        <span class="subheading mr-2">{{work.taskCnt}}</span>
                        <v-icon class="mr-1">
                          mdi-message-text-outline
                        </v-icon>
                        <span class="subheading mr-2">{{work.talkCnt}}</span>
                      </v-list-item-title>
                    </v-list-item-content>          
                    <v-row
                      align="center"
                      justify="end"
                    >
                      <v-icon class="mr-1">
                        mdi-account
                      </v-icon>
                      <span class="subheading">{{work.userCnt}}</span>
                    </v-row>
                  </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>      
  </v-container>
</template>

<script>
  export default {
    name: 'UnitCardMyWork',
    data () {
      return {
        tab: 'worktodo',
        works: [
          {
            title: 'System 구상 설계',
            period: '22.08.25 ~ 23.01.15',
            subtitle: '2023 OLED 주력상품',
            tags: [
              {
                title: 'DGU-8650-PRIMA',
                color: 'green',
              },
              {
                title: 'G3',
                color: 'pink',
              },
            ],
            taskCnt: 12,
            talkCnt: 20,
            userCnt: 17,
            favorite: true,
          },
          {
            title: '주간 업무 보고',
            period: '22.01.03 ~ 22.12.31',
            subtitle: '2022년도 개발1팀 주간업무보고',
            tags: [
              {
                title: '개발 1팀',
                color: 'green',
              },
              {
                title: '22` 업무 보고',
                color: 'pink',
              },
            ],
            taskCnt: 1,
            talkCnt: 4,
            userCnt: 10,
            favorite: true,
          },
          {
            title: '[임시]2025 OLED 신규모델',
            period: '22.01.03 ~ 22.12.31',
            subtitle: '2025년도 신규모델 선행 개발',
            tags: [
            ],
            taskCnt: 3,
            talkCnt: 1,
            userCnt: 14,
          },
        ],
      }
    },
  }
</script>
