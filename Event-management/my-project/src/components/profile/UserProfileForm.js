import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { getUserProfile, updateUserProfile } from '../../services/userService';

const profileSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email2: yup.string().email('Invalid email format'),
    mobileNo1: yup.number().typeError('Mobile number must be a number'),
    mobileNo2: yup.number().typeError('Mobile number must be a number'),
    address: yup.string(),
    bio: yup.string(),
    profilePictureUrl: yup.string().url('Must be a valid URL'),
});

const UserProfileForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(profileSchema),
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                setValue('firstName', profile.firstName);
                setValue('middleName', profile.middleName);
                setValue('lastName', profile.lastName);
                setValue('email2', profile.email2);
                setValue('mobileNo1', profile.mobileNo1);
                setValue('mobileNo2', profile.mobileNo2);
                setValue('address', profile.address);
                setValue('bio', profile.bio);
                setValue('profilePictureUrl', profile.profilePictureUrl);
            } catch (error) {
                toast.error('Failed to fetch user profile.');
            }
        };
        fetchUserProfile();
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            await updateUserProfile(data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="firstName" {...register('firstName')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
                <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
                <input type="text" id="middleName" {...register('middleName')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="lastName" {...register('lastName')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
            <div>
                <label htmlFor="email2" className="block text-sm font-medium text-gray-700">Secondary Email</label>
                <input type="email" id="email2" {...register('email2')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.email2 && <p className="text-red-500 text-xs mt-1">{errors.email2.message}</p>}
            </div>
            <div>
                <label htmlFor="mobileNo1" className="block text-sm font-medium text-gray-700">Primary Mobile</label>
                <input type="text" id="mobileNo1" {...register('mobileNo1')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.mobileNo1 && <p className="text-red-500 text-xs mt-1">{errors.mobileNo1.message}</p>}
            </div>
            <div>
                <label htmlFor="mobileNo2" className="block text-sm font-medium text-gray-700">Secondary Mobile</label>
                <input type="text" id="mobileNo2" {...register('mobileNo2')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.mobileNo2 && <p className="text-red-500 text-xs mt-1">{errors.mobileNo2.message}</p>}
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" id="address" {...register('address')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea id="bio" {...register('bio')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
            <div>
                <label htmlFor="profilePictureUrl" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                <input type="text" id="profilePictureUrl" {...register('profilePictureUrl')} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                {errors.profilePictureUrl && <p className="text-red-500 text-xs mt-1">{errors.profilePictureUrl.message}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update Profile</button>
        </form>
    );
};

export default UserProfileForm;
