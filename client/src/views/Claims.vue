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
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
                <i class="fas fa-file-contract"></i> Claims ✨
              </h1>
            </div>
          </div>

          <!-- Table -->
          <ClaimsTable @change-selection="updateSelectedItems($event)" />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import DateSelect from "@/components/DateSelect.vue";
import FilterButton from "@/components/DropdownFilter.vue";
import PaginationClassic from "@/components/Pagination.vue";
import ClaimsTable from "@/partials/claims/ClaimsTable.vue";

export default {
  name: "Claims",
  components: {
    ClaimsTable,
    Sidebar,
    Header,
    DeleteButton,
    DateSelect,
    FilterButton,
    PaginationClassic,
  },
  setup() {
    const sidebarOpen = ref(false);
    const selectedItems = ref([]);

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected;
    };

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
    };
  },
};
</script>
