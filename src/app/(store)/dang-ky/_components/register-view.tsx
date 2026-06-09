import { AuthBenefitsPanel } from '@/store/components/auth/auth-benefits-panel';
import { AuthCardLayout } from '@/store/components/auth/auth-card-layout';
import { RegisterForm } from './register-form';

export function RegisterView() {
  return (
    <div>
      <AuthCardLayout>
        <RegisterForm />
      </AuthCardLayout>

      <div className="mx-auto max-w-[960px] px-4 pb-8 lg:hidden">
        <div className="overflow-hidden rounded-2xl">
          <AuthBenefitsPanel />
        </div>
      </div>
    </div>
  );
}
