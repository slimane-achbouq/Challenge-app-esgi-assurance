<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
    

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main>
      <Banner type="success" class="mb-4"  :open="true" v-if="caretCrise">
                    File uploaded successfully.
      </Banner>

        <div class="lg:relative lg:flex">

          <!-- Content -->
          <div class="px-4 sm:px-6 lg:px-8 py-8 lg:grow lg:pr-8 xl:pr-16 2xl:ml-[80px]">
            <div class="lg:max-w-[1240px] lg:mx-auto">

              <!-- Cart items -->
              <div class="mb-6 lg:mb-0">
                <div class="mb-3">
                   <!-- Progress bar -->
                    <div class="px-4 pt-12 pb-8">
                    <div class="max-w-md mx-auto w-full">
                        <div class="relative">
                        <div
                            class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200"
                            aria-hidden="true"
                        ></div>
                        <ul class="relative flex justify-between w-full">
                            <li>
                            <a
                                class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white"
                                >1</a
                            >
                            </li>
                            <li>
                            <a
                                class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold" :class="step.id >= 2 ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'"
                                >2</a
                            >
                            </li>
                            <li>
                            <a
                                class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold" :class="step.id >= 3 ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'"
                                >3</a
                            >
                            </li>
                            <li>
                            <a
                                class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold" :class="step.id >= 4 ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'"
                                >4</a
                            >
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <header class="mb-6">
                  <!-- Title -->
                  <h1 class="text-2xl md:text-3xl text-slate-800 font-bold mb-2" v-if="step.id==1">Vehicle informations</h1>
                  <h1 class="text-2xl md:text-3xl text-slate-800 font-bold mb-2" v-if="step.id==2">Quote informations</h1>
                  <p></p>
                </header>

                <div>
                  <form>
                    <div class="space-y-4">
                      <!-- 1st row -->
                      

                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4" v-if="step.id==1">
                      <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-country">Vehicle Type <span class="text-rose-500">*</span></label>
                          <select id="card-country" class="form-select w-full">
                            <option>Car</option>
                            <option>Motorcycle</option>
                            <option>Truck</option>
                          </select>
                      </div>
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-name">Brand <span class="text-rose-500">*</span></label>
                          <input id="card-name" class="form-input w-full" type="text" value="" />
                        </div>
                      </div>
                      <!-- 2nd row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4" v-if="step.id==1">
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-address">Model <span class="text-rose-500">*</span></label>
                          <input id="card-address" class="form-input w-full" type="text" />
                        </div>
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-city">Horse Power <span class="text-rose-500">*</span></label>
                          <input id="card-city" class="form-input w-full" type="text" />
                        </div>
                      </div>
                      <!-- 3rd row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4" v-if="step.id==1">
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-state">License Plate <span class="text-rose-500">*</span></label>
                          <input id="card-state" class="form-input w-full" type="text" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="startingDate">License Obtained Date <span class="text-rose-500">*</span><br></label>
                            <input type="datetime-local" class="form-input w-full" id="startingDate" name="startingDate"
                             v-model="startingDate">
                        </div>
                      </div>
                      <!-- 4th row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4" v-if="step.id==1">
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-name">Annual Mileage (KM) <span class="text-rose-500">*</span></label>
                          <input id="card-name" class="form-input w-full" type="number" value="" />
                        </div>

                        <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="startingDate">Vehicle Circulation Date <span class="text-rose-500">*</span><br></label>
                            <input type="datetime-local" class="form-input w-full" id="startingDate" name="startingDate"
                             v-model="startingDate">
                        </div>
                      </div>

                      <!-- 4th row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4" v-if="step.id==1">
                        
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-name">Registration Card Holder <span class="text-rose-500">*</span></label>
                          <input id="card-name" class="form-input w-full" type="text" value="" />
                        </div>

                        <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="startingDate">Registration Card Date <span class="text-rose-500">*</span><br></label>
                            <input type="datetime-local" class="form-input w-full" id="startingDate" name="startingDate"
                             v-model="startingDate">
                        </div>
                      </div>


                      <!-- 4th row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4" v-if="step.id==1">
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-country">Purchase Mode <span class="text-rose-500">*</span></label>
                          <select id="card-country" class="form-select w-full">
                            <option>New</option>
                            <option>Used</option>
                          </select>
                      </div>
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-name">parking Postal Code <span class="text-rose-500">*</span></label>
                          <input id="card-name" class="form-input w-full" type="number" value="" />
                        </div>
                      </div>

                      <!-- 1st row -->
                      

                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4"  v-if="step.id==2">
                      <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-country">Insurance Type <span class="text-rose-500">*</span></label>
                          <select id="card-country" class="form-select w-full">
                            <option>Liability</option>
                            <option>Collision</option>
                            <option>Comprehensive</option>
                          </select>
                      </div>
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-country">Coverage <span class="text-rose-500">*</span></label>
                          <select id="card-country" class="form-select w-full">
                            <option>Basic</option>
                            <option>Standard</option>
                            <option>Premium</option>
                          </select>
                      </div>
                      </div>
                      <!-- 2nd row -->
                      <div class="md:flex space-y-4 md:space-y-0 md:space-x-4" v-if="step.id==2">
                        <div class="flex-1">
                          <label class="block text-sm font-medium mb-1" for="card-address">Coverage Duration <span class="text-rose-500">*</span></label>
                          <input id="card-address" class="form-input w-full" type="number" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="startingDate">Coverage Start Date <span class="text-rose-500">*</span><br></label>
                            <input type="datetime-local" class="form-input w-full" id="startingDate" name="startingDate"
                             v-model="startingDate">
                        </div>
                      </div>
                      
                        <div class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300" v-if="hideImageField">
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

                      <div class="flex items-center justify-center w-full"
                                                     v-if="!hideImageField && step.id==1">
                                                    <label for="dropzone-file"
                                                           class="form-input w-full">
                                                        <div
                                                            class="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400"
                                                                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                      stroke-width="2"
                                                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                            </svg>
                                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                                <span class="font-semibold">Click to upload Carte Grise</span> or
                                                                drag and drop</p>
                                                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                                                PDF Format Only</p>
                                                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                                                REQUIRED</p>
                                                        </div>
                                                        <input id="dropzone-file" type="file" class="hidden" required
                                                               @change="handleFile"/>
                                                    </label>
                        </div>

                        <div class="shadow-lg rounded-sm border px-5 py-4 bg-amber-10 border-amber-300" v-if="hideImageField && step.id==1">
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

                      <div class="text-right">

                      
                        <button type="" v-if="step.id==2 && step.id!=3" @click.prevent="nextStep({id: 1, label: 'Information',selectedTab: 'StepTwo' })"  class="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500">back</button>
 
                        <button type="" v-if="step.id!=2" @click.prevent="nextStep({id: (step.id+1), label: 'Information',selectedTab: 'StepTwo' })"  class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white">Next step</button>
                            
                        <button @click.prevent="onQuoteCreated" v-if="step.id==2" class="btn bg-indigo-500 border-slate-200 hover:border-slate-300 text-white">Submit</button>

                      </div>


                    </div>

                  </form>
                </div>
                
                <!-- Divider -->
                <hr class="my-6 border-t border-slate-200" />
                
              </div>

            </div>
          </div>

        </div>


        <ModalBlank id="success-modal" :modalOpen="quoteCreated" v-if="quoteCreated">
                      <div class="p-5 flex space-x-4">
                        <!-- Icon -->
                        <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100">
                          <svg class="w-4 h-4 shrink-0 fill-current text-emerald-500" viewBox="0 0 16 16">
                            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
                          </svg>
                        </div>
                        <!-- Content -->
                        <div>
                          <!-- Modal header -->
                          <div class="mb-2">
                            <div class="text-lg font-semibold text-slate-800">Quote created successfully</div>
                          </div>
                          <!-- Modal content -->
                          <div class="text-sm mb-10">
                            <div class="space-y-2">
                              <p>The quote has been created successfully.if you want to continue creating the contract click on " Create "</p>
                            </div>
                          </div>
                          <!-- Modal footer -->
                          <div class="flex flex-wrap justify-end space-x-2">
                            <button class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" >Quotes list</button>
                            <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Create contract</button>
                          </div>
                        </div>
                      </div>
        </ModalBlank>
        

      </main>

    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '@/partials/Sidebar.vue'
