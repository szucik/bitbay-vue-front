<template>
  <div class="fieldset">
    <h2>{{ label }}</h2>
    <div v-if="data.length">
      <div>
        <span class="label">{{ label }}</span>
        <ul>
          <li v-for="(item, index) in data" :key="index">
            {{ item.ra }}
          </li>
        </ul>
      </div>
      <div>
        <span class="label">AMOUNT {{ currency }}</span>
        <ul>
          <li v-for="(item, index) in data" :key="index">
            {{ item.ca }}
          </li>
        </ul>
      </div>
      <div>
        <span class="label">PRICE {{ currency }}</span>
        <ul>
          <li v-for="(item, index) in data" :key="index">
            {{ item.ra * item.ca }} {{ currency }}
          </li>
        </ul>
      </div>
    </div>
    <p v-else>No orders.</p>
  </div>
</template>

<script lang="ts">
import { Orderbook } from '@/model/orderbook'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop() private data!: Orderbook
  @Prop() private label!: string
  @Prop() private currency!: string
}
</script>

<style scoped lang="scss"></style>
