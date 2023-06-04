<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-5">
          
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Quote Detail ✨</h1>
            </div>

            <!-- Right: Actions -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

            <button class="btn border-slate-200 hover:border-slate-300 text-slate-600">
                      <svg class="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
                        <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                      </svg>
                      <span class="ml-2">Edit Quote</span>
            </button>

            <button class="btn border-slate-200 hover:border-slate-300 text-rose-500">
                      <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                      </svg>
                      <span class="ml-2">Delete</span>
            </button>

              <!-- Add account button -->
              <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="hidden xs:block ml-2">Souscrire</span>
              </button>

              

            </div>

          </div>

          <!-- Cards -->
          <div class="grid grid-cols-12 gap-5">

            <!-- User detail -->

              <div class="flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
                <div class="px-5 py-2">
                      <div>
                        <div class="mb-2 "><strong class="text-1xl text-slate-800">User info</strong> </div>
                      </div>
                  <div class="">
                    <!-- Left side -->
                    <div class="flex items-center mb-4 md:mb-0">
                      <!-- Avatar -->
                      <div class="mr-4">
                        <img class="inline-flex rounded-full" src="@/images/useravatar.png" width="64" height="64" alt="User" />
                      </div>
                      <!-- User info -->

                      <table class="table-auto w-full">
                                      <!-- Table header -->
                                      <thead class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                                        <tr>
                                          <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">First Name | Last Name</div>
                                          </th>
                                          
                                          <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">email</div>
                                          </th>
                                          <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">phoneNumber</div>
                                          </th>
                                          <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">adresse</div>
                                          </th>
                                          <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left">Age</div>
                                          </th>
                                          <th class="p-2 whitespace-nowrap">
                                            <div class="font-semibold text-left ">Status</div>
                                          </th>
                                        </tr>
                                      </thead>
                                      <!-- Table body -->
                                      <tbody class="text-sm font-medium divide-y divide-slate-100">
                                        <!-- Row -->
                                        <tr>
                                          <td class="p-2 whitespace-nowrap ">
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
                                            <div class="font-normal text-left">33.94B</div>
                                          </td>
                                          <td class="p-2 whitespace-nowrap">
                                            <div class="font-normal text-left">33.94B</div>
                                          </td>                              
                                          <td class="p-2 whitespace-nowrap">
                                            <div class="text-left ">35 yo</div>
                                          </td>
                                          <td class="p-2 whitespace-nowrap">
                                            <div class="text-left text-emerald-500"><span class=" bg-emerald-100 text-emerald-600 font-medium rounded-full text-center px-2.5 py-1">Actif</span><span class="bg-amber-100 text-amber-600 font-medium rounded-full text-center px-2.5 py-1">Inactif</span></div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                    </div>
                  </div>

                </div>
              </div>


          <!-- quote info -->


            <div class=" flex flex-col col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200  ">
                <header class="px-5 py-4 border-b border-slate-100 flex items-center">
                    <h2 class="font-semibold text-slate-800">Quote informations</h2>
                </header>

                <div class="px-10  divide-y divide-slate-100 space-y-3">
                
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Status </div>
                          <div class="  "> <span class=" bg-emerald-100 text-emerald-600 font-medium rounded-full text-center px-2.5 py-1">Subscriped</span><span class="bg-amber-100 text-amber-600 font-medium rounded-full text-center px-2.5 py-1">Unsubscriped</span> </div>
                        </div>
                      </div>

                      <div class="divide-y divide-slate-100">
                        <div class="flex justify-between text-sm m-3 divide-slate-100">
                          <div class="font-medium text-slate-800">Quote Number </div>
                          <div class="">$780,00 <span class="text-slate-500">/</span> $1,500.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Insurance Type</div>
                          <div class="">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>

                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Coverage</div>
                          <div class="">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Coverage Duration</div>
                          <div class="">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Coverage Start Date</div>
                          <div class="">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Creating Date</div>
                          <div class="">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-3">
                          <div class="font-medium text-slate-800">Last update </div>
                          <div class="">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      

                    </div>

              </div>

            <!-- Quote detail -->
            <div class=" xl:col-span-6 bg-gradient-to-b from-slate-700 to-slate-800 shadow-lg rounded-sm border border-slate-800">
                <header class="px-5 py-4 border-b border-slate-600 flex items-center">
                  <h2 class="font-semibold text-slate-200">Vehicle informations</h2>
                </header>
                <div class="h-full px-5 py-2">
                  <!-- Details -->
                  <div class=" justify-center">
                    <div class="text-xs text-slate-500 font-semibold uppercase mb-3">Details</div>
                    <div class="divide-y divide-slate-300 m-3">
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">Vehicle type </div>
                          <div class="text-slate-400 italic">$780,00 <span class="text-slate-500">/</span> $1,500.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">Brand</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">Model</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">Horsepower</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">License Plate</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">License Obtained Date</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">Vehicle Circulation Date</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">Registration Card Holder</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">registrationCardDate</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">Purshace type</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm m-1">
                          <div class="text-slate-300">Annual Mileage</div>
                          <div class="text-slate-400 italic">$179,00 <span class="text-slate-500">/</span> $1,000.00</div>
                        </div>
                      </div>
                      

                    </div>
                  </div>
                </div>
              </div>


            <div class="col-span-full bg-white shadow-lg rounded-sm border border-slate-200 mx-8">
                <div class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300" >
                            <div class="md:flex justify-between items-center space-y-4 md:space-y-0 space-x-2">
                                <!-- Left side -->
                                <div class="flex items-start space-x-3 md:space-x-4">
                                    <div class="w-9 h-9 shrink-0 mt-1">
                                        <img class="w-9 h-9 rounded-full"  src="@/images/pdf.png" width="36" height="36"  />
                                    </div>
                                    <div>
                                        Carte Grise file : 
                                        <div class="text-sm">{{caretCrise}}</div>
                                    </div>
                                </div>
                                
                                          <div class="flex items-center space-x-4 pl-10 md:pl-0">
                                                <button >
                                        
                                                </button>
                                            </div>

                            </div>
                </div>
              </div>



            

            <!-- For contract component -->
                <div class="col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
                
                    <header class="px-5 py-4 border-b border-slate-100">
                      <h2 class="font-semibold text-slate-800">Paiment History</h2>
                    </header>
                    <div class="p-3">

                      <!-- Table -->
                      <div class="overflow-x-auto">
                        <table class="table-auto w-full">
                          <!-- Table header -->
                          <thead class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                            <tr>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Transcation id</div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Paiment date</div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">total</div>
                              </th>
                              <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Status</div>
                              </th>
                            </tr>
                          </thead>
                          <!-- Table body -->
                          <tbody class="text-sm font-medium divide-y divide-slate-100">
                            <!-- Row -->
                            <tr>
                              <td class="p-2 whitespace-nowrap md:w-1/2">
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
                              <td class="p-2 whitespace-nowrap">
                                <div class="text-left">$43.07</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

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

export default {
  name: 'Quote',
  components: {
    Sidebar,
    Header
  },
  setup() {

    const sidebarOpen = ref(false)

    return {
      sidebarOpen,
    }  
  }
}
</script>