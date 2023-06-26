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
                <i class="fas fa-file-contract"></i> Contracts ✨
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
              <!-- Delete button -->
              <DeleteButton :selected-items="selectedItems" />
              <!-- Add order button -->

              <router-link to="/newquote">
                <button
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <svg
                    class="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                    />
                  </svg>
                  <span class="hidden xs:block ml-2">Claim</span>
                </button>
              </router-link>
            </div>
          </div>

          <!-- Table -->
          <ContractsTable @change-selection="updateSelectedItems($event)" />
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
import ContractsTable from "@/partials/contracts/ContractsTable.vue";
import PaginationClassic from "@/components/Pagination.vue";

export default {
  name: "Contracts",
  components: {
    Sidebar,
    Header,
    DeleteButton,
    DateSelect,
    FilterButton,
    ContractsTable,
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
