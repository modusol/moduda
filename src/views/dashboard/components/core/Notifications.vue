<template>
  <div id="notifications-wrapper">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#notifications"
      bottom
      left
      nudge-left="8"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <v-toolbar
        color="cyan"
        dark
        flat
      >
        <v-toolbar-title>Notifications</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          @click="menu = !menu"
        >
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list
        two-line
        dense
        flat
      >
        <v-list-item-group
          active-class=""
        >
          <template v-for="(item, index) in notifications">
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
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: 'DashboardCoreNotifications',

    data: () => ({
      menu: false,
      notifications: [
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
    }),
  }
</script>
