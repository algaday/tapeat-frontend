'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { RHFInputField } from '@/shared/ui/rhf/rhf-input-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLoginMutation } from '@entities/user';

import { LoginFormSchema, loginFormShema } from '../model/login-form-schema';
import { Wrapper } from './login-form.styles';

export function LoginForm() {
  const methods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormShema),
  });

  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormSchema> = async (user) => {
    await login(user);
    router.replace('/dashboard');
  };

  return (
    <FormProvider {...methods}>
      <Wrapper autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)}>
        <Typography variant="h6" component="h2">
          Login
        </Typography>
        <RHFInputField name="email" id="email" label="Email" margin="normal" />
        <RHFInputField
          name="password"
          type="password"
          id="password"
          label="Password"
          margin="normal"
        />

        <Button variant="contained" type="submit">
          Continue
        </Button>
        <div className="footer">
          <Typography variant="subtitle2">Do not have an account?</Typography>
          <Link href="/register-owner">
            <Typography variant="subtitle2">Register</Typography>
          </Link>
        </div>
      </Wrapper>
    </FormProvider>
  );
}
