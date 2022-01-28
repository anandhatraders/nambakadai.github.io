<template>
  <div id="order-item">
    <h4 class="text-center">Item {{ item_number }}</h4>
    <label>Item Name</label>
    <select v-model="items_data.stocks" class="form-control mb-3" required>
      <option
        :value="stock.public_id"
        v-for="stock in stocks"
        :key="stock.public_id"
        :disabled="!stock.productInstock"
      >
        {{ stock.productName }}
      </option>
    </select>
    <label>Price Per KG</label>
    <div class="input">
      <input
        type="number"
        class="form-control mb-3"
        v-model="items_data.price"
        required
      />
      <label>Quantity</label>
      <input
        type="number"
        class="form-control mb-3"
        v-model="items_data.quantity"
        required
      />
      <label>Payable Amount</label>
      <input
        type="number"
        class="form-control mb-3"
        v-model="items_data.payable"
        value=""
        required
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items_data: {
        stocks: "",
        price: "",
        quantity: "",
        payable: "",
      },
    };
  },
  props: ["stocks", "item_number"],
  methods: {},
  updated() {
    this.items_data.item_number = this.item_number;
    this.$emit("invoice_item", this.items_data);
  },
};
</script>
