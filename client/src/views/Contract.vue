<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main>
        <div class="lg:relative lg:flex">

          <!-- Content -->
          <div class="px-4 sm:px-6 lg:px-2 py-8 lg:grow lg:pr-4 xl:pr-4 2xl:ml-1">
            <div class=" lg:mx-10">

              <!-- Cart items -->
              <div class="mb-6 lg:mb-0">
                <header class="mb-6 flex w-full justify-between">
                  <!-- Title -->
                  <h1 class="text-2xl md:text-3xl text-slate-800 font-bold mb-2"><i class="fas fa-file-contract"></i> Contract Detail ✨ </h1>
                  <div>

                    <button class="btn border-slate-200 hover:border-slate-300 text-slate-600 mr-2" @click="modalOpen=true">
                        <svg class="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
                          <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                        </svg>
                        <span class="ml-2">Edit Contract</span>
                    </button>

                     <button class="btn border-slate-200 hover:border-slate-300 text-rose-500" @click="modaDeletelOpen=true">
                      <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                      </svg>
                      <span class="ml-2">Delete</span>
                    </button>
                  </div>
                    

                </header>
                <!-- Billing Information -->
                <!-- Cart items -->
            <div class="mb-6 lg:mb-0">

              <div class=" flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200  ">
              <button class="btn border-rose-500 hover:border-slate-300 text-rose-500" @click="modaDeletelOpen=true">
                      <span class="ml-2"><i class="fas fa-file-signature"></i> Create a claim</span>
                    </button>
                <header class="pr-10 pl-5 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 class="font-semibold text-slate-800"><i class="fas fa-file-contract"></i> Contract informations</h2>
                    <i class="far fa-edit cursor-pointer" @click="modalOpen=true"></i>
                </header>
                

                <div class="px-10  divide-y divide-slate-100 space-y-3">
                
                      <div >
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Status </div>
                          <div class="  "> <span class=" bg-emerald-100 text-emerald-600 font-medium rounded-full text-center px-2.5 py-1" >valid</span><span class="bg-amber-100 text-amber-600 font-medium rounded-full text-center px-2.5 py-1" >invalid</span> </div>
                        </div>
                      </div>

                      <div class="divide-y divide-slate-100">
                        <div class="flex justify-between text-sm m-3 divide-slate-100">
                          <div class="font-medium text-slate-800 mx-35">Quote Number </div>
                          <div class="">{{contract.dossierNumber}}</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Insurance Type</div>
                          <div class="">{{contract.insuranceType}}</div>
                        </div>
                      </div>

                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Price</div>
                          <div class="">{{contract.insurancePremium}}</div>
                        </div>
                      </div>

                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Coverage</div>
                          <div class="">{{contract.dossierNumber}}</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Coverage Duration</div>
                          <div class="">{{contract.coverageEndDate}} Months</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Coverage Start Date</div>
                          <div class="">{{contract.coverageStartDate}}</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Creating Date</div>
                          <div class="">{{contract.createdAt}}</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Last update </div>
                          <div class="">{{contract.updatedAt}}</div>
                        </div>
                      </div>
                      

                    </div>
                     

              </div>

            </div>
                
              </div>

            </div>
          </div>

          <!-- Sidebar -->
          <div>
            <div class="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[320px] xl:w-[352px] 2xl:w-[calc(352px+80px)] lg:h-[calc(100vh-64px)]">
              <div class="py-8 px-4 ">
                <div class="max-w-sm mx-auto lg:max-w-none">
                  <h2 class="text-2xl text-slate-800 font-bold mb-6">Related inforamtions</h2>
                  <div class="space-y-6">

                    <!-- Sidebar -->
            <div class="h-full px-5 py-2">
                  <!-- Details -->
                  <div class=" justify-center">
                    <div class="text-xs text-slate-500 font-semibold uppercase mb-3"><i class="fas fa-user"></i> Beneficiary</div>
                    <div class="divide-y divide-slate-300 m-3">
                      <div>
                        <div class="flex justify-between text-sm m-2">
                          <div class="text-slate-800">Name </div>
                          <div class="text-slate-400 italic">{{user.firstName}} {{user.firstName}}</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-2">
                          <div class="text-slate-800">Adresse</div>
                          <div class="text-slate-400 italic">{{user.postalAddress}}</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-2">
                          <div class="text-slate-800">Phone Number</div>
                          <div class="text-slate-400 italic">{{user.phoneNumber}}</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-2">
                          <div class="text-slate-800">Email</div>
                          <div class="text-slate-400 italic">{{user.email}}</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-2">
                          <div class="text-slate-800">License</div>
                          <div class="text-slate-400 italic"><i class="fas fa-download cursor-pointer" @click="downloadFile(user.permis)"></i></div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-2">
                          <div class="text-slate-800">Proof of adresse</div>
                          <div class="text-slate-400 italic"><i class="fas fa-download cursor-pointer" @click="downloadFile(user.justificatifDomicile)"></i></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

            <div>
              <!-- For contract component -->
                <div class="col-span-full bg-white shadow-lg rounded-sm border border-slate-200 px-5">
                
                    <header class=" py-4 border-b border-slate-100">
                      <h2 class="font-semibold text-slate-800"><i class="fas fa-money-check-alt"></i> Paiment History</h2>
                    </header>
                    <div class="p-3">

                      <!-- Table -->
                      <div class="overflow-x-auto">
                        <table class="table-auto w-full">
                          <!-- Table header -->
                          <thead class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                            <tr>
                              <th class=" whitespace-nowrap p-4">
                                <div class="font-semibold text-left">Transcation id</div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Paiment date</div>
                              </th>
                              <th class="p-2 whitespace-nowrap p-2">
                                <div class="font-semibold text-left">total</div>
                              </th>
                            </tr>
                          </thead>
                          <!-- Table body -->
                          <tbody class="text-sm font-medium divide-y divide-slate-100">
                            <!-- Row -->
                            <tr >
                              <td class="p-2 whitespace-nowrap md:w-1/2 p-3">
                                <div class="flex items-center">
                                  <div>
                                    <div class="text-slate-800 uppercase">#12345</div>
                                  </div>
                                </div>
                              </td>
                              <td class="p-2 whitespace-nowrap">
                                <div class="font-normal text-left">33.94B</div>
                              </td>
                              <td class="p-2 whitespace-nowrap">
                                <div class="text-left text-emerald-500">+$12.20</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
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
import { ref } from 'vue'
import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import axios from 'axios'


export default {
  name: 'Contract',
  components: {
    Sidebar,
    Header,
  },
  data() {
        return {
            contract: null,
            user:null
        }
  },
   methods:{

      downloadFile( file){
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

    const sidebarOpen = ref(false)

    return {
      sidebarOpen,
    }  
  },
  async created() {

        const id = document.URL.substring(document.URL.lastIndexOf('/') + 1); 


        const token = this.$store.getters["auth/token"]
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/insurance/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        /*if(response.data["hydra:member"]){
          customers.value = await response.data["hydra:member"];
        }*/
        

        if(response.data){
          this.contract=response.data
        }  

      
        /*
        this.formData.insuranceType= this.quote.insuranceType
        this.formData.coverage= this.quote.coverage
        this.formData.coverageDuration= this.quote.coverageDuration
        this.formData.coverageStartDate=(this.processDate(this.quote.coverageStartDate))

        */
        const response1 = await axios.get(`http://localhost:3000/beneficiary/${this.contract.beneficiary}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        /*if(response.data["hydra:member"]){
          customers.value = await response.data["hydra:member"];
        }*/
        
        if(response1.data){
          this.user=response1.data
          console.log(this.user)
        } 

    }
}
</script>