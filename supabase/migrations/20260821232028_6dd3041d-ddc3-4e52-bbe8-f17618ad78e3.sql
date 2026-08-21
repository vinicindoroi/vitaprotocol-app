REVOKE EXECUTE ON FUNCTION public.has_purchase_access(text) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_purchase_access(text) TO service_role;