<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false"/>

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"/>

      <main>
        <div class="lg:relative lg:flex">

          <!-- Content -->
          <div class="px-4 sm:px-6 lg:px-2 py-8 lg:grow lg:pr-4 xl:pr-4 2xl:ml-1" v-if="claim">
            <div class=" lg:mx-10">

              <!-- Cart items -->
              <div class="mb-6 lg:mb-0">
                <header class="mb-6 flex w-full justify-between">
                  <!-- Title -->
                  <h1 class="text-2xl md:text-3xl text-slate-800 font-bold mb-2"><i class="fas fa-file-claim"></i>
                    Claim n°{{ claim._id }} - {{ claim.status }}✨ </h1>
                </header>

                <hr class="my-6 border-t border-slate-200">

                <div class="mb-6 lg:mb-0">
                  <div>
                    <div class="ms-5"><b>{{ claim.title }}</b></div>
                    <div class="ms-5 mt-4">
                      <p>Description : {{ claim.description }}</p>
                    </div>
                    <div class="ms-5 mt-4">
                      <p>Reason : {{ claim.reason }}</p>
                    </div>

                    <div class="text-slate-400 italic ms-5 mt-4">
                      <i class="fas fa-download cursor-pointer" @click="downloadFile(claim.proof)"></i>Download proof
                    </div>

                    <div class="ms-5 mt-4">
                      <small>Created at {{ formatDate(claim.createdAt) }}</small>
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
import {ref} from 'vue'
import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import axios from 'axios'
import pako from 'pako';
import moment from "moment/moment";

export default {
  name: 'Claim',
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      claim: null,
      user: null,
    }
  },
  methods: {

    downloadFile(file) {
      const byteArray = new Uint8Array(file.data);

      const blob = new Blob([byteArray], {type: 'application/pdf'});

      // Create a URL for the blob and download it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('target', '_blank'); // Open in new tab
      document.body.appendChild(link);
      link.click();
    },
  },
  setup() {
    function formatDate(dateString) {
      return moment(dateString).format('YYYY-MM-DD');
    }

    const sidebarOpen = ref(false)

    return {
      sidebarOpen,
      formatDate
    }
  },
  async created() {

    const id = document.URL.substring(document.URL.lastIndexOf('/') + 1);


    const token = this.$store.getters["auth/token"]
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/claims/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.claim = response.data;
  }
}
</script>