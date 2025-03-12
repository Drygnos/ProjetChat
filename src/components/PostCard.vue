<script setup>
    import {HeartIcon, TrashIcon} from "@heroicons/vue/24/outline";
    import {HeartIcon as SolidHeartIcon} from "@heroicons/vue/24/solid";
    import {useRouter} from "vue-router";

    const router = useRouter();

    const props = defineProps({
        post: {
            type: Object,
            required: true,
        }
    })

    const emit = defineEmits(["delete", "like"]);

    function likePost() {
        emit("like", props.post.id)
    }

    function deletePost() {
        emit("delete", props.post.id)
    }

    function goToUserProfile(){
        router.push({name: "user", params: {username: props.post.author.username}})
    }

</script>

<template>
    <article class="card">
        <header>
            <img :src="post.author.avatarUrl" alt="avatar" width="36" height="36">
            <a @click="goToUserProfile">{{ post.author.username }}</a>
            <!--
                <a>{{ post.createdAt }}</a>
            -->
        </header>
        <p>{{ post.content }}</p>
        <footer>
            <button class="btn-icon" @click="likePost">
                <!--
                    <HeartIcon v-if="!post.liked"/>
                    <SolidHeartIcon v-else class="active"/>
                -->
                <component :is="post.liked ? SolidHeartIcon : HeartIcon" :class="{active: post.liked}"/>
            </button>
            <button class="btn-icon" @click="deletePost">
                <TrashIcon />
            </button>
        </footer>
      </article>
</template>