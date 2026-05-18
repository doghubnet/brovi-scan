create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  university_name text not null, program_name text not null, country text, intake text,
  application_status text check (application_status in ('Researching','Preparing Documents','Applied','Waiting Result','Accepted','Rejected','Deferred','Visa Stage')) default 'Researching',
  application_deadline date, portal_url text, application_fee numeric, scholarship_available boolean default false,
  notes text, priority text default 'Medium', created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.document_vault_items (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  document_name text not null, category text check (category in ('Identity','Academic','Financial','Admission','Visa','Sponsor','Other')) default 'Other',
  status text check (status in ('Missing','Available','Needs Translation','Needs Legalization','Expired','Ready')) default 'Missing',
  expiry_date date, translation_needed boolean default false, legalization_needed boolean default false,
  linked_application uuid references public.applications(id) on delete set null, storage_path text, notes text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  title text not null, description text, due_date date, priority text default 'Medium', status text check (status in ('To Do','In Progress','Done')) default 'To Do',
  source_module text, linked_application uuid references public.applications(id) on delete set null, created_at timestamptz default now()
);
create table if not exists public.consultant_review_requests (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, report_id uuid references public.final_reports(id) on delete set null,
  request_type text check (request_type in ('Full visa file review','Program choice review','Bank statement review','Interview preparation','Document checklist review')) not null,
  message text, contact_preference text, status text default 'New', created_at timestamptz default now()
);
create table if not exists public.user_settings (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade unique,
  theme text default 'system', email_notifications boolean default true, created_at timestamptz default now(), updated_at timestamptz default now()
);
