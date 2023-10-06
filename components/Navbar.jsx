import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineMail } from 'react-icons/ai';
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import { BsFillPersonLinesFill } from 'react-icons/bs';

import LogoImage from '../public/assets/logo/logo.png';

const Navbar = () => {
	const [show, setShow] = useState(false);
	const [shadow, setShadow] = useState(false);
	const navHandler = () => {
		setShow(!show);
	};
	const shadowHandler = () => {
		if (window.scrollY >= 20) {
			setShadow(true);
		} else {
			setShadow(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', shadowHandler);
		return () => {
			window.removeEventListener('scroll', shadowHandler);
		};
	}, []);
	return (
		<nav
			className={
				shadow
					? 'fixed w-full h-20 shadow-xl z-[1000]'
					: 'fixed w-full h-20 z-[100]'
			}
		>
			<div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 bg-[#ecf0f3]">
				<div className="flex items-center">
					<Image src={LogoImage} alt="logo" width={50} height={50} />
					<p
						className="md:block text-xl ml-2"
						style={{ fontFamily: 'Poppins' }}
					>
						Sunny Sahsi
					</p>
				</div>
				<div>
					<ul className="hidden md:flex">
						<Link href="#home">
							<li
								onClick={() => setShow(false)}
								key="home"
								className="ml-10 text-sm uppercase hover:border-b"
							>
								Home
							</li>
						</Link>
						<Link href="#experience">
							<li
								onClick={() => setShow(false)}
								key="experience"
								className="ml-10 text-sm uppercase hover:border-b"
							>
								Experience
							</li>
						</Link>
						<Link href="#skills">
							<li
								onClick={() => setShow(false)}
								key="skills"
								className="ml-10 text-sm uppercase hover:border-b"
							>
								Skills
							</li>
						</Link>
						<Link href="#projects">
							<li
								onClick={() => setShow(false)}
								key="projects"
								className="ml-10 text-sm uppercase hover:border-b"
							>
								Projects
							</li>
						</Link>
						<Link href="#education">
							<li
								onClick={() => setShow(false)}
								key="education"
								className="ml-10 text-sm uppercase hover:border-b"
							>
								education
							</li>
						</Link>
						<Link href="#contact">
							<li
								onClick={() => setShow(false)}
								key="contacts"
								className="ml-10 text-sm uppercase hover:border-b"
							>
								Contacts
							</li>
						</Link>
					</ul>
					<div className="md:hidden" onClick={navHandler}>
						<AiOutlineMenu size={25} />
					</div>
				</div>
			</div>
			<div
				className={
					show
						? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70'
						: ''
				}
			>
				<div
					className={
						show
							? 'fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500'
							: 'fixed left-[-100%] top-0 bg-[#ecf0f3] p-10 ease-in duration-500'
					}
				>
					<div>
						<div className="flex w-full items-center justify-between">
							<div className="flex items-center">
								<Image
									src={LogoImage}
									alt="logo"
									width={50}
									height={50}
								/>
								<p
									className=" text-xl ml-2"
									style={{ fontFamily: 'Poppins' }}
								>
									Sunny Sahsi
								</p>
							</div>
							<div
								className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
								onClick={navHandler}
							>
								<AiOutlineClose size={25} />
							</div>
						</div>
						<div className="border-b border-gray-300 my-4">
							<p className="w-[85%] md:w-[90%] py-4">
								Let`s build something unique together..
							</p>
						</div>
					</div>
					<div className="py-4 flex flex-col">
						<ul className="uppercase">
							<Link href="#home">
								<li
									onClick={() => setShow(false)}
									key="home"
									className="py-4 text-sm"
								>
									Home
								</li>
							</Link>
							<Link href="#experience">
								<li
									onClick={() => setShow(false)}
									key="experience"
									className="py-4 text-sm"
								>
									Experience
								</li>
							</Link>
							<Link href="#skills">
								<li
									onClick={() => setShow(false)}
									key="skills"
									className="py-4 text-sm"
								>
									Skills
								</li>
							</Link>
							<Link href="#projects">
								<li
									onClick={() => setShow(false)}
									key="projects"
									className="py-4 text-sm"
								>
									Projects
								</li>
							</Link>
							<Link href="#education">
								<li
									onClick={() => setShow(false)}
									key="education"
									className="py-4 text-sm"
								>
									Education
								</li>
							</Link>
							<Link href="#contact">
								<li
									onClick={() => setShow(false)}
									key="contacts"
									className="py-4 text-sm"
								>
									Contacts
								</li>
							</Link>
						</ul>
						<div className="pt-10 ">
							<p className="uppercase tracking-widest text-[#5651e5]">
								Lets Connect
							</p>
							<div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
								<div className="rounded-full shadow-lg shadow-gray-400 p-3  cursor-pointer hover:scale-105 ease-in duration-300">
									<FaLinkedinIn size={25} />
								</div>
								<div className="rounded-full shadow-lg shadow-gray-400 p-3  cursor-pointer hover:scale-105 ease-in duration-300">
									<FaGithub size={25} />
								</div>
								<div className="rounded-full shadow-lg shadow-gray-400 p-3  cursor-pointer hover:scale-105 ease-in duration-300">
									<FaTwitter size={25} />
								</div>
								<div className="rounded-full shadow-lg shadow-gray-400 p-3  cursor-pointer hover:scale-105 ease-in duration-300">
									<AiOutlineMail size={25} />
								</div>
								<div className="rounded-full shadow-lg shadow-gray-400 p-3  cursor-pointer hover:scale-105 ease-in duration-300">
									<BsFillPersonLinesFill size={25} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
