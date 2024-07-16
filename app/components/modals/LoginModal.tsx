"use client";

import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import { useFormState } from 'react-dom';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import toast from 'react-hot-toast';
import Button from '../Button'
import { useRouter } from 'next/navigation';



const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email: '',
            password: '',
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged In');
                router.refresh();
                loginModal.onClose();
            }
            
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome back'
                subTitle='Login to your account'
            />
            <Input 
                id='email'
                label='Email'
                required
                disabled={isLoading}
                register={register}
                errors={errors}
                type='email'
            />
            <Input 
                id='password'
                label='Password'
                required
                disabled={isLoading}
                register={register}
                errors={errors}
                type='password'
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label = "Continue with Google"
                Icon = {FcGoogle}
                onClick={() => {}}
            />
            <Button 
                outline
                label = "Continue with GitHub"
                Icon = {AiFillGithub}
                onClick={() => {}}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>
                        Already have an Account?
                    </div>
                    <div 
                        className='text-neutral-800 cursor-pointer hover:underline ' 
                        onClick={registerModal.onClose}
                    >
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen= {loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default LoginModal;