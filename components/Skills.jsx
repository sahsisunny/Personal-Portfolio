import React from 'react';
import {
	FaReact,
	FaHtml5,
	FaCss3Alt,
	FaJsSquare,
	FaNodeJs,
	FaGitAlt,
	FaSass,
	FaLinux,
	FaNpm,
	FaAndroid,
	FaJava,
} from 'react-icons/fa';
const skillList = [
	{
		icon: <FaReact className=" text-6xl mb-1" />,
		title: 'React',
	},
	{
		icon: <FaHtml5 className=" text-6xl mb-1" />,
		title: 'HTML',
	},
	{
		icon: <FaJsSquare className=" text-6xl mb-1" />,
		title: 'JavaScript',
	},
	{
		icon: <FaCss3Alt className=" text-6xl mb-1" />,
		title: 'CSS',
	},
	{
		icon: <FaGitAlt className=" text-6xl mb-1" />,
		title: 'Git',
	},
	{
		icon: <FaNodeJs className=" text-6xl mb-1" />,
		title: 'Node',
		borderClass: 'border-green-600',
	},
	{
		icon: <FaSass className=" text-6xl mb-1" />,
		title: 'Sass',
	},
	{
		icon: <FaLinux className=" text-6xl mb-1" />,
		title: 'Linux',
	},
	{
		icon: <FaNpm className=" text-6xl mb-1" />,
		title: 'NPM',
	},
	{
		icon: <FaAndroid className=" text-6xl mb-1" />,
		title: 'Android',
	},
	{
		icon: <FaJava className=" text-6xl mb-1" />,
		title: 'Java',
	},
];

const SkillComponent = ({ icon, title }) => {
	return (
		<div
			className="w-[120px] h-[120px] flex justify-center rounded-[29px] bg-white shadow-md mx-4 my-8 p-4 hover:scale-110 transition-all ease-in-out hover:border-b-[3px] hover:border-t-[3px] border-black
     "
		>
			<div className="text-center flex flex-col items-center justify-center">
				{icon}
				<h3 className="text-lg">{title}</h3>
			</div>
		</div>
	);
};
const Skill = () => {
	return (
		<div id="skills" className="w-full text-center md:h-[auto]">
			<div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center flex-col">
				<p className="uppercase text-sm tracking-widest text-gray-600">
					Skills
				</p>
				<h1 className="text-3xl font-bold text-gray-700 mb-8 w-full text-center">
					What I Know
				</h1>
				<div className="flex flex-wrap justify-center">
					{skillList.map((skill, index) => (
						<SkillComponent
							key={index}
							icon={skill.icon}
							title={skill.title}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Skill;
