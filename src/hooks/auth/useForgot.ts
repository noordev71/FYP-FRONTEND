const { useState } = require("react");
import { z } from 'zod';
import useAuth from '@/hooks/auth/useAuth';
import { toast } from 'react-toastify';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),  
});

export const useForgot = () => {    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const { forgetPassword } = useAuth()

    const handleForgotPassword = async () => {
        try {
        setIsLoading(true);
        loginSchema.parse({ email });
        if (email.trim().length === 0) {
          toast('Fill All Fields!', {
            type: 'error'
          })
          setIsLoading(false);
          return;
        }
    
        const forgotPassword = await forgetPassword(email)
        if(forgotPassword.error)
        {
          setIsLoading(false);
          return;
          
        }else {
          setIsLoading(false);
          toast(forgotPassword.message)
        }
      }catch (error) {
        setIsLoading(false);
        if (error instanceof z.ZodError) {
            error.errors.forEach(err => {
            toast(err.message, { type: 'error' });
            });
        } else {                
            toast('An unexpected error occurred', { type: 'error' });
        }

    }
}


    return { isLoading, handleForgotPassword, email, setEmail, password, setPassword}
}