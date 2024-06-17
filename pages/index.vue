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
const form = ref<{
  excludeDirs: string
  depth: number
}>({
  excludeDirs: '',
  depth: 0
})
const showCopyToast = ref(false)

const getDirHandler = (e: Event) => {
  onprogress.value = true
  window.showDirectoryPicker().then((dir: FileSystemDirectoryHandle) => {
    traverseDir(dir, form.value.excludeDirs?.split(','), form.value.depth || -1).then((res) => {
      dirStructure.value = res
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

const downloadJson = () => {
  const blob = new Blob([jsonPreview.value], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = 'dirStructure.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

const copyJson = () => {
  navigator.clipboard.writeText(jsonPreview.value)
  showCopyToast.value = true
  setTimeout(() => {
    showCopyToast.value = false
  }, 2000)
}
</script>

<template>
  <div class="w-full">
    <div class="w-full mt-12" v-loading="onprogress">
      <div class="flex gap-2">
        <div>
          <input class="input input-accent w-full max-w-xs" type="text" placeholder="exclude dirs in regex"
            v-model="form.excludeDirs">
          <div class="label">
            <span class="label-text-alt">
              Example: node_modules,dist,.vue$
              <br>
              <span class="text-slate-400">Use comma to separate, and do not need to include /</span>
            </span>
          </div>
        </div>
        <div>
          <input class="input input-accent w-full max-w-xs" type="number" placeholder="depth" v-model="form.depth">
          <div class="label">
            <span class="label-text-alt">
              The depth of the directory
            </span>
          </div>
        </div>
      </div>

      <!-- big button on page top -->
      <div class="bg-primary text-white w-full h-96 btn btn-primary mt-10" @click="getDirHandler">
        <span class="text-white text-9xl">Get Dir</span>
      </div>
    </div>
    <div class="json-preview my-12">
      <div class="btn-group">
        <button class="btn btn-link btn-ghost" @click="downloadJson">download json</button>
        <div class="avatar indicator">
          <span class="indicator-item badge badge-success" v-if="showCopyToast">copied</span>
          <button class="btn btn-link btn-ghost" @click="copyJson">copy json</button>
        </div>
      </div>
      <div class="mockup-code max-h-[400px] overflow-auto">
        <pre v-for="(line, index) in jsonPreview.split('\n')" :key="line"
          :data-prefix="index + 1"><code>{{ line }}</code></pre>
      </div>
    </div>
  </div>
</template>
