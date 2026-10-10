/**
 * 营销黑话词典 · 悬浮球 —— content script
 *
 * - 用 Shadow DOM 挂载 UI，和宿主页面的 CSS 互不干扰
 * - 词库 = 预置词条（data/terms.js）+ 我的词条（chrome.storage.local，AI 查到后收录）
 * - 支持拖动（记住位置）、划词即查、分类筛选、隐藏 / 唤出
 */
;(function () {
  if (window.__MJB_MOUNTED__) return
  window.__MJB_MOUNTED__ = true

  const DATA = window.__MJB_DATA__ || {}
  const PRESET = DATA.terms || []
  const CATS = DATA.categories || {}
  const K_CUSTOM = 'mjb_custom'
  const K_POS = 'mjb_pos'
  const K_HIDDEN = 'mjb_hidden'

  const state = { open: false, hidden: false, q: '', cat: 'all', ai: null, aiLoading: false, aiError: '' }
  let custom = []
  let lastSelection = ''

  // ── 工具函数 ───────────────────────────────────────────
  const esc = (s) =>
    String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

  function allEntries() {
    const mine = custom.map((e) => Object.assign({}, e, { _mine: true }))
    const mineTerms = new Set(mine.map((e) => e.term))
    return mine.concat(PRESET.filter((p) => !mineTerms.has(p.term)))
  }

  function rank(e, q) {
    if (!q) return 0
    const t = e.term.toLowerCase()
    const en = (e.termEn || '').toLowerCase()
    if (t === q || en === q) return 0
    if (t.startsWith(q) || en.startsWith(q)) return 1
    if (t.includes(q) || en.includes(q)) return 2
    return 3 // 仅释义命中
  }

  function filtered() {
    const q = state.q.trim().toLowerCase()
    return allEntries()
      .filter((e) => state.cat === 'all' || e.category === state.cat)
      .filter((e) => !q || [e.term, e.termEn, e.definition].some((s) => (s || '').toLowerCase().includes(q)))
      .sort((a, b) => rank(a, q) - rank(b, q))
  }

  // ── UI 挂载 ────────────────────────────────────────────
  const host = document.createElement('div')
  host.id = '__mjb_host__'
  host.style.cssText = 'all:initial;position:fixed;z-index:2147483646;right:24px;bottom:24px;'
  const root = host.attachShadow({ mode: 'open' })

  const chips = [['all', '全部']].concat(Object.entries(CATS))
  root.innerHTML = `
  <style>
    *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;}
    .ball{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#ff2442,#ff6b81);
      color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;cursor:grab;
      box-shadow:0 6px 18px rgba(255,36,66,.35);user-select:none;transition:transform .15s;touch-action:none;}
    .ball:hover{transform:scale(1.07);} .ball.dragging{cursor:grabbing;}
    .panel{position:absolute;width:370px;max-height:540px;background:#fff;border-radius:14px;
      box-shadow:0 12px 40px rgba(0,0,0,.2);display:flex;flex-direction:column;overflow:hidden;color:#1d2129;font-size:13px;}
    .panel[hidden]{display:none;}
    .panel.up{bottom:64px;} .panel.down{top:64px;} .panel.r{right:0;} .panel.l{left:0;}
    .hd{display:flex;align-items:center;gap:6px;padding:12px 14px;background:linear-gradient(135deg,#ff2442,#ff6b81);color:#fff;}
    .hd b{flex:1;font-size:14px;}
    .hd button{border:0;background:rgba(255,255,255,.22);color:#fff;border-radius:6px;padding:3px 8px;font-size:12px;cursor:pointer;}
    .search{display:flex;gap:6px;padding:10px 14px 6px;}
    .search input{flex:1;border:1px solid #e5e6eb;border-radius:8px;padding:7px 10px;font-size:13px;outline:none;}
    .search input:focus{border-color:#ff2442;}
    .btn{border:0;border-radius:8px;padding:7px 10px;background:#ff2442;color:#fff;font-size:12px;cursor:pointer;white-space:nowrap;}
    .btn.ghost{background:#f2f3f5;color:#4e5969;} .btn:disabled{opacity:.5;cursor:default;}
    .chips{display:flex;flex-wrap:wrap;gap:6px;padding:2px 14px 8px;}
    .chip{border:1px solid #eee;border-radius:999px;padding:2px 10px;font-size:12px;color:#4e5969;background:#fafafa;cursor:pointer;}
    .chip.on{background:#ff2442;border-color:#ff2442;color:#fff;}
    .list{overflow-y:auto;padding:0 14px 12px;flex:1;}
    .meta{color:#86909c;font-size:12px;padding:2px 0 4px;}
    .item{padding:10px 0;border-top:1px solid #f2f3f5;}
    .term{font-weight:600;font-size:14px;}
    .en{color:#86909c;font-size:12px;margin-left:6px;font-weight:400;font-style:italic;}
    .tag{display:inline-block;font-size:11px;padding:0 6px;border-radius:4px;background:#f2f3f5;color:#4e5969;margin-left:6px;vertical-align:1px;}
    .tag.mine{background:#fff1f3;color:#ff2442;}
    .def{margin-top:4px;line-height:1.65;color:#1d2129;}
    .ex{margin-top:3px;color:#86909c;line-height:1.5;font-size:12px;}
    .del{float:right;border:0;background:none;color:#c9cdd4;cursor:pointer;font-size:12px;}
    .del:hover{color:#f53f3f;}
    .empty{padding:18px 0 8px;text-align:center;color:#86909c;line-height:1.9;}
    .card{margin:6px 0 10px;padding:12px;border-radius:10px;background:#fffafa;border:1px dashed #ffb3bf;}
    .card .actions{margin-top:10px;display:flex;gap:6px;}
    .warn{margin-top:6px;font-size:12px;color:#a8710a;background:#fffbe6;padding:4px 8px;border-radius:4px;}
    .err{color:#f53f3f;font-size:12px;line-height:1.6;}
    .link{color:#ff2442;cursor:pointer;text-decoration:underline;}
    .spin{color:#86909c;padding:8px 0;}
  </style>
  <div class="ball" id="ball" title="营销黑话词典（可拖动）">💬</div>
  <div class="panel up r" id="panel" hidden>
    <div class="hd"><b>💬 营销黑话词典</b>
      <button id="hide" title="隐藏悬浮球，点击浏览器工具栏图标可唤回">隐藏</button>
      <button id="close">收起</button>
    </div>
    <div class="search">
      <input id="q" type="text" placeholder="搜词条 / 英文 / 释义，如 CTR、种草" />
      <button class="btn ghost" id="ask" title="让 AI 解释当前输入的词">🤖 问 AI</button>
    </div>
    <div class="chips" id="chips">${chips
      .map(([k, v]) => `<span class="chip${k === 'all' ? ' on' : ''}" data-cat="${esc(k)}">${esc(v)}</span>`)
      .join('')}</div>
    <div class="list" id="list"></div>
  </div>`

  const $ = (id) => root.getElementById(id)
  const ball = $('ball')
  const panel = $('panel')
  const input = $('q')
  const list = $('list')

  // ── 渲染 ───────────────────────────────────────────────
  function aiCardHtml() {
    if (state.aiLoading) return `<div class="card spin">🤖 AI 正在查「${esc(state.q.trim())}」，通常需要 5～20 秒…</div>`
    if (state.aiError) {
      const msg =
        state.aiError === 'NO_CONFIG'
          ? '还没配置 AI 接口。<span class="link" data-act="options">去设置</span>（填写 API Key 后即可使用）'
          : esc(state.aiError)
      return `<div class="card err">${msg}</div>`
    }
    const a = state.ai
    if (!a) return ''
    const exists = allEntries().some((e) => e.term === a.term)
    return `<div class="card">
      <div><span class="term">${esc(a.term)}</span>${a.termEn ? `<span class="en">${esc(a.termEn)}</span>` : ''}
        <span class="tag">${esc(CATS[a.category] || a.category)}</span><span class="tag mine">AI</span></div>
      <div class="def">${esc(a.definition)}</div>
      ${a.examples.map((x) => `<div class="ex">例：${esc(x)}</div>`).join('')}
      ${a.isJargon ? '' : '<div class="warn">AI 判断这个词不太算行业黑话，收录前请再确认。</div>'}
      <div class="actions">
        <button class="btn" data-act="save"${exists ? ' disabled' : ''}>${exists ? '词典里已有' : '✅ 收进我的词典'}</button>
        <button class="btn ghost" data-act="discard">不要了</button>
      </div></div>`
  }

  function renderList() {
    const rows = filtered()
    const q = state.q.trim()
    const head = aiCardHtml()
    let body
    if (!rows.length) {
      body = q
        ? `<div class="empty">词典里还没有「${esc(q)}」<br><button class="btn" data-act="ask">🤖 让 AI 解释一下</button></div>`
        : '<div class="empty">这个分类下暂时没有词条</div>'
    } else {
      body =
        `<div class="meta">共 ${rows.length} 条${custom.length ? ` · 我的词条 ${custom.length} 条` : ''}</div>` +
        rows
          .map(
            (e) => `<div class="item">
          ${e._mine ? `<button class="del" data-act="del" data-term="${esc(e.term)}" title="删除这条">删除</button>` : ''}
          <span class="term">${esc(e.term)}</span>${e.termEn ? `<span class="en">${esc(e.termEn)}</span>` : ''}
          <span class="tag">${esc(CATS[e.category] || e.category)}</span>${e._mine ? '<span class="tag mine">我的</span>' : ''}
          <div class="def">${esc(e.definition)}</div>
          ${(e.examples || []).slice(0, 2).map((x) => `<div class="ex">例：${esc(x)}</div>`).join('')}
        </div>`
          )
          .join('')
    }
    list.innerHTML = head + body
  }

  function placePanel() {
    const r = host.getBoundingClientRect()
    const up = r.top > Math.min(560, window.innerHeight / 2)
    const right = r.right >= 380
    panel.className = `panel ${up ? 'up' : 'down'} ${right ? 'r' : 'l'}`
  }

  function openPanel() {
    state.open = true
    placePanel()
    panel.hidden = false
    if (lastSelection) {
      input.value = state.q = lastSelection
      lastSelection = ''
    }
    renderList()
    setTimeout(() => input.focus(), 0)
  }

  function closePanel() {
    state.open = false
    panel.hidden = true
  }

  function setHidden(v) {
    state.hidden = v
    host.style.display = v ? 'none' : ''
    if (v) closePanel()
    chrome.storage.local.set({ [K_HIDDEN]: v })
  }

  // ── AI 查词 ────────────────────────────────────────────
  function askAi() {
    const term = state.q.trim()
    if (!term || state.aiLoading) return
    state.ai = null
    state.aiError = ''
    state.aiLoading = true
    renderList()
    chrome.runtime.sendMessage({ type: 'AI_LOOKUP', term }, (resp) => {
      state.aiLoading = false
      if (chrome.runtime.lastError) state.aiError = '扩展已更新，请刷新页面后重试'
      else if (resp?.ok) state.ai = resp.data
      else state.aiError = resp?.error || '查询失败'
      renderList()
    })
  }

  function saveAi() {
    const a = state.ai
    if (!a || allEntries().some((e) => e.term === a.term)) return
    custom = [Object.assign({}, a, { addedAt: Date.now() })].concat(custom)
    chrome.storage.local.set({ [K_CUSTOM]: custom })
    state.ai = null
    renderList()
  }

  // ── 事件 ───────────────────────────────────────────────
  input.addEventListener('input', () => {
    state.q = input.value
    state.ai = null
    state.aiError = ''
    renderList()
  })
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !filtered().length) askAi()
    if (e.key === 'Escape') closePanel()
    e.stopPropagation() // 避免触发宿主页面的快捷键
  })
  $('ask').addEventListener('click', askAi)
  $('close').addEventListener('click', closePanel)
  $('hide').addEventListener('click', () => setHidden(true))

  $('chips').addEventListener('click', (e) => {
    const c = e.target.closest('.chip')
    if (!c) return
    state.cat = c.dataset.cat
    root.querySelectorAll('.chip').forEach((x) => x.classList.toggle('on', x === c))
    renderList()
  })

  list.addEventListener('click', (e) => {
    const t = e.target.closest('[data-act]')
    if (!t) return
    const act = t.dataset.act
    if (act === 'ask') askAi()
    else if (act === 'save') saveAi()
    else if (act === 'discard') {
      state.ai = null
      renderList()
    } else if (act === 'options') chrome.runtime.sendMessage({ type: 'OPEN_OPTIONS' })
    else if (act === 'del') {
      custom = custom.filter((x) => x.term !== t.dataset.term)
      chrome.storage.local.set({ [K_CUSTOM]: custom })
      renderList()
    }
  })

  // 划词：记住页面上最近选中的短文本，打开面板时自动填入
  document.addEventListener('mouseup', (e) => {
    if (e.composedPath().includes(host)) return
    const s = String(window.getSelection() || '').trim()
    if (s && s.length <= 30) lastSelection = s
  })

  // 拖动：移动超过 4px 视为拖动，否则视为点击
  let drag = null
  ball.addEventListener('pointerdown', (e) => {
    const r = host.getBoundingClientRect()
    drag = { x: e.clientX, y: e.clientY, left: r.left, top: r.top, moved: false }
    ball.setPointerCapture(e.pointerId)
  })
  ball.addEventListener('pointermove', (e) => {
    if (!drag) return
    const dx = e.clientX - drag.x
    const dy = e.clientY - drag.y
    if (!drag.moved && Math.hypot(dx, dy) < 4) return
    drag.moved = true
    ball.classList.add('dragging')
    applyPos({ left: drag.left + dx, top: drag.top + dy })
    if (state.open) placePanel()
  })
  ball.addEventListener('pointerup', () => {
    if (!drag) return
    const moved = drag.moved
    drag = null
    ball.classList.remove('dragging')
    if (moved) {
      const r = host.getBoundingClientRect()
      chrome.storage.local.set({ [K_POS]: { left: r.left, top: r.top } })
    } else {
      state.open ? closePanel() : openPanel()
    }
  })

  function applyPos(p) {
    const left = Math.max(4, Math.min(window.innerWidth - 56, p.left))
    const top = Math.max(4, Math.min(window.innerHeight - 56, p.top))
    Object.assign(host.style, { left: left + 'px', top: top + 'px', right: 'auto', bottom: 'auto' })
  }

  // 来自 background 的消息：探活 / 工具栏图标切换
  chrome.runtime.onMessage.addListener((msg, _s, send) => {
    if (msg?.type === 'PING') send({ ok: true })
    else if (msg?.type === 'TOGGLE') {
      if (state.hidden) {
        setHidden(false)
        openPanel()
      } else state.open ? closePanel() : openPanel()
      send({ ok: true })
    }
  })

  // 多个标签页之间同步「我的词条」
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes[K_CUSTOM]) {
      custom = changes[K_CUSTOM].newValue || []
      if (state.open) renderList()
    }
  })

  // ── 初始化 ─────────────────────────────────────────────
  chrome.storage.local.get([K_CUSTOM, K_POS, K_HIDDEN], (res) => {
    custom = res[K_CUSTOM] || []
    if (res[K_POS]) applyPos(res[K_POS])
    state.hidden = !!res[K_HIDDEN]
    host.style.display = state.hidden ? 'none' : ''
    document.documentElement.appendChild(host)
  })
})()
