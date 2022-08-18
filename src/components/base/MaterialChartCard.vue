<template>
  <base-material-card
    :class="'v-card--material-chart-'+ colorType"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:heading>
      <chartist
        :data="data"
        :event-handlers="eventHandlers"
        :options="options"
        :ratio="ratio"
        :responsive-options="responsiveOptions"
        :type="type"
        style="max-height: 150px;"
      />
    </template>

    <slot
      slot="reveal-actions"
      name="reveal-actions"
    />

    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </base-material-card>
</template>

<script>
  export default {
    name: 'MaterialChartCard',

    inheritAttrs: false,

    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
      eventHandlers: {
        type: Array,
        default: () => ([]),
      },
      options: {
        type: Object,
        default: () => ({}),
      },
      ratio: {
        type: String,
        default: undefined,
      },
      responsiveOptions: {
        type: Array,
        default: () => ([]),
      },
      type: {
        type: String,
        required: true,
        validator: v => ['Bar', 'Line', 'Pie'].includes(v),
      },
      colorType: {
        type: String,
        default: 'white',
      },
    },
  }
</script>

<style lang="sass">
  @mixin mx-chart-series($sn, $r, $g, $b)
    .ct-series-#{$sn} .ct-point,
    .ct-series-#{$sn} .ct-line,
    .ct-series-#{$sn} .ct-bar,
    .ct-series-#{$sn} .ct-slice-donut
        stroke: rgba($r, $g, $b,1)

    .ct-series-#{$sn} .ct-slice-pie,
    .ct-series-#{$sn} .ct-area
        fill: rgba($r, $g, $b,.4)

  @mixin mx-chart-legend($si, $r, $g, $b)
      .ct-series-#{$si}:before
          background-color: rgba($r, $g, $b,1)

  @mixin material-chart($color)
    p
      color: #999

    .v-card--material__heading
      max-height: 185px

      .ct-label
        color: inherit
        opacity: .9
        font-size: 0.975rem
        font-weight: 100

      .ct-grid
        stroke: rgba(255,255,255,0.5)

      @include mx-chart-series(a, 255, 255, 255)
      @if($color == red)
        @include mx-chart-series(b, 162, 221, 204)
        @include mx-chart-series(c, 162, 162, 221)
        @include mx-chart-series(d, 221, 221, 162)
      @else if($color == green)
        @include mx-chart-series(b, 162, 221, 204)
        @include mx-chart-series(c, 162, 162, 221)
        @include mx-chart-series(d, 221, 221, 162)
      @else if($color == blue)
        @include mx-chart-series(b, 162, 221, 204)
        @include mx-chart-series(c, 162, 162, 221)
        @include mx-chart-series(d, 221, 221, 162)

    .ct-legend
      position: relative
      z-index: 10
      top: -18px
      text-align: center
      li
        position: relative
        padding-left: 15px
        padding-right: 10px
        margin-bottom: 3px
        display: inline-block
      li:before
        width: 12px
        height: 12px
        position: absolute
        left: 0
        top: 3px
        content: ''
        border: 3px solid transparent
        border-radius: 2px
      li.inactive:before
        background: transparent
      &.ct-legend-inside
        position: absolute
        top: 0
        right: 0
      .ct-series-0:before
          background-color: rgba(255,255,255,01)
      @if($color == red)
        @include mx-chart-legend(1, 162, 221, 204)
        @include mx-chart-legend(2, 162, 162, 221)
        @include mx-chart-legend(3, 221, 221, 162)
      @else if($color == green)
        @include mx-chart-legend(1, 162, 221, 204)
        @include mx-chart-legend(2, 162, 162, 221)
        @include mx-chart-legend(3, 221, 221, 162)
      @else if($color == blue)
        @include mx-chart-legend(1, 162, 221, 204)
        @include mx-chart-legend(2, 162, 162, 221)
        @include mx-chart-legend(3, 221, 221, 162)

  .v-card--material-chart
    &-red
      @include material-chart(red)
    &-green
      @include material-chart(green)
    &-blue
      @include material-chart(blue)

</style>
