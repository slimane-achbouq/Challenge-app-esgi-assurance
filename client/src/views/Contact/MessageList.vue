<template>
    <div class="flex h-screen overflow-hidden">
  
      <!-- Sidebar -->
      <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />
  
      <!-- Content area -->
      <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
  
        <!-- Site header -->
        <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
  
        <main>
          <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">    
            <!-- Left: Title -->
            <div class="flex mb-4 sm:mb-0">
                <h1 class=" text-2xl md:text-3xl text-slate-800 font-bold">Messages List</h1>
              </div>     
          </div>

          <!-- Group 1 -->
            <div class="space-y-6">
                <div class="space-y-2">

                  <!-- Task :class="['opacity-60']" -->
                    <div v-for="(message, idx) in messages" :key="idx">
                        <div class="bg-white shadow-lg rounded-sm border border-slate-200 p-4" :class="[message.isValide ? 'opacity-60' : '']" draggable="true">
                            <div class="sm:flex sm:justify-between sm:items-start">
                            <!-- Left side -->
                                <div class="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
                                    <div class="flex items-center">
                                        <!-- Checkbox button -->
                                        <label class="flex items-center">
                                            <input type="checkbox" :id="message._id" class="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full" @click="setMessage(message._id)" :checked="message.isValide"/>
                                            <span class="font-medium text-slate-800 peer-checked:line-through ml-2" for="jack">{{ message.firstname }} {{ message.lastname }}</span>
                                        </label>
                                    </div>
                                <div class="space-y-2">
                                        <div class="text-sm"> Email: <span class="text-sm text-slate-500">{{ message.email }}</span></div>
                                        <div class="text-sm"> Object: <span class="text-sm text-slate-500"></span>{{ message.object }}</div>
                                        <div class="text-sm"> Message: <span class="text-sm text-slate-500"></span>{{ message.message }}</div>
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
  import { ref, onMounted, } from 'vue'
  import Sidebar from '@/partials/Sidebar.vue'
  import Header from '@/partials/Header.vue'
  import { useStore } from 'vuex';
  
  
  export default {
    name: 'UserList',
    components: {
      Sidebar,
      Header,
    },
    setup() {
    const store = useStore();
    const sidebarOpen = ref(false);
    const messages = ref([]);

    // Fetch messages from the store before the component is mounted
    onMounted(async () => {
      await fetchMessages();
    });

    // Fetch messages from the store
    async function fetchMessages() {
      try {
        const fetchedMessages = await store.dispatch('auth/getContactMessages');
        messages.value = fetchedMessages;
      } catch (error) {
        console.log(error);
      }
    }

    // Update the message and refetch the messages
    async function setMessage(id) {
      const actionPayload = {
        id: id,
      };
      try {
        const response = await store.dispatch('auth/validateMessage', actionPayload);
        const responseData = await response.json();

        // Perform any necessary actions with the response data

        await fetchMessages();
      } catch (error) {
        console.log(error);
      }
    }

    return {
      sidebarOpen,
      messages,
      setMessage,
    };
  },
    
  }
  </script>
  