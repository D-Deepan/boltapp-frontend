import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
        />
        
        <div>
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isLoading}
            leftIcon={<LogIn size={16} />}
          >
            Login
          </Button>
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p className="mb-4">Demo Accounts:</p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="inline-block w-16 font-medium">Faculty:</span>
              <span>faculty@example.com / password123</span>
            </li>
            <li className="flex items-center">
              <span className="inline-block w-16 font-medium">Incharge:</span>
              <span>incharge@example.com / password123</span>
            </li>
            <li className="flex items-center">
              <span className="inline-block w-16 font-medium">Admin:</span>
              <span>admin@example.com / password123</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;