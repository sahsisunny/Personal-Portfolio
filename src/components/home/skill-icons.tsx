import * as React from "react";
import {
  Database,
  Server,
  ShieldCheck,
  CreditCard,
  Bot,
  Workflow,
  Sparkles,
  GitBranch,
  RefreshCw,
  FlaskConical,
  Kanban,
  Terminal,
  Code2,
  Atom,
  Boxes,
  Waves,
  Cpu,
  FileCode2,
} from "lucide-react";

export function SkillIcon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const n = name.toLowerCase();

  // Languages
  if (n.includes("typescript")) {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.5 8H6V10H7.7V17H9.8V10H11.5V8Z" fill="white" />
        <path d="M17.8 11.2C17.3 10.4 16.5 10 15.3 10C14.3 10 13.5 10.3 13 10.8C12.5 11.3 12.3 11.9 12.3 12.6C12.3 13.3 12.5 13.9 12.9 14.3C13.4 14.7 14.2 15.1 15.2 15.4C16 15.6 16.5 15.9 16.7 16.2C16.9 16.5 17 16.8 17 17.2C17 17.8 16.8 18.2 16.3 18.6C15.8 19 15.1 19.2 14.2 19.2C13.5 19.2 12.8 19 12.2 18.6C11.6 18.2 11.2 17.6 11 16.8L13 16.1C13.1 16.5 13.3 16.8 13.6 17C13.9 17.2 14.2 17.3 14.6 17.3C15 17.3 15.4 17.2 15.6 17C15.8 16.8 15.9 16.5 15.9 16.2C15.9 15.9 15.8 15.7 15.6 15.5C15.4 15.3 15 15.1 14.4 14.9C13.5 14.6 12.9 14.2 12.5 13.7C12.1 13.2 11.9 12.6 11.9 11.8C11.9 11 12.2 10.3 12.8 9.8C13.4 9.3 14.3 9 15.4 9C16.3 9 17 9.2 17.6 9.6C18.2 10 18.6 10.6 18.8 11.3L17.8 11.2Z" fill="white" />
      </svg>
    );
  }

  if (n.includes("javascript")) {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M7 16.5C7.5 17.3 8.2 17.8 9.3 17.8C10.5 17.8 11.3 17.1 11.3 15.6V9H9.3V15.5C9.3 16.1 9 16.4 8.5 16.4C8 16.4 7.6 16.1 7.4 15.6L7 16.5Z" fill="#1C1917" />
        <path d="M13.2 16.3C13.7 17.2 14.6 17.8 15.9 17.8C17.2 17.8 18.2 17.1 18.2 15.9C18.2 14.7 17.4 14.2 16.2 13.7L15.7 13.5C14.8 13.1 14.3 12.8 14.3 12.2C14.3 11.7 14.7 11.3 15.4 11.3C16 11.3 16.5 11.6 16.8 12.3L18 11.6C17.5 10.5 16.6 9.8 15.4 9.8C14.1 9.8 13.1 10.5 13.1 11.8C13.1 13 13.9 13.6 15 14.1L15.5 14.3C16.5 14.7 17.1 15.1 17.1 15.9C17.1 16.6 16.4 17.1 15.5 17.1C14.5 17.1 13.8 16.5 13.5 15.7L13.2 16.3Z" fill="#1C1917" />
      </svg>
    );
  }

  if (n === "go") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00ADD8" />
        <path d="M5 12C5 9.8 6.8 8 9 8C10.7 8 12.1 9.1 12.7 10.6H10.6C10.2 9.9 9.6 9.5 9 9.5C7.6 9.5 6.5 10.6 6.5 12C6.5 13.4 7.6 14.5 9 14.5C9.8 14.5 10.5 14.1 10.8 13.4H9V12H12.8C12.8 12.3 12.9 12.6 12.9 13C12.9 15.2 11.2 16 9 16C6.8 16 5 14.2 5 12Z" fill="white" />
        <path d="M14 12C14 9.8 15.8 8 18 8C20.2 8 22 9.8 22 12C22 14.2 20.2 16 18 16C15.8 16 14 14.2 14 12ZM15.5 12C15.5 13.4 16.6 14.5 18 14.5C19.4 14.5 20.5 13.4 20.5 12C20.5 10.6 19.4 9.5 18 9.5C16.6 9.5 15.5 10.6 15.5 12Z" fill="white" />
      </svg>
    );
  }

  if (n.includes("html") || n.includes("css")) {
    return <FileCode2 className={`${className} text-orange-500`} />;
  }

  if (n === "sql") {
    return <Database className={`${className} text-blue-500`} />;
  }

  // Frontend
  if (n === "react") {
    return <Atom className={`${className} text-cyan-400 animate-spin-slow`} />;
  }

  if (n === "next.js" || n.includes("next")) {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.87 14.577l-4.908-6.386v6.386H9.5V7.423h1.462l5.008 6.515V7.423h1.462v9.154h-1.562z" />
      </svg>
    );
  }

  if (n.includes("ant design")) {
    return <Boxes className={`${className} text-red-500`} />;
  }

  if (n.includes("tailwind")) {
    return <Waves className={`${className} text-teal-400`} />;
  }

  if (n.includes("react query")) {
    return <RefreshCw className={`${className} text-rose-500`} />;
  }

  // Backend
  if (n.includes("go services") || n.includes("rest")) {
    return <Server className={`${className} text-cyan-500`} />;
  }

  if (n.includes("node") || n.includes("express")) {
    return <Code2 className={`${className} text-emerald-500`} />;
  }

  if (n.includes("payment")) {
    return <CreditCard className={`${className} text-indigo-500`} />;
  }

  if (n.includes("access control") || n.includes("role-based")) {
    return <ShieldCheck className={`${className} text-emerald-600`} />;
  }

  // Databases
  if (n.includes("postgres")) {
    return <Database className={`${className} text-blue-600`} />;
  }

  if (n.includes("mysql")) {
    return <Database className={`${className} text-amber-600`} />;
  }

  if (n.includes("mongo")) {
    return <Database className={`${className} text-emerald-500`} />;
  }

  // AI & Agents
  if (n.includes("llm") || n.includes("agent backends")) {
    return <Bot className={`${className} text-accent`} />;
  }

  if (n.includes("orchestration")) {
    return <Workflow className={`${className} text-purple-500`} />;
  }

  if (n === "claude") {
    return (
      <svg aria-hidden="true" className={`${className} text-amber-600`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    );
  }

  if (n === "cursor") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="3 3 10 21 14 13 22 10 3 3" fill="currentColor" />
      </svg>
    );
  }

  if (n === "antigravity") {
    return <Sparkles className={`${className} text-accent`} />;
  }

  // Tools & Workflow
  if (n.includes("git,") || n.includes("github") || n.includes("gitlab")) {
    return <GitBranch className={`${className} text-orange-500`} />;
  }

  if (n.includes("ci/cd")) {
    return <RefreshCw className={`${className} text-amber-500`} />;
  }

  if (n.includes("vitest") || n.includes("test")) {
    return <FlaskConical className={`${className} text-lime-500`} />;
  }

  if (n.includes("jira")) {
    return <Kanban className={`${className} text-blue-500`} />;
  }

  if (n.includes("linux")) {
    return <Terminal className={`${className} text-yellow-500`} />;
  }

  return <Cpu className={`${className} text-accent`} />;
}
