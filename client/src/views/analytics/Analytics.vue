<template>
    <div class="flex h-screen overflow-hidden">

        <!-- Sidebar -->
        <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false"/>

        <!-- Content area -->
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

            <!-- Site header -->
            <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen"/>

            <main>
                <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                    <!-- Page header -->
                    <div class="sm:flex sm:justify-between sm:items-center mb-8">

                        <!-- Left: Title -->
                        <div class="mb-4 sm:mb-0">
                            <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Analytics : {{ appId }}</h1>
                        </div>

                        <!-- Right: Actions -->
                        <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                            <!-- Datepicker built with flatpickr -->
                            <Datepicker align="right"/>

                        </div>

                    </div>

                    <!-- Cards -->
                    <div class="grid grid-cols-12 gap-6">
                        <VisitedPagesStats v-bind:data="topPagesVisits"/>
                        <DurationTimeStats v-bind:data="times"/>
                        <KpiStats v-bind:data="kpis"/>
                        <UsedBrowsersStats v-bind:appId="appId" v-bind:API_URL="API_URL"/>
                        <UsedDevicesStats v-bind:appId="appId" v-bind:API_URL="API_URL"/>

                    </div>

                </div>
            </main>

        </div>

    </div>
</template>

<script>
import {ref} from 'vue'
import Sidebar from '../../partials/Sidebar.vue'
import Header from '../../partials/Header.vue'
import Datepicker from '../../components/Datepicker.vue'
import VisitedPagesStats from '../../partials/analytics/VisitedPagesStats.vue'
import AnalyticsCard08 from '../../partials/analytics/AnalyticsCard08.vue'
import UsedBrowsersStats from '../../partials/analytics/UsedBrowsersStats.vue'
import UsedDevicesStats from '../../partials/analytics/UsedDevicesStats.vue'
import KpiStats from '../../partials/analytics/KpiStats.vue'
import DurationTimeStats from "@/partials/analytics/DurationTimeStats.vue";

const appId = localStorage.getItem("appId") || getCookie("appId");
const API_URL = 'http://localhost:3000';

function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export default {
    name: 'Analytics',
    components: {
        DurationTimeStats,
        Sidebar,
        Header,
        Datepicker,
        VisitedPagesStats,
        AnalyticsCard08,
        UsedBrowsersStats,
        UsedDevicesStats,
        KpiStats,
    },
    data() {
        return {
            topPagesVisits: null,
            visitors: null,
            times: null,
            appId: appId,
            API_URL: API_URL,
            kpis: null,
            browsers: null,
            devices: null,
        }
    },
    setup() {
        const sidebarOpen = ref(false);

        return {
            sidebarOpen,
        }
    },
    methods: {
        async getTotalVisits() {
            const response = await fetch(`${API_URL}/visit`, {
                headers: {
                    'Content-Type': 'application/json',
                    "App-Id": appId,
                },
                method: 'GET',
            });
            return await response.json();
        },
        async getTotalUniqueVisitors() {
            const response = await fetch(`${API_URL}/visitor`, {
                headers: {
                    'Content-Type': 'application/json',
                    "App-Id": appId,
                },
                method: 'GET',
            });
            return await response.json();
        },
        async getTimePerPage() {
            const response = await fetch(`${API_URL}/time`, {
                headers: {
                    'Content-Type': 'application/json',
                    "App-Id": appId,
                },
                method: 'GET',
            });
            return await response.json();
        },
        async getAllKpis() {
            const response = await fetch(`${API_URL}/kpi`, {
                headers: {
                    'Content-Type': 'application/json',
                    "App-Id": appId,
                },
                method: 'GET',
            });
            return await response.json();
        },
        async getAllUsedBrowers() {
            const response = await fetch(`${API_URL}/browser`, {
                headers: {
                    'Content-Type': 'application/json',
                    "App-Id": appId,
                },
                method: 'GET',
            });
            return await response.json();
        },
        async getAllDevices() {
            const response = await fetch(`${API_URL}/device`, {
                headers: {
                    'Content-Type': 'application/json',
                    "App-Id": appId,
                },
                method: 'GET',
            });
            return await response.json();
        },
    },
    beforeCreate () {
        if (!localStorage.getItem("kpiJwtToken") && !getCookie("kpiJwtToken")) {
            this.$router.push("/analytics/login");
        }
    },
    async created() {
        this.topPagesVisits = await this.getTotalVisits();
        this.visitors = await this.getTotalUniqueVisitors();
        this.times = await this.getTimePerPage();
        this.kpis = await this.getAllKpis();
        this.browsers = await this.getAllUsedBrowers();
        this.devices = await this.getAllDevices();
        this.appId = appId;
        this.API_URL = API_URL;
    }
}
</script>