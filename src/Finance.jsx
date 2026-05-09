import { useState, useEffect } from 'react'
import './Finance.css'

/* ── DATA ─────────────────────────────────────────────── */

const AGENTS = {
  pitch: {
    name: 'Pitch Agent',
    emoji: '🎯',
    colorKey: 'teal',
    cat: 'research',
    badge: 'วิจัย & ลูกค้า',
    desc: 'สร้าง deck นำเสนอลูกค้าครบวงจร — ใส่รายชื่อบริษัทเป้าหมาย ได้ทั้ง Excel ตัวเลข + สไลด์ PowerPoint + ร่างอีเมล',
    flow: ['รายชื่อเป้าหมาย', 'ดึงข้อมูล', 'คำนวณตัวเลข', 'ได้ไฟล์ครบ'],
    tags: ['IB / M&A', 'Excel', 'PowerPoint'],
    skills: ['comps-analysis', 'dcf-model', 'lbo-model', 'deck-refresh', 'pptx-author'],
    connectors: ['FactSet', 'Bloomberg', 'Morningstar'],
    outputs: ['ตาราง Comps (Excel)', 'สไลด์ Pitch Deck (PowerPoint)', 'ร่างอีเมลส่งลูกค้า'],
  },
  meetingprep: {
    name: 'Meeting Prep Agent',
    emoji: '📋',
    colorKey: 'teal',
    cat: 'research',
    badge: 'วิจัย & ลูกค้า',
    desc: 'เตรียมข้อมูลก่อนนั่งประชุมกับลูกค้าหรือคู่ค้า — รวมข่าว ตัวเลขการเงิน ประวัติที่ผ่านมา และประเด็นที่ควรหยิบขึ้นมาพูด ไว้ในเอกสารเดียว',
    flow: ['ชื่อลูกค้า', 'ข่าว + ตัวเลข', 'สังเคราะห์', 'เอกสารสรุป'],
    tags: ['ที่ปรึกษา', 'Word', 'สั่งได้ทุกที่'],
    skills: ['client-review', 'meeting-prep-agent', 'financial-plan'],
    connectors: ['CRM', 'FactSet', 'Bloomberg'],
    outputs: ['Meeting Brief (Word)', 'ประเด็นที่ควรพูด', 'สรุปพอร์ตโฟลิโอลูกค้า'],
  },
  earnings: {
    name: 'Earnings Reviewer',
    emoji: '📊',
    colorKey: 'blue',
    cat: 'research',
    badge: 'วิจัย & ลูกค้า',
    desc: 'อ่านผลประกอบการและงบการเงิน → อัปเดตโมเดลตัวเลข → ชี้ประเด็นที่เปลี่ยนแปลงจากที่คาด → ร่างบทวิเคราะห์สำหรับนักลงทุน',
    flow: ['ผลประกอบการ', 'อัปเดตโมเดล', 'ร่างบทวิเคราะห์'],
    tags: ['วิเคราะห์หุ้น', 'ผลประกอบการ', 'Excel'],
    skills: ['earnings-reviewer', '3-statement-model', 'comps-analysis'],
    connectors: ['FactSet', 'Bloomberg', 'SEC EDGAR'],
    outputs: ['Excel โมเดลอัปเดต', 'บทวิเคราะห์ดราฟต์', 'Flash Note สำหรับลูกค้า'],
  },
  modelbuilder: {
    name: 'Model Builder',
    emoji: '⚙️',
    colorKey: 'blue',
    cat: 'research',
    badge: 'วิจัย & ลูกค้า',
    desc: 'สร้างและดูแลโมเดลการเงินใน Excel — DCF, LBO, งบการเงิน 3 ตัว หรือตารางเปรียบเทียบบริษัท พร้อมสูตรจริงและสีตามมาตรฐานสายงาน',
    flow: ['งบการเงิน', 'สร้างโมเดล', 'ทดสอบสถานการณ์', 'ไฟล์ Excel'],
    tags: ['DCF', 'LBO', '3-Statement'],
    skills: ['dcf-model', 'lbo-model', '3-statement-model', 'comps-analysis', 'xlsx-author'],
    connectors: ['FactSet', 'Bloomberg', 'Morningstar'],
    outputs: ['DCF Model (Excel)', 'LBO Model (Excel)', '3-Statement Model (Excel)', 'Sensitivity Tables'],
  },
  marketresearcher: {
    name: 'Market Researcher',
    emoji: '🔍',
    colorKey: 'purple',
    cat: 'research',
    badge: 'วิจัย & ลูกค้า',
    desc: 'ติดตามภาพรวมอุตสาหกรรม รวบรวมข่าว รายงาน และความเห็นนักวิเคราะห์ พร้อม flag ประเด็นที่กระทบสินเชื่อหรือความเสี่ยง',
    flow: ['ระบุอุตสาหกรรม', 'รวบรวมข้อมูล', 'ภาพรวม'],
    tags: ['สินเชื่อ', 'ความเสี่ยง', 'อุตสาหกรรม'],
    skills: ['competitive-analysis', 'market-researcher', 'content-brief'],
    connectors: ['Bloomberg', 'Morningstar', 'Web Search'],
    outputs: ['Sector Overview Report', 'Analyst Consensus Summary', 'Risk Flag List'],
  },
  valuation: {
    name: 'Valuation Reviewer',
    emoji: '🏷️',
    colorKey: 'amber',
    cat: 'ops',
    badge: 'บัญชี & ปฏิบัติการ',
    desc: 'รับข้อมูลมูลค่าจาก GP → รัน template → เทียบกับบริษัทใกล้เคียงในตลาด → ตรวจวิธีคำนวณ → เตรียมรายงานให้ LP',
    flow: ['ข้อมูล GP', 'ประเมินมูลค่า', 'รายงาน LP'],
    tags: ['กองทุน PE', 'รายงาน LP', 'มูลค่า'],
    skills: ['comps-analysis', 'dcf-model', 'audit-xls', 'client-report'],
    connectors: ['FactSet', 'Morningstar', 'Bloomberg'],
    outputs: ['Valuation Report (PDF)', 'Comps Benchmarking Table', 'LP Summary'],
  },
  gl: {
    name: 'GL Reconciler',
    emoji: '🔄',
    colorKey: 'coral',
    cat: 'ops',
    badge: 'บัญชี & ปฏิบัติการ',
    desc: 'ตรวจสอบความถูกต้องของบัญชีแยกประเภท คำนวณ NAV หาจุดที่ตัวเลขไม่ตรงกัน ค้นหาสาเหตุ แล้วส่งให้ผู้รับผิดชอบอนุมัติ',
    flow: ['บัญชีแยกประเภท', 'หาตัวเลขที่ขัดกัน', 'ค้นสาเหตุ', 'ส่งอนุมัติ'],
    tags: ['บัญชี GL', 'NAV', 'กองทุน'],
    skills: ['reconciliation', 'journal-entry', 'audit-xls'],
    connectors: ['Fund Accounting System', 'Custodian Data', 'Bloomberg'],
    outputs: ['Reconciliation Report', 'Break List + Root Cause', 'NAV Calculation Sheet'],
  },
  monthend: {
    name: 'Month-End Closer',
    emoji: '📅',
    colorKey: 'coral',
    cat: 'ops',
    badge: 'บัญชี & ปฏิบัติการ',
    desc: 'รัน checklist ปิดบัญชี สร้างรายการบันทึกบัญชี ทำ roll-forward บัญชีสำคัญ เขียนอธิบายความเบี่ยงเบนจากเป้า และสรุปรายงานปิดประจำเดือน',
    flow: ['Checklist ปิดบัญชี', 'บันทึกบัญชี', 'รายงานปิดเดือน'],
    tags: ['ปิดงบ', 'Accrual', 'Variance'],
    skills: ['close-management', 'journal-entry', 'variance-analysis', 'financial-statements'],
    connectors: ['ERP / GL System', 'Budget System'],
    outputs: ['Month-End Checklist', 'Journal Entries (Excel)', 'Variance Commentary', 'Close Report'],
  },
  auditor: {
    name: 'Statement Auditor',
    emoji: '🔎',
    colorKey: 'green',
    cat: 'ops',
    badge: 'บัญชี & ปฏิบัติการ',
    desc: 'ตรวจงบการเงินสำหรับ LP ก่อนส่ง — ตรวจตัวเลขสอดคล้องกัน ครบทุก disclosure ถูกต้องตามมาตรฐาน ก่อนอนุมัติส่ง',
    flow: ['งบ LP', 'ตรวจสอบ', 'อนุมัติส่ง'],
    tags: ['กองทุน', 'Audit', 'Compliance'],
    skills: ['audit-xls', 'audit-support', 'financial-statements'],
    connectors: ['Fund Accounting System', 'Compliance Database'],
    outputs: ['Audit Findings Report', 'Disclosure Checklist', 'Reviewed Financial Statements'],
  },
  kyc: {
    name: 'KYC Screener',
    emoji: '🛡️',
    colorKey: 'amber',
    cat: 'ops',
    badge: 'บัญชี & ปฏิบัติการ',
    desc: 'อ่านเอกสารเปิดบัญชีลูกค้า รัน rule engine ตรวจสอบ flag ข้อมูลที่ขาดหรือน่าสงสัย แพ็กเกจส่งให้ Compliance พิจารณาต่อ',
    flow: ['เอกสารลูกค้า', 'ตรวจตาม rule', 'ส่ง Compliance'],
    tags: ['KYC / AML', 'Compliance', 'เปิดบัญชี'],
    skills: ['sox-testing', 'audit-support'],
    connectors: ['Sanctions Database', 'PEP List', 'Adverse News Feed'],
    outputs: ['KYC Risk Rating', 'Missing Document List', 'Compliance Package (PDF)'],
  },
}

