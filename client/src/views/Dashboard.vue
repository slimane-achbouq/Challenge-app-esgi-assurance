<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebar-open="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebar-open="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <WalcomeBanner />
        </div>
        <section v-if="role && role == 'Admin'">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Our service statistics
            </h2>
            <div class="grid grid-cols-3 gap-5 sm:grid-cols-4 mt-4">
              <div class="bg-white overflow-hidden shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <dl>
                    <dt
                      class="text-sm leading-5 font-medium text-gray-500 truncate"
                    >
                      Quotes
                    </dt>
                    <dd
                      v-if="data.quotes != null"
                      class="mt-1 text-5xl leading-9 font-semibold text-indigo-600"
                    >
                      {{ data.quotes }}
                    </dd>
                    <dd
                      v-else
                      class="mt-1 text-5xl leading-9 font-semibold text-indigo-600"
                    >
                      0
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="bg-white overflow-hidden shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <dl>
                    <dt
                      class="text-sm leading-5 font-medium text-gray-500 truncate"
                    >
                      Contracts
                    </dt>
                    <dd
                      v-if="data.contracts != null"
                      class="mt-1 text-5xl leading-9 font-semibold text-indigo-600"
                    >
                      {{ data.contracts }}
                    </dd>
                    <dd
                      v-else
                      class="mt-1 text-5xl leading-9 font-semibold text-indigo-600"
                    >
                      0
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="bg-white overflow-hidden shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <dl>
                    <dt
                      class="text-sm leading-5 font-medium text-gray-500 truncate"
                    >
                      Claims
                    </dt>
                    <dd
                      v-if="data.claims != null"
                      class="mt-1 text-5xl leading-9 font-semibold text-indigo-600"
                    >
                      {{ data.claims }}
                    </dd>
                    <dd
                      v-else
                      class="mt-1 text-5xl leading-9 font-semibold text-indigo-600"
                    >
                      0
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="bg-white overflow-hidden shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <dl>
                    <dt
                      class="text-sm leading-5 font-medium text-gray-500 truncate"
                    >
                      Total users
                    </dt>
                    <dd
                      v-if="data.users != null"
                      class="mt-1 text-5xl leading-9 font-semibold text-indigo-600"
                    >
                      {{ data.users }}
                    </dd>
                    <dd
                      v-else
                      class="mt-1 text-5xl leading-9 font-semibold text-indigo-600"
                    >
                      0
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto pt-24">
            <div
              class="grid sm:grid-cols-2 lg:grid-cols-4 lg:sidebar-expanded:grid-cols-2 xl:sidebar-expanded:grid-cols-4 gap-6"
            >
              <!-- Item -->
              <div
                v-if="role == 'Admin'"
                class="bg-slate-100 rounded-sm text-center p-5"
              >
                <div class="flex flex-col h-full">
                  <div class="grow mb-2">
                    <!-- Icon -->
                    <div
                      class="inline-flex w-12 h-12 rounded-full bg-indigo-400"
                    >
                      <svg
                        class="w-12 h-12"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="icon6-a"
                            x1="50%"
                            y1="0%"
                            x2="50%"
                            y2="100%"
                          >
                            <stop stop-color="#FFF" offset="0%" />
                            <stop stop-color="#A5B4FC" offset="100%" />
                          </linearGradient>
                        </defs>
                        <g fill-rule="nonzero" fill="none">
                          <path
                            d="M33.83 16.57 9.803 19.52c-.491.06-.846.464-.793.901l1.756 14.297c.054.437.496.743.987.683l24.026-2.95c.492-.06.847-.464.793-.901l-1.755-14.297c-.054-.438-.496-.743-.987-.683Z"
                            fill="#4F46E5"
                            opacity=".88"
                          />
                          <path
                            d="M28.712 0H4.505c-.495 0-.897.357-.897.798v14.404c0 .44.402.798.897.798h24.207c.494 0 .896-.357.896-.798V.798c0-.44-.402-.798-.896-.798Z"
                            fill="url(#icon6-a)"
                            transform="rotate(8 -86.45 77.005)"
                          />
                          <path
                            fill="#6366F1"
                            opacity=".72"
                            d="m23.646 19.765 4.533 3.667-5.368 2.275z"
                          />
                        </g>
                      </svg>
                    </div>
                    <!-- Content -->
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">
                      Claims
                    </h3>
                    <div class="text-sm">
                      Here you can view a list of all the claims.
                    </div>
                  </div>
                  <!-- Link -->
                  <div>
                    <router-link
                      to="/claims"
                      class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                      >Explore -&gt;
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Item -->
              <div
                v-if="role == 'User'"
                class="bg-slate-100 rounded-sm text-center p-5"
              >
                <div class="flex flex-col h-full">
                  <div class="grow mb-2">
                    <!-- Icon -->
                    <div
                      class="inline-flex w-12 h-12 rounded-full bg-indigo-400"
                    >
                      <svg
                        class="w-12 h-12"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="icon7-a"
                            x1="50%"
                            y1="0%"
                            x2="50%"
                            y2="100%"
                          >
                            <stop stop-color="#FFF" offset="0%" />
                            <stop stop-color="#A5B4FC" offset="100%" />
                          </linearGradient>
                        </defs>
                        <g
                          transform="translate(-.186 -.042)"
                          fill-rule="nonzero"
                          fill="none"
                        >
                          <circle fill="#554FE8" cx="20" cy="26.993" r="10" />
                          <circle
                            fill="url(#icon7-a)"
                            cx="25.122"
                            cy="24"
                            r="11"
                          />
                          <path
                            fill="#6366F1"
                            opacity=".72"
                            d="m26.255 22.605-1.569-3.586-.922 3.804-3.735.327 3.26 2.195-.864 3.91 2.927-2.626 3.339 2.078-1.53-3.7 2.83-2.729z"
                          />
                        </g>
                      </svg>
                    </div>
                    <!-- Content -->
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">
                      Profile
                    </h3>
                    <div class="text-sm">
                      If you want to edit or obtain information about your
                      account
                    </div>
                  </div>
                  <!-- Link -->
                  <div>
                    <router-link
                      class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                      to="/profile"
                      >Explore -&gt;</router-link
                    >
                  </div>
                </div>
              </div>

              <!-- Item -->
              <div class="bg-slate-100 rounded-sm text-center p-5">
                <div class="flex flex-col h-full">
                  <div class="grow mb-2">
                    <!-- Icon -->
                    <div
                      class="inline-flex w-12 h-12 rounded-full bg-indigo-400"
                    >
                      <svg
                        class="w-12 h-12"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="icon3-a"
                            x1="50%"
                            y1="0%"
                            x2="50%"
                            y2="100%"
                          >
                            <stop stop-color="#FFF" offset="0%" />
                            <stop stop-color="#A5B4FC" offset="100%" />
                          </linearGradient>
                        </defs>
                        <g fill-rule="nonzero" fill="none">
                          <circle
                            fill="url(#icon3-a)"
                            cx="30.5"
                            cy="17.5"
                            r="4.5"
                          />
                          <circle
                            fill="#4F46E5"
                            opacity=".88"
                            cx="17.5"
                            cy="17.5"
                            r="4.5"
                          />
                          <circle
                            fill="#4F46E5"
                            opacity=".88"
                            cx="30.5"
                            cy="30.5"
                            r="4.5"
                          />
                          <circle
                            fill="url(#icon3-a)"
                            cx="17.5"
                            cy="30.5"
                            r="4.5"
                          />
                        </g>
                      </svg>
                    </div>
                    <!-- Content -->
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">
                      Quotes
                    </h3>
                    <div v-if="role === 'User'" class="text-sm">
                      You want to know information about a quote or create a
                      quote or see a list of your quotes.
                    </div>
                    <div v-if="role === 'Admin'" class="text-sm">
                      You want to know information about a quote or see a list
                      of quotes.
                    </div>
                  </div>
                  <!-- Link -->
                  <div>
                    <router-link
                      to="/quotes"
                      class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                      >Explore -&gt;</router-link
                    >
                  </div>
                </div>
              </div>

              <!-- Item -->
              <div class="bg-slate-100 rounded-sm text-center p-5">
                <div class="flex flex-col h-full">
                  <div class="grow mb-2">
                    <!-- Icon -->
                    <div
                      class="inline-flex w-12 h-12 rounded-full bg-indigo-400"
                    >
                      <svg
                        class="w-12 h-12"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="icon4-a"
                            x1="50%"
                            y1="0%"
                            x2="50%"
                            y2="100%"
                          >
                            <stop stop-color="#FFF" offset="0%" />
                            <stop stop-color="#A5B4FC" offset="100%" />
                          </linearGradient>
                        </defs>
                        <g fill-rule="nonzero" fill="none">
                          <path
                            d="M34.327 18.194H10.12c-.495 0-.897.358-.897.798v14.404c0 .44.402.798.897.798h24.207c.495 0 .896-.357.896-.798V18.992c0-.44-.401-.798-.896-.798Z"
                            fill="#4F46E5"
                            opacity=".88"
                          />
                          <path
                            d="M29.09 0H4.883c-.494 0-.896.357-.896.798v14.404c0 .44.402.798.896.798H29.09c.495 0 .897-.357.897-.798V.798c0-.44-.402-.798-.897-.798Z"
                            fill="url(#icon4-a)"
                            transform="rotate(-8 126.748 -40.297)"
                          />
                          <path
                            d="M25.194 25.777a3 3 0 1 1-.835-5.942 3 3 0 0 1 .835 5.942Z"
                            fill="#6366F1"
                            opacity=".72"
                          />
                        </g>
                      </svg>
                    </div>
                    <!-- Content -->
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">
                      Contracts
                    </h3>

                    <div v-if="role === 'User'" class="text-sm">
                      You can access to the contract list .
                    </div>
                    <div v-if="role === 'Admin'" class="text-sm">
                      You can access the contract list to validate the
                      contracts.
                    </div>
                  </div>
                  <!-- Link -->
                  <div>
                    <router-link
                      to="/contracts"
                      class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                      >Explore -&gt;</router-link
                    >
                  </div>
                </div>
              </div>

              <!-- Item -->
              <div
                v-if="role == 'User'"
                class="bg-slate-100 rounded-sm text-center p-5"
              >
                <div class="flex flex-col h-full">
                  <div class="grow mb-2">
                    <!-- Icon -->
                    <div
                      class="inline-flex w-12 h-12 rounded-full bg-indigo-400"
                    >
                      <svg
                        class="w-12 h-12"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="icon8-a"
                            x1="50%"
                            y1="0%"
                            x2="50%"
                            y2="100%"
                          >
                            <stop stop-color="#FFF" offset="0%" />
                            <stop stop-color="#A5B4FC" offset="100%" />
                          </linearGradient>
                        </defs>
                        <g fill-rule="nonzero" fill="none">
                          <path
                            d="M18.648 35.069c.232.217.46.322.798.31.337-.012.558-.132.775-.365l1.95-2.094c1.028.414 2.504.813 4.076.758 1.798-.063 3.688-.692 5.426-2.441 3.686-3.956 4.05-12.862 4.038-13.199-.012-.337-.136-.67-.368-.888-.233-.217-.574-.317-.91-.306-.338.012-9.405 1.23-12.875 4.953-2.168 2.327-2.41 5.037-1.883 7.27l6.61-3.946-7.804 8.378a1.206 1.206 0 0 0 .167 1.57Z"
                            fill="#554FE8"
                          />
                          <path
                            d="M.353 17.663c.225.224.45.337.787.337s.562-.113.786-.337l2.024-2.026c1.011.45 2.473.9 4.046.9 1.799 0 3.71-.562 5.508-2.25C17.326 10.462 18 1.575 18 1.237c0-.337-.112-.675-.337-.9C17.438.113 17.1 0 16.763 0c-.337 0-9.441.9-13.038 4.5-2.248 2.25-2.585 4.95-2.136 7.2l6.744-3.712-8.093 8.1a1.206 1.206 0 0 0 .113 1.575Z"
                            fill="url(#icon8-a)"
                            transform="rotate(13 -42.427 83.827)"
                          />
                        </g>
                      </svg>
                    </div>
                    <!-- Content -->
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">
                      Contact Us
                    </h3>
                    <div class="text-sm">
                      You can contact our administration here.
                    </div>
                  </div>
                  <!-- Link -->
                  <div>
                    <router-link
                      to="/contact"
                      class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                      >Explore -&gt;</router-link
                    >
                  </div>
                </div>
              </div>

              <!-- Item -->
              <div
                v-if="role == 'Admin'"
                class="bg-slate-100 rounded-sm text-center p-5"
              >
                <div class="flex flex-col h-full">
                  <div class="grow mb-2">
                    <!-- Icon -->
                    <div
                      class="inline-flex w-12 h-12 rounded-full bg-indigo-400"
                    >
                      <svg
                        class="w-12 h-12"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="icon2-a"
                            x1="50%"
                            y1="0%"
                            x2="50%"
                            y2="100%"
                          >
                            <stop stop-color="#FFF" offset="0%" />
                            <stop stop-color="#A5B4FC" offset="100%" />
                          </linearGradient>
                        </defs>
                        <g fill-rule="nonzero" fill="none">
                          <path
                            d="M26.5 19c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V35l-4.108-2.148a10 10 0 0 1-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C18 22.183 21.805 19 26.5 19Z"
                            fill="#4F46E5"
                            opacity=".88"
                          />
                          <path
                            d="M23 13c-5.523 0-10 3.582-10 8 0 1.797.75 3.45 2 4.785V31l4.833-2.416c.996.266 2.059.416 3.167.416 5.523 0 10-3.582 10-8s-4.477-8-10-8Z"
                            fill="url(#icon2-a)"
                          />
                        </g>
                      </svg>
                    </div>
                    <!-- Content -->
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">
                      Messages
                    </h3>
                    <div class="text-sm">
                      You can check the clients' messages here.
                    </div>
                  </div>
                  <!-- Link -->
                  <div>
                    <router-link
                      to="/contact/messageList"
                      class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                      >Explore -&gt;</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div>
            <!-- Popular Guides -->
            <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div class="mb-5">
                <h2 class="text-xl text-slate-800 font-bold">Popular Guides</h2>
              </div>
              <!-- Grid -->
              <div class="grid sm:grid-cols-2 gap-6">
                <!-- Item -->
                <div
                  class="w-full p-3 rounded-sm text bg-white border border-slate-200"
                >
                  <div class="flex h-full">
                    <!-- Icon -->
                    <svg
                      class="w-4 h-4 shrink-0 fill-indigo-400 mt-[3px] mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
                      />
                    </svg>
                    <div class="flex flex-col h-full">
                      <!-- Content -->
                      <div class="grow mb-2">
                        <div class="font-semibold text-slate-800 mb-1">
                          Documents Verification
                        </div>
                        <div class="text-sm">
                          All your uploaded documents for a contract is securely
                          saved and verified by a real human. <br />
                          The document extension for each file to upload will be
                          written so you can upload the right file easier.
                        </div>
                      </div>
                      <!-- Link -->
                    </div>
                  </div>
                </div>

                <!-- Item -->
                <div
                  class="w-full p-3 rounded-sm text bg-white border border-slate-200"
                >
                  <div class="flex h-full">
                    <!-- Icon -->
                    <svg
                      class="w-4 h-4 shrink-0 fill-indigo-400 mt-[3px] mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
                      />
                    </svg>
                    <div class="flex flex-col h-full">
                      <!-- Content -->
                      <div class="grow mb-2">
                        <div class="font-semibold text-slate-800 mb-1">
                          Payment methods
                        </div>
                        <div class="text-sm">
                          You will be able to choose your preferred payment
                          method when your contract is validated by an
                          administrator. We will never ask you to pay before
                          your contract is created, and never ask you to pay
                          outside of our platform.
                        </div>
                      </div>
                      <!-- Link -->
                    </div>
                  </div>
                </div>

                <!-- Item -->
                <div
                  class="w-full p-3 rounded-sm text bg-white border border-slate-200"
                >
                  <div class="flex h-full">
                    <!-- Icon -->
                    <svg
                      class="w-4 h-4 shrink-0 fill-indigo-400 mt-[3px] mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
                      />
                    </svg>
                    <div class="flex flex-col h-full">
                      <!-- Content -->
                      <div class="grow mb-2">
                        <div class="font-semibold text-slate-800 mb-1">
                          Claim an important event
                        </div>
                        <div class="text-sm">
                          When an important event happens, you will be able to
                          create a claim so we can help you with the best
                          possible solution. <br />
                          A claim can be for an accident, vehicle theft, or any
                          other event that can happen.
                        </div>
                      </div>
                      <!-- Link -->
                    </div>
                  </div>
                </div>

                <!-- Item -->
                <div
                  class="w-full p-3 rounded-sm text bg-white border border-slate-200"
                >
                  <div class="flex h-full">
                    <!-- Icon -->
                    <svg
                      class="w-4 h-4 shrink-0 fill-indigo-400 mt-[3px] mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
                      />
                    </svg>
                    <div class="flex flex-col h-full">
                      <!-- Content -->
                      <div class="grow mb-2">
                        <div class="font-semibold text-slate-800 mb-1">
                          Contacting method for a request
                        </div>
                        <div class="text-sm">
                          For any request in mind, you can use our contact form
                          to let us know what you need, and we will get back to
                          you as soon as possible. <br />
                          We process multiple requests, such as contract change,
                          particular information or contest a claim.
                        </div>
                      </div>
                      <!-- Link -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import { useStore } from "vuex";
