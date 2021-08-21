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

<style scoped lang="scss">
.fieldset {
  position: relative;
  border: 1px solid #fcfeff;

  @media (min-width: 768px) {
    padding: 30px 0;
    flex-grow: 1;
  }
  > div {
    display: flex;
    flex-wrap: wrap;
    flex-flow: row wrap;
    font-size: 1.4rem;

    > div {
      flex-grow: 1;
      text-align: left;
      padding: 0 15px;
      margin-bottom: 15px;
      @media (min-width: 768px) {
        margin-bottom: 0;
      }
    }
  }

  h2 {
    background: #2f353e;
    @media (min-width: 768px) {
      position: absolute;
      padding: 1px 32px;
      left: 50%;
      top: -13px;
      margin: 0 0 0 -80px;
    }
  }

  .label {
    color: #90a4ae;
    border-bottom: 1px solid #49515d;
    padding-bottom: 5px;
    width: 100%;
    display: block;
    text-transform: uppercase;
    @media (min-width: 768px) {
    }
  }
  p {
    color: white;
    text-align: center;
    font-size: 2em;
  }
}
</style>
