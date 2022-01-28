<template>
  <div class="container mt-5">
    <div class="row mt-3 pt-3">
      <div class="alert alert-success" role="alert">
        Invoice_ID:
        {{ invoice }} <br />
        <hr />

        Total Amount Billed: RS&nbsp;{{ totalAmount }} <br />
        <hr />
        <button class="btn btn-info w-100 mt-3" @click="printWindow">
          Print Bill
        </button>
      </div>
      <div class="col">
        <table
          v-for="(data, index) in order_data"
          :key="data.public_id"
          class="table table-light table-striped"
        >
          <thead>
            <tr>
              <th>Item {{ index + 1 }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="col">Stock Name</td>
              <td class="col">
                {{ data.stocks.substring(10).split(",")[0] }}
              </td>
            </tr>
            <tr>
              <td scope="col">Customer Name</td>
              <td class="col">{{ data.customers }}</td>
            </tr>
            <tr>
              <td scope="col">Purchase Type</td>
              <td class="col">{{ data.purchaseType }}</td>
            </tr>
            <tr>
              <td scope="col">Purchase Date</td>
              <td class="col">{{ data.purchaseDate }}</td>
            </tr>
            <tr>
              <td scope="col">Price</td>
              <td class="col">{{ data.price }}</td>
            </tr>
            <tr>
              <td scope="col">Quantiy</td>
              <td class="col">{{ data.quantity }}</td>
            </tr>
            <tr>
              <td scope="col">Labour</td>
              <td class="col">{{ data.labour }}</td>
            </tr>
            <tr>
              <td scope="col">Billed By</td>
              <td class="col">{{ data.placedBy }}</td>
            </tr>
            <tr>
              <td scope="col">Item {{ index + 1 }} cost</td>
              <td class="col">Rs&nbsp;{{ data.payable }}</td>
            </tr>
          </tbody>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order_data: [],
      totalAmount: 0,
      invoice: "",
    };
  },
  methods: {
    mount_order_data(data) {
      this.order_data = data;
      for (let d in this.order_data) {
        this.totalAmount += this.order_data[d]["payable"];
        this.invoice = this.order_data[d]["invoice"];
      }
    },
    printWindow() {
      window.print();
    },
  },
  beforeMount() {
    this.$http
      .get(
        this.$store.getters.url + "/invoice-item/" + this.$route.query.public_id
      )
      .then((data) => {
        this.mount_order_data(data.body);
      });
  },
};
</script>
