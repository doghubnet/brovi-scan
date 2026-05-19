export const PERMISSIONS = {
  DOCUMENT_CREATE_OWN: "document:create_own",
  DOCUMENT_READ_OWN: "document:read_own",
  DOCUMENT_UPDATE_OWN: "document:update_own",
  DOCUMENT_DELETE_OWN: "document:delete_own",
  DOCUMENT_READ_ASSIGNED: "document:read_assigned",
  DOCUMENT_READ_ALL_METADATA: "document:read_all_metadata",
  CONSULTANT_REVIEW_READ_ASSIGNED: "consultant_review:read_assigned",
  ADMIN_READ_DASHBOARD: "admin:read_dashboard",
  AUDIT_READ_METADATA: "audit:read_metadata",
} as const;
