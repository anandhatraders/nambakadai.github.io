<template>
  <div>
    <div class="container mt-3">
      <div class="row d-flex justify-content-center">
        <div class="col-md-7">
          <div class="card p-3 py-4 profile-body">
            <div class="alert alert-warning" role="alert" v-if="message">
              {{ message.password }}
            </div>
            <div class="text-center">
              <img
                src="https://i.imgur.com/bDLhJiP.jpg"
                width="100"
                class="rounded-circle"
              />
            </div>
            <div class="text-center mt-3">
              <!-- <span class="bg-secondary p-1 px-4 rounded text-white"
                >Namba Kadai</span
              > -->
              <h5 class="mt-3 mb-0">Your Profile</h5>
              <form method="post" @submit.prevent="updateProfile">
                <div class="update">
                  <small>Each updation needs password for verification</small>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="row mt-2">
                      <div class="col">
                        <label for="username">Username</label>
                      </div>
                      <div class="col">
                        <input
                          class="form-control px-4"
                          type="text"
                          v-model="user_data.username"
                          id="username"
                          required
                        />
                        <span class="required_field_false">{{
                          errors[0]
                        }}</span>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="row">
                      <div class="col"><label for="email">Email</label></div>
                      <div class="col">
                        <input
                          class="form-control px-4"
                          type="text"
                          v-model="user_data.email"
                          id="email"
                          required
                        />
                        <span class="required_field_false">{{
                          errors[0]
                        }}</span>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="row">
                      <div class="col">Pan Number</div>
                      <div class="col">
                        <input
                          class="form-control px-4"
                          type="text"
                          v-model="user_data.pan_number"
                          required
                        />
                        <span class="required_field_false">{{
                          errors[0]
                        }}</span>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="row">
                      <div class="col">Aadhar Number</div>
                      <div class="col">
                        <input
                          class="form-control px-4"
                          type="text"
                          v-model="user_data.aadhar_number"
                          required
                        />
                        <span class="required_field_false">{{
                          errors[0]
                        }}</span>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="row">
                      <div class="col">Phone Number</div>
                      <div class="col">
                        <input
                          class="form-control px-4"
                          type="text"
                          v-model="user_data.phone_number"
                          required
                        />
                        <span class="required_field_false">{{
                          errors[0]
                        }}</span>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="row">
                      <div class="col">Date of Birth</div>
                      <div class="col">
                        <input
                          class="form-control px-4"
                          type="date"
                          v-model="user_data.date_of_birth"
                          required
                        />
                        <span class="required_field_false">{{
                          errors[0]
                        }}</span>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="row">
                      <div class="col">First Name</div>
                      <div class="col">
                        <input
                          class="form-control px-4"
                          type="text"
                          v-model="user_data.first_name"
                          required
                        />
                        <span class="required_field_false">{{
                          errors[0]
                        }}</span>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="row">
                      <div class="col">Last Name</div>
                      <div class="col">
                        <input
                          class="form-control px-4"
                          type="text"
                          v-model="user_data.last_name"
                          required
                        />
                        <span class="required_field_false">{{
                          errors[0]
                        }}</span>
                      </div>
                    </div>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors }">
                    <div class="row">
                      <div class="col">*Password</div>
                      <div class="col">
                        <input
                          class="form-control px-4"
                          type="password"
                          v-model="user_data.password"
                          required
                        />
                        <span class="required_field_false">{{
                          errors[0]
                        }}</span>
                      </div>
                    </div>
                  </validation-provider>
                  <button
                    class="btn btn-primary px-4 ms-3 mt-2"
                    @click.prevent="updateProfile"
                  >
                    Update Profile Details
                  </button>
                  <button
                    class="btn btn-primary px-4 ms-3 mt-2"
                    @click.prevent="changePassword"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_data: {
        public_id: "",
        password: "",
        username: "admin",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: null,
        aadhar_number: null,
        pan_number: "",
        date_of_birth: null,
        user_type: "",
      },
      message: "",
    };
  },
  created() {
    this.$http
      .get(this.$store.getters.url + "/user-profile")
      .then(function (data) {
        this.user_data = data.body;
      });
  },
  methods: {
    updateProfile() {
      this.$http
        .post(
          this.$store.getters.url + "/user-update/" + this.user_data.public_id,
          this.user_data
        )
        .then((data) => {
          this.$router.go();
        })
        .catch((e) => {
          this.message = e.data;
        });
    },
    changePassword() {
      this.$router.push(
        "/change-password?public_id=" + this.user_data.public_id
      );
    },
  },
};
</script>

<style scoped>
.profile-body {
  background-color: rgb(255, 238, 217);
}

.card {
  border: none;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.card:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #e1bee7;
  transform: scaleY(1);
  transition: all 0.5s;
  transform-origin: bottom;
}

.card:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #8e24aa;
  transform: scaleY(0);
  transition: all 0.5s;
  transform-origin: bottom;
}

.card:hover::after {
  transform: scaleY(1);
}

.fonts {
  font-size: 15px;
}

.update button {
  border: 1px solid #8e24aa !important;
  background-color: #8e24aa;
  color: #fff;
  height: 40px;
}
</style>