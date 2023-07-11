<template>
    <NavBar/>
    <UContainer>
    <div class="flex flex-col lg:flex-row gap-x-5 my-5 gap-y-10">
        <div class="flex md:w-1/3  px-5">
            <div class="flex-col flex">
                <p class="text-center font-bold text-2xl mb-5">Account Settings</p>
                <UserAccountTab/>
            </div>
        </div>
        <div class="flex md:grow">
            <slot/>
        </div>
    </div>
    <!-- notfications -->
    <UNotifications />
    </UContainer>
</template>
