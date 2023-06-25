<template>
  <main class="bg-white">
    <nav
      class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"
    >
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <router-link to="/" class="flex items-center">
          <p></p>
          <img
            src="../../images/azulance-logo.png"
            class="h-8 mr-3"
            alt="Flowbite Logo"
          />
        </router-link>
        <div class="flex md:order-2">
          <div v-if="!token">
            <router-link
              type="button"
              class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
              to="/login"
              >Login</router-link
            >
            <router-link
              type="button"
              class="btn bg-indigo-600 hover:bg-indigo-600 text-white ml-3"
              to="/register"
              >Register</router-link
            >
          </div>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <UserMenu align="right" class="dark:text-white" />
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <router-link
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/about"
                >About</router-link
              >
            </li>
            <li>
              <a
                class="block py-2 pl-3 pr-4 text-indigo-500 bg-indigo-500 rounded md:bg-transparent md:text-indigo-500 md:p-0 md:dark:text-blue-500"
                aria-current="page"
                >Services</a
              >
            </li>
            <li>
              <router-link
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/contact"
                >Contact</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <!-- Sections -->
      <div class="space-y-8">
        <!-- Popular Topics -->
        <div>
          <div class="mb-5">
            <div class="px-4 mx-auto max-w-screen-xl text-center py-7 pt-24">
              <h1
                class="flex items-center text-slate-800 text-5xl font-extrabold dark:text-slate-800"
              >
                Services<span
                  class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2"
                  >AZULANCE</span
                >
              </h1>
            </div>
          </div>
          <!-- Grid -->
          <div
            class="grid sm:grid-cols-2 lg:grid-cols-4 lg:sidebar-expanded:grid-cols-2 xl:sidebar-expanded:grid-cols-4 gap-6"
          >
            <!-- Item -->
            <div class="bg-slate-100 rounded-sm text-center p-5">
              <div class="flex flex-col h-full">
                <div class="grow mb-2">
                  <!-- Icon -->
                  <div class="inline-flex w-12 h-12 rounded-full bg-indigo-400">
                    <svg
                      class="w-12 h-12"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="icon1-a"
                        >
                          <stop stop-color="#FFF" offset="0%" />
                          <stop stop-color="#A5B4FC" offset="100%" />
                        </linearGradient>
                      </defs>
                      <g fill-rule="nonzero" fill="none">
                        <path
                          d="M19.236 21.995h-3.333c-.46 0-.833.352-.833.786v9.428c0 .434.373.786.833.786h4.167V22.78c0-.434-.374-.786-.834-.786Z"
                          fill="#4F46E5"
                          opacity=".88"
                        />
                        <path
                          d="M34.234 20.073a2.393 2.393 0 0 0-.735-.116h-5v-2.609c0-3.325-2.157-4.297-3.298-4.347a.828.828 0 0 0-.611.24.888.888 0 0 0-.257.63v4.032L21 22.077v10.924h10.19c1.1.005 2.073-.744 2.392-1.842l2.308-7.826a2.711 2.711 0 0 0-.181-1.988 2.528 2.528 0 0 0-1.475-1.272Z"
                          fill="url(#icon1-a)"
                          transform="translate(-.93 -.005)"
                        />
                      </g>
                    </svg>
                  </div>
                  <!-- Content -->
                  <h3 class="text-lg font-semibold text-slate-800 mb-1">
                    Getting Started
                  </h3>
                  <div class="text-sm">
                    Lorem ipsum dolor sit consectetur adipiscing elit sed do.
                  </div>
                </div>
                <!-- Link -->
                <div>
                  <a
                    class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                    href="#0"
                    >Explore -&gt;</a
                  >
                </div>
              </div>
            </div>

            <!-- Item -->
            <div class="bg-slate-100 rounded-sm text-center p-5">
              <div class="flex flex-col h-full">
                <div class="grow mb-2">
                  <!-- Icon -->
                  <div class="inline-flex w-12 h-12 rounded-full bg-indigo-400">
                    <svg
                      class="w-12 h-12"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="icon2-a"
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
                    In-app Messaging
                  </h3>
                  <div class="text-sm">
                    Lorem ipsum dolor sit consectetur adipiscing elit sed do.
                  </div>
                </div>
                <!-- Link -->
                <div>
                  <a
                    class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                    href="#0"
                    >Explore -&gt;</a
                  >
                </div>
              </div>
            </div>

            <!-- Item -->
            <div class="bg-slate-100 rounded-sm text-center p-5">
              <div class="flex flex-col h-full">
                <div class="grow mb-2">
                  <!-- Icon -->
                  <div class="inline-flex w-12 h-12 rounded-full bg-indigo-400">
                    <svg
                      class="w-12 h-12"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="icon3-a"
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
                    Apps & Tools
                  </h3>
                  <div class="text-sm">
                    Lorem ipsum dolor sit consectetur adipiscing elit sed do.
                  </div>
                </div>
                <!-- Link -->
                <div>
                  <a
                    class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                    href="#0"
                    >Explore -&gt;</a
                  >
                </div>
              </div>
            </div>

            <!-- Item -->
            <div class="bg-slate-100 rounded-sm text-center p-5">
              <div class="flex flex-col h-full">
                <div class="grow mb-2">
                  <!-- Icon -->
                  <div class="inline-flex w-12 h-12 rounded-full bg-indigo-400">
                    <svg
                      class="w-12 h-12"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="icon4-a"
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
                    Billing & Invoices
                  </h3>
                  <div class="text-sm">
                    Lorem ipsum dolor sit consectetur adipiscing elit sed do.
                  </div>
                </div>
                <!-- Link -->
                <div>
                  <a
                    class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                    href="#0"
                    >Explore -&gt;</a
                  >
                </div>
              </div>
            </div>

            <!-- Item -->
            <div class="bg-slate-100 rounded-sm text-center p-5">
              <div class="flex flex-col h-full">
                <div class="grow mb-2">
                  <!-- Icon -->
                  <div class="inline-flex w-12 h-12 rounded-full bg-indigo-400">
                    <svg
                      class="w-12 h-12"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="icon5-a"
                        >
                          <stop stop-color="#FFF" offset="0%" />
                          <stop stop-color="#A5B4FC" offset="100%" />
                        </linearGradient>
                      </defs>
                      <g fill-rule="nonzero" fill="none">
                        <path
                          d="M31.074 20.692a5.516 5.516 0 0 0-7.878-1.107c-.172.133-.311.293-.463.44-.106-.184-.196-.375-.324-.55a5.516 5.516 0 0 0-7.878-1.108c-2.49 1.932-3 5.56-1.14 8.103l7.142 9.207 9.402-6.882c2.49-1.931 3-5.56 1.139-8.103Z"
                          fill="#4F46E5"
                          opacity=".88"
                        />
                        <path
                          d="M20.353 2.998a5.516 5.516 0 0 0-7.955 0c-.152.156-.268.333-.398.5-.13-.167-.246-.344-.398-.5a5.516 5.516 0 0 0-7.955 0c-2.196 2.26-2.196 5.924 0 8.183L12 19.304l8.353-8.123c2.196-2.26 2.196-5.924 0-8.183Z"
                          fill="url(#icon5-a)"
                          transform="rotate(16 -34.482 60.533)"
                        />
                      </g>
                    </svg>
                  </div>
                  <!-- Content -->
                  <h3 class="text-lg font-semibold text-slate-800 mb-1">
                    Support
                  </h3>
                  <div class="text-sm">
                    Lorem ipsum dolor sit consectetur adipiscing elit sed do.
                  </div>
                </div>
                <!-- Link -->
                <div>
                  <a
                    class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                    href="#0"
                    >Explore -&gt;</a
                  >
                </div>
              </div>
            </div>

            <!-- Item -->
            <div class="bg-slate-100 rounded-sm text-center p-5">
              <div class="flex flex-col h-full">
                <div class="grow mb-2">
                  <!-- Icon -->
                  <div class="inline-flex w-12 h-12 rounded-full bg-indigo-400">
                    <svg
                      class="w-12 h-12"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="icon6-a"
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
                    Multimedia / Files
                  </h3>
                  <div class="text-sm">
                    Lorem ipsum dolor sit consectetur adipiscing elit sed do.
                  </div>
                </div>
                <!-- Link -->
                <div>
                  <a
                    class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                    href="#0"
                    >Explore -&gt;</a
                  >
                </div>
              </div>
            </div>

            <!-- Item -->
            <div class="bg-slate-100 rounded-sm text-center p-5">
              <div class="flex flex-col h-full">
                <div class="grow mb-2">
                  <!-- Icon -->
                  <div class="inline-flex w-12 h-12 rounded-full bg-indigo-400">
                    <svg
                      class="w-12 h-12"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="icon7-a"
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
                    App Rewards
                  </h3>
                  <div class="text-sm">
                    Lorem ipsum dolor sit consectetur adipiscing elit sed do.
                  </div>
                </div>
                <!-- Link -->
                <div>
                  <a
                    class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                    href="#0"
                    >Explore -&gt;</a
                  >
                </div>
              </div>
            </div>

            <!-- Item -->
            <div class="bg-slate-100 rounded-sm text-center p-5">
              <div class="flex flex-col h-full">
                <div class="grow mb-2">
                  <!-- Icon -->
                  <div class="inline-flex w-12 h-12 rounded-full bg-indigo-400">
                    <svg
                      class="w-12 h-12"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          x1="50%"
                          y1="0%"
                          x2="50%"
                          y2="100%"
                          id="icon8-a"
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
                    Lorem ipsum dolor sit consectetur adipiscing elit sed do.
                  </div>
                </div>
                <!-- Link -->
                <div>
                  <a
                    class="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                    href="#0"
                    >Explore -&gt;</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 mx-auto max-w-screen-xl text-center py-7 pt-24">
      <h1
        class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-gray-900 md:text-5xl lg:text-6xl"
      >
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-indigo-300"
          >Azulance App</span
        >
        You can also use our app!
      </h1>
    </div>

    <section>
      <div style="text-align: -webkit-center">
        <img
          class="object-contain h-60 w-76"
          src="../../images/iphone-application.png"
        />
      </div>
      <div class="w-full p-4 text-center bg-white rounded-lg">
        <h5 class="mb-2 text-3xl font-bold text-gray-900">
          Work fast from anywhere
        </h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Stay up to date and move work forward with Flowbite on iOS & Android.
          Download the app today.
        </p>
        <div
          class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
        >
          <a
            href="#"
            class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <svg
              class="mr-3 w-7 h-7"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="apple"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              ></path>
            </svg>
            <div class="text-left">
              <div class="mb-1 text-xs">Download on the</div>
              <div class="-mt-1 font-sans text-sm font-semibold">
                Mac App Store
              </div>
            </div>
          </a>
          <a
            href="#"
            class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <svg
              class="mr-3 w-7 h-7"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google-play"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
              ></path>
            </svg>
            <div class="text-left">
              <div class="mb-1 text-xs">Get in on</div>
              <div class="-mt-1 font-sans text-sm font-semibold">
                Google Play
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="pt-20">
      <footer class="bg-indigo-100 dark:bg-gray-900">
        <div class="mx-auto w-full max-w-screen-xl">
          <div class="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Company
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="#" class="hover:underline">About</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Careers</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Brand Center</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Help center
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="#" class="hover:underline">Discord Server</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Twitter</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Facebook</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Contact Us</a>
                </li>
              </ul>
            </div>
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Legal
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Licensing</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
            <div>
              <h2
                class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
              >
                Download
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="#" class="hover:underline">iOS</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Android</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">Windows</a>
                </li>
                <li class="mb-4">
                  <a href="#" class="hover:underline">MacOS</a>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between"
          >
            <span
              class="text-sm text-gray-500 dark:text-gray-300 sm:text-center"
              >© 2023 <a href="https://flowbite.com/">Flowbite™</a>. All Rights
              Reserved.
            </span>
            <div class="flex mt-4 space-x-6 sm:justify-center md:mt-0">
              <a
                href="#"
                class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Instagram page</span>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
                <span class="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">GitHub account</span>
              </a>
              <a
                href="#"
                class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  </main>
</template>

<script>
import UserMenu from "../../components/DropdownProfile.vue";

export default {
  components: {
    UserMenu,
  },
  data() {
    return {
      token: null,
    };
  },
  async created() {
    this.token = this.$store.getters["auth/token"];
  },
  methods: {},
};
</script>
<style></style>
