<template>
  <div class="relative inline-flex">
    <button
        ref="trigger"
        class="inline-flex justify-center items-center group"
        aria-haspopup="true"
        :aria-expanded="dropdownOpen"
        @click.prevent="dropdownOpen = !dropdownOpen"
    >
      <img
          class="w-8 h-8 rounded-full"
          :src="UserAvatar"
          width="32"
          height="32"
          alt="User"
      />
      <div class="flex items-center truncate">
        <span
            class="truncate ml-2 text-sm font-medium group-hover:text-slate-800"
        >{{ email }}</span
        >
        <svg
            class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
        >
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
        </svg>
      </div>
    </button>
    <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          v-show="dropdownOpen"
          class="origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
          :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
          <div class="font-medium text-slate-800">{{ email }}</div>
          <div class="text-xs text-slate-500 italic">{{ role }}</div>
        </div>
        <ul
            ref="dropdown"
            @focusin="dropdownOpen = true"
            @focusout="dropdownOpen = false"
        >
          <li>
            <button
                class="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                @click="signout()"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted} from "vue";
import UserAvatar from "@/images/useravatar.png";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  name: "DropdownProfileAnalytics",
  props: ["align"],
  data() {
    return {
      isAnalytics: false
    }
  },
  created() {
    this.isAnalytics = !!localStorage.getItem("kpiJwtToken");
  },
  setup() {
    const dropdownOpen = ref(false);
    const trigger = ref(null);
    const dropdown = ref(null);

    const store = useStore();
    const email = ref(null);
    const role = ref(null);
    const token = ref(null);
    const loading = ref(true);

    const router = useRouter();

    const setUserDetails = () => {
      email.value = store.getters["auth/email"];
      role.value = store.getters["auth/roles"];
      token.value = store.getters["auth/token"];
      loading.value = false;
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
      setUserDetails();
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    // close on click outside
    const clickHandler = ({target}) => {
      if (
          !dropdownOpen.value ||
          dropdown.value.contains(target) ||
          trigger.value.contains(target)
      )
        return;
      dropdownOpen.value = false;
    };

    // close if the esc key is pressed
    const keyHandler = ({keyCode}) => {
      if (!dropdownOpen.value || keyCode !== 27) return;
      dropdownOpen.value = false;
    };

    function signout() {
      localStorage.clear();
      window.location.href = "/analytics/login";
    }

    return {
      dropdownOpen,
      trigger,
      dropdown,
      UserAvatar,
      email,
      role,
      token,
      loading,
      signout,
    };
  },
};
</script>