const USECASES = {
  ibpitch: {
    emoji: '🏦',
    colorKey: 'teal',
    title: 'IB: ทำ deck ส่งลูกค้าใน 2 ชั่วโมง',
    context: 'Investment Banking',
    desc: 'Analyst ถูกเรียกกะทันหันต้องมี deck นำเสนอก่อนตี 8 พรุ่งนี้ — Pitch Agent จัดการตัวเลข comps และสร้างสไลด์ให้เสร็จใน 2 ชั่วโมง',
    time: '⏱ 2 ชั่วโมง (ปกติ 6 ชั่วโมง)',
    agent: 'Pitch Agent',
    detail: 'Senior Associate โทรมาตอน 4 โมงเย็น ต้องการ deck M&A สำหรับ meeting เช้าวันพรุ่งนี้ Analyst พิมพ์รายชื่อเป้าหมาย 5 บริษัท — Pitch Agent ดึงตัวเลขจาก FactSet รัน comps สร้าง football field valuation และแปลงผลลัพธ์เป็นสไลด์ PowerPoint พร้อม talking points ภายใน 2 ชั่วโมง',
  },
  pesourcing: {
    emoji: '🎯',
    colorKey: 'coral',
    title: 'PE: คัดกรอง 100 deal ในวันเดียว',
    context: 'Private Equity',
    desc: 'Broker ส่ง CIM มา 100 เล่มในคราวเดียว ทีมต้องหา deal ที่น่าสนใจก่อนสิ้นสัปดาห์ — Agents อ่านและ flag ให้เสร็จข้ามคืน',
    time: '⏱ 4 ชั่วโมง (ปกติ 2 วัน)',
    agent: 'KYC + Sourcing Agents',
    detail: 'Investment Manager ได้รับ CIM จาก M&A advisor 100 ฉบับ ต้องคัดเหลือ 10 อันที่น่าสนใจก่อน Friday call Agent อ่าน CIM แต่ละฉบับ สรุป EV/EBITDA entry multiple, revenue growth, EBITDA margin และ fit กับ thesis ของกองทุน จัดทำตาราง ranking และ one-pager สำหรับแต่ละ deal ที่ผ่านเกณฑ์',
  },
  earncase: {
    emoji: '📈',
    colorKey: 'blue',
    title: 'Research: วิเคราะห์ผลทันหลัง market ปิด',
    context: 'Equity Research',
    desc: 'Apple ประกาศผลประกอบการหลัง 4 โมงเย็น — นักวิเคราะห์ต้องส่งบทวิเคราะห์ให้ลูกค้าก่อนตลาดเปิดวันถัดไป Earnings Reviewer ร่างให้เสร็จใน 90 นาที',
    time: '⏱ 90 นาที (ปกติทั้งคืน)',
    agent: 'Earnings Reviewer',
    detail: 'Apple ประกาศ Q4 ตัวเลข beat EPS แต่ iPhone revenue miss Earnings Reviewer อ่าน press release และ 10-Q อัปเดตโมเดลตัวเลขอัตโนมัติ ชี้จุดที่ต่างจาก consensus ร่าง flash note 2 หน้าพร้อม key takeaways และ updated price target ให้ Analyst ตรวจและส่งก่อน 7 โมงเช้า',
  },
  monthendcase: {
    emoji: '📅',
    colorKey: 'purple',
    title: 'Fund Admin: ปิดบัญชีสิ้นเดือนใน 2 วัน',
    context: 'Fund Administration',
    desc: 'งานปิดบัญชี คำนวณ NAV และจัดทำรายงาน LP ที่ปกติใช้เวลา 5 วัน ลดเหลือ 2 วัน เพราะ GL Reconciler และ Month-End Closer ทำงานพร้อมกัน',
    time: '⏱ 2 วัน (ปกติ 5 วัน)',
    agent: 'Month-End Closer + GL Reconciler',
    detail: 'Fund admin ดูแลกองทุน PE 3 กองทุน ต้องปิดบัญชีวันที่ 5 ของทุกเดือน GL Reconciler รัน reconcile กับ custodian data คู่ขนานกับ Month-End Closer ที่รัน checklist และสร้าง journal entry ผลลัพธ์ทั้งสองชุดถูกตรวจสอบโดย Statement Auditor ก่อนส่งรายงานให้ LP',
  },
  wealthmgr: {
    emoji: '👔',
    colorKey: 'green',
    title: 'Wealth: เตรียมข้อมูลลูกค้า 30 คนข้ามคืน',
    context: 'Wealth Management',
    desc: 'ที่ปรึกษาการเงินมีนัดคุยกับลูกค้า 30 คนตลอดสัปดาห์ — Meeting Prep Agent เตรียม brief ส่วนตัวสำหรับแต่ละคนพร้อมในเช้าวันอังคาร',
    time: '⏱ 4 ชั่วโมง (ปกติ 1-2 วัน)',
    agent: 'Meeting Prep Agent',
    detail: 'Financial Advisor มีนัด review รายไตรมาสกับลูกค้า HNW 30 คนใน 5 วัน Meeting Prep Agent ดึงข้อมูลพอร์ตจาก CRM ดูข่าวที่เกี่ยวข้องกับการถือครองของแต่ละคน สรุปผลการลงทุนและ market context ไว้ใน brief 1 หน้าต่อลูกค้า Advisor ตื่นเช้ามาได้ brief 30 ชุดพร้อมใช้',
  },
  compliance: {
    emoji: '🛡️',
    colorKey: 'amber',
    title: 'Compliance: ตรวจ KYC ลูกค้า 500 ราย',
    context: 'Operations & Compliance',
    desc: 'ธนาคารต้องรีวิว KYC ลูกค้าทั้งหมดสำหรับการตรวจสอบประจำปี — KYC Screener คัดกรองและจัดระดับความเสี่ยง 500 ไฟล์เสร็จใน 2 วัน',
    time: '⏱ 2 วัน (ปกติ 3 สัปดาห์)',
    agent: 'KYC Screener',
    detail: 'ธนาคารเอกชนต้องทำ periodic KYC review ลูกค้า 500 ราย ตาม AML regulation KYC Screener อ่านเอกสาร ตรวจ sanctions list และ adverse news ประเมินระดับความเสี่ยง Low/Medium/High และสร้าง compliance package สำหรับแต่ละราย ลูกค้าที่ต้องการ EDD ถูก escalate ให้ Senior Compliance Officer โดยอัตโนมัติ',
  },
}

