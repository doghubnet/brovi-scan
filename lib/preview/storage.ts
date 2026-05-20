"use client";
export const previewKeys = { profile:"brovi_profile", program:"brovi_program_scan", document:"brovi_document_scan", financial:"brovi_financial_scan", interview:"brovi_interview_scan", report:"brovi_final_report", requests:"brovi_consultant_requests", user:"brovi_mock_user" };
export function load<T>(key: string, fallback: T): T { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; } }
export function save<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }
