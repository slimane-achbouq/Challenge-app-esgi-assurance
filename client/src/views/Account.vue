<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      
      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main>

        <Banner type="warning" :open="true">
                              This user is not yet valid, click <a class="cursor-pointer text-blue-900/100"  @click="modaVlidateOpen=true"> here</a>  to validate the user
        </Banner>
        <div class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto" style="background-color:#F1F5F9">

          <!-- Page header -->
          <div class="mb-5 flex justify-between">
            <!-- Title -->
            <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Account Settings ✨</h1>
            <button class="btn border-slate-200 hover:border-slate-300 text-rose-500" @click="modaDeletelOpen=true">
                      <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                        <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                      </svg>
                      <span class="ml-2">Delete</span>
            </button>
          </div>

          <!-- Content --> 
          <div class="bg-white shadow-lg rounded-sm mb-5">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <SettingsSidebar />



                        
            <div class="grow">
              <!-- Panel body -->
              <div class="p-6 space-y-6">
                <!-- Picture -->
                <section>
                  <div class="flex items-center">
                    <div class="mr-4">
                      <img class="w-20 h-20 rounded-full" src="@/images/useravatar.png" width="80" height="80" alt="User upload" />
                    </div>

                    <div class="mr-4">
                      <p class="">Name :</p>
                      <span class="">Email :</span>
                    </div>
                    
                  </div>
                </section>

                <form>
                                                  <div class="space-y-2">
                                                      <!-- 1st row -->
                                                      <div class="md:flex space-y-1 md:space-y-0 md:space-x-4"
                                                          >
                                                          <div class="flex-1">
                                                              <label class="block text-sm font-medium mb-1" for="firstname">First
                                                                  Name</label>
                                                              <input id="firstname" class="form-input w-full" type="text"
                                                                    />
                                                              <div  class="text-xs mt-1 text-rose-500">
                                                                  
                                                              </div>
                                                          </div>
                                                          <div class="flex-1">
                                                              <label class="block text-sm font-medium mb-1" for="lastname">Last
                                                                  Name</label>
                                                              <input id="lastname" class="form-input w-full" type="text"
                                                                    />

                                                              <div v-if="true" class="text-xs mt-1 text-rose-500">
                                                                  zefzefe
                                                              </div>
                                                          </div>

                                                          <div class="flex-1">
                                                              <label class="block text-sm font-medium mb-1"
                                                                    for="address">E-mail:</label>
                                                              <input id="address" class="form-input w-full" type="text"
                                                                    />
                                                              <div  class="text-xs mt-1 text-rose-500">
                                                                  zaazdaz
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <!-- 2nd row -->
                                                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                                                          
                                                          <div class="flex-1">
                                                              <label class="block text-sm font-medium mb-1" for="card-city">Phone
                                                                  Number</label>
                                                              <input id="card-city" class="form-input w-full"
                                                                      type="text"/>
                                                              <div v-if="true" class="text-xs mt-1 text-rose-500">er
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <!-- 3rd row -->
                                                      
                                                      <!-- Divider -->
                                                      <hr class="my-2 border-t border-slate-200"/>


                                                      <!-- Street Address -->
                                                      <div>
                                                          <label class="block text-sm font-medium mb-1" for="street"
                                                          >Edit Address: <span class="text-rose-500">*</span></label
                                                          >
                                                          <input
                                                              autoComplete='none'
                                                              id="street"
                                                              class="form-input w-full"
                                                              type="text"
                                                              
                                                          />

                                                          <div class="" >
                                                              <svg class="animate-spin w-4 h-4 fill-current shrink-0"
                                                                  viewBox="0 0 16 16">
                                                                  <path
                                                                      d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                                                              </svg>
                                                          </div>

                                                          <div 
                                                              >
                                                              <div
                                                                  class="text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                  <button  type="button"
                                                                          class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                                    
                                                                  </button>
                                                              </div>
                                                          </div>

                                                      </div>
                                                      <!-- 4th row -->
                                                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4">
                                                          <div class="flex-1">
                                                              <label class="block text-sm font-medium mb-1" for="card-vat">Street
                                                                  Address:</label>
                                                              <input id="card-vat" class="form-input w-full cursor-not-allowed"
                                                                    type="text"  disabled/>
                                                          </div>
                                                          <div class="flex-1">
                                                              <label class="block text-sm font-medium mb-1"
                                                                    for="card-vat">City</label>
                                                              <input id="card-vat" class="form-input w-full cursor-not-allowed"
                                                                    type="text"  disabled/>
                                                          </div>
                                                          <div class="flex-1">
                                                              <label class="block text-sm font-medium mb-1" for="card-postcode">Postcode</label>

                                                              <input id="card-postcode"
                                                                    class="form-input w-full cursor-not-allowed" type="text"
                                                                      disabled/>
                                                          </div>

                                                      </div>

                                                      
                                                  </div>
                                              
                




              
                <div class="flex flex-col px-6 py-5 border-t border-slate-200">
                  <div class="flex self-end">
                    <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Save Changes</button>
                  </div>
                </div>

                </form>
                </div>
            </div> 




            </div>
          </div>

        </div>
        <ModalBasic id="danger-modal" :modalOpen="modaVlidateOpen" >
                      <div class="p-5 flex w-full space-x-4">
                        <!-- Icon -->
                        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
                          <svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
                            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                          </svg>
                        </div>
                        <!-- Content -->
                        <div>
                          <!-- Modal header -->
                          <div class="mb-2">
                            <div class="text-lg font-semibold text-slate-800">Validate the User?</div>
                          </div>
                          <!-- Modal content -->
                          <div class="text-sm mb-10">
                            <div class="">
                              <p>Are you sure you want to valid this User?</p>
                            </div>
                          </div>
                          <!-- Modal footer -->

                        </div>


                      </div>

                      <div class="flex flex-wrap justify-end space-x-2 m-6">
                            <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" @click.stop="modaVlidateOpen=false">Cancel</button>
                            <button class="btn-sm bg-rose-500 hover:bg-rose-600 text-white" @click="validuser">Yes, valid the user </button>
                      </div>
                    </ModalBasic>


                    <ModalBasic id="danger-modal" :modalOpen="modaDeletelOpen" >
                      <div class="p-5 flex w-full space-x-4">
                        <!-- Icon -->
                        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
                          <svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
                            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                          </svg>
                        </div>
                        <!-- Content -->
                        <div>
                          <!-- Modal header -->
                          <div class="mb-2">
                            <div class="text-lg font-semibold text-slate-800">Delete User?</div>
                          </div>
                          <!-- Modal content -->
                          <div class="text-sm mb-10">
                            <div class="">
                              <p>Are you sure you want to delete this User?</p>
                            </div>
                          </div>
                          <!-- Modal footer -->

                        </div>


                      </div>

                      <div class="flex flex-wrap justify-end space-x-2 m-6">
                            <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" @click.stop="modaDeletelOpen=false">Cancel</button>
                            <button class="btn-sm bg-rose-500 hover:bg-rose-600 text-white" @click="deleteItem">Yes, Delete it</button>
                      </div>
                    </ModalBasic>
      </main>

    </div> 


    

  </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import SettingsSidebar from '@/partials/settings/SettingsSidebar.vue'