const GLOSSARY = [
  { term: 'Comps (Comparable Companies)', def: 'การหาบริษัทที่ธุรกิจคล้ายกัน แล้วนำตัวเลขของพวกเขามาเทียบ เพื่อประมาณมูลค่าของบริษัทที่เราสนใจ', ex: 'จะขาย Starbucks ก็ดู Costa, Peet\'s, Blue Bottle — ร้านกาแฟระดับนี้เขาซื้อขายกันที่กี่เท่าของกำไร เอาค่ากลางนั้นมาคูณ' },
  { term: 'DCF (Discounted Cash Flow)', def: 'วิธีประมาณมูลค่าบริษัทโดยคาดกระแสเงินสดในอนาคต 5–10 ปี แล้วแปลงกลับมาเป็นมูลค่า ณ วันนี้ เพราะเงินในอนาคตมีค่าน้อยกว่าเงินในมือ', ex: 'บริษัทคาดว่าปีหน้าได้กำไร 100 ล้าน ปีถัดไป 120 ล้าน ... เราต้องนำมา "หักส่วนลด" ก่อนบวกรวม ถ้า WACC 10% เงิน 100 ล้านปีหน้า = 90.9 ล้านในวันนี้' },
  { term: 'LBO (Leveraged Buyout)', def: 'การซื้อกิจการโดยใช้เงินกู้เป็นส่วนใหญ่ แล้วให้ตัวบริษัทที่ซื้อมาหาเงินมาใช้หนี้เองจากการดำเนินธุรกิจ', ex: 'PE firm ออกเงินเอง 200 ล้าน กู้เพิ่ม 800 ล้าน ซื้อบริษัท XYZ 1,000 ล้าน จากนั้นใช้กำไรของ XYZ ค่อยๆ ตัดหนี้ พอขายออกในปีที่ 5 ผลตอบแทนจะสูงมากถ้าบริษัทโตดี' },
  { term: 'MCP (Model Context Protocol)', def: 'มาตรฐานการเชื่อมต่อที่ให้ Claude ดึงข้อมูลจากแหล่งภายนอกโดยตรง เช่น Bloomberg หรือ FactSet โดยไม่ต้องให้คนพิมพ์ตัวเลขเข้า', ex: 'แทนที่จะต้องเปิด Bloomberg ดูราคา Apple แล้วพิมพ์เข้า Claude ด้วยมือ — MCP ให้ Claude ดึงตัวเลขนั้นเองโดยอัตโนมัติ' },
  { term: 'Orchestrator', def: 'Claude ตัวหลักที่ทำหน้าที่ควบคุมและมอบงานให้ AI ผู้ช่วยตัวอื่นๆ คล้ายกับ Project Manager ของทีม', ex: 'Pitch Agent (orchestrator) สั่ง: "ผู้ช่วยคัดเลือก comps", "ผู้ช่วยคำนวณ LBO", "ผู้ช่วยตรวจสอบสมมติฐาน" — ทำงานพร้อมกัน' },
  { term: 'Subagent (AI ผู้ช่วยเฉพาะทาง)', def: 'Claude อีกตัวที่ถูกเรียกให้ทำงานเฉพาะจุด เช่น คัดเลือก comps หรือตรวจวิธีคำนวณ — แต่ละตัวมีความเชี่ยวชาญของตัวเอง', ex: 'Comps subagent ถูก train ให้รู้ว่า "บริษัท semiconductor ไม่ควรเทียบกับ software" ทำงานนี้อย่างเดียวและทำได้แม่นกว่า' },
  { term: 'Skill (ชุดทักษะ)', def: 'ไฟล์คำแนะนำที่บอก Claude ว่า "งานประเภทนี้ทำอย่างไรถึงจะถูกต้องตามมาตรฐานสายงาน" — Claude ดึงมาใช้อัตโนมัติ', ex: 'Skill "comps-analysis" บอกว่า "เลือกบริษัทที่ revenue ต่างกันไม่เกิน 50–200% growth ใกล้กัน และอยู่ใน sub-sector เดียวกัน"' },
  { term: '3-Statement Model (งบการเงิน 3 ตัว)', def: 'โมเดล Excel ที่รวมงบทั้ง 3 ไว้ด้วยกันและเชื่อมโยงกันอัตโนมัติ — งบกำไรขาดทุน งบดุล และงบกระแสเงินสด', ex: 'กำไรในงบกำไรขาดทุน → ไหลไปเพิ่มกำไรสะสมในงบดุล → กระทบเงินสดในงบกระแสเงินสด — เปลี่ยนตัวเลขที่ไหน อีก 2 งบปรับตามอัตโนมัติ' },
  { term: 'Pitch Deck', def: 'สไลด์ PowerPoint ที่ทำขึ้นเพื่อนำเสนอข้อเสนอ M&A หรือการลงทุนให้ลูกค้าหรือผู้บริหาร', ex: 'ประกอบด้วย: ภาพรวมธุรกรรม → ภาพรวมบริษัทเป้าหมาย → ตัวเลขเปรียบเทียบ (comps) → มูลค่าที่ประเมินได้ → เหตุผลที่ควรทำ deal' },
  { term: 'Due Diligence (DD)', def: 'กระบวนการตรวจสอบบริษัทอย่างละเอียดก่อนตัดสินใจซื้อหรือลงทุน — ทั้งการเงิน กฎหมาย ปฏิบัติการ และเชิงพาณิชย์', ex: 'ตรวจงบการเงิน 5 ปีย้อนหลัง → อ่านสัญญาลูกค้าทุกฉบับ → ตรวจหนี้ที่ซ่อนอยู่ → สัมภาษณ์ผู้บริหาร → ตรวจ IP และสิทธิบัตร' },
  { term: 'IC Memo (Investment Committee)', def: 'เอกสารสรุปที่จัดทำเพื่อนำเสนอต่อคณะกรรมการลงทุน ให้โหวตว่า "อนุมัติ" หรือ "ไม่อนุมัติ" การลงทุนนั้น', ex: 'IC Memo ระบุ: ลงทุน 500 ล้านบาทใน XYZ เพราะ market position แข็งแกร่ง margin ขยาย คาดผลตอบแทน IRR 25% ใน 5 ปี ความเสี่ยงหลักคือ...' },
  { term: 'KYC (Know Your Customer)', def: 'กระบวนการที่สถาบันการเงินต้องทำเพื่อยืนยันตัวตนและประเมินความเสี่ยงของลูกค้าก่อนให้บริการ ตามกฎหมายป้องกันฟอกเงิน', ex: 'ตรวจบัตรประชาชน → ยืนยันที่อยู่ → ถามที่มาของเงิน → ตรวจรายชื่อ sanctions list → ดูข่าวด้านลบ → ประเมินระดับความเสี่ยง' },
  { term: 'NAV (Net Asset Value)', def: 'มูลค่าสินทรัพย์สุทธิของกองทุน คำนวณจาก สินทรัพย์รวม ลบ หนี้สินรวม เป็นตัวเลขที่บอกว่านักลงทุนถือหน่วยลงทุนมูลค่าเท่าไหร่', ex: 'กองทุน PE มีพอร์ต 1,000 ล้าน หนี้ 100 ล้าน NAV = 900 ล้าน มีนักลงทุน 10 คน ลงทุนเท่ากัน แต่ละคนถือ "หน่วย" มูลค่า 90 ล้าน' },
  { term: 'Valuation (การประเมินมูลค่า)', def: 'กระบวนการหาว่าบริษัทหรือสินทรัพย์มีมูลค่าเท่าไหร่ โดยใช้หลายวิธีแล้วนำมาสรุป ไม่มีคำตอบเดียวที่ถูกต้อง', ex: 'วิธี comps บอก 150 ล้าน, วิธี DCF บอก 130 ล้าน, วิธี precedent บอก 160 ล้าน — นักวิเคราะห์สรุปว่า "fair value อยู่ที่ 140–150 ล้าน"' },
  { term: 'Precedent Transaction', def: 'การซื้อขายบริษัทที่เกิดขึ้นจริงในอดีต ใช้เป็นข้อมูลอ้างอิงว่าตลาดยอมจ่ายเท่าไหร่สำหรับธุรกิจแบบนี้', ex: '3 ปีที่ผ่านมา มีการซื้อขายร้านกาแฟ 5 ดีล ที่ EV/EBITDA เฉลี่ย 12x เพราะฉะนั้น deal ของเราน่าจะอยู่ใกล้ตัวเลขนั้น' },
  { term: 'WACC', def: 'ต้นทุนเงินทุนเฉลี่ยของบริษัท คือดอกเบี้ยและผลตอบแทนที่บริษัทต้องจ่ายให้เจ้าหนี้และผู้ถือหุ้นรวมกัน ใช้เป็นอัตราคิดลดใน DCF', ex: 'บริษัทมีหนี้ 40% ดอกเบี้ย 6% และหุ้น 60% ผู้ถือหุ้นต้องการผลตอบแทน 12% → WACC = (40%×6%) + (60%×12%) = 9.6%' },
  { term: 'Sensitivity Analysis', def: 'การทดสอบโมเดลว่าถ้าสมมติฐานเปลี่ยนไป ผลลัพธ์จะเปลี่ยนแค่ไหน ช่วยให้เห็นว่ามูลค่าขึ้นอยู่กับตัวแปรไหนมากที่สุด', ex: 'ตาราง 2 มิติ: แนวนอนเป็น WACC (8%–12%) แนวตั้งเป็น revenue growth (3%–9%) — แต่ละช่องบอกมูลค่าที่ได้' },
  { term: 'GP / LP', def: 'GP (General Partner) คือบริษัท PE ที่บริหารกองทุนและตัดสินใจลงทุน — LP (Limited Partner) คือนักลงทุนที่ให้เงินแต่ไม่ได้บริหาร', ex: 'Carlyle Group คือ GP บริหารกองทุน 10,000 ล้าน — CalPERS ลงเงิน 1,000 ล้านเป็น LP รับผลตอบแทนแต่ไม่ต้องมาทำงาน' },
]

