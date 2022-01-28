<template>
  <body class="main-bg">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card shadow">
            <div class="card-title text-center border-bottom">
              <h2 class="p-3">Create User</h2>
            </div>
            <div class="alert alert-warning" role="alert" v-if="message">
              {{ message }}
            </div>
            <form method="POST" @submit.prevent="signup">
              <div class="card-body">
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="username" class="form-label">Username</label>
                    <input
                      type="text"
                      v-model="user_data.username"
                      class="form-control"
                      id="username"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="email"
                      v-model="user_data.email"
                      class="form-control"
                      id="email"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="password" class="form-label">Password</label>
                    <input
                      type="password"
                      v-model="user_data.password"
                      class="form-control"
                      id="password"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="panNumber" class="form-label">Pan Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="panNumber"
                      v-model="user_data.pan_number"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="adhaarNumber" class="form-label"
                      >Adhaar Number</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="adhaarNumber"
                      v-model="user_data.aadhar_number"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="phoneNumber" class="form-label"
                      >Phone Number</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="phoneNumber"
                      v-model="user_data.phone_number"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="dob" class="form-label">Date of Birth</label>
                    <input
                      type="date"
                      class="form-control"
                      id="dob"
                      v-model="user_data.date_of_birth"
                      required
                    />
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="mb-4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <label for="userType" class="form-label">User Type</label>
                    <select
                      class="form-control"
                      id="userType"
                      v-model="user_data.user_type"
                      required
                    >
                      <option value="owner">Owner</option>
                      <option value="cashier">Cashier</option>
                      <option value="labour">Labour</option>
                    </select>
                    <span class="required_field_false">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="d-grid">
                  <button class="btn text-dark main-bg">SUBMIT</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      user_data: {
        password: "",
        username: "",
        email: "",
        phone_number: null,
        aadhar_number: null,
        pan_number: "",
        date_of_birth: "",
        user_type: "",
      },
      message: "",
    };
  },
  methods: {
    signup: function () {
      this.$http
        .post(this.$store.getters.url + "/user-create", this.user_data)
        .then((data) => {
          console.log(data.body);
          this.message = "User Created Successfully";
        })
        .catch((e) => {
          this.message = e.body;
        });
    },
  },
};
</script>

<style scoped>
.main-bg {
  background-color: #dadada;
  margin: 2% 0% 0% 0%;
}

input:focus,
button:focus {
  border: 1px solid #dadada;
  box-shadow: none;
}

.form-check-input:checked {
  background-color: #dadada;
  border-color: #dadada;
}

.card,
.btn,
input {
  border-radius: 0 !important;
}
.required_field_false {
  color: red;
}
</style>
