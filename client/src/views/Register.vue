<template>
  <main class="bg-white">
    <div class="relative flex">
      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-screen h-full flex flex-col after:flex-1">
          <div class="flex-1">
            <div
              class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
            >
              <!-- Logo -->
              <router-link class="block" to="/">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient
                      id="logo-a"
                      x1="28.538%"
                      y1="20.229%"
                      x2="100%"
                      y2="108.156%"
                    >
                      <stop stop-color="#A5B4FC" stop-opacity="0" offset="0%" />
                      <stop stop-color="#A5B4FC" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      id="logo-b"
                      x1="88.638%"
                      y1="29.267%"
                      x2="22.42%"
                      y2="100%"
                    >
                      <stop stop-color="#38BDF8" stop-opacity="0" offset="0%" />
                      <stop stop-color="#38BDF8" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#6366F1" width="32" height="32" rx="16" />
                  <path
                    d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                    fill="url(#logo-a)"
                  />
                  <path
                    d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                    fill="url(#logo-b)"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <div v-if="state.isSignIn" class="max-w-sm mx-auto px-4 py-8">
            <h1 class="text-3xl text-slate-800 font-bold mb-6">Sign Up</h1>
            <Banner type="error" :open="!!error">
              {{ error }}
            </Banner>
            <!-- Form -->
            <form @submit.prevent="submitForm">
              <!-- First&lastname -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="text"
                    >Name <span class="text-rose-500">*</span></label
                  >
                  <input
                    id="firstname"
                    v-model.trim="firstname"
                    class="form-input w-full"
                    type="text"
                    required
                  />
                  <div
                    v-if="errors.firstname"
                    class="text-xs mt-1 text-rose-500"
                  >
                    {{ errors.firstname }}
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="text"
                    >Family Name <span class="text-rose-500">*</span></label
                  >
                  <input
                    id="lastname"
                    v-model.trim="lastname"
                    class="form-input w-full"
                    type="lastname"
                    required
                  />
                  <div
                    v-if="errors.lastname"
                    class="text-xs mt-1 text-rose-500"
                  >
                    {{ errors.lastname }}
                  </div>
                </div>
                <!-- Street Address -->
                <div>
                  <label class="block text-sm font-medium mb-1" for="street"
                    >Street Address <span class="text-rose-500">*</span></label
                  >
                  <input
                    id="street"
                    v-model.trim="street"
                    autoComplete="none"
                    class="form-input w-full"
                    type="text"
                    @input="searchStreet($event)"
                  />
                  <div v-if="isAddressLoading" class="">
                    <svg
                      class="animate-spin w-4 h-4 fill-current shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                      />
                    </svg>
                  </div>
                  <div
                    v-for="searchedAddress in searchedAddresses"
                    v-else-if="searchedAddresses"
                    :key="searchedAddress.properties.id"
                  >
                    <div
                      class="text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <button
                        type="button"
                        class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                        @click="setAddress(searchedAddress)"
                      >
                        {{
                          searchedAddress.properties.label.substring(0, 30) +
                          "..."
                        }}
                      </button>
                    </div>
                  </div>
                  <div v-if="errors.street" class="text-xs mt-1 text-rose-500">
                    {{ errors.street }}
                  </div>
                </div>

                <!-- phone number -->
                <div>
                  <label
                    class="block text-sm font-medium mb-1"
                    for="phonenumber"
                    >Phone Number <span class="text-rose-500">*</span></label
                  >
                  <vue-tel-input
                    v-model="phoneNumber"
                    class="form-input"
                    default-country="FR"
                  ></vue-tel-input>
                  <div
                    v-if="errors.phoneNumber"
                    class="text-xs mt-1 text-rose-500"
                  >
                    {{ errors.phoneNumber }}
                  </div>
                </div>
                <!-- Age -->
                <div>
                  <label class="block text-sm font-medium mb-1" for="text"
                    >Date of birth <span class="text-rose-500">*</span></label
                  >
                  <input
                    id="age"
                    v-model.trim="age"
                    class="form-input w-full"
                    type="date"
                    required
                  />
                  <div v-if="errors.age" class="text-xs mt-1 text-rose-500">
                    {{ errors.age }}
                  </div>
                </div>

                <!-- Email adresse -->
                <div>
                  <label class="block text-sm font-medium mb-1" for="email"
                    >Email Address <span class="text-rose-500">*</span></label
                  >
                  <input
                    id="email"
                    v-model.trim="email"
                    class="form-input w-full"
                    type="email"
                    required
                  />
                  <div v-if="errors.email" class="text-xs mt-1 text-rose-500">
                    {{ errors.email }}
                  </div>
                </div>

                <!-- Password -->
                <div>
                  <label class="block text-sm font-medium mb-1" for="password"
                    >Password <span class="text-rose-500">*</span></label
                  >
                  <input
                    id="password"
                    v-model.trim="password"
                    class="form-input w-full"
                    type="password"
                    autoComplete="on"
                    required
                    @input="passwordValidation($event)"
                  />
                  <div
                    v-if="errors.password"
                    class="text-xs mt-1 text-rose-500"
                  >
                    {{ errors.password }}
                  </div>
                  <div class="text-xs mt-1 text-rose-500">
                    <a v-if="passwordSatatus.lowerCase">
                      * {{ errors.passwords.lowerCase }}</a
                    ><br v-if="passwordSatatus.lowerCase" />
                    <a v-if="passwordSatatus.upperCase">
                      * {{ errors.passwords.upperCase }}</a
                    ><br v-if="passwordSatatus.upperCase" />
                    <a v-if="passwordSatatus.number">
                      * {{ errors.passwords.number }}</a
                    ><br v-if="passwordSatatus.number" />
                    <a v-if="passwordSatatus.specialChar">
                      * {{ errors.passwords.specialChar }}</a
                    ><br v-if="passwordSatatus.specialChar" />
                  </div>
                </div>
                <div></div>
              </div>
              <div class="flex items-center justify-between mt-6">
                <div class="mr-1"></div>
                <button
                  v-if="isLoading"
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none"
                  disabled
                >
                  <svg
                    class="animate-spin w-4 h-4 fill-current shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                    />
                  </svg>
                  <span class="ml-2">Loading</span>
                </button>
                <button
                  v-else
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
            <div></div>
            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-slate-200">
              <div class="text-sm">
                You already have an account?
                <router-link
                  class="font-medium text-indigo-500 hover:text-indigo-600"
                  to="/login"
                  >Sign In</router-link
                >
              </div>
            </div>
          </div>
          <div v-if="state.isSuccess">
            <SuccessMessage :message="successMessage"></SuccessMessage>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div
        class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
        aria-hidden="true"
      >
        <img
          class="absolute top-1/4 -translate-x-1/4 ml-8 hidden lg:block"
          src="../images/register-logo.png"
          alt="Authentication"
        />
      </div>
    </div>
  </main>
