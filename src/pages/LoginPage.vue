<script setup>
    import { ref, computed } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const username = ref("");
    const mail = ref("");
    const password = ref("");

    const isFormValid = computed(() => {
        return !!username.value.trim() && !!mail.value.trim() && !!password.value.trim();
    })

    const isLoading = ref(false);

    function registerRuntimeCompiler(){
        isLoading.value = true;
        /*console.log({
            username: username.value,
            mail: mail.value,
            password: password.value

        });
        setTimeout(() => {
            router.push("/");
        },1000);*/
        fetch("https://posts-crud-api.vercel.app/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                mail: mail.value,
                password: password.value
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data));
                router.push("/");
            });
    }
</script>

<template >
    <div class="container">
        <h2>Création de compte</h2>
        <form class="card" @submit.prevent="register">
            <input class="" type="text" name="username" id="username" placeholder="Username..." v-model="username" autocomplete="new-username"/>
            <input class="" type="text" name="mail" id="mail" placeholder="Mail..." v-model="mail" autocomplete="new-mail"/>
            <input class="" type="password" name="password" id="password" placeholder="Password..." v-model="password" autocomplete="new-password"/>
            <button type="submit" name="submit" id="submit" value="submit" :disabled="!isFormValid || isLoading">Login</button>
        </form>
    </div>
</template>