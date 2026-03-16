import React, { useState, useEffect } from "react";

// ─── NAV SECTIONS ───────────────────────────────────────────────────────────
const navSections = [
  { id: "roadmap", label: "Roadmap", icon: "🗺️" },
  { id: "how-to", label: "How to Use", icon: "💡" },
  { id: "skills-masterclass", label: "Skills Masterclass", icon: "⚡" },
  { id: "cowork-intro", label: "Cowork คืออะไร", icon: "🤖" },
  { id: "cowork-setup", label: "ตั้งค่า Cowork", icon: "⚙️" },
  { id: "prompt", label: "Prompt Engineering", icon: "✍️" },
  { id: "artifacts", label: "Artifacts", icon: "🎨" },
  { id: "customize", label: "ปรับแต่ง Cowork", icon: "🔧" },
  { id: "best-practices", label: "17 Best Practices", icon: "🏆" },
  { id: "folder-setup", label: "โครงสร้างโฟลเดอร์", icon: "📁" },
  { id: "connectors", label: "Connectors Guide", icon: "🔌" },
  { id: "cowork-mastery", label: "Cowork Mastery", icon: "🎯" },
  { id: "use-cases", label: "Use Cases & รายได้", icon: "💼" },
  { id: "workflows", label: "Workflows จริง", icon: "🚀" },
  { id: "power-tips", label: "Power Tips", icon: "⚡" },
  { id: "claude-tutor", label: "Claude as Tutor", icon: "🎓" },
  { id: "resources", label: "แหล่งเรียนรู้", icon: "📚" },
  { id: "ruben-guide", label: "30 นาทีแรก", icon: "📖" },
];

// ─── SKILLS MODULES DATA ─────────────────────────────────────────────────────
const skillsModules = [
  { id: "intro", label: "เกริ่นนำ", icon: "🎯", color: "#a78bfa" },
  { id: "m1", label: "Module 1: Foundations", icon: "🌱", color: "#60a5fa" },
  { id: "m2", label: "Module 2: Architecture", icon: "🏗️", color: "#34d399" },
  { id: "m3", label: "Module 3: Testing", icon: "🧪", color: "#f59e0b" },
  { id: "m4", label: "Module 4: Production", icon: "🚀", color: "#ec4899" },
];

// ─── HOW TO USE DATA (FROM INFOGRAPHIC) ───────────────────────────────────────
const howToData = [
  {
    title: "Chat",
    icon: "💬",
    color: "#a78bfa",
    desc: "จุดเริ่มต้น ที่ที่คนส่วนใหญ่มักจะหยุดอยู่แค่นี้",
    prompt: '"เขียนอีเมลนี้ใหม่ให้ดูตรงไปตรงมาขึ้นแต่ไม่หยาบคาย"',
    tip: "เปิด Extended Thinking + Search ก่อนพิมพ์ prompt เสมอ 2 คลิกที่จะเปลี่ยนทุกอย่าง",
    mistake: "แปะประวัติ/ข้อมูลส่วนตัวในทุกแชทใหม่ (นั่นคือหน้าที่ของ Projects)"
  },
  {
    title: "Cowork",
    icon: "🤖",
    color: "#ec4899",
    desc: "Cowork อ่านไฟล์ของคุณและสร้างเอกสารจริง (Excel, Word, PDF) ลงในโฟลเดอร์ของคุณเลย",
    prompt: '"อ่านไฟล์ของฉันก่อน แล้วถามคำถามฉันก่อนที่คุณจะเริ่มทำงาน"',
    tip: "เขียนไฟล์ .md 1 ไฟล์เกี่ยวกับตัวคุณ (คุณทำอะไร เขียนแบบไหน) แล้ว Claude จะเลิกตอบแบบ AI ทั่วไป",
    mistake: "โยนไฟล์ 200 ไฟล์ลงไปแล้วหวังว่า Claude จะทำได้ดี (5 ไฟล์ที่ดี ชนะ 50 ไฟล์ที่เละเทะ)"
  },
  {
    title: "Projects",
    icon: "📂",
    color: "#f59e0b",
    desc: "บันทึกคำสั่งและไฟล์ไว้ครั้งเดียว ทุกแชทใหม่ใน Project นั้นจะจำได้ทั้งหมด",
    prompt: 'ลองทำแบบนี้: สร้างโปรเจกต์ "HOOK" → อัปโหลดตัวอย่าง hook ที่ดีที่สุด 30 อัน → ดราฟต์ต่อไปจะตรงกับสไตล์คุณ',
    tip: "1 Project ต่อ 1 งานที่ทำซ้ำ อย่าสร้าง mega-Project อันเดียวแล้วใส่ทุกอย่าง",
    mistake: "อัปโหลดไฟล์อ้างอิง 30 ไฟล์ Claude จะไม่รู้ว่าอันไหนสำคัญ คุณต้องเป็นคนเลือกอันที่ดีที่สุด ไม่ใช่ AI"
  },
  {
    title: "Artifacts",
    icon: "🎨",
    color: "#34d399",
    desc: "Claude สร้างไฟล์แบบ Interactive ที่คุณกดใช้งาน แก้ไข และดาวน์โหลดได้ในแชทเลย",
    prompt: '"สร้างเครื่องคิดเลขคำนวณงบรายเดือน มีช่องใส่ค่าเช่า ค่าของชำ ฯลฯ และอัปเดตยอดรวมแบบ real time"',
    tip: 'สั่งให้แก้หลังจากสร้างเสร็จ เช่น "เปลี่ยนเป็นโหมดมืด" Artifacts มัน live - คุณปรับแก้ได้ทันทีในแชท',
    mistake: "คิดว่ามันเป็นแค่ตัวเดโม่ (จริงๆ แล้วสั่งให้สร้างสิ่งที่ปกติคุณจะทำใน Spreadsheet หรือ Canva ได้เลย)"
  },
  {
    title: "Excel",
    icon: "📊",
    color: "#10b981",
    desc: "Add-in ใน Excel ที่อ่านสูตร, tab, และการอ้างอิงเซลล์ของคุณได้จริงๆ ไม่ใช่แค่อ่านเป็น text ทื่อๆ",
    prompt: '"ทำไมเซลล์ B4 ถึงขึ้น #REF? ช่วยหาต้นตอ error หน่อย"',
    tip: 'ติดตั้งผ่าน Excel → Insert → Get Add-ins → ค้นหา "Claude by Anthropic" เปิดใช้ด้วย Ctrl+Alt+C',
    mistake: "หวังให้มันทำ Macros หรือ VBA (จริงๆ มันช่วยสร้าง คลีนข้อมูล และอธิบาย แต่ไม่ได้กดปุ่มรันอัตโนมัติให้)"
  },
  {
    title: "Connectors",
    icon: "🔌",
    color: "#3b82f6",
    desc: "เชื่อมต่อ Slack, Google Drive, Notion, Gamma และแอปอื่นอีก 50+ ตัว ค้นหาข้อมูลกลางแชทได้เลย",
    prompt: '"หาไฟล์ Q3 sales deck ใน Drive ให้หน่อย" - ไม่ต้องอัปโหลด ไม่ต้องแคปจอ',
    tip: "ใช้ Gamma connector ใน Cowork เพื่อเปลี่ยนจาก prompt → เค้าโครง → สไลด์พรีเซนต์ที่เสร็จสมบูรณ์",
    mistake: "คิดว่ามันซิงค์แบบ live ตลอดเวลา (จริงๆ Claude แค่ค้นหาข้อมูลเมื่อคุณสั่ง ไม่ได้เฝ้าดู 24 ชม.)"
  },
  {
    title: "Plugins",
    icon: "🧩",
    color: "#6366f1",
    desc: "แพ็กเกจสกิลแบบคลิกเดียวที่เพิ่มคำสั่ง (/) สำหรับงาน Sales, Marketing, Legal, Data และอื่นๆ",
    prompt: "ติดตั้ง Marketing plugin → พิมพ์ /draft-post → ได้โพสต์ LinkedIn พร้อม CTA เฉพาะเจาะจง",
    tip: "พิมพ์ / ในแชทไหนก็ได้เพื่อดูคำสั่งทั้งหมดที่มี นั่นคือพลังที่แท้จริง",
    mistake: "ติดตั้งทีเดียวทั้ง 11 plugins แต่ละอันเพิ่มบริบทให้ Claude ต้องประมวลผล เลือกแค่ 2 อันที่ตรงกับงานจริงก็พอ"
  },
  {
    title: "Skills",
    icon: "⚡",
    color: "#8b5cf6",
    desc: "ชุดคำสั่งที่ใช้ซ้ำได้ ซึ่งทำให้ Claude ทำงานเฉพาะเจาะจงได้เก่งขึ้นแบบอัตโนมัติ",
    prompt: "ไปที่ Settings → เปิด Code Execution → เลือกดู Skills library ที่มีให้ → ติดตั้ง",
    tip: "คุณสร้างเองได้! เขียนไฟล์ Skill.md ใส่กฎของคุณ (เช่น brand guidelines, เช็คลิสต์ตรวจงาน)",
    mistake: "สับสนระหว่าง Skills กับ Projects (Projects คือที่เก็บไฟล์ ส่วน Skills คือการสอน Claude ว่าต้องทำงานนั้นยังไง)"
  }
];

// ─── ROADMAP STEPS ────────────────────────────────────────────────────────────
const roadmapSteps = [
  { step: "01", title: "ติดตั้ง & ตั้งค่า", subtitle: "ดาวน์โหลด Claude Desktop + Pro Plan", color: "#a78bfa", items: ["Claude Desktop (Mac/Win)", "สมัคร Pro/Max Plan", "Login & ทำความรู้จัก UI", "เปิด Cowork Tab ครั้งแรก"], icon: "🌱", section: "cowork-setup", level: 1 },
  { step: "02", title: "เข้าใจ Ecosystem", subtitle: "Chat, Cowork, Code — ใช้อะไรเมื่อไหร่", color: "#c084fc", items: ["Claude Chat vs Cowork vs Code", "Projects คืออะไร", "ข้อจำกัดที่ควรรู้", "Plans: Pro vs Max vs Team"], icon: "🗺️", section: "cowork-intro", level: 1 },
  { step: "03", title: "Prompt Engineering", subtitle: "สูตร 3 ส่วนที่ทำให้ Claude ทำงานได้จริง", color: "#60a5fa", items: ["Task + Context + Output", "AskUserQuestion tool", "Autonomous Mode", "Prompt ดี vs แย่"], icon: "✍️", section: "prompt", level: 1 },
  { step: "04", title: "Artifacts", subtitle: "สร้าง apps, charts, tools ใน Chat", color: "#38bdf8", items: ["Artifacts 5 ประเภท", "React / HTML / SVG / Code", "Claude-in-Claude AI Apps", "Iterate real-time"], icon: "🎨", section: "artifacts", level: 2 },
  { step: "05", title: "Connectors & ปรับแต่ง", subtitle: "เชื่อม Gmail, Notion, Slack และอีก 50+ tools", color: "#34d399", items: ["Connectors Setup (OAuth)", "Plugins & Custom Skills", "Notion → Excel real case", "Multi-tool Automation"], icon: "🔌", section: "connectors", level: 2 },
  { step: "06", title: "โครงสร้างโฟลเดอร์", subtitle: "Context Files ที่ทำให้ Claude รู้จักคุณ", color: "#6ee7b7", items: ["about-me.md + my-voice.md", "my-rules.md + _MANIFEST.md", "Global Instructions template", "Folder Instructions"], icon: "🏗️", section: "folder-setup", level: 2 },
  { step: "07", title: "Cowork Mastery", subtitle: "สั่งงาน AI แทนทำเอง — ราบรื่นทุก session", color: "#f59e0b", items: ["Mental Model: Director", "4 Delegation Levels", "/schedule Automation", "Power Features ที่คนไม่รู้"], icon: "🎯", section: "cowork-mastery", level: 3 },
  { step: "08", title: "Skills Masterclass", subtitle: "สร้าง Skills ที่ trigger ทำงานแทนคุณ", color: "#fb923c", items: ["Anatomy of a Skill", "YAML Triggers & Instructions", "Multi-skill Orchestration", "Production Deployment"], icon: "⚡", section: "skills-masterclass", level: 3 },
  { step: "09", title: "17 Best Practices", subtitle: "เทคนิคจาก 400+ sessions จริง", color: "#f97316", items: ["Context Architecture", "Subagents & Scheduling", "Automation Safety", "Efficiency Patterns"], icon: "🏆", section: "best-practices", level: 3 },
  { step: "10", title: "Use Cases & รายได้", subtitle: "ประยุกต์ใช้จริง + สร้างรายได้จาก AI", color: "#ec4899", items: ["10 Real Use Cases", "Use Cases ตามอาชีพ", "4 Income Models", "90-Day Roadmap"], icon: "💰", section: "use-cases", level: 4 },
];

// ─── USER LEVELS ──────────────────────────────────────────────────────────────
const userLevels = [
  { level: 1, name: "The Prompter", thaiName: "นักสนทนา", emoji: "💬", color: "#a78bfa", desc: "เปิดใช้งาน Chat ถามไปมาได้คำตอบ รู้จัก Claude Projects", skills: ["Claude Chat", "Prompt พื้นฐาน", "Projects", "Learning Style"], nextStep: "เรียน Artifacts + Connectors เพื่อสร้างผลงานจริง", roadmapSteps: ["01", "02", "03"] },
  { level: 2, name: "The Builder", thaiName: "นักสร้าง", emoji: "🔨", color: "#34d399", desc: "เชื่อม Connectors เช่น Gmail, Notion ใช้ Artifacts สร้าง apps และ dashboards", skills: ["Connectors 50+", "Artifacts (React/HTML/SVG)", "Claude-in-Claude Apps", "Notion Integration"], nextStep: "เรียน Cowork + Skills เพื่อ automate งานทั้งหมด", roadmapSteps: ["04", "05", "06"] },
  { level: 3, name: "The Automator", thaiName: "นักออโตเมท", emoji: "⚡", color: "#f59e0b", desc: "ใช้ Cowork automate งาน สร้าง Skills ของตัวเอง ตั้ง /schedule workflows", skills: ["Cowork Mastery", "Custom Skills", "Skills Marketplace", "/schedule Automation"], nextStep: "เรียน Claude Code เพื่อสร้าง apps และ workflows เต็มรูปแบบ", roadmapSteps: ["07", "08", "09"] },
  { level: 4, name: "The Operator", thaiName: "ผู้บัญชาการ AI", emoji: "🚀", color: "#ec4899", desc: "Claude Code ทำ automated workflows เต็มรูปแบบ สร้างเว็บ/แอป สร้างรายได้จาก AI", skills: ["Claude Code", "Full Automation", "App/Web Builder", "AI Income Streams"], nextStep: "คุณถึงจุดสูงสุดแล้ว! สอนคนอื่นและสร้างรายได้", roadmapSteps: ["10"] },
];

