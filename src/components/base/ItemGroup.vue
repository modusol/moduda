<template>
  <v-list-group
    :group="item.group"
    :prepend-icon="item.icon"
    :sub-group="subGroup"
    append-icon="mdi-menu-down"
    :color="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)' ? 'white' : 'grey darken-1'"
    :style="level !== 0 ? 'padding-left:' + (30*level) + 'px' : ''"
    :value="this.$route.path && this.$route.path === item.to ? true : false"
    @click="clickGroup(item)"
  >
    <template v-slot:activator>
      <v-list-item-icon
        v-if="text"
        class="v-list-item__icon--text"
        v-text="computedText"
      />

      <v-list-item-avatar
        v-else-if="item.avatar"
        class="align-self-center"
        color="white"
        contain
      >
        <v-img src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          v-text="item.title"
        />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in children">
      <base-item-sub-group
        v-if="child.children"
        :key="`sub-group-${i}`"
        :item="child"
        :level="computedLevel"
      />

      <base-item
        v-else
        :key="`item-${i}`"
        :item="child"
        :level="computedLevel"
      />
    </template>
  </v-list-group>
</template>

<script>
  // Utilities
  // import kebabCase from 'lodash/kebabCase'
  import { mapState } from 'vuex'

  export default {
    name: 'ItemGroup',

    inheritAttrs: false,

    props: {
      item: {
        type: Object,
        default: () => ({
          avatar: undefined,
          group: undefined,
          title: undefined,
          children: [],
        }),
      },
      subGroup: {
        type: Boolean,
        default: false,
      },
      text: {
        type: Boolean,
        default: false,
      },
      level: {
        type: Number,
        default: 0,
      },
    },

    computed: {
      ...mapState(['barColor']),
      children () {
        return this.item.children.map(item => ({
          ...item,
          to: !item.to ? undefined : `/${this.item.group}/${item.to}`,
        }))
      },
      computedText () {
        if (!this.item || !this.item.title) return ''

        let text = ''

        this.item.title.split(' ').forEach(val => {
          text += val.substring(0, 1)
        })

        return text
      },
      // group () {
      //   return this.genGroup(this.item.children)
      // },
      computedLevel () {
        let rtnLevel = 0
        rtnLevel = this.level + 1
        return rtnLevel
      },
    },

    methods: {
      // genGroup (children) {
      //   return children
      //     .filter(item => item.to)
      //     .map(item => {
      //       const parent = item.group || this.item.group
      //       // console.log("parent : " ,parent)
      //       // let group = `${parent}/${kebabCase(item.to)}`

      //       // if (item.children) {
      //       //   group = `${group}|${this.genGroup(item.children)}`
      //       // }
      //       // console.log(group)
      //       return parent
      //     }).join('|')
      // },
      clickGroup (item) {
        if (item.children && item.to) {
          this.$router.push(item.to)
        }
      },
    },
  }
</script>

<style>
.v-list-group__activator p {
  margin-bottom: 0;
}
</style>
