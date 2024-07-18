"use client";

import Image from "next/image";

interface Avatarprops {
    src?: string | null | undefined;
}

const Avatar: React.FC<Avatarprops> = ({src}) => {
    return ( 
        <Image
            src={src || "/images/placeholder.jpg"}
            alt="avatar"
            height={30}
            width={30}
            className="rounded-full"
        />
     );
}


export default Avatar;