import WalcomeBanner from "../components/WelcomeBanner.vue";
import axios from "axios";

export default {
  name: "UserList",
  components: {
    Sidebar,
    Header,
    WalcomeBanner,
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
      role: null,
      token: null,
    };
  },
  data() {
    return {
      data: {
        quotes: null,
        users: null,
        claims: null,
        contracts: null,
      },
    };
  },
  async created() {
    if (!this.$store.getters["auth/isAuthenticated"]) {
      this.$router.push("/");
    }
    const store = useStore();
    this.role = store.getters["auth/roles"];
    this.token = store.getters["auth/token"];

    let quoteslength = null;
    let contractlength = null;
    let claimslength = null;
    let users = null;

    try {
      const responseQuotes = await axios.get(
        `${import.meta.env.VITE_API_URL}/quotes`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      quoteslength = responseQuotes?.data.length;

      if (quoteslength) {
        this.data.quotes = quoteslength;
        localStorage.setItem("quotes-length", JSON.stringify(this.data.quotes));
      }
    } catch (err) {
      this.data.quotes = JSON.parse(localStorage.getItem("quotes-length"));
    }

    try {
      const responseContracts = await axios.get(
        `${import.meta.env.VITE_API_URL}/insurance`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      contractlength = responseContracts?.data.length;

      if (contractlength) {
        this.data.contracts = contractlength;
        localStorage.setItem(
          "contracts-length",
          JSON.stringify(this.data.contracts)
        );
      }
    } catch (err) {
      this.data.contracts = JSON.parse(
        localStorage.getItem("contracts-length")
      );
    }

    try {
      const responseClaims = await axios.get(
        `${import.meta.env.VITE_API_URL}/claims`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      claimslength = responseClaims?.data.length;

      if (claimslength) {
        this.data.claims = claimslength;
        localStorage.setItem("claims-length", JSON.stringify(this.data.claims));
      }
    } catch (err) {
      this.data.claims = JSON.parse(localStorage.getItem("claims-length"));
    }

    try {
      const responseUsers = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/getUsers`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      users = responseUsers?.data.length;
      if (users) {
        this.data.users = users;
        localStorage.setItem("users-length", JSON.stringify(this.data.users));
      }
    } catch (err) {
      this.data.users = JSON.parse(localStorage.getItem("users-length"));
    }
  },
};
</script>
