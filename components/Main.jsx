import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Main = () => {
	return (
		<div id="home" className="w-full h-screen text-center">
			<div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
				<div>
					<p className="uppercase text-sm tracking-widest text-gray-600">
						{' '}
						SHALL WE COLLABORATE TO CREATE SOMETHING NEW?{' '}
					</p>
					<h1 className="py-4 text-gray-700">
						Hi, I am <span className="text-[#5651e5]">Sunny</span>
					</h1>
					<h1 className="py-4 text-gray-700">A Software Developer</h1>
					<p className="py-4 text-gray-600 max-w-[70%] m-auto">
						As an India-based software developer, I enjoy creating things that live on the internet. My interest in to develop web applications and mobile applications to solve real-world problems.
					</p>
					<div className="flex items-center justify-between max-w-[430px] m-auto py-4">
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300"
							onClick={() => { window.open('https://www.linkedin.com/in/sahsisunny/'); }}
						>
							<FaLinkedinIn size={25} />
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300"
							onClick={() => { window.open('https://www.github.com/sahsisunny'); }}
						>
							<FaGithub size={25} />
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300"
							onClick={() => { window.open('mailto:sahsisunny@gmail.com'); }}
						>
							<AiOutlineMail size={25} />
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300"
							onClick={() => { window.open('https://twitter.com/sahsisunny'); }}
						>
							<FaTwitter size={25} />
						</div>
						<div className="rounded-full shadow-lg shadow-gray-400 p-6  cursor-pointer hover:scale-110 ease-in duration-300"
							onClick={() => { window.open('https://drive.google.com/open?id=1J68Thc7xSEkNAWSoaPpSYSdIM_CSwKB3&amp%3Busp=drive_copy&usp=drive_copy'); }}
						>
							<BsFillPersonLinesFill size={25} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
