<script setup>
    import {HeartIcon, TrashIcon} from "@heroicons/vue/24/outline";

    const props = defineProps({
        post: {
            type: Object,
            reauired: true,
        }
    })

    const emit = defineEmits(["delete", "like"]);

    function likePost() {
        emit("like", props.post.id)
    }

    function deletePost() {
        emit("delete", props.post.id)
    }

</script>

<template>
    <article class="card">
        <header>
          <img :src="post.author.avatarUrl" alt="avatar" width="36" height="36">
          <a>{{ post.author.username }}</a>
        </header>
        <p>{{ post.content }}</p>
        <p>Le post il est aimé ? {{ post.liked }}</p>
        <footer>
            <button class="btn-icon" @click="likePost">
                <HeartIcon />
            </button>
            <button class="btn-icon" @click="deletePost">
                <TrashIcon />
            </button>
        </footer>
      </article>
</template>