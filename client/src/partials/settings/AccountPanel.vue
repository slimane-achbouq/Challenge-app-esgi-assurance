<template>
  <Banner type="warning" :open="true">
    To edit the information of the contract you must create a demand
    <a class="cursor-pointer text-blue-900/100"> here.</a>
  </Banner>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <!-- Picture -->
      <section>
        <div class="flex items-center">
          <div class="mr-4">
            <img
              class="w-20 h-20 rounded-full"
              src="@/images/useravatar.png"
              width="80"
              height="80"
              alt="User upload"
            />
          </div>

          <div class="mr-4">
            <p class="">Name :</p>
            <span class="">Email :</span>
          </div>
        </div>
      </section>

      <form>
        <div class="space-y-2">
          <!-- 1st row -->
          <div class="md:flex space-y-1 md:space-y-0 md:space-x-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1" for="firstname"
                >First Name</label
              >
              <input id="firstname" class="form-input w-full" type="text" />
              <div class="text-xs mt-1 text-rose-500"></div>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1" for="lastname"
                >Last Name</label
              >
              <input id="lastname" class="form-input w-full" type="text" />

              <div v-if="true" class="text-xs mt-1 text-rose-500">zefzefe</div>
            </div>

            <div class="flex-1">
              <label class="block text-sm font-medium mb-1" for="address"
                >E-mail:</label
              >
              <input id="address" class="form-input w-full" type="text" />
              <div class="text-xs mt-1 text-rose-500">zaazdaz</div>
            </div>
          </div>
          <!-- 2nd row -->
          <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1" for="card-city"
                >Phone Number</label
              >
              <input id="card-city" class="form-input w-full" type="text" />
              <div v-if="true" class="text-xs mt-1 text-rose-500">er</div>
            </div>
          </div>
          <!-- 3rd row -->

          <!-- Divider -->
          <hr class="my-2 border-t border-slate-200" />

          <!-- Street Address -->
          <div>
            <label class="block text-sm font-medium mb-1" for="street"
              >Edit Address: <span class="text-rose-500">*</span></label
            >
            <input
              autoComplete="none"
              id="street"
              class="form-input w-full"
              type="text"
            />

            <div class="">
              <svg
                class="animate-spin w-4 h-4 fill-current shrink-0"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
                />
              </svg>
            </div>

            <div>
              <div
                class="text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <button
                  type="button"
                  class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                ></button>
              </div>
            </div>
          </div>
          <!-- 4th row -->
          <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1" for="card-vat"
                >Street Address:</label
              >
              <input
                id="card-vat"
                class="form-input w-full cursor-not-allowed"
                type="text"
                disabled
              />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1" for="card-vat"
                >City</label
              >
              <input
                id="card-vat"
                class="form-input w-full cursor-not-allowed"
                type="text"
                disabled
              />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1" for="card-postcode"
                >Postcode</label
              >

              <input
                id="card-postcode"
                class="form-input w-full cursor-not-allowed"
                type="text"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col px-6 py-5 border-t border-slate-200">
          <div class="flex self-end">
            <button
              class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Banner from "@/components/Banner.vue";

export default {
  name: "AccountPanel",
  components: {
    Banner,
  },
  setup() {
    const sync = ref("Off");

    return {
      sync,
    };
  },
};
</script>
