<template>
  <tbody class="text-sm">
    <!-- Row -->
    <tr>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div class="flex items-center">
          <label class="inline-flex">
            <span class="sr-only">Select</span>
            <input
              :id="quote.id"
              class="form-checkbox"
              type="checkbox"
              :value="value"
              @change="check"
              :checked="checked"
            />
          </label>
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="flex items-center text-slate-800">
          <router-link :to="{ name: 'quote', params: { id: quote.id } }">
            <div class="font-medium text-sky-500">{{ quote.quoteNumber }}</div>
          </router-link>
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div v-if="customer">
          {{ customer.firstname }} {{ customer.lastname }}
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="font-medium text-slate-800">{{ quote.insuranceType }}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="text-left font-medium text-emerald-500">
          {{ quote.coverage }}
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div
          class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5"
          :class="statusColor(quote.createdAt)"
        >
          {{ formatDate(quote.createdAt) }}
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="text-center">{{ quote.coverageDuration }} Month</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="flex items-center">
          <div v-html="typeIcon(quote.insuranceId)"></div>
          <div v-if="quote.insuranceId">Subscriped</div>
          <div v-if="!quote.insuranceId">Not subscriped</div>
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div class="flex items-center">
          <button
            class="text-slate-400 hover:text-slate-500 transform"
            :class="descriptionOpen && 'rotate-180'"
            :aria-expanded="descriptionOpen"
            @click.prevent="descriptionOpen = !descriptionOpen"
            :aria-controls="`description-${quote.id}`"
          >
            <span class="sr-only">Menu</span>
            <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
    <!--
    Example of content revealing when clicking the button on the right side:
    Note that you must set a "colSpan" attribute on the <td> element,
    and it should match the number of columns in your table
    -->
    <tr
      :id="`description-${quote.id}`"
      role="region"
      :class="!descriptionOpen && 'hidden'"
    >
      <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
        <div class="flex items-center bg-slate-200 p-3 -mt-3">
          <table class="table-auto w-full divide-y divide-slate-200">
            <!-- Table header -->
            <thead
              class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-slate-200"
            >
              <tr>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">vehicleType</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">brand</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">model</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">horsepower</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">annualMileage</div>
                </th>
                <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="font-semibold text-left">licensePlate</div>
                </th>
              </tr>
            </thead>

            <tbody class="text-sm">
              <!-- Row -->
              <tr>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="flex items-center text-slate-800">
                    <div class="font-medium text-sky-500">
                      {{ quote.vehicle.vehicleType }}
                    </div>
                  </div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="flex items-center text-slate-800">
                    <div class="font-medium text-sky-500">
                      {{ quote.vehicle.brand }}
                    </div>
                  </div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="flex items-center text-slate-800">
                    <div class="font-medium text-sky-500">
                      {{ quote.vehicle.model }}
                    </div>
                  </div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="flex items-center text-slate-800">
                    <div class="font-medium text-sky-500">
                      {{ quote.vehicle.horsepower }} HP
                    </div>
                  </div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="flex items-center text-slate-800">
                    <div class="font-medium text-sky-500">
                      {{ quote.vehicle.annualMileage }} KM
                    </div>
                  </div>
                </td>
                <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div class="flex items-center text-slate-800">
                    <div class="font-medium text-sky-500">
                      {{ quote.vehicle.licensePlate }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { ref, computed } from "vue";
import moment from "moment";
import axios from "axios";

export default {
  name: "QuotesTableItem",
  props: ["quote", "value", "selected"],
  data() {
    return {
      customer: null,
    };
  },
  setup(props, context) {
    const quote = props.quote;

    const checked = computed(() => props.selected.includes(props.value));

    function check() {
      let updatedSelected = [...props.selected];
      if (this.checked) {
        updatedSelected.splice(updatedSelected.indexOf(props.value), 1);
      } else {
        updatedSelected.push(props.value);
      }
      context.emit("update:selected", updatedSelected);
    }

    function formatDate(dateString) {
      return moment(dateString).format("YYYY-MM-DD");
    }

    const descriptionOpen = ref(false);

    const statusColor = (status) => {
      switch (status) {
        case "Approved":
          return "bg-emerald-100 text-emerald-600";
        case "Refunded":
          return "bg-amber-100 text-amber-600";
        default:
          return "bg-slate-100 text-slate-500";
      }
    };

    const typeIcon = (type) => {
      switch (type) {
        case null:
          return `<svg class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" />
            </svg>`;
        default:
          return `<svg class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M11.4 0L10 1.4l2 2H8.4c-2.8 0-5 2.2-5 5V12l-2-2L0 11.4l3.7 3.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3l3.7-3.7L7.4 10l-2 2V8.4c0-1.7 1.3-3 3-3H12l-2 2 1.4 1.4 3.7-3.7c.4-.4.4-1 0-1.4L11.4 0z" />
            </svg>`;
      }
    };

    return {
      check,
      checked,
      statusColor,
      typeIcon,
      descriptionOpen,
      formatDate,
    };
  },

  async created() {
    const token = this.$store.getters["auth/token"];
    // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
    const response = JSON.parse(localStorage.getItem("admin-one-user")) ?? await axios.get(
      `${import.meta.env.VITE_API_URL}/getoneuser/${this.quote.userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    /*if(response.data["hydra:member"]){
          customers.value = await response.data["hydra:member"];
        }*/

    if (response.data) {
      if (!localStorage.getItem("admin-one-user")) {
        localStorage.setItem("admin-one-user", JSON.stringify(response));
      }
      this.customer = response.data;
    }
  },
};
</script>
