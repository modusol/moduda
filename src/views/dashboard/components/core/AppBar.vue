<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="drawer">
        mdi-chevron-left
      </v-icon>

      <v-icon v-else>
        mdi-chevron-right
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />
    <v-btn
      id="notifications"
      class="ml-2"
      min-width="0"
      text
    >
      <v-badge
        color="red"
        overlap
        bordered
      >
        <template v-slot:badge>
          <span>3</span>
        </template>

        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>
    <v-btn
      id="settings"
      class="ml-2"
      min-width="0"
      text
      active-class=""
    >
      <v-avatar>
        <v-img :src="avatarImage" />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapState(['drawer', 'avatarImage']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
    },
  }
</script>
