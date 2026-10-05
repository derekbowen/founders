import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LockIcon } from 'lucide-react';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { buttonStyles } from '../utils/styles';

interface LoginRequiredProps {
  title: string;
  text: string;
}

export function LoginRequired({ title, text }: LoginRequiredProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = encodeURIComponent(location.pathname);
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <EmptyState
        icon={<LockIcon size={24} />}
        title={title}
        text={text}
        action={
        <div className="flex flex-wrap justify-center gap-3">
            <Button className={buttonStyles.primary} onClick={() => navigate(`/login?redirect=${redirect}`)}>
              Log in
            </Button>
            <Button className={buttonStyles.outline} onClick={() => navigate(`/signup?redirect=${redirect}`)}>
              Create an account
            </Button>
          </div>
        } />
      
    </div>);

}