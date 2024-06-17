<script setup lang="ts">
import { ref } from 'vue'
import { traverseDir } from '#imports';
import type { TreeDir } from '~/utils/travelDir';

const onprogress = ref(false)
const dirStructure = ref<TreeDir>({
  name: '',
  children: [],
  type: 'directory'
})

const getDirHandler = (e: Event) => {
  onprogress.value = true
  window.showDirectoryPicker().then((dir: FileSystemDirectoryHandle) => {
    traverseDir(dir).then((res) => {
      console.log('done = ', res)
      dirStructure.value = res
    }).catch((err) => {
      console.log('err = ', err)
    })
  }).catch((err) => {
    console.log('err = ', err)
  }).finally(() => {
    onprogress.value = false
  });
}

const jsonPreview = computed(() => {
  return JSON.stringify(dirStructure.value, null, 2)
})
</script>

<template>
  <div class="w-full mt-12" v-loading="onprogress">
    <!-- big button on page top -->
    <button class="btn btn-primary btn-block" @click="getDirHandler">Select Directory</button>
  </div>
  <div class="json-preview mt-12">
    <div class="mockup-code dark:bg-white text-primary-content">
      <pre><code>{{ jsonPreview }}</code></pre>
    </div>
  </div>
</template>
