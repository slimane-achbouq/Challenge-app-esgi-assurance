<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

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
        <Banner
          type="success"
          class="mb-1"
          :open="contractCreated"
          v-if="contractCreated"
        >
          Contract created successfully to payment .
        </Banner>

        <Banner
          type="error"
          class="mb-1"
          :open="formatIncorrect"
          v-if="formatIncorrect"
        >
          The format of the file must be PDF.
        </Banner>

        <div
          class="flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-slate-200 mx-8 my-3"
        >
          <div class="px-5 py-2">
            <div>
              <div class="mb-2">
                <i class="fas fa-file-contract"></i
                ><strong class="text-1xl text-slate-800">
                  Quote information</strong
                >
              </div>
            </div>
            <div class="">
              <!-- Left side -->
              <div class="flex items-center mb-4 md:mb-0">
                <!-- User info -->

                <table class="table-auto w-full" v-if="quote">
                  <!-- Table header -->
                  <thead
                    class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm"
                  >
                    <tr>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">
                          Insurance Type
                        </div>
                      </th>

                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Coverage</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">
                          Coverage Duration
                        </div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">
                          Coverage Start Date
                        </div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Creating Date</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Last update</div>
                      </th>
                    </tr>
                  </thead>
                  <!-- Table body -->
                  <tbody class="text-sm font-medium divide-y divide-slate-100">
                    <!-- Row -->
                    <tr>
                      <td class="p-2 whitespace-nowrap">
                        <div class="flex items-center">
                          <div>
                            <div class="text-slate-800 uppercase">
                              {{ quote.insuranceType }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="font-normal text-left">
                          {{ quote.coverage }}
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="font-normal text-left">
                          {{ quote.coverageDuration }} months
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="font-normal text-left">
                          {{ processDate(quote.coverageStartDate) }}
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left">
                          {{ processDate(quote.createdAt) }}
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left">
                          {{ processDate(quote.updatedAt) }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 sm:px-6 lg:px-8 w-full">
          <!-- Page content -->
          <div
            class="max-w-5xl mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16"
          >
            <!-- Content -->
            <div>
              <div class="mb-3"></div>

              <header class="mb-4">
                <!-- Title -->
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold mb-2">
                  <i class="fas fa-file-signature"></i> Contract Informations ✨
                </h1>
                <p>
                  After creating your contract, the admin will check this
                  information before validate your contract.
                </p>
              </header>

              <hr class="my-3 border-t border-slate-200" />

              <div class="w-full max-w-9xl mx-auto" v-if="prices">
                <!-- Pricing tabs -->
                <div class="grid grid-cols-12 gap-6">
                  <!-- Tab 1 -->
                  <div
                    class="relative col-span-full xl:col-span-4 bg-white shadow-md rounded-sm border border-slate-200 mt-10"
                  >
                    <div
                      class="absolute top-0 left-0 right-0 h-0.5"
                      :class="{
                        'bg-emerald-500': selectedPlan === 'Basic',
                        'bg-sky-500': selectedPlan !== 'Basic',
                      }"
                      aria-hidden="true"
                    ></div>
                    <div class="px-5 pt-5 pb-6 border-b border-slate-200">
                      <header class="flex items-center mb-2">
                        <div
                          class="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr mr-3"
                          :class="{
                            'from-emerald-500 to-emerald-300':
                              selectedPlan === 'Basic',
                            'from-indigo-500 to-indigo-300':
                              selectedPlan !== 'Basic',
                          }"
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
                        <h3 class="text-lg text-slate-800 font-semibold">
                          Basic
                        </h3>
                      </header>
                      <div class="text-sm mb-2">
                        The minimal option for tranquility.
                      </div>
                      <!-- Price -->
                      <div class="text-slate-800 font-bold mb-4">
                        <span class="text-2xl">$</span
                        ><span class="text-3xl">{{
                          Math.round(prices[0])
                        }}</span
                        ><span class="text-slate-500 font-medium text-sm"
                          >/mo</span
                        >
                      </div>
                      <!-- CTA -->
                      <button
                        class="btn text-white w-full"
                        :class="{
                          'bg-emerald-500': selectedPlan === 'Basic',
                          'bg-sky-500': selectedPlan !== 'Basic',
                        }"
                        @click="
                          price = Math.round(prices[0]);
                          selectedPlan = 'Basic';
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
                      class="relative absolute top-0 left-0 right-0 h-0.5"
                      :class="{
                        'bg-emerald-500': selectedPlan === 'Standard',
                        'bg-sky-500': selectedPlan !== 'Standard',
                      }"
                      aria-hidden="true"
                    ></div>
                    <div class="px-5 pt-5 pb-6 border-b border-slate-200">
                      <header class="flex items-center mb-2">
                        <div
                          class="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr mr-3"
                          :class="{
                            'from-emerald-500 to-emerald-300':
                              selectedPlan === 'Standard',
                            'from-indigo-500 to-indigo-300':
                              selectedPlan !== 'Standard',
                          }"
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
                        <h3 class="text-lg text-slate-800 font-semibold">
                          Advanced
                        </h3>
                      </header>
                      <div class="text-sm mb-2">
                        A confortable reinforced option.
                      </div>
                      <!-- Price -->
                      <div class="text-slate-800 font-bold mb-4">
                        <span class="text-2xl">$</span
                        ><span class="text-3xl">{{
                          Math.round(prices[1])
                        }}</span
                        ><span class="text-slate-500 font-medium text-sm"
                          >/mo</span
                        >
                      </div>
                      <!-- CTA -->
                      <button
                        class="btn text-white w-full"
                        :class="{
                          'bg-emerald-500': selectedPlan === 'Standard',
                          'bg-sky-500': selectedPlan !== 'Standard',
                        }"
                        @click="
                          price = Math.round(prices[1]);
                          selectedPlan = 'Standard';
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
                      class="absolute top-0 left-0 right-0 h-0.5"
                      :class="{
                        'bg-emerald-500': selectedPlan === 'Premium',
                        'bg-sky-500': selectedPlan !== 'Premium',
                      }"
                      aria-hidden="true"
                    ></div>
                    <div class="px-5 pt-5 pb-6 border-b border-slate-200">
                      <header class="flex items-center mb-2">
                        <div
                          class="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr mr-3"
                          :class="{
                            'from-emerald-500 to-emerald-300':
                              selectedPlan === 'Premium',
                            'from-indigo-500 to-indigo-300':
                              selectedPlan !== 'Premium',
                          }"
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
                        <h3 class="text-lg text-slate-800 font-semibold">
                          Premium
                        </h3>
                      </header>
                      <div class="text-sm mb-2">
                        Protection in all circumstances.
                      </div>
                      <!-- Price -->
                      <div class="text-slate-800 font-bold mb-4">
                        <span class="text-2xl">$</span
                        ><span class="text-3xl">{{
                          Math.round(prices[2])
                        }}</span
                        ><span class="text-slate-500 font-medium text-sm"
                          >/mo</span
                        >
                      </div>
                      <!-- CTA -->
                      <button
                        class="btn text-white w-full"
                        :class="{
                          'bg-emerald-500': selectedPlan === 'Premium',
                          'bg-sky-500': selectedPlan !== 'Premium',
                        }"
                        @click="
                          price = Math.round(prices[2]);
                          selectedPlan = 'Premium';
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

              <div>
                <form>
                  <div class="space-y-3 my-5">
                    <label
                      class="block text-sm font-medium mb-1"
                      for="card-country"
                      >Your Driving License
                      <span class="text-rose-500">*</span></label
                    >

                    <div
                      class="flex items-center justify-center w-full"
                      v-if="!hideImageFielddrivingLicense"
                    >
                      <label for="dropzone-file" class="form-input w-full">
                        <div class="flex flex-col items-center justify-center">
                          <svg
                            aria-hidden="true"
                            class="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p
                            class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                          >
                            <span class="font-semibold"
                              >Click to upload your Driving license
                            </span>
                            or drag and drop
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            PDF Format Only
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          class="hidden"
                          required
                          @change="handleFile"
                        />
                      </label>
                    </div>
                    <div v-if="errors" class="text-xs mt-1 text-rose-500">
                      {{ errors.license }}
                    </div>

                    <div
                      class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300"
                      v-if="hideImageFielddrivingLicense"
                    >
                      <div
                        class="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2"
                      >
                        <!-- Left side -->
                        <div class="flex items-start space-x-3 md:space-x-4">
                          <div class="w-9 h-9 shrink-0 mt-1">
                            <img
                              class="w-9 h-9 rounded-full"
                              src="@/images/pdf.png"
                              width="36"
                              height="36"
                            />
                          </div>
                          <div>
                            Driving Grise file :
                            <div class="text-sm">{{ adresse }}</div>
                          </div>
                        </div>

                        <div class="flex items-center space-x-4 pl-10 md:pl-0">
                          <button></button>
                        </div>
                      </div>
                    </div>
                    <div class="space-y-4">
                      <label
                        class="block text-sm font-medium mb-1"
                        for="card-country"
                        >Proof of your adresse
                        <span class="text-rose-500">*</span></label
                      >
                      <div
                        class="flex items-center justify-center w-full"
                        v-if="!hideImageFieladresse"
                      >
                        <label for="dropzone-file" class="form-input w-full">
                          <div
                            class="flex flex-col items-center justify-center"
                          >
                            <svg
                              aria-hidden="true"
                              class="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p
                              class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                            >
                              <span class="font-semibold"
                                >Click to upload the proof of your Adresse</span
                              >
                              or drag and drop
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                              PDF Format Only
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                            required
                            @change="handleFile1"
                          />
                        </label>
                      </div>
                      <div v-if="errors" class="text-xs mt-1 text-rose-500">
                        {{ errors.adresse }}
                      </div>

                      <div
                        class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300"
                        v-if="hideImageFieladresse"
                      >
                        <div
                          class="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2"
                        >
                          <!-- Left side -->
                          <div class="flex items-start space-x-3 md:space-x-4">
                            <div class="w-9 h-9 shrink-0 mt-1">
                              <img
                                class="w-9 h-9 rounded-full"
                                src="@/images/pdf.png"
                                width="36"
                                height="36"
                              />
                            </div>
                            <div>
                              Adresse Grise file :
                              <div class="text-sm">
                                {{ drivingLicense }}
                              </div>
                            </div>
                          </div>

                          <div
                            class="flex items-center space-x-4 pl-10 md:pl-0"
                          >
                            <button></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="text-right" v-if="!contractCreated">
                      <button
                        type=""
                        class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                        @click.prevent="onCreatedContract"
                        v-if="!contractCreated && !existingPayment"
                      >
                        Confirm and proceed to payment
                      </button>
                      <button
                        type=""
                        class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                        @click.prevent="onCreatedContract"
                        v-else-if="contractCreated && !existingPayment"
                      >
                        Proceed to payment
                      </button>
                      <button
                        type=""
                        class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white"
                        @click.prevent="onCreatedContract"
                        v-else-if="!contractCreated && existingPayment"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Divider -->
              <hr class="my-6 border-t border-slate-200" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <ModalBlank
    id="success-modal"
    :modalOpen="contractCreated"
    v-if="contractCreated"
  >
    <div class="p-5 flex space-x-4">
      <!-- Icon -->
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100"
      >
        <svg
          class="w-4 h-4 shrink-0 fill-current text-emerald-500"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
          />
        </svg>
      </div>
      <!-- Content -->
      <div>
        <!-- Modal header -->
        <div class="mb-2">
          <div class="text-lg font-semibold text-slate-800">
            Contract created successfully
          </div>
        </div>
        <!-- Modal content -->
        <div class="text-sm mb-10">
          <div class="space-y-2">
            <p>
              Contract created successfully ! You can pay now or later , after
              your payment the admin will check the informations and validate
              it.
            </p>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex flex-wrap justify-end space-x-2">
          <router-link :to="{ name: 'user-contracts' }">
            <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
              Contracts List
            </button>
          </router-link>

          <button
            class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
            @click="submit(`Azulance - ${selectedPlan} option`, this.price)"
          >
            Proceeded payment
          </button>
        </div>
      </div>
    </div>
  </ModalBlank>

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
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import axios from "axios";
import Banner from "@/components/Banner.vue";
import ModalBlank from "@/components/ModalBlank.vue";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
  name: "NewContract",
  components: {
    Sidebar,
    Header,
    Banner,
    ModalBlank,
    StripeCheckout,
  },
  data() {
    return {
      selectedPlan: "Basic",
      formatIncorrect : false,
      existingPayment: null,
      drivingLicense: null,
      hideImageFielddrivingLicense: null,
      adresse: null,
      hideImageFieladresse: null,
      quote: null,
      prices: null,
      errors: {
        license: null,
        adress: null,
      },
      price: null,
      contractCreated: false,
      formData: {
        justificatifDomicile: null,
        permis: null,
        coverageStartDate: null,
        coverageEndDate: null,
        quoteId: null,
        insurancePremium: null,
      },
      sessionId: null,
      publishableKey:
        "pk_test_51MZYljHiiKajDgAsKTAGtexDySSMf7qJ1VxyjEIebTMcEcttRWeCGMnXtXgtCdEf0iN5k60WuXQxGlAva3xG0Yvo00ImgD98YH",
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
    handleFile(event) {
      this.file = event.target.files[0];

      if (this.file.type != 'application/pdf') {
        console.log(this.file.type)
        this.formatIncorrect = true
      } else {
        this.formatIncorrect = false
        this.errors.license = null;
        this.drivingLicense = this.file.name;
        this.formData.permis = this.file;
        this.previewSrc = URL.createObjectURL(event.target.files[0]);
        this.hideImageFielddrivingLicense = true;
        this.errors.license = null;
      }
      
    },
    handleFile1(event) {
      this.file = event.target.files[0];

      if (this.file.type != 'application/pdf') {
        console.log(this.file.type)
        this.formatIncorrect = true
      } else {
        this.formatIncorrect = false
        this.adresse = this.file.name;
        this.formData.justificatifDomicile = this.file;
        this.previewSrc = URL.createObjectURL(event.target.files[0]);
        this.hideImageFieladresse = true;
        this.errors.adresse = null;

        }

      
    },
    processDate(date) {
      let dateObject = new Date(date);

      let year = dateObject.getUTCFullYear();
      let month = dateObject.getUTCMonth() + 1; // JS months are 0-11
      let day = dateObject.getUTCDate();

      // pad with 0 if needed
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      return `${year}-${month}-${day}`;
    },
    async onCreatedContract() {
      if (!this.drivingLicense)
        this.errors.license = " the Driving License is mandatory";
      if (!this.adresse)
        this.errors["adresse"] = " the proof of the adress is mandatory";

      this.formData.coverageStartDate = this.quote.coverageStartDate;
      this.formData.coverageEndDate = this.quote.coverageStartDate;
      this.formData.quoteId = this.quote.id;
      this.formData.insurancePremium = this.price;

      this.formData.insurancePremium = Number(this.formData.insurancePremium);

      const token = this.$store.getters["auth/token"];
      // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/beneficiary-insurance`,
        this.formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        this.contractCreated = true;
      }
    },
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
  async created() {
    const id = document.URL.substring(document.URL.lastIndexOf("/") + 1);

    const token = this.$store.getters["auth/token"];
    let existingPayment = await axios.get(
      `${import.meta.env.VITE_API_URL}/payment/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    this.existingPayment = existingPayment.data;

    if(this.existingPayment ) {
      const redirectUrl = "/" + (this.$route.query.redirect || "contracts");
      this.$router.replace(redirectUrl);
    }


    // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
    let response = await axios.get(
      `${import.meta.env.VITE_API_URL}/quotes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      this.quote = response.data;
    }

    this.existingPayment = existingPayment.data;

    // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
    response = await axios.get(
      `${import.meta.env.VITE_API_URL}/prices/${this.quote.vehicle.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      this.prices = response.data;
    }

    this.price = Math.round(this.prices[0]);
  },
};
</script>
