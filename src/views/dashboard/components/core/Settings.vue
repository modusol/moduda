<template>
  <div id="settings-wrapper">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#settings"
      bottom
      content-class="v-settings"
      left
      nudge-left="8"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <v-card
        class="text-center mb-0"
        width="300"
      >
        <v-card-text>
          <strong class="mb-3 d-inline-block">SIDEBAR FILTERS</strong>

          <v-item-group v-model="color">
            <v-item
              v-for="color in colors"
              :key="color"
              :value="color"
            >
              <template v-slot="{ active, toggle }">
                <v-avatar
                  :class="active && 'v-settings__item--active'"
                  :color="color"
                  class="v-settings__item"
                  size="25"
                  @click="toggle"
                />
              </template>
            </v-item>
          </v-item-group>

          <v-divider class="my-4 secondary" />

          <v-row
            align="center"
            no-gutters
          >
            <v-col cols="auto">
              Dark Mode
            </v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="$vuetify.theme.dark"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4 secondary" />

          <v-row
            align="center"
            no-gutters
          >
            <v-col cols="auto">
              Sidebar Image
            </v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="showImg"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>

          <v-divider class="my-4 secondary" />

          <strong class="mb-3 d-inline-block">IMAGES</strong>

          <v-item-group
            v-model="image"
            class="d-flex justify-space-between mb-3"
          >
            <v-item
              v-for="image in images"
              :key="image"
              :value="image"
              class="mx-1"
            >
              <template v-slot="{ active, toggle }">
                <v-sheet
                  :class="active && 'v-settings__item--active'"
                  class="d-inline-block v-settings__item"
                  @click="toggle"
                >
                  <v-img
                    :src="image"
                    height="100"
                    width="50"
                  />
                </v-sheet>
              </template>
            </v-item>
          </v-item-group>

          <strong class="mb-3 d-inline-block">AVATAR</strong>

          <v-item-group v-model="avatar">
            <v-item
              v-for="avatar in avatars"
              :key="avatar"
              :value="avatar"
            >
              <template v-slot="{ active, toggle }">
                <v-avatar
                  :class="active && 'v-settings__item--active'"
                  class="v-settings__item"
                  @click="toggle"
                >
                  <v-img :src="avatar" />
                </v-avatar>
              </template>
            </v-item>
          </v-item-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="menu = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  // Mixins
  import Proxyable from 'vuetify/lib/mixins/proxyable'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'DashboardCoreSettings',

    mixins: [Proxyable],

    data: () => ({
      color: '#4CAF50',
      colors: [
        '#9C27b0',
        '#00CAE3',
        '#4CAF50',
        '#ff9800',
        '#E91E63',
        '#FF5252',
      ],
      image: require('@/assets/sidebar/sidebar-1.jpg'),
      images: [
        require('@/assets/sidebar/sidebar-1.jpg'),
        require('@/assets/sidebar/sidebar-2.jpg'),
        require('@/assets/sidebar/sidebar-3.jpg'),
        require('@/assets/sidebar/sidebar-4.jpg'),
      ],
      avatar: require('@/assets/avatar/male_man_person.svg'),
      avatars: [
        require('@/assets/avatar/male_man_person.svg'),
        require('@/assets/avatar/man_old_avatar_person.svg'),
        require('@/assets/avatar/office_man_person.svg'),
        require('@/assets/avatar/person_female_child.svg'),
      ],
      menu: false,
      saveImage: '',
      showImg: true,
    }),

    computed: {
      ...mapState(['barImage']),
    },

    watch: {
      color (val) {
        this.$vuetify.theme.themes[this.isDark ? 'dark' : 'light'].primary = val
      },
      showImg (val) {
        if (!val) {
          this.saveImage = this.barImage
          this.setBarImage('')
        } else if (this.saveImage) {
          this.setBarImage(this.saveImage)
          this.saveImage = ''
        } else {
          this.setBarImage(val)
        }
      },
      image (val) {
        this.setBarImage(val)
      },
      avatar (val) {
        this.setAvatarImage(val)
      },
    },

    methods: {
      ...mapMutations({
        setBarImage: 'SET_BAR_IMAGE',
      }),
      ...mapMutations({
        setAvatarImage: 'SET_AVATAR_IMAGE',
      }),
    },
  }
</script>

<style lang="sass">
  .v-settings
    .v-item-group > *
      cursor: pointer

    &__item
      border-width: 3px
      border-style: solid
      border-color: transparent !important

      &--active
        border-color: #00cae3 !important
</style>
