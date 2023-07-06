<template>
  <div class="flex h-screen overflow-hidden" style="background-color: #f1f5f9">
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
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div>
            <div
              class="px-6 py-8 bg-slate-800 rounded-sm text-center xl:text-left xl:flex xl:flex-wrap xl:justify-between xl:items-center"
            >
              <div
                class="text-slate-300 mb-4 xl:mb-0 max-w-lg mx-auto xl:mx-0 2xl:max-w-none"
              >
                <i class="fas fa-money-check" style="color: #ffffff"></i> ID
                Card verification ✨
              </div>
              <div class="inline-flex space-x-3">
                <a
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  href="https://nucleoapp.com/pricing"
                  target="_blank"
                  rel="noreferrer"
                  >Activate webcam</a
                >
              </div>
            </div>
          </div>

          <div class="border-t border-slate-200" v-if="isWebcamActivatedd">
            <div class="max-w-2xl m-auto mt-16">
              <div class="text-center px-4">
                <div
                  class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-t from-slate-200 to-slate-100 mb-4"
                >
                  <i class="fas fa-camera" style="color: #7a7e85"></i>
                </div>
                <h2 class="text-2xl text-slate-800 font-bold mb-2">
                  Webcam not activated
                </h2>
                <div class="mb-6">
                  To verify your card id, you must activate your webcam .
                </div>
                <button
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <span class="ml-2"> Activate Webcam </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border-t border-slate-200 px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-3xl mx-auto"
        >
          <div class="xl:flex">
            <!-- Left + Middle content -->
            <div class="md:flex flex-1">
              <!-- Middle content -->
              <div
                class="flex-1 md:ml-6 xl:mx-2 2xl:mx-2"
                v-if="!isWebcamActivatedd"
              >
                <div class="md:py-8">
                  <!-- Blocks -->
                  <div class="space-y-4">
                    <!-- Posts -->
                    <div>
                      <!-- Post 2 -->
                      <div
                        class="bg-white shadow-md rounded border border-slate-200 p-5"
                      >
                        <!-- Header -->
                        <header
                          class="flex justify-between items-start space-x-3 mb-3"
                        >
                          <!-- Menu button -->
                          <div class="relative"></div>
                        </header>

                        <!-- Body -->
                        <div class="text-sm text-slate-800 space-y-2 mb-5">
                          <p>
                            Your face must be in the middle then wait for the
                            verfication procces
                          </p>
                          <div class="relative !my-4">
                            <video
                              ref="video"
                              width="1200"
                              height="1200"
                              autoplay
                            ></video>

                            <canvas ref="canvas" style="display: none;"></canvas>

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
import EditMenu from "@/components/DropdownEditMenu.vue";
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import Header from "@/partials/Header.vue";
import Sidebar from "@/partials/Sidebar.vue";
import Swal from "sweetalert2";

export default {
  name: "FaceRego",
  components: {
    EditMenu,
    Header,
    Sidebar,
  },
  setup() {
    return {};
  },
  data() {
    return {
      isWebcamActivatedd: false,
      video: null,
      benf :null
    };
  },

  async mounted() {
    const id = document.URL.substring(document.URL.lastIndexOf("/") + 1);

    const token = this.$store.getters["auth/token"];
    // const response = await axios.get(`${import.meta.env.VITE_API_URL}/users?page=${page.value}`, {
    let response = null;

    try {
      response = await axios.get(
        `${import.meta.env.VITE_API_URL}/insurance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //localStorage.setItem("insurance-data", JSON.stringify(response.data));
    } catch (e) {
      response = JSON.parse(localStorage.getItem("insurance-data"));
    }

    /*if(response.data["hydra:member"]){
        customers.value = await response.data["hydra:member"];
        }*/

    if (response.data) {
      console.log(response.data);
    }

    const  idBene = response.data.beneficiary

    const response1 = JSON.parse(localStorage.getItem("beneficiary-data")) ?? await axios.get(
      `${import.meta.env.VITE_API_URL}/beneficiary/${response.data.beneficiary}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      if (response1.data) {
      
      this.benf = await response1.data
      if (this.benf.veriviedImage) this.$router.push("/user-contracts");
      console.log(this.benf)
     }


    this.video = await this.$refs.video;

    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    ]).then(this.startWebcam());

    this.video.addEventListener("play", async () => {
      const labeledFaceDescriptors = await this.getLabeledFaceDescriptions();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

      const displaySize = {
        width: this.video.width,
        height: this.video.height,
      };

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(this.video)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });
        results.forEach(async (result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result,
          });

          console.log(result['_distance'])
          if (result.label !== "unknown" && result['_distance'] < 0.38) {


            const canvas = this.$refs.canvas;
            const context = canvas.getContext("2d");
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            context.drawImage(this.video, 0, 0, canvas.width, canvas.height);
            const imageDataURL = canvas.toDataURL();

            const imageData = await (await fetch(imageDataURL)).blob();

            const formData = new FormData();
            formData.append("veriviedImage", imageData);


            let response =  axios
              .put(`${import.meta.env.VITE_API_URL}/beneficiary/${idBene}`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((data) => {
                console.log(data)
              })
              .catch((error) => {
                console.log(error);
              });

            console.log(imageDataURL)



                Swal.fire({
                text: "Your ID Card is vérified, wait the admin to validate the contract",
                icon: "success",
              }).then(() => {
                  const redirectUrl = "/" + (this.$route.query.redirect || `contract/${id}`);
                  this.$router.replace(redirectUrl);
                });
              
              
              const stream = this.video.srcObject;
              const tracks = stream.getTracks();
              tracks.forEach((track) => track.stop());

          }
        });
      }, 100);
    });
  },

  methods: {
    async onQuoteEdited() {},

    startWebcam() {
      try {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: false,
          })
          .then((stream) => {
            this.video.srcObject = stream;
          })
          .catch((error) => {
            this.isWebcamActivatedd = true;
            console.log("Failed to access webcam:", error);
          });
      } catch (error) {
        console.log("Failed to access webcam:", error);
      }
    },

    getLabeledFaceDescriptions() {
      const labels = ["Data"];
      return Promise.all(
        labels.map(async (label) => {
          const descriptions = [];

          const IdCard = this.benf.IdCard.data

          const arrayBuffer = Uint8Array.from(this.benf.IdCard.data).buffer;
          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          const img = document.createElement('img');
          img.src = imageUrl;

          
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detections.descriptor);

          return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
      );
    },
  },

  beforeUnmount() {
    // Access the video element using this.$refs
    const video = this.$refs.video;

    // Check if the video element has a srcObject
    if (video && video.srcObject) {
      // Get the stream from the srcObject
      const stream = video.srcObject;

      // Get all the tracks from the stream
      const tracks = stream.getTracks();

      // Stop each track
      tracks.forEach((track) => {
        track.stop();
      });
    }
  },
  
};
</script>
