<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />
      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
          <h2 class="text-2xl text-slate-800 font-bold mb-4">Plans</h2>
          <div class="text-sm">
            <p class="mb-2">
              Choose the plan that works best for you. Note that the payment
              becomes automatic monthly after first (and only) manual payment.
            </p>
          </div>
        </div>

        <!-- Pricing -->
        <div
          class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto"
          v-if="prices"
        >
          <!-- Pricing tabs -->
          <div class="grid grid-cols-12 gap-6">
            <!-- Tab 1 -->
            <div
              class="relative col-span-full xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200 mt-10"
            >
              <div
                class="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500"
                aria-hidden="true"
              ></div>
              <div class="px-5 pt-5 pb-6 border-b border-slate-200">
                <header class="flex items-center mb-2">
                  <div
                    class="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr from-emerald-500 to-emerald-300 mr-3"
                  >
                    <svg
                      class="w-6 h-6 fill-current text-white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-lg text-slate-800 font-semibold">Basic</h3>
                </header>
                <div class="text-sm mb-2">
                  The minimal option for tranquility.
                </div>
                <!-- Price -->
                <div class="text-slate-800 font-bold mb-4">
                  <span class="text-2xl">$</span
                  ><span class="text-3xl">{{ Math.round(prices[0]) }}</span
                  ><span class="text-slate-500 font-medium text-sm">/mo</span>
                </div>
                <!-- CTA -->
                <button
                  class="btn bg-emerald-500 hover:bg-indigo-600 text-white w-full"
                  @click="
                    submit('Azulance - Basic option', Math.round(prices[0]))
                  "
                >
                  Choose
                </button>
              </div>
              <div class="px-5 pt-4 pb-5">
                <div
                  class="text-xs text-slate-800 font-semibold uppercase mb-4"
                >
                  What's included
                </div>
                <!-- List -->
                <ul>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Civilian responsability</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Criminal defense</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Broken windshield</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Assistance service</div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Tab 2 -->
            <div
              class="col-span-full xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200"
            >
              <div>
                <Banner type="success" :open="true">
                  Recommended option.
                </Banner>
              </div>
              <div
                class="relative absolute top-0 left-0 right-0 h-0.5 bg-sky-500"
                aria-hidden="true"
              ></div>
              <div class="px-5 pt-5 pb-6 border-b border-slate-200">
                <header class="flex items-center mb-2">
                  <div
                    class="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr from-sky-500 to-sky-300 mr-3"
                  >
                    <svg
                      class="w-6 h-6 fill-current text-white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-lg text-slate-800 font-semibold">Advanced</h3>
                </header>
                <div class="text-sm mb-2">A confortable reinforced option.</div>
                <!-- Price -->
                <div class="text-slate-800 font-bold mb-4">
                  <span class="text-2xl">$</span
                  ><span class="text-3xl">{{ Math.round(prices[1]) }}</span
                  ><span class="text-slate-500 font-medium text-sm">/mo</span>
                </div>
                <!-- CTA -->
                <button
                  class="btn bg-sky-500 hover:bg-indigo-600 text-white w-full"
                  @click="
                    submit('Azulance - Advanced option', Math.round(prices[1]))
                  "
                >
                  Choose
                </button>
              </div>
              <div class="px-5 pt-4 pb-5">
                <div
                  class="text-xs text-slate-800 font-semibold uppercase mb-4"
                >
                  What's included
                </div>
                <!-- List -->
                <ul>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Civilian responsability</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Criminal defense</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Broken windshield</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Assistance service</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="text-sky-500 w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Vehicle theft</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="text-sky-500 w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Fire</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="text-sky-500 w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Climatic events and attack</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="text-sky-500 w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">
                      Natural and technological catastrophies
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- Tab 3 -->
            <div
              class="relative col-span-full xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200 mt-10"
            >
              <div
                class="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500"
                aria-hidden="true"
              ></div>
              <div class="px-5 pt-5 pb-6 border-b border-slate-200">
                <header class="flex items-center mb-2">
                  <div
                    class="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr from-indigo-500 to-indigo-300 mr-3"
                  >
                    <svg
                      class="w-6 h-6 fill-current text-white"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-lg text-slate-800 font-semibold">Premium</h3>
                </header>
                <div class="text-sm mb-2">Protection in all circumstances.</div>
                <!-- Price -->
                <div class="text-slate-800 font-bold mb-4">
                  <span class="text-2xl">$</span
                  ><span class="text-3xl">{{ Math.round(prices[2]) }}</span
                  ><span class="text-slate-500 font-medium text-sm">/mo</span>
                </div>
                <!-- CTA -->
                <button
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                  @click="
                    submit('Azulance - Premium option', Math.round(prices[2]))
                  "
                >
                  Choose
                </button>
              </div>
              <div class="px-5 pt-4 pb-5">
                <div
                  class="text-xs text-slate-800 font-semibold uppercase mb-4"
                >
                  What's included
                </div>
                <!-- List -->
                <ul>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Civilian responsability</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Criminal defense</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Broken windshield</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Assistance service</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Vehicle theft</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Fire</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">Climatic events and attack</div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">
                      Natural and technological catastrophies
                    </div>
                  </li>
                  <li class="flex items-center py-1">
                    <svg
                      class="text-indigo-500 w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                      />
                    </svg>
                    <div class="text-sm">All accidents damages</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <div v-if="sessionId && publishableKey">
    <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :session-id="sessionId"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import Header from "@/partials/Header.vue";
import Banner from "@/components/Banner.vue";
import Sidebar from "@/partials/Sidebar.vue";
import axios from "axios";
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { useStore } from "vuex";

export default {
  name: "PlansPanel",
  components: { Sidebar, Banner, Header, StripeCheckout },
  data() {
    return {
      prices: null,
      quote: null,
      loading: false,
      sessionId: null,
      publishableKey:
        "pk_test_51MZYljHiiKajDgAsKTAGtexDySSMf7qJ1VxyjEIebTMcEcttRWeCGMnXtXgtCdEf0iN5k60WuXQxGlAva3xG0Yvo00ImgD98YH",
    };
  },
  setup() {
    const annual = ref(true);
    const sidebarOpen = ref(false);

    return {
      annual,
      sidebarOpen,
    };
  },
  methods: {
    submit: async function (title, tarif) {
      await this.getStripeSession(title, tarif);
      this.$refs.checkoutRef.redirectToCheckout();
    },
    getStripeSession: async function (title, tarif) {
      let token = this.$store.getters["auth/token"];
      let request = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/payment/getSession/${title}/${tarif}/${token}/${this.quote.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.sessionId = request.data.id;
      console.log(request.data);
    },
  },
  async created() {
    const token = this.$store.getters["auth/token"];

    if (!token) {
      this.$router.push({ name: "login" });
    }

    const id = document.URL.substring(document.URL.lastIndexOf("/") + 1);

    const request = await axios.get(
      `${import.meta.env.VITE_API_URL}/payment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (request.data) {
      this.$router.push({ name: "newcontract", params: { id: id } });
    }

    let response = await axios.get(
      `${import.meta.env.VITE_API_URL}/quotes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    this.quote = response.data;

    response = await axios.get(
      `${import.meta.env.VITE_API_URL}/prices/${this.quote.vehicle.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    this.prices = response.data;
  },
};
</script>
