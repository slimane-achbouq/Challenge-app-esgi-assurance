<template>
  <!-- Search form -->
  <div class="mb-5 flex justify-between">
    <form class="relative">
      <label for="app-search" class="sr-only">Search by quote number</label>
      <input
        id="app-search"
        class="form-input w-full pl-9 py-3 focus:border-slate-300"
        type="search"
        placeholder="Search by quote number"
        v-model="searchTerm"
        @input="searchCustomers"
      />
      <button
        class="absolute inset-0 right-auto group"
        type="submit"
        aria-label="Search"
      >
        <svg
          class="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
          />
          <path
            d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
          />
        </svg>
      </button>
    </form>

    <!-- Right: Actions  -->
    <div
      class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
    >
      <!-- Delete button -->

      <!-- Filter button -->

      <div class="relative inline-flex">
        <button
          ref="trigger"
          class="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
          aria-haspopup="true"
          @click.prevent="dropdownOpen = !dropdownOpen"
          :aria-expanded="dropdownOpen"
        >
          <span class="sr-only">Filter</span><wbr />
          <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path
              d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z"
            />
          </svg>
        </button>
        <transition
          enter-active-class="transition ease-out duration-200 transform"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-out duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="origin-top-right z-10 absolute top-full min-w-56 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1"
            :class="align === 'right' ? 'right-0' : 'left-0'"
          >
            <div ref="dropdown">
              <div
                class="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4"
              >
                Filters
              </div>
              <ul class="mb-4">
                <li class="py-1 px-3">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      v-model="filters.subscribed"
                    />
                    <span class="text-sm font-medium ml-2">Subscriped</span>
                  </label>
                </li>
                <li class="py-1 px-3">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      v-model="filters.notSubscribed"
                    />
                    <span class="text-sm font-medium ml-2">Not Subscriped</span>
                  </label>
                </li>
                <li class="py-1 px-3">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      v-model="filters.basicInsurance"
                    />
                    <span class="text-sm font-medium ml-2"
                      >Basic insurance</span
                    >
                  </label>
                </li>
                <li class="py-1 px-3">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      v-model="filters.standardInsurance"
                    />
                    <span class="text-sm font-medium ml-2"
                      >Standard insurance</span
                    >
                  </label>
                </li>
                <li class="py-1 px-3">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      v-model="filters.premiumInsurance"
                    />
                    <span class="text-sm font-medium ml-2"
                      >Premium insurance</span
                    >
                  </label>
                </li>
                <li class="py-1 px-3">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      v-model="filters.liabilityCoverage"
                    />
                    <span class="text-sm font-medium ml-2"
                      >Liability coverage</span
                    >
                  </label>
                </li>
                <li class="py-1 px-3">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      v-model="filters.collisionCoverage"
                    />
                    <span class="text-sm font-medium ml-2"
                      >Collision coverage</span
                    >
                  </label>
                </li>
                <li class="py-1 px-3">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      v-model="filters.comprehensiveCoverage"
                    />
                    <span class="text-sm font-medium ml-2"
                      >Comprehensive coverage</span
                    >
                  </label>
                </li>
              </ul>
              <div class="py-2 px-3 border-t border-slate-200 bg-slate-50">
                <ul class="flex items-center justify-between">
                  <li>
                    <button
                      class="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                      @click="clearFilters"
                    >
                      Clear
                    </button>
                  </li>
                  <li>
                    <button
                      class="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                      @click="applyFilters"
                      @focusout="dropdownOpen = false"
                    >
                      Apply
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Dropdown -->

      <div class="relative">
        <button
          ref="trigger"
          class="btn justify-between min-w-44 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
          aria-label="Select date range"
          aria-haspopup="true"
          @click.prevent="dropdownOpen1 = !dropdownOpen1"
          :aria-expanded="dropdownOpen1"
        >
          <span class="flex items-center">
            <svg
              class="w-4 h-4 fill-current text-slate-500 shrink-0 mr-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"
              />
            </svg>
            <span>{{ options[selected1].period }}</span>
          </span>
          <svg
            class="shrink-0 ml-1 fill-current text-slate-400"
            width="11"
            height="7"
            viewBox="0 0 11 7"
          >
            <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
          </svg>
        </button>
        <transition
          enter-active-class="transition ease-out duration-100 transform"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-out duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="dropdownOpen1"
            class="z-10 absolute top-full right-0 w-full bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
          >
            <div
              ref="dropdown"
              class="font-medium text-sm text-slate-600"
              @focusin="dropdownOpen1 = true"
              @focusout="dropdownOpen1 = false"
            >
              <button
                v-for="option in options"
                :key="option.id"
                class="flex items-center w-full hover:bg-slate-50 py-1 px-3 cursor-pointer"
                :class="option.id === selected1 && 'text-indigo-500'"
                @click="selectedDatefilter(option.id)"
              >
                <svg
                  class="shrink-0 mr-2 fill-current text-indigo-500"
                  :class="option.id !== selected1 && 'invisible'"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                >
                  <path
                    d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"
                  />
                </svg>
                <span>{{ option.period }}</span>
              </button>
            </div>
          </div>
        </transition>
      </div>

      <!-- Add order button -->
    </div>
  </div>

  <div class="bg-white shadow-lg rounded-sm border border-slate-200 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800">
        All Quotes
        <span class="text-slate-400 font-medium">{{ totalResult }}</span>
      </h2>
    </header>
    <div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full divide-y divide-slate-200">
          <!-- Table header -->
          <thead
            class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-slate-200"
          >
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                  <label class="inline-flex">
                    <span class="sr-only">Select all</span>
                    <input
                      class="form-checkbox"
                      type="checkbox"
                      v-model="selectAll"
                      @click="checkAll"
                    />
                  </label>
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">insuranceType</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">coverage</div>
              </th>

              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Duration</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Status</div>
              </th>

              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Created date</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Last Update</div>
              </th>

              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold">Vehicle</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <QuotesTableItem
            v-for="quote in quotes"
            :key="quote.id"
            :quote="quote"
            v-model:selected="selected"
            :value="quote.id"
          />
        </table>
      </div>
    </div>
  </div>
  <div class="mt-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav
        class="mb-4 sm:mb-0 sm:order-1"
        role="navigation"
        aria-label="Navigation"
      >
        <ul class="flex justify-center">
          <li class="ml-3 first:ml-0">
            <a
              class="btn bg-white border-slate-200"
              :class="{
                'text-slate-300 cursor-not-allowed': page === 1,
                'hover:border-slate-300 text-indigo-500': page != 1,
              }"
              @click.prevent="prevPage"
              >&lt;- Previous</a
            >
          </li>
          <li class="ml-3 first:ml-0">
            <a
              class="btn bg-white border-slate-200"
              :class="{
                'text-slate-300 cursor-not-allowed': page >= lastPage,
                'hover:border-slate-300 text-indigo-500': page < lastPage,
              }"
              @click.prevent="nextPage"
              >Next -&gt;</a
            >
          </li>
        </ul>
      </nav>
      <div class="text-sm text-slate-500 text-center sm:text-left">
        Showing <span class="font-medium text-slate-600">{{ page }}</span> to
        <span class="font-medium text-slate-600">{{ lastPage }}</span> of
        <span class="font-medium text-slate-600">{{ totalResult }}</span>
        results
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import QuotesTableItem from "./QuotesTableItem.vue";
import FilterButton from "@/components/DropdownFilter.vue";
import DateSelect from "@/components/DateSelect.vue";
import moment from "moment";
import { useStore } from "vuex";

