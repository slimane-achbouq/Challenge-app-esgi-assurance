<template>
  <tbody class="text-sm">
    <!-- Row -->
    <tr>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div
          class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5"
          :class="statusColor(claim.status)"
        >
          {{ statusLabels(claim.status) }}
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="flex items-center text-slate-800">
          <router-link :to="{ name: 'claim', params: { id: claim._id } }">
            <div class="font-medium text-sky-500">{{ claim._id }}</div>
          </router-link>
        </div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <router-link
          :to="{ name: 'contract', params: { id: claim.insurance_id } }"
        >
          <div class="font-medium text-emerald-500">
            {{ claim.insurance_id }}
          </div>
        </router-link>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="font-medium text-slate-800">{{ claim.title }}</div>
      </td>
      <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div
          class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5 bg-slate-100 text-slate-500"
        >
          {{ formatDate(claim.createdAt) }}
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { ref, computed } from "vue";
import moment from "moment";

export default {
  name: "ClaimsTableItem",
  props: ["claim", "value", "selected"],
  setup(props, context) {
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

    const statusLabels = (status) => {
      switch (status) {
        case "0":
          return "Pending review";
        case "1":
          return "Approved";
        case "2":
          return "Rejected";
        default:
          return "Unknown status";
      }
    };

    const statusColor = (status) => {
      switch (status) {
        case "1":
          return "bg-emerald-100 text-emerald-600";
        case "2":
          return "bg-rose-100 text-rose-600";
        default:
          return "bg-amber-100 text-amber-500";
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
      statusLabels,
    };
  },
};
</script>
