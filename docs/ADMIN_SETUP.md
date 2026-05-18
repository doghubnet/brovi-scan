# Admin Setup

The first admin is promoted manually in Supabase after the founder creates an account:

```sql
update public.users_profile set role = 'admin' where user_id = '<founder-auth-user-id>';
```

Admins can view operational dashboard metrics, consultant requests, upload metadata, high-risk reports, and exports. Admins must never expose private storage links or secrets.
