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
        <div class="lg:relative lg:flex">
          <!-- Content -->
          <div
            v-if="claim"
            class="px-4 sm:px-6 lg:px-2 py-8 lg:grow lg:pr-4 xl:pr-4 2xl:ml-1"
          >
            <div class="lg:mx-10">
              <!-- Cart items -->
              <div class="mb-6 lg:mb-0">
                <header class="mb-6 w-full">
                  <!-- Title -->
                  <h1
                    class="text-2xl md:text-3xl text-slate-800 font-bold mb-2"
                  >
                    <i class="fas fa-file-claim"></i> Claim n°{{ claim._id }}✨
                    <button
                      v-if="role && role == 'Admin' && claim.status == 0"
                      class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      <router-link
                        :to="{
                          name: 'decide_claim',
                          params: { id: claim._id },
                        }"
                      >
                        Review
                      </router-link>
                    </button>
                  </h1>
                  <small
                    class="ms-2 inline-flex font-medium rounded-full text-center px-2.5 py-0.5"
                    :class="statusColor(claim.status)"
                    >{{ statusLabels(claim.status) }}</small
                  >
                </header>
                <div class="lg:mx-10">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div
                        class="ms-5 text-xl md:text-xl text-slate-800 font-bold mb-5"
                      >
                        <h1>Client's information</h1>
                      </div>
                      <div class="ms-5">
                        <b>{{ claim.title }}</b>
                      </div>
                      <div class="ms-5 mt-4">
                        <p>Description : {{ claim.description }}</p>
                      </div>
                      <div class="ms-5 mt-4">
                        <p>Reason : {{ claim.reason }}</p>
                      </div>

                      <div class="text-slate-400 italic ms-5 mt-4">
                        <i
                          class="fas fa-download cursor-pointer"
                          @click="downloadFile(claim.proof)"
                        ></i>
                        Download proof
                      </div>
                      <div class="ms-5 mt-4">
                        <small
                          >Created at {{ formatDate(claim.createdAt) }}</small
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="claim">
            <div
              class="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[520px] xl:w-[552px] 2xl:w-[calc(552px+80px)] lg:h-[calc(100vh-64px)]"
            >
              <div class="py-8 px-4">
                <div class="max-w-sm mx-auto lg:max-w-none">
                  <h2 class="text-2xl text-slate-800 font-bold mb-6">
                    Insurance's decision
                  </h2>
                  <div class="space-y-6">
                    <!-- Sidebar -->

                    <div v-if="claim.decision" class="h-full px-5 py-2">
                      <!-- Details -->
                      <div class="justify-center">
                        <div
                          class="text-xs text-slate-500 font-semibold uppercase mb-3"
                        >
                          <i class="fas fa-user"></i>
                          Response from an administator
                        </div>
                        <div class="divide-y divide-slate-300 m-3">
                          <div>
                            <div class="m-2 mt-5">
                              <div class="text-slate-800 font-semibold">
                                Decision
                              </div>
                              <div class="text-slate-400">
                                <span
                                  class="inline-flex text-md rounded-full text-center px-2.5 py-0.5"
                                  :class="statusColor(claim.status)"
                                  >{{ statusLabels(claim.status) }}</span
                                >
                                - {{ claim.decision }}
                              </div>
                            </div>
                            <div class="m-2 mt-5">
                              <div class="text-slate-800 font-semibold">
                                Additional information
                              </div>
                              <div
                                v-if="claim.additionalInfo"
                                class="text-slate-400 italic"
                              >
                                {{ claim.additionalInfo }}
                              </div>
                              <div v-else>None</div>
                            </div>
                            <hr class="mt-5" />
                            <p v-if="claim.status == '1'" class="mt-5">
                              Please contact us as soon as possible to begin the
                              decision process.
                            </p>
                            <p v-else class="mt-5">
                              Please contact us if you would like to get
                              addiotional information for this decision.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <p>
                        No decision yet. Please wait for us to analyze and
                        decide.
                      </p>
                      <button
                        class="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-4"
                      >
                        <router-link :to="{ name: 'claims' }">
                          <i class="fas fa-arrow-left"></i> Claims
                        </router-link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import axios from "axios";
import moment from "moment/moment";
import Banner from "@/components/Banner.vue";
import { useStore } from "vuex";

export default {
  name: "Claim",
  components: {
    Banner,
    Sidebar,
    Header,
  },
  setup() {
    function formatDate(dateString) {
      return moment(dateString).format("YYYY-MM-DD");
    }

    const sidebarOpen = ref(false);

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

    return {
      sidebarOpen,
      formatDate,
      statusLabels,
      statusColor,
    };
  },
  data() {
    return {
      claim: null,
      user: null,
      role: null,
    };
  },
  async created() {
    const store = useStore();
    const token = store.getters["auth/token"];
    if (!token) {
      this.$router.push({ name: "home" });
    }

    this.role = store.getters["auth/roles"];
    const id = document.URL.substring(document.URL.lastIndexOf("/") + 1);

    let response = null;
    try {
      response = await axios.get(
          `${import.meta.env.VITE_API_URL}/claims/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      localStorage.setItem("claim-data", JSON.stringify(response));
    }
    catch(e) {
      response = JSON.parse(localStorage.getItem("claim-data"))
    }

    if (response.data) {
      this.claim = response.data;
    }

    if (
      this.role == "User" &&
      this.claim.userMail != store.getters["auth/email"]
    ) {
      this.$router.push({ name: "claims" });
    }
  },
  methods: {
    downloadFile(file) {
      const byteArray = new Uint8Array(file.data);

      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create a URL for the blob and download it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target", "_blank"); // Open in new tab
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>