const COMMANDS = [
  { slash: '/dcf-model', stock: 'TSLA', prompt: 'ดึงข้อมูลผลประกอบการ Q3 ล่าสุดของ Tesla (TSLA) มาสร้างโมเดลประเมินมูลค่าหุ้นด้วยวิธีคิดลดกระแสเงินสด (DCF) ขอ Terminal Multiple อิงจากตลาดปัจจุบัน', icon: '⚡', result: 'ได้ไฟล์ Excel โมเดล DCF ของ Tesla ครบทุกชีต พร้อมตาราง Sensitivity Analysis อัตโนมัติ (WACC vs Growth Rate)' },
  { slash: '/comps-analysis', stock: 'NVDA', prompt: 'เปรียบเทียบ Nvidia (NVDA) กับคู่แข่งหลักอย่าง AMD และ Intel โฟกัสที่อัตรากำไรขั้นต้น (Gross Margin) และ P/E Ratio ล่วงหน้า 12 เดือน', icon: '📊', result: 'ได้ตาราง Excel สรุปค่า Median ของกลุ่มชิป เทียบให้เห็นชัดเจนว่า NVDA เทรดอยู่ที่ระดับพรีเมียมเท่าไหร่' },
  { slash: '/deck-refresh', stock: 'AAPL', prompt: 'นำไฟล์ Presentation (PPTX) ของ Apple (AAPL) ที่เคยทำไว้เมื่อไตรมาสก่อน มาอัปเดตตัวเลขยอดขาย iPhone ใหม่จากงบ Q4 ที่เพิ่งประกาศเมื่อคืนนี้', icon: '📑', result: 'ไฟล์สไลด์ถูกอัปเดตตัวเลขใหม่ กราฟถูกปรับให้ตรงกับความเป็นจริง พร้อมไฮไลต์จุดที่มีการเปลี่ยนแปลง' },
  { slash: '/3-statement-model', stock: 'MSFT', prompt: 'สร้างงบการเงิน 3 ตัวเชื่อมโยงกันสำหรับ Microsoft (MSFT) โดยให้คาดการณ์ (Project) ล่วงหน้า 5 ปี อิงจากอัตราการเติบโตของแผนก Azure Cloud', icon: '💼', result: 'Excel งบดุล งบกำไรขาดทุน และงบกระแสเงินสด ผูกสูตรกันเรียบร้อย เปลี่ยนค่ายอดขาย Cloud ยอดเงินสดในงบดุลก็เปลี่ยนตาม' },
  { slash: '/competitive-analysis', stock: 'NFLX', prompt: 'สรุปโครงสร้างการแข่งขันของ Netflix (NFLX) เทียบกับ Disney+ และ Amazon Prime เน้นที่ต้นทุนการผลิตคอนเทนต์และฐานสมาชิก (Subscribers)', icon: '⚔️', result: 'สไลด์โครงสร้างตลาด (Market Landscape) สรุปจุดแข็ง จุดอ่อน และปัจจัยความเสี่ยงของแต่ละแพลตฟอร์ม' },
  { slash: '/lbo-model', stock: 'DEAL', prompt: 'จำลองการซื้อกิจการแบบ Leveraged Buyout ของบริษัทซอฟต์แวร์ A ด้วยโครงสร้างหนี้ 70% ทุน 30% คำนวณ IRR กรณีขายกิจการในปีที่ 5', icon: '💰', result: 'Excel ไฟล์รันโมเดล LBO สมบูรณ์แบบ บอกตัวเลข IRR ชัดเจน เพื่อให้ทีม Investment Committee นำไปตัดสินใจต่อ' },
]

