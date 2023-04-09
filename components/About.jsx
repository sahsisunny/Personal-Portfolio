import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const AboutUs = () => {
	return (
		<div id="about" className="w-full h-screen text-center">
			<div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
				<div className="">
					<p className="uppercase text-sm tracking-widest text-gray-600">
						WHO WE ARE
					</p>
					<h1 className="py-4 text-gray-700">
						Hi, we are
						<span className="text-[#5651e5]"> Sunny &amp; Co</span>
					</h1>
					<h1 className="py-4 text-gray-700">
						A Team of Front-End Developers
					</h1>
					<p className="py-4 text-gray-600 max-w-[70%] m-auto">
						As an India-based team of Front-End Developers, our expertise
						lies in crafting outstanding websites, applications, and all
						that falls in the spectrum, with occasional design forays.
					</p>
					<div className="flex items-center justify-between max-w-[430px] m-auto py-4">
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300">
							<FaLinkedinIn size={25} />
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300">
							<FaGithub size={25} />
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300">
							<AiOutlineMail size={25} />
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300">
							<FaTwitter size={25} />
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300">
							<BsFillPersonLinesFill size={25} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
