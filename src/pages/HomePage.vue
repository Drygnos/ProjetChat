
import { loadConfigFromFile } from 'vite';

import { ref } from 'vue';
<script setup>
  import { ref, computed } from "vue";
  import PostCard from "@/components/PostCard.vue"

  const text = ref("");
  const trimmedText = computed(() => text.value.trim());

  const posts = ref([]);
  const sortedPosts = computed(() => posts.value.toSorted((post) => post.createdAt));

  function addPost(){
    const newPost = {
      id: Math.random().toString(36).substring(2),
      content: trimmedText.value,
      createdAt: new Date(),
      author: {
        username: "Wheel of Fortune",
        avatarUrl: "https://media.tenor.com/qwrtwAJHNTEAAAAi/balatro-card.gif"
      },
      liked: false
    }
    posts.value.push(newPost);
    text.value = "";
  }

  function likePost(id){
    const postToUpdate = posts.value.find((post) => post.id === id);
    postToUpdate.liked = !postToUpdate.liked;
    
  }

  function deletePost(id){
    posts.value = posts.value.filter((post) => post.id !== id);
  }

  const apiPosts = ref([]);
  function fetchPosts(){
    const result = fetch("https://posts-crud-api.vercel.app/posts");
    result.then((response) => response.json())
        .then((data) => {
            apiPosts.value = data;
        })
  }
  fetchPosts();
</script>

<template>
  <RouterView/>
  <main>
    <div class="container">
      <form class="card" @submit.prevent="addPost">
        <textarea name="post" id="post" placeholder="À quoi tu gamberges ?" v-model="text"></textarea>
        <button type="submit" :disabled="!text.trim()">Publier</button>
      </form>
      <h2 v-if="!apiPosts.length">Rien à voir</h2>
      <!--
        <article class="card" v-for="(post, index) in sortedPosts" :key="index">
          <header>
            <img :src="post.author.avatarUrl" alt="avatar" width="36" height="36">
            <a>{{ post.author.username }}</a>
          </header>
          <p>{{ post.content }}</p>
        </article>
      -->
    <PostCard v-for="(post, index) in apiPosts" :key="index" :post="post" @delete="deletePost" @like="likePost"/>
  
    </div>
  </main>
</template>