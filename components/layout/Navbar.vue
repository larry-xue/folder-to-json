<script setup lang="ts">
const openGithub = () => {
  window.open('https://github.com/larry-xue/folder-to-json')
}

const openAuthorLink = () => {
  window.open('https://larryxue.dev')
}
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Folder to JSON</a>
    </div>
    <div class="flex-none">
      <button class="btn btn-link btn-ghost" @click="openAuthorLink">Author</button>
      <button class="btn btn-link btn-ghost" @click="openGithub">
        Github
      </button>
    </div>
  </div>
</template>
