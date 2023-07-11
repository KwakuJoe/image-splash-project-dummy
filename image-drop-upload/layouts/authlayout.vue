<template>
    <UContainer>
        <div class="flex lg:flex-row flex-col justify-center mt-5">
            <div class="lg:w-1/3 m-5 flex-col flex gap-y-10">
                <p class="font-bold text-6xl justify-start">Creation Starts froms here</p>
                <p>Access 5,219,020 free, high-resolution photos you can’t find anywhere else</p>
                <AuthNav/>
            </div>
            <div class="flex flex-row grow m-5 lg:grow justify-center align-middle">
                <slot/>
            </div>
        </div>
        <!-- notfications -->
        <UNotifications />
    </UContainer>
</template>
