<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-body">
        <p>Hello User, You can <b>Add</b> Stock below.</p>
      </div>
    </div>
    <div class="alert alert-warning" role="alert" v-if="message">
      {{ message }}
    </div>

    <div class="row mt-3">
      <div class="col">
        <form method="post" @submit.prevent="create_stock">
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="text-center mb-3">Add Stock</h5>
                <div class="input">
                  <input
                    type="text"
                    class="form-control mb-3"
                    v-model="add_stock.productName"
                    placeholder="Product Name"
                    :class="{ required_field_false: error.productName }"
                    required
                  />

                  <input
                    type="text"
                    class="form-control mb-3"
                    v-model="add_stock.product_grade"
                    placeholder="Product Grade"
                    :class="{ required_field_false: error.product_grade }"
                    required
                  />

                  <input
                    type="text"
                    class="form-control mb-3"
                    v-model="add_stock.note"
                    placeholder="Product Note"
                    :class="{ required_field_false: error.note }"
                    required
                  />
                  <div class="input-group-postpend">
                    <button type="submit" class="btn btn-success w-100">
                      Add Stock
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
      add_stock: {
        productName: "",
        product_grade: "",
        note: "",
        quantitiesLeft: 0,
        productInstock: false,
      },
      error: {
        productName: false,
        product_grade: false,
        note: false,
      },
      message: "",
    };
  },
  methods: {
    create_stock() {
      this.$http
        .post(this.$store.getters.url + "/stock-create", this.add_stock)
        .then((data) => {
          console.log(data);
          this.message = "Stock Added Successfully";
        });
    },
  },
};
</script>

<style>
.required_field_false {
  border-color: rgb(245, 61, 61);
}
</style>
