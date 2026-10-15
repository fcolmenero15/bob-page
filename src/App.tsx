import { useState, useEffect, useMemo } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

type ResourceType = 'video' | 'doc' | 'demo'

interface Resource {
  id: string
  title: string
  url: string
  type: ResourceType
  tags: string[]
  stage?: number
}

const RESOURCES: Resource[] = [
  // Videos
  { id: 'v1', title: 'Meet Bob: AI-Powered IDE', url: 'https://www.youtube.com/watch?v=Mdbq1dD6Yuo', type: 'video', tags: ['intro', 'overview'], stage: 1 },
  { id: 'v2', title: 'Specification-Driven Development', url: 'https://www.youtube.com/watch?v=33zFrqwhKOI', type: 'video', tags: ['workflow', 'prompting'], stage: 3 },
  { id: 'v3', title: 'AI-First Product Development Lifecycle', url: 'https://www.youtube.com/watch?v=Yw0i4SfgRBk', type: 'video', tags: ['workflow', 'overview'], stage: 3 },
  { id: 'v4', title: 'How to Use Modes in Bob IDE', url: 'https://www.youtube.com/watch?v=5ZrHKpDDiT8', type: 'video', tags: ['modes', 'features'], stage: 3 },
  { id: 'v5', title: 'Custom Modes, MCP Servers & Rules', url: 'https://www.youtube.com/watch?v=MzmcVd2DJmk', type: 'video', tags: ['customization', 'mcp'], stage: 5 },
  { id: 'v6', title: 'Bob + watsonx Orchestrate – MCP Tools & Agents', url: 'https://www.youtube.com/watch?v=5v8E-YbSPMo', type: 'video', tags: ['mcp', 'agents', 'advanced'], stage: 5 },
  { id: 'v7', title: 'IBM Bob YouTube Channel', url: 'https://www.youtube.com/@ibm-bob', type: 'video', tags: ['overview'], stage: 1 },
  // Docs
  { id: 'd1', title: 'IBM Bob Overview', url: 'https://bob.ibm.com/', type: 'doc', tags: ['intro', 'overview'], stage: 1 },
  { id: 'd2', title: 'IBM Bob Product Overview', url: 'https://www.ibm.com/products/ai-coding-agent', type: 'doc', tags: ['intro', 'overview'], stage: 1 },
  { id: 'd3', title: 'Bob Documentation / Getting Started', url: 'https://bob.ibm.com/docs/ide', type: 'doc', tags: ['intro', 'getting-started'], stage: 2 },
  { id: 'd4', title: 'Tutorial Series Introduction', url: 'https://bob.ibm.com/docs/ide/tutorials/introduction', type: 'doc', tags: ['tutorial', 'intro'], stage: 2 },
  { id: 'd5', title: 'Start a Project – /init & AGENTS.md', url: 'https://bob.ibm.com/docs/ide/tutorials/start-a-project', type: 'doc', tags: ['tutorial', 'getting-started'], stage: 2 },
  { id: 'd6', title: 'Bob Best Practices', url: 'https://bob.ibm.com/docs/ide/getting-started/best-practices', type: 'doc', tags: ['best-practices', 'workflow'], stage: 3 },
  { id: 'd7', title: 'Plan / Agent / Ask Modes', url: 'https://bob.ibm.com/docs/ide/features/modes', type: 'doc', tags: ['modes', 'features'], stage: 3 },
  { id: 'd8', title: 'Write Effective Prompts', url: 'https://bob.ibm.com/docs/ide/tutorials/write-effective-prompts', type: 'doc', tags: ['prompting', 'tutorial'], stage: 3 },
  { id: 'd9', title: 'Literate Coding', url: 'https://bob.ibm.com/docs/ide/features/literate-coding', type: 'doc', tags: ['features', 'workflow'], stage: 4 },
  { id: 'd10', title: 'Code Actions', url: 'https://bob.ibm.com/docs/ide/features/code-actions', type: 'doc', tags: ['features', 'code-quality'], stage: 4 },
  { id: 'd11', title: 'Code Reviews', url: 'https://bob.ibm.com/docs/ide/features/code-reviews', type: 'doc', tags: ['features', 'code-quality'], stage: 4 },
  { id: 'd12', title: 'Bob Tips / Quality Findings', url: 'https://bob.ibm.com/docs/ide/features/bob-tips', type: 'doc', tags: ['tips', 'code-quality'], stage: 4 },
  { id: 'd13', title: 'Custom Modes', url: 'https://bob.ibm.com/docs/ide/configuration/custom-modes', type: 'doc', tags: ['customization', 'modes'], stage: 5 },
  { id: 'd14', title: 'Custom Rules', url: 'https://bob.ibm.com/docs/ide/configuration/rules', type: 'doc', tags: ['customization'], stage: 5 },
  { id: 'd15', title: 'Skills', url: 'https://bob.ibm.com/docs/ide/features/skills', type: 'doc', tags: ['features', 'customization'], stage: 5 },
  { id: 'd16', title: "Standardize Bob's Behavior", url: 'https://bob.ibm.com/docs/ide/tutorials/standardize-bobs-behavior', type: 'doc', tags: ['tutorial', 'customization', 'team'], stage: 5 },
  { id: 'd17', title: 'Understanding MCP', url: 'https://bob.ibm.com/docs/ide/configuration/mcp/understanding-mcp', type: 'doc', tags: ['mcp', 'advanced'], stage: 5 },
  { id: 'd18', title: 'MCP in Bob', url: 'https://bob.ibm.com/docs/ide/configuration/mcp/mcp-in-bob', type: 'doc', tags: ['mcp', 'advanced'], stage: 5 },
  { id: 'd19', title: 'Bob Security Guidance', url: 'https://bob.ibm.com/docs/ide/security/bob-security-guidance', type: 'doc', tags: ['security', 'advanced'], stage: 4 },
  { id: 'd20', title: 'Modernize Node.js / Express App', url: 'https://bob.ibm.com/docs/ide/tutorials/modernize-nodejs-express-api', type: 'doc', tags: ['tutorial', 'modernization'], stage: 6 },
  // Demos
  { id: 'g1', title: 'IBM Bob Demo – Main Repository', url: 'https://github.com/IBM/bob-demo', type: 'demo', tags: ['demo', 'overview'], stage: 6 },
  { id: 'g2', title: 'Configure Bob Modes', url: 'https://github.com/IBM/bob-demo/tree/main/bob-modes', type: 'demo', tags: ['demo', 'modes', 'customization'], stage: 5 },
  { id: 'g3', title: 'Getting Started with Skills', url: 'https://github.com/IBM/bob-demo/tree/main/getting-started-skills', type: 'demo', tags: ['demo', 'skills', 'getting-started'], stage: 5 },
  { id: 'g4', title: 'Using Java with Skills', url: 'https://github.com/IBM/bob-demo/tree/main/using-java-skills', type: 'demo', tags: ['demo', 'java', 'skills'], stage: 6 },
  { id: 'g5', title: 'Ansible DevOps', url: 'https://github.com/IBM/bob-demo/tree/main/ansible-devops', type: 'demo', tags: ['demo', 'devops', 'ansible'], stage: 6 },
  { id: 'g6', title: 'Tekton DevOps / CI Pipeline', url: 'https://github.com/IBM/bob-demo/tree/main/tekton-devops', type: 'demo', tags: ['demo', 'devops', 'ci-cd'], stage: 6 },
  { id: 'g7', title: 'Modernize EJB to Quarkus', url: 'https://github.com/IBM/bob-demo/tree/main/modernize-ejb-to-quarkus', type: 'demo', tags: ['demo', 'modernization', 'java'], stage: 6 },
  { id: 'g8', title: 'Legacy Application → MCP', url: 'https://github.com/IBM/bob-demo/tree/main/legacy-to-mcp', type: 'demo', tags: ['demo', 'mcp', 'modernization'], stage: 6 },
  { id: 'g9', title: 'Automated Architecture Tests / Taikai', url: 'https://github.com/IBM/bob-demo/tree/main/automated-architecture-taikai', type: 'demo', tags: ['demo', 'testing', 'architecture'], stage: 6 },
  { id: 'g10', title: 'Ground Bob with Internal Documentation', url: 'https://github.com/IBM/bob-demo/tree/main/indexing-documentation', type: 'demo', tags: ['demo', 'documentation', 'advanced'], stage: 6 },
  { id: 'g11', title: 'Quarkus AI Integration', url: 'https://github.com/IBM/bob-demo/tree/main/quarkus-ai-integration', type: 'demo', tags: ['demo', 'ai', 'quarkus'], stage: 6 },
  { id: 'g12', title: 'Beads Issue Tracking Integration', url: 'https://github.com/IBM/bob-demo/tree/main/beads', type: 'demo', tags: ['demo', 'integration', 'advanced'], stage: 6 },
]