import Banner from '@/components/Banner.vue';
import ModalBasic from '@/components/Modal.vue'

export default {
  name: 'Account',
  components: {
    Sidebar,
    Header,
    SettingsSidebar,
    Banner,
    ModalBasic,
    
  },
  data() {
        return {
            
          modaVlidateOpen:false,
          modaDeletelOpen :false,
        }
  },

  methods:{ 
    async  validuser(){


        const token = this.$store.getters["auth/token"]

      /*
        
        try {const response = await axios.delete(`${import.meta.env.VITE_API_URL}/insurance/${this.contract['_id']}` , {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
        this.modaDeletelOpen=false
        this.deleted=true
        }
        catch(e){
         this. modaDeletelOpen=false
        this.deleted=false
        }
        */

        this.modaVlidateOpen=false


      },
      async  deleteItem(){


        const token = this.$store.getters["auth/token"]

        /*
        try {const response = await axios.delete(`${import.meta.env.VITE_API_URL}/insurance/${this.contract['_id']}` , {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
        this.modaDeletelOpen=false
        this.deleted=true
        }
        catch(e){
         this. modaDeletelOpen=false
        this.deleted=false
        } */


      },

  },
  setup() {

    const sidebarOpen = ref(false)

    return {
      sidebarOpen,
    }  
  },
  async created() {

        console.log( this.$store.getters["auth/email"])
        console.log( this.$store.getters["auth/isAuthenticated"])
        console.log( this.$store.getters["auth/id"])

    }
}
</script>