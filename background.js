/**
 * 营销黑话词典 · 悬浮球 —— background service worker
 *
 * 职责：
 *   1. AI 查词：调用任意兼容 OpenAI 格式的大模型接口（DeepSeek / 通义 / Kimi / OpenAI 等）
 *      跨域请求放在这里发，避免内容脚本被宿主页面的 CORS 限制拦截
 *   2. 点击工具栏图标：页面未注入时先强制注入，再唤出或收起悬浮球
 */

const DEFAULTS = {
  apiBase: 'https://api.deepseek.com/v1',
  model: 'deepseek-chat',
  apiKey: ''
}
const CATEGORIES = ['ad', 'metric', 'content', 'growth', 'work']
const TIMEOUT_MS = 45000

const SYSTEM_PROMPT = `你是互联网营销、广告投放和职场沟通方面的术语专家。
用户会给你一个词，请只返回一个 JSON 对象，不要输出其他文字：
{
  "term": "规范后的词条",
  "termEn": "英文或英文全称，没有则留空",
  "definition": "中文释义，80 字以内，用大白话说清它在营销、投放或职场中的意思；如果是公式型指标，写出公式",
  "examples": ["一句职场里的真实用法", "可选第二句"],
  "category": "ad | metric | content | growth | work 之一",
  "isJargon": true
}
如果这个词并不是行业术语或黑话，isJargon 填 false，仍然给出解释。
不确定时在 definition 里如实说明，不要编造。`

async function getSettings() {
  return chrome.storage.local.get(DEFAULTS)
}

function extractJson(text) {
  const s = String(text || '').replace(/```(?:json)?/gi, '')
  const i = s.indexOf('{')
  const j = s.lastIndexOf('}')
  if (i < 0 || j <= i) throw new Error('AI 返回的内容不是 JSON，请重试')
  return JSON.parse(s.slice(i, j + 1))
}

function normalize(o, fallbackTerm) {
  const ex = Array.isArray(o.examples) ? o.examples : [o.examples]
  return {
    term: String(o.term || fallbackTerm).trim(),
    termEn: String(o.termEn || '').trim(),
    definition: String(o.definition || '').trim(),
    examples: ex.filter(Boolean).map(String).slice(0, 3),
    category: CATEGORIES.includes(o.category) ? o.category : 'work',
    isJargon: o.isJargon !== false
  }
}

async function aiLookup(term) {
  const { apiBase, model, apiKey } = await getSettings()
  if (!apiKey) throw new Error('NO_CONFIG')

  const url = apiBase.replace(/\/+$/, '') + '/chat/completions'
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: term }
        ]
      })
    })
    if (!res.ok) {
      const t = await res.text().catch(() => '')
      throw new Error(`接口返回 HTTP ${res.status}：${t.slice(0, 120)}`)
    }
    const json = await res.json()
    const content = json?.choices?.[0]?.message?.content
    return normalize(extractJson(content), term)
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('请求超时（45 秒），请稍后重试')
    if (err instanceof TypeError) {
      throw new Error('网络请求失败：请到设置页重新「保存」一次以授权访问该接口，并检查地址是否正确')
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  ;(async () => {
    try {
      if (msg?.type === 'AI_LOOKUP') {
        sendResponse({ ok: true, data: await aiLookup(String(msg.term || '').trim()) })
      } else if (msg?.type === 'OPEN_OPTIONS') {
        await chrome.runtime.openOptionsPage()
        sendResponse({ ok: true })
      } else {
        sendResponse({ ok: false, error: '未知消息类型' })
      }
    } catch (err) {
      sendResponse({ ok: false, error: String(err?.message || err) })
    }
  })()
  return true // 异步响应
})

// ── 工具栏图标：探活 → 未注入则强制注入 → 切换显示 ─────────────
async function ping(tabId) {
  try {
    const r = await chrome.tabs.sendMessage(tabId, { type: 'PING' })
    return !!r?.ok
  } catch {
    return false
  }
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id) return
  const url = tab.url || ''
  if (/^(chrome|edge|about|devtools|chrome-extension|view-source):/i.test(url) ||
      /chromewebstore\.google\.com/.test(url)) {
    chrome.action.setTitle({ tabId: tab.id, title: '浏览器内部页面不允许注入，请换一个普通网页' })
    return
  }

  let alive = await ping(tab.id)
  if (!alive) {
    // 安装扩展前已打开的标签页不会自动注入，这里兜底手动注入一次
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['data/terms.js', 'content.js']
      })
      alive = await ping(tab.id)
    } catch (err) {
      chrome.action.setTitle({ tabId: tab.id, title: `注入失败：${String(err?.message || err).slice(0, 100)}` })
      return
    }
  }
  if (alive) chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE' }).catch(() => {})
})