/* ── HELPERS ─────────────────────────────────────────── */

function colorClass(key) { return `icon-${key}` }
function badgeClass(key) { return `badge-${key}` }

/* ── MODAL CONTENT ───────────────────────────────────── */

function AgentModalContent({ agent }) {
  return (
    <div className="modal-body">
      <p>{agent.desc}</p>
      <p className="modal-section-label">Skills ที่ใช้</p>
      <ul className="modal-list">
        {agent.skills.map(s => <li key={s}>{s}</li>)}
      </ul>
      <p className="modal-section-label">Connectors (MCP)</p>
      <ul className="modal-list">
        {agent.connectors.map(c => <li key={c}>{c}</li>)}
      </ul>
      <p className="modal-section-label">ผลลัพธ์ที่ได้</p>
      <ul className="modal-list">
        {agent.outputs.map(o => <li key={o}>{o}</li>)}
      </ul>
      <p className="modal-section-label">Tags</p>
      <div className="modal-tags">
        {agent.tags.map(t => <span className="modal-tag" key={t}>{t}</span>)}
      </div>
    </div>
  )
}

function UsecaseModalContent({ uc }) {
  return (
    <div className="modal-body">
      <p>{uc.desc}</p>
      <p className="modal-section-label">รายละเอียด</p>
      <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7 }}>{uc.detail}</p>
      <p className="modal-section-label">เวลาที่ใช้</p>
      <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>{uc.time}</p>
      <p className="modal-section-label">Agent ที่ใช้</p>
      <div className="modal-tags">
        <span className="modal-tag">{uc.agent}</span>
      </div>
    </div>
  )
}

