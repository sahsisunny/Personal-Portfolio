import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projectList = [
	{
		title: 'Personal Portfolio👨‍💻',
		description: 'Showcase your education, experience, projects and skills',
		details:
			'This is my personal portfolio website. It is built using Next.js and Tailwind CSS. It is hosted on Netlify. It is a static website and is very fast. It is also responsive and looks good on all devices.',
		techStack: ['Next.js, Tailwind, Netlify'],
		image: '/assets/projects/portfolio.PNG',
		liveLink: 'https://sahsisunny.netlify.app/',
		repoLink: 'https://github.com/sahsisunny/Personal-Portfolio',
	},
	{
		title: 'xProBBA🤖',
		description: 'Bug Bounty Automaton',
		details:
			'xProBBA is a bug bounty automation tool. It is built using Bash. It is a CLI tool and is very fast. It is also very easy to use. It can be used to automate the process of finding subdomains, finding open ports, finding open services, finding open directories etc.',
		techStack: ['Bash, Linux'],
		image: '/assets/projects/xprobba.png',
		liveLink: 'https://www.youtube.com/watch?v=M4c0uWheyvY',
		repoLink: 'https://github.com/sahsisunny/xProBBA',
	},
	{
		title: 'Website Scrapper🕷️',
		description: 'Extract Data from Flipkart, Twitter',
		details:
			'This is a data scrapper tool. It is built using Python. It can be used to extract data from Flipkart like product name, price, rating, number of ratings, product link, product image link etc. It can also be used to extract data from Twitter like tweets, tweet links, tweet image links etc.',
		techStack: ['Python, Linux'],
		image: '/assets/projects/websitescrapper.png',
		liveLink: 'https://www.youtube.com/watch?v=xlX0bZGo5lM',
		repoLink: 'https://github.com/sahsisunny/Website-Scrapper-Project',
	},
	{
		title: 'Emoji Search Engine🔍',
		description: 'Search for emojis',
		details:
			'This is an emoji search engine. It is built using React.js and CSS. In this project, I have used the emoji API to fetch the emojis. It is hosted on Netlify. It is a static website and is very fast. It is also responsive and looks good on all devices.',
		techStack: ['React.js, CSS, Netlify'],
		image: '/assets/projects/EmojiSearchEngine.png',
		liveLink: 'https://emojisearchengine.netlify.app/',
		repoLink:
			'https://github.com/sahsisunny/Know-your-emoji/tree/emoji-search-engine',
	},
	{
		title: 'Know Your Emoji🤔',
		description: 'Know the meaning of emojis',
		details:
			'This is a know your emoji app. It is built using React.js and CSS. In this project, I have used JSON file to store the data of emojis. In this app also show the random emoji.',
		techStack: ['React.js, CSS, Netlify'],
		image: '/assets/projects/knoyouremoji.png',
		liveLink: 'https://knowyouremojiv2.netlify.app/',
		repoLink: 'https://github.com/sahsisunny/Know-your-emoji',
	},
	{
		title: 'Gitrackr📊',
		description: 'Track assinged and PRs from orgs',
		details:
			'This is a Gittrackr app. It is built using React.js. In this project, I have used the GitHub API to fetch the data. It is hosted on Netlify.It is also responsive and looks good on all devices. ITs fetch the data from the github like pull request, issues and assigned issues. I have alse added the feature to filter the data. and show stats of the data.',
		techStack: ['React.js, Tailwind, Netlify'],
		image: '/assets/projects/gitrackr.png',
		liveLink: 'https://gittrackr.netlify.app/',
		repoLink: 'https://github.com/sahsisunny/git-dashboard/',
	},
];

const ProjectComponent = ({
	title,
	description,
	image,
	liveLink,
	repoLink,
	techStack,
}) => {
	return (
		<div className="w-[350px] h-[350px] flex flex-col justify-between rounded-[29px] bg-white shadow-md mx-4 my-8 p-4 hover:scale-110 transition-all ease-in-out hover:border-b-[3px] hover:border-t-[3px] border-black">
			<div className="relative flex justify-center group rounded-xl hover:bg-gradient-to-r from-[#5651e5] to-[#709dff]">
				<Image
					className="rounded-xl group-hover:opacity-10"
					src={image}
					alt={title}
					width={350}
					height={300}
					loading="lazy"
				/>
				<div className="hidden group-hover:flex absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
					<Link
						href={liveLink}
						className="bg-[#e9e9f1] rounded-xl p-2 px-4 mr-2 flex items-center text-black"
					>
						Live
					</Link>
					<Link
						href={repoLink}
						className="bg-[#e9e9f1] rounded-xl p-2 px-4 flex items-center text-black"
					>
						Code
					</Link>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center">
				<h3 className="text-lg font-bold mb-2">{title}</h3>
				<p className="text-sm mb-4">{description}</p>
				<div className="flex justify-center w-[80%] px-8">
					{techStack.map((tech, index) =>
						tech.split(',').map((tech, index) => (
							<p
								className="bg-[#5651e5] rounded-full px-4 py-[4px] text-xs font-semibold text-white flex flex-col  items-center justify-center m-2"
								key={index}
							>
								{tech}
							</p>
						)),
					)}
				</div>
			</div>
		</div>
	);
};

const Projects = () => {
	return (
		<div id="projects" className="max-w-[1240px] w-full mx-auto p-2">
			<div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center flex-col">
				<p className="uppercase text-sm tracking-widest text-gray-600">
					PROJECTS
				</p>
				<h1 className="text-3xl font-bold text-gray-700 mb-8 w-full text-center ">
					My Projects
				</h1>
				<div className="flex flex-wrap justify-center">
					{projectList.map((project, index) => (
						<ProjectComponent
							key={index}
							title={project.title}
							description={project.description}
							image={project.image}
							liveLink={project.liveLink}
							repoLink={project.repoLink}
							techStack={project.techStack}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Projects;


// About ME - I am Sunny Sahsi from India. I am currently contributing to open source projects in Real Dev Squad and learning new technologies.