// ─── PRACTICES ────────────────────────────────────────────────────────────────
const practices = [
  { num: 1, title: "สร้าง _MANIFEST.md ทุกโฟลเดอร์", impact: "สูงสุด", desc: "บอก Claude ว่าไฟล์ไหนคือ source of truth แบ่ง Tier 1 (สำคัญ), Tier 2 (domain), Tier 3 (archive) ป้องกันปัญหา context ขัดแย้งกัน", color: "#a78bfa" },
  { num: 2, title: "Global Instructions = OS ของคุณ", impact: "สูงมาก", desc: "ตั้งครั้งเดียว ทำงานทุก session บอก Claude ว่าคุณเป็นใคร ต้องการอะไร และ quality bar ที่ต้องการ", color: "#60a5fa" },
  { num: 3, title: "Context Files 3 ไฟล์หลัก", impact: "สูงมาก", desc: "about-me.md, brand-voice.md, working-style.md ขจัดปัญหา generic AI output overnight", color: "#34d399" },
  { num: 4, title: "Folder Instructions ต่อโปรเจกต์", impact: "สูง", desc: "Global = universal, Folder = project-specific รวมกัน 3 layers: Global → Folder → Prompt", color: "#f59e0b" },
  { num: 5, title: "Scope Context ให้แน่นเสมอ", impact: "สูง", desc: "Context ใหญ่ ≠ output ดี บอก Claude ให้อ่านเฉพาะที่จำเป็น ลด noise ในการตัดสินใจ", color: "#ec4899" },
  { num: 6, title: "Define End State ไม่ใช่ Process", impact: "สูง", desc: "บอกว่า 'done' หน้าตาเป็นยังไง ไม่ใช่วิธีทำทีละขั้น Claude จะหาวิธีเองได้ดีกว่า", color: "#f97316" },
  { num: 7, title: "ขอ Plan ก่อน Execute เสมอ", impact: "สูง", desc: "ป้องกัน disaster 90% ใส่ใน Global Instructions: 'Show plan, wait for approval before executing'", color: "#a78bfa" },
  { num: 8, title: "บอกวิธีจัดการความไม่แน่นอน", impact: "กลาง-สูง", desc: "บอก Claude ว่าถ้าไม่แน่ใจให้ mark ว่า VERIFY หรือใส่ /needs-review ไม่ใช่ให้ guess เอง", color: "#60a5fa" },
  { num: 9, title: "Batch งานที่เกี่ยวข้องใน 1 Session", impact: "กลาง", desc: "ทุก session มี startup cost รวม 5 งานที่เชื่อมกัน Context จาก task แรกจะช่วย task ถัดไป", color: "#34d399" },
  { num: 10, title: "ใช้ Subagents แบบตั้งใจ", impact: "กลาง-สูง", desc: "Parallel processing สำหรับงานที่ independent กัน เช่น วิเคราะห์ 4 vendor พร้อมกัน ลดเวลา 75%", color: "#f59e0b" },
  { num: 11, title: "/schedule งาน Recurring", impact: "กลาง", desc: "ตั้ง Monday briefing, Friday report, Daily competitor tracking ทำงานอัตโนมัติ (ต้องเปิดแอปไว้)", color: "#ec4899" },
  { num: 12, title: "Externalize ทุกอย่างเป็นไฟล์", impact: "สูงมาก", desc: "Cowork ไม่มี memory ข้าม session ทุก preference ต้องอยู่ในไฟล์ สร้างครั้งเดียว ใช้ตลอด", color: "#f97316" },
  { num: 13, title: "/schedule + Connectors = Real Automation", impact: "สูง", desc: "Scheduled tasks + Gmail/Slack connector = ระบบ autonomous จริงๆ ที่ทำงานโดยไม่ต้องสั่ง", color: "#a78bfa" },
  { num: 14, title: "Stack Plugins หลายตัวพร้อมกัน", impact: "กลาง", desc: "Data Analysis + Sales plugin ใน 1 task ได้เลย ใช้ความสามารถจากหลาย plugin รวมกัน", color: "#60a5fa" },
  { num: 15, title: "สร้าง Custom Skills", impact: "สูง", desc: "Workflow ที่ทำบ่อยๆ → เขียนเป็น Skill file ครั้งต่อไปแค่พูดว่า 'Run my [skill name]'", color: "#34d399" },
  { num: 16, title: "ใช้ Plugin Management Plugin", impact: "กลาง", desc: "สร้าง custom plugin แบบ conversational ไม่ต้องเขียนโค้ด บอกว่าต้องการอะไร Claude สร้างให้", color: "#f59e0b" },
  { num: 17, title: "ปฏิบัติต่อ Cowork เหมือนพนักงาน", impact: "สูงสุด", desc: "Backup ก่อน experiment, scope ไฟล์ sensitive แยก, monitor 3-5 run แรก, ใส่ 'Don't delete' เสมอ", color: "#ec4899" },
];

const workflows = [
  { title: "🌅 AI Morning Brief", desc: "ทุกเช้า Cowork เช็ค calendar + Notion แล้วสรุปวันของคุณ", color: "#a78bfa", prompt: `You are my personal chief of staff. Every morning when I run this task, connect to my Google Calendar and Notion and do the following:\n\nPull every meeting and event scheduled for today. Go into Notion and pull any tasks marked as high priority or due today.\n\nCross-reference my calendar and Notion tasks — identify anything underprepared, overdue, or likely to conflict.\n\nDeliver my morning brief in this exact format:\n\nGOOD MORNING. HERE IS YOUR DAY.\nTODAY IS: [Day and Date]\n\nYOUR SCHEDULE\n[Time] [Event] with [Attendees]\n\nYOUR PRIORITIES TODAY\n1. 2. 3.\n\nWATCH OUT FOR\n\nYOUR FOCUS FOR TODAY` },
  { title: "📧 Email Manager", desc: "จัดการ inbox อัตโนมัติ จัดเรียง และ draft คำตอบ", color: "#60a5fa", prompt: `You are my personal email manager. Connect to my inbox and run the following routine.\n\nPull every unread email from the last 24 hours.\n\nSort every email into:\n- Urgent\n- Important\n- FYI\n- Junk\n\nFor Urgent and Important, draft responses.\n\nFormat:\nFROM:\nSUBJECT:\nSUMMARY:\nDRAFT:` },
  { title: "📰 Daily News Research", desc: "สรุปข่าวสำคัญ AI/Crypto/Business ทุกวันอัตโนมัติ", color: "#34d399", prompt: `You are my personal research assistant.\n\nEvery day at [TIME] run the following routine.\n\nSearch for the most important developments from the last 24 hours in:\n- AI\n- Crypto\n- Business\n\nFor each topic find top 3 stories.\n\nDeliver in this format:\n\nDAILY BRIEF\n\n[TOPIC]\nHeadline\nSource\nSummary\nWhy it matters\n\nTODAY'S BIGGEST THEME\n\nBREAKING ALERTS` },
  { title: "📊 Consulting Deliverable", desc: "สร้าง deliverable จาก brief ของลูกค้าแบบมืออาชีพ", color: "#f59e0b", prompt: `A client just sent a brief for [PROJECT TYPE]. The brief is in /projects/client-x/.\n\nRead the brief, my deliverable template, and my past examples.\n\nCreate a first draft as a .docx.\n\nAsk me questions first using AskUserQuestion tool — especially about:\n- Timeline format preferences\n- Should include competitor examples?\n- Executive summary style?\n\nThen execute and save to /CLAUDE OUTPUTS/client-x/` },
];

// ─── REUSABLE COMPONENTS ─────────────────────────────────────────────────────
function PromptBox({ children, color = "#7c3aed" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="prompt-box" style={{ position: "relative", margin: "16px 0" }}>
      <pre style={{ 
        background: "#F8FAFC", 
        border: `1px solid ${color}20`, 
        borderRadius: 14, 
        padding: "20px", 
        paddingTop: "40px",
        fontFamily: "'Space Grotesk', monospace", 
        fontSize: 13, 
        lineHeight: 1.7, 
        color: "#334155", 
        whiteSpace: "pre-wrap", 
        wordBreak: "break-word", 
        overflowX: "auto", 
        maxHeight: 400, 
        overflowY: "auto",
        borderLeft: `4px solid ${color}`,
        WebkitOverflowScrolling: "touch",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
      }}>
        {children}
      </pre>
      <button onClick={copy} className="glass-btn" style={{ 
        position: "absolute", top: 8, right: 8, 
        background: copied ? "#10B981" : "rgba(255,255,255,0.9)", 
        border: `1px solid ${copied ? "#10B981" : color + "30"}`, 
        borderRadius: 8, padding: "4px 12px", 
        color: copied ? "white" : color, fontSize: 11, cursor: "pointer", fontWeight: 600,
        display: "flex", alignItems: "center", gap: 4,
        transition: "all 0.2s ease"
      }}>
        {copied ? "✓ Copied" : "❏ Copy"}
      </button>
    </div>
  );
}

function Card({ children, color, style = {}, className = "" }) {
  return (
    <div className={`premium-card ${className}`} style={{ 
      background: "white", 
      border: `1px solid ${color ? color + "25" : "rgba(226,232,240,0.8)"}`, 
      borderRadius: 16, 
      padding: "24px", 
      ...style 
    }}>
      {children}
    </div>
  );
}

function Tag({ color, children }) {
  return (
    <span style={{ 
      display: "inline-flex", alignItems: "center", gap: 6, 
      padding: "6px 14px", borderRadius: 24, fontSize: 12, fontWeight: 700, 
      border: `1px solid ${color}35`, background: `${color}12`, color,
      marginBottom: 12
    }}>
      {children}
    </span>
  );
}

// ─── SVG ILLUSTRATIONS (Unchanged Logic, Adjusted width for mobile) ───────────
function SvgHero() { return SvgHeroLogic(); }
function SvgCowork() { return SvgCoworkLogic(); }
function SvgUseCases() { return SvgUseCasesLogic(); }
function SvgIncome() { return SvgIncomeLogic(); }
function SvgTutor() { return SvgTutorLogic(); }
function SvgResources() { return SvgResourcesLogic(); }

