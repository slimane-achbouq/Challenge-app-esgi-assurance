<template>
    <main class="bg-white">
  
      <div class="relative flex">
  
        <!-- Content -->
        <div class="w-full md:w-1/2">
          <div class="min-h-screen h-full flex flex-col after:flex-1">
  
            <div class="flex-1">
              <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <!-- Logo -->
                <router-link class="block" to="/">
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <defs>
                      <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                        <stop stop-color="#A5B4FC" stop-opacity="0" offset="0%" />
                        <stop stop-color="#A5B4FC" offset="100%" />
                      </linearGradient>
                      <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                        <stop stop-color="#38BDF8" stop-opacity="0" offset="0%" />
                        <stop stop-color="#38BDF8" offset="100%" />
                      </linearGradient>
                    </defs>
                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                    <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                  </svg>
                </router-link>
              </div>
            </div>
  
            <div class="max-w-sm mx-auto px-4 py-8">
              <h1 class="text-3xl text-slate-800 font-bold mb-6">Sing In ✨</h1>
              <Banner type="error" :open="!!error">
                {{ error }}
              </Banner>
              <!-- Form -->
              <form @submit.prevent="submitForm">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="text">Name: <span class="text-rose-500">*</span></label>
                    <input id="firstname" class="form-input w-full" type="text" required v-model.trim="firstname" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="text">Family Name: <span class="text-rose-500">*</span></label>
                    <input id="lastname" class="form-input w-full" type="lastname" required v-model.trim="lastname" />
                  </div>
                    <!-- Street Address -->
                <div>
                  <label class="block text-sm font-medium mb-1" for="street"
                    >Street Address: <span class="text-rose-500">*</span></label
                  >
                  <input
                    autoComplete='none'
                    id="street"
                    class="form-input w-full"
                    type="text"
                    v-model.trim="street"
                    @input="searchStreet($event)"
                  />
                  <div class="" v-if="isAddressLoading">
                      <svg class="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                          <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                      </svg>
                  </div>
                  <div v-else-if="searchedAddresses" v-for="searchedAddress in searchedAddresses" :key="searchedAddress.properties.id">
                    <div class="text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <button @click="setAddress(searchedAddress)" type="button" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                          {{ searchedAddress.properties.label }}
                      </button>
                    </div>
                  </div>

                  <!-- <div v-if="errors.street" class="text-xs mt-1 text-rose-500">
                    {{ errors.street }}
                  </div> -->
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="text">Phone Number: <span class="text-rose-500">*</span></label>
                  <input id="phonenumber" class="form-input w-full" type="phonenumber" required v-model.trim="phonenumber" />
                </div>


                <div>
                  <label class="block text-sm font-medium mb-1" for="text">Age: <span class="text-rose-500">*</span></label>
                    <input id="age" class="form-input w-full" type="age" required v-model.trim="age" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1" for="email">Email Address <span class="text-rose-500">*</span></label>
                  <input id="email" class="form-input w-full" type="email" required v-model.trim="email" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="password">Password <span class="text-rose-500">*</span></label>
                  <input id="password" class="form-input w-full" type="password" autoComplete="on" required v-model.trim="password" />
                </div>
                <div>
                </div>
                  
                </div>
                <div class="flex items-center justify-between mt-6">
                  <div class="mr-1">
                  </div>
                  <button v-if="isLoading" class="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-none" disabled>
                    <svg class="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                      <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                    </svg>
                    <span class="ml-2">Loading</span>
                  </button>
                  <button v-else class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" type="submit" >Register</button>
  
                </div>
              </form>
              <!-- Footer -->
              <div class="pt-5 mt-6 border-t border-slate-200">
                <div class="text-sm">
                  You already have an account? <router-link class="font-medium text-indigo-500 hover:text-indigo-600" to="/login">Sign In</router-link>
                </div>
              </div>
            </div>
  
          </div>
        </div>
  
        <!-- Image -->
        <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img class="absolute top-1/4 -translate-x-1/4 ml-8 hidden lg:block" src="../images/register-logo.jpg" alt="Authentication" />
          <!-- <img class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src="../images/auth-decoration.png" width="218" height="224" alt="Authentication decoration" /> -->
        </div>
  
      </div>
  
    </main>
  </template>
  
  <script>
  import {
  phoneValidation,
  passwordValidation,
  emailValidation,
} from "@/utils/utils-common-function";
  import Banner from '@/components/Banner.vue'
  export default {
      components: {
        Banner
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
              password: "",
              age: "",
            },
          }
      },
      methods: {
          setAddress(address) {
            this.city = address.properties.city;
            this.postalCode = address.properties.postcode;
            this.street = address.properties.name;
            this.searchedAddresses = [];
          },
          async searchStreet (event) {
            this.isAddressLoading = true;
            try {
              const street = event.target.value;
              if (street.length <= 3) {
                return;
              }
              const response = await fetch(`https://api.zaidalaahazim.fr/address/` + new URLSearchParams(street));

              if (response.ok) {
                  const data = await response.json();
                  const parsedData = await JSON.parse(data);
                  this.searchedAddresses = parsedData.features;
              }
            } catch (error) {
              this.error = error.message || 'Failed to search for the given street';
            }
            this.isAddressLoading = false;
          },
          async submitForm() {
              this.formIsValid = true;
              this.error = null;
              this.isLoading = true;
              const actionPayload = {
                firstname: this.firstname,
                lastname: this.lastname,
                street: this.street,
                city: this.city,
                postalCode: this.postalCode,
                phoneNumber: this.phoneNumber,
                age: this.age,
                email: this.email,
                password: this.password,
              };
              try {
                  await this.$store.dispatch('auth/signUp', actionPayload);
                  const redirectUrl = '/' + (this.$route.query.redirect || 'login');
                  this.$router.replace(redirectUrl);
              } catch (error) {
                if(error.message == 'Error: Invalid credentials.') {
                  this.error = 'Your password or email is incorrect';
                } else {
                  this.error = error.message || 'Failed to authenticated, try later.';
                }
              }
              this.isLoading = false;
          }
      }
  }
  </script>