</template>

<script>
import {
  phoneValidation,
  passwordValidation,
  emailValidation,
  verifyIfHas18yo,
} from "../utils/utils-common-function";
import Banner from "@/components/Banner.vue";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import SuccessMessage from "./SuccessMessage.vue";
import Swal from "sweetalert2";

export default {
  components: {
    Banner,
    VueTelInput,
    SuccessMessage,
  },
  data() {
    return {
      isAddressLoading: false,
      searchedAddresses: [],
      firstname: "",
      lastname: "",
      street: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
      email: "",
      password: "",
      age: "",
      formValid: true,
      isLoading: false,
      error: null,
      errors: {
        firstname: "",
        lastname: "",
        street: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
        email: "",
        passwords: {
          upperCase: "",
          lowerCase: "",
          number: "",
          specialChar: "",
        },
        password: "",
        age: "",
      },
      state: {
        isSignIn: true,
        isSuccess: false,
      },
      successMessage: "",
      passwordSatatus: {
        generale: false,
        upperCase: false,
        lowerCase: false,
        number: false,
        specialChar: false,
      },
    };
  },
  methods: {
    setAddress(address) {
      this.city = address.properties.city;
      this.postalCode = Number(address.properties.postcode);
      this.street = address.properties.name;
      this.searchedAddresses = [];
    },
    passwordValidation(event) {
      const value = event.target.value;
      const containsUppercase = /[A-Z].{1,}/.test(value);
      const containsLowercase = /[a-z].{1,}/.test(value);
      const containsNumber = /[0-9].{3,}/.test(value);
      const containsSpecial = /[#?!@$%^&*-]/.test(value);

      if (!containsUppercase) {
        this.passwordSatatus.upperCase = true;
        this.errors.passwords.upperCase =
          "Your password must contain 2 capital letters";
      } else {
        this.passwordSatatus.upperCase = false;
      }

      if (!containsLowercase) {
        this.passwordSatatus.lowerCase = true;
        this.errors.passwords.lowerCase =
          "Your password must contain 2 lower letters";
      } else {
        this.passwordSatatus.lowerCase = false;
      }

      if (!containsNumber) {
        this.passwordSatatus.number = true;
        this.errors.passwords.number = "Your password must contain 4 numbers";
      } else {
        this.passwordSatatus.number = false;
      }

      if (!containsSpecial) {
        this.passwordSatatus.specialChar = true;
        this.errors.passwords.specialChar =
          "Your password must contain special chars";
      } else {
        this.passwordSatatus.specialChar = false;
      }
    },
    async searchStreet(event) {
      this.isAddressLoading = true;
      try {
        const street = event.target.value;
        if (street.length <= 3) {
          return;
        }
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=` +
            new URLSearchParams(street)
        );

        const data = await response.json();
        if (data.features.length) {
          this.searchedAddresses = data.features;
        }
        if (data.features.length == 0) {
          this.errors.address = "There is no adresse !";
          this.isAddressLoading = false;
          return;
        }
      } catch (error) {
        this.error = error.message || "Failed to search for the given street";
      }
      this.isAddressLoading = false;
    },
    async submitForm() {
      this.formIsValid = true;
      this.error = null;
      this.isLoading = true;
      Object.keys(this.errors).forEach((key) => (this.errors[key] = ""));
      Object.keys(this.errors.passwords).forEach((key) => {
        this.errors.passwords[key] = "";
      });

      if (this.firstname.length < 3) {
        this.formValid = false;
        this.isLoading = false;
        this.errors.firstname = "Please enter a valid firstname";
        return;
      }

      if (this.lastname.length < 3) {
        this.formValid = false;
        this.isLoading = false;
        this.errors.lastname = "Please enter a valid firstname";
        return;
      }

      if (!passwordValidation(this.password)) {
        this.formValid = false;
        this.isLoading = false;
        this.errors.password = "Please check the password if it is valid";
        return;
      }

      if (!emailValidation(this.email)) {
        this.formValid = false;
        this.isLoading = false;
        this.errors.email = "Please check your email if it is valid";
        return;
      }

      const phoneNumberOrigin = ("+33" + this.phoneNumber.slice(1)).replace(
        / /g,
        ""
      );

      if (!phoneValidation(phoneNumberOrigin)) {
        this.formValid = false;
        this.isLoading = false;
        this.errors.phoneNumber =
          "Please check your phone number if it is valid";
        return;
      }

      if (!verifyIfHas18yo(this.age)) {
        this.formValid = false;
        this.isLoading = false;
        this.errors.age = "You must be of legal age (18 years and over)";
        return;
      }

      if (!this.postalCode || !this.street || !this.city) {
        this.formValid = false;
        this.isLoading = false;
        this.errors.street = "Please enter a valide adresse!";
        return;
      }

      const actionPayload = {
        firstname: this.firstname,
        lastname: this.lastname,
        street: this.street,
        city: this.city,
        postalCode: this.postalCode,
        phoneNumber: phoneNumberOrigin,
        age: this.age,
        email: this.email,
        password: this.password,
      };

      try {
        const response = await this.$store.dispatch(
          "auth/signUp",
          actionPayload
        );

        const responseData = await response.json();

        if (responseData.message == "User already exist !") {
          Swal.fire({
            text: responseData.message,
            icon: "warning",
          }).then(() => {
            const redirectUrl = "/" + (this.$route.query.redirect || "login");
            this.$router.replace(redirectUrl);
          });
          return;
        }

        this.state.isSuccess = true;
      } catch (error) {
        console.log(error);
        if (error.message == "Error: Invalid credentials.") {
          this.error = "Your password or email is incorrect";
        } else {
          this.state.isSuccess = false;
          this.error =
            error.message ||
            "Failed to create your a compte, please try later.";
          Swal.fire({
            title: "Sorry!",
            text: error.message,
            icon: "error",
          }).then(() => {
            const redirectUrl = "/" + (this.$route.query.redirect || "login");
            this.$router.replace(redirectUrl);
          });
          return;
        }
      } finally {
        this.successMessage =
          "Your profile has been successfully created. please verfiy your adresse mail";
        this.state.isSignIn = false;
        this.isLoading = false;
      }
    },
  },
};
</script>
<style></style>
