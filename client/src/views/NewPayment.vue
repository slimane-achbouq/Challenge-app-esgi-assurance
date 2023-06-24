<template>
  <!-- stripe-checkout -->
</template>

<script>
import {StripeCheckout} from '@vue-stripe/vue-stripe';

export default {
  components: {
    StripeCheckout,
  },
  data() {
    return {
      publishableKey: "pk_test_51MZYljHiiKajDgAsKTAGtexDySSMf7qJ1VxyjEIebTMcEcttRWeCGMnXtXgtCdEf0iN5k60WuXQxGlAva3xG0Yvo00ImgD98YH",
      sessionId: null,
      contract: null,
      annonce: null,
      src: "",
      isLocataire: false,
      pricePerHour: null,
    }
  },
  methods: {
    getStripeSession: async function () {
      const token = this.$store.getters["auth/token"];
      let id = document.URL.substring(document.URL.lastIndexOf('/') + 1);

      const formData = new FormData();
      formData.append('title', this.annonce.title);
      if (this.annonce.isPerHour) {
        formData.append('price', this.pricePerHour);
      } else {
        formData.append('price', this.annonce.price);
      }
      formData.append('image', this.annonce.image);
      formData.append('token', token);
      formData.append('request_id', id);
      const request = await fetch(`${import.meta.env.VITE_API_URL}/stripe/getSession`, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const response = await request.json();
      this.sessionId = response.id;
    },
    submit: function () {
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
  async created() {
    const store = useStore()
    const token = store.getters["auth/token"];
    if (!token) {
      this.$router.push({name: "home"});
    }

    const id = document.URL.substring(document.URL.lastIndexOf('/') + 1);

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/claims/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    this.claim = response.data;

    if (this.role == "Client" && this.claim.userMail != store.getters["auth/email"]) {
      this.$router.push({name: "claims"});
    }
  }
};
</script>