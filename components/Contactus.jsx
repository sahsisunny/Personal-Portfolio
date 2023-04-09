import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const ContactUs = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		// Code to handle form submission
	};

	return (
		<div id="contact" className="w-full h-screen text-center">
			<div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
				<div className="">
					<p className="uppercase text-sm tracking-widest text-gray-600">
						{' '}
						CONTACT US{' '}
					</p>
					<h1 className="py-4 text-gray-700">Get in touch with us</h1>
					<form
						onSubmit={handleSubmit}
						className="max-w-[70%]  w-[60%] m-auto"
					>
						<div className="py-2">
							<input
								type="text"
								placeholder="Your name"
								className="w-full px-3 py-2 border border-gray-400 rounded-lg outline-none focus:border-[#5651e5]"
								required
							/>
						</div>
						<div className="py-2">
							<input
								type="email"
								placeholder="Your email"
								className="w-full px-3 py-2 border border-gray-400 rounded-lg outline-none focus:border-[#5651e5]"
								required
							/>
						</div>
						<div className="py-2">
							<textarea
								placeholder="Your message"
								className="w-full px-3 py-2 border border-gray-400 rounded-lg outline-none focus:border-[#5651e5]"
								required
							></textarea>
						</div>
						<div className="py-2">
							<button
								type="submit"
								className="bg-[#5651e5] text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
