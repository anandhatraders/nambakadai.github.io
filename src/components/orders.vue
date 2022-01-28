<template>
  <div class="container mt-5">
    <div class="row mt-3 pt-3">
      <div class="col">
        <div class="btn-group">
          <button @click="orders_placed_today" class="btn btn-secondary">
            Today
          </button>
          <button @click="orders_placed_last_7_days" class="btn btn-secondary">
            last 7 days
          </button>
          <button @click="orders_placed_last_30_days" class="btn btn-secondary">
            last 30 days
          </button>
        </div>
        <form method="post" @submit.prevent="order_by">
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="card mb-3">
              <div class="card-body">
                <h5>FROM & TO DATE</h5>
                <div class="input-group">
                  <input
                    type="date"
                    class="form-control"
                    v-model="order_sort.from_date"
                    :class="{ required_field_false: error.from_date }"
                    required
                  />
                  <input
                    type="date"
                    class="form-control"
                    v-model="order_sort.to_date"
                    :class="{ required_field_false: error.to_date }"
                    required
                  />

                  <div class="input-group-postpend">
                    <button type="submit" class="btn btn-success w-100">
                      Show Invoice
                    </button>
                  </div>
                </div>
                <span class="required_field_false">{{ errors[0] }}</span>
              </div>
            </div>
          </validation-provider>
        </form>
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Purchase&nbsp;Date</th>
              <th scope="col">Customer</th>
              <th scope="col">Buy/Sell</th>
              <th scope="col">Billed&nbsp;For</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(invoiceItem_data, index) in invoice_data"
              :key="invoiceItem_data.public_id"
              @click="detailInvoice(invoiceItem_data[0].invoice)"
            >
              <td class="col">{{ invoiceItem_data[0].purchaseDate }}</td>
              <td class="col">{{ invoiceItem_data[0].customers }}</td>
              <td class="col">{{ invoiceItem_data[0].purchaseType }}</td>
              <td class="col">Rs&nbsp;{{ billed_for[index] }}</td>
            </tr>
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
      order_sort: {
        from_date: "",
        to_date: "",
        count: null,
      },
      error: {
        from_date: false,
        to_date: false,
      },
      invoice_totalCost: [],
      invoice_data: [],
      billed_for: [],
    };
  },
  methods: {
    mount_invoice(data) {
      this.invoice_data = data;
      for (let i = 0; i < data.length; i++) {
        this.invoice_totalCost.push([]);
        let cost = 0;
        for (let d in data[i]) {
          this.invoice_totalCost[i].push(data[i][d]["payable"]);
          cost += this.invoice_totalCost[i][d];
        }
        this.billed_for.push(cost);
      }
    },
    date_calculator(myCurrentDate, days_before) {
      var myCurrentDate = new Date(myCurrentDate);
      myCurrentDate = myCurrentDate.toISOString();
      var myPastDate = new Date();
      myPastDate.setDate(myPastDate.getDate() - days_before);
      myPastDate = myPastDate.toISOString();
      myCurrentDate = myCurrentDate.substring(0, myCurrentDate.indexOf("T"));
      myPastDate = myPastDate.substring(0, myPastDate.indexOf("T"));
      return { from_date: myPastDate, to_date: myCurrentDate };
    },
    no_of_days(from_date, to_date) {
      const date1 = new Date(from_date);
      const date2 = new Date(to_date);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    },
    orders_placed_today() {
      this.$http
        .get(this.$store.getters.url + "/invoice-items")
        .then((data) => {
          this.mount_invoice(data.body);
        });
    },
    orders_placed_last_7_days() {
      var date = this.date_calculator(new Date(), 7);
      this.$http
        .get(
          this.$store.getters.url +
            "/invoice-items?from_date=" +
            date.from_date +
            "&to_date=" +
            date.to_date
        )
        .then((data) => {
          this.mount_invoice(data.body);
        });
    },
    orders_placed_last_30_days() {
      var date = this.date_calculator(new Date(), 30);
      this.$http
        .get(
          this.$store.getters.url +
            "/invoice-items?from_date=" +
            date.from_date +
            "&to_date=" +
            date.to_date
        )
        .then((data) => {
          this.mount_invoice(data.body);
        });
    },
    order_by() {
      var days = this.no_of_days(
        this.order_sort.from_date,
        this.order_sort.to_date
      );
      var date = this.date_calculator(this.order_sort.to_date, days);
      this.$http
        .get(
          this.$store.getters.url +
            "/invoice-items?from_date=" +
            date.from_date +
            "&to_date=" +
            date.to_date
        )
        .then((data) => {
          this.mount_invoice(data.body);
        });
    },
    detailInvoice(data) {
      this.$router.push("/invoice/item?public_id=" + data);
    },
  },
  beforeMount() {
    this.$http.get(this.$store.getters.url + "/invoice-items").then((data) => {
      this.mount_invoice(data.body);
    });
  },
};
</script>
