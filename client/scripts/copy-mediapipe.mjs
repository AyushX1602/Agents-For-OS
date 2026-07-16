/**
 * scripts/copy-mediapipe.mjs
 *
 * Copies MediaPipe local assets from node_modules into public/ so the app
 * can serve them without relying on a CDN.  Run automatically via:
 *   "prebuild": "node scripts/copy-mediapipe.mjs"
 *   "postinstall": "node scripts/copy-mediapipe.mjs || true"
 */

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const COPIES = [
  {
    src: resolve(root, 'node_modules/@mediapipe/hands'),
    dst: resolve(root, 'public/mediapipe-hands'),
    label: 'MediaPipe Hands'
  },
  {
    src: resolve(root, 'node_modules/@mediapipe/tasks-vision/wasm'),
    dst: resolve(root, 'public/mediapipe-wasm'),
    label: 'MediaPipe Tasks-Vision WASM'
  }
]

function patchTasksVisionWasm(dst) {
  const needle = 'if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];'
  const replacement = '/* Patched for browser startup: noExitRuntime was already captured before legacyModuleProp(). */'
  for (const file of readdirSync(dst)) {
    if (!file.endsWith('.js')) continue
    const path = resolve(dst, file)
    const before = readFileSync(path, 'utf8')
    if (!before.includes(needle)) continue
    writeFileSync(path, before.replaceAll(needle, replacement))
    console.log(`[copy-mediapipe] patched Tasks-Vision runtime: ${file}`)
  }
}

let anyMissing = false

for (const { src, dst, label } of COPIES) {
  if (!existsSync(src)) {
    console.warn(`[copy-mediapipe] ⚠ Source missing (run npm install first): ${src}`)
    anyMissing = true
    continue
  }
  mkdirSync(dst, { recursive: true })
  cpSync(src, dst, { recursive: true, force: true })
  if (label === 'MediaPipe Tasks-Vision WASM') patchTasksVisionWasm(dst)
  const count = readdirSync(dst).length
  console.log(`[copy-mediapipe] ✅ ${label} → ${dst} (${count} files)`)
}

if (anyMissing) {
  console.warn('[copy-mediapipe] Some sources were missing — run: npm install')
}
