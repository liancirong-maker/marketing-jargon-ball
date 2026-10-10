const DEFAULTS = { apiBase: 'https://api.deepseek.com/v1', model: 'deepseek-chat', apiKey: '' }
const $ = (id) => document.getElementById(id)

function show(text, ok = true) {
  $('msg').textContent = text
  $('msg').className = ok ? 'ok' : 'bad'
}

async function refreshCount() {
  const { mjb_custom: list = [] } = await chrome.storage.local.get('mjb_custom')
  $('count').textContent = `共 ${list.length} 条（通过 AI 查词收录，所有标签页共享）`
}

chrome.storage.local.get(DEFAULTS).then((s) => {
  $('apiBase').value = s.apiBase
  $('model').value = s.model
  $('apiKey').value = s.apiKey
})
refreshCount()

$('save').addEventListener('click', async () => {
  const apiBase = $('apiBase').value.trim() || DEFAULTS.apiBase
  const model = $('model').value.trim() || DEFAULTS.model
  const apiKey = $('apiKey').value.trim()

  let origin
  try {
    origin = new URL(apiBase).origin
    if (!origin.startsWith('https://')) throw new Error()
  } catch {
    return show('接口地址格式不对，需要以 https:// 开头', false)
  }

  // 必须在点击事件中直接请求权限，只授权这一个域名
  const granted = await chrome.permissions.request({ origins: [origin + '/*'] })
  if (!granted) return show(`没有获得访问 ${origin} 的权限，AI 查词将无法使用`, false)

  await chrome.storage.local.set({ apiBase, model, apiKey })
  show(apiKey ? '✅ 已保存，可以去网页上试试 AI 查词了' : '已保存，但还没填写 API Key', !!apiKey)
})

$('test').addEventListener('click', () => {
  show('查询中…')
  chrome.runtime.sendMessage({ type: 'AI_LOOKUP', term: '种草' }, (resp) => {
    if (resp?.ok) {
      const d = resp.data
      show(`✅ 接口可用\n${d.term}（${d.termEn}）：${d.definition}`)
    } else {
      show(resp?.error === 'NO_CONFIG' ? '请先填写 API Key 并保存' : `❌ ${resp?.error || '查询失败'}`, false)
    }
  })
})

$('export').addEventListener('click', async () => {
  const { mjb_custom: list = [] } = await chrome.storage.local.get('mjb_custom')
  const blob = new Blob([JSON.stringify(list, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `my-jargons-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(a.href)
})

$('clear').addEventListener('click', async () => {
  if (!confirm('确定清空所有「我的词条」吗？此操作不可恢复。')) return
  await chrome.storage.local.set({ mjb_custom: [] })
  refreshCount()
  show('已清空')
})
