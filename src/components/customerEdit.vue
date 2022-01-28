<template>
  <div class="container pt-4">
    <div class="card mt-5">
      <div class="card-body">
        <p>Hello User, You can <b>Edit</b> Customer details below.</p>
      </div>
    </div>
    <div class="alert alert-warning" role="alert" v-if="message">
      {{ message }}
    </div>

    <div class="row mt-3">
      <div class="col">
        <form method="post" @submit.prevent="update_customer">
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="text-center mb-3">Update Customer</h5>
                <div class="input">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    v-model="customer_data.customerName"
                    placeholder="Customer Name"
                    :class="{ required_field_false: error.customerName }"
                    required
                  />
                  <label>Phone Number</label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    v-model="customer_data.phoneNumber"
                    placeholder="Phone Number"
                    :class="{ required_field_false: error.phoneNumber }"
                    required
                  />
                  <label>Address</label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    v-model="customer_data.address"
                    placeholder="Address"
                    :class="{ required_field_false: error.address }"
                    required
                  />
                  <div class="input-group-postpend">
                    <button type="submit" class="btn btn-success w-100">
                      Update Customer
                    </button>
                  </div>
                </div>
                <span class="required_field_false">{{ errors[0] }}</span>
              </div>
            </div>
          </validation-provider>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer_data: {
        public_id: "",
        customerName: "",
        phoneNumber: null,
        address: "",
      },
      error: {
        customerName: false,
        phoneNumber: false,
        address: false,
      },
      message: "",
    };
  },
  methods: {
    update_customer() {
      this.$http
        .post(
          this.$store.getters.url +
            "/customer-update/" +
            this.$route.query.public_id,
          this.customer_data
        )
        .then((data) => {
          console.log(data);
          this.message = "Customer Details updated Successfully";
        });
    },
  },
  beforeMount() {
    this.$http
      .get(
        this.$store.getters.url +
          "/customer-update/" +
          this.$route.query.public_id
      )
      .then((data) => {
        this.customer_data = data.body;
      });
  },
};
</script>

<style>
.required_field_false {
  border-color: rgb(245, 61, 61);
}
</style>
