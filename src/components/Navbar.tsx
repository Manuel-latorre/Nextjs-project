'use client'

import React from "react";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react'
import Link from "next/link";
import style from './Navbar.module.css'

function Navbar() {

  const {data: session} =  useSession()

  

  return (
    <nav className={style.navbar}>
      <div>
        <Link href='/'>
          <h1>Navbar</h1>
        </Link>
      </div>
      <div>
        <Link style={{margin:5}} href='/keyboards'>Keyboards</Link>
        <Link style={{margin:5}} href='/headphones'>Headphones</Link>
        <Link style={{margin:5}} href='/mouses'>Mouses</Link>
      </div>

      {
        session ? (
          <div>
            <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session.user?.email}</p>
            </DropdownItem>
            <DropdownItem>
              <Link href='/dashboard'>My Profile</Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              <button onClick={() => signOut()}>Log out</button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
          </div>
            
        ) : (
          <div>
            <Button style={{margin:5}} as={Link} color="primary" href="/login" variant="flat">
              Sign In
            </Button>

            <Button style={{margin:5}} as={Link} color="warning" href="/register" variant="flat">
              Sign Up
            </Button>
          </div>
        )
      }

      
    </nav>
  );
}

export default Navbar;