<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="flex items-center">
        <label class="inline-flex">
          <span class="sr-only">Select</span>
          <input
            :id="customer['_id']"
            class="form-checkbox"
            type="checkbox"
            :value="value"
            :checked="checked"
            @change="check"
          />
        </label>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <router-link
          :to="{ name: 'user-profile', params: { id: customer['_id'] } }"
        >
          <div class="font-medium text-slate-800">
            {{ customer.firstname }} {{ customer.lastname }}
          </div>
        </router-link>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">{{ customer.email }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-left">
        {{ customer.city }},{{ customer.city }},{{ customer.codeCity }}
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{ customer.phoneNumber }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center font-medium text-sky-500">
        <span v-if="customer.isValide == true">Verified</span
        ><span v-if="customer.isValide !== true">Not verified</span>
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{ calculateAge(customer.age) }} yo</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{ formatDate(customer.updatedAt) }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center font-medium text-emerald-500">
        {{ formatDate(customer.created) }}
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="text-center">{{ customer.roles[0] }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <!-- Menu button -->
      <button
        class="text-slate-400 hover:text-slate-500 rounded-full"
        @click="edit"
      >
        <span class="sr-only">Edit</span>
        <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
          <path
            d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z"
          />
        </svg>
      </button>
    </td>
  </tr>
</template>

<script>
import { computed } from "vue";
import moment from "moment";

export default {
  name: "UsersTableItem",
  props: ["customer", "value", "selected"],
  setup(props, context) {
    const checked = computed(() => props.selected.includes(props.value));

    function edit() {
      context.emit("edit", props.customer);
    }

    function formatDate(dateString) {
      return moment(dateString).format("YYYY-MM-DD");
    }

    function calculateAge(birthDateString) {
      const birthDate = moment(birthDateString);
      const now = moment();
      return now.diff(birthDate, "years");
    }

    function check() {
      let updatedSelected = [...props.selected];
      if (this.checked) {
        updatedSelected.splice(updatedSelected.indexOf(props.value), 1);
      } else {
        updatedSelected.push(props.value);
      }
      context.emit("update:selected", updatedSelected);
    }

    return {
      check,
      checked,
      edit,
      formatDate,
      calculateAge,
    };
  },
};
</script>