export default {
  name: "QuotesTable",
  components: {
    QuotesTableItem,
    FilterButton,
    DateSelect,
  },
  props: ["selectedItems"],
  setup(props, { emit }) {
    const store = useStore();
    const allUsers = ref([]);
    const selectAll = ref(false);
    const selected = ref([]);
    const selected1 = ref(2);
    const quotes = ref([]);
    const totalResult = ref(0);
    const lastPage = ref(0);
    const perPage = ref(5);
    const page = ref(1);
    const searchTerm = ref([]);
    const quoteList = ref([]);
    const dropdownOpen1 = ref(false);

    const dropdownOpen = ref(false);
    const trigger = ref(null);
    const trigger1 = ref(null);
    const dropdown = ref(null);
    const dropdown1 = ref(null);
    const options = ref([
      {
        id: 0,
        period: "Today",
      },
      {
        id: 1,
        period: "Last 7 Days",
      },
      {
        id: 2,
        period: "Last Month",
      },
      {
        id: 3,
        period: "Last 12 Months",
      },
      {
        id: 4,
        period: "All Time",
      },
    ]);

    const filters = ref({
      subscriped: false,
      notSubscriped: false,
      basicInsurance: false,
      standardInsurance: false,
      premiumInsurance: false,
      liabilityCoverage: false,
      collisionCoverage: false,
      comprehensiveCoverage: false,
    });

    const clearFilters = () => {
      quotes.value = quoteList.value;

      quotes.value = quoteList.value.slice(
        (page.value - 1) * perPage.value,
        page.value * perPage.value
      ); // assign only the corresponding users to the current page

      totalResult.value = quoteList.value.length; // get the total users
      lastPage.value = Math.ceil(totalResult.value / perPage.value); // calculate the last page

      dropdownOpen.value = false;
    };

    const selectedDatefilter = (selected) => {
      selected1.value = selected;
      dropdownOpen1.value = false;

      let now = moment();
      let sevenDaysAgo = moment().subtract(7, "days");
      let oneMonthAgo = moment().subtract(1, "months");
      let twelveMonthsAgo = moment().subtract(12, "months");

      if (selected == "4") quotes.value = quoteList.value;
      else
        quotes.value = quoteList.value.filter((quote) => {
          let quoteCreationDate = moment(quote.createdAt);

          if (selected == "0" && quoteCreationDate.isSame(now, "day"))
            return true;
          if (
            selected == "1" &&
            quoteCreationDate.isAfter(sevenDaysAgo) &&
            quoteCreationDate.isBefore(now)
          )
            return true;
          if (
            selected == "2" &&
            quoteCreationDate.isAfter(oneMonthAgo) &&
            quoteCreationDate.isBefore(now)
          )
            return true;
          if (
            selected == "3" &&
            quoteCreationDate.isAfter(twelveMonthsAgo) &&
            quoteCreationDate.isBefore(now)
          )
            return true;
          if (selected == "4") quotes.value = quoteList.value;
        });
      totalResult.value = quotes.value.length;
      quotes.value = quotes.value.slice(
        (page.value - 1) * perPage.value,
        page.value * perPage.value
      ); // assign only the corresponding users to the current page
      // get the total users
      lastPage.value = Math.ceil(totalResult.value / perPage.value); // calculate the last page
    };

    const applyFilters = () => {
      quotes.value = quoteList.value;
      quotes.value = quotes.value.filter((quote) => {
        if (filters.value.subscribed && quote.insurancePremium) return true;
        if (filters.value.notSubscribed && !quote.insurancePremium) return true;
        if (!filters.value.notSubscribed && !filters.value.subscribed)
          return true;
        if (filters.value.notSubscribed && filters.value.subscribed)
          return true;
      });

      quotes.value = quotes.value.filter((quote) => {
        if (filters.value.basicInsurance && quote.coverage == "Basic")
          return true;
        if (filters.value.standardInsurance && quote.coverage == "Standard")
          return true;
        if (filters.value.premiumInsurance && quote.coverage == "Premium")
          return true;
        if (
          !filters.value.basicInsurance &&
          !filters.value.standardInsurance &&
          !filters.value.premiumInsurance
        )
          return true;
      });

      quotes.value = quotes.value.filter((quote) => {
        if (
          filters.value.liabilityCoverage &&
          quote.insuranceType == "Liability"
        )
          return true;
        if (
          filters.value.collisionCoverage &&
          quote.insuranceType == "Collision"
        )
          return true;
        if (
          filters.value.comprehensiveCoverage &&
          quote.insuranceType == "Comprehensive"
        )
          return true;
        if (
          !filters.value.liabilityCoverage &&
          !filters.value.collisionCoverage &&
          !filters.value.comprehensiveCoverage
        )
          return true;
      });

      totalResult.value = quotes.value.length;
      dropdownOpen.value = false;
    };

    // close on click outside
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen.value ||
        dropdown.value.contains(target) ||
        trigger.value.contains(target)
      )
        return;
      dropdownOpen.value = false;
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return;
      dropdownOpen.value = false;
    };

    const fetchQuotes = async () => {
      const id = store.getters["auth/id"];
      const token = store.getters["auth/token"];
      const response = JSON.parse(localStorage.getItem("quotes-list")) ?? await axios.get(
        `${import.meta.env.VITE_API_URL}/quote-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        if (!localStorage.getItem("claims-list")) {
          localStorage.setItem("claims-list", JSON.stringify(response));
        }
        allUsers.value = await response.data; // store all the users
        quotes.value = allUsers.value.slice(
          (page.value - 1) * perPage.value,
          page.value * perPage.value
        ); // assign only the corresponding users to the current page
      }

      totalResult.value = allUsers.value.length; // get the total users
      lastPage.value = Math.ceil(totalResult.value / perPage.value); // calculate the last page

      quoteList.value = response.data;
      /*
        totalResult.value=await response.data["hydra:totalItems"];
        if(response.data["hydra:view"]){
          lastPage.value=await response.data["hydra:view"]["hydra:last"].split("page=")[1];;
        }
        */
    };

    const searchCustomers = async () => {
      quotes.value = quoteList.value;

      if (searchTerm.value !== "")
        quotes.value = quoteList.value.filter((quote) => {
          const insuranceTypeLower = quote.insuranceType.toLowerCase();
          return insuranceTypeLower.includes(searchTerm.value);
        });
    };

    const checkAll = () => {
      selected.value = [];
      if (!selectAll.value) {
        selected.value = quotes.value.map((quote) => quote.id);
      }
    };

    watch(selected, () => {
      selectAll.value =
        quotes.value.length === selected.value.length ? true : false;
      emit("change-selection", selected.value);
    });

    function nextPage() {
      if (page.value < lastPage.value) {
        page.value++;
        quotes.value = allUsers.value.slice(
          (page.value - 1) * perPage.value,
          page.value * perPage.value
        ); // update the customers list according to the new page
      }
    }
    function prevPage() {
      if (page.value > 1) {
        page.value--;
        quotes.value = allUsers.value.slice(
          (page.value - 1) * perPage.value,
          page.value * perPage.value
        ); // update the customers list according to the new page
      }
    }

    onMounted(fetchQuotes);

    return {
      dropdownOpen,
      trigger,
      dropdown,
      filters,
      applyFilters,
      clearFilters,
      selectAll,
      selected,
      checkAll,
      quotes,
      fetchQuotes,
      nextPage,
      prevPage,
      lastPage,
      page,
      totalResult,
      searchTerm,
      searchCustomers,
      dropdownOpen1,
      trigger1,
      dropdown1,
      selected1,
      options,
      selectedDatefilter,
    };
  },
};
</script>