function SvgHeroLogic() {
  const nodes = [[80,60],[130,110],[75,155],[40,108],[115,58],[155,155]];
  const nodesR = [[690,60],[640,110],[695,155],[732,105],[670,55],[657,160]];
  const lines = [[0,1],[1,2],[1,3],[1,4],[1,5],[0,3],[2,3]];
  const colors = ["#a78bfa","#7c3aed","#60a5fa","#a78bfa","#c4b5fd","#60a5fa"];
  const colorsR = ["#60a5fa","#2563eb","#38bdf8","#60a5fa","#93c5fd","#38bdf8"];
  const orbitColors = ["#a78bfa","#60a5fa","#34d399","#f59e0b","#ec4899","#38bdf8"];
  return (
    <svg width="100%" height="100%" viewBox="0 0 820 220" preserveAspectRatio="xMidYMid slice" style={{minHeight: 220}}>
      <defs>
        <radialGradient id="hg1" cx="30%" cy="50%"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5"/><stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/></radialGradient>
        <radialGradient id="hg2" cx="70%" cy="50%"><stop offset="0%" stopColor="#2563eb" stopOpacity="0.4"/><stop offset="100%" stopColor="#2563eb" stopOpacity="0"/></radialGradient>
        <radialGradient id="hg3" cx="50%" cy="50%"><stop offset="0%" stopColor="#34d399" stopOpacity="0.18"/><stop offset="100%" stopColor="#34d399" stopOpacity="0"/></radialGradient>
        <filter id="svgGlow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="250" cy="110" rx="300" ry="180" fill="url(#hg1)"/>
      <ellipse cx="580" cy="110" rx="280" ry="160" fill="url(#hg2)"/>
      <ellipse cx="410" cy="110" rx="200" ry="130" fill="url(#hg3)"/>
      {lines.map(([a,b],i) => <line key={`l1-${i}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#7c3aed" strokeWidth={i<5?1.5:1} opacity={i<5?0.5:0.3}/>)}
      {nodes.map(([x,y],i) => <circle key={`n1-${i}`} cx={x} cy={y} r={i===1?10:6} fill={colors[i]} opacity="0.95" filter="url(#svgGlow)"/>)}
      <line x1="378" y1="110" x2="165" y2="110" stroke="#a78bfa" strokeWidth="1" opacity="0.2" strokeDasharray="3 5"/>
      <line x1="442" y1="110" x2="630" y2="110" stroke="#60a5fa" strokeWidth="1" opacity="0.2" strokeDasharray="3 5"/>
      <circle cx="410" cy="110" r="44" fill="none" stroke="#7c3aed" strokeWidth="1" strokeDasharray="4 3" opacity="0.35"/>
      <circle cx="410" cy="110" r="33" fill="rgba(124,58,237,0.14)" stroke="#a78bfa" strokeWidth="1.5" opacity="0.75"/>
      <circle cx="410" cy="110" r="19" fill="rgba(167,139,250,0.28)" filter="url(#svgGlow)"/>
      <text x="410" y="107" textAnchor="middle" fontSize="11" fill="#e9e4ff" fontWeight="700" fontFamily="monospace">AI</text>
      <text x="410" y="121" textAnchor="middle" fontSize="8" fill="#a78bfa" fontFamily="monospace">CLAUDE</text>
      {[0,60,120,180,240,300].map((deg,i) => {
        const rad = deg * Math.PI / 180;
        return <circle key={`o-${i}`} cx={410+44*Math.cos(rad)} cy={110+44*Math.sin(rad)} r="3.5" fill={orbitColors[i]} opacity="0.95" filter="url(#svgGlow)"/>;
      })}
      {lines.map(([a,b],i) => <line key={`l2-${i}`} x1={nodesR[a][0]} y1={nodesR[a][1]} x2={nodesR[b][0]} y2={nodesR[b][1]} stroke="#2563eb" strokeWidth={i<5?1.5:1} opacity={i<5?0.5:0.3}/>)}
      {nodesR.map(([x,y],i) => <circle key={`n2-${i}`} cx={x} cy={y} r={i===1?10:6} fill={colorsR[i]} opacity="0.95" filter="url(#svgGlow)"/>)}
      {[[200,38],[308,182],[500,28],[522,186],[352,23],[472,194],[248,84],[562,74]].map(([x,y],i) => (
        <rect key={`p-${i}`} x={x} y={y} width="4" height="4" rx="1" fill={orbitColors[i%6]} opacity="0.45" transform={`rotate(${i*22} ${x+2} ${y+2})`}/>
      ))}
      <line x1="0" y1="110" x2="820" y2="110" stroke="#a78bfa" strokeWidth="0.5" opacity="0.08" strokeDasharray="2 10"/>
    </svg>
  );
}

function SvgCoworkLogic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 820 150" preserveAspectRatio="xMidYMid slice" style={{minHeight: 150}}>
      <defs>
        <radialGradient id="cg1" cx="25%" cy="50%"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3"/><stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/></radialGradient>
        <radialGradient id="cg2" cx="78%" cy="50%"><stop offset="0%" stopColor="#2563eb" stopOpacity="0.25"/><stop offset="100%" stopColor="#2563eb" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="200" cy="75" rx="300" ry="120" fill="url(#cg1)"/>
      <ellipse cx="620" cy="75" rx="280" ry="120" fill="url(#cg2)"/>
      <rect x="30" y="10" width="355" height="130" rx="8" fill="#0f0f1a" stroke="rgba(167,139,250,0.25)" strokeWidth="1"/>
      <rect x="30" y="10" width="355" height="26" rx="8" fill="#16162a"/>
      <rect x="30" y="26" width="355" height="10" fill="#16162a"/>
      <circle cx="46" cy="23" r="4" fill="#f87171" opacity="0.7"/>
      <circle cx="60" cy="23" r="4" fill="#fbbf24" opacity="0.7"/>
      <circle cx="74" cy="23" r="4" fill="#34d399" opacity="0.7"/>
      <text x="210" y="26" textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="monospace">claude.ai — New conversation</text>
      <rect x="30" y="36" width="54" height="104" fill="#0a0a14"/>
      {[["✦",50],["💬",66],["📁",82],["⚙️",98]].map(([ic,y],i) => (<text key={i} x="57" y={y} textAnchor="middle" fontSize="11" opacity={i===1?"1":"0.4"}>{ic}</text>))}
      <circle cx="98" cy="54" r="8" fill="rgba(167,139,250,0.2)" stroke="#a78bfa" strokeWidth="1"/>
      <text x="98" y="58" textAnchor="middle" fontSize="8" fill="#c4b5fd" fontWeight="700">C</text>
      <rect x="112" y="44" width="178" height="28" rx="6" fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.2)" strokeWidth="1"/>
      <rect x="118" y="51" width="80" height="5" rx="2" fill="#9ca3af" opacity="0.5"/>
      <rect x="118" y="60" width="120" height="5" rx="2" fill="#9ca3af" opacity="0.35"/>
      <rect x="189" y="82" width="152" height="20" rx="6" fill="rgba(96,165,250,0.12)" stroke="rgba(96,165,250,0.2)" strokeWidth="1"/>
      <rect x="196" y="89" width="105" height="5" rx="2" fill="#93c5fd" opacity="0.55"/>
      <rect x="112" y="110" width="198" height="22" rx="6" fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.15)" strokeWidth="1"/>
      <rect x="118" y="117" width="90" height="4" rx="2" fill="#9ca3af" opacity="0.4"/>
      <rect x="118" y="124" width="140" height="4" rx="2" fill="#9ca3af" opacity="0.3"/>
      <rect x="30" y="135" width="88" height="14" rx="4" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.3)" strokeWidth="0.8"/>
      <text x="74" y="144" textAnchor="middle" fontSize="7.5" fill="#c4b5fd" fontFamily="monospace" fontWeight="700">Claude Chat</text>
      <text x="411" y="80" textAnchor="middle" fontSize="16" fill="#a78bfa" opacity="0.7">→</text>
      <text x="411" y="95" textAnchor="middle" fontSize="7" fill="#6b7280" fontFamily="monospace">upgrade</text>
      <rect x="435" y="10" width="355" height="130" rx="8" fill="#0f0f1a" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5"/>
      <rect x="435" y="10" width="355" height="26" rx="8" fill="#0d1629"/>
      <rect x="435" y="26" width="355" height="10" fill="#0d1629"/>
      <circle cx="451" cy="23" r="4" fill="#f87171" opacity="0.7"/>
      <circle cx="465" cy="23" r="4" fill="#fbbf24" opacity="0.7"/>
      <circle cx="479" cy="23" r="4" fill="#34d399" opacity="0.7"/>
      <text x="612" y="26" textAnchor="middle" fontSize="9" fill="#93c5fd" fontFamily="monospace">claude.ai — Cowork</text>
      <rect x="435" y="36" width="54" height="104" fill="#080e1e"/>
      {[["✦",50],["🎯",66],["🔌",82],["⚡",98]].map(([ic,y],i) => (<text key={i} x="462" y={y} textAnchor="middle" fontSize="11" opacity={i===1?"1":"0.45"}>{ic}</text>))}
      <rect x="489" y="38" width="128" height="100" rx="4" fill="rgba(37,99,235,0.07)" stroke="rgba(96,165,250,0.15)" strokeWidth="0.8"/>
      <text x="553" y="51" textAnchor="middle" fontSize="8" fill="#60a5fa" fontFamily="monospace" fontWeight="700">TASKS</text>
      {[["📧 Email Manager","#34d399",true],["📊 Morning Brief","#a78bfa",false],["📁 File Organizer","#f59e0b",false]].map(([t,c,active],i) => (
        <g key={i}>
          <rect x="494" y={56+i*26} width="118" height="20" rx="4" fill={active?`${c}18`:"rgba(255,255,255,0.03)"} stroke={active?c:"rgba(255,255,255,0.07)"} strokeWidth={active?"1.2":"0.8"}/>
          <text x="500" y={69+i*26} fontSize="7.5" fill={active?c:"#6b7280"} fontFamily="monospace">{t}</text>
          {active && <circle cx="602" cy={65+i*26} r="3" fill={c} opacity="0.8"/>}
        </g>
      ))}
      <rect x="628" y="44" width="65" height="14" rx="4" fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.3)" strokeWidth="0.8"/>
      <text x="660" y="53" textAnchor="middle" fontSize="7" fill="#6ee7b7" fontFamily="monospace">📧 Gmail ✓</text>
      <rect x="700" y="44" width="74" height="14" rx="4" fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.3)" strokeWidth="0.8"/>
      <text x="737" y="53" textAnchor="middle" fontSize="7" fill="#c4b5fd" fontFamily="monospace">📅 Calendar ✓</text>
      {[0,1,2,3,4,5].map(i => (<rect key={i} x="628" y={64+i*9} width={[135,110,125,90,118,70][i]} height="4" rx="2" fill="#e2e0f0" opacity={0.12 - i*0.015}/>))}
      <rect x="628" y="120" width="44" height="12" rx="6" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.4)" strokeWidth="0.8"/>
      <circle cx="636" cy="126" r="2.5" fill="#34d399"/>
      <text x="655" y="130" textAnchor="middle" fontSize="7" fill="#6ee7b7" fontFamily="monospace">Running</text>
      <rect x="435" y="135" width="78" height="14" rx="4" fill="rgba(96,165,250,0.18)" stroke="rgba(96,165,250,0.4)" strokeWidth="0.8"/>
      <text x="474" y="144" textAnchor="middle" fontSize="7.5" fill="#93c5fd" fontFamily="monospace" fontWeight="700">⚡ Cowork</text>
    </svg>
  );
}

function SvgUseCasesLogic() {
  const cards = [[60,30,180,90,"#ec4899","📄","Contracts"],[220,50,170,80,"#a78bfa","📊","Analytics"],[380,25,165,95,"#60a5fa","📧","Email"],[530,45,170,85,"#34d399","📅","Calendar"],[690,30,110,90,"#f59e0b","🚀","Launch"]];
  return (
    <svg width="100%" height="100%" viewBox="0 0 820 150" preserveAspectRatio="xMidYMid slice" style={{minHeight: 150}}>
      <defs><radialGradient id="ug1" cx="50%" cy="50%"><stop offset="0%" stopColor="#ec4899" stopOpacity="0.35"/><stop offset="100%" stopColor="#ec4899" stopOpacity="0"/></radialGradient><filter id="uGlow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <ellipse cx="410" cy="75" rx="400" ry="120" fill="url(#ug1)"/>
      {cards.map(([x,y,w,h,c,emoji,label],i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="10" fill={`${c}10`} stroke={c} strokeWidth="1.2" opacity="0.7"/>
          <text x={x+20} y={y+30} fontSize="18" filter="url(#uGlow)">{emoji}</text>
          <text x={x+16} y={y+52} fontSize="10" fill={c} fontFamily="monospace" fontWeight="700">{label}</text>
          <rect x={x+14} y={y+60} width={w-28} height="3" rx="1.5" fill={c} opacity="0.3"/>
          <rect x={x+14} y={y+60} width={(w-28)*0.65} height="3" rx="1.5" fill={c} opacity="0.7"/>
        </g>
      ))}
      {[[170,22,"3hr→8min","#ec4899"],[350,44,"5hr→45min","#a78bfa"],[520,20,"2hr→20min","#60a5fa"]].map(([x,y,t,c],i) => (
        <g key={i}>
          <rect x={x} y={y} width="88" height="17" rx="8" fill={`${c}20`} stroke={c} strokeWidth="1" opacity="0.8"/>
          <text x={x+44} y={y+12} textAnchor="middle" fontSize="8" fill={c} fontFamily="monospace" fontWeight="700">{t}</text>
        </g>
      ))}
    </svg>
  );
}

function SvgIncomeLogic() {
  const pts = [40,120, 120,100, 200,105, 280,80, 360,75, 440,55, 520,48, 600,35, 680,22, 760,15];
  const pathD = pts.reduce((s,v,i) => i%2===0 ? s+`${i===0?'M':'L'}${v},${pts[i+1]} ` : s, '');
  const areaD = pathD + `L760,140 L40,140 Z`;
  return (
    <svg width="100%" height="100%" viewBox="0 0 820 150" preserveAspectRatio="xMidYMid slice" style={{minHeight: 150}}>
      <defs><radialGradient id="ig1" cx="70%" cy="30%"><stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/><stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/></radialGradient><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35"/><stop offset="100%" stopColor="#fbbf24" stopOpacity="0.02"/></linearGradient><filter id="iGlow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <ellipse cx="500" cy="60" rx="380" ry="120" fill="url(#ig1)"/>
      {[40,80,120].map(y => <line key={y} x1="30" y1={y} x2="790" y2={y} stroke="#fbbf24" strokeWidth="0.5" opacity="0.1"/>)}
      <path d={areaD} fill="url(#chartGrad)"/>
      <path d={pathD} fill="none" stroke="#fbbf24" strokeWidth="2.5" opacity="0.9" filter="url(#iGlow)"/>
      {Array.from({length:pts.length/2},(_,i) => (<circle key={i} cx={pts[i*2]} cy={pts[i*2+1]} r="4" fill="#0a0a14" stroke="#fbbf24" strokeWidth="2" opacity="0.9"/>))}
      {[["LV.1","$"],[null,null],[null,null],["LV.2","$$"],[null,null],[null,null],["LV.3","$$$"],[null,null],["LV.4","$$$$"]].map(([lv,m],i) => lv && (
        <g key={i}>
          <text x={pts[i*2]} y={pts[i*2+1]-12} textAnchor="middle" fontSize="8" fill="#fbbf24" opacity="0.8" fontFamily="monospace">{m}</text>
          <text x={pts[i*2]} y={142} textAnchor="middle" fontSize="8" fill="#6b7280" fontFamily="monospace">{lv}</text>
        </g>
      ))}
      <polygon points="768,10 786,15 768,20" fill="#fbbf24" opacity="0.8"/>
    </svg>
  );
}

function SvgTutorLogic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 820 150" preserveAspectRatio="xMidYMid slice" style={{minHeight: 150}}>
      <defs><radialGradient id="tg1" cx="40%" cy="50%"><stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45"/><stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/></radialGradient><radialGradient id="tg2" cx="75%" cy="40%"><stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3"/><stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/></radialGradient><filter id="tGlow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <ellipse cx="330" cy="75" rx="320" ry="130" fill="url(#tg1)"/>
      <ellipse cx="620" cy="60" rx="240" ry="100" fill="url(#tg2)"/>
      <rect x="60" y="35" width="55" height="80" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8"/>
      <line x1="87" y1="35" x2="87" y2="115" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5"/>
      {[50,62,74,86,98].map(y => <line key={`l1-${y}`} x1="68" y1={y} x2="83" y2={y} stroke="#38bdf8" strokeWidth="1" opacity="0.4"/>)}
      {[50,62,74,86,98].map(y => <line key={`l2-${y}`} x1="93" y1={y} x2="108" y2={y} stroke="#38bdf8" strokeWidth="1" opacity="0.4"/>)}
      <text x="87" y="127" textAnchor="middle" fontSize="9" fill="#38bdf8" fontFamily="monospace" opacity="0.7">LEARN</text>
      {[[200,55,38],[270,40,28],[330,55,22],[375,42,16]].map(([x,y,r],i) => (<circle key={i} cx={x} cy={y} r={r} fill={`rgba(56,189,248,${0.06+i*0.04})`} stroke="#38bdf8" strokeWidth="1" opacity="0.6"/>))}
      {[["Python",420,52,"#60a5fa"],["SEO",510,45,"#a78bfa"],["Finance",590,55,"#34d399"],["Design",670,48,"#f59e0b"],["English",740,55,"#ec4899"]].map(([label,x,y,c],i) => (
        <g key={i}>
          <rect x={x-28} y={y-10} width={label.length*7+8} height="20" rx="10" fill={`${c}18`} stroke={c} strokeWidth="1.2" opacity="0.85"/>
          <text x={x+label.length*3-24} y={y+4} fontSize="9" fill={c} fontFamily="monospace" fontWeight="700">{label}</text>
        </g>
      ))}
      {[[160,30],[200,110],[380,25],[410,120],[650,30],[760,100]].map(([x,y],i) => (
        <g key={i} opacity="0.5">
          <line x1={x-4} y1={y} x2={x+4} y2={y} stroke={["#38bdf8","#a78bfa","#34d399","#f59e0b","#ec4899","#60a5fa"][i]} strokeWidth="1.5"/>
          <line x1={x} y1={y-4} x2={x} y2={y+4} stroke={["#38bdf8","#a78bfa","#34d399","#f59e0b","#ec4899","#60a5fa"][i]} strokeWidth="1.5"/>
        </g>
      ))}
    </svg>
  );
}

function SvgResourcesLogic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 820 150" preserveAspectRatio="xMidYMid slice" style={{minHeight: 150}}>
      <defs><radialGradient id="rg1" cx="35%" cy="50%"><stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45"/><stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/></radialGradient><radialGradient id="rg2" cx="75%" cy="50%"><stop offset="0%" stopColor="#34d399" stopOpacity="0.25"/><stop offset="100%" stopColor="#34d399" stopOpacity="0"/></radialGradient><filter id="rGlow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <ellipse cx="280" cy="75" rx="300" ry="130" fill="url(#rg1)"/>
      <ellipse cx="620" cy="75" rx="240" ry="120" fill="url(#rg2)"/>
      {[[65,95,100,18,"#60a5fa"],[60,78,108,18,"#a78bfa"],[55,62,116,18,"#34d399"]].map(([x,y,w,h,c],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill={`${c}18`} stroke={c} strokeWidth="1.5" opacity="0.8"/>
      ))}
      <text x="113" y="108" textAnchor="middle" fontSize="8" fill="#60a5fa" fontFamily="monospace" opacity="0.8">DOCS</text>
      <text x="113" y="91" textAnchor="middle" fontSize="8" fill="#a78bfa" fontFamily="monospace" opacity="0.8">GUIDE</text>
      <text x="113" y="74" textAnchor="middle" fontSize="8" fill="#34d399" fontFamily="monospace" opacity="0.8">CODE</text>
      <circle cx="220" cy="75" r="26" fill="rgba(255,255,255,0.04)" stroke="#60a5fa" strokeWidth="1.5" opacity="0.7"/>
      <text x="220" y="80" textAnchor="middle" fontSize="18" opacity="0.9">⭐</text>
      <text x="220" y="113" textAnchor="middle" fontSize="8" fill="#60a5fa" fontFamily="monospace" opacity="0.7">GitHub</text>
      {[
        [320,35,160,50,"#60a5fa","📖 Anthropic Docs"],
        [500,50,145,50,"#a78bfa","⚡ Skills Guide PDF"],
        [665,35,135,50,"#34d399","🎓 Learn Free"],
      ].map(([x,y,w,h,c,label],i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="8" fill={`${c}10`} stroke={c} strokeWidth="1.2" opacity="0.75"/>
          <text x={x+12} y={y+30} fontSize="10" fill={c} fontFamily="monospace" fontWeight="600">{label}</text>
          <line x1={x+12} y1={y+38} x2={x+w-12} y2={y+38} stroke={c} strokeWidth="1" opacity="0.35"/>
        </g>
      ))}
    </svg>
  );
}

// ─── MODULE COMPONENTS ────────────────────────────────────────────────────────
function SkillsIntro() {
  return (
    <div className="fade-in">
      <h2 className="section-title" style={{ fontWeight: 800, margin: "8px 0 16px" }}>
        <span className="text-gradient">Claude Skills Masterclass</span>
      </h2>
      <p style={{ color: "#64748b", fontSize: 16, marginBottom: 32, lineHeight: 1.8 }}>คู่มือฉบับสมบูรณ์ในการสร้าง Skills สำหรับ Claude ตั้งแต่พื้นฐานจนถึง Production Deployment แบ่งเป็น 4 Modules ที่เรียนรู้ได้ทีละขั้นตอน</p>
      
      <div className="grid-auto-fit" style={{ gap: 16, marginBottom: 32 }}>
        {[
          { icon: "🌱", label: "Module 1", title: "Foundations", desc: "เข้าใจโครงสร้าง Skill, YAML triggers, และ deploy Skill แรก" },
          { icon: "🏗️", label: "Module 2", title: "Architecture", desc: "Scripts, multi-skill orchestration, reference strategies" },
          { icon: "🧪", label: "Module 3", title: "Testing & Iteration", desc: "5 failure modes, evals, benchmarks, A/B testing" },
          { icon: "🚀", label: "Module 4", title: "Production", desc: "State management, shift handover, scale ข้ามหลาย sessions" },
        ].map((m, i) => (
          <Card key={i} color={["#a78bfa","#34d399","#f59e0b","#ec4899"][i]} className="hover-lift">
            <div style={{ fontSize: 28, marginBottom: 12 }}>{m.icon}</div>
            <div style={{ fontSize: 11, color: ["#a78bfa","#34d399","#f59e0b","#ec4899"][i], fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: "#1E293B" }}>{m.title}</div>
            <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{m.desc}</div>
          </Card>
        ))}
      </div>

      <Card color="#a78bfa">
        <h3 style={{ color: "#8B5CF6", marginBottom: 20, fontWeight: 800, fontSize: 18 }}>🎯 Skills vs Projects vs MCP — ต่างกันอย่างไร?</h3>
        <div className="grid-auto-fit" style={{ gap: 16 }}>
          {[
            { title: "Projects", icon: "📚", color: "#60a5fa", desc: "Knowledge base — อัปโหลด PDF, guidelines ให้ Claude รู้ว่า 'มีข้อมูลอะไรบ้าง' เหมือนห้องสมุด Static" },
            { title: "Skills ⭐", icon: "⚡", color: "#a78bfa", desc: "Instruction manual — บอก Claude ว่า 'ทำงานนี้อย่างไร step by step' Procedural. Automated. เหมือนพนักงานที่ฝึกแล้ว" },
            { title: "MCP", icon: "🔌", color: "#34d399", desc: "Connection layer — เชื่อม Claude กับ live data (calendar, database, inbox) Skills บอกว่าต้องทำอะไรกับ data นั้น" },
          ].map((item, i) => (
            <div key={i} style={{ background: `${item.color}08`, border: `1px solid ${item.color}20`, borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 800, color: item.color, marginBottom: 8, fontSize: 15 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, background: "rgba(167,139,250,0.08)", borderRadius: 12, padding: "16px 20px", borderLeft: "4px solid #a78bfa" }}>
          <div style={{ fontWeight: 800, color: "#8B5CF6", marginBottom: 8, fontSize: 14 }}>💡 ต้องการ Skill หรือเปล่า?</div>
          <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.8 }}>ถ้าคุณเคยพิมพ์คำสั่งเดิมมากกว่า 3 ครั้ง — นั่นคือ Skill ที่รอให้สร้าง หรือถ้าต้องการให้ Claude เป็น "พนักงานมืออาชีพ" ในงานใดงานหนึ่ง</p>
        </div>
      </Card>
    </div>
  );
}

function SkillsModule1() {
  const [expanded, setExpanded] = useState(null);
  const steps = [
    {
      num: 1, title: "Define the Job — นิยามงานให้ชัด", color: "#60a5fa",
      content: (
        <div className="fade-in">
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>ก่อนเขียนอะไรเลย ตอบ 3 คำถามนี้ให้ได้ก่อน:</p>
          <div className="grid-auto-fit" style={{ gap: 12, marginBottom: 24 }}>
            {[
              ["Skill นี้ทำอะไร?", "ต้องเฉพาะเจาะจงมาก เช่น 'แปลง CSV ที่ยุ่งเหยิงเป็น spreadsheet ที่สะอาด พร้อม header ที่ถูกต้อง และ date format YYYY-MM-DD'"],
              ["เมื่อไหรจะ activate?", "คิดว่าคุณจะพิมพ์อะไร เช่น 'clean up this CSV', 'fix these headers' นั่นคือ trigger phrases"],
              ["'ดี' หน้าตาเป็นยังไง?", "ต้องมีตัวอย่าง before-after จริง ไม่ใช่แค่คำอธิบาย"],
            ].map(([q, a], i) => (
              <div key={i} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "16px" }}>
                <div style={{ fontWeight: 700, color: "#3B82F6", fontSize: 14, marginBottom: 6 }}>Q: {q}</div>
                <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{a}</div>
              </div>
            ))}
          </div>
          <div style={{ fontWeight: 700, color: "#EF4444", marginBottom: 16, fontSize: 13, display: 'flex', gap: 8, alignItems: 'center' }}>
             <span>⚠️</span> 90% ของ Skill ที่ไม่ดีเกิดจากขั้นตอนนี้ — ยิ่งคลุมเครือ ยิ่งได้ผลลัพธ์แย่
          </div>
          <h4 style={{ color: "#3B82F6", marginBottom: 12, fontWeight: 800, fontSize: 15 }}>Prompt: The Skill Definition Interview</h4>
          <PromptBox color="#60a5fa">{`You are a Skill Definition Specialist. Your job is to interview 
me until we have a razor-sharp definition of the Claude Skill 
I want to build. You will not let me get away with vague answers.

PHASE 1 - THE TASK
Ask me: "What task do you want to automate?" 
After I answer, pressure-test my response:
- If vague, push back and ask for EXACTLY what the Skill should do.
- Keep asking "Can you be more specific?" until concrete.

PHASE 2 - THE TRIGGERS
Ask me: "What would you type into Claude to activate this Skill? 
Give me 5 different ways you might phrase the request."
After I answer, suggest 3-5 additional trigger phrases I missed.

PHASE 3 - THE QUALITY STANDARD
Ask me: "Show me exactly what a PERFECT output looks like."
After I answer, ask about edge cases.

PHASE 4 - THE SUMMARY
Compile into a "Skill Definition Brief".`}</PromptBox>
        </div>
      )
    },
    {
      num: 2, title: "เขียน YAML Triggers — กุญแจที่สำคัญที่สุด", color: "#a78bfa",
      content: (
        <div className="fade-in">
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>ที่ด้านบนของไฟล์ SKILL.md ให้เขียน metadata ระหว่าง `---` สองบรรทัด นี่คือสิ่งที่บอก Claude ว่าเมื่อไหรจะ activate Skill</p>
          <PromptBox color="#a78bfa">{`---
name: csv-cleaner
description: Transforms messy CSV files into clean spreadsheets. 
  Use this skill whenever the user says 'clean up this CSV', 
  'fix the headers', 'format this data', or 'organise this 
  spreadsheet'. Do NOT use for PDFs, Word documents, or images.
---`}</PromptBox>
          <div className="grid-auto-fit" style={{ gap: 12, marginTop: 24, marginBottom: 24 }}>
            {[
              ["เขียน third person", "'Processes files...' ไม่ใช่ 'I can help you...'"],
              ["List trigger phrases ชัดๆ", "Claude conservative มาก ต้องบอกตรงๆ ว่าผู้ใช้จะพิมพ์อะไร"],
              ["ตั้ง Negative Boundaries", "บอกว่าเมื่อไหร่ที่ไม่ควร fire ป้องกัน Skill hijack conversation"],
            ].map(([rule, detail], i) => (
              <div key={i} style={{ background: "#F5F3FF", border: "1px solid #EDE9FE", borderRadius: 12, padding: "14px", display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ color: "#8B5CF6", fontWeight: 800, fontSize: 13 }}>Rule {i+1}: {rule}</span>
                <span style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    { 
      num: 3, title: "เขียน Instructions — Workflow จริง", color: "#34d399", 
      content: (
        <div className="fade-in">
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>ใต้ `---` marks เขียน workflow ใน plain English พร้อม heading ลำดับขั้นตอน ไม่เกิน 500 บรรทัด มี 2 ส่วนสำคัญ:</p>
          <div className="grid-auto-fit" style={{ gap: 16, marginBottom: 20 }}>
            <div style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 800, color: "#10B981", marginBottom: 8 }}>📋 The Steps</div>
              <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.8 }}>
                <div>1. Read the provided file to understand its structure</div>
                <div>2. Identify the row containing true column headers</div>
                <div>3. Remove empty rows</div>
                <div>4. Enforce proper data types</div>
                <div>5. Output cleaned file with change summary</div>
              </div>
            </div>
            <div style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 800, color: "#10B981", marginBottom: 8 }}>✨ The Examples</div>
              <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.8 }}>ตัวอย่าง before/after จริงๆ มีค่ามากกว่าคำอธิบาย abstract 50 บรรทัด ใส่อย่างน้อย 2 ตัวอย่าง: Happy Path + Edge Case</div>
            </div>
          </div>
          <h4 style={{ color: "#10B981", marginBottom: 10, fontWeight: 800 }}>Prompt: The Skill Instruction Architect</h4>
          <PromptBox color="#34d399">{`You are a Claude Skill instruction writer. Generate the complete 
instruction body for a SKILL.md file — clear, sequential, under 500 lines.

Here is my Skill definition: [PASTE DEFINITION BRIEF]
Here is the YAML frontmatter: [PASTE YAML BLOCK]

Generate the full instruction body below the closing --- following 
these rules:

STRUCTURE RULES:
1. Start with one-paragraph "Overview" (written for Claude, not humans)
2. Break workflow into numbered steps under "## Workflow" heading
   - One clear action per step
   - Imperative command ("Read the file..." not "The file should be read")
   - Specific enough that there's only ONE way to interpret it
3. Include "## Output Format" — exactly how final output should look
4. Include "## Edge Cases" — how to handle:
   - Missing or incomplete input
   - Ambiguous requests  
   - Unexpected file formats

EXAMPLE RULES:
5. Include at least 2 examples under "## Examples":
   - Example 1: straightforward "happy path"
   - Example 2: edge case with unusual input
   Each must show ACTUAL input and ACTUAL expected output.

QUALITY RULES:
6. Aim for 100-300 lines. Cut anything that doesn't instruct.
7. Never use vague language like "handle appropriately" or 
   "format nicely." Every instruction must be specific and testable.`}</PromptBox>
        </div>
      ) 
    },
    { 
      num: 4, title: "One Level Deep Rule — ไฟล์ References", color: "#f59e0b", 
      content: (
        <div className="fade-in">
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>ถ้า instructions อ้างถึง brand guideline ขนาดใหญ่ ห้ามวาง content ทั้งหมดใน SKILL.md ให้บันทึกเป็นไฟล์แยกใน references/ folder แทน</p>
          <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ fontWeight: 800, color: "#F59E0B", marginBottom: 6 }}>⚠️ กฎสำคัญ: One Level Deep เท่านั้น</div>
            <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.8 }}>ห้ามมี reference files ที่ link ไปยัง reference files อื่น Claude จะตัด context และพลาดข้อมูล ถ้าจำเป็นต้องรวมเป็นไฟล์เดียว</p>
          </div>
          <h4 style={{ color: "#F59E0B", marginBottom: 10, fontWeight: 800 }}>Prompt: Reference Architecture</h4>
          <PromptBox color="#f59e0b">{`You are a Skill Reference File Organiser. I have documents that 
my Claude Skill needs to reference. Prepare them for references/.

For each document:
1. ASSESS: Short enough to include in SKILL.md directly?
2. COMPRESS: Extract ONLY sections relevant to the Skill's task.
3. FORMAT: Structure with clear markdown headings and bullet points.
4. VALIDATE: Check "One Level Deep" rule — no nested references.`}</PromptBox>
        </div>
      ) 
    },
    { 
      num: 5, title: "Assemble & Deploy — ประกอบ & ติดตั้ง", color: "#ec4899", 
      content: (
        <div className="fade-in">
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>ตอนนี้มีทุกอย่างแล้ว ถึงเวลาประกอบและ deploy นำไฟล์ทั้งหมดใส่โฟลเดอร์ <code>~/.claude/skills/</code> Claude จะมองเห็นและพร้อมใช้งานทันที</p>
          <PromptBox color="#ec4899">{`your-skill-name/
├── SKILL.md          (YAML header + instructions จาก Steps 2-3)
└── references/       (optional, จาก Step 4)
    └── your-ref.md

Drop โฟลเดอร์ทั้งหมดไปที่: ~/.claude/skills/
Claude จะ detect ได้อัตโนมัติ`}</PromptBox>
          <div style={{ marginTop: 24, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 800, color: "#10B981", marginBottom: 8 }}>🚀 Shortcut: Skill Creator Meta-Skill</div>
            <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.8 }}>Anthropic สร้าง skill-creator ที่สร้าง Skill ให้คุณผ่านการสนทนา เพียงพิมพ์: <span style={{ color: "#10B981", fontFamily: "monospace", fontWeight: "bold" }}>"Use the skill-creator to help me build a skill for [your task]"</span> แล้วอัปโหลด templates หรือตัวอย่างงานที่มี</p>
          </div>
        </div>
      ) 
    },
  ];

  return (
    <div className="fade-in">
      <Tag color="#60a5fa">🌱 Module 1</Tag>
      <h2 className="section-title" style={{ fontWeight: 800, margin: "8px 0 16px" }}>Foundations</h2>
      <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>เรียนรู้โครงสร้างพื้นฐานของ Skill, สร้าง YAML triggers ที่ทำงานได้จริง, และ deploy Skill แรกของคุณ</p>

      <Card color="#60a5fa" style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#3B82F6", fontWeight: 800, marginBottom: 16, fontSize: 16 }}>🔬 Anatomy of a Skill — โครงสร้างของ Skill</h3>
        <PromptBox color="#60a5fa">{`your-skill-name/          ← kebab-case: invoice-organiser
├── SKILL.md             ← case-sensitive! ไม่ใช่ skill.md
└── references/          ← optional
    └── brand-guide.md

ที่อยู่: ~/.claude/skills/
Claude จะ detect ได้อัตโนมัติ`}</PromptBox>
      </Card>

      <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 16, color: "#1E293B" }}>5 ขั้นตอนสร้าง Skill แรก</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {steps.map((step, i) => (
          <div key={i} className="premium-card" style={{ padding: 0, overflow: "hidden", border: `1px solid ${expanded === i ? step.color : "#E2E8F0"}`, transition: "all 0.3s ease", boxShadow: expanded === i ? `0 8px 24px -8px ${step.color}40` : "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div onClick={() => setExpanded(expanded === i ? null : i)} style={{ padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, background: expanded === i ? "#F8FAFC" : "white" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${step.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, color: step.color, flexShrink: 0 }}>
                0{step.num}
              </div>
              <div style={{ flex: 1, fontWeight: 700, color: "#1E293B", fontSize: 15 }}>
                {step.title}
              </div>
              <span style={{ color: "#94a3b8", fontSize: 20, transform: expanded === i ? "rotate(90deg)" : "none", transition: "0.3s ease" }}>›</span>
            </div>
            {expanded === i && (
              <div className="fade-in" style={{ padding: "0 20px 24px", paddingLeft: 76, background: "#F8FAFC" }}>
                {step.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsModule2() {
  const [expanded, setExpanded] = useState(null);
  const topics = [
    {
      title: "Scripts — เมื่อ Instructions ไม่พอ", color: "#34d399",
      content: (
        <div className="fade-in">
          <div className="grid-auto-fit" style={{ gap: 16, marginBottom: 20 }}>
            <div style={{ background: "white", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 800, color: "#10B981", marginBottom: 8 }}>ใช้ Instructions เมื่อ...</div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>งานเกี่ยวกับ judgement, ภาษา, formatting หรือการตัดสินใจ เช่น "Rewrite in our brand voice" หรือ "Draft an email"</p>
            </div>
            <div style={{ background: "white", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 800, color: "#10B981", marginBottom: 8 }}>ใช้ Scripts เมื่อ...</div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>งานต้องการ precise computation, file manipulation, data transformation เช่น "Parse XML", "Resize images", "Calculate averages"</p>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 800, color: "#10B981", marginBottom: 10 }}>ตัวอย่างโครงสร้าง Skill ที่มี Scripts</div>
            <PromptBox color="#34d399">{`data-analyser/
├── SKILL.md
├── references/
│   └── analysis-template.md
└── scripts/
    ├── parse-csv.py
    └── calculate-stats.py

# ใน SKILL.md อ้างถึง scripts แบบนี้:

## Workflow
1. Read the uploaded CSV file to understand its structure.
2. Run scripts/parse-csv.py to clean the data:
   - Command: python scripts/parse-csv.py [input] [output]
3. Run scripts/calculate-stats.py on the cleaned data:
   - Command: python scripts/calculate-stats.py [file]
4. Read the output and write a human-readable summary.`}</PromptBox>
          </div>
          <h4 style={{ color: "#10B981", marginBottom: 12, fontWeight: 800 }}>Prompt: The Skill Script Builder</h4>
          <PromptBox color="#34d399">{`I have a Claude Skill that needs executable scripts for tasks 
requiring computation rather than language processing.

Here is my current SKILL.md: [PASTE YOUR SKILL.MD]

Computational tasks that can't be handled by instructions alone:
[DESCRIBE EACH TASK, e.g.:
- "Parse XML files and extract specific fields"
- "Calculate statistical summaries of numeric data"]

For each task, build a script following these rules:
1. Language: Python (available in both Claude Code and CoWork)
2. Interface: Accept all inputs as command-line arguments
3. Error handling: Catch all common failures, exit with clear message
4. Documentation: Comment block at top with purpose, args, output, errors
5. Dependencies: Use standard library where possible; list extras in requirements.txt

Output:
- Each script file ready to save to scripts/
- Updated SKILL.md with script references
- requirements.txt (if external packages needed)`}</PromptBox>
        </div>
      )
    },
    {
      title: "Multi-Skill Orchestration — จัดการหลาย Skills", color: "#f59e0b",
      content: (
        <div className="fade-in">
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>เมื่อมี Skill เกิน 5 ตัว ปัญหา conflict เริ่มเกิดขึ้น: Skill ผิดตัว fire, Skills สองตัว hijack request เดียวกัน</p>
          <div className="grid-auto-fit" style={{ gap: 12, marginBottom: 20 }}>
            {[
              { rule: "Non-overlapping territories", desc: "ทุก Skill ต้องมีขอบเขตชัดเจน เช่น Brand Voice Enforcer = voice compliance เท่านั้น" },
              { rule: "Aggressive negative boundaries", desc: "ทุก Skill ต้องเขียน negative boundaries ที่อ้างถึง territories ของ Skill อื่นๆ โดยตรง" },
              { rule: "Distinctive trigger language", desc: "แต่ละ Skill ต้องมี trigger phrases ที่ unique เฉพาะตัว ถ้าใช้คำเดิม = Skill มีปัญหา scope" },
            ].map((item, i) => (
              <div key={i} style={{ background: "white", border: "1px solid #FDE68A", borderRadius: 12, padding: "16px" }}>
                <div style={{ fontWeight: 800, color: "#F59E0B", fontSize: 14, marginBottom: 6 }}>Rule {i+1}: {item.rule}</div>
                <div style={{ color: "#475569", fontSize: 13, lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <h4 style={{ color: "#F59E0B", marginBottom: 12, fontWeight: 800 }}>Prompt: Skill Conflict Auditor</h4>
          <PromptBox color="#f59e0b">{`I have multiple Claude Skills deployed and experiencing conflicts 
(wrong Skills firing, overlapping functionality).

SKILL 1: [PASTE YAML DESCRIPTION]
SKILL 2: [PASTE YAML DESCRIPTION]
SKILL 3: [PASTE YAML DESCRIPTION]

Run conflict analysis:
## 1. TERRITORY MAP (Define each Skill's territory)
## 2. TRIGGER PHRASE COLLISION TEST
## 3. NEGATIVE BOUNDARY AUDIT
## 4. AMBIGUOUS REQUEST TEST

Present as structured report with priority-ranked fixes.`}</PromptBox>
        </div>
      )
    },
    {
      title: "Reference Architecture — จัดการ Documents ขนาดใหญ่", color: "#a78bfa",
      content: (
        <div className="fade-in">
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>เมื่อ Skill ต้องอ้างถึง brand guide 50 หน้า, style manual 30 หน้า, และ template library ต้องออกแบบ reference architecture ที่ดี ไม่งั้น Claude จะเสีย context window ไปโหลด reference ที่ไม่จำเป็น</p>
          <h4 style={{ color: "#8B5CF6", marginBottom: 12, fontWeight: 800 }}>Prompt: Reference Architecture Designer</h4>
          <PromptBox color="#a78bfa">{`I have a Claude Skill that needs to reference multiple large documents.
I need help designing the reference file architecture.

Documents my Skill needs:
[LIST EACH WITH LENGTH AND PURPOSE]

Design a reference architecture that:
1. Splits large documents into focused sub-files (loadable independently)
2. Creates "quick reference" version of each major document (under 30 lines)
3. Writes conditional loading instructions for SKILL.md
4. Ensures "one level deep" rule

Output: Complete folder structure diagram and updated SKILL.md`}</PromptBox>
        </div>
      )
    },
  ];

  return (
    <div className="fade-in">
      <Tag color="#34d399">🏗️ Module 2</Tag>
      <h2 className="section-title" style={{ fontWeight: 800, margin: "8px 0 16px" }}>Architecture</h2>
      <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>Scripts สำหรับ computation, Multi-skill orchestration ป้องกัน conflicts, และ Reference strategies ที่ scale ได้</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {topics.map((topic, i) => (
          <div key={i} className="premium-card" style={{ padding: 0, overflow: "hidden", border: `1px solid ${expanded === i ? topic.color : "#E2E8F0"}`, transition: "all 0.3s ease", boxShadow: expanded === i ? `0 8px 24px -8px ${topic.color}40` : "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div onClick={() => setExpanded(expanded === i ? null : i)} style={{ padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, background: expanded === i ? "#F8FAFC" : "white" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${topic.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {["📜","🔀","📦"][i]}
              </div>
              <div style={{ fontWeight: 800, color: "#1E293B", fontSize: 16, flex: 1 }}>{topic.title}</div>
              <span style={{ color: "#94a3b8", fontSize: 24, transform: expanded === i ? "rotate(90deg)" : "none", transition: "0.3s ease" }}>›</span>
            </div>
            {expanded === i && (
              <div className="fade-in" style={{ padding: "0 20px 24px", paddingLeft: 76, background: "#F8FAFC" }}>
                {topic.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsModule3() {
  const [expanded, setExpanded] = useState(null);
  const failures = [
    { num: 1, name: "Silent Skill — ไม่ Fire เลย", color: "#f87171", icon: "🔇", cause: "YAML description คลุมเครือเกินไป Trigger phrases ไม่ตรงกับสิ่งที่พิมพ์", fix: "เพิ่ม trigger phrases ให้ aggressive ขึ้น เขียน description ให้ explicit กว่านี้" },
    { num: 2, name: "Hijacker — Fire ผิด Request", color: "#fb923c", icon: "🏴‍☠️", cause: "Description กว้างเกินไป หรือ Negative Boundaries หายไป", fix: "เพิ่ม Negative Boundaries ที่ระบุ territories ของ Skill อื่นๆ ชัดๆ" },
    { num: 3, name: "Drifter — Fire แต่ Output ผิด", color: "#fbbf24", icon: "🌊", cause: "Instructions คลุมเครือ มีความหมายได้หลายแบบ", fix: "แทน vague language ด้วย specific testable instructions ทุกบรรทัด" },
    { num: 4, name: "Fragile Skill — ทำงานไม่ได้กับ Edge Cases", color: "#a78bfa", icon: "💔", cause: "Edge case handling ไม่ครบ ทดสอบแค่ ideal input", fix: "เพิ่ม explicit edge case instructions สำหรับทุก scenario ที่เป็นไปได้" },
    { num: 5, name: "Overachiever — ทำเกินที่สั่ง", color: "#60a5fa", icon: "🎭", cause: "Instructions บอกว่าต้องทำอะไร แต่ไม่บอกว่าอะไรที่ห้ามทำ", fix: "เพิ่ม scope constraints: 'Output ONLY [specified format] and nothing else'" },
  ];

  return (
    <div className="fade-in">
      <Tag color="#f59e0b">🧪 Module 3</Tag>
      <h2 className="section-title" style={{ fontWeight: 800, margin: "8px 0 16px" }}>Testing & Iteration</h2>
      <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>ความแตกต่างระหว่าง Skill ที่ "พอใช้ได้" กับ Skill ที่ทำงานเหมือนพนักงานที่ฝึกแล้ว อยู่ที่ module นี้</p>

      <h3 style={{ color: "#1E293B", fontWeight: 800, marginBottom: 16, fontSize: 20 }}>5 Failure Modes ที่ต้องรู้จัก</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {failures.map((f, i) => (
          <div key={i} className="premium-card" style={{ padding: 0, overflow: "hidden", border: `1px solid ${expanded === i ? f.color : "#E2E8F0"}`, transition: "all 0.3s ease", boxShadow: expanded === i ? `0 8px 24px -8px ${f.color}40` : "0 2px 4px rgba(0,0,0,0.02)" }}>
            <div onClick={() => setExpanded(expanded === i ? null : i)} style={{ padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, background: expanded === i ? "#F8FAFC" : "white" }}>
              <span style={{ fontSize: 24 }}>{f.icon}</span>
              <div style={{ flex: 1, fontWeight: 800, color: f.color, fontSize: 16 }}>
                {f.name}
              </div>
              <span style={{ color: "#94a3b8", fontSize: 24, transform: expanded === i ? "rotate(90deg)" : "none", transition: "0.3s ease" }}>›</span>
            </div>
            {expanded === i && (
              <div className="fade-in grid-auto-fit" style={{ padding: "0 20px 24px", paddingLeft: 60, background: "#F8FAFC", gap: 16 }}>
                <div style={{ background: "white", border: "1px solid #FECACA", borderRadius: 10, padding: 16 }}>
                  <div style={{ fontWeight: 800, color: "#EF4444", fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>ROOT CAUSE</div>
                  <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>{f.cause}</div>
                </div>
                <div style={{ background: "white", border: "1px solid #A7F3D0", borderRadius: 10, padding: 16 }}>
                  <div style={{ fontWeight: 800, color: "#10B981", fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>FIX</div>
                  <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.7 }}>{f.fix}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Card color="#a78bfa" style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#8B5CF6", fontWeight: 800, marginBottom: 16, fontSize: 18 }}>🔬 Prompt: Failure Mode Diagnostic</h3>
        <PromptBox color="#a78bfa">{`My Claude Skill is not working as expected. Help me diagnose 
and fix the problem.

Here is my complete SKILL.md: [PASTE YOUR SKILL.MD]

What I typed: [EXACT REQUEST YOU MADE]
What I expected: [EXPECTED BEHAVIOUR]
What actually happened: [ACTUAL BEHAVIOUR]

Diagnose against the 5 Failure Modes:
1. Silent Skill — Is the YAML strong enough to match my request?
2. Hijacker — Is the description too broad? Missing negative boundaries?
3. Drifter — Are instructions ambiguous?
4. Fragile Skill — Was my input an edge case not covered?
5. Overachiever — Are scope constraints missing?

For the identified failure mode:
- Explain exactly what caused the failure
- Provide the specific fix (corrected YAML or instruction)
- Show corrected section of SKILL.md ready to paste
- Suggest a test prompt to verify the fix works`}</PromptBox>
      </Card>

      <Card color="#34d399">
        <h3 style={{ color: "#10B981", fontWeight: 800, marginBottom: 16, fontSize: 18 }}>📊 Professional Testing Tools (Skills 2.0)</h3>
        <div className="grid-auto-fit">
          {[
            { name: "Evals", desc: "เขียน test prompts + define expected behavior → Pass/Fail grade ไม่ใช่แค่ 'ดูโอเค'", color: "#34d399" },
            { name: "Benchmarks", desc: "Track pass rate, token consumption, และ speed ข้าม versions ดูว่า v3 ดีขึ้นจริงไหม", color: "#60a5fa" },
            { name: "A/B Comparator", desc: "Blind test ระหว่าง 2 versions ของ instructions ข้อมูลจริงว่าตัวไหนชนะ", color: "#a78bfa" },
            { name: "Description Optimiser", desc: "บอกว่า YAML triggers จะ fire ถูกต้องไหมเมื่อ users ask", color: "#f59e0b" },
          ].map((tool, i) => (
            <div key={i} style={{ background: "white", border: `1px solid ${tool.color}30`, borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 800, color: tool.color, marginBottom: 8, fontSize: 15 }}>{tool.name}</div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{tool.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, background: "rgba(16,185,129,0.08)", borderRadius: 12, padding: 16, borderLeft: "4px solid #10B981" }}>
          <div style={{ fontSize: 14, color: "#047857", fontWeight: 800, marginBottom: 4 }}>เกณฑ์พร้อม Production:</div>
          <div style={{ fontSize: 14, color: "#475569" }}>Iterate จนกว่า 2 consecutive evaluation runs จะไม่มี significant improvement — นั่นคือสัญญาณว่า Skill พร้อม deploy จริงๆ</div>
        </div>
      </Card>
    </div>
  );
}

function SkillsModule4() {
  return (
    <div className="fade-in">
      <Tag color="#ec4899">🚀 Module 4</Tag>
      <h2 className="section-title" style={{ fontWeight: 800, margin: "8px 0 16px" }}>Production Deployment</h2>
      <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>Skills ทำงานได้แล้ว ผ่านการทดสอบแล้ว ตอนนี้คำถามเปลี่ยนจาก "ทำงานได้ไหม?" เป็น "ทำงานได้ที่ scale ข้ามหลาย sessions ไหม?"</p>

      <Card color="#ec4899" style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#EC4899", fontWeight: 800, marginBottom: 16, fontSize: 18 }}>🔄 State Management — ระบบ Shift Handover</h3>
        <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>เมื่อรัน Skill ข้าม sessions หลายครั้ง (เขียนหนังสือ, สร้าง app, manage project หลายสัปดาห์) context window เต็มและ Claude ลืมสิ่งที่ทำไปแล้ว</p>
        
        <div style={{ background: "#FDF2F8", border: "1px solid #FBCFE8", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 800, color: "#DB2777", marginBottom: 12, fontSize: 15 }}>💡 วิธีแก้: เพิ่ม 1 instruction ใน SKILL.md</div>
          <PromptBox color="#ec4899">{`"At the start of every session, read context-log.md to see 
what we completed last time.

At the end of every session, write a summary of what you 
finished and what's still pending."

# นั่นคือทั้งหมด Claude จะ:
# 1. อ่าน notes จาก session ก่อนหน้า
# 2. ทำงานต่อจากที่ค้างไว้
# 3. บันทึก progress ไว้ให้ session หน้า`}</PromptBox>
        </div>
        <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 800, color: "#475569", marginBottom: 6 }}>เปรียบเหมือน Hospital Shift Change</div>
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.8 }}>หมอที่รับเวรอ่าน chart แล้วรู้ทันทีว่าเกิดอะไรขึ้น อะไรค้างอยู่ และต้องระวังอะไร AI ของคุณทำงานแบบเดียวกัน</p>
        </div>
      </Card>

      <Card color="#60a5fa" style={{ marginBottom: 32 }}>
        <h3 style={{ color: "#3B82F6", fontWeight: 800, marginBottom: 16, fontSize: 18 }}>📋 Production Checklist</h3>
        <div style={{ display: "grid", gap: 12 }}>
          {[
            { check: "Skill ผ่าน 2 consecutive eval runs โดยไม่มี significant improvement", status: "test" },
            { check: "context-log.md instruction เพิ่มใน SKILL.md แล้ว", status: "state" },
            { check: "ทดสอบกับ worst-case inputs จริงๆ", status: "test" },
            { check: "Negative boundaries ครอบคลุม Skill อื่นๆ ทั้งหมดที่มีอยู่", status: "arch" },
            { check: "Scripts ทั้งหมด accept arguments และมี error handling", status: "code" },
            { check: "Reference files ไม่เกิน one level deep", status: "arch" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#10B981", fontWeight: 800, flexShrink: 0, fontSize: 16 }}>✓</span>
              <span style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>{item.check}</span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.08), rgba(124,58,237,0.08))", border: "1px solid rgba(236,72,153,0.2)", borderRadius: 20, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🏁</div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: "#1e1b4b", marginBottom: 12 }}>Skills Masterclass เสร็จสมบูรณ์</h3>
        <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: "0 auto 24px" }}>
          คุณสามารถเปิด Claude ทุกเช้าแล้วพิมพ์คำสั่งเดิมซ้ำๆ ทุกวัน หรือจะใช้เวลา 10 นาทีตอนนี้ สร้าง Skill หนึ่งตัว แล้วไม่ต้องพิมพ์คำสั่งนั้นอีกเลย
        </p>
        <div style={{ background: "white", padding: "12px 24px", borderRadius: 30, display: "inline-block", fontWeight: 800, color: "#8B5CF6", boxShadow: "0 4px 12px rgba(139,92,246,0.15)" }}>
          👉 เลือก 1 workflow ที่ทำซ้ำทุกสัปดาห์ → สร้าง Skill วันนี้
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("roadmap");
  const [skillsTab, setSkillsTab] = useState("intro");
  const [expandedPractice, setExpandedPractice] = useState(null);
  const [showAllPractices, setShowAllPractices] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const scrollTo = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      // Smooth scroll with offset for mobile header
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const copyPrompt = (idx, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.1, rootMargin: "-10% 0px -50% 0px" }
    );
    navSections.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const currentIdx = navSections.findIndex(s => s.id === activeSection);
  const prevSection = currentIdx > 0 ? navSections[currentIdx - 1] : null;
  const nextSection = currentIdx < navSections.length - 1 ? navSections[currentIdx + 1] : null;

  // Determine practices to show based on state
  const visiblePractices = showAllPractices ? practices : practices.slice(0, 5);

  return (
    <div className="app-container">
      {/* ─── GLOBAL CSS STYLES (PREMIUM SAAS & MOBILE FIRST) ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');
        
        :root {
          --primary: #7C3AED;     /* Violet */
          --secondary: #3B82F6;   /* Blue */
          --accent: #10B981;      /* Emerald */
          --bg-body: #F8FAFC;
          --text-dark: #0F172A;
          --text-muted: #64748B;
          --border-color: rgba(226,232,240,0.8);
          --shadow-sm: 0 2px 8px -2px rgba(15,23,42,0.05);
          --shadow-md: 0 10px 30px -10px rgba(124,58,237,0.15);
          --shadow-glass: 0 8px 32px rgba(0,0,0,0.08);
          --radius-xl: 20px;
          --sidebar-width: 260px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { 
          font-family: 'Sarabun', 'Noto Sans Thai', sans-serif; 
          background: var(--bg-body); 
          color: var(--text-dark); 
          -webkit-font-smoothing: antialiased;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 6px; }
        ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

        /* Typography */
        .text-gradient {
          background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-title { font-size: 36px; font-weight: 800; line-height: 1.2; letter-spacing: -0.5px; }
        .hero-title { font-size: clamp(32px, 5vw, 56px); font-weight: 800; line-height: 1.15; letter-spacing: -1px; }

        /* Animations */
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

        /* Buttons & Tags */
        .glass-btn { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .premium-btn {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white; border: none; border-radius: 12px; padding: 14px 28px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          box-shadow: 0 8px 20px -6px rgba(124,58,237,0.4);
          transition: all 0.3s ease;
        }
        .premium-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -6px rgba(124,58,237,0.5); }
        
        .outline-btn {
          background: white; border: 1.5px solid #E2E8F0; border-radius: 12px; padding: 13px 26px;
          color: var(--text-dark); font-size: 15px; font-weight: 600; cursor: pointer;
          transition: all 0.3s ease; box-shadow: var(--shadow-sm);
        }
        .outline-btn:hover { border-color: #CBD5E1; transform: translateY(-2px); }

        /* Layout Utilities */
        .grid-auto-fit { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .premium-card { box-shadow: var(--shadow-sm); transition: box-shadow 0.3s ease; }
        
        /* Sidebar Navigation */
        .sidebar {
          position: fixed; top: 0; left: 0; bottom: 0; width: var(--sidebar-width);
          background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid var(--border-color); padding: 24px 16px;
          display: flex; flex-direction: column; gap: 4px; overflow-y: auto; z-index: 100;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-item {
          cursor: pointer; padding: 10px 14px; border-radius: 10px; font-size: 14px; font-weight: 500;
          color: var(--text-muted); display: flex; align-items: center; gap: 10px; transition: all 0.2s ease;
        }
        .nav-item:hover { background: #F1F5F9; color: var(--text-dark); }
        .nav-item.active { 
          background: linear-gradient(to right, #F5F3FF, #EFF6FF); 
          color: var(--primary); font-weight: 700; 
          border-left: 3px solid var(--primary); border-radius: 0 10px 10px 0;
        }

        /* Mobile specific fixes */
        .mobile-header { display: none; }
        .sidebar-backdrop { display: none; }

        @media (max-width: 1024px) {
          .grid-auto-fit { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
        }

        @media (max-width: 768px) {
          .main-wrap { margin-left: 0 !important; padding: 80px 20px 120px !important; }
          
          /* Sidebar turns into a mobile drawer */
          .sidebar { transform: translateX(-100%); box-shadow: 20px 0 40px rgba(0,0,0,0.1); width: 80vw; max-width: 320px; }
          .sidebar.open { transform: translateX(0); }
          .sidebar-backdrop.open { 
            display: block; position: fixed; inset: 0; 
            background: rgba(15,23,42,0.4); backdrop-filter: blur(4px); 
            z-index: 90; animation: fadeIn 0.3s ease;
          }

          /* Mobile Header */
          .mobile-header {
            display: flex; position: fixed; top: 0; left: 0; right: 0; height: 60px;
            background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-color);
            align-items: center; justify-content: space-between; padding: 0 20px; z-index: 50;
          }

          .grid-auto-fit { grid-template-columns: 1fr; gap: 16px; }
          .premium-card { padding: 20px !important; }
          .section-title { font-size: 28px; }
          
          /* SVG Container responsiveness */
          .svg-wrapper { min-height: 140px !important; }
          
          /* Floating Nav Mobile */
          .float-nav-container { right: 16px !important; bottom: 20px !important; }
          .float-btn { width: 40px !important; height: 40px !important; font-size: 14px !important; }
          .float-btn-text { font-size: 12px !important; padding: 10px 16px !important; }
        }
      `}</style>

      {/* ─── MOBILE BACKDROP & HEADER ─── */}
      <div className={`sidebar-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      
      <div className="mobile-header">
        <div style={{ fontWeight: 800, fontSize: 16 }} className="text-gradient">Claude Masterclass</div>
        <button onClick={() => setMenuOpen(true)} style={{ 
          background: "white", border: "1px solid #E2E8F0", borderRadius: 8, 
          width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)", cursor: "pointer"
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>

      {/* ─── SIDEBAR ─── */}
      <nav className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div style={{ padding: "10px 14px 24px", marginBottom: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }} className="text-gradient">Claude Masterclass</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>คู่มือสมบูรณ์ภาษาไทย ฉบับ AI Tutor</div>
        </div>
        {navSections.map((s) => (
          <div key={s.id} className={`nav-item ${activeSection === s.id ? "active" : ""}`} onClick={() => scrollTo(s.id)}>
            <span style={{ fontSize: 16, filter: activeSection === s.id ? "none" : "grayscale(0.5)" }}>{s.icon}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </nav>

      {/* ─── FLOATING NAV BUTTONS ─── */}
      <div className="float-nav-container" style={{ position: "fixed", bottom: 32, right: 32, zIndex: 80, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
        {prevSection && (
          <button className="glass-btn hover-lift float-btn" onClick={() => scrollTo(prevSection.id)}
            style={{ background: "rgba(255,255,255,0.9)", border: "1px solid #E2E8F0", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", boxShadow: "var(--shadow-glass)" }}
            title={`กลับไป ${prevSection.label}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </button>
        )}
        <div style={{ display: "flex", gap: 12 }}>
          {nextSection && (
            <button className="premium-btn float-btn-text glass-btn" onClick={() => scrollTo(nextSection.id)}
              style={{ borderRadius: 24, padding: "12px 20px", display: "flex", alignItems: "center", gap: 8, boxShadow: "var(--shadow-md)" }}>
              {nextSection.icon} ไปยัง {nextSection.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="main-wrap" style={{ marginLeft: 260, padding: "0 64px 100px", maxWidth: 1200 }}>
        
        {/* HERO */}
        <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 40, paddingBottom: 60 }}>
          {/* SVG Container responsive */}
          <div className="svg-wrapper" style={{ width: "100%", borderRadius: 24, overflow: "hidden", marginBottom: 40, background: "#0F172A", boxShadow: "var(--shadow-md)", minHeight: 220 }}>
            <SvgHero />
          </div>

          <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 30, fontSize: 13, fontWeight: 700, border: "1px solid rgba(124,58,237,0.2)", background: "rgba(124,58,237,0.05)", color: "var(--primary)", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
              อัปเดตล่าสุด: เนื้อหาสำหรับ Claude 4.6 & Cowork
            </div>
            
            <h1 className="hero-title" style={{ marginBottom: 24 }}>
              เรียนรู้การใช้ Claude<br />
              <span className="text-gradient">ทำงานแทนคุณแบบ 100%</span>
            </h1>
            
            <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
              จาก Prompt พื้นฐาน สู่การสร้าง AI Agent ส่วนตัว นี่คือ Masterclass ที่จะเปลี่ยนคุณจากผู้ใช้งาน เป็น <strong style={{ color: "var(--text-dark)" }}>ผู้ควบคุม AI อย่างแท้จริง</strong>
            </p>
            
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="premium-btn" onClick={() => scrollTo("roadmap")}>
                เริ่มเรียนตาม Roadmap 🚀
              </button>
              <button className="outline-btn" onClick={() => scrollTo("how-to")}>
                สรุปวิธีใช้ฉบับรวบรัด 💡
              </button>
            </div>
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 40, textAlign: "center" }}>
            <Tag color="#a78bfa">🗺️ Learning Roadmap</Tag>
            <h2 className="section-title">คุณอยู่ Level ไหนคะ?</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>ประเมินตัวเองก่อน แล้วเริ่มเรียนตามลำดับที่เหมาะกับคุณที่สุดค่ะ</p>
          </div>

          {/* Level Cards */}
          <div className="grid-auto-fit" style={{ marginBottom: 40 }}>
            {userLevels.map((lvl) => {
              const isSelected = selectedLevel === lvl.level;
              return (
                <div key={lvl.level} onClick={() => setSelectedLevel(isSelected ? null : lvl.level)}
                  className="hover-lift"
                  style={{ 
                    background: isSelected ? `${lvl.color}05` : "white", 
                    border: `2px solid ${isSelected ? lvl.color : "transparent"}`,
                    boxShadow: isSelected ? `0 10px 30px -10px ${lvl.color}40` : "var(--shadow-sm)",
                    borderRadius: 20, padding: 24, cursor: "pointer", position: "relative",
                    overflow: "hidden"
                  }}>
                  {isSelected && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: lvl.color }} />}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ fontSize: 40 }}>{lvl.emoji}</div>
                    <div style={{ background: `${lvl.color}15`, color: lvl.color, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>LV.{lvl.level}</div>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 20, color: "#1E293B", marginBottom: 4 }}>{lvl.name}</h3>
                  <div style={{ fontSize: 13, color: lvl.color, fontWeight: 700, marginBottom: 12 }}>{lvl.thaiName}</div>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 20 }}>{lvl.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {lvl.skills.map((s, i) => (
                      <span key={i} style={{ background: "#F1F5F9", color: "#475569", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Message */}
          {selectedLevel && (
            <div className="fade-in premium-card" style={{ background: `linear-gradient(to right, ${userLevels[selectedLevel-1].color}10, transparent)`, borderColor: `${userLevels[selectedLevel-1].color}30`, marginBottom: 40 }}>
               <h4 style={{ color: userLevels[selectedLevel-1].color, fontSize: 18, fontWeight: 800, marginBottom: 8 }}>ยอดเยี่ยมเลยค่ะ!</h4>
               <p style={{ color: "#334155", fontSize: 15, lineHeight: 1.7 }}>
                  สำหรับคุณที่อยู่ <strong style={{color: userLevels[selectedLevel-1].color}}>Level {selectedLevel}</strong> Geni แนะนำให้เริ่มเจาะลึกที่: {userLevels[selectedLevel-1].nextStep}
               </p>
            </div>
          )}

          <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 24, color: "#1E293B" }}>📍 เส้นทาง 10 ขั้นตอนที่แนะนำ</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[1,2,3,4].map(lvl => {
              const lvlInfo = userLevels.find(l => l.level === lvl);
              const steps = roadmapSteps.filter(s => s.level === lvl);
              return (
                <div key={lvl}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                    <div style={{ background: `${lvlInfo.color}15`, color: lvlInfo.color, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 800 }}>
                      Level {lvl} — {lvlInfo.name}
                    </div>
                    <div style={{ height: 1, flex: 1, background: "var(--border-color)" }} />
                  </div>
                  <div className="grid-auto-fit">
                    {steps.map((step) => (
                      <div key={step.step} onClick={() => scrollTo(step.section)} className="hover-lift"
                        style={{ background: "white", border: `1px solid var(--border-color)`, borderRadius: 16, padding: 20, display: "flex", gap: 16 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${step.color}15`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <div style={{ fontSize: 10, color: step.color, fontWeight: 800 }}>STEP</div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: step.color, lineHeight: 1 }}>{step.step}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>{step.icon} {step.title}</div>
                          <div style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 12, lineHeight: 1.5 }}>{step.subtitle}</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {step.items.map((item, j) => (
                              <span key={j} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#64748B", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 500 }}>✓ {item}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW TO USE CLAUDE */}
        <section id="how-to" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <Tag color="#8B5CF6">💡 How to Use</Tag>
            <h2 className="section-title">สรุปวิธีใช้งาน Claude ทั้ง 8 ส่วน</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>เจาะลึกการใช้งานแต่ละฟีเจอร์ พร้อม Tips & ข้อควรระวังที่คนมักทำพลาด</p>
          </div>

          <div className="grid-auto-fit">
            {howToData.map((item, i) => (
              <Card key={i} color={item.color} className="hover-lift" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, color: "#1E293B" }}>{item.title}</h3>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{item.desc}</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Prompt Box */}
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: item.color, marginBottom: 6, letterSpacing: 0.5 }}>ลอง PROMPT แบบนี้:</div>
                    <div style={{ fontSize: 13, color: "#475569", fontStyle: "italic", lineHeight: 1.6 }}>{item.prompt}</div>
                  </div>
                  
                  {/* Pro Tip Box */}
                  <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#059669", marginBottom: 6, letterSpacing: 0.5 }}>💡 PRO TIP:</div>
                    <div style={{ fontSize: 13, color: "#047857", lineHeight: 1.6 }}>{item.tip}</div>
                  </div>
                  
                  {/* Common Mistake Box */}
                  <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#DC2626", marginBottom: 6, letterSpacing: 0.5 }}>⚠️ COMMON MISTAKE:</div>
                    <div style={{ fontSize: 13, color: "#B91C1C", lineHeight: 1.6 }}>{item.mistake}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SKILLS MASTERCLASS */}
        <section id="skills-masterclass" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#60a5fa">⚡ Skills Masterclass</Tag>
            <h2 className="section-title">เรียนรู้การสร้าง Skills ให้ Claude</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>เลือกอ่านแต่ละ Module ได้ตามต้องการเลยค่ะ</p>
          </div>

          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16, WebkitOverflowScrolling: "touch", margin: "0 -20px 24px", paddingLeft: 20, paddingRight: 20 }}>
            {skillsModules.map((m) => (
              <button key={m.id} onClick={() => setSkillsTab(m.id)}
                style={{ 
                  whiteSpace: "nowrap", padding: "10px 20px", borderRadius: 24, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                  border: `1px solid ${skillsTab === m.id ? m.color : "var(--border-color)"}`,
                  background: skillsTab === m.id ? m.color : "white",
                  color: skillsTab === m.id ? "white" : "var(--text-muted)",
                  boxShadow: skillsTab === m.id ? `0 4px 12px ${m.color}40` : "none"
                }}>
                {m.icon} {m.label}
              </button>
            ))}
          </div>

          <div className="premium-card fade-in" style={{ padding: "32px 24px", minHeight: 400 }}>
            {skillsTab === "intro" && <SkillsIntro />}
            {skillsTab === "m1" && <SkillsModule1 />}
            {skillsTab === "m2" && <SkillsModule2 />}
            {skillsTab === "m3" && <SkillsModule3 />}
            {skillsTab === "m4" && <SkillsModule4 />}
          </div>
        </section>

        {/* COWORK INTRO */}
        <section id="cowork-intro" style={{ paddingTop: 80 }}>
          <div className="svg-wrapper" style={{ width: "100%", borderRadius: 24, overflow: "hidden", marginBottom: 32, background: "#0F172A", boxShadow: "var(--shadow-md)" }}>
            <SvgCowork />
          </div>
          
          <div style={{ textAlign: "center", marginBottom: 40 }}>
             <Tag color="#a78bfa">🤖 Cowork</Tag>
             <h2 className="section-title">Claude Cowork คืออะไร?</h2>
             <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>ก้าวข้าม Chatbot สู่ AI ที่ลงมือ "ทำงาน" แทนคุณจริงๆ ค่ะ</p>
          </div>

          <div className="grid-auto-fit">
            <Card color="#EF4444" style={{ background: "linear-gradient(to bottom right, #FEF2F2, white)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, background: "#FEE2E2", color: "#EF4444", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>❌</div>
                <h3 style={{ fontWeight: 800, color: "#B91C1C", fontSize: 18 }}>AI ทั่วไป (Chat)</h3>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, color: "#475569" }}>
                <li>คุณต้องพิมพ์ Prompt ยาวๆ</li>
                <li>ทำได้แค่อ่าน Text แล้วก็อปไปวางเอง</li>
                <li>คุณยังต้องเป็นคนจัดการไฟล์และเครื่องมือ</li>
              </ul>
            </Card>
            <Card color="#10B981" style={{ background: "linear-gradient(to bottom right, #ECFDF5, white)", boxShadow: "0 10px 30px -10px rgba(16,185,129,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, background: "#D1FAE5", color: "#10B981", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✅</div>
                <h3 style={{ fontWeight: 800, color: "#047857", fontSize: 18 }}>Claude Cowork</h3>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, color: "#0F172A", fontWeight: 500 }}>
                <li><span style={{color:"#10B981", marginRight: 8}}>✓</span> อ่าน/เขียนไฟล์ในคอมคุณได้ตรงๆ</li>
                <li><span style={{color:"#10B981", marginRight: 8}}>✓</span> เชื่อมต่อ Google Drive, Notion, Slack ได้</li>
                <li><span style={{color:"#10B981", marginRight: 8}}>✓</span> ทำงานอัตโนมัติตั้งแต่ต้นจนจบ คุณแค่รอตรวจงาน</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* SETUP */}
        <section id="cowork-setup" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#f59e0b">⚙️ Setup</Tag>
            <h2 className="section-title">ตั้งค่า Cowork ใน 5 นาที</h2>
          </div>
          <div className="grid-auto-fit">
            {[
              { step: 1, title: "ดาวน์โหลด Claude Desktop", desc: "claude.com/download → ดาวน์โหลดสำหรับ Mac/Windows → ต้องมี Pro Account ($20/เดือน)", color: "#a78bfa", icon: "⬇️" },
              { step: 2, title: "เปิด Cowork Tab", desc: "เปิดแอป → คลิก Cowork tab ด้านบน → Select folder จากคอมของคุณ", color: "#60a5fa", icon: "🖥️" },
              { step: 3, title: "เลือกโมเดลที่ถูกต้อง", desc: "เลือก Opus 4.6 เสมอ + เปิด Extended Thinking เพื่อผลลัพธ์ที่ดีที่สุด", color: "#34d399", icon: "🧠" },
              { step: 4, title: "รันงานแรก", desc: "เขียน task ตรงๆ กด Run แล้วดู Cowork แบ่งงานและทำทีละขั้นตอน real-time", color: "#f59e0b", icon: "▶️" },
            ].map((item, i) => (
              <Card key={i} color={item.color} className="hover-lift">
                <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: item.color, fontWeight: 800, letterSpacing: 1 }}>STEP {item.step}</div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#1E293B" }}>{item.title}</div>
                  </div>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* PROMPT */}
        <section id="prompt" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#ec4899">✍️ Prompt</Tag>
            <h2 className="section-title">Prompt Engineering สำหรับ Cowork</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>สูตร 3 ส่วน + AskUserQuestion tool</p>
          </div>
          <div className="grid-auto-fit" style={{ marginBottom: 24 }}>
            {[
              { label: "1. Task", desc: "คุณต้องการให้ทำอะไร? บอกตรงๆ ชัดๆ", example: "Go through my inbox and draft responses to every unread email from the last 24 hours.", color: "#a78bfa", icon: "🎯" },
              { label: "2. Context", desc: "ข้อมูลที่ Cowork ต้องรู้เพื่อทำงานได้ดี", example: "I run a content agency. My tone is direct and professional.", color: "#60a5fa", icon: "📋" },
              { label: "3. Output", desc: "ผลลัพธ์สุดท้ายต้องหน้าตาแบบไหน?", example: "Deliver each draft in format: Sender / Subject / Draft Response.", color: "#34d399", icon: "📤" },
            ].map((item, i) => (
              <Card key={i} color={item.color}>
                <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <h3 style={{ color: item.color, fontWeight: 800, fontSize: 16 }}>{item.label}</h3>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 12 }}>{item.desc}</p>
                <div style={{ background: "#F8FAFC", border: `1px solid ${item.color}20`, borderRadius: 10, padding: 12, fontSize: 13, color: "#475569", fontFamily: "'Space Grotesk', monospace" }}>{item.example}</div>
              </Card>
            ))}
          </div>
          <div className="grid-auto-fit">
             <Card color="#a78bfa">
              <h3 style={{ color: "#8B5CF6", marginBottom: 12, fontWeight: 800, fontSize: 16 }}>🤖 AskUserQuestion</h3>
              <PromptBox color="#a78bfa">{`I want to [TASK] to [SUCCESS CRITERIA].\nFirst, explore my CLAUDE COWORK folder.\nThen, ask me questions using the AskUserQuestion tool.\nI want to refine the approach with you before you execute.`}</PromptBox>
             </Card>
             <Card color="#34d399">
              <h3 style={{ color: "#10B981", marginBottom: 12, fontWeight: 800, fontSize: 16 }}>⚡ Autonomous Mode</h3>
              <PromptBox color="#34d399">{`Complete this task autonomously.\nOnly stop and ask me if you hit something you genuinely\ncannot resolve without my input.\nOtherwise deliver the finished result.`}</PromptBox>
             </Card>
          </div>
        </section>

        {/* ARTIFACTS */}
        <section id="artifacts" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#34d399">🎨 Artifacts</Tag>
            <h2 className="section-title">Artifacts — สร้าง Interactive Content</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16, lineHeight: 1.8 }}>Artifacts คือ output พิเศษที่ Claude สร้างได้ใน Chat window — ไม่ใช่แค่ text ธรรมดา แต่เป็น apps, charts, diagrams, และ tools ที่โต้ตอบได้จริง</p>
          </div>

          <div style={{ marginBottom: 40 }}>
            <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 20, color: "#1E293B" }}>🗂️ Artifacts 5 ประเภท — แต่ละแบบใช้ทำอะไร</h3>
            <div className="grid-auto-fit">
              {[
                { type: "Code", icon: "💻", color: "#60a5fa", desc: "แสดง code พร้อม syntax highlight และปุ่ม Copy ใช้กับทุกภาษา Python, JS, SQL, bash", when: "เขียน function, script, SQL query, หรือ config file", example: "สร้าง Python script แปลง CSV → JSON", trigger: "'Write a Python script that...'" },
                { type: "Markdown", icon: "📝", color: "#a78bfa", desc: "Render markdown เป็น formatted document พร้อม headers, tables, lists สวยงาม", when: "สร้าง report, README, documentation, blog post", example: "สร้าง project README ที่ formatted สวยงาม", trigger: "'Create a markdown document for...'" },
                { type: "HTML", icon: "🌐", color: "#f59e0b", desc: "Render HTML page จริงๆ ภายใน Claude มี CSS + JS ทำงานได้", when: "landing page prototype, email template, styled document", example: "Email newsletter template ที่เปิดใน browser ได้", trigger: "'Create an HTML page for...'" },
                { type: "SVG", icon: "🖼️", color: "#ec4899", desc: "Vector graphics ที่ scalable ได้ diagram, icon, illustration, chart แบบ static", when: "Diagram, flowchart, icon, infographic แบบ vector", example: "System architecture diagram ที่ zoom ได้ไม่แตก", trigger: "'Create an SVG diagram showing...'" },
                { type: "React Component", icon: "⚛️", color: "#34d399", desc: "Full interactive React app ที่ run ใน browser ได้เลย มี state, hooks, animation ทำงานจริง", when: "Dashboard, calculator, quiz, game, data visualization interactive", example: "Budget tracker ที่กรอกตัวเลขแล้วคำนวณ real-time", trigger: "'Build a React component that...'" },
              ].map((item, i) => (
                <div key={i} className="premium-card hover-lift" style={{ border: `1px solid ${item.color}25`, padding: 20 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{item.icon}</div>
                    <div style={{ fontWeight: 800, color: item.color, fontSize: 16 }}>{item.type}</div>
                  </div>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{item.desc}</p>
                  <div style={{ fontSize: 13, marginBottom: 8 }}>
                    <span style={{ color: item.color, fontWeight: 700 }}>ใช้เมื่อ: </span>
                    <span style={{ color: "#475569" }}>{item.when}</span>
                  </div>
                  <div style={{ fontSize: 13, marginBottom: 12 }}>
                    <span style={{ color: item.color, fontWeight: 700 }}>ตัวอย่าง: </span>
                    <span style={{ color: "#475569" }}>{item.example}</span>
                  </div>
                  <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#64748B", fontFamily: "'Space Grotesk', monospace" }}>
                    {item.trigger}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CUSTOMIZE */}
        <section id="customize" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#f97316">🔧 Customize</Tag>
            <h2 className="section-title">ปรับแต่ง Cowork</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>3 วิธีหลักที่ทำให้ Cowork ทรงพลังจริงๆ</p>
          </div>
          <div className="grid-auto-fit">
            {[
              { title: "1. Connectors", path: "Customize → Connectors", icon: "🔌", color: "#a78bfa", desc: "เชื่อม Cowork กับเครื่องมือที่ใช้อยู่ Slack, Notion, Gmail, Google Calendar ใช้เวลา 20 นาที ประหยัดหลายชั่วโมงต่อสัปดาห์", apps: ["Slack","Notion","Gmail","Google Drive","Asana","Figma"] },
              { title: "2. Skills", path: "Customize → Skills", icon: "⚡", color: "#60a5fa", desc: "ชุดคำสั่งที่ใช้ซ้ำได้ Prompt ที่ใช้บ่อย → เปลี่ยนเป็น Skill สร้างโดยแค่อธิบาย workflow ให้ Claude ฟัง", apps: ["Custom workflows","Repeatable tasks","Brand templates","SOPs"] },
              { title: "3. Plug-ins", path: "Customize → Plug-ins", icon: "🧩", color: "#34d399", desc: "รวมหลาย Skills เป็น 'บทบาท' Anthropic มีให้แล้ว 12 แบบ Marketing, Finance, Legal, Sales, Data Analysis", apps: ["Marketing","Finance","Legal","Sales","Data Analysis"] },
            ].map((item, i) => (
              <Card key={i} color={item.color} className="hover-lift">
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <div>
                    <h3 style={{ color: item.color, fontWeight: 800, fontSize: 16 }}>{item.title}</h3>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'Space Grotesk', monospace", marginTop: 4 }}>{item.path}</div>
                  </div>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{item.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {item.apps.map((app, j) => <span key={j} style={{ background: `${item.color}10`, border: `1px solid ${item.color}20`, color: item.color, padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{app}</span>)}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* BEST PRACTICES - FIX: View All 17 Items */}
        <section id="best-practices" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#F59E0B">🏆 Best Practices</Tag>
            <h2 className="section-title">17 Best Practices ฉบับโปร</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>เทคนิคสำคัญที่กลั่นกรองมาจากผู้ใช้งานกว่า 400 Sessions ค่ะ</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {visiblePractices.map((p, i) => ( 
              <div key={i} className="premium-card" style={{ padding: "0", cursor: "pointer", overflow: "hidden" }}>
                <div onClick={() => setExpandedPractice(expandedPractice === i ? null : i)} style={{ padding: "20px", display: "flex", alignItems: "center", gap: 16, background: expandedPractice === i ? "#F8FAFC" : "white" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: p.color, flexShrink: 0 }}>{p.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#1E293B", marginBottom: 4 }}>{p.title}</div>
                    <span style={{ background: `${p.color}15`, color: p.color, padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>Impact: {p.impact}</span>
                  </div>
                  <span style={{ color: "#94A3B8", fontSize: 24, transform: expandedPractice === i ? "rotate(90deg)" : "none", transition: "0.3s ease" }}>›</span>
                </div>
                {expandedPractice === i && (
                  <div className="fade-in" style={{ padding: "0 20px 20px", paddingLeft: 76, color: "#475569", fontSize: 14, lineHeight: 1.8, background: "#F8FAFC" }}>
                    {p.desc}
                  </div>
                )}
              </div>
            ))}
            
            {/* Toggle Show All Button */}
            <div style={{ textAlign: "center", marginTop: 16 }}>
               <button 
                  className="outline-btn" 
                  onClick={() => setShowAllPractices(!showAllPractices)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
               >
                  {showAllPractices ? "ซ่อนเนื้อหา ⬆️" : "ดูทั้งหมด 17 ข้อ 👇"}
               </button>
            </div>
          </div>
        </section>

        {/* FOLDER SETUP */}
        <section id="folder-setup" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#34d399">📁 โครงสร้าง</Tag>
            <h2 className="section-title">โครงสร้างโฟลเดอร์ที่ถูกต้อง</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>จัดการ Context Files เพื่อให้ Claude รู้จักคุณ</p>
          </div>
          <div className="grid-auto-fit">
            <Card color="#34d399" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: "#10B981", marginBottom: 16, fontWeight: 800, fontSize: 18 }}>🗂️ โครงสร้างหลัก</h3>
              <div style={{ flex: 1 }}>
                <PromptBox color="#34d399">{`Claude-Work/
│
├── 📂 ABOUT ME/
│   ├── about-me.md
│   ├── my-voice.md
│   └── my-rules.md
│
├── 📂 PROJECTS/
│   └── (1 project per folder)
│
├── 📂 TEMPLATES/
│   └── (ผลงานที่ดีที่สุด)
│
└── 📂 OUTPUTS/
    └── (Claude บันทึกงานที่นี่)`}</PromptBox>
              </div>
            </Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { file: "about-me.md", color: "#a78bfa", desc: "สิ่งที่คุณทำในชีวิตประจำวัน, บทบาท, เป้าหมายปัจจุบัน ไม่ใช่ Resume" },
                { file: "my-voice.md", color: "#60a5fa", desc: "โทนการเขียน, คำที่ชอบ/ไม่ชอบ, ตัวอย่างงานเขียน 2-3 ชิ้น" },
                { file: "my-rules.md", color: "#34d399", desc: "กฎการทำงาน: ให้ถามก่อน, เสนอแผนก่อน, ห้ามลบไฟล์โดยไม่ได้รับอนุญาต" },
              ].map((item, i) => (
                <Card key={i} color={item.color} style={{ padding: 16 }}>
                  <div style={{ fontFamily: "'Space Grotesk', monospace", color: item.color, fontWeight: 800, marginBottom: 8, fontSize: 14 }}>📄 {item.file}</div>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
          <Card color="#f59e0b" style={{ marginTop: 24 }}>
            <h3 style={{ color: "#F59E0B", marginBottom: 16, fontWeight: 800, fontSize: 18 }}>⚙️ Global Instructions Template</h3>
            <PromptBox color="#f59e0b">{`# GLOBAL INSTRUCTIONS

## BEFORE EVERY TASK
1. Read ABOUT ME/ — No task starts without reading these files
2. If task relates to a project, read matching PROJECTS/ subfolder
3. If involves content type, study matching TEMPLATES/ structure

## FOLDER PROTOCOL
Read-only: ABOUT ME/, TEMPLATES/, PROJECTS/
Write only: CLAUDE OUTPUTS/

## NAMING CONVENTION
project_content-type_v1.ext
Examples: newsletter_v1.md / client-brief_v2.docx

## OPERATING RULES
- ถ้า brief ไม่ชัดเจน → ใช้ AskUserQuestion tool
- ห้าม over-explain — ส่ง work เลย
- ห้ามลบไฟล์ใดๆ ทั้งสิ้น`}</PromptBox>
          </Card>
        </section>

        {/* CONNECTORS */}
        <section id="connectors" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#38bdf8">🔌 Connectors</Tag>
            <h2 className="section-title">Connectors — เชื่อม Claude กับทุกเครื่องมือ</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16, lineHeight: 1.8 }}>
              Connectors คือ "สะพาน" ที่เชื่อม Claude กับ apps จริงของคุณ ไม่ใช่แค่อ่านข้อมูล — แต่ค้นหา วิเคราะห์ สร้าง และ take action ได้ด้วย
            </p>
          </div>

          <div className="grid-auto-fit" style={{ marginBottom: 40 }}>
            {[
              { icon: "🧠", title: "สร้างบน MCP", color: "#38bdf8", desc: "Connectors สร้างบน Model Context Protocol (MCP) ของ Anthropic — standard เปิดที่ทำให้ Claude รู้จัก 'โลกของคุณ'" },
              { icon: "✍️", title: "ไม่ใช่แค่อ่าน", color: "#a78bfa", desc: "หลาย Connector สามารถ read + write + take action เช่น draft Slack message, สร้าง Asana task ได้โดยตรง" },
              { icon: "🔒", title: "ปลอดภัย & ควบคุมได้", color: "#34d399", desc: "ทุก Connector ผ่านการ review จาก Anthropic ข้อมูลถูก encrypt ระหว่างส่ง เชื่อมเฉพาะสิ่งที่คุณมีสิทธิ์เข้าถึง" },
              { icon: "📁", title: "ใน Cowork มีพลังพิเศษ", color: "#f59e0b", desc: "ใน Cowork Connectors ยิ่งทรงพลัง เพราะสามารถ ดึงข้อมูลจาก web แล้วบันทึกลงไฟล์ในคอม หรือใช้ไฟล์ local เป็น input" },
            ].map((item, i) => (
              <Card key={i} color={item.color}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ color: item.color, fontWeight: 800, marginBottom: 8, fontSize: 16 }}>{item.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* COWORK MASTERY */}
        <section id="cowork-mastery" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#f97316">🎯 Cowork Mastery</Tag>
            <h2 className="section-title">ใช้ Cowork ให้ราบรื่น & เร็วขึ้น</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16, lineHeight: 1.8 }}>เทคนิคที่ทำให้ Cowork ทำงานแทนคุณได้จริง ไม่ติดขัด ไม่ต้องคอยดู</p>
          </div>

          <Card color="#60a5fa" style={{ marginBottom: 32 }}>
            <h3 style={{ color: "#3B82F6", fontWeight: 800, marginBottom: 20, fontSize: 18 }}>🎖️ Framework การมอบงานให้ AI — 4 ระดับ</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { level: "Level 1", name: "Supervised Execution", color: "#34d399", desc: "สั่ง task + ดู plan + approve ทุกขั้น เหมาะกับงานใหม่ที่ยังไม่เคยทดสอบ หรืองานที่มีความเสี่ยงสูง", example: "จัดระเบียบ client files ครั้งแรก" },
                { level: "Level 2", name: "Plan & Go", color: "#60a5fa", desc: "สั่ง task + ดู plan 30 วินาที + approve + ปล่อยให้รัน กลับมา review ตอนเสร็จ เหมาะกับงานที่เคยทดสอบแล้ว", example: "สร้าง weekly report จาก template ที่มีอยู่" },
                { level: "Level 3", name: "Autonomous with Checkpoint", color: "#f59e0b", desc: "ตั้ง uncertainty rules ให้ชัด (ถ้าไม่แน่ใจ 80% ให้ flag) แล้วปล่อยรัน Claude ทำเสร็จเต็ม แค่ review สิ่งที่ flagged", example: "process 200 invoices บันทึกลง spreadsheet" },
                { level: "Level 4", name: "Full Automation", color: "#a78bfa", desc: "Scheduled task + Connectors + Skills ที่ทดสอบแล้ว รันอัตโนมัติโดยไม่ต้องสั่ง คุณแค่ review output ที่บันทึกไว้", example: "Monday morning briefing ทุกสัปดาห์" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "16px", background: "#F8FAFC", border: `1px solid ${item.color}20`, borderRadius: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, flexDirection: "column" }}>
                    <div style={{ fontSize: 11, color: item.color, fontWeight: 800 }}>{item.level}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: item.color, marginBottom: 6, fontSize: 15 }}>{item.name}</div>
                    <div style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>{item.desc}</div>
                    <div style={{ fontSize: 12, color: "#94A3B8", fontStyle: "italic" }}>ตัวอย่าง: {item.example}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* USE CASES & INCOME */}
        <section id="use-cases" style={{ paddingTop: 80 }}>
          <div className="svg-wrapper" style={{ width: "100%", borderRadius: 24, overflow: "hidden", marginBottom: 32, background: "#0F172A", boxShadow: "var(--shadow-md)" }}>
            <SvgUseCases />
          </div>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Tag color="#ec4899">💼 Use Cases & Income</Tag>
            <h2 className="section-title">ประยุกต์ใช้จริง & สร้างรายได้</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>รวม Use cases จากผู้ใช้จริงและ 4 โมเดลทำเงินด้วย AI</p>
          </div>

          <div className="grid-auto-fit">
            <Card color="#ec4899" className="hover-lift">
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#EC4899", marginBottom: 12 }}>💼 1. Supercharged Freelancing</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>ใช้ Cowork ช่วยทำงานให้เสร็จเร็วขึ้น 3-5 เท่า รับงานได้มากขึ้น และรับรายได้สูงขึ้น</p>
            </Card>
            <Card color="#34d399" className="hover-lift">
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#10B981", marginBottom: 12 }}>📚 2. AI Education & Training</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>สร้าง Course หรือเปิด Workshop สอนคนใช้งาน Claude + Cowork ในสายอาชีพต่างๆ</p>
            </Card>
            <Card color="#f59e0b" className="hover-lift">
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>⚙️ 3. AI-Powered Micro Agency</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>เปิดเอเจนซี่ที่ใช้คนทำงานน้อยมาก แต่ส่งมอบงานระดับสเกลใหญ่ด้วยพลังของ AI Automation</p>
            </Card>
            <Card color="#a78bfa" className="hover-lift">
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#8B5CF6", marginBottom: 12 }}>🛠️ 4. Skills Marketplace</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>พัฒนาและขาย Custom Skills, Prompts, หรือ Templates ที่เตรียมพร้อมไว้ใช้งาน</p>
            </Card>
          </div>
        </section>

        {/* WORKFLOWS & PROMPTS */}
        <section id="workflows" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#EC4899">🚀 Workflows</Tag>
            <h2 className="section-title">ตัวอย่าง Workflows พร้อมใช้</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>กด Copy แล้วนำไปปรับใช้กับข้อมูลของคุณได้เลยค่ะ</p>
          </div>

          <div className="grid-auto-fit">
            {workflows.map((wf, i) => (
              <Card key={i} color={wf.color} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 28 }}>{wf.title.split(" ")[0]}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B" }}>{wf.title.split(" ").slice(1).join(" ")}</h3>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>{wf.desc}</p>
                <div style={{ flex: 1 }}>
                   <PromptBox color={wf.color}>{wf.prompt}</PromptBox>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* POWER TIPS */}
        <section id="power-tips" style={{ paddingTop: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <Tag color="#f59e0b">⚡ Power Tips</Tag>
            <h2 className="section-title">Power Tips ที่คนส่วนใหญ่ไม่รู้</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>เทคนิคเด็ดจาก community + tricks ที่เห็นผลจริง</p>
          </div>
          <Card color="#34d399" style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ fontSize: 40 }}>📊</div>
              <div>
                <h3 style={{ fontWeight: 800, color: "#10B981", fontSize: 20, marginBottom: 8 }}>วิเคราะห์ข้อมูล Excel ด้วย Claude Opus 4.6 — In-App</h3>
                <span style={{ background: "rgba(16,185,129,0.12)", color: "#047857", border: "1px solid rgba(16,185,129,0.25)", padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 700 }}>🆕 Claude in Excel — Add-in ใหม่</span>
              </div>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              ไม่ต้อง export ออกมาให้ Claude วิเคราะห์แล้ว — ตอนนี้ Claude อยู่ใน Excel ได้เลย เปิด sidebar คุยกับ Opus 4.6 โดยตรงจากใน spreadsheet
            </p>
            <div className="grid-auto-fit">
              {["วิเคราะห์ trend และ anomaly ใน sales data", "สร้าง pivot table พร้อม insight summary", "เขียน formula ซับซ้อนโดย describe เป็นภาษาธรรมดา"].map((use, i) => (
                <div key={i} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#475569" }}>✓ {use}</div>
              ))}
            </div>
          </Card>
        </section>

        {/* CLAUDE AS TUTOR */}
        <section id="claude-tutor" style={{ paddingTop: 80 }}>
          <div className="svg-wrapper" style={{ width: "100%", borderRadius: 24, overflow: "hidden", marginBottom: 32, background: "#0F172A", boxShadow: "var(--shadow-md)" }}>
            <SvgTutor />
          </div>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Tag color="#38bdf8">🎓 Claude as Tutor</Tag>
            <h2 className="section-title">Claude = ติวเตอร์ส่วนตัวระดับ Harvard</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>3 วิธีเปลี่ยน Claude เป็น personal tutor ที่ดีที่สุดในโลก</p>
          </div>
          
          <div className="grid-auto-fit">
            {[
              { title: "1. Learning Style", color: "#38bdf8", desc: "เปิด 'Use Style' -> 'Learning' ให้ Claude สอนแบบ Socratic Method ถามกลับและเช็คความเข้าใจ" },
              { title: "2. Claude Skills", color: "#a78bfa", desc: "สร้าง Skill เป็น Tutor ประจำตัว ให้รู้ระดับของเราและติดตาม Progress ต่อเนื่อง" },
              { title: "3. Udemy Business Connector", color: "#34d399", desc: "เชื่อมต่อ Udemy ดึงเนื้อหาคอร์สมาสรุปและสร้าง Quiz ทบทวนได้โดยตรง" },
            ].map((method, i) => (
               <Card key={i} color={method.color} className="hover-lift">
                  <h3 style={{ fontWeight: 800, color: method.color, fontSize: 18, marginBottom: 12 }}>{method.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{method.desc}</p>
               </Card>
            ))}
          </div>
        </section>

        {/* RESOURCES - EXPANDED */}
        <section id="resources" style={{ paddingTop: 80 }}>
          <div className="svg-wrapper" style={{ width: "100%", borderRadius: 24, overflow: "hidden", marginBottom: 32, background: "#0F172A", boxShadow: "var(--shadow-md)" }}>
            <SvgResources />
          </div>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Tag color="#60a5fa">📚 Resources</Tag>
            <h2 className="section-title">แหล่งเรียนรู้ — ไปต่อจากนี้</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 12, fontSize: 16 }}>รวม 7 แหล่งข้อมูลระดับ Top ของ Claude ที่ผู้ใช้ทุกคนควร Bookmark ไว้ค่ะ</p>
          </div>
          <div className="grid-auto-fit">
            <Card color="#a78bfa" className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#64748B" }}>Official</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#DC2626" }}>Must Read</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#8B5CF6", marginBottom: 12 }}>📖 Official Anthropic Guides</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>อ่านคู่มือการใช้งาน Prompt, Skills และ API แบบละเอียดยิบส่งตรงจากผู้สร้าง Claude</p>
              <a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" style={{ color: "#8B5CF6", fontWeight: 700, textDecoration: "none" }}>ดูข้อมูลเพิ่มเติม →</a>
            </Card>
            <Card color="#60a5fa" className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#64748B" }}>Courses</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#10B981" }}>เรียนฟรี</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#60A5FA", marginBottom: 12 }}>🎓 Anthropic Learn Courses</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>คอร์สเรียนฟรีจาก Anthropic ตั้งแต่ Prompt Engineering ไปจนถึงการใช้ API ในโปรดักชัน</p>
              <a href="https://www.anthropic.com/learn" target="_blank" rel="noopener noreferrer" style={{ color: "#60A5FA", fontWeight: 700, textDecoration: "none" }}>ดูข้อมูลเพิ่มเติม →</a>
            </Card>
            <Card color="#34d399" className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#64748B" }}>Official</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#059669" }}>พร้อมใช้</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#34D399", marginBottom: 12 }}>📚 Claude Prompt Library</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>คลัง Prompt เกรดพรีเมียมจากทีม Anthropic คัดมาให้แล้วสำหรับทุกสายอาชีพ นำไปใช้ต่อได้เลย</p>
              <a href="https://docs.anthropic.com/claude/prompt-library" target="_blank" rel="noopener noreferrer" style={{ color: "#34D399", fontWeight: 700, textDecoration: "none" }}>ดูข้อมูลเพิ่มเติม →</a>
            </Card>
            <Card color="#f59e0b" className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#64748B" }}>GitHub</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#EA580C" }}>🌟 7k+</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#F59E0B", marginBottom: 12 }}>🍳 Anthropic Cookbook</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>Official recipes และโค้ดตัวอย่างขั้นสูงบน GitHub สำหรับการดึงพลังสูงสุดของ Claude ไปสร้างแอปจริง</p>
              <a href="https://github.com/anthropics/anthropic-cookbook" target="_blank" rel="noopener noreferrer" style={{ color: "#F59E0B", fontWeight: 700, textDecoration: "none" }}>ดูข้อมูลเพิ่มเติม →</a>
            </Card>
            <Card color="#ec4899" className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#64748B" }}>Core Tech</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#BE185D" }}>🌟 4k+</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#EC4899", marginBottom: 12 }}>🔌 Model Context Protocol</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>มาตรฐานใหม่ (MCP) สำหรับสร้าง Connectors ให้ Claude เข้าถึงข้อมูลในเครื่องและ Cloud (Repo หลัก)</p>
              <a href="https://github.com/modelcontextprotocol/specification" target="_blank" rel="noopener noreferrer" style={{ color: "#EC4899", fontWeight: 700, textDecoration: "none" }}>ดูข้อมูลเพิ่มเติม →</a>
            </Card>
            <Card color="#8b5cf6" className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#64748B" }}>Community</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#7C3AED" }}>🌟 3.5k+</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#8B5CF6", marginBottom: 12 }}>🌐 awesome-mcp-servers</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>รวม MCP Servers (Connectors) พร้อมใช้กว่า 100+ ตัวสำหรับเชื่อมต่อ Database, Tools, และ APIs ภายนอก</p>
              <a href="https://github.com/modelcontextprotocol/awesome-mcp-servers" target="_blank" rel="noopener noreferrer" style={{ color: "#8B5CF6", fontWeight: 700, textDecoration: "none" }}>ดูข้อมูลเพิ่มเติม →</a>
            </Card>
            <Card color="#06b6d4" className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#64748B" }}>Community</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#0891B2" }}>🌟 13k+</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#06B6D4", marginBottom: 12 }}>💻 awesome-claude-code</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>รวม Prompts เด็ด และ Skills พร้อมใช้สำหรับ Claude Desktop/Code อัปเดตสม่ำเสมอจากคอมมูนิตี้</p>
              <a href="https://github.com/hesreallyhim/awesome-claude-code" target="_blank" rel="noopener noreferrer" style={{ color: "#06B6D4", fontWeight: 700, textDecoration: "none" }}>ดูข้อมูลเพิ่มเติม →</a>
            </Card>
            <Card color="#10b981" className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#64748B" }}>Official</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#047857" }}>Code</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#10B981", marginBottom: 12 }}>💻 Claude Code Docs</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>คู่มือการใช้งาน Claude Code แบบละเอียดสำหรับนักพัฒนา</p>
              <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener noreferrer" style={{ color: "#10B981", fontWeight: 700, textDecoration: "none" }}>ดูข้อมูลเพิ่มเติม →</a>
            </Card>
            <Card color="#f97316" className="hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#64748B" }}>GitHub</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#EA580C" }}>Official</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#F97316", marginBottom: 12 }}>🔌 Knowledge Work Plugins</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>Plugins สำเร็จรูปจาก Anthropic สำหรับงาน Knowledge Work</p>
              <a href="https://github.com/anthropics/knowledge-work-plugins" target="_blank" rel="noopener noreferrer" style={{ color: "#F97316", fontWeight: 700, textDecoration: "none" }}>ดูข้อมูลเพิ่มเติม →</a>
            </Card>
          </div>
          </div>
        </section>

        {/* RUBEN GUIDE */}
        <section id="ruben-guide" style={{ paddingTop: 80, paddingBottom: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Tag color="#60a5fa">📖 30 นาทีแรก</Tag>
            <h2 className="section-title">เริ่มต้นใช้งาน Cowork ใน 30 นาที</h2>
          </div>
          <div className="grid-auto-fit">
            {[
              { time: "0–5 นาที", title: "ติดตั้ง & เปิด", color: "#a78bfa" },
              { time: "5–10 นาที", title: "สร้าง Context Folder", color: "#60a5fa" },
              { time: "10–15 นาที", title: "Session แรก & ถามคำถาม", color: "#34d399" },
              { time: "15–20 นาที", title: "ติดตั้ง Plugin พื้นฐาน", color: "#f59e0b" },
              { time: "20–30 นาที", title: "เริ่มรันงานจริง!", color: "#ec4899" },
            ].map((phase, i) => (
              <Card key={i} color={phase.color} className="hover-lift">
                <div style={{ background: `${phase.color}15`, color: phase.color, padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 800, display: "inline-block", marginBottom: 12 }}>⏱ {phase.time}</div>
                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#1E293B" }}>{phase.title}</h3>
              </Card>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ marginTop: 80, textAlign: "center", padding: "60px 20px", background: "linear-gradient(135deg, #F8FAFC, #F1F5F9)", borderRadius: 24, border: "1px solid var(--border-color)" }}>
          <h2 className="section-title text-gradient" style={{ marginBottom: 16 }}>พร้อมให้ AI ช่วยทำงานหรือยังคะ?</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.8 }}>
            Geni แนะนำให้เลือก 1 Workflow ที่ทำบ่อยที่สุดในสัปดาห์นี้ แล้วลองให้ Claude ช่วยจัดการดูค่ะ
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="premium-btn" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              กลับขึ้นด้านบน ⬆️
            </button>
          </div>
          
          {/* Credit & Contact */}
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8 }}>
            <p>รวบรวมโดย <strong style={{ color: "var(--text-dark)" }}>modty.ai (ศศิวรรณ จันทร์แดง)</strong></p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px 24px", marginTop: 8, fontSize: 13 }}>
              <span>🟢 <strong style={{ color: "var(--text-dark)" }}>LINE ID:</strong> 237dhtqp</span>
              <span>📱 <strong style={{ color: "var(--text-dark)" }}>TIKTOK/FACEBOOK/IG:</strong> modty.ai</span>
              <span>🌐 <strong style={{ color: "var(--text-dark)" }}>Website:</strong> <a href="https://modgoscale.framer.ai/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 700 }}>https://modgoscale.framer.ai/</a></span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