/* ── MAIN COMPONENT ──────────────────────────────────── */

export default function Finance() {
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState(null) // { kind: 'agent'|'usecase', id: string }

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  const openAgent = (id) => setModal({ kind: 'agent', id })
  const openUsecase = (id) => setModal({ kind: 'usecase', id })
  const closeModal = () => setModal(null)

  const agentList = Object.entries(AGENTS).filter(([, a]) => filter === 'all' || a.cat === filter)

  const activeAgent = modal?.kind === 'agent' ? AGENTS[modal.id] : null
  const activeUsecase = modal?.kind === 'usecase' ? USECASES[modal.id] : null

  return (
    <div className="finance-page">

      {/* ── NAV ── */}
      <nav className="fn-nav">
        <span className="fn-nav-logo">Claude × Finance</span>
        <div className="fn-nav-links">
          <a href="#how">โครงสร้าง</a>
          <a href="#agents">Agents</a>
          <a href="#usecases">ตัวอย่างจริง</a>
          <a href="#commands">คำสั่งใช้งาน</a>
          <a href="#glossary">คำศัพท์</a>
          <a href="#deploy">การติดตั้ง</a>
          <a href="/" className="fn-nav-back">← Masterclass</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="fn-hero">
        <div className="fn-hero-grid" />
        <div className="fn-hero-glow" />
        <div className="fn-hero-tag">anthropics/financial-services</div>
        <h1>AI ที่เข้าใจงาน<br /><em>สายการเงินจริงๆ</em></h1>
        <p className="fn-hero-sub">
          10 Agent พร้อมใช้ สำหรับงานที่กินเวลามากที่สุดในสายการเงิน — ตั้งแต่ทำ deck pitch บริษัท ไปจนถึงปิดบัญชีสิ้นเดือนและตรวจ KYC
        </p>
        <div className="fn-hero-stats">
          {[['10','Agent'],['9','Plugin ตามสาย'],['11+','แหล่งข้อมูล'],['50+','ชุดทักษะ']].map(([n, l]) => (
            <div className="fn-stat-item" key={l}>
              <span className="fn-stat-num">{n}</span>
              <span className="fn-stat-lbl">{l}</span>
            </div>
          ))}
        </div>
        <div className="fn-hero-btns">
          <a href="#commands" className="btn-primary">ดูตัวอย่างการพิมพ์คำสั่ง (Prompt) →</a>
          <a href="https://github.com/anthropics/financial-services" target="_blank" rel="noreferrer" className="btn-secondary">GitHub ↗</a>
        </div>
      </div>

      <hr className="section-divider" />

      {/* ── HOW ── */}
      <section id="how" className="fn-section">
        <div className="section-tag">โครงสร้างระบบ</div>
        <h2 className="section-title">แต่ละ Agent ประกอบด้วย 3 ชั้น</h2>
        <p className="section-desc">ทุก Agent เป็นแม่แบบสำเร็จรูปที่รวม ชุดทักษะ + ตัวดึงข้อมูล + AI ผู้ช่วย ไว้ด้วยกัน — ทีมงานปรับแต่งวิธีคำนวณ นโยบายความเสี่ยง และขั้นตอนอนุมัติได้เอง</p>
        <div className="how-grid">
          {[
            { n: '01', title: 'ชุดทักษะ (Skill)', desc: 'ไฟล์คำแนะนำที่บรรจุความรู้เฉพาะทาง แนวทางปฏิบัติ และขั้นตอนการทำงาน — Claude ดึงมาใช้อัตโนมัติเมื่อบริบทตรง ไม่ต้อง prompt ซ้ำทุกครั้ง' },
            { n: '02', title: 'ตัวดึงข้อมูล (Connector)', desc: 'ช่องทางเชื่อมต่อ (MCP) ที่เปิดให้ Claude ดึงข้อมูลจริงจาก FactSet, Bloomberg, Morningstar โดยตรง — ข้อมูลสด ไม่ต้องสลับหน้าต่าง ควบคุมสิทธิ์การเข้าถึงได้' },
            { n: '03', title: 'AI ผู้ช่วยเฉพาะทาง (Subagent)', desc: 'Claude อีกตัวที่ถูกเรียกใช้สำหรับงานเฉพาะจุด เช่น คัดเลือกบริษัทเปรียบเทียบ หรือตรวจสอบวิธีคำนวณ — แต่ละตัวมีคำสั่งและเครื่องมือของตัวเอง' },
          ].map(h => (
            <div className="how-item" key={h.n}>
              <div className="how-num">{h.n}</div>
              <div className="how-title">{h.title}</div>
              <div className="how-desc">{h.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── AGENTS ── */}
      <section id="agents" className="fn-section">
        <div className="agents-header">
          <div>
            <div className="section-tag">Agent ทั้งหมด</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>10 Agent สำหรับงานการเงิน</h2>
          </div>
          <div className="filter-tabs">
            {[['all','ทั้งหมด'],['research','วิจัย & ลูกค้า'],['ops','บัญชี & ปฏิบัติการ']].map(([val, label]) => (
              <button
                key={val}
                className={`filter-tab${filter === val ? ' active' : ''}`}
                onClick={() => setFilter(val)}
              >{label}</button>
            ))}
          </div>
        </div>

        <div className="agents-grid">
          {agentList.map(([id, a]) => (
            <div className="agent-card" key={id} onClick={() => openAgent(id)}>
              <div className="agent-card-header">
                <div className={`agent-icon ${colorClass(a.colorKey)}`}>{a.emoji}</div>
                <div>
                  <div className="agent-name">{a.name}</div>
                  <span className={`agent-badge ${badgeClass(a.colorKey)}`}>{a.badge}</span>
                </div>
              </div>
              <div className="agent-desc">{a.desc}</div>
              <div className="agent-flow">
                <div className="flow-label">ขั้นตอน</div>
                <div className="flow-steps">
                  {a.flow.map((step, i) => (
                    <span key={step}>
                      <span className="flow-step">{step}</span>
                      {i < a.flow.length - 1 && <span className="flow-arrow">→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="agent-tags">
                {a.tags.map(t => <span className="agent-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── USE CASES ── */}
      <section id="usecases" className="fn-section">
        <div className="section-tag">สถานการณ์จริง</div>
        <h2 className="section-title">6 เหตุการณ์ที่เกิดจริงในที่ทำงาน</h2>
        <p className="section-desc">ตัวอย่างจากบริษัทหลักทรัพย์ PE firm ธนาคาร และ fund admin ที่นำ Claude Agent มาช่วยงานหนัก ทำเสร็จเร็วขึ้นและผิดพลาดน้อยลง</p>
        <div className="usecase-grid">
          {Object.entries(USECASES).map(([id, uc]) => (
            <div className="usecase-card" key={id} onClick={() => openUsecase(id)}>
              <div className="uc-header">
                <div className={`agent-icon ${colorClass(uc.colorKey)}`}>{uc.emoji}</div>
                <div>
                  <div className="uc-title">{uc.title}</div>
                  <div className="uc-context">{uc.context}</div>
                </div>
              </div>
              <div className="uc-desc">{uc.desc}</div>
              <div className="uc-time">{uc.time}</div>
              <span className="uc-badge">{uc.agent}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── COMMANDS ── */}
      <section id="commands" className="fn-section">
        <div className="section-tag">Prompt & Slash Commands</div>
        <h2 className="section-title">เรียกใช้งานง่ายๆ ผ่านหน้าต่าง Chat</h2>
        <p className="section-desc">
          ตัวอย่างการใช้งาน <strong>Financial Analysis Plugins</strong> ในหน้าต่าง Cowork — กดบวก&nbsp;+ ที่ช่องแชทแล้วเลือก Plugin หรือพิมพ์&nbsp;<code style={{ color:'var(--accent)', background:'rgba(200,169,110,.1)', padding:'1px 6px', borderRadius:4 }}>/</code>&nbsp;แล้วเลือก Skill ที่ต้องการ
        </p>
        <div className="cmd-grid">
          {COMMANDS.map(cmd => (
            <div className="cmd-card" key={cmd.slash}>
              <div className="cmd-header">
                <span className="cmd-slash">{cmd.slash}</span>
                <span className="cmd-stock">{cmd.stock}</span>
              </div>
              <div className="cmd-chat">
                <div className="cmd-prompt">
                  <span>{cmd.slash}</span>&nbsp;{cmd.prompt}
                </div>
              </div>
              <div className="cmd-result-box">
                <div className="cmd-result-icon">{cmd.icon}</div>
                <div className="cmd-result-text"><strong>ผลลัพธ์:</strong> {cmd.result}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── GLOSSARY ── */}
      <section id="glossary" className="fn-section">
        <div className="section-tag">คำศัพท์สายงาน</div>
        <h2 className="section-title">อ่านแล้วเห็นภาพทันที</h2>
        <p className="section-desc">คำศัพท์การเงินและเทคนิคที่ใช้บ่อย อธิบายด้วยภาษาพูดและตัวอย่างเปรียบเทียบที่จับต้องได้</p>
        <div className="glossary-grid">
          {GLOSSARY.map(g => (
            <div className="glossary-card" key={g.term}>
              <div className="term">{g.term}</div>
              <div className="definition">{g.def}</div>
              <div className="example">{g.ex}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── DEPLOY ── */}
      <section id="deploy" className="fn-section">
        <div className="section-tag">การติดตั้ง</div>
        <h2 className="section-title">3 วิธีใช้งาน</h2>
        <p className="section-desc">ชุดทักษะและคำสั่งเดียวกันทุกช่องทาง — เลือกตามรูปแบบการทำงานและโครงสร้าง IT ของบริษัท</p>
        <div className="deploy-grid">
          {[
            {
              num: '1', icon: '💬',
              title: 'Claude Cowork / Code Plugin',
              desc: 'ทำงานคู่กับผู้ใช้บน desktop — สั่งงานด้วยข้อความหรือเสียงจากที่ไหนก็ได้ผ่าน Dispatch ผลลัพธ์รอบนโต๊ะเมื่อกลับมา',
              code: 'Settings → Plugins → Add plugin\nวาง: github.com/anthropics/financial-services',
            },
            {
              num: '2', icon: '⚡',
              title: 'Claude Managed Agents API',
              desc: 'รันแบบอัตโนมัติในเบื้องหลัง ไม่ต้องมีคนดูแลตลอด — มี log ทุกขั้นตอน ตั้งเวลาทำงานได้ จัดการสิทธิ์และ credential ผ่าน Claude Console',
              code: 'scripts/deploy-managed-agent.sh pitch-agent\n# POST /v1/agents → subagents สร้างอัตโนมัติ',
            },
            {
              num: '3', icon: '🖥️',
              title: 'Microsoft 365 Add-in',
              desc: 'Claude ทำงานอยู่ใน Excel, PowerPoint, Word และ Outlook — ข้อมูลส่งต่อระหว่างแอปโดยอัตโนมัติ ไม่ต้องสลับหน้าต่างหรือ copy-paste',
              code: 'claude plugin install claude-for-msft-365-install\n/claude-for-msft-365-install:setup',
            },
          ].map(d => (
            <div className="deploy-card" key={d.num}>
              <div className="deploy-num">{d.num}</div>
              <div className="deploy-icon">{d.icon}</div>
              <div className="deploy-title">{d.title}</div>
              <div className="deploy-desc">{d.desc}</div>
              <div className="deploy-code">{d.code}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── FOOTER ── */}
      <footer className="fn-footer">
        <div>
          <div className="footer-logo">Claude × Finance</div>
          <div className="footer-note">อ้างอิงจาก github.com/anthropics/financial-services และ anthropic.com/news/finance-agents — ประกาศ 5 พฤษภาคม 2569</div>
        </div>
        <div className="footer-links">
          <a href="https://github.com/anthropics/financial-services" target="_blank" rel="noreferrer" className="footer-link">GitHub Repo ↗</a>
          <a href="https://www.anthropic.com/news/finance-agents" target="_blank" rel="noreferrer" className="footer-link">ประกาศทางการ ↗</a>
        </div>
      </footer>

      {/* ── MODAL ── */}
      <div className={`modal-bg${modal ? ' open' : ''}`} onClick={e => e.target === e.currentTarget && closeModal()}>
        <div className="fn-modal">
          <div className="modal-top">
            <div>
              {activeAgent && (
                <>
                  <span className={`agent-badge ${badgeClass(activeAgent.colorKey)}`}>{activeAgent.badge}</span>
                  <div className="modal-title">{activeAgent.emoji} {activeAgent.name}</div>
                  <div className="modal-subtitle">Financial AI Agent</div>
                </>
              )}
              {activeUsecase && (
                <>
                  <span className="uc-badge" style={{ display:'inline-block', marginBottom:8 }}>{activeUsecase.context}</span>
                  <div className="modal-title">{activeUsecase.emoji} {activeUsecase.title}</div>
                  <div className="modal-subtitle" style={{ color:'var(--accent)', fontWeight:500 }}>{activeUsecase.time}</div>
                </>
              )}
            </div>
            <button className="modal-close" onClick={closeModal}>✕</button>
          </div>
          {activeAgent && <AgentModalContent agent={activeAgent} />}
          {activeUsecase && <UsecaseModalContent uc={activeUsecase} />}
        </div>
      </div>

    </div>
  )
}