interface Stage {
  id: number
  title: string
  subtitle: string
  description: string
  accent: string
  resources: string[]
}

const STAGES: Stage[] = [
  {
    id: 1,
    title: 'Orientation',
    subtitle: 'Understand what Bob is',
    description: "Get familiar with IBM Bob — the AI-powered IDE — through introductory videos and product overviews before writing a single line of code.",
    accent: '#4589FF',
    resources: ['v1', 'v7', 'd1', 'd2'],
  },
  {
    id: 2,
    title: 'First Steps',
    subtitle: 'Set up your first project',
    description: 'Work through the official getting-started docs and tutorials. Initialize your first project, understand AGENTS.md, and complete the tutorial series introduction.',
    accent: '#0F62FE',
    resources: ['d3', 'd4', 'd5'],
  },
  {
    id: 3,
    title: 'Core Workflows',
    subtitle: 'Write prompts that work',
    description: 'Learn how to prompt effectively, choose the right mode (Plan / Agent / Ask), and adopt the practices that make daily AI-assisted development feel natural.',
    accent: '#0043CE',
    resources: ['v2', 'v3', 'v4', 'd6', 'd7', 'd8'],
  },
  {
    id: 4,
    title: 'Code Quality',
    subtitle: 'Review, refine, and secure',
    description: 'Leverage Bob\'s code actions, review capabilities, literate coding features, and quality findings to produce secure, well-structured output.',
    accent: '#E53737',
    resources: ['d9', 'd10', 'd11', 'd12', 'd19'],
  },
  {
    id: 5,
    title: 'Customization & MCP',
    subtitle: 'Shape Bob to your team',
    description: 'Configure custom modes, rules, and skills. Connect Bob to external tools via MCP and standardize behavior across your entire team.',
    accent: '#CC0000',
    resources: ['v5', 'v6', 'd13', 'd14', 'd15', 'd16', 'd17', 'd18', 'g2', 'g3'],
  },
  {
    id: 6,
    title: 'Real-World Projects',
    subtitle: 'Apply at scale',
    description: 'Tackle full-scale modernization, DevOps automation, and integration projects using the IBM Bob demo repository as your guide.',
    accent: '#AD0000',
    resources: ['d20', 'g1', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12'],
  },
]

const RESOURCE_MAP = Object.fromEntries(RESOURCES.map(r => [r.id, r]))

// ─── Icons ───────────────────────────────────────────────────────────────────

function IconVideo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 6.5L15 4.5V11.5L11 9.5V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function IconDoc({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="1" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 5H9M5 8H11M5 11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconDemo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 4L8 8L4 12M8 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconArrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconSearch({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Video Embed ──────────────────────────────────────────────────────────────

function getYouTubeId(url: string): string | null {
  const m = url.match(/[?&]v=([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

function VideoEmbed({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false)
  const id = getYouTubeId(url)
  if (!id) return null

  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '16/9' }}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          className="absolute inset-0 w-full h-full group"
          onClick={() => setPlaying(true)}
          aria-label="Play video"
        >
          <img
            src={thumb}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#CC0000">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      )}
    </div>
  )
}

// ─── Resource Badge ───────────────────────────────────────────────────────────

const TYPE_META: Record<ResourceType, { label: string; color: string; bg: string }> = {
  video: { label: 'Video', color: '#DA1E28', bg: '#FFF1F1' },
  doc: { label: 'Doc', color: '#0043CE', bg: '#EDF5FF' },
  demo: { label: 'Demo', color: '#198038', bg: '#DEFBE6' },
}

function TypeBadge({ type }: { type: ResourceType }) {
  const m = TYPE_META[type]
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-sm"
      style={{ color: m.color, background: m.bg }}
    >
      {type === 'video' && <IconVideo size={11} />}
      {type === 'doc' && <IconDoc size={11} />}
      {type === 'demo' && <IconDemo size={11} />}
      {m.label}
    </span>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

type Page = 'home' | 'learn' | 'resources' | 'personalized'

const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'learn', label: 'Learn' },
  { page: 'resources', label: 'Resources' },
  { page: 'personalized', label: 'Personalized Resources' },
]

function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  return (
    <header className="sticky top-0 z-50 bg-[#161616] border-b border-[#393939]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-12 flex items-center justify-between gap-4">
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
        >
          <div className="w-6 h-6 bg-[#0F62FE] flex items-center justify-center rounded-sm">
            <span className="text-white text-xs font-bold leading-none">B</span>
          </div>
          <span className="hidden sm:inline text-sm font-medium tracking-wide whitespace-nowrap">IBM Bob Learning for Honda</span>
        </button>
        <nav className="flex items-center overflow-x-auto">
          {NAV_ITEMS.map(item => (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className="px-2.5 sm:px-4 h-12 text-xs sm:text-sm font-medium transition-colors hover:bg-[#393939] hover:text-white whitespace-nowrap"
              style={{
                color: page === item.page ? '#ffffff' : '#C6C6C6',
                borderBottom: page === item.page ? '2px solid #0F62FE' : '2px solid transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL
const FA = `${BASE}figma-assets`

function PlayIcon() {
  return (
    <img src={`${FA}/398e7.svg`} alt="Play" className="w-8 h-8" />
  )
}

interface EnterpriseRow {
  imageSide: 'left' | 'right'
  imgSrc: string
  imgBg: string
  hasPlay?: boolean
  title: string
  body: string | string[]
  footnote?: string
}

const ENTERPRISE_ROWS: EnterpriseRow[] = [
  {
    imageSide: 'left',
    imgSrc: `${FA}/5ab52.png`,
    imgBg: '#e4f1ff',
    hasPlay: true,
    title: 'Spend Less. Get More AI.',
    body: [
      'Bob delivers predictable cost efficiency without requiring exceptionally high cache hit rates to achieve savings.',
      'The pooled team token model allows Bobcoins to be distributed across users and teams. Transparent pricing and built-in cost optimization ensures your investment goes further.',
    ],
  },
  {
    imageSide: 'right',
    imgSrc: `${FA}/72d9b.png`,
    imgBg: '#e4f1ff',
    title: 'Enterprise Visibility at Every Level',
    body: [
      'With Bobalytics, you gain access to a complete view of usage, adoption, cost, and business impact.',
      'From executive dashboards to per-thread consumption tracking, Bob helps you responsibly scale AI with confidence.',
    ],
  },
  {
    imageSide: 'left',
    imgSrc: `${FA}/18377.png`,
    imgBg: '#e4f1ff',
    hasPlay: true,
    title: 'Always the Right AI for the Job',
    body: "Bob's multi-model platform gives your teams access to the top models for the correct tasks, intelligently optimizing for performance, quality, and cost behind the scenes.",
  },
  {
    imageSide: 'right',
    imgSrc: `${FA}/080e2.png`,
    imgBg: '#d9d9d9',
    title: 'Security across the SLDC',
    body: 'Bob embeds enterprise security and governance across the entire software development lifecycle, enabling organizations to enforce their own policies, protect sensitive data, control AI behavior, and maintain auditability through release.',
  },
  {
    imageSide: 'left',
    imgSrc: `${FA}/8ad72.png`,
    imgBg: '#e4f1ff',
    title: 'Autonomous Iteration with Premium Packages',
    body: "Bob's Premium Packages bring specialized, structured AI workflows to the platforms and languages your enterprise depends on most, with the domain expertise to get real work done. Bob runs a Build → Test → Diagnose → Fix loop, automatically resolving issues and iterating until it produces reliable, working output.",
    footnote: 'Java Modernization  |  IBM i  |  IBM Z',
  },
]

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-white relative overflow-hidden" style={{ minHeight: 488 }}>
        <div className="max-w-[1280px] mx-auto px-12 flex items-center" style={{ minHeight: 488, paddingTop: 64, paddingBottom: 64 }}>
          {/* Left text */}
          <div className="w-[565px] flex-shrink-0 py-16">
            <p className="text-[32px] font-bold leading-[40px] text-[#191a1b] mb-0">
              {'Your new favorite '}
              <span
                className="font-bold"
                style={{ background: 'linear-gradient(to right, #0065ff 67.3%, #8b6bff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                IDE.
              </span>
            </p>
            <div className="mt-[60px] text-[20px] text-[#191a1b] leading-[28px]">
              <p>
                <span
                  className="font-bold"
                  style={{ background: 'linear-gradient(to right, #866bff 5.3%, #3d68ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  Bob
                </span>
                {' is an AI-powered software engineer built into your IDE that reads your codebase, writes real code, and ships changes so you spend less time typing and more time building.'}
              </p>
            </div>
            <button
              onClick={() => setPage('learn')}
              className="mt-8 flex items-center gap-8 bg-[#0f62fe] text-white text-[14px] font-medium min-w-48 px-4 py-[15px] hover:bg-[#0043ce] transition-colors"
            >
              Start learning
              <span className="ml-auto"><IconArrow /></span>
            </button>
          </div>

          {/* Right: dark mockup panel */}
          <div className="flex-1 relative" style={{ height: 488 }}>
            {/* Dark backdrop blocks */}
            <div className="absolute bg-[#191a1b]" style={{ left: 128 + 63, top: 37, width: 320, height: 196 }} />
            <div className="absolute bg-[#191a1b]" style={{ left: 128 + 0, top: 167, width: 399, height: 200 }} />
            <div className="absolute bg-[#191a1b]" style={{ left: 128 + 327, top: 0, width: 74, height: 27 }} />
            <div className="absolute bg-[#191a1b]" style={{ left: 128 + 48, top: 375, width: 334, height: 17 }} />
            {/* Main IDE screenshot */}
            <img
              src={`${FA}/31274.png`}
              alt="IBM Bob IDE screenshot"
              className="absolute object-cover rounded-[37px]"
              style={{ left: 128, top: 0, width: 447, height: 414 }}
            />
            {/* Chat bubbles */}
            <div
              className="absolute flex items-center justify-center px-[10px] py-[10px] rounded-[26px]"
              style={{ left: 128 + 24 - 128, top: 181, width: 291, background: 'linear-gradient(90deg, #8ab8ff, #174091)' }}
            >
              <p className="text-[12px] text-white leading-[16px] tracking-[0.32px]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Bob, I just joined this project. Explain what this service does and how data flows through it.
              </p>
            </div>
            <div
              className="absolute flex items-center justify-center px-[10px] py-[10px] rounded-[26px]"
              style={{ left: 128 + 351 - 128, top: 233, width: 272, background: 'linear-gradient(90deg, #553978, #c7a6f0)' }}
            >
              <div className="text-[12px] text-white leading-[16px] tracking-[0.32px] whitespace-pre" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                <p>Bob, does this code comply with our data</p>
                <p>residency policy? Flag anything suspicious.</p>
              </div>
            </div>
            <div
              className="absolute flex items-center justify-center px-[10px] py-[10px] rounded-[26px]"
              style={{ left: 128 + 58 - 128, top: 312, background: 'linear-gradient(90deg, #e7f2ff, #8994a8)' }}
            >
              <p className="text-[12px] text-black leading-[16px] tracking-[0.32px] whitespace-nowrap" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                Bob, help me integrate IBM software into my existing applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Learn IBM Bob / Stages ────────────────────────── */}
      <section className="bg-[#f4f4f4] px-10 py-[50px]">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-5">
          {/* Heading block */}
          <div>
            <p className="text-[36px] font-normal leading-[40px] text-[#161616]">Learn IBM Bob</p>
          </div>
          <div>
            <p className="text-[16px] text-[#525252] leading-[26px]">Build confidence using Bob by learning the features and workflows most relevant to your role.</p>
            <p className="text-[16px] text-[#525252] leading-[26px]">This website provides focused guidance to help you navigate Bob effectively and get the most out of the platform.</p>
          </div>
          {/* Curriculum label + heading */}
          <div className="mt-4">
            <p className="text-[12px] font-medium text-[#0f62fe] uppercase tracking-[1.2px] leading-[16px]">Curriculum</p>
            <p className="text-[36px] font-light text-[#161616] leading-[40px] mt-3">Six stages to mastery</p>
          </div>
          {/* Stage grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e0e0e0]">
            {STAGES.map(stage => (
              <div key={stage.id} className="bg-white p-8 flex flex-col">
                <div className="flex items-start justify-between mb-0">
                  <div className="w-10 h-10 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0" style={{ background: stage.accent }}>
                    {stage.id}
                  </div>
                  <span className="text-[12px] text-[#8d8d8d]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{stage.resources.length} resources</span>
                </div>
                <p className="text-[18px] font-semibold text-[#161616] leading-[28px] mt-6">{stage.title}</p>
                <p className="text-[14px] font-medium text-[#0f62fe] leading-[20px] mt-1">{stage.subtitle}</p>
                <p className="text-[14px] text-[#525252] leading-[22.75px] mt-3">{stage.description}</p>
              </div>
            ))}
          </div>
          {/* CTA buttons */}
          <div className="flex gap-4 mt-2 justify-center">
            <button
              onClick={() => setPage('learn')}
              className="flex items-center gap-2 px-6 py-3 bg-[#0f62fe] text-white text-[14px] font-medium leading-[20px] hover:bg-[#0043ce] transition-colors"
            >
              Start Learning
              <img src={`${FA}/702ce.svg`} alt="" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage('resources')}
              className="flex items-center px-6 py-3 border border-[#525252] text-[#c6c6c6] text-[14px] font-medium leading-[20px] hover:border-[#c6c6c6] hover:text-white transition-colors"
            >
              Browse All Resources
            </button>
          </div>
          {/* Contact line */}
          <p className="text-[16px] text-[#525252] text-center leading-[26px] mt-2">
            Have a specific use case you're curious about?{' '}
            <a href="mailto:bansini@ibm.com?subject=Bob%20Learning" className="text-[#0f62fe] hover:underline">Contact IBM client engineering →</a>
          </p>
        </div>
      </section>

      {/* ── Built for Enterprise ─────────────────────────── */}
      <section className="bg-white overflow-hidden">
        <h2 className="text-[36px] font-normal text-black text-center pt-[88px] pb-[50px] leading-normal">
          Built for Enterprise Engineering Teams
        </h2>
        <div className="border-t border-[#e0e0e0]">
          {ENTERPRISE_ROWS.map((row, i) => (
            <div key={i} className="flex flex-col md:flex-row border-b border-[#e0e0e0]" style={{ minHeight: 369 }}>
              {row.imageSide === 'left' ? (
                <>
                  <div className="w-full md:w-1/2 relative flex items-center justify-center" style={{ background: row.imgBg, minHeight: 369 }}>
                    <img src={row.imgSrc} alt={row.title} className="w-[350px] h-[338px] object-cover" />
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center px-[138px] py-10">
                    <h3 className="text-[24px] font-normal text-black leading-normal mb-[37px]">{row.title}</h3>
                    {Array.isArray(row.body)
                      ? row.body.map((p, j) => <p key={j} className="text-[18px] text-[#5a5a5a] leading-[26px] mb-[7px]">{p}</p>)
                      : <p className="text-[18px] text-[#5a5a5a] leading-[26px]">{row.body}</p>
                    }
                    {row.footnote && <p className="text-[18px] font-medium text-[#5a5a5a] leading-[26px] mt-2">{row.footnote}</p>}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-1/2 flex flex-col justify-center px-[138px] py-10 order-2 md:order-1">
                    <h3 className="text-[24px] font-normal text-black leading-normal mb-[37px]">{row.title}</h3>
                    {Array.isArray(row.body)
                      ? row.body.map((p, j) => <p key={j} className="text-[18px] text-[#5a5a5a] leading-[26px] mb-[7px]">{p}</p>)
                      : <p className="text-[18px] text-[#5a5a5a] leading-[26px]">{row.body}</p>
                    }
                    {row.footnote && <p className="text-[18px] font-medium text-[#5a5a5a] leading-[26px] mt-2">{row.footnote}</p>}
                  </div>
                  <div className="w-full md:w-1/2 relative flex items-center justify-center order-1 md:order-2" style={{ background: row.imgBg, minHeight: 369 }}>
                    <img src={row.imgSrc} alt={row.title} className="w-[350px] h-[350px] object-cover" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Interested in Bob? ────────────────────────────── */}
      <section className="bg-white py-20 flex flex-col items-center gap-2 border-t border-[#e0e0e0]">
        <h2 className="text-[32px] font-normal text-black leading-[40px]">Interested in Bob?</h2>
        <a
          href="https://bob.ibm.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 bg-[#0f62fe] text-white text-[14px] leading-[18px] tracking-[0.16px] px-4 py-[15px] hover:bg-[#0043ce] transition-colors"
        >
          See it in action
        </a>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="bg-[#161616] px-8 py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-start justify-between mb-16">
            <div className="pl-4">
              <img src={`${FA}/b4967.svg`} alt="IBM" className="h-[52px]" style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }} />
            </div>
          </div>
          <div className="border-t border-[#6f6f6f] pt-6 flex flex-wrap gap-0">
            <div className="flex flex-col gap-2 px-4 w-[320px]">
              <button onClick={() => setPage('home')} className="text-[14px] text-[#f4f4f4] leading-[20px] tracking-[0.16px] text-left hover:underline">Home</button>
              <button onClick={() => setPage('learn')} className="text-[14px] text-[#f4f4f4] leading-[20px] tracking-[0.16px] text-left hover:underline">Learning Roadmap</button>
              <button onClick={() => setPage('resources')} className="text-[14px] text-[#f4f4f4] leading-[20px] tracking-[0.16px] text-left hover:underline">All Resources</button>
              <button onClick={() => setPage('personalized')} className="text-[14px] text-[#f4f4f4] leading-[20px] tracking-[0.16px] text-left hover:underline">Personalized Resources</button>
            </div>
            <div className="flex flex-col gap-2 px-4 w-[320px]">
              <a href="https://www.ibm.com/contact/global" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#f4f4f4] leading-[20px] tracking-[0.16px] hover:underline">Contact IBM</a>
              <a href="https://www.ibm.com/us-en/privacy" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#f4f4f4] leading-[20px] tracking-[0.16px] hover:underline">Privacy</a>
            </div>
            <div className="flex flex-col gap-2 px-4 w-[320px]">
              <a href="https://www.ibm.com/legal" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#f4f4f4] leading-[20px] tracking-[0.16px] hover:underline">Terms of use</a>
              <a href="https://www.ibm.com/able/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#f4f4f4] leading-[20px] tracking-[0.16px] hover:underline">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Learn Page ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ibmbob-completed'

function LearnPage() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return new Set(stored ? JSON.parse(stored) : [])
    } catch {
      return new Set()
    }
  })
  const [expanded, setExpanded] = useState<number | null>(1)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]))
  }, [completed])

  const toggle = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const stageProgress = (stage: Stage) => {
    const done = stage.resources.filter(id => completed.has(id)).length
    return { done, total: stage.resources.length, pct: Math.round((done / stage.resources.length) * 100) }
  }

  const totalDone = [...completed].filter(id => RESOURCE_MAP[id]).length
  const totalResources = STAGES.reduce((s, st) => s + st.resources.length, 0)
  const overallPct = Math.round((totalDone / totalResources) * 100)

  const completedStages = STAGES.filter(s => stageProgress(s).pct === 100).length

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <div className="bg-[#161616] text-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium text-[#4589FF] uppercase tracking-widest mb-3">Learning Roadmap</p>
          <h1 className="text-4xl font-light mb-2">Learn IBM Bob</h1>
          <p className="text-[#8D8D8D] text-sm mb-10">Work through each stage in order — or jump to what matters most right now.</p>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-semibold">{overallPct}%</div>
              <div className="text-xs text-[#8D8D8D] mt-1">Overall progress</div>
            </div>
            <div>
              <div className="text-3xl font-semibold">{totalDone}/{totalResources}</div>
              <div className="text-xs text-[#8D8D8D] mt-1">Resources completed</div>
            </div>
            <div>
              <div className="text-3xl font-semibold">{completedStages}/{STAGES.length}</div>
              <div className="text-xs text-[#8D8D8D] mt-1">Stages finished</div>
            </div>
          </div>
          <div className="mt-6 h-1 bg-[#393939] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0F62FE] transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stages */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-4">
        {STAGES.map((stage, idx) => {
          const prev = STAGES[idx - 1]
          const prevDone = !prev || stageProgress(prev).pct === 100
          const { done, total, pct } = stageProgress(stage)
          const isExpanded = expanded === stage.id
          const isComplete = pct === 100

          return (
            <div
              key={stage.id}
              className="bg-white border border-[#E0E0E0]"
              style={{ opacity: (!prevDone && !isComplete && done === 0) ? 0.6 : 1 }}
            >
              {/* Stage header */}
              <button
                className="w-full flex items-center gap-6 p-6 text-left hover:bg-[#F4F4F4] transition-colors"
                onClick={() => setExpanded(isExpanded ? null : stage.id)}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center text-white text-lg font-semibold flex-shrink-0 transition-all"
                  style={{ background: isComplete ? '#198038' : stage.accent }}
                >
                  {isComplete ? <IconCheck size={20} /> : stage.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-[#161616]">{stage.title}</span>
                    {isComplete && (
                      <span className="text-xs px-2 py-0.5 bg-[#DEFBE6] text-[#198038] font-medium">Complete</span>
                    )}
                  </div>
                  <span className="text-sm text-[#525252]">{stage.subtitle}</span>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-medium text-[#161616]">{done}/{total}</div>
                    <div className="text-xs text-[#8D8D8D]">done</div>
                  </div>
                  <div className="w-16 h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{ width: `${pct}%`, background: isComplete ? '#198038' : stage.accent }}
                    />
                  </div>
                  <div
                    className="w-6 h-6 flex items-center justify-center text-[#8D8D8D] transition-transform"
                    style={{ transform: isExpanded ? 'rotate(90deg)' : 'none' }}
                  >
                    <IconArrow size={14} />
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-[#E0E0E0]">
                  <div className="p-6 pb-4 text-sm text-[#525252] leading-relaxed bg-[#FAFAFA] border-b border-[#E0E0E0]">
                    {stage.description}
                  </div>
                  <div className="divide-y divide-[#F4F4F4]">
                    {stage.resources.map(rid => {
                      const res = RESOURCE_MAP[rid]
                      if (!res) return null
                      const done = completed.has(rid)
                      const hasEmbed = res.type === 'video' && !!getYouTubeId(res.url)
                      return (
                        <div key={rid} className="hover:bg-[#F4F4F4] transition-colors group">
                          <div className="flex items-center gap-4 px-6 py-4">
                          <button
                            onClick={() => toggle(rid)}
                            className="w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all"
                            style={{
                              borderColor: done ? '#198038' : '#8D8D8D',
                              background: done ? '#198038' : 'white',
                              color: 'white',
                            }}
                            title={done ? 'Mark incomplete' : 'Mark complete'}
                          >
                            {done && <IconCheck size={12} />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium hover:underline"
                              style={{ color: done ? '#8D8D8D' : '#0F62FE', textDecoration: done ? 'line-through' : undefined }}
                            >
                              {res.title}
                            </a>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {res.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-xs text-[#8D8D8D] font-mono">#{tag}</span>
                              ))}
                            </div>
                          </div>
                          <TypeBadge type={res.type} />
                          </div>
                          {hasEmbed && (
                            <div className="px-6 pb-4">
                              <VideoEmbed url={res.url} />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {pct === 100 && (
                    <div className="px-6 py-4 bg-[#DEFBE6] border-t border-[#A7F0BA] text-sm text-[#198038] font-medium flex items-center gap-2">
                      <IconCheck size={14} />
                      Stage complete — well done!
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Reset */}
      <div className="max-w-4xl mx-auto px-6 pb-16 text-right">
        <button
          onClick={() => { if (confirm('Reset all progress?')) setCompleted(new Set()) }}
          className="text-xs text-[#8D8D8D] hover:text-[#525252] transition-colors underline underline-offset-2"
        >
          Reset progress
        </button>
      </div>
    </div>
  )
}

// ─── Personalized Resources Page ──────────────────────────────────────────────

interface PersonalizedResource {
  title: string
  description: string
  type: 'PowerPoint' | 'PDF'
  url: string
  preview: string
  accent: string
  eyebrow: string
}

const FEATURED_PRESENTATION: PersonalizedResource = {
  title: 'Lab Intro',
  description: 'An introduction to the IBM i application modernization lab and the exercises prepared for the Honda team.',
  type: 'PowerPoint',
  url: `${BASE}personalized-resources/lab-intro.pptx`,
  preview: `${BASE}personalized-resources/Lab%20Intro.svg`,
  accent: '#0F62FE',
  eyebrow: 'Featured presentation',
}

const PERSONALIZED_RESOURCES: PersonalizedResource[] = [
  {
    title: 'Bobathon Setup',
    description: 'Setup instructions and prerequisites for the IBM i application modernization labs.',
    type: 'PDF',
    url: `${BASE}personalized-resources/bobathon-setup.pdf`,
    preview: `${BASE}personalized-resources/Bobathon%20Setup.jpg`,
    accent: '#0F62FE',
    eyebrow: 'Lab preparation',
  },
  {
    title: 'Bob Intro',
    description: 'An overview of IBM Bob and its AI-powered software development experience.',
    type: 'PowerPoint',
    url: `${BASE}personalized-resources/bob-intro.pptx`,
    preview: `${BASE}personalized-resources/Bob%20Intro.png`,
    accent: '#8A3FFC',
    eyebrow: 'Product introduction',
  },
  {
    title: 'Use Case Discovery',
    description: 'A guided presentation for identifying and shaping high-value modernization use cases.',
    type: 'PowerPoint',
    url: `${BASE}personalized-resources/use-case-discovery.pptx`,
    preview: `${BASE}personalized-resources/Use%20Case%20Discovery.svg`,
    accent: '#DA1E28',
    eyebrow: 'Discovery workshop',
  },
]

function DocumentPreview({ resource, featured = false }: { resource: PersonalizedResource; featured?: boolean }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block overflow-hidden bg-white border border-[#c6c6c6] aspect-video group/preview ${featured ? 'cursor-zoom-in' : ''}`}
      aria-label={`Open ${resource.title}`}
    >
      <img
        src={resource.preview}
        alt={`${resource.title} document preview`}
        className="w-full h-full object-contain transition-transform duration-300 group-hover/preview:scale-[1.02]"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-black/75 to-transparent px-4 pt-10 pb-3 opacity-0 group-hover/preview:opacity-100 transition-opacity">
        <span className="text-xs font-medium text-white">Open {resource.type}</span>
        <span className="text-white"><IconArrow size={16} /></span>
      </div>
      {featured && (
        <div className="absolute left-4 top-4 bg-[#0f62fe] px-3 py-1.5 text-xs font-medium text-white">
          Featured
        </div>
      )}
    </a>
  )
}

function PersonalizedResourcesPage() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const visibleResources = Array.from({ length: Math.min(3, PERSONALIZED_RESOURCES.length) }, (_, offset) => (
    PERSONALIZED_RESOURCES[(carouselIndex + offset) % PERSONALIZED_RESOURCES.length]
  ))

  const moveCarousel = (direction: number) => {
    setCarouselIndex(current => (
      (current + direction + PERSONALIZED_RESOURCES.length) % PERSONALIZED_RESOURCES.length
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#f4f4f4] px-6 py-12 sm:px-10 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
            <div>
              <p className="text-xs font-medium text-[#0f62fe] uppercase tracking-widest mb-3">Featured for Honda</p>
            </div>
          </div>

          <div className="bg-[#262626] p-4 sm:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto shadow-2xl">
              <DocumentPreview resource={FEATURED_PRESENTATION} featured />
            </div>
            <div className="max-w-4xl mx-auto mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-white">
                <p className="text-lg font-medium">{FEATURED_PRESENTATION.title}</p>
                <p className="text-sm text-[#c6c6c6] mt-1">{FEATURED_PRESENTATION.description}</p>
              </div>
              <a
                href={FEATURED_PRESENTATION.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex self-start sm:self-auto items-center gap-8 bg-[#0f62fe] px-4 py-3 text-sm font-medium text-white whitespace-nowrap hover:bg-[#0043ce] transition-colors"
              >
                Open presentation
                <IconArrow size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-medium text-[#0f62fe] uppercase tracking-widest mb-3">Your library</p>
              <h2 className="text-3xl sm:text-4xl font-light text-[#161616]">All personalized resources</h2>
            </div>
            <p className="hidden md:block text-sm text-[#525252]">{carouselIndex + 1} of {PERSONALIZED_RESOURCES.length}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleResources.map((resource, index) => (
              <article key={`${resource.title}-${carouselIndex}-${index}`} className={`${index > 0 ? 'hidden md:block' : ''} group`}>
                <DocumentPreview resource={resource} />
                <div className="pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: resource.accent }}>{resource.type}</span>
                    <span className="text-[#c6c6c6]">·</span>
                    <span className="text-xs text-[#8d8d8d]">Open document</span>
                  </div>
                  <h3 className="text-xl font-normal">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-[#161616] group-hover:text-[#0f62fe] hover:underline transition-colors">
                      {resource.title}
                    </a>
                  </h3>
                  <p className="text-sm leading-relaxed text-[#525252] mt-2">{resource.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-[#e0e0e0] flex items-center justify-between">
            <button
              onClick={() => moveCarousel(-1)}
              className="w-12 h-12 border border-[#8d8d8d] flex items-center justify-center text-[#161616] hover:bg-[#161616] hover:text-white transition-colors"
              aria-label="Show previous resources"
            >
              <span className="rotate-180"><IconArrow size={20} /></span>
            </button>
            <div className="flex items-center gap-2" aria-hidden="true">
              {PERSONALIZED_RESOURCES.map((resource, index) => (
                <span
                  key={resource.title}
                  className={`h-1 transition-all ${index === carouselIndex ? 'w-8 bg-[#0f62fe]' : 'w-4 bg-[#c6c6c6]'}`}
                />
              ))}
            </div>
            <button
              onClick={() => moveCarousel(1)}
              className="w-12 h-12 bg-[#161616] flex items-center justify-center text-white hover:bg-[#0f62fe] transition-colors"
              aria-label="Show next resources"
            >
              <IconArrow size={20} />
            </button>
          </div>
        </div>
      </section>

      <div className="border-t border-[#e0e0e0] px-6 py-5 sm:px-10 text-right">
        <p className="text-xs text-[#525252] uppercase tracking-wider">IBM confidential — please do not share</p>
      </div>
    </div>
  )
}

// ─── Resources Page ────────────────────────────────────────────────────────────

const ALL_TYPES: ResourceType[] = ['video', 'doc', 'demo']
const ALL_TAGS = Array.from(new Set(RESOURCES.flatMap(r => r.tags))).sort()

function ResourcesPage() {
  const [query, setQuery] = useState('')
  const [activeTypes, setActiveTypes] = useState<Set<ResourceType>>(new Set())
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [activeStage, setActiveStage] = useState<number | null>(null)

  const toggleType = (t: ResourceType) => {
    setActiveTypes(prev => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }
  const toggleTag = (t: string) => {
    setActiveTags(prev => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  const filtered = useMemo(() => {
    return RESOURCES.filter(r => {
      if (activeTypes.size > 0 && !activeTypes.has(r.type)) return false
      if (activeTags.size > 0 && !r.tags.some(t => activeTags.has(t))) return false
      if (activeStage !== null && r.stage !== activeStage) return false
      if (query.trim()) {
        const q = query.toLowerCase()
        if (!r.title.toLowerCase().includes(q) && !r.tags.some(t => t.includes(q))) return false
      }
      return true
    })
  }, [query, activeTypes, activeTags, activeStage])

  const clearAll = () => {
    setQuery('')
    setActiveTypes(new Set())
    setActiveTags(new Set())
    setActiveStage(null)
  }

  const hasFilters = query || activeTypes.size > 0 || activeTags.size > 0 || activeStage !== null

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <div className="bg-[#161616] text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-medium text-[#4589FF] uppercase tracking-widest mb-3">Resource Library</p>
          <h1 className="text-4xl font-light mb-6">All Resources</h1>
          <div className="relative max-w-xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D8D8D]">
              <IconSearch size={18} />
            </div>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full bg-[#262626] border border-[#525252] text-white placeholder-[#525252] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#0F62FE] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8 flex-col lg:flex-row">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-56 flex-shrink-0 space-y-6">
          {/* Type */}
          <div>
            <h3 className="text-xs font-semibold text-[#161616] uppercase tracking-wider mb-3">Type</h3>
            <div className="space-y-2">
              {ALL_TYPES.map(t => {
                const m = TYPE_META[t]
                const active = activeTypes.has(t)
                return (
                  <button
                    key={t}
                    onClick={() => toggleType(t)}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm transition-colors"
                    style={{
                      background: active ? m.bg : 'white',
                      color: active ? m.color : '#525252',
                      borderLeft: active ? `3px solid ${m.color}` : '3px solid transparent',
                    }}
                  >
                    {t === 'video' && <IconVideo size={13} />}
                    {t === 'doc' && <IconDoc size={13} />}
                    {t === 'demo' && <IconDemo size={13} />}
                    {m.label}
                    <span className="ml-auto text-xs text-[#8D8D8D]">
                      {RESOURCES.filter(r => r.type === t).length}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Stage */}
          <div>
            <h3 className="text-xs font-semibold text-[#161616] uppercase tracking-wider mb-3">Stage</h3>
            <div className="space-y-1.5">
              {STAGES.map(s => {
                const active = activeStage === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStage(active ? null : s.id)}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm transition-colors"
                    style={{
                      background: active ? '#EDF5FF' : 'white',
                      color: active ? '#0043CE' : '#525252',
                      borderLeft: active ? `3px solid ${s.accent}` : '3px solid transparent',
                    }}
                  >
                    <span
                      className="w-5 h-5 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                      style={{ background: s.accent }}
                    >
                      {s.id}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xs font-semibold text-[#161616] uppercase tracking-wider mb-3">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map(tag => {
                const active = activeTags.has(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="text-xs px-2 py-1 transition-colors font-mono"
                    style={{
                      background: active ? '#0F62FE' : '#E0E0E0',
                      color: active ? '#fff' : '#525252',
                    }}
                  >
                    #{tag}
                  </button>
                )
              })}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-[#0F62FE] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-[#525252]">
              <span className="font-semibold text-[#161616]">{filtered.length}</span> of {RESOURCES.length} resources
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white border border-[#E0E0E0] p-16 text-center">
              <div className="text-[#8D8D8D] mb-2">No resources match your filters.</div>
              <button onClick={clearAll} className="text-sm text-[#0F62FE] hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(res => {
                const hasEmbed = res.type === 'video' && !!getYouTubeId(res.url)
                return (
                  <div
                    key={res.id}
                    className="bg-white border border-[#E0E0E0] hover:border-[#0F62FE] hover:shadow-sm transition-all group overflow-hidden"
                  >
                    {hasEmbed && <VideoEmbed url={res.url} />}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[#161616] group-hover:text-[#0F62FE] transition-colors leading-snug hover:underline"
                        >
                          {res.title}
                        </a>
                        <TypeBadge type={res.type} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {res.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs text-[#8D8D8D] font-mono">#{tag}</span>
                          ))}
                        </div>
                        {res.stage && (
                          <span
                            className="text-xs px-2 py-0.5 text-white flex-shrink-0"
                            style={{ background: STAGES[res.stage - 1]?.accent }}
                          >
                            Stage {res.stage}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <Nav page={page} setPage={setPage} />
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'learn' && <LearnPage />}
      {page === 'resources' && <ResourcesPage />}
      {page === 'personalized' && <PersonalizedResourcesPage />}
    </div>
  )
}
