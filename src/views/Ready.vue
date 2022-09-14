<template>
  <v-container
    id="ready"
    style="height:500px"
  >      
    <v-row 
      align="center"
      style="height:500px"
      no-gutters
    >
      <v-col>
        <div align="center">
          <v-icon
            x-large
            align="center"
            color="blue lighten-2"
          >
            mdi-timer-sand
          </v-icon>
        </div>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title align="center">서비스 준비중입니다.</v-list-item-title>
            <v-list-item-subtitle align="center">
              보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다.   
            </v-list-item-subtitle>
            <v-list-item-subtitle align="center">
              빠른 시일안에 준비하여 찾아뵙겠습니다.       
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>  
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Ready',    
    data () {
      return {
      }
    },
  }
</script>
