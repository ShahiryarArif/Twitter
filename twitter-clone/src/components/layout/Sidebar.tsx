import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { signOut } from 'next-auth/react';

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';

const items = [
  {
    label: 'Home',
    href: '/',
    icon: BsHouseFill,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: BsBellFill,
    auth: true
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: FaUser,
    auth: true
  },
]

export default function Sidebar() {
  const { data: currentUser } = useCurrentUser();

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {
            items.map(item => (
              <SidebarItem {...item}/>
            ))
          }
          {currentUser && (
            <SidebarItem onClick={() => signOut()} icon={BiLogOut} label='Logout'/>
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}