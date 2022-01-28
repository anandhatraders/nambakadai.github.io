<template>
  <div class="container mt-5 pt-3">
    <div class="card mb-2 p-2">
      <h3 class="text-center">Billing Page</h3>
    </div>
    <div class="alert alert-dark" role="alert">
      <span v-for="stock in stocks" :key="stock.public_id"
        ><b>{{ stock.productName }}</b> - Quantities Left
        {{ stock.quantitiesLeft }} KG <br
      /></span>
    </div>
    <div class="alert alert-success" role="alert" v-if="message">
      {{ message }}
    </div>
    <div class="alert alert-warning" role="alert" v-if="error_message">
      {{ error_message }}
    </div>
    <form method="post" @submit.prevent="placeOrder">
      <div class="card mb-3">
        <div class="card-body">
          <div class="input">
            <label>Customer Name</label>
            <select
              v-model="static_data.customers"
              class="form-control mb-3"
              required
            >
              <option
                :value="customer.public_id"
                v-for="customer in customers"
                :key="customer.public_id"
              >
                {{ customer.customerName }}
              </option>
            </select>
            <label>Customer Phone Number</label>
            <select
              v-model="static_data.customers"
              class="form-control mb-3"
              required
            >
              <option
                :value="customer.public_id"
                v-for="customer in customers"
                :key="customer.public_id"
              >
                {{ customer.phoneNumber }}
              </option>
            </select>
            <label>Purchase Type</label>
            <select
              v-model="static_data.purchaseType"
              class="form-control mb-3"
              required
            >
              <option value="sell">Sell</option>
              <option value="buy">Buy</option>
              <option value="waste">Wasted</option>
            </select>
            <label>Payment Type</label>
            <select
              v-model="static_data.payment_type"
              class="form-control mb-3"
              required
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
            </select>
            <label>Payment Reference (UPI ID or Number)</label>
            <input
              v-model="static_data.payment_reference_id"
              class="form-control mb-3"
              required
            />

            <label>Billed By</label>
            <select
              v-model="static_data.placedBy"
              class="form-control mb-3"
              required
            >
              <option
                v-for="biller in placedBy"
                :key="biller.public_id"
                :value="biller.public_id"
              >
                {{ biller.username }}
              </option>
            </select>
            <label>Labour</label>
            <select
              v-model="static_data.labour"
              class="form-control mb-3"
              required
            >
              <option
                :value="labour.public_id"
                v-for="labour in labours"
                :key="labour.public_id"
              >
                {{ labour.username }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h5>Item Details</h5>
          <button @click="add_number" class="btn btn-secondary w-100">
            Add Stock
          </button>
          <div v-for="item_no in total_item" :key="item_no.id">
            <invoiceItemVue
              @invoice_item="set_value"
              :stocks="stocks"
              :item_number="item_no"
            ></invoiceItemVue>
          </div>
        </div>
      </div>
      <div class="alert alert-info" role="alert" v-if="total_amount_to_paid">
        Please Collect Rs{{ total_amount_to_paid }}
      </div>
      <div>
        <button class="btn btn-primary w-100">Place Order</button>
      </div>
    </form>
  </div>
</template>

<script>
import invoiceItemVue from "./invoiceItem.vue";

export default {
  data() {
    return {
      invoice_id: "",
      customers: [],
      labours: [],
      placedBy: [],
      stocks: [],
      data_entry: [],
      order_data: {},
      static_data: {
        customers: "",
        purchaseType: "",
        placedBy: "",
        labour: "",
        invoice: "",
        payment_reference_id: "",
        payment_type: "",
      },
      item: [],
      message: "",
      error_message: "",
      total_item: 0,
      total_amount_to_paid: 0,
    };
  },
  methods: {
    add_number() {
      ++this.total_item;
    },
    set_value(value) {
      this.item[value.item_number] = value;
    },
    placeOrder() {
      this.static_data.invoice = this.invoice_id;
      for (let i in this.item) {
        this.data_entry.push({ ...this.static_data, ...this.item[i] });
        this.total_amount_to_paid += parseInt(this.item[i].payable);
      }
      this.order_data["invoice_id"] = this.invoice_id;
      this.order_data["data_entry"] = this.data_entry;
      this.order_data["totalCost"] = this.total_amount_to_paid;
      this.post_order_data(this.order_data);
    },
    post_order_data(data) {
      console.log(data);
      this.$http
        .post(this.$store.getters.url + "/order-create", data)
        .then((data) => {
          this.message =
            "Order Placed Successfully for Amount of Rs." +
            this.total_amount_to_paid;
          setTimeout(this.redirect_to_invoice_page, 2000);
        })
        .catch((e) => {
          this.error_message =
            "Error, Please Try Again will all data Added if the error occurs it might be that you dont have enough stock";
        });
    },
    redirect_to_invoice_page() {
      this.$router.push("/invoice/item?public_id=" + this.invoice_id);
    },
  },
  beforeMount() {
    this.$http
      .get(this.$store.getters.url + "/order-create", this.add_order_data)
      .then((data) => {
        this.invoice_id = data.body.invoice_id;
        this.customers = data.body.customers;
        this.labours = data.body.labours;
        this.placedBy = data.body.placedBy;
        this.stocks = data.body.stocks;
      });
  },
  components: {
    invoiceItemVue,
  },
};
</script>

<style>
.required_field_false {
  border-color: rgb(245, 61, 61);
  color: rgb(245, 61, 61);
}
</style>

