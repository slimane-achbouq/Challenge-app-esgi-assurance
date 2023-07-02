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
        <Banner type="success" class="mb-4" :open="deleted" v-if="deleted">
          Quote(s) deleted successfully .
        </Banner>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
                <i class="fas fa-file-contract"></i> Quotes ✨
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
              <!-- Delete button -->
              <DeleteButton
                :selectedItems="selectedItems"
                @click="onModaDeletelOpen"
              />
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
                  <span class="hidden xs:block ml-2">Create Quote</span>
                </button>
              </router-link>
            </div>
          </div>

          <!-- Table -->
          <QuotesTable @change-selection="updateSelectedItems($event)" />
        </div>

        <ModalBasic id="danger-modal" :modalOpen="modaDeletelOpen">
          <div class="p-5 flex w-full space-x-4">
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100"
            >
              <svg
                class="w-4 h-4 shrink-0 fill-current text-rose-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"
                />
              </svg>
            </div>
            <!-- Content -->
            <div>
              <!-- Modal header -->
              <div class="mb-2">
                <div class="text-lg font-semibold text-slate-800">
                  Delete Quote?
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="">
                  <p>Are you sure you want to delete the quote?</p>
                </div>
              </div>
              <!-- Modal footer -->
            </div>
          </div>

          <div class="flex flex-wrap justify-end space-x-2 m-6">
            <button
              class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              @click.stop="modaDeletelOpen = false"
            >
              Cancel
            </button>
            <button
              class="btn-sm bg-rose-500 hover:bg-rose-600 text-white"
              @click="deleteItem"
            >
              Yes, Delete it
            </button>
          </div>
        </ModalBasic>
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
import QuotesTable from "@/partials/userquotes/QuotesTable.vue";
import PaginationClassic from "@/components/Pagination.vue";
import ModalBasic from "@/components/Modal.vue";
import { useStore } from "vuex";
import Banner from "@/components/Banner.vue";
import axios from "axios";

export default {
  name: "UserQuotes",
  components: {
    Sidebar,
    Header,
    DeleteButton,
    DateSelect,
    FilterButton,
    QuotesTable,
    PaginationClassic,
    ModalBasic,
    Banner,
  },
  setup() {
    const store = useStore();
    const sidebarOpen = ref(false);
    const selectedItems = ref([]);
    const modaDeletelOpen = ref(false);
    const deleted = ref(false);

    const updateSelectedItems = (selected) => {
      selectedItems.value = selected;
    };

    function onModaDeletelOpen(selected) {
      modaDeletelOpen.value = true;
    }

    async function deleteItem() {
      const token = store.getters["auth/token"];
      for (let i = 0; i < selectedItems.value.length; i++) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/quote/${this.selectedItems[i]}`,
            {
              headers: {
                Authorization: `Bearer ${store.getters["auth/token"]}`,
              },
            }
          );
        } catch (e) {
          console.log(e);
          modaDeletelOpen.value = false;
          deleted.value = false;
        }
      }

      modaDeletelOpen.value = false;
      deleted.value = true;
    }

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      onModaDeletelOpen,
      modaDeletelOpen,
      deleteItem,
      deleted,
    };
  },
};
</script>