import Header from '@/partials/Header.vue'
import Banner from '@/components/Banner.vue';
import ModalBlank from '@/components/ModalBlank.vue'


export default {
  name: 'NewQuote',
  components: {
    Sidebar,
    Header,
    Banner,
    ModalBlank
  },
  data() {
        return {
          error: null,
          selectedSituation: null,  
          selectedTab: 'StepOne',
          hideImageField:false,
          caretCrise:false,
          quoteCreated:false,
          steps: [
            {
                id: 1,
                label: 'Tell us what’s your situation ✨',
                selectedTab: 'StepOne'
            },
            {
                id: 2,
                label: 'Information',
                selectedTab: 'StepTwo'
            }
          ],
          step: {
              id: 1,
              label: 'Tell us what’s your situation ✨',
              selectedTab: 'StepOne'
          },
        }
    },
    methods: {
        onQuoteCreated(){
            //this.quoteCreated=true
        },
         back(object) {
          this.step = object;
        },
        nextStep(object) {
            this.error = null;
            try {
                if (this.step.id === 1) {
                        this.step = object;
                } else {
                  this.step = object;
                }

            } catch (error) {
                this.error = error.message || 'There is an error !';
            }
        },
        handleFile(event) {
            this.file = event.target.files[0];
            this.caretCrise = this.file.name
            console.log(this.file)
            this.previewSrc = URL.createObjectURL(event.target.files[0]);
            this.hideImageField = true;
        },
    },
  setup() {
    const sidebarOpen = ref(false)

    return {
      sidebarOpen,
    }
  },
}
</script>