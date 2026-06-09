import { AuthBenefitsPanel } from '@/store/components/auth/auth-benefits-panel';
import { AuthCardLayout } from '@/store/components/auth/auth-card-layout';
import { LoginForm } from './login-form';

export function LoginView() {
  return (
    <div>
      <AuthCardLayout>
        <LoginForm />
      </AuthCardLayout>

      <div className="mx-auto max-w-[960px] px-4 pb-8 lg:hidden">
        <div className="overflow-hidden rounded-2xl">
          <AuthBenefitsPanel />
        </div>
      </div>
    </div>
  );
}
