import { AUTH_SOCIAL_PROVIDERS } from '@/store/lib/auth-data';

export function AuthSocialButtons() {
  return (
    <div className="mt-6">
      <div className="text-muted-foreground relative text-center text-xs">
        <span className="relative z-[1] bg-white px-3">Hoặc tiếp tục với</span>
        <span className="bg-border absolute inset-x-0 top-1/2 h-px" aria-hidden="true" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {AUTH_SOCIAL_PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            type="button"
            className="text-muted-foreground hover:bg-muted rounded-lg border bg-white px-2 py-2.5 text-xs font-semibold"
          >
            {provider.label}
          </button>
        ))}
      </div>
    </div>
  );
}
