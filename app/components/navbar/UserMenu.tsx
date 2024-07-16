"use client"

import { User } from "@prisma/client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";


interface UserMenuProps {
    currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen ((value) => !value);
    }, []);

    return ( 
        <div className="relative ">
            <div className="flex flex-row items-center gap-3">
                <div  className="hidden md:block text-sm font-semibold py-3 px-4 rounded-4 hover:bg-neutral-100 transition cursor-pointer">
                    {/*Need to give an onclick function later */}
                    Airbnb your Home
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    {/*Need to give an onclick function later */}
                    <AiOutlineMenu/>
                    <div className="hidden md:block ">
                        <Avatar/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex- flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                            <MenuItem 
                                onClick={() => {}}
                                label="My Trips"
                            />
                            <MenuItem 
                                onClick={() => {}}
                                label="My Favorites"
                            />
                            <MenuItem 
                                onClick={() => {}}
                                label="My Reservations"
                            />
                            <MenuItem 
                                onClick={() => {}}
                                label="My Properties"
                            />
                            <MenuItem 
                                onClick={() => {}}
                                label="Airbnb My Home"
                            />
                            <hr />
                            <MenuItem 
                                onClick={() => signOut()}
                                label="Logout"
                            />
                        </>
                        ) : (
                            <>
                            <MenuItem 
                                onClick={loginModal.onOpen}
                                label="Login"
                            />
                            <MenuItem 
                                onClick={registerModal.onOpen}
                                label="Sign Up"
                            />
                        </>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
     );
}

export default UserMenu;