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
                        <!-- Report card (Top Pages) -->
                        <VisitedPagesStats v-bind:data="topPagesVisits"/>
                        <!-- Report card (Top Countries) -->
                        <DurationTimeStats v-bind:data="times"/>
                        <!-- Doughnut chart (Sessions By Device) -->
                        <AnalyticsCard08/>
                        <!-- Doughnut chart (Visit By Age Category) -->
                        <AnalyticsCard09/>
                        <!-- Polar chart (Sessions By Gender) -->
                        <AnalyticsCard10/>

                    </div>

                </div>
            </main>

        </div>

    </div>
</template>

<script>
import {ref} from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import Datepicker from '../components/Datepicker.vue'
import VisitedPagesStats from '../partials/analytics/VisitedPagesStats.vue'
import AnalyticsCard08 from '../partials/analytics/AnalyticsCard08.vue'
import AnalyticsCard09 from '../partials/analytics/AnalyticsCard09.vue'
import AnalyticsCard10 from '../partials/analytics/AnalyticsCard10.vue'
import AnalyticsCard11 from '../partials/analytics/AnalyticsCard11.vue'
import DurationTimeStats from "@/partials/analytics/DurationTimeStats.vue";

const appId = 'TEST_APP_ID';
const API_URL = 'http://localhost:3000';

export default {
    name: 'Analytics',
    components: {
        DurationTimeStats,
        Sidebar,
        Header,
        Datepicker,
        VisitedPagesStats,
        AnalyticsCard08,
        AnalyticsCard09,
        AnalyticsCard10,
        AnalyticsCard11,
    },
    data() {
        return {
            topPagesVisits: null,
            visitors: null,
            times: null,
            appId: null
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
        }
    },
    async created() {
        this.topPagesVisits = await this.getTotalVisits();
        this.visitors = await this.getTotalUniqueVisitors();
        this.times = await this.getTimePerPage();
        this.appId = 'TEST_APP_ID';
    }
}
